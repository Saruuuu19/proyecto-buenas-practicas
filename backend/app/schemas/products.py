from pydantic import BaseModel, validator
from decimal import Decimal, InvalidOperation

from app.models import PRICE_PRECISION, PRICE_SCALE


MAX_PRICE = Decimal("99999999.99")


class ProductBase(BaseModel):
    title: str
    price: float
    description: str
    category: str
    image: str

    @validator("price")
    def price_must_be_valid_decimal(cls, v):
        try:
            decimal_price = Decimal(str(v))
        except (InvalidOperation, ValueError):
            raise ValueError("Precio debe ser un número decimal válido")
        if decimal_price <= 0:
            raise ValueError("Precio debe ser mayor que cero")
        if decimal_price > MAX_PRICE:
            raise ValueError(f"Precio no puede exceder {MAX_PRICE}")
        # Verificar que no tenga más decimales de los permitidos
        decimal_str = str(decimal_price)
        if "." in decimal_str:
            decimals = len(decimal_str.split(".")[1])
            if decimals > PRICE_SCALE:
                raise ValueError(
                    f"Precio no puede tener más de {PRICE_SCALE} decimales"
                )
        return float(decimal_price)


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
