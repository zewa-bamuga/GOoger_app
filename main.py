from fastapi.middleware.cors import CORSMiddleware
from auth.base_config import auth_backend, fastapi_users
from auth.schemas import UserRead, UserCreate
from auth.router import router as router_protect
from rip.router import router as router_rip
from chat.router import router as router_chat
from fastapi import FastAPI, WebSocket

app = FastAPI(
    title="Онлайн школа GOoger"
)

origins = [
    "http://localhost:3000",
    "http://192.168.3.12:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS", "DELETE", "PATCH", "PUT"],
    allow_headers=["Content-Type", "Get-Cookie", "Set-Cookie", "Access-Control-Allow-Headers", "Access-Control-Allow-Origin", "Authorization"],
)


app.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
    prefix="/auth",
    tags=["Auth"],
)

app.include_router(router_protect)
app.include_router(
    fastapi_users.get_auth_router(auth_backend),
    prefix="/auth",
    tags=["Auth"],
)
@app.websocket("/ws/courses")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        await websocket.send_text(f"Message text was: {data}")

app.include_router(router_rip)
app.include_router(router_chat)