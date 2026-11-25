import os
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.types import ASGIApp, Receive, Scope, Send

from app.database import Base, engine
from app import models
from app.routers import admin, checkout, products


@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    yield


app = FastAPI(
    title="TechFlow Store API",
    description="API REST de e-commerce y administración",
    version="1.0.0",
    lifespan=lifespan,
)


class RouteCORSMiddleware:
    def __init__(self, app: ASGIApp, allow_origins: list[str]):
        self.app = app
        self.read, self.preview = (
            CORSMiddleware(
                app,
                allow_origins=allow_origins,
                allow_methods=[method],
                allow_headers=["Content-Type"],
                allow_credentials=False,
            )
            for method in ("GET", "POST")
        )

    async def __call__(self, scope: Scope, receive: Receive, send: Send) -> None:
        if scope["type"] == "http":
            cors = self.preview if scope["path"] == "/api/checkout/preview" else self.read
            # CORSMiddleware solo comprueba el método en el preflight.
            if scope["method"] == "OPTIONS" or scope["method"] in cors.allow_methods:
                await cors(scope, receive, send)
                return
        await self.app(scope, receive, send)


allow_origins = [
    origin.strip() for origin in os.getenv("FRONTEND_URL", "").split(",") if origin.strip()
]
if "*" in allow_origins:
    raise ValueError("FRONTEND_URL no admite '*'; configura orígenes explícitos.")

app.add_middleware(RouteCORSMiddleware, allow_origins=allow_origins)

app.include_router(products.router, prefix="/api")
app.include_router(admin.router, prefix="/api")
app.include_router(checkout.router, prefix="/api")


@app.get("/health", tags=["Health"])
def health_check():
    return {"status": "ok", "service": "Backend API Online"}

