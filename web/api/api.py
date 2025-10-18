from fastapi import APIRouter

from web.api.v1.endpoints import task

api_router = APIRouter()

@api_router.get("/health")
async def health():
    return {"message": "OK"}

api_router.include_router(task.router, prefix="/tasks", tags=["tasks"])


