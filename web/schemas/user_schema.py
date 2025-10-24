from datetime import datetime
from pydantic import BaseModel as SCBaseModel, EmailStr

class UserCreateSchema(SCBaseModel):
    name: str
    email: EmailStr
    password: str
    confirm_password: str

class UserUpdateSchema(SCBaseModel):
    name: str
    email: EmailStr
    password: str
    confirm_password: str
    is_active: bool

class UserResponseSchema(SCBaseModel):
    id: int
    name: str
    email: EmailStr
    is_active: bool
    is_admin: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
    
class UserLoginSchema(SCBaseModel):
    email: str
    password: str

class TokenResponseSchema(SCBaseModel):
    access_token: str
    token_type: str