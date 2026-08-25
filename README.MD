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

```
├── frontend/                  # React + Vite + Tailwind
│   └── src/
│       ├── App.tsx
│       ├── main.tsx
│       └── global.css
└── backend/                   # FastAPI + SQLAlchemy
    └── app/
        ├── __init__.py
        ├── main.py            # Instancia de FastAPI + middleware CORS
        └── routers/
            ├── products.py
            └── admin.py
```
