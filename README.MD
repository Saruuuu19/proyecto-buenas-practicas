# E-Commerce Architecture & Sprint Board

## Integrantes

- **Santiago Guerra**
- **Santiago Suarez**
- **Andres Retamoso**

---

## Nombre del proyecto

**E-Commerce Architecture & Sprint Board**

## Descripción

Proyecto académico enfocado en la aplicación de **buenas prácticas de desarrollo de software**, mediante la construcción de una plataforma de e-commerce junto con un panel de planificación y gestión de sprints.

El proyecto está dividido en un **frontend desarrollado con React y TypeScript** y un **backend desarrollado con FastAPI y Python**. La arquitectura busca mantener una separación clara de responsabilidades, utilizando una organización **feature-first** en el frontend y una estructura modular de routers, modelos y esquemas en el backend.

Actualmente, el sistema permite consultar un catálogo de productos, obtener categorías y visualizar estadísticas administrativas derivadas del catálogo.

---

# Tecnologías

## Frontend

| Tecnología | Versión | Uso |
|---|---:|---|
| React | 19 | Librería de UI |
| TypeScript | 6 | Tipado estático |
| Vite | 8 | Bundler y servidor de desarrollo |
| Tailwind CSS | 4 | Estilos |
| React Router DOM | 7 | Enrutamiento |
| Axios | 1.19 | Cliente HTTP |
| Lucide React | 1.33 | Iconos |
| ESLint | 10 | Linting y calidad de código |

### Gestor de paquetes

**pnpm**

Lockfile:

```text
pnpm-lock.yaml
```

---

## Backend

| Tecnología | Versión | Uso |
|---|---:|---|
| Python | 3.14 | Runtime |
| FastAPI | 0.141 | Framework web |
| Pydantic | 2.13 | Validación y esquemas |
| SQLAlchemy | 2.0 | ORM y acceso a base de datos |
| python-dotenv | 1.2 | Variables de entorno |

FastAPI utiliza la instalación `[standard]`, que incluye las herramientas necesarias para ejecutar el servidor, como Uvicorn y Pydantic.

### Gestor de paquetes

**uv**

Lockfile:

```text
uv.lock
```

Build backend:

```text
hatchling
```

---

# Arquitectura del proyecto

El proyecto utiliza una arquitectura separada entre frontend y backend.

### Frontend

Se utiliza una organización **feature-first**, donde cada dominio de negocio agrupa sus componentes, hooks y páginas.

Las responsabilidades generales se dividen de la siguiente manera:

- `app/` → configuración general de la aplicación y rutas.
- `api/` → comunicación HTTP con el backend.
- `components/ui/` → componentes visuales genéricos y reutilizables.
- `features/` → funcionalidades organizadas por dominio.
- `layout/` → elementos estructurales como Header y Footer.
- `hooks/` → hooks reutilizables y transversales.
- `lib/` → utilidades generales.
- `types/` → tipos compartidos de TypeScript.

### Backend

El backend utiliza FastAPI y SQLAlchemy, separando:

- Configuración de la aplicación.
- Conexión a la base de datos.
- Modelos ORM.
- Esquemas de validación.
- Routers y endpoints.
- Datos iniciales del catálogo.

---

# Estructura del proyecto

```text
├── frontend/
│   ├── .env.example
│   └── src/
│       ├── main.tsx
│       ├── global.css
│       │
│       ├── app/
│       │   ├── App.tsx
│       │   ├── router.tsx
│       │   └── NotFound.tsx
│       │
│       ├── api/
│       │   ├── client.ts
│       │   └── products.ts
│       │
│       ├── components/
│       │   └── ui/
│       │       ├── SearchBar.tsx
│       │       ├── Spinner.tsx
│       │       └── ErrorState.tsx
│       │
│       ├── features/
│       │   ├── home/
│       │   │   ├── components/
│       │   │   │   └── HeroSection
│       │   │   └── pages/
│       │   │       └── HomePage
│       │   │
│       │   └── products/
│       │       ├── components/
│       │       │   ├── ProductCard
│       │       │   ├── ProductsGrid
│       │       │   ├── FeaturedProducts
│       │       │   └── CategoryGrid
│       │       ├── hooks/
│       │       │   ├── useProducts
│       │       │   └── useCategories
│       │       └── pages/
│       │           └── ProductsPage
│       │
│       ├── layout/
│       │   ├── Header.tsx
│       │   └── Footer.tsx
│       │
│       ├── hooks/
│       │   └── useApi.ts
│       │
│       ├── lib/
│       │   └── utils.ts
│       │
│       └── types/
│           └── index.ts
│
└── backend/
    └── app/
        ├── __init__.py
        ├── main.py
        ├── catalog.py
        ├── database.py
        ├── models.py
        ├── seed.py
        │
        ├── data/
        │   └── products.json
        │
        ├── routers/
        │   ├── products.py
        │   └── admin.py
        │
        └── schemas/
            └── products.py
```

---

# API

