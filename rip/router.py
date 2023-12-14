from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_async_session

from auth.base_config import fastapi_users
from auth.models import User

router = APIRouter(
    prefix="/rip",
    tags=["Rip"]
)

current_user = fastapi_users.current_user()
@router.post("/update_username")
async def update_username(new_username: str, user: User = Depends(current_user), session: AsyncSession = Depends(get_async_session)):
    existing_user = await session.execute(select(User).filter_by(id=user.id))
    db_user = existing_user.scalar()

    if not db_user:
        raise HTTPException(status_code=404, detail="Пользователь не найден")

    db_user.username = new_username

    await session.commit()

    return {"status": "Имя пользователя обновлено успешно", "new_username": new_username}

@router.delete("/delete_user/{user_id}")
async def delete_user(user_id: int, user: User = Depends(current_user), session: AsyncSession = Depends(get_async_session)):
    if user.role_id == 2:
        existing_user = await session.execute(select(User).filter_by(id=user_id))
        db_user = existing_user.scalar()

        if not db_user:
            raise HTTPException(status_code=404, detail="Пользователь не найден")

        await session.delete(db_user)
        await session.commit()

        return {"status": "Пользователь успешно удален", "deleted_user_id": user_id}
    else:
        raise HTTPException(status_code=403, detail="У вас нет прав для удаления пользователя")

@router.get("/get_all_users")
async def get_all_users(session: AsyncSession = Depends(get_async_session)):
    users = await session.execute(select(User))
    all_users = users.scalars().all()

    return {"users": [{"id": u.id, "username": u.username, "email": u.email} for u in all_users]}

@router.get("/get_current_user")
async def get_current_user(user: User = Depends(current_user)):
    return {"user_id": user.id}