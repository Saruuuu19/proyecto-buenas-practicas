import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import admin, products

app = FastAPI(
    title="TechFlow Store API",
    description="API REST de e-commerce y administración",
    version="1.0.0",
)

# CORS configurable para deploy en Render
# FRONTEND_URL puede contener una o varias URLs separadas por coma
# ej: FRONTEND_URL=https://techflow-frontend.onrender.com,https://techflow.vercel.app
_default_origins = ["http://localhost:5173", "http://127.0.0.1:5173"]
_frontend_url = os.getenv("FRONTEND_URL", "").strip()
_extra_origins = [o.strip() for o in _frontend_url.split(",") if o.strip()] if _frontend_url else []
allow_origins = _default_origins + _extra_origins

app.add_middleware(
    CORSMiddleware,
    allow_origins=allow_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(products.router, prefix="/api")
app.include_router(admin.router, prefix="/api")


@app.get("/health", tags=["Health"])
def health_check():
    return {"status": "ok", "service": "Backend API Online"}
