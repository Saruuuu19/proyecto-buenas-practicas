# ADR-002: Almacenamiento de imágenes de productos


- **Fecha:** 2026-10-20
- **Origen:** Propuesta individual de Andrés Retamoso (PR #15, renumerada en la PR #17).
- **Relación:** Complementa al [ADR-001](adr-001-almacenamiento.md) sin cambiar los buckets ni la API de la entrega.

## Contexto

El proyecto TechFlow es un e-commerce académico con frontend en React y backend en FastAPI.
Actualmente el catálogo inicial de 15 productos se encuentra en `backend/app/data/products.json`.
Las imágenes del catálogo se referencian mediante URLs externas de Unsplash, no se almacenan en el repositorio ni en un servicio propio.
El backend expone endpoints de consulta de productos, pero no cuenta con endpoints para cargar o administrar archivos.
Aunque el proyecto utiliza SQLAlchemy para la persistencia de datos, no se observa una integración con almacenamiento de objetos.
Esta situación sirve para el prototipo, pero deja las imágenes sujetas a disponibilidad y cambios del servicio externo y no permite administrarlas desde el proyecto.
El equipo quiere controlar quién puede modificar las imágenes y poder recuperar versiones anteriores ante un reemplazo accidental. La decisión está aprobada, pero su implementación queda fuera de esta entrega.

## Decisión

Se usará **un bucket compartido y dedicado** a las imágenes del catálogo, separado de los buckets de los tres sitios. Los tres sitios podrán leer las mismas imágenes sin guardarlas por triplicado.

- **Acceso:** permitir lectura pública de los objetos bajo `productos/`, incluidos los originales, sin URLs firmadas. Denegar el listado público del bucket. Limitar la carga, sustitución y eliminación de objetos al backend mediante credenciales o un rol de servicio; no exponer esas credenciales al frontend.
- **Prefijos:** guardar imágenes originales bajo `productos/originales/` y, si se generan imágenes optimizadas o miniaturas, bajo `productos/derivadas/`. Los prefijos organizan los objetos, pero no sustituyen las políticas de acceso.
- **Versionado:** habilitarlo en el bucket para poder recuperar una versión anterior de una imagen sobrescrita o eliminada accidentalmente.
- **Ciclo de vida:** eliminar las versiones no actuales después de **90 días**. Además, eliminar cargas multiparte incompletas después de **7 días** para no conservar fragmentos de cargas abandonadas. No establecer una expiración para las versiones actuales de las imágenes.

## Alternativas consideradas

1. **No activar el versionado.** Se descarta porque un reemplazo o borrado accidental de una imagen no tendría una versión anterior recuperable desde el bucket. Se reconoce que el versionado no reemplaza una copia de seguridad independiente.
2. **Dar permisos de escritura al navegador.** Se descarta porque permitiría cargas, reemplazos o borrados que no estén autorizados por el backend. El navegador solo necesita leer las imágenes que se muestran en el catálogo.
3. **Activar versionado sin regla de ciclo de vida.** Se descarta porque las versiones no actuales podrían acumularse indefinidamente y aumentar el costo de almacenamiento. La retención de 90 días busca equilibrar recuperación y costo.
4. **Reutilizar los tres buckets de los sitios.** Se descarta porque habría que copiar y actualizar las mismas imágenes en cada despliegue.

## Consecuencias

### Positivas

- El proyecto tendría un lugar controlado para alojar y administrar las imágenes del catálogo.
- El backend sería el único componente autorizado para modificar archivos; el navegador solo necesitaría leer las imágenes públicas.
- El versionado permitiría recuperar versiones anteriores durante el período definido por la regla de ciclo de vida.
- Los prefijos separarían los originales de las imágenes derivadas y facilitarían su administración.

### Costos previstos

- Se incurrirá en costos de almacenamiento y solicitudes del proveedor, incluidos los de las versiones no actuales que se conserven durante un máximo de 90 días.
- Habrá que implementar la integración de carga en el backend, guardar las claves o URLs de los objetos en los datos del catálogo y migrar las referencias externas cuando corresponda.
- El equipo deberá configurar y proteger permisos, credenciales y políticas de acceso; el uso de un bucket no resuelve por sí solo la seguridad de la aplicación.

### Revisar más adelante

- Elegir el proveedor y verificar que permita aplicar las políticas de acceso y ciclo de vida propuestas.
- Confirmar si 90 días de retención y 7 días para cargas incompletas son adecuados según el costo, el volumen y las necesidades de recuperación.
- Revisar la necesidad de separar buckets por entorno (desarrollo, pruebas y producción), especialmente antes de desplegar el proyecto.
- Evaluar copias de seguridad independientes y requisitos de privacidad, derechos de uso y eliminación de imágenes.
