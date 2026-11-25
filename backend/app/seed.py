import json
from decimal import Decimal
from pathlib import Path

from sqlalchemy import select, text
from sqlalchemy.orm import Session

from app.database import Base, SessionLocal, engine
from app.models import Product

PRODUCTS_FILE = Path(__file__).resolve().parent / "data" / "products.json"


def seed_products(db: Session) -> bool:
    if db.scalar(select(Product.id).limit(1)) is not None:
        return False

    with PRODUCTS_FILE.open(encoding="utf-8") as file:
        items = json.load(file)

    products = [
        Product(
            id=item["id"],
            title=item["title"],
            price=Decimal(str(item["price"])),
            description=item["description"],
            category=item["category"],
            image=item["image"],
        )
        for item in items
    ]
    db.add_all(products)
    if products and db.get_bind().dialect.name == "postgresql":
        # PostgreSQL no avanza la secuencia al insertar IDs explícitos.
        db.flush()
        db.execute(
            text("SELECT setval(pg_get_serial_sequence('products', 'id'), :last_id)"),
            {"last_id": max(product.id for product in products)},
        )
    db.commit()
    return True


if __name__ == "__main__":
    Base.metadata.create_all(bind=engine)
    with SessionLocal() as db:
        if seed_products(db):
            print("Productos insertados correctamente")
        else:
            print("La tabla products ya tiene datos, no se vuelve a poblar.")
