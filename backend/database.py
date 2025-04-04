# filepath: backend/database.py
from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client["task_management"]
tasks_collection = db["tasks"]