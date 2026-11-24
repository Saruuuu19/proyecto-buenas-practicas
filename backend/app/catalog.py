from sqlalchemy import distinct, func, select
from sqlalchemy.orm import Session

from app.models import Product


def get_products(db: Session) -> list[Product]:
    return list(db.scalars(select(Product).order_by(Product.id)))


def get_categories(db: Session) -> list[str]:
    return sorted(db.scalars(select(Product.category).distinct()))


def get_product(db: Session, product_id: int) -> Product | None:
    # SQLite no puede enlazar enteros fuera del rango de un ID de 64 bits.
    if not -(2**63) <= product_id < 2**63:
        return None
    return db.get(Product, product_id)


def get_stats(db: Session) -> dict[str, int]:
    products_count, categories_count = db.execute(
        select(func.count(Product.id), func.count(distinct(Product.category)))
    ).one()
    return {"products_count": products_count, "categories_count": categories_count}


def create_product(db: Session, data: dict) -> Product:
    product = Product(**data)
    db.add(product)
    db.commit()
    db.refresh(product)
    return product
