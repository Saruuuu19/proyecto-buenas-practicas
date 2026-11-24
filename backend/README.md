# Backend — TechFlow Store API

API REST de FastAPI del e-commerce TechFlow. Sirve el catálogo desde un archivo JSON local (`app/data/products.json`), con conexión a base de datos mediante SQLAlchemy.

## Stack

- Python 3.14
- FastAPI 0.141 (`[standard]`, incluye uvicorn y pydantic)
- Pydantic 2.13
- SQLAlchemy 2.0 + psycopg2 (conexión a base de datos)

Manager de paquetes: **uv** (lockfile: `uv.lock`, build: hatchling).

## Endpoints

| Método | Ruta                       | Descripción                                   |
| ------ | -------------------------- | --------------------------------------------- |
| GET    | `/health`                  | Health check del servicio                     |
| GET    | `/api/products/`           | Lista de productos (fuente: `products.json`) |
| GET    | `/api/products/categories` | Categorías únicas del catálogo                |
| GET    | `/api/products/{id}`       | Detalle de un producto por id                 |
| GET    | `/api/admin/stats`         | Estadísticas de administración                |

## Ejecución

```bash
uv sync          # instala dependencias
uv run uvicorn app.main:app --reload
```

La API queda en `http://localhost:8000`. Docs interactivas en `http://localhost:8000/docs`.

## Estructura

```
app/
├── main.py            # Instancia de FastAPI + middleware CORS + routers
├── catalog.py         # Carga el catálogo desde data/products.json (fuente de verdad)
├── database.py        # Engine y sesión de SQLAlchemy (DATABASE_URL)
├── models.py          # Modelo Product (tabla products)
├── seed.py            # Puebla la BD desde products.json (idempotente)
├── data/
│   └── products.json  # Catálogo de productos (15 items)
├── routers/
│   ├── products.py    # Endpoints del catálogo (lee de products.json)
│   └── admin.py       # Stats de administración derivadas del catálogo
└── schemas/
    └── products.py    # Modelos Pydantic (ProductBase, ProductResponse, ProductCreate)
```

CORS habilitado para `http://localhost:5173` y `http://127.0.0.1:5173` (dev server del frontend).
