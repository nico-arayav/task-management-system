from pymongo import MongoClient
import os
from pymongo.errors import ServerSelectionTimeoutError
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Use an environment variable to determine the database name
DATABASE_NAME = os.getenv("DATABASE_NAME", "task_management_dev")  # Default to dev DB

# MongoDB Atlas connection string from environment variable
MONGODB_URI = os.getenv("MONGODB_URI")
if not MONGODB_URI:
    raise ValueError("MONGODB_URI environment variable is not set")

# Connection options for better reliability
client = MongoClient(
    MONGODB_URI,
    serverSelectionTimeoutMS=5000,  # 5 second timeout
    socketTimeoutMS=45000,  # 45 second timeout
    connectTimeoutMS=10000  # 10 second timeout
)

try:
    # Test the connection
    client.server_info()
    print("Successfully connected to MongoDB Atlas!")
except ServerSelectionTimeoutError as e:
    print(f"Could not connect to MongoDB Atlas: {e}")
    raise

db = client[DATABASE_NAME]
tasks_collection = db["tasks_collection"]