import asyncio
import logging

import httpx
from fastapi import APIRouter, HTTPException

from app.schemas.products import ProductResponse

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/products", tags=["products"])
FAKESTORE_URL = "https://fakestoreapi.com/products"
FAKESTORE_MAX_RETRIES = 3
HEADERS = {
    "User-Agent": "Mozilla/5.0 (compatible; TechFlowStore/1.0; +https://proyecto-buenas-practicas.onrender.com)",
    "Accept": "application/json",
}

# Catálogo de respaldo en caso de que la API externa no esté disponible.
_FALLBACK_PRODUCTS = [
    {
        "id": 1,
        "title": "Fjallraven - Foldsack No. 1 Backpack",
        "price": 109.95,
        "description": "Mochila impermeable con bolsillo para portátil de 15 pulgadas.",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    },
    {
        "id": 2,
        "title": "Mens Casual Premium Slim Fit T-Shirts",
        "price": 22.3,
        "description": "Camisetas slim fit de algodón de primera calidad, paquete de 3.",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    },
    {
        "id": 3,
        "title": "Mens Cotton Jacket",
        "price": 55.99,
        "description": "Chaqueta de algodón con forro, ideal para cualquier estación.",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    },
    {
        "id": 4,
        "title": "Mens Casual Slim Fit",
        "price": 15.99,
        "description": "Camisa casual slim fit con botones.",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
    },
    {
        "id": 5,
        "title": "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
        "price": 695.0,
        "description": "Pulsera de cadena con dragón en oro y plata.",
        "category": "jewelery",
        "image": "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
    },
    {
        "id": 6,
        "title": "Solid Gold Petite Micropave",
        "price": 168.0,
        "description": "Anillo de oro sólido con micropavé.",
        "category": "jewelery",
        "image": "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
    },
    {
        "id": 7,
        "title": "White Gold Plated Princess",
        "price": 9.99,
        "description": "Anillo princesa chapado en oro blanco.",
        "category": "jewelery",
        "image": "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
    },
    {
        "id": 8,
        "title": "Pierced Owl Rose Gold Plated Stainless Steel Double",
        "price": 10.99,
        "description": "Aretes de acero inoxidable chapados en oro rosa.",
        "category": "jewelery",
        "image": "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg",
    },
    {
        "id": 9,
        "title": "WD 2TB Elements Portable External Hard Drive",
        "price": 64.0,
        "description": "Disco duro externo portátil de 2TB.",
        "category": "electronics",
        "image": "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
    },
    {
        "id": 10,
        "title": "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
        "price": 109.0,
        "description": "SSD interno SATA III de 1TB.",
        "category": "electronics",
        "image": "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
    },
    {
        "id": 11,
        "title": "Silicon Power 256GB SSD 3D NAND A55 SLC Cache",
        "price": 109.0,
        "description": "SSD de 256GB con caché SLC.",
        "category": "electronics",
        "image": "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg",
    },
    {
        "id": 12,
        "title": "WD 4TB Gaming Drive Works with Playstation 4",
        "price": 114.0,
        "description": "Disco de 4TB para gaming compatible con PS4.",
        "category": "electronics",
        "image": "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg",
    },
    {
        "id": 13,
        "title": "Acer SB220Q bi 21.5 inches Full HD",
        "price": 599.0,
        "description": "Monitor Acer de 21.5 pulgadas Full HD.",
        "category": "electronics",
        "image": "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
    },
    {
        "id": 14,
        "title": "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor",
        "price": 999.99,
        "description": "Monitor curvo gaming Samsung de 49 pulgadas.",
        "category": "electronics",
        "image": "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg",
    },
    {
        "id": 15,
        "title": "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
        "price": 56.99,
        "description": "Chaqueta de snowboard 3 en 1 para mujer.",
        "category": "women's clothing",
        "image": "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
    },
    {
        "id": 16,
        "title": "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
        "price": 29.95,
        "description": "Chaqueta de moto de piel sintética con capucha removible.",
        "category": "women's clothing",
        "image": "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg",
    },
    {
        "id": 17,
        "title": "Rain Jacket Women Windbreaker Striped Climbing Raincoats",
        "price": 39.99,
        "description": "Chaqueta de lluvia con rayas para mujer.",
        "category": "women's clothing",
        "image": "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg",
    },
    {
        "id": 18,
        "title": "MBJ Women's Solid Short Sleeve Boat Neck V",
        "price": 9.85,
        "description": "Blusa de manga corta para mujer.",
        "category": "women's clothing",
        "image": "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg",
    },
    {
        "id": 19,
        "title": "Opna Women's Short Sleeve Moisture",
        "price": 7.95,
        "description": "Blusa de manga corta con control de humedad.",
        "category": "women's clothing",
        "image": "https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg",
    },
    {
        "id": 20,
        "title": "DANVOUY Womens T Shirt Casual Cotton Short",
        "price": 12.99,
        "description": "Camiseta casual de algodón para mujer.",
        "category": "women's clothing",
        "image": "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg",
    },
]

# Caché del catálogo en memoria (vacío hasta la primera carga exitosa).
_cached_products: list[dict] | None = None


async def _fetch_products() -> list[dict]:
    """Obtiene el catálogo de fakestoreapi con reintentos y User-Agent.

    Devuelve el catálogo completo de productos. Si la API externa no
    responde tras los reintentos, sirve el catálogo de respaldo.
    """
    global _cached_products

    if _cached_products is not None:
        return _cached_products

    async with httpx.AsyncClient(timeout=10.0, headers=HEADERS) as client:
        for attempt in range(1, FAKESTORE_MAX_RETRIES + 1):
            try:
                response = await client.get(FAKESTORE_URL)
                if response.status_code == 200:
                    products = response.json()
                    _cached_products = products
                    return products
                logger.warning(
                    "fakestoreapi devolvió status %s (intento %s/%s)",
                    response.status_code,
                    attempt,
                    FAKESTORE_MAX_RETRIES,
                )
            except httpx.HTTPError as exc:
                logger.warning(
                    "Error HTTP al consultar fakestoreapi (intento %s/%s): %s",
                    attempt,
                    FAKESTORE_MAX_RETRIES,
                    exc,
                )
            if attempt < FAKESTORE_MAX_RETRIES:
                await asyncio.sleep(0.5 * attempt)

    logger.error("Usando catálogo de respaldo: fakestoreapi no disponible")
    return _FALLBACK_PRODUCTS


@router.get("/", response_model=list[ProductResponse])
async def get_all_products():
    products = await _fetch_products()
    if products is None:
        raise HTTPException(status_code=500, detail="No se pudieron cargar los productos")
    return products


@router.get("/categories", response_model=list[str])
async def get_categories():
    products = await _fetch_products()
    return sorted({product["category"] for product in products})


@router.get("/{product_id}", response_model=ProductResponse)
async def get_product_by_id(product_id: int):
    products = await _fetch_products()
    for product in products:
        if product["id"] == product_id:
            return product
    raise HTTPException(status_code=404, detail="Producto no encontrado")
