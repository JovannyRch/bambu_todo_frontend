# Todo App Frontend - Bambu

Aplicación de gestión de tareas (TODO) construida con React, TypeScript y Tailwind CSS con sistema de autenticación completo.

## 🚀 Características

- 🔐 **Sistema de autenticación completo** (Login y Register)
- ✅ Crear, editar, eliminar y marcar tareas como completadas
- 🎯 **Niveles de prioridad** (Alta, Media, Baja)
- 🔒 **Rutas protegidas** con JWT
- 🎨 Interfaz moderna y responsive con Tailwind CSS
- 📊 Estadísticas de tareas (total, activas, completadas)
- 🔍 Filtros para ver todas las tareas, solo activas o solo completadas
- 💾 Integración completa con backend REST API
- ⚡ Gestión de estado con React Context API
- 🎯 TypeScript para type-safety

## 📋 Requisitos Previos

- Node.js (v16 o superior)
- npm o yarn
- Backend API corriendo en `http://localhost:3000`

## 🛠️ Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de entorno:

El archivo `.env` ya está configurado con:
```
VITE_API_URL=http://localhost:3000
```

Si tu backend usa una URL diferente, modifica este archivo.

## 🚀 Uso

### Modo Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173` (o el siguiente puerto disponible).

### Build para Producción

```bash
npm run build
```

### Preview de Producción

```bash
npm run preview
```

## 📁 Estructura del Proyecto

```
src/
├── api/                    # Servicios de API
│   ├── authService.ts     # Servicio de autenticación (login/register)
│   ├── todoService.ts     # Servicio para operaciones CRUD de todos
│   └── index.ts
├── components/             # Componentes React
│   ├── TodoForm.tsx       # Formulario para crear todos con prioridad
│   ├── TodoItem.tsx       # Componente individual de todo con badge de prioridad
│   ├── TodoList.tsx       # Lista de todos con filtros
│   ├── ProtectedRoute.tsx # Componente para proteger rutas
│   └── index.ts
├── context/                # Context API
│   ├── AuthContext.tsx    # Context para autenticación
│   ├── TodoContext.tsx    # Context y Provider para gestión de estado
│   └── index.ts
├── pages/                  # Páginas de la aplicación
│   ├── LoginPage.tsx      # Página de inicio de sesión
│   ├── RegisterPage.tsx   # Página de registro
│   └── TodoPage.tsx       # Página principal de todos
├── types/                  # Definiciones de TypeScript
│   ├── auth.ts            # Tipos de autenticación
│   ├── todo.ts            # Tipos e interfaces de Todo
│   └── index.ts
├── App.tsx                 # Componente principal con routing
├── main.tsx               # Punto de entrada
└── index.css              # Estilos globales y Tailwind
```

## 🔌 API Backend

La aplicación espera que el backend tenga los siguientes endpoints:

### Autenticación

#### POST /v1/register
Registrar un nuevo usuario
```json
{
  "email": "test@mail.com",
  "password": "123456"
}
```
**Respuesta:**
```json
{
  "token": "jwt-token-here"
}
```

#### POST /v1/login
Iniciar sesión
```json
{
  "email": "test@mail.com",
  "password": "123456"
}
```
**Respuesta:**
```json
{
  "token": "jwt-token-here"
}
```

### Todos (Requieren autenticación con Bearer Token)

#### GET /v1/todo
Obtiene todos los todos del usuario autenticado
**Headers:** `Authorization: Bearer {token}`
```json
[
  {
    "id": 1,
    "title": "Título del todo",
    "description": "Descripción opcional",
    "priority": "alta",
    "completed": false,
    "createdAt": "2024-03-23T...",
    "updatedAt": "2024-03-23T..."
  }
]
```

#### POST /v1/todo/create
Crea un nuevo todo
**Headers:** `Authorization: Bearer {token}`
```json
{
  "title": "Título del todo",
  "description": "Descripción opcional",
  "priority": "media"
}
```

