from pydantic import BaseModel, Field, field_validator


class CheckoutItem(BaseModel):
    product_id: int = Field(strict=True, gt=0)
    quantity: int = Field(strict=True, ge=1, le=100)


class CheckoutPreviewRequest(BaseModel):
    items: list[CheckoutItem] = Field(min_length=1, max_length=100)

    @field_validator("items")
    @classmethod
    def reject_duplicates(cls, items: list[CheckoutItem]) -> list[CheckoutItem]:
        if len({item.product_id for item in items}) != len(items):
            raise ValueError("No se permiten IDs de producto duplicados.")
        return items


class CheckoutPreviewLine(CheckoutItem):
    title: str
    unit_price_cents: int
    subtotal_cents: int


class CheckoutPreviewResponse(BaseModel):
    items: list[CheckoutPreviewLine]
    total_cents: int
