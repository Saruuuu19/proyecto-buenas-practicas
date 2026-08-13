### Guía de instalación y ejecución en local

1. **Clonar el repositorio:**

```bash
git clone -b dev https://github.com/Saruuuu19/proyecto-buenas-practicas.git
cd proyecto-buenas-practicas
```

2. **Crear rama de trabajo para cambios**

```bash
git checkout -b feature/<nombre-de-la-feature>
```

### Comandos básicos de Git

1. **Clonar el proyecto**

```bash
git clone git clone -b dev https://github.com/Saruuuu19/proyecto-buenas-practicas.git
cd proyecto-buenas-practicas
```

2. **Traer todos los últimos cambios DE LA RAMA DEV**

```bash
# 1. Cambias a la rama principal
git checkout main

# 2. Descargas los últimos cambios de GitHub
git pull origin main

# 3. Creas tu nueva rama a partir de lo actualizado
git checkout -b feature/<nombre-de-la-feature>
```

3. **Crear y cambiar a la rama de trabajo**

```bash
git checkout -b feature/<nombre-de-la-feature>
```

4. **Guardar todos los cambios locales**

```bash
git add .
```

5. **Crear punto de guardado: "Commit"**

```bash
git commit -m "<titulo-del-cambio-realizado>"
```

6. **Subir la rama de tu feature a github**

```bash
git push origin feature/<nombre-de-la-feature>
```

7. **Sincronizar tu rama si `dev` fue actualizada por un compañero (PARA EVITAR/RESOLVER CONFLICTOS)**

```bash
# Estando posicionado en tu rama de trabajo (ej. feature/carrito-de-compras):
git pull origin dev
```

### Crear un Pull Request (PR) en GitHub

- **Entra al repositorio en GitHub.**

- **Verás un botón amarillo que dice "Compare & pull request". Haz clic ahí.**

- **Escribe un título breve (corto y conciso) y una descripción (BIEN EXPLICADA) de lo que hiciste.**
