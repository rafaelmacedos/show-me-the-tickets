from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer
from web.core.config import settings
from jose import jwt

CRYPTO = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return CRYPTO.hash(password)

def verify_password(password: str, hashed_password: str) -> bool:
    return CRYPTO.verify(password, hashed_password)

def generate_token(data: dict) -> str:
    return jwt.encode(data, settings.JWT_SECRET, algorithm=settings.JWT_ALGORITHM)

def verify_token(token: str) -> dict:
    return jwt.decode(token, settings.JWT_SECRET, algorithms=[settings.JWT_ALGORITHM])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl=f"{settings.API_V1_STR}/auth/login")
