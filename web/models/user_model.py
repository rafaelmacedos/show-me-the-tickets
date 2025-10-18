from sqlalchemy import Boolean, Column, TIMESTAMP, Integer, String
from web.core.config import settings
from datetime import datetime

class UserModel(settings.DBBaseModel):
    __tablename__ = "users"
    id: int = Column(Integer, default=None, primary_key=True, index=True, autoincrement=True, nullable=False)
    name: str = Column(String(256), nullable=False)
    email: str = Column(String(256), unique=True, nullable=False)
    password: str = Column(String(256), nullable=False)
    is_active: bool = Column(Boolean, default=True, nullable=False)
    is_admin: bool = Column(Boolean, default=False, nullable=False)
    created_at:  datetime = Column(TIMESTAMP(timezone=True), nullable=False)
    updated_at: datetime = Column(TIMESTAMP(timezone=True), nullable=False)