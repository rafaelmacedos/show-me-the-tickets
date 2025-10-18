from web.core.database import engine
from web.core.config import settings

async def create_tables() -> None:
    import web.models.__all_models

    async with engine.begin() as conn:
        # Only create tables that don't exist (safer - won't drop existing data)
        await conn.run_sync(settings.DBBaseModel.metadata.create_all)
        print("Tables created successfully")
        await conn.commit()

async def recreate_tables() -> None:
    """DANGER: This will drop all tables and data!"""
    import web.models.__all_models

    async with engine.begin() as conn:
        await conn.run_sync(settings.DBBaseModel.metadata.drop_all)
        await conn.run_sync(settings.DBBaseModel.metadata.create_all)
        print("Tables recreated successfully (all data lost)")
        await conn.commit()


if __name__ == "__main__":
    import asyncio
    asyncio.run(recreate_tables())