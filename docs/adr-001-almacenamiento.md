# ADR-001: Almacenamiento y despliegue del equipo en AWS


- **Fecha:** 2026-11-19

## Contexto

TechFlow Store es un proyecto de equipo con tres sitios publicados en Amazon S3, uno por integrante. La documentación de la PR #14 describe los buckets de Santiago Guerra. Este ADR describe lo que se comparte en la entrega y lo que cada integrante mantiene por separado.

## Decisión

- **Un bucket público por integrante.** Sirve el frontend compilado. El acceso público se limita a la lectura de los archivos del sitio. No se guardan allí datos privados ni credenciales.
- **Un bucket privado por integrante.** El acceso público permanece bloqueado. Los buckets quedan reservados para uso futuro: la API no los lee ni escribe en ellos y no recibe permisos para acceder a ellos en esta entrega.
- **Una API compartida en EC2.** Los tres sitios apuntan a la misma API mediante `VITE_API_BASE_URL`. En EC2, configura `FRONTEND_URL` únicamente con estos tres orígenes, separados por comas y sin barras finales:

| Integrante | Origen del sitio |
| --- | --- |
| Andrés Retamoso | `http://cuc-bp-retamoso-sitio-2026.s3-website-us-east-1.amazonaws.com` |
| Santiago Suarez | `http://cuc-bp-suarez-sitio-2026.s3-website-us-east-1.amazonaws.com` |
| Santiago Guerra | `http://cuc-bp-guerra-sitio-2026.s3-website-us-east-1.amazonaws.com` |

## Alternativas consideradas

- **Una API por integrante:** duplicaría la configuración, las pruebas y el mantenimiento sin aportar una funcionalidad distinta al proyecto final.
- **Guardar el sitio y los datos privados en un mismo bucket:** un error en la política pública del sitio podría exponer datos que no deberían ser accesibles.

## Consecuencias y alcance

- Se mantienen los tres sitios existentes sin duplicar la API. Si la API de EC2 deja de responder, los tres sitios se quedan sin acceso al catálogo.
- Antes de entregar, se comprueba que los tres sitios carguen el catálogo desde la misma API y que los buckets privados no sean accesibles de forma anónima.
- Netlify y Render pueden mantenerse como demo aparte; no forman parte del despliegue oficial de AWS.
- Este ADR no fija una política común de versionado o retención para los buckets de cada integrante. El [ADR-002](adr-002-imagenes-productos.md) documenta la decisión sobre las imágenes del catálogo, cuya implementación queda fuera de esta entrega.
