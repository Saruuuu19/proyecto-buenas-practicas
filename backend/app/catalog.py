import json
from pathlib import Path

PRODUCTS_FILE = Path(__file__).resolve().parent / "data" / "products.json"


def _load_products() -> list[dict]:
    with open(PRODUCTS_FILE, encoding="utf-8") as f:
        return json.load(f)


PRODUCTS = _load_products()


def get_products() -> list[dict]:
    return PRODUCTS


def get_categories() -> list[str]:
    return sorted({product["category"] for product in PRODUCTS})


def get_product(product_id: int) -> dict | None:
    return next((p for p in PRODUCTS if p["id"] == product_id), None)