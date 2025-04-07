from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum
import boto3
import os
from pydantic import BaseModel
from typing import List, Optional
import uuid
import logging
from botocore.exceptions import ClientError

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Get environment variables
table_name = os.environ.get('TABLE_NAME', 'tasks')
logger.info(f"Using table: {table_name}")

# Create the DynamoDB resource
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(table_name)

# Models
class Task(BaseModel):
    id: Optional[str] = None
    title: str
    description: str
    status: str

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None

# Routes
@app.get("/api/tasks", response_model=List[Task])
async def get_tasks():
    try:
        logger.info("Getting all tasks")
        response = table.scan()
        logger.info(f"Response: {response}")
        return [Task(**item) for item in response.get('Items', [])]
    except ClientError as e:
        logger.error(f"Error scanning table: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/tasks", response_model=Task)
async def create_task(task: Task):
    try:
        logger.info(f"Creating task: {task}")
        task.id = str(uuid.uuid4())
        task_dict = task.dict()
        table.put_item(Item=task_dict)
        return task
    except ClientError as e:
        logger.error(f"Error creating task: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.put("/api/tasks/{task_id}", response_model=Task)
async def update_task(task_id: str, task_update: TaskUpdate):
    try:
        update_expression = []
        expression_values = {}
        expression_names = {}
        
        if task_update.title is not None:
            update_expression.append("#title = :title")
            expression_values[":title"] = task_update.title
            expression_names["#title"] = "title"
        
        if task_update.description is not None:
            update_expression.append("#description = :description")
            expression_values[":description"] = task_update.description
            expression_names["#description"] = "description"
        
        if task_update.status is not None:
            update_expression.append("#status = :status")
            expression_values[":status"] = task_update.status
            expression_names["#status"] = "status"
        
        if not update_expression:
            raise HTTPException(status_code=400, detail="No fields to update")
        
        update_expression = "SET " + ", ".join(update_expression)
        
        response = table.update_item(
            Key={'id': task_id},
            UpdateExpression=update_expression,
            ExpressionAttributeValues=expression_values,
            ExpressionAttributeNames=expression_names,
            ReturnValues='ALL_NEW'
        )
        
        return Task(**response['Attributes'])
    except ClientError as e:
        logger.error(f"Error updating task: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/api/tasks/{task_id}")
async def delete_task(task_id: str):
    try:
        table.delete_item(Key={'id': task_id})
        return {"message": "Task deleted successfully"}
    except ClientError as e:
        logger.error(f"Error deleting task: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# Lambda handler
handler = Mangum(app)
