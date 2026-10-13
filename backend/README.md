# Backend — TechFlow Store API

API REST de FastAPI del e-commerce TechFlow. Sirve el catálogo proxyando **fakestoreapi.com** y expone estadísticas de administración.

## Stack

- Python 3.14
- FastAPI 0.141 (`[standard]`, incluye uvicorn y pydantic)
- Pydantic 2.13
- httpx (cliente HTTP para el proxy)
- SQLAlchemy 2.0 (preparado para base de datos)

Manager de paquetes: **uv** (lockfile: `uv.lock`, build: hatchling).

## Endpoints

| Método | Ruta                       | Descripción                                  |
| ------ | -------------------------- | -------------------------------------------- |
| GET    | `/health`                  | Health check del servicio                     |
| GET    | `/api/products/`           | Lista de productos (proxy a fakestoreapi.com) |
| GET    | `/api/products/categories` | Categorías únicas del catálogo               |
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
├── routers/
│   ├── products.py    # Proxy a fakestoreapi.com
│   └── admin.py       # Stats de administración
└── schemas/
    └── products.py    # Modelos Pydantic (ProductBase, ProductResponse, ProductCreate)
```

CORS habilitado para `http://localhost:5173` y `http://127.0.0.1:5173` (dev server del frontend).