from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from web.core.config import settings
from fastapi.responses import RedirectResponse
from web.api.api import api_router
import uvicorn

app = FastAPI(title=settings.PROJECT_NAME, version="BETA")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix=settings.API_V1_STR)

if __name__ == "__main__":
    uvicorn.run("web.main:app", host="0.0.0.0", port=8000, log_level="info", reload=True)