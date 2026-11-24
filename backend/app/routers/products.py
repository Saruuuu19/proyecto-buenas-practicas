import os
from secrets import compare_digest

from fastapi import APIRouter, Depends, HTTPException, Request, status
from fastapi.concurrency import run_in_threadpool
from fastapi.security import APIKeyHeader
from pydantic import TypeAdapter, ValidationError
from sqlalchemy.orm import Session

from app.catalog import (
    create_product,
    get_categories,
    get_product,
    get_products,
    update_product,
)
from app.database import get_db
from app.schemas.products import ProductCreate, ProductResponse, ProductUpdate

router = APIRouter(prefix="/products", tags=["products"])
admin_api_key = APIKeyHeader(name="X-Admin-API-Key", auto_error=False)
product_update_schema = TypeAdapter(ProductUpdate)


async def require_admin(api_key: str | None = Depends(admin_api_key)):
    expected_key = os.getenv("ADMIN_API_KEY")
    if not expected_key:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="La administración de productos no está habilitada.",
        )
    if not api_key or not compare_digest(api_key.encode(), expected_key.encode()):
        raise admin_api_key.make_not_authenticated_error()


@router.get("/", response_model=list[ProductResponse])
def get_all_products(db: Session = Depends(get_db)):
    return get_products(db)


@router.get("/categories", response_model=list[str])
def get_categories_endpoint(db: Session = Depends(get_db)):
    return get_categories(db)


@router.get("/{product_id}", response_model=ProductResponse)
def get_product_by_id(product_id: int, db: Session = Depends(get_db)):
    product = get_product(db, product_id)
    if product is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Producto no encontrado"
        )
    return product


@router.post(
    "",
    response_model=ProductResponse,
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(require_admin)],
)
async def create_product_endpoint(request: Request, db: Session = Depends(get_db)):
    try:
        data = await request.json()
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Envía un objeto JSON válido."
        )

    try:
        product = ProductCreate.model_validate(data)
    except ValidationError as exc:
        field = exc.errors()[0]["loc"]
        messages: dict[tuple[int | str, ...], str] = {
            ("title",): "El título (title) es obligatorio y no puede estar vacío.",
            ("price",): (
                "El precio (price) debe ser un número mayor que 0 y hasta 99999999.99, "
                "con un máximo de dos decimales."
            ),
            ("description",): "La descripción (description) debe ser texto.",
            ("category",): "La categoría (category) es obligatoria y no puede estar vacía.",
            ("image",): "La imagen (image) es obligatoria y no puede estar vacía.",
        }
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=messages.get(field, "Envía un objeto JSON válido."),
        )

    return await run_in_threadpool(create_product, db, product.model_dump())


@router.patch(
    "/{product_id}",
    response_model=ProductResponse,
    status_code=status.HTTP_200_OK,
    dependencies=[Depends(require_admin)],
    responses={
        status.HTTP_400_BAD_REQUEST: {"description": "ID o datos inválidos"},
        status.HTTP_404_NOT_FOUND: {"description": "Producto no encontrado"},
    },
)
async def update_product_endpoint(
    product_id: str, request: Request, db: Session = Depends(get_db)
):
    try:
        parsed_id = int(product_id)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="El ID debe ser un entero."
        )

    try:
        changes = product_update_schema.validate_python(await request.json())
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Envía un objeto JSON con campos de producto válidos.",
        )

    if not changes:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Envía al menos un campo para actualizar.",
        )

    product = await run_in_threadpool(update_product, db, parsed_id, changes)
    if product is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Producto no encontrado"
        )
    return product
