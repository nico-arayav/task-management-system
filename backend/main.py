# filepath: d:\Coding for Interviews\SEEK\task-management-system\backend\main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import router
from mangum import Mangum  # Import Mangum for AWS Lambda compatibility

app = FastAPI()

app.include_router(router, prefix="/api")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Create a handler for AWS Lambda
handler = Mangum(app)