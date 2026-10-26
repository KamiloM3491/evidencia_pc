# Pequeñas Criaturas Backend

Backend del proyecto Pequeñas Criaturas desarrollado con Node.js y Express, orientado a la gestión de usuarios y la consulta de roles mediante una API REST conectada a MongoDB.

## Descripción general

Este proyecto proporciona una API para gestionar información de usuarios y consultar los roles registrados en la base de datos del proyecto Pequeñas Criaturas. Su estructura se organiza por módulos, separando las rutas, los controladores, los servicios y los modelos para facilitar la organización del código y el mantenimiento de las funcionalidades.

El módulo de usuarios permite registrar, consultar, actualizar y eliminar usuarios. Por su parte, el módulo de roles permite consultar los roles disponibles. La API utiliza Mongoose para trabajar con MongoDB y bcrypt para procesar las contraseñas antes de almacenarlas.

## Tecnologías utilizadas

- Node.js
- Express.js
- MongoDB
- Mongoose
- bcrypt
- Postman
- Nodemon
- Git y GitHub

## Estructura del proyecto

```text
back/
├── src/
│   ├── config/
│   │   └── mongoConnection.js
│   ├── middlewares/
│   ├── modules/
│   │   ├── role/
│   │   │   ├── controllers/
│   │   │   │   └── role.controller.js
│   │   │   ├── models/
│   │   │   │   └── role.model.js
│   │   │   ├── routes/
│   │   │   │   └── role.route.js
│   │   │   └── services/
│   │   │       └── role.service.js
│   │   └── user/
│   │       ├── controllers/
│   │       │   └── user.controller.js
│   │       ├── models/
│   │       │   └── user.model.js
│   │       ├── routes/
│   │       │   └── user.route.js
│   │       └── services/
│   │           └── user.service.js
│   ├── index.js
│   └── routes.js
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## Requisitos previos

- Node.js instalado.
- MongoDB instalado y en ejecución.
- npm, incluido con Node.js.
- Postman para probar los endpoints de la API.

## Instalación

1. Clona el repositorio y accede a la carpeta del proyecto:

```bash
git https://github.com/KamiloM3491/evidencia_pc.git
cd back
```

2. Instala las dependencias:

```bash
npm install
```

3. Verifica que MongoDB esté en ejecución y que la dirección de conexión configurada en `src/config/mongoConnection.js` corresponda a tu instalación:

```text
mongodb://localhost:27017/pequenas_criaturas
```

La base de datos utilizada por la aplicación se llama `pequenas_criaturas`.

## Ejecución

### Modo de desarrollo

Para iniciar el servidor con Nodemon, ejecuta:

```bash
npm run dev
```

Nodemon permite reiniciar automáticamente el servidor cuando detecta cambios en los archivos.

### Modo normal

Para iniciar la aplicación sin Nodemon, ejecuta:

```bash
npm start
```

Por defecto, el servidor utiliza el puerto `4000` y queda disponible en:

```text
http://localhost:4000
```

## Endpoints

### Verificación del backend

Permite comprobar que la aplicación está respondiendo.

```http
GET /
```

Respuesta esperada:

```json
{
  "mensaje": "Backend funcionando correctamente"
}
```

### Módulo de usuarios

Este módulo permite gestionar los registros de usuarios.

| Método HTTP | Endpoint | Descripción |
|---|---|---|
| POST | `/user/register` | Registra un usuario nuevo. |
| GET | `/user/list` | Consulta todos los usuarios. |
| GET | `/user/email/:correo` | Busca un usuario por correo electrónico. |
| GET | `/user/:id` | Consulta un usuario por su identificador. |
| PATCH | `/user/update/:id` | Actualiza la información de un usuario. |
| DELETE | `/user/delete/:id` | Elimina un usuario. |

Las contraseñas se procesan con bcrypt antes de guardarse en la base de datos. Además, las consultas de usuarios excluyen el campo de la contraseña de las respuestas.

### Módulo de roles

Este módulo permite consultar los roles registrados en MongoDB.

| Método HTTP | Endpoint | Descripción |
|---|---|---|
| GET | `/role` | Consulta los roles disponibles. |

## Scripts disponibles

El archivo `package.json` contiene los siguientes scripts:

```json
{
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node src/index.js",
    "dev": "nodemon src/index.js "
  }
}
```

Los comandos `npm start` y `npm run dev` permiten ejecutar el backend. El script `test` corresponde a la configuración inicial de npm y actualmente no ejecuta pruebas automatizadas.

## Pruebas

Las operaciones de la API se probaron mediante Postman para verificar el funcionamiento de las rutas de usuarios y roles, las solicitudes enviadas y las respuestas obtenidas.

## Archivo .gitignore

El proyecto incluye un archivo `.gitignore` que excluye elementos como `node_modules`, archivos de variables de entorno, registros y configuraciones locales del editor, evitando que estos archivos se incorporen innecesariamente al repositorio.

## Estado del proyecto

El backend cuenta con los módulos de usuarios y roles, la conexión a MongoDB y las operaciones correspondientes implementadas. Esta API constituye una base para continuar con el desarrollo de la evidencia  y su futura integración con el frontend. No representa el desarrollo real del proyecto Pequeñas Criaturas.

## Contribución

Para contribuir al proyecto, se pueden seguir estos pasos:

1. Crear una rama nueva en el repositorio.
2. Implementar la funcionalidad o corrección.
3. Verificar el funcionamiento de los cambios.
4. Registrar los cambios en Git y compartirlos mediante un pull request.

## Licencia

Este proyecto se distribuye bajo la licencia ISC, según la configuración del archivo `package.json`.