import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ["DATABASE_NAME"] = "task_management_test"

import pytest
from fastapi.testclient import TestClient
from main import app
from bson import ObjectId
from database import tasks_collection

client = TestClient(app)

# Helper function to clear the database before each test
@pytest.fixture(autouse=True)
def clear_database():
	tasks_collection.delete_many({})  # Clear all tasks before each test

# Test: GET /api/tasks
def test_get_tasks():
	# Insert a sample task into the database
	sample_task = {"title": "Test Task", "description": "Test Description", "status": "to-do"}
	tasks_collection.insert_one(sample_task)

	# Make a GET request to fetch tasks
	response = client.get("/api/tasks")
	assert response.status_code == 200
	data = response.json()
	assert len(data) == 1
	assert data[0]["title"] == "Test Task"
	assert data[0]["description"] == "Test Description"
	assert data[0]["status"] == "to-do"

# Test: POST /api/tasks
def test_create_task():
	new_task = {"title": "New Task", "description": "New Description", "status": "in-progress"}
	response = client.post("/api/tasks", json=new_task)
	assert response.status_code == 200
	data = response.json()
	assert data["title"] == "New Task"
	assert data["description"] == "New Description"
	assert data["status"] == "in-progress"

	# Verify the task was added to the database
	db_task = tasks_collection.find_one({"title": "New Task"})
	assert db_task is not None

# Test: PUT /api/tasks/{task_id}
def test_update_task():
	# Insert a sample task into the database
	sample_task = {"title": "Old Task", "description": "Old Description", "status": "to-do"}
	result = tasks_collection.insert_one(sample_task)
	task_id = str(result.inserted_id)

	# Update the task
	updated_task = {"title": "Updated Task", "description": "Updated Description", "status": "done"}
	response = client.put(f"/api/tasks/{task_id}", json=updated_task)
	assert response.status_code == 200
	assert response.json()["message"] == "Task updated successfully"

	# Verify the task was updated in the database
	db_task = tasks_collection.find_one({"_id": ObjectId(task_id)})
	assert db_task["title"] == "Updated Task"
	assert db_task["description"] == "Updated Description"
	assert db_task["status"] == "done"

# Test: DELETE /api/tasks/{task_id}
def test_delete_task():
	# Insert a sample task into the database
	sample_task = {"title": "Task to Delete", "description": "Delete Me", "status": "to-do"}
	result = tasks_collection.insert_one(sample_task)
	task_id = str(result.inserted_id)

	# Delete the task
	response = client.delete(f"/api/tasks/{task_id}")
	assert response.status_code == 200
	assert response.json()["message"] == "Task deleted successfully"

	# Verify the task was deleted from the database
	db_task = tasks_collection.find_one({"_id": ObjectId(task_id)})
	assert db_task is None

# Test: Invalid Task ID (PUT and DELETE)
def test_invalid_task_id():
	invalid_id = "invalid_id"

	# Test PUT with invalid ID
	updated_task = {"title": "Updated Task", "description": "Updated Description", "status": "done"}
	response = client.put(f"/api/tasks/{invalid_id}", json=updated_task)
	assert response.status_code == 400
	assert response.json()["detail"] == "Invalid task ID format"

	# Test DELETE with invalid ID
	response = client.delete(f"/api/tasks/{invalid_id}")
	assert response.status_code == 400
	assert response.json()["detail"] == "Invalid task ID format"