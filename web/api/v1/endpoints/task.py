from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from web.core.config import settings
from web.schemas.task_schema import TaskCreateSchema, TaskUpdateSchema, TaskResponseSchema
from web.core.deps import get_session
from sqlalchemy.ext.asyncio import AsyncSession
from web.repositories.task_repository import create_task, delete_task, get_task_by_id, get_tasks, update_task

router = APIRouter()

@router.get("/", response_model=List[TaskResponseSchema], status_code=status.HTTP_200_OK)
async def get_tasks_endpoint(db: AsyncSession = Depends(get_session)):
        try:
            result = await get_tasks(db)
            return result
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error getting tasks: {e}")

@router.get("/{task_id}", response_model=TaskResponseSchema, status_code=status.HTTP_200_OK)
async def get_task_by_id_endpoint(task_id: int, db: AsyncSession = Depends(get_session)):
    try:
        result = await get_task_by_id(task_id, db)
        return result
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"Error getting task with id {task_id}: {e}")

@router.post("/", response_model=TaskResponseSchema, status_code=status.HTTP_201_CREATED)
async def create_task_endpoint(new_task: TaskCreateSchema, db: AsyncSession = Depends(get_session)):
    try:
        result = await create_task(new_task, db)
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error creating task: {e}")

@router.put("/{task_id}", response_model=TaskResponseSchema, status_code=status.HTTP_200_OK)
async def update_task_endpoint(task_id: int, updated_task: TaskUpdateSchema, db: AsyncSession = Depends(get_session)):
    try:
        result = await update_task(task_id, updated_task, db)
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error updating task with id {task_id}: {e}")

@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_task_endpoint(task_id: int, db: AsyncSession = Depends(get_session)):
    try:
        await delete_task(task_id, db)
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"Error deleting task with id {task_id}: {e}")