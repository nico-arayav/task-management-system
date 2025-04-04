# Task Management System

This is a coding challenge project for Seek. The **Task Management System** includes a **FastAPI backend** and a **React frontend**. This guide will help you set up the project locally, run it, and test its functionality.

---

## **Prerequisites**
Before running the project, ensure you have the following installed on your system:
- **Python 3.9+**
- **Node.js 16+** and **npm**
- **Docker** (optional, for containerized testing)
- **Git**

---

## **Setup Instructions**

### **1. Clone the Repository**
Clone the repository to your local machine:
```bash
git clone <repository-url>
cd task-management-system
```

---

### **2. Backend Setup**
The backend is built with **FastAPI**.

#### **Steps:**
```bash
# Navigate to the backend folder
cd backend

# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install the required dependencies
pip install -r requirements.txt

# Run the backend server
uvicorn main:app --reload
```

The backend will be available at:
```
http://127.0.0.1:8000
```

---

### **3. Frontend Setup**
The frontend is built with **React**.

#### **Steps:**
```bash
# Navigate to the frontend folder
cd ../frontend

# Install the required dependencies
npm install

# Start the development server
npm start
```

The frontend will be available at:
```
http://localhost:3000
```

---

### **4. Running the Full Application**
To run both the backend and frontend together:
1. Open two terminal windows.
2. In one terminal, start the backend server (as described in **Backend Setup**).
3. In the other terminal, start the frontend server (as described in **Frontend Setup**).

---

## **Testing**

### **1. Backend Testing**
The backend includes an API that can be tested using tools like **Postman** or **cURL**.

#### **Example Endpoints:**
```bash
# Get All Tasks
GET http://127.0.0.1:8000/api/tasks

# Add a Task
POST http://127.0.0.1:8000/api/tasks
Content-Type: application/json
Body:
{
  "title": "New Task",
  "description": "Task description",
  "status": "to-do"
}
```

---

### **2. Frontend Testing**
1. Open the frontend in your browser at `http://localhost:3000`.
2. Interact with the UI to test task creation, updates, and deletion.

---

## **Optional: Run with Docker**
You can use Docker to run the entire application without setting up dependencies manually.

#### **Steps:**
```bash
# Ensure Docker is installed and running

# Build and start the containers using Docker Compose
docker-compose up --build
```

The backend will be available at:
```
http://127.0.0.1:8000
```

The frontend will be available at:
```
http://localhost:3000
```

---

## **Project Structure**
```
task-management-system/
├── backend/          # FastAPI backend
│   ├── main.py       # Entry point for the backend
│   ├── requirements.txt  # Backend dependencies
│   └── ...
├── frontend/         # React frontend
│   ├── src/          # React source code
│   ├── package.json  # Frontend dependencies
│   └── ...
├── docker-compose.yml # Docker Compose configuration
└── README.md         # Project documentation
```

---

## **Troubleshooting**

### **Backend Issues**
```bash
# Ensure the virtual environment is activated before running the backend
source venv/bin/activate

# Check that all dependencies are installed
pip install -r requirements.txt
```

### **Frontend Issues**
```bash
# Ensure Node.js and npm are installed

# Delete node_modules and reinstall dependencies if issues persist
rm -rf node_modules
npm install
```

### **Docker Issues**
```bash
# Ensure Docker is installed and running

# Stop containers and clean up
docker-compose down
```