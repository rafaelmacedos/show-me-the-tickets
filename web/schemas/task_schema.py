from pydantic import BaseModel as SCBaseModel
from datetime import datetime
from web.models.task_model import TaskStatus, TaskPriority, TaskCategory

class TaskCreateOrUpdateSchema(SCBaseModel):
    title: str
    description: str
    due_datetime: datetime
    status: TaskStatus
    priority: TaskPriority
    category: TaskCategory
    assigneeId: int

class TaskResponseSchema(SCBaseModel):
    id: int
    title: str
    description: str
    due_datetime: datetime
    created_at: datetime
    updated_at: datetime
    status: TaskStatus
    priority: TaskPriority
    category: TaskCategory
    assigneeId: int

    class Config:
        from_attributes = True