from decimal import Decimal
from typing import Annotated, TypedDict

from pydantic import (
    AfterValidator,
    BaseModel,
    ConfigDict,
    Field,
    StringConstraints,
    with_config,
)

from app.models import PRICE_PRECISION, PRICE_SCALE

NonEmptyString = Annotated[str, StringConstraints(strip_whitespace=True, min_length=1)]


def _validate_price_precision(price: float) -> float:
    amount = Decimal(str(price))
    if amount != amount.quantize(Decimal("0.01")):
        raise ValueError(f"El precio admite hasta {PRICE_SCALE} decimales.")
    return price


ProductPrice = Annotated[
    float,
    Field(gt=0, le=99_999_999.99, allow_inf_nan=False, strict=True),
    AfterValidator(_validate_price_precision),
]


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
    price: ProductPrice
    description: str = ""
    category: NonEmptyString
    image: NonEmptyString


@with_config(ConfigDict(extra="forbid"))
class ProductUpdate(TypedDict, total=False):
    title: NonEmptyString
    price: ProductPrice
    description: str
    category: NonEmptyString
    image: NonEmptyString
