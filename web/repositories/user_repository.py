from datetime import datetime, timezone

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from web.core.security import hash_password
from web.models.user_model import UserModel
from web.schemas.user_schema import UserCreateSchema, UserUpdateSchema

async def get_user_by_email(email: str, db: AsyncSession):  
    try:
        result = await db.execute(select(UserModel).where(UserModel.email == email))
        return result.scalar_one_or_none()
    except Exception as e:
        raise e

async def create_user(user: UserCreateSchema, db: AsyncSession):
    try:
        new_user = UserModel(
            name=user.name,
            email=user.email,
            password=hash_password(user.password),
            created_at=datetime.now(timezone.utc),
            updated_at=datetime.now(timezone.utc)
        )
        db.add(new_user)
        await db.commit()
        await db.refresh(new_user)
        return new_user
    except Exception as e:
        await db.rollback()
        raise e

async def update_user(user: UserUpdateSchema, db: AsyncSession):
    try:
        result = await db.execute(select(UserModel).where(UserModel.id == user.id))
        user = result.scalar_one_or_none()
        user.name = user.name
        user.email = user.email
        user.password = hash_password(user.password)
        user.is_active = user.is_active
        user.updated_at = datetime.now(timezone.utc)
        await db.commit()
        await db.refresh(user)
        return user
    except Exception as e:
        await db.rollback()
        raise e

async def get_all_users(db: AsyncSession):
    try:
        result = await db.execute(select(UserModel))
        return result.scalars().all()
    except Exception as e:
        raise e

async def get_user_by_id(id: int, db: AsyncSession):
    try:
        result = await db.execute(select(UserModel).where(UserModel.id == id))
        return result.scalar_one_or_none()
    except Exception as e:
        raise e