from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Product
from app.schemas.checkout import (
    CheckoutPreviewLine,
    CheckoutPreviewRequest,
    CheckoutPreviewResponse,
)

router = APIRouter(prefix="/checkout", tags=["checkout"])


@router.post(
    "/preview",
    response_model=CheckoutPreviewResponse,
    responses={status.HTTP_404_NOT_FOUND: {"description": "Productos no encontrados"}},
)
def preview_checkout(request: CheckoutPreviewRequest, db: Session = Depends(get_db)):
    ids = [item.product_id for item in request.items]
    # SQLite no puede enlazar enteros que exceden el rango de 64 bits.
    query = select(Product.id, Product.title, Product.price).where(
        Product.id.in_([product_id for product_id in ids if product_id < 2**63])
    )
    products = {product.id: product for product in db.execute(query)}
    missing_ids = [product_id for product_id in ids if product_id not in products]
    if missing_ids:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={
                "message": "Productos no encontrados",
                "missing_product_ids": missing_ids,
            },
        )

    lines = []
    for item in request.items:
        product = products[item.product_id]
        unit_price_cents = int(product.price * 100)
        lines.append(
            CheckoutPreviewLine(
                product_id=item.product_id,
                quantity=item.quantity,
                title=product.title,
                unit_price_cents=unit_price_cents,
                subtotal_cents=unit_price_cents * item.quantity,
            )
        )

    return CheckoutPreviewResponse(
        items=lines, total_cents=sum(line.subtotal_cents for line in lines)
    )
