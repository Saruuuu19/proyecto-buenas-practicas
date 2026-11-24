# Backend — TechFlow Store API

API REST de FastAPI del e-commerce TechFlow. Lee y guarda el catálogo en la tabla `products` mediante SQLAlchemy. El archivo `app/data/products.json` solo se usa para la carga inicial.

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
| GET    | `/api/products/`           | Lista de productos de la base, ordenada por ID |
| GET    | `/api/products/categories` | Categorías únicas del catálogo                |
| GET    | `/api/products/{id}`       | Detalle de un producto por id                 |
| POST   | `/api/products`           | Guarda un producto; requiere `X-Admin-API-Key` |
| GET    | `/api/admin/stats`         | Estadísticas de administración                |

El alta acepta precios mayores que cero, hasta `99999999.99`, con un máximo de dos decimales.

## Ejecución

Configura `DATABASE_URL` en `.env` (ver `.env.example`). Si vas a usar el alta, configura `ADMIN_API_KEY` solo en el backend.

```bash
uv sync
uv run python -m app.seed                # carga inicial con la API detenida
uv run uvicorn app.main:app --reload
```

El `seed` crea la tabla si no existe, conserva los IDs del JSON y solo inserta si la tabla está vacía. Si ya tiene datos, revísalos antes de activar esta versión: la API mostrará esas filas, no el JSON. Sin carga inicial, una tabla vacía se sirve como un catálogo vacío.

La API queda en `http://localhost:8000`. Docs interactivas en `http://localhost:8000/docs`. Las pruebas locales se ejecutan con `uv run python -m pytest`.

## Estructura

```
app/
├── main.py            # Instancia de FastAPI + middleware CORS + routers
├── catalog.py         # Consultas y alta de productos en la base de datos
├── database.py        # Engine y sesión de SQLAlchemy (DATABASE_URL)
├── models.py          # Modelo Product (tabla products)
├── seed.py            # Puebla la BD desde products.json (idempotente)
├── data/
│   └── products.json  # Catálogo de productos (15 items)
├── routers/
│   ├── products.py    # Consulta y alta del catálogo
│   └── admin.py       # Stats de administración derivadas del catálogo
└── schemas/
    └── products.py    # Modelos Pydantic (ProductBase, ProductResponse, ProductCreate)
```

CORS habilitado para `http://localhost:5173` y `http://127.0.0.1:5173` (dev server del frontend).
