from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum
from pymongo import MongoClient
import os
from pydantic import BaseModel
from typing import List, Optional
import uuid

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

# MongoDB connection
client = MongoClient(os.getenv("MONGODB_URI"))
db = client[os.getenv("DATABASE_NAME", "task_management_dev")]
tasks_collection = db["tasks_collection"]

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
    tasks = list(tasks_collection.find())
    return [Task(**task) for task in tasks]

@app.post("/api/tasks", response_model=Task)
async def create_task(task: Task):
    task.id = str(uuid.uuid4())
    tasks_collection.insert_one(task.dict())
    return task

@app.put("/api/tasks/{task_id}", response_model=Task)
async def update_task(task_id: str, task_update: TaskUpdate):
    update_data = {k: v for k, v in task_update.dict().items() if v is not None}
    tasks_collection.update_one({"id": task_id}, {"$set": update_data})
    updated_task = tasks_collection.find_one({"id": task_id})
    return Task(**updated_task)

@app.delete("/api/tasks/{task_id}")
async def delete_task(task_id: str):
    tasks_collection.delete_one({"id": task_id})
    return {"message": "Task deleted successfully"}

# Lambda handler
handler = Mangum(app)