#### PUT /v1/todo/:id
Actualiza un todo existente
**Headers:** `Authorization: Bearer {token}`
```json
{
  "title": "Nuevo título",
  "description": "Nueva descripción",
  "priority": "alta",
  "completed": true
}
```

#### DELETE /v1/todo/:id
Elimina un todo
**Headers:** `Authorization: Bearer {token}`

## 🎨 Tecnologías Utilizadas

- **React 19** - Librería de UI
- **TypeScript** - Tipado estático
- **React Router DOM** - Enrutamiento y navegación
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Framework de CSS utility-first
- **Context API** - Gestión de estado global
- **JWT** - Autenticación basada en tokens

## 📝 Uso de la Aplicación

### Registro e Inicio de Sesión

1. **Primera vez**: Ve a la página de registro (`/register`)
   - Ingresa tu email y contraseña (mínimo 6 caracteres)
   - Haz clic en "Registrarse"
   
2. **Ya tienes cuenta**: Ve a la página de login (`/login`)
   - Ingresa tus credenciales
   - Haz clic en "Iniciar Sesión"

3. **Token**: El JWT token se guarda automáticamente en localStorage y se incluye en todas las peticiones

### Gestión de Todos

1. **Agregar Todo**: 
   - Completa el título (obligatorio)
   - Agrega descripción (opcional)
   - Selecciona la prioridad (🔴 Alta, 🟡 Media, 🟢 Baja)
   - Haz clic en "Agregar Todo"

2. **Ver Estadísticas**: En la parte superior de la lista verás:
   - Total de tareas
   - Tareas activas
   - Tareas completadas

3. **Filtrar Todos**: Usa los botones de filtro para ver:
   - Todos: Todas las tareas
   - Activos: Solo tareas pendientes
   - Completados: Solo tareas completadas

4. **Marcar como Completado**: Haz clic en el checkbox junto a cada tarea

5. **Editar Todo**: 
   - Haz clic en "Editar"
   - Modifica título, descripción y/o prioridad
   - Guarda los cambios

6. **Eliminar Todo**: Haz clic en "Eliminar" (se pedirá confirmación)

7. **Cerrar Sesión**: Haz clic en "Cerrar Sesión" en la parte superior derecha

## 🐛 Troubleshooting

### El frontend no se conecta al backend

- Verifica que el backend esté corriendo en `http://localhost:3000`
- Revisa la configuración en el archivo `.env`
- Verifica que no haya problemas de CORS en el backend

### Error de autenticación

- Asegúrate de estar registrado en el sistema
- Verifica que el token no haya expirado
- Intenta cerrar sesión y volver a iniciar sesión

### Errors de TypeScript

- Ejecuta `npm install` para asegurarte de tener todas las dependencias
- Si persisten, elimina `node_modules` y reinstala: `rm -rf node_modules && npm install`

### Problemas con Tailwind

- Asegúrate de que los archivos `tailwind.config.js` y `postcss.config.js` existan
- Verifica que `@tailwindcss/postcss` esté instalado
- Verifica que las directivas `@tailwind` estén en `src/index.css`

## 🔒 Seguridad

- Las contraseñas deben tener al menos 6 caracteres
- El token JWT se almacena en localStorage
- Todas las rutas de todos están protegidas y requieren autenticación
- El token se envía automáticamente en el header `Authorization: Bearer {token}`

## 📄 Licencia

Este proyecto fue desarrollado como parte de la prueba técnica para Bambu.

## 👨‍💻 Desarrollo

Para contribuir o modificar el proyecto:

1. Clona el repositorio
2. Crea una rama para tu feature: `git checkout -b feature/nueva-feature`
3. Commitea tus cambios: `git commit -m 'Agrega nueva feature'`
4. Push a la rama: `git push origin feature/nueva-feature`
5. Abre un Pull Request

---

**¡Disfruta organizando tus tareas! 📝✨**
