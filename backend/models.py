# filepath: backend/models.py
from pydantic import BaseModel
from typing import Optional

class Task(BaseModel):
	id: Optional[str] = None
	title: str
	description: str
	status: str  # "to-do", "in-progress", "completed"