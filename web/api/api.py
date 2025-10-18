from fastapi import APIRouter, Depends

from web.api.v1.endpoints import auth, task
from web.core.deps import get_current_user

api_router = APIRouter()

@api_router.get("/health")
async def health():
    return {"message": "OK"}

api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(task.router, prefix="/tasks", tags=["tasks"], dependencies=[Depends(get_current_user)])


