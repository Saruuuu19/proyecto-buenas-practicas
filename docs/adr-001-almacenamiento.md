# ADR-001: Almacenamiento de imágenes de productos

- **Estado:** Propuesta para revisión del equipo
- **Fecha:** 2026-10-20
- **Decisora:** Propuesta individual

## Contexto

El proyecto TechFlow es un e-commerce académico con frontend en React y backend en FastAPI.
Actualmente el catálogo inicial de 15 productos se encuentra en `backend/app/data/products.json`.
Las imágenes del catálogo se referencian mediante URLs externas de Unsplash, no se almacenan en el repositorio ni en un servicio propio.
El backend expone endpoints de consulta de productos, pero no cuenta con endpoints para cargar o administrar archivos.
Aunque el proyecto utiliza SQLAlchemy para la persistencia de datos, no se observa una integración con almacenamiento de objetos.
Esta situación sirve para el prototipo, pero deja las imágenes sujetas a disponibilidad y cambios del servicio externo y no permite administrarlas desde el proyecto.
Se propone definir una solución sencilla para almacenar imágenes del catálogo, controlar quién puede modificarlas y poder recuperar versiones anteriores ante un reemplazo accidental.
Esta propuesta no implica que el almacenamiento esté implementado; el equipo deberá revisar y aprobar la decisión antes de adoptarla.

## Decisión

Se propone utilizar **un bucket** dedicado a los archivos del e-commerce, inicialmente para las imágenes de productos. La decisión es independiente del proveedor; la elección del servicio concreto y su configuración quedan pendientes de revisión del equipo.

- **Cantidad:** un bucket para los archivos de la aplicación.
- **Acceso:** permitir lectura pública de los objetos bajo `productos/`, necesaria para mostrarlos en el catálogo. Denegar el listado público del bucket. Limitar la carga, sustitución y eliminación de objetos al backend mediante credenciales o un rol de servicio; no exponer esas credenciales al frontend.
- **Prefijos:** guardar imágenes originales bajo `productos/originales/` y, si se generan imágenes optimizadas o miniaturas, bajo `productos/derivadas/`. Los prefijos organizan los objetos, pero no sustituyen las políticas de acceso.
- **Versionado:** habilitarlo en el bucket para poder recuperar una versión anterior de una imagen sobrescrita o eliminada accidentalmente.
- **Ciclo de vida:** eliminar las versiones no actuales después de **90 días**. Además, eliminar cargas multiparte incompletas después de **7 días** para no conservar fragmentos de cargas abandonadas. No establecer una expiración para las versiones actuales de las imágenes.

## Alternativas consideradas

1. **No activar el versionado.** Se descarta porque un reemplazo o borrado accidental de una imagen no tendría una versión anterior recuperable desde el bucket. Se reconoce que el versionado no reemplaza una copia de seguridad independiente.
2. **Usar un único bucket completamente público.** Se descarta porque hacer público todo el bucket y permitir operaciones de escritura desde el cliente aumentaría el riesgo de cargas, reemplazos o borrados no autorizados. La lectura pública se limita al prefijo de imágenes y las escrituras quedan en el backend.
3. **Activar versionado sin regla de ciclo de vida.** Se descarta porque las versiones no actuales podrían acumularse indefinidamente y aumentar el costo de almacenamiento. La retención propuesta de 90 días busca equilibrar recuperación y costo.

## Consecuencias

### Positivas

- El proyecto tendría un lugar controlado para alojar y administrar las imágenes del catálogo.
- El backend sería el único componente autorizado para modificar archivos; el navegador solo necesitaría leer las imágenes públicas.
- El versionado permitiría recuperar versiones anteriores durante el período definido por la regla de ciclo de vida.
- Los prefijos separarían los originales de las imágenes derivadas y facilitarían su administración.

### Costos aceptados

- Se incurrirá en costos de almacenamiento y solicitudes del proveedor, incluidos los de las versiones no actuales que se conserven durante un máximo de 90 días.
- Habrá que implementar la integración de carga en el backend, guardar las claves o URLs de los objetos en los datos del catálogo y migrar las referencias externas cuando corresponda.
- El equipo deberá configurar y proteger permisos, credenciales y políticas de acceso; el uso de un bucket no resuelve por sí solo la seguridad de la aplicación.

### Revisar más adelante

- Elegir el proveedor y verificar que permita aplicar las políticas de acceso y ciclo de vida propuestas.
- Confirmar si 90 días de retención y 7 días para cargas incompletas son adecuados según el costo, el volumen y las necesidades de recuperación.
- Revisar si los originales deben ser privados y servirse mediante URLs firmadas, o si la lectura pública de imágenes de productos sigue siendo apropiada.
- Revisar la necesidad de separar buckets por entorno (desarrollo, pruebas y producción), especialmente antes de desplegar el proyecto.
- Evaluar copias de seguridad independientes y requisitos de privacidad, derechos de uso y eliminación de imágenes.
