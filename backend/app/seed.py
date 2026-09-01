import httpx

from app.database import SessionLocal
from app.models import Product
from decimal import Decimal


def seed_products():
    with SessionLocal() as db:
        if db.query(Product).count() > 0:
            print("La tabla products ya tiene datos, no se vuelve a poblar.")
            return

        try:
            response = httpx.get("https://fakestoreapi.com/products", timeout=10)
            response.raise_for_status()
        except httpx.RequestError as exc:
            print(f"Error de conexión con fakestoreapi: {exc}")
            return
        except httpx.HTTPStatusError as exc:
            print(f"fakestoreapi respondió con error: {exc}")
            return

        products_data = response.json()

        for item in products_data:
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