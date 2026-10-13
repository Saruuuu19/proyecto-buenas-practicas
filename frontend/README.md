# Frontend — TechFlow Store

Aplicación React + Vite + TypeScript del e-commerce TechFlow. Consume la API de FastAPI en `/backend`.

## Stack

- React 19 + TypeScript
- Vite 8 (bundler / dev server)
- Tailwind CSS 4 (estilos en `src/global.css`)
- React Router DOM 7 (enrutado)
- Axios (cliente HTTP)
- Lucide React (iconos)
- ESLint 10 + typescript-eslint

Manager de paquetes: **pnpm**.

## Estructura

Arquitectura **feature-first**: cada dominio de negocio vive en `src/features/<dominio>/` con sus componentes, hooks y páginas. La capa HTTP está en `src/api/`, la UI genérica en `src/components/ui/`, y el layout en `src/layout/`.

```
src/
├── main.tsx
├── global.css
├── app/            # Layout raíz, rutas y 404
├── api/            # client.ts (axios) + products.ts (endpoints tipados)
├── components/ui/  # SearchBar, Spinner, ErrorState
├── features/
│   ├── home/       # HeroSection + HomePage
│   └── products/   # ProductCard, FeaturedProducts, CategoryGrid, useProducts, useCategories, ProductsPage
├── layout/         # Header, Footer
├── hooks/          # useApi (fetch + loading/error/reload)
├── lib/            # utils.ts (normalize, formatPrice)
└── types/          # Tipos compartidos (Product)
```

## Configuración

1. Instalar dependencias:

```bash
pnpm install
```

2. (Opcional) Crear `.env` a partir de `.env.example` para apuntar a otra URL de API:

```bash
cp .env.example .env
```

3. Levantar el dev server:

```bash
pnpm dev
```

## Scripts

- `pnpm dev` — servidor de desarrollo (puerto 5173)
- `pnpm build` — `tsc -b && vite build`
- `pnpm lint` — `eslint .`
- `pnpm preview` — previsualiza el build

## Notas

- Los productos se obtienen del backend (`GET /api/products/`), que a su vez los proxya desde fakestoreapi.com. No hay datos mock en el frontend.
- La búsqueda y el filtro por categoría usan query params (`/productos?search=...` y `/productos?category=...`).