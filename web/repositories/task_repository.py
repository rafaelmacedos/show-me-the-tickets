from fastapi import Depends
from sqlalchemy import select
from web.models.task_model import TaskModel
from web.schemas.task_schema import TaskCreateSchema, TaskUpdateSchema
from web.core.deps import get_session
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import datetime, timezone
from web.core.config import settings

async def create_task(task: TaskCreateSchema, db: AsyncSession = Depends(get_session)):
    new_task = TaskModel(
        title=task.title,
        description=task.description,
        due_datetime=task.due_datetime,
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc),
        status=task.status,
        priority=task.priority,
        category=task.category,
        assigneeId=task.assigneeId
    )
    try:
        db.add(new_task)
        await db.commit()
        await db.refresh(new_task)
        return new_task
    except Exception as e:
        await db.rollback()
        raise e

async def get_tasks(db: AsyncSession = Depends(get_session)):
    try:
        result = await db.execute(select(TaskModel).order_by(TaskModel.created_at.desc()))
        return result.scalars().all()
    except Exception as e:
        raise e

async def get_task_by_id(task_id: int, db: AsyncSession = Depends(get_session)):
    try:
        result = await db.execute(select(TaskModel).where(TaskModel.id == task_id))
        return result.scalar_one_or_none()
    except Exception as e:
        raise e

async def delete_task(task_id: int, db: AsyncSession = Depends(get_session)):
    try:
        result = await db.execute(select(TaskModel).where(TaskModel.id == task_id))
        task = result.scalar_one_or_none()
        await db.delete(task)
        await db.commit()
        return task
    except Exception as e:
        raise e

async def update_task(task_id: int, updated_task: TaskUpdateSchema, db: AsyncSession = Depends(get_session)):
    try:
        result = await db.execute(select(TaskModel).where(TaskModel.id == task_id))
        task = result.scalar_one_or_none()
        task.title = updated_task.title
        task.description = updated_task.description
        task.due_datetime = updated_task.due_datetime
        task.status = updated_task.status
        task.priority = updated_task.priority
        task.category = updated_task.category
        task.assigneeId = updated_task.assigneeId
        task.updated_at = datetime.now(timezone.utc)
        await db.commit()
        await db.refresh(task)
        return task
    except Exception as e:
        await db.rollback()
        raise e