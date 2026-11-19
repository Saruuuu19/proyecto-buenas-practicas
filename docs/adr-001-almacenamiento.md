# ADR-001: Diseño del almacenamiento del proyecto en Amazon S3

- Fecha: 2026-10-20
- Autor: Santiago Guerra Perez
- Estado: Aceptada

## Contexto

TechFlow Store es una tienda en línea con un front-end en React + Vite y un backend en FastAPI. Hasta la Fase 1 el front-end estaba publicado en Netlify; en la Fase 1 se movió a un bucket de Amazon S3 con alojamiento de sitio web estático, como primer paso para llevar todo el proyecto a AWS (servidor y base de datos llegan en las fases siguientes).

Ese despliegue quedó funcionando, pero sin ninguna protección. Si alguien borra o sobrescribe por error `index.html`, el sitio cae con un 404 y la única forma de recuperarlo es volver a compilar y subir el build. Además, el proyecto va a empezar a manejar datos que no pueden ser públicos (facturas, respaldos de la base de datos, logs), y no había un criterio definido sobre dónde guardarlos ni quién puede leerlos.

Por último, cualquier mecanismo de protección contra borrados (como el versionado) acumula copias, y cada copia cuesta. El presupuesto del laboratorio es de 50 USD por semestre y no se recarga, así que la retención también tiene que estar controlada.

## Decisión

Se usan **dos buckets** en `us-east-1`, separados por quién tiene derecho a leer su contenido:

| Bucket | Acceso | Contenido |
|---|---|---|
| `cuc-bp-guerra-sitio-2026` | Público: bloqueo de acceso público desactivado y política que solo concede `s3:GetObject` a `*` | El build del front-end (`frontend/dist`): `index.html`, JS, CSS e imágenes del catálogo |
| `cuc-bp-guerra-privado-2026` | Privado: bloqueo de acceso público activado y sin política de bucket. Solo lo lee el backend con credenciales | Datos internos y de clientes |

**Prefijos del bucket privado:**

- `facturas/`: facturas de compra de los clientes.
- `respaldos/`: copias de la base de datos.
- `logs/`: registros del servidor.
- `comprobantes/`: comprobantes de pago que suban los clientes.

**Versionado activado en los dos buckets.** En el bucket privado es lo más importante, porque facturas y respaldos no existen en ningún otro lugar. En el del sitio permite revertir un despliegue o un borrado en segundos, sin recompilar.

**Regla de ciclo de vida `retencion-sitio`** en el bucket del sitio, aplicada a todos los objetos:

- Versiones vigentes a **S3 Standard-IA a los 30 días**.
- Versiones vigentes a **S3 Glacier Instant Retrieval a los 90 días**.
- **Eliminación de las versiones no vigentes a los 30 días** de dejar de ser vigentes.

Se eligió Glacier *Instant Retrieval* y no *Flexible Retrieval* ni *Deep Archive* porque estas dos últimas no permiten leer el objeto sin restaurarlo antes; si un archivo del sitio pasara a esas clases, el sitio dejaría de servirlo.

## Alternativas consideradas

**1. Dejar el sitio en Netlify.** Era la opción más simple y ya funcionaba, con HTTPS incluido. Se descartó porque deja el front-end fuera de la infraestructura donde van a vivir el servidor y la base de datos, y porque Netlify no da control sobre permisos por objeto, versionado ni reglas de retención, que son justo lo que este ADR necesita decidir.

**2. Un solo bucket para todo, separando por prefijos.** Ahorra un bucket y simplifica la administración. Se descartó porque el sitio necesita el bloqueo de acceso público desactivado. Con un solo bucket, la seguridad de las facturas y los respaldos dependería de que una política por prefijo esté escrita sin errores: un `Resource` mal puesto (por ejemplo `/*` en lugar de `sitio/*`) expondría todos los datos de los clientes. Con dos buckets, el privado queda protegido por defecto por la denegación implícita, aunque alguien se equivoque en la política del público.

**3. No activar versionado.** No genera costo adicional. Se descartó porque en el laboratorio se comprobó que, con versionado, borrar `index.html` se deshace quitando el marcador de eliminación; sin él, el mismo borrado es irreversible. Para los datos del bucket privado, un borrado accidental sería una pérdida definitiva.

**4. Versionado sin regla de ciclo de vida.** Protege igual contra borrados, pero cada despliegue deja una versión vieja de cada archivo y nadie la elimina nunca. El costo crece con cada despliegue durante toda la vida del proyecto. Se descartó porque la regla resuelve ese crecimiento de forma automática y se configura una sola vez.

**5. Pasar los archivos a Glacier Flexible Retrieval o Deep Archive.** Son las clases más baratas. Se descartaron para el bucket del sitio porque recuperar un archivo tarda de minutos a horas, y durante ese tiempo la tienda no podría mostrarlo.

## Consecuencias

### Positivas

- Un borrado o una sobrescritura accidental se deshace sin volver a subir nada.
- Los datos privados quedan protegidos por defecto: si no se concede un permiso, no existe.
- Los prefijos permiten aplicar reglas distintas a cada tipo de dato (por ejemplo, borrar `logs/` antes que `facturas/`) y dar permisos de IAM por prefijo al backend.
- El costo del versionado queda acotado de forma automática.

### Costos o desventajas que aceptamos

- Dos buckets que mantener en lugar de uno.
- El sitio se sirve por `http://`, sin HTTPS, porque el alojamiento estático de S3 no trae certificado.
- Standard-IA y Glacier Instant Retrieval cobran más por cada lectura y tienen duraciones mínimas de cobro (30 y 90 días).
- Las transiciones se cobran por solicitud. S3 no mueve objetos menores de 128 KB, así que en este sitio solo el archivo JS cambia de clase y el ahorro real hoy es casi nulo.
- Después de 30 días las versiones viejas se borran: un error que se detecte más tarde ya no se puede revertir desde S3, solo reconstruyendo desde Git.

### Qué habría que revisar más adelante

- Poner CloudFront delante del bucket del sitio para tener HTTPS. Es necesario antes de conectar el backend.
- Crear reglas de ciclo de vida propias para el bucket privado, por prefijo (por ejemplo, retención legal de facturas frente a borrado temprano de logs).
- Revisar si 30 días de versiones no vigentes es suficiente cuando haya despliegues frecuentes.
- Definir el rol de IAM del backend con acceso solo a los prefijos que necesita.
