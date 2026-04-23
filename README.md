## API CRUD MongoDB

Este proyecto es una API REST desarrollada con Node.js, Express y MongoDB. Permite gestionar productos y categorías, además de registrar usuarios y realizar login con autenticación mediante JWT.

El objetivo del trabajo fue aplicar CRUD completo y separar la lógica en capas (models, services, controllers y routes).

---

## Tecnologías utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- bcrypt (para encriptar contraseñas)
- JWT (autenticación)
- dotenv
- cors
- Nodemon
- HTML, CSS y JavaScript (frontend simple)

---

## Funcionalidades

- Registro de usuarios
- Login con generación de token (JWT)
- CRUD de categorías
- CRUD de productos
- Relación entre productos y categorías
- Protección de rutas con token
- Encriptación de contraseñas
- Frontend básico para probar la API

---

## Estructura del proyecto

El proyecto está organizado en capas:

- **models** → definición de los esquemas de MongoDB
- **services** → lógica de negocio
- **controllers** → manejo de requests y responses
- **routes** → endpoints de la API
- **middleware** → validación de token

También incluye una carpeta `public` con un frontend simple para probar la API.

---

# Base de datos

Se utilizan 3 colecciones:

# Usuarios
- nombre
- email
- password (encriptada)

# Categorías
- nombre
- descripción

# Productos
- nombre
- descripción
- precio
- stock
- categoría (referencia a categoría)

Los productos están relacionados con categorías usando referencias y `populate()`.

---

### Cómo ejecutar el proyecto

# 1. Clonar el repositorio

git clone URL_DEL_REPO
cd api-crud-mongodb

# 2. Instalar dependencias

npm install

# 3. Crear archivo .env

En la raíz del proyecto crear un archivo .env con el siguiente contenido:

PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/crudDB
JWT_SECRET=secreto

# 4. Ejecutar el servidor

npm run dev

# Endpoints principales

# 1.Usuarios

POST /api/users/register → registrar usuario
POST /api/users/login → iniciar sesión

# 2. Categorías

GET /api/categories → listar categorías
POST /api/categories → crear categoría
PUT /api/categories/:id → actualizar
DELETE /api/categories/:id → eliminar

# 2. Productos

GET /api/products → listar productos
POST /api/products → crear producto
PUT /api/products/:id → actualizar
DELETE /api/products/:id → eliminar

# 2.Autenticación

Las rutas protegidas requieren token.

Se debe enviar en el header:

Authorization: Bearer TU_TOKEN

### Ejemplo de datos (POST)

# Crear categoría
{
  "nombre": "Suplementos",
  "descripcion": "Productos fitness"
}

# Crear producto
{
  "nombre": "Proteína",
  "descripcion": "Whey protein",
  "precio": 15000,
  "stock": 10,
  "categoria": "ID_DE_LA_CATEGORIA"
}
  # Frontend               

El proyecto incluye un frontend simple que permite:

registrarse
iniciar sesión
crear categorías
crear productos
ver listas
editar
eliminar

Se accede desde:

http://localhost:3000

### Archivo .env.example

Se incluye un archivo .env.example con las variables necesarias para ejecutar el proyecto.

# Contenido:

PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/crudDB
JWT_SECRET=secreto