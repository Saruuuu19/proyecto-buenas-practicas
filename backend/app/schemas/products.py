from typing import Annotated

from pydantic import BaseModel, Field, StringConstraints

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
    price: float = Field(gt=0, allow_inf_nan=False, strict=True)
    description: str = ""
    category: NonEmptyString
    image: NonEmptyString
