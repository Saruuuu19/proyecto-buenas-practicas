# E-Commerce Architecture & Sprint Board

Proyecto de buenas prácticas de desarrollo de software: un panel de planificación de sprints y arquitectura para una plataforma de e-commerce.

## Stack completo

### Frontend (`/frontend`)

| Tecnología       | Versión | Uso                                                  |
| ---------------- | ------- | ---------------------------------------------------- |
| React            | 19      | Librería de UI                                       |
| TypeScript       | 6       | Tipado estático                                      |
| Vite             | 8       | Bundler / dev server                                 |
| Tailwind CSS     | 4       | Estilos (un único `src/global.css`)                  |
| React Router DOM | 7       | Enrutado                                             |
| Axios            | 1.19    | Cliente HTTP                                         |
| Lucide React     | 1.33    | Iconos                                               |
| ESLint           | 10      | Lint + `eslint-plugin-react-hooks` / `react-refresh` |

Manager de paquetes: **pnpm** (lockfile: `pnpm-lock.yaml`).

Scripts:

- `pnpm dev` — servidor de desarrollo
- `pnpm build` — `tsc -b && vite build`
- `pnpm lint` — `eslint .`
- `pnpm preview` — previsualiza el build

### Backend (`/backend`)

| Tecnología    | Versión              | Uso                                       |
| ------------- | -------------------- | ----------------------------------------- |
| Python        | 3.14                 | Runtime                                   |
| FastAPI       | 0.141 (`[standard]`) | Framework web (incluye uvicorn, pydantic) |
| Pydantic      | 2.13                 | Validación / modelos                      |
| SQLAlchemy    | 2.0                  | ORM                                       |
| python-dotenv | 1.2                  | Variables de entorno                      |

Manager de paquetes: **uv** (lockfile: `uv.lock`, build backend: **hatchling**).

Scripts:

- `uv sync` — instala dependencias
- `uv run uvicorn app.main:app --reload` — servidor de desarrollo
- `uv add <paquete>` — añade dependencia

## Estructura

Frontend con arquitectura **feature-first**: cada dominio de negocio agrupa sus componentes, hooks y páginas; la UI genérica y la capa HTTP quedan separadas para reutilizarse.

```
├── frontend/                            # React + Vite + Tailwind + TS
│   ├── .env.example                     # VITE_API_BASE_URL
│   └── src/
│       ├── main.tsx                     # Punto de entrada
│       ├── global.css                   # Estilos globales / tokens Tailwind
│       ├── app/                         # Capa de aplicación
│       │   ├── App.tsx                  # Layout raíz (Header/Footer/Routes)
│       │   ├── router.tsx               # Definición de rutas
│       │   └── NotFound.tsx             # Página 404
│       ├── api/                         # Capa HTTP por recurso
│       │   ├── client.ts                # Instancia axios (baseURL + headers)
│       │   └── products.ts              # getProducts / getProduct / getCategories
│       ├── components/
│       │   └── ui/                      # UI genérica reutilizable
│       │       ├── SearchBar.tsx
│       │       ├── Spinner.tsx
│       │       └── ErrorState.tsx
│       ├── features/                    # Módulos por dominio de negocio
│       │   ├── home/
│       │   │   ├── components/          # HeroSection
│       │   │   └── pages/               # HomePage
│       │   └── products/
│       │       ├── components/          # ProductCard, ProductsGrid, FeaturedProducts, CategoryGrid
│       │       ├── hooks/               # useProducts, useCategories
│       │       └── pages/               # ProductsPage
│       ├── layout/                      # Header.tsx, Footer.tsx
│       ├── hooks/                       # Hooks transversales (useApi)
│       ├── lib/                         # Utilidades (utils.ts)
│       └── types/                       # Tipos compartidos (index.ts)
└── backend/                             # FastAPI + SQLAlchemy
    └── app/
        ├── __init__.py
        ├── main.py                      # Instancia de FastAPI + middleware CORS + routers
        ├── routers/
        │   ├── products.py              # Proxy a fakestoreapi.com
        │   └── admin.py                 # Stats de administración
        └── schemas/
            └── products.py              # Modelos Pydantic (ProductBase, ProductResponse)
```

## API (backend)

| Método | Ruta                       | Descripción                                   |
| ------ | -------------------------- | --------------------------------------------- |
| GET    | `/health`                  | Health check del servicio                     |
| GET    | `/api/products/`           | Lista de productos (proxy a fakestoreapi.com) |
| GET    | `/api/products/categories` | Categorías únicas del catálogo                |
| GET    | `/api/products/{id}`       | Detalle de un producto por id                 |
| GET    | `/api/admin/stats`         | Estadísticas de administración                |

El frontend consume la API mediante axios con `baseURL` configurable vía `VITE_API_BASE_URL` (por defecto `http://localhost:8000/api`). CORS permite `http://localhost:5173` y `http://127.0.0.1:5173`.
