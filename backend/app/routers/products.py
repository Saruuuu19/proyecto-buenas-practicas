import json
from pathlib import Path

from fastapi import APIRouter, HTTPException

from app.schemas.products import ProductResponse

router = APIRouter(prefix="/products", tags=["products"])

PRODUCTS_FILE = Path(__file__).resolve().parent.parent / "data" / "products.json"


def _load_products() -> list[dict]:
    """Carga el catálogo de productos desde products.json (fuente de verdad)."""
    with open(PRODUCTS_FILE, encoding="utf-8") as f:
        return json.load(f)


# Catálogo cargado una sola vez al importar el módulo.
_PRODUCTS = _load_products()


@router.get("/", response_model=list[ProductResponse])
async def get_all_products():
    return _PRODUCTS


@router.get("/categories", response_model=list[str])
async def get_categories():
    return sorted({product["category"] for product in _PRODUCTS})


@router.get("/{product_id}", response_model=ProductResponse)
async def get_product_by_id(product_id: int):
    for product in _PRODUCTS:
        if product["id"] == product_id:
            return product
    raise HTTPException(status_code=404, detail="Producto no encontrado")