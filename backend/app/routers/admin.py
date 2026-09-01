from fastapi import APIRouter

from app.catalog import get_categories, get_products

router = APIRouter(prefix="/admin", tags=["admin"])


@router.get("/stats")
async def get_stats():
    return {
        "products_count": len(get_products()),
        "categories_count": len(get_categories()),
    }