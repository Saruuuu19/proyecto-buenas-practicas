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
| PATCH  | `/api/products/{id}`      | Edita un producto; requiere `X-Admin-API-Key` |
| GET    | `/api/admin/stats`         | Estadísticas de administración                |
| POST   | `/api/checkout/preview`    | Resumen precompra de solo lectura, sin API key |

El alta y la edición aceptan precios mayores que cero, hasta `99999999.99`, con un máximo de dos decimales.

`PATCH /api/products/16` con `{"price": 29.99}` cambia solo el precio. Devuelve `200` con el producto actualizado, `404` si no existe o `400` si el ID o los datos no son válidos. Se puede editar `title`, `price`, `description`, `category` e `image`; envía al menos uno de esos campos.

### Resumen precompra

`POST /api/checkout/preview` es público. Usa los títulos y precios vigentes de la base de datos, conserva el orden de los ítems y devuelve los importes en centésimos como enteros. No guarda el carrito, ni crea pedidos, ni valida stock, ni procesa pagos.

Solicitud:

```json
{"items":[{"product_id":1,"quantity":2}]}
```

Respuesta `200`:

```json
{"items":[{"product_id":1,"quantity":2,"title":"Teclado","unit_price_cents":1999,"subtotal_cents":3998}],"total_cents":3998}
```

Devuelve `422` para solicitudes inválidas: se requieren entre 1 y 100 ítems con IDs positivos sin repetir y cantidades entre 1 y 100. Los IDs y las cantidades deben ser enteros JSON (no texto, decimales ni booleanos). Si falta algún producto, devuelve `404` con `detail.missing_product_ids` y no devuelve un resumen parcial.

## Ejecución

Configura `DATABASE_URL` en `.env` (ver `.env.example`). Para crear o editar productos, configura `ADMIN_API_KEY` solo en el backend.

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

## CORS

`FRONTEND_URL` es la lista completa de orígenes permitidos, separados por comas y sin barra final. Si no se configura, no se autoriza ningún origen. En desarrollo usa los orígenes de `.env.example`; en EC2 configura únicamente los tres orígenes S3 del [ADR-001](../docs/adr-001-almacenamiento.md).

CORS permite `GET` para lectura y `POST` solo en `/api/checkout/preview` (sin barra final), sin credenciales. Se admite `Content-Type` para enviar JSON, pero no `X-Admin-API-Key`. Las escrituras administrativas mantienen su autenticación y no se habilitan por CORS.
