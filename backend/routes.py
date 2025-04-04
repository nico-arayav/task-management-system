# filepath: backend/routes.py
from fastapi import APIRouter, HTTPException
from models import Task
from database import tasks_collection
from bson import ObjectId
from bson.errors import InvalidId

router = APIRouter()

@router.get("/tasks")
async def get_tasks():
	tasks = list(tasks_collection.find())
	for task in tasks:
		task["id"] = str(task["_id"])
		del task["_id"]
	return tasks

@router.post("/tasks")
async def create_task(task: Task):
	task_dict = task.dict()
	result = tasks_collection.insert_one(task_dict)
	task_dict["id"] = str(result.inserted_id)
	task_dict.pop("_id", None)
	return task_dict

@router.put("/tasks/{task_id}")
async def update_task(task_id: str, task: Task):
	try:
		object_id = ObjectId(task_id)  # Validate task_id
	except InvalidId:
		raise HTTPException(status_code=400, detail="Invalid task ID format")
	
	result = tasks_collection.update_one(
		{"_id": object_id}, {"$set": task.dict()}
	)
	if result.matched_count == 0:
		raise HTTPException(status_code=404, detail="Task not found")
	return {"message": "Task updated successfully"}

@router.delete("/tasks/{task_id}")
async def delete_task(task_id: str):
	try:
		object_id = ObjectId(task_id)  # Validate task_id
	except InvalidId:
		raise HTTPException(status_code=400, detail="Invalid task ID format")
	
	result = tasks_collection.delete_one({"_id": object_id})
	if result.deleted_count == 0:
		raise HTTPException(status_code=404, detail="Task not found")
	return {"message": "Task deleted successfully"}