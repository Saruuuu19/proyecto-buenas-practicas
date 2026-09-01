from fastapi import APIRouter, HTTPException

from app.catalog import get_categories, get_product, get_products
from app.schemas.products import ProductResponse

router = APIRouter(prefix="/products", tags=["products"])


@router.get("/", response_model=list[ProductResponse])
async def get_all_products():
    return get_products()


@router.get("/categories", response_model=list[str])
async def get_categories_endpoint():
    return get_categories()


@router.get("/{product_id}", response_model=ProductResponse)
async def get_product_by_id(product_id: int):
    product = get_product(product_id)
    if product is None:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    return product