# Despliegue de Libertadepelota (TP13)

Esta guia prepara el frontend en Firebase Hosting y el backend Express en Google Cloud Run. No se debe guardar ningun secreto en Git.

## Arquitectura publicada

```text
Firebase Hosting (React) -- Firebase ID token --> Cloud Run (Express) --> Firestore
```

El servicio de Cloud Run debe permitir invocaciones publicas para que el navegador llegue a Express. La seguridad de la API sigue estando en `authenticate` y `authorizeRole`: todas las rutas `/api/matches` exigen un token Firebase valido y las operaciones de escritura restringidas exigen `role: admin`.

## Variables de entorno

### Backend local (`server/.env`)

```env
PORT=3001
CLIENT_ORIGIN=http://localhost:5173
API_KEY_FOOTBALL=
FIREBASE_SERVICE_ACCOUNT=
```

Para desarrollo, se puede usar el archivo ignorado `server/config/firebase-service-account.json`. Tambien puede usarse `FIREBASE_SERVICE_ACCOUNT` con el JSON de una cuenta de servicio en una sola linea.

### Backend en Cloud Run

| Variable | Requerida | Valor |
| --- | --- | --- |
| `PORT` | No | Cloud Run la inyecta automaticamente. |
| `CLIENT_ORIGIN` | Si | `https://<PROJECT_ID>.web.app` y, si se usa, el dominio personalizado. Se admiten varios valores separados por coma. |
| `API_KEY_FOOTBALL` | No | Solo habilita la carga inicial opcional si Firestore esta vacio. Guardarla en Secret Manager. |
| `FIREBASE_SERVICE_ACCOUNT` | No en Cloud Run | No configurarla: Firebase Admin usara las credenciales predeterminadas de la cuenta de servicio de ejecucion. |

### Frontend

Durante desarrollo, `client/.env` contiene:

```env
VITE_API_BASE_URL=http://localhost:3001
```

Para produccion, asignar la URL HTTPS que devuelve Cloud Run antes de ejecutar el build:

```env
VITE_API_BASE_URL=https://<SERVICE>-<HASH>-<REGION>.a.run.app
```

Las variables `VITE_*` se incorporan al bundle publico. Nunca colocar secretos en ellas.

## Preparacion manual de Google Cloud

1. Seleccionar el proyecto de Google Cloud asociado a Firebase y asociarle una cuenta de facturacion. Cloud Run requiere facturacion habilitada, aunque tenga cuota gratuita.
2. Instalar Google Cloud CLI, iniciar sesion y seleccionar el proyecto:

   ```powershell
   gcloud auth login
   gcloud config set project <PROJECT_ID>
   ```

3. Habilitar APIs:

   ```powershell
   gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com secretmanager.googleapis.com
   ```

4. Crear una cuenta de servicio de ejecucion para Cloud Run y darle acceso a Firestore:

   ```powershell
   gcloud iam service-accounts create libertadepelota-runtime --display-name="Libertadepelota Cloud Run"
   gcloud projects add-iam-policy-binding <PROJECT_ID> --member="serviceAccount:libertadepelota-runtime@<PROJECT_ID>.iam.gserviceaccount.com" --role="roles/datastore.user"
   ```

   La cuenta que ejecuta el despliegue tambien necesita permisos de Cloud Run y Cloud Build. No subir el JSON de ninguna cuenta de servicio al repositorio ni a la imagen.

5. Si se desea la carga inicial desde API-Football, crear el secreto opcional:

   ```powershell
   gcloud secrets create api-football-key --replication-policy=automatic
   ```

   Cargar el valor mediante Cloud Console o el comando de Secret Manager. Si no se configura, el backend inicia normalmente y Firestore sigue siendo la fuente de datos.

## Publicar el backend

Desde la raiz del repositorio:

```powershell
gcloud run deploy libertadepelota-api --source ./server --region southamerica-east1 --allow-unauthenticated --service-account libertadepelota-runtime@<PROJECT_ID>.iam.gserviceaccount.com --set-env-vars CLIENT_ORIGIN=https://<PROJECT_ID>.web.app
```

Cloud Run construye el proyecto Node desde `server/package.json`, ejecuta `npm start` y asigna `PORT`. Copiar la URL HTTPS mostrada al terminar. Para agregar `API_KEY_FOOTBALL`, asociar el secreto `api-football-key` a la variable con el panel de Cloud Run o mediante `gcloud run services update`.

## Publicar el frontend

1. Editar localmente `client/.firebaserc` y reemplazar `YOUR_FIREBASE_PROJECT_ID` por el identificador real. No publicar un cambio con un proyecto ajeno.
2. Construir usando la URL real del backend:

   ```powershell
   cd client
   $env:VITE_API_BASE_URL = 'https://<SERVICE>-<HASH>-<REGION>.a.run.app'
   npm.cmd run build
   ```

3. Iniciar sesion en Firebase CLI y publicar:

   ```powershell
   firebase login
   firebase use <PROJECT_ID>
   firebase deploy --only hosting
   ```

## Verificacion posterior al despliegue

1. Abrir `https://<PROJECT_ID>.web.app`, iniciar sesion y confirmar en Network que `GET /api/matches` se dirige a la URL de Cloud Run con `Authorization: Bearer <token>`.
2. Verificar que el backend devuelve partidos de Firestore.
3. Asignar roles desde `server` con `node scripts/set-user-role.js <email> admin` o `user`, y volver a iniciar sesion para renovar el token.
4. Con `user`, `GET /api/matches` debe devolver `200`; `POST` y `DELETE` deben devolver `403`.
5. Sin token o con token vencido, cualquier ruta `/api/matches` debe devolver `401`; el frontend mostrara el mensaje de sesion no valida.
6. Confirmar que el origen de Firebase Hosting funciona y que uno no incluido en `CLIENT_ORIGIN` es bloqueado por CORS.

Referencias: [Firebase Hosting con Cloud Run](https://firebase.google.com/docs/hosting/cloud-run), [variables de Cloud Run](https://cloud.google.com/run/docs/configuring/services/environment-variables) y [Secret Manager en Cloud Run](https://cloud.google.com/run/docs/configuring/services/secrets).
