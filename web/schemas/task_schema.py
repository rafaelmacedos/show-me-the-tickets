from pydantic import BaseModel as SCBaseModel
from datetime import datetime
from typing import Optional
from web.models.task_model import TaskStatus, TaskPriority, TaskCategory

class TaskCreateSchema(SCBaseModel):
    title: str
    description: str
    due_datetime: Optional[datetime] = None
    status: TaskStatus
    priority: TaskPriority
    category: TaskCategory
    assigneeId: Optional[int] = None

class TaskUpdateSchema(SCBaseModel):
    title: str
    description: str
    due_datetime: Optional[datetime] = None
    status: TaskStatus
    priority: TaskPriority
    category: TaskCategory
    assigneeId: Optional[int] = None

class TaskResponseSchema(SCBaseModel):
    id: int
    title: str
    description: str
    due_datetime: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime
    status: TaskStatus
    priority: TaskPriority
    category: TaskCategory
    assigneeId: Optional[int] = None

    class Config:
        from_attributes = True