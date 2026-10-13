from fastapi import APIRouter

router = APIRouter(prefix="/admin", tags=["admin"])


@router.get("/stats")
async def get_stats():
    return {
        "products_count": 20,
        "categories_count": 4,
        "total_sales": 125000.0,
    }
