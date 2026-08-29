import httpx
from fastapi import APIRouter, HTTPException

from app.schemas.products import ProductResponse

router = APIRouter(prefix="/products", tags=["products"])
FAKESTORE_URL = "https://fakestoreapi.com/products"


@router.get("/", response_model=list[ProductResponse])
async def get_all_products():
    async with httpx.AsyncClient() as client:
        response = await client.get(FAKESTORE_URL)
        if response.status_code != 200:
            raise HTTPException(
                status_code=500, detail="Error al conectar con la API externa"
            )
        return response.json()


@router.get("/categories", response_model=list[str])
async def get_categories():
    async with httpx.AsyncClient() as client:
        response = await client.get(FAKESTORE_URL)
        if response.status_code != 200:
            raise HTTPException(
                status_code=500, detail="Error al conectar con la API externa"
            )
        return sorted({product["category"] for product in response.json()})


@router.get("/{product_id}", response_model=ProductResponse)
async def get_product_by_id(product_id: int):
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{FAKESTORE_URL}/{product_id}")
        if response.status_code != 200:
            raise HTTPException(status_code=404, detail="Producto no encontrado")
        return response.json()
