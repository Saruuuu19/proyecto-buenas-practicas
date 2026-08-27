from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import admin, products

app = FastAPI(
    title="TechFlow Store API",
    description="API REST de e-commerce y administración",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(products.router, prefix="/api")
app.include_router(admin.router, prefix="/api")


@app.get("/health", tags=["Health"])
def health_check():
    return {"status": "ok", "service": "Backend API Online"}
