from decimal import Decimal
from typing import Annotated

from pydantic import BaseModel, Field, StringConstraints, field_validator

NonEmptyString = Annotated[str, StringConstraints(strip_whitespace=True, min_length=1)]


class ProductBase(BaseModel):
    title: str
    price: float
    description: str
    category: str
    image: str


class ProductResponse(ProductBase):
    id: int

    class Config:
        from_attributes = True


class ProductCreate(ProductBase):
    title: NonEmptyString
    price: float = Field(gt=0, le=99_999_999.99, allow_inf_nan=False, strict=True)
    description: str = ""
    category: NonEmptyString
    image: NonEmptyString

    @field_validator("price")
    @classmethod
    def validate_price_precision(cls, price: float) -> float:
        amount = Decimal(str(price))
        if amount != amount.quantize(Decimal("0.01")):
            raise ValueError("El precio admite hasta dos decimales.")
        return price
