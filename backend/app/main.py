import os
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app import models
from app.routers import admin, products


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

allow_origins = [
    origin.strip() for origin in os.getenv("FRONTEND_URL", "").split(",") if origin.strip()
]
if "*" in allow_origins:
    raise ValueError("FRONTEND_URL no admite '*'; configura orígenes explícitos.")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allow_origins,
    allow_credentials=False,
    allow_methods=["GET"],
    allow_headers=["Content-Type"],
)

app.include_router(products.router, prefix="/api")
app.include_router(admin.router, prefix="/api")


@app.get("/health", tags=["Health"])
def health_check():
    return {"status": "ok", "service": "Backend API Online"}