El backend expone los siguientes endpoints:

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/health` | Verifica el estado del servicio |
| `GET` | `/api/products/` | Obtiene la lista de productos |
| `GET` | `/api/products/categories` | Obtiene las categorías disponibles |
| `GET` | `/api/products/{id}` | Obtiene el detalle de un producto |
| `GET` | `/api/admin/stats` | Obtiene estadísticas administrativas |

## Productos

### Obtener todos los productos

```http
GET /api/products/
```

Devuelve el catálogo completo de productos.

La fuente actual de los productos es:

```text
backend/app/data/products.json
```

### Obtener categorías

```http
GET /api/products/categories
```

Devuelve las categorías únicas disponibles en el catálogo.

### Obtener un producto

```http
GET /api/products/{id}
```

Devuelve la información correspondiente al producto indicado por su `id`.

---

## Administración

### Obtener estadísticas

```http
GET /api/admin/stats
```

Devuelve estadísticas administrativas derivadas del catálogo de productos.

---

## Health Check

```http
GET /health
```

Permite verificar que el backend se encuentra funcionando correctamente.

---

# Configuración del entorno

## Frontend

El frontend utiliza una variable de entorno para definir la URL base de la API.

Crear un archivo:

```text
frontend/.env
```

A partir del archivo:

```text
frontend/.env.example
```

Configurar:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

Si no se proporciona esta variable, el frontend utiliza:

```text
http://localhost:8000/api
```

---

# Instalación y ejecución

## Requisitos

Antes de ejecutar el proyecto se debe tener instalado:

- **Node.js**
- **pnpm**
- **Python 3.14**
- **uv**

---

# Backend

Abrir una terminal y entrar al directorio del backend:

```bash
cd backend
```

Instalar las dependencias:

```bash
uv sync
```

Ejecutar el servidor:

```bash
uv run uvicorn app.main:app --reload
```

El backend estará disponible en:

```text
http://localhost:8000
```

La documentación interactiva de FastAPI estará disponible en:

```text
http://localhost:8000/docs
```

---

# Frontend

Abrir otra terminal y entrar al directorio del frontend:

```bash
cd frontend
```

Instalar las dependencias:

```bash
pnpm install
```

Ejecutar el servidor de desarrollo:

```bash
pnpm dev
```

El frontend estará disponible normalmente en:

```text
http://localhost:5173
```

---

# Scripts del Frontend

### Desarrollo

```bash
pnpm dev
```

Inicia el servidor de desarrollo de Vite.

### Build

```bash
pnpm build
```

Ejecuta TypeScript y genera el build de producción.

Internamente ejecuta:

```text
tsc -b && vite build
```

### Lint

```bash
pnpm lint
```

Ejecuta ESLint sobre el proyecto.

### Preview

```bash
pnpm preview
```

Permite previsualizar el build de producción generado.

---

# Scripts y comandos del Backend

### Instalar dependencias

```bash
uv sync
```

### Añadir una dependencia

```bash
uv add <paquete>
```

### Ejecutar el servidor

```bash
uv run uvicorn app.main:app --reload
```

---

# Comunicación Frontend ↔ Backend

El frontend utiliza **Axios** para comunicarse con la API.

La instancia principal se encuentra en:

```text
frontend/src/api/client.ts
```

La URL base se configura mediante:

```env
VITE_API_BASE_URL
```

Por defecto:

```text
http://localhost:8000/api
```

El backend permite solicitudes CORS desde:

```text
http://localhost:5173
http://127.0.0.1:5173
```

---

# Base de datos

El proyecto utiliza **SQLAlchemy 2.0** para la interacción con la base de datos.

La configuración de conexión se encuentra en:

```text
backend/app/database.py
```

La conexión utiliza la variable de entorno:

```env
DATABASE_URL
```

El modelo principal actualmente definido es:

```text
backend/app/models.py
```

y corresponde a la entidad:

```text
Product
```

---

# Catálogo de productos

Los datos iniciales del catálogo se encuentran en:

```text
backend/app/data/products.json
```

Actualmente contiene **15 productos**.

El archivo:

```text
backend/app/catalog.py
```

se encarga de cargar el catálogo.

El archivo:

```text
backend/app/seed.py
```

permite poblar la base de datos utilizando el catálogo de productos de forma idempotente.

---

# Buenas prácticas aplicadas

El proyecto busca aplicar principios de buenas prácticas de desarrollo de software, entre ellos:

- Separación de responsabilidades.
- Arquitectura modular.
- Organización **feature-first** en el frontend.
- Separación entre UI y lógica de negocio.
- Reutilización de componentes.
- Tipado estático mediante TypeScript.
- Validación de datos mediante Pydantic.
- Separación entre modelos ORM y esquemas de API.
- Uso de variables de entorno para configuración.
- Manejo centralizado de las peticiones HTTP mediante Axios.
- Linting mediante ESLint.
- Gestión reproducible de dependencias mediante `pnpm` y `uv`.
- Uso de una API REST mediante FastAPI.

---

# Flujo general de la aplicación

```text
Usuario
   │
   ▼
Frontend (React + TypeScript)
   │
   │ Axios / HTTP
   ▼
Backend (FastAPI)
   │
   ├── Products Router
   │       │
   │       ▼
   │   Catálogo / Products
   │
   └── Admin Router
           │
           ▼
       Estadísticas
```

---

# Estado actual

El proyecto cuenta actualmente con:

- Catálogo de productos.
- Consulta de productos mediante API.
- Consulta individual de productos.
- Consulta de categorías.
- Estadísticas administrativas.
- Frontend desarrollado con React.
- Comunicación frontend-backend mediante Axios.
- Backend desarrollado con FastAPI.
- Modelado mediante SQLAlchemy.
- Validación mediante Pydantic.
- Configuración mediante variables de entorno.
- Arquitectura feature-first en frontend.
- Configuración de CORS.
- Sistema de instalación reproducible mediante `pnpm` y `uv`.

---

# Licencia

Proyecto académico desarrollado con fines educativos para la aplicación de buenas prácticas de desarrollo de software.
