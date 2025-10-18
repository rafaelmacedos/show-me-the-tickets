from typing import List, ClassVar
from pydantic_settings import BaseSettings
from sqlalchemy.ext.declarative import declarative_base, DeclarativeMeta

class Settings(BaseSettings):
    PROJECT_NAME: str = "Show Me The Tickets - WEB API"
    API_V1_STR: str = "/api/v1"
    DB_URL: str
    JWT_SECRET: str
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRATION: int
    
    DBBaseModel: ClassVar[DeclarativeMeta] = declarative_base()

    class Config:
        env_file = "web/.env"
        env_file_encoding = "utf-8"

    
settings = Settings()