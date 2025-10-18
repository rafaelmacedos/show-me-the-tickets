from web.core.config import settings
from sqlalchemy import Column, Integer, String, DateTime, Enum, TIMESTAMP
from datetime import datetime
from enum import Enum as PyEnum

class TaskStatus(PyEnum):
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    CANCELLED = "cancelled"
    DELAYED = "delayed"

class TaskPriority(PyEnum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    URGENT = "urgent"

class TaskCategory(PyEnum):
    WORK = "work"
    PERSONAL = "personal"
    FAMILY = "family"
    HEALTH = "health"
    FINANCE = "finance"
    OTHER = "other"

class TaskModel(settings.DBBaseModel):
    __tablename__ = "tasks"
    id: int = Column(Integer, default=None, primary_key=True, index=True, autoincrement=True)
    title: str = Column(String)
    description: str = Column(String(200))
    due_datetime: datetime = Column(TIMESTAMP(timezone=True))
    created_at:  datetime = Column(TIMESTAMP(timezone=True))
    updated_at: datetime = Column(TIMESTAMP(timezone=True))
    status: TaskStatus =  Column(Enum(TaskStatus))
    priority:  TaskPriority = Column(Enum(TaskPriority))
    category: TaskCategory = Column(Enum(TaskCategory))
    assigneeId: int = Column(Integer)