from fastapi import APIRouter, HTTPException, Request
from pydantic import ValidationError

from app.catalog import create_product, get_categories, get_product, get_products
from app.schemas.products import ProductCreate, ProductResponse

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


@router.post("", response_model=ProductResponse, status_code=201)
async def create_product_endpoint(request: Request):
    try:
        data = await request.json()
    except ValueError:
        raise HTTPException(status_code=400, detail="Envía un objeto JSON válido.")

    try:
        product = ProductCreate.model_validate(data)
    except ValidationError as exc:
        field = exc.errors()[0]["loc"]
        messages = {
            ("title",): "El título (title) es obligatorio y no puede estar vacío.",
            ("price",): "El precio (price) debe ser un número mayor que 0.",
            ("description",): "La descripción (description) debe ser texto.",
            ("category",): "La categoría (category) es obligatoria y no puede estar vacía.",
            ("image",): "La imagen (image) es obligatoria y no puede estar vacía.",
        }
        raise HTTPException(
            status_code=400, detail=messages.get(field, "Envía un objeto JSON válido.")
        )

    return create_product(product.model_dump())
