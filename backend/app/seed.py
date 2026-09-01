import httpx

from app.database import SessionLocal
from app.models import Product

def seed_products():
    response = httpx.get("https://fakestoreapi.com/products")
    products_data = response.json()

    db = SessionLocal()
    try:
        for item in products_data:
            product = Product(
                title=item["title"],
                price=item["price"],
                description=item["description"],
                category=item["category"],
                image=item["image"],
         )
            db.add(product)
        db.commit()
    finally:
        db.close()

if __name__=="__main__":
    seed_products()
    print("Productos insertados correctamente")