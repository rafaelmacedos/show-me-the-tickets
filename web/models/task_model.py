from datetime import datetime
from web.core.config import settings
from sqlalchemy import Column, ForeignKey, Integer, String, Enum, TIMESTAMP
from enum import Enum as PyEnum
from typing import Optional

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
    id: int = Column(Integer, default=None, primary_key=True, index=True, autoincrement=True, nullable=False)
    title: str = Column(String(200), nullable=False)
    description: str = Column(String(200))
    due_datetime: Optional[datetime] = Column(TIMESTAMP(timezone=True), nullable=True)
    created_at:  datetime = Column(TIMESTAMP(timezone=True), nullable=False)
    updated_at: datetime = Column(TIMESTAMP(timezone=True), nullable=False)
    status: TaskStatus =  Column(Enum(TaskStatus), nullable=False)
    priority:  TaskPriority = Column(Enum(TaskPriority), nullable=False)
    category: TaskCategory = Column(Enum(TaskCategory), nullable=False)
    assigneeId: Optional[int] = Column(Integer, ForeignKey("users.id"), nullable=True)