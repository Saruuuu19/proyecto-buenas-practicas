from decimal import Decimal

from app.catalog import get_products
from app.database import SessionLocal
from app.models import Product


def seed_products():
    with SessionLocal() as db:
        if db.query(Product).count() > 0:
            print("La tabla products ya tiene datos, no se vuelve a poblar.")
            return

        for item in get_products():
            product = Product(
                title=item["title"],
                price=Decimal(str(item["price"])),
                description=item["description"],
                category=item["category"],
                image=item["image"],
            )
            db.add(product)
        db.commit()


if __name__ == "__main__":
    seed_products()
    print("Productos insertados correctamente")