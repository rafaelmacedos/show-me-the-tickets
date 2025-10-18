from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession

from web.core.auth import authenticate_user, create_access_token
from web.core.deps import get_current_user, get_session
from web.models.user_model import UserModel
from web.repositories.user_repository import create_user, get_user_by_email
from web.schemas.user_schema import TokenResponseSchema, UserCreateSchema, UserUpdateSchema, UserLoginSchema, UserResponseSchema

router = APIRouter()

@router.post("/login", response_model=TokenResponseSchema, status_code=status.HTTP_200_OK)
async def login_endpoint(form_data: OAuth2PasswordRequestForm = Depends(), db: AsyncSession = Depends(get_session)):
    login_data = UserLoginSchema(email=form_data.username, password=form_data.password)
    user = await authenticate_user(login_data, db)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    access_token = await create_access_token(user)
    return JSONResponse(content={"access_token": access_token, "token_type": "bearer"}, status_code=status.HTTP_200_OK)

@router.post("/register", response_model=UserResponseSchema, status_code=status.HTTP_201_CREATED)
async def register_endpoint(new_user: UserCreateSchema, db: AsyncSession = Depends(get_session)):
    if new_user.password != new_user.confirm_password:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Passwords do not match")

    if await get_user_by_email(new_user.email, db) != None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")

    new_user = await create_user(new_user, db)
    return new_user

@router.get("/me", response_model=UserResponseSchema, status_code=status.HTTP_200_OK)
async def get_current_user_endpoint(current_user: UserModel = Depends(get_current_user), db: AsyncSession = Depends(get_session)):
    return current_user
