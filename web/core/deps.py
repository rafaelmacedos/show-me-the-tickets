from typing import Generator

from fastapi import Depends, HTTPException, status
from jose.exceptions import JWTError
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from web.core.security import oauth2_scheme
from web.core.database import Session
from web.core.security import verify_token
from web.models.user_model import UserModel
from web.repositories.user_repository import get_user_by_email

async def get_session() -> Generator:
    session: AsyncSession = Session()
    try:
        yield session
    finally:
        await session.close()

async def get_current_user(db: AsyncSession = Depends(get_session), token: str = Depends(oauth2_scheme)) -> UserModel:
    credentials_exception: HTTPException = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = verify_token(token)
        user_email = payload.get("sub")
        if user_email is None:
            raise credentials_exception

        user = await get_user_by_email(user_email, db)

        if user is None:
            raise credentials_exception
        return user
    except JWTError as e:
        raise credentials_exception