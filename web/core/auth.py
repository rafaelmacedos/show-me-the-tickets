from datetime import timezone
from datetime import datetime, timedelta

from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession

from web.core.config import settings
from web.core.security import generate_token, verify_password
from web.models.user_model import UserModel
from web.schemas.user_schema import UserLoginSchema
from web.core.deps import get_session

async def authenticate_user(login_Data: UserLoginSchema, db: AsyncSession):
    result = await db.execute(select(UserModel).where(UserModel.email == login_Data.email))
    user = result.scalar_one_or_none()

    if not user:
        return None

    if not verify_password(login_Data.password, user.password):
        return None
      
    return user

async def create_token(token_type: str, sub: str, expires_delta: timedelta) -> str:
    token = generate_token(
        data={
            "type": token_type,
            "sub": sub,
            "iat": datetime.now(timezone.utc),
            "exp": datetime.now(timezone.utc) + expires_delta
        }
    )
    return token

async def create_access_token(user: UserModel) -> str:
    return await create_token("access_token", user.email, timedelta(minutes=settings.JWT_EXPIRATION))