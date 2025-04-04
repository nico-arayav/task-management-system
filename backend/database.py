from pymongo import MongoClient
import os

# Use an environment variable to determine the database name
DATABASE_NAME = os.getenv("DATABASE_NAME", "task_management_dev")  # Default to dev DB

client = MongoClient("mongodb://localhost:27017/")
db = client[DATABASE_NAME]
tasks_collection = db["tasks_collection"]