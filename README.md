# Emacruz - Sistema de Gestión Municipal

Sistema web de gestión municipal para Emacruz (Empresa Municipal de Aseo de Santa Cruz) desarrollado con React, Vite y Tailwind CSS.

## 🚀 Características

- **Dashboard General**: Vista en tiempo real de operaciones de gestión de residuos
- **Gestión de Rutas**: Administración de rutas de recolección con búsqueda y filtros
- **Reportes**: Análisis y visualización de datos operativos
- **Reportes Administrativos**: Análisis financiero y composición de residuos
- **Inicio de Sesión**: Sistema de autenticación completo
- **Conexión API**: Integración con backend mediante Axios
- **Protección de Rutas**: Rutas protegidas con autenticación
- **Estados de Carga**: Indicadores de carga y manejo de errores

## 🛠️ Tecnologías

- **React 18**: Biblioteca de JavaScript para construir interfaces de usuario
- **React Router**: Enrutamiento para aplicaciones React
- **Tailwind CSS**: Framework de CSS utility-first
- **Vite**: Herramienta de construcción rápida
- **Axios**: Cliente HTTP para peticiones a la API
- **Context API**: Gestión de estado global (autenticación)

## 📦 Instalación

1. Instala las dependencias:
```bash
npm install
```

2. Configura las variables de entorno (opcional):
```bash
# Crea un archivo .env en la raíz del proyecto
VITE_API_URL=http://localhost:3000/api
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

4. Abre tu navegador en `http://localhost:5173`

## 🔌 Configuración de API

El proyecto está configurado para conectarse a un backend API. Por defecto, intenta conectarse a `http://localhost:3000/api`.

### Endpoints esperados:

- `POST /api/auth/login` - Iniciar sesión
- `GET /api/dashboard/stats` - Obtener estadísticas del dashboard
- `GET /api/dashboard/incidents` - Obtener incidencias
- `GET /api/rutas` - Obtener todas las rutas
- `GET /api/reportes` - Obtener reportes
- `GET /api/reportes/administrativos` - Obtener reportes administrativos

**Nota**: Si el backend no está disponible, la aplicación mostrará datos por defecto para desarrollo.

## 🏗️ Estructura del Proyecto

```
ArquiCruz/
├── src/
│   ├── components/        # Componentes reutilizables
│   │   ├── Sidebar.jsx
│   │   ├── Header.jsx
│   │   └── ProtectedRoute.jsx
│   ├── pages/            # Páginas principales
│   │   ├── DashboardGeneral.jsx
│   │   ├── GestionRutas.jsx
│   │   ├── InicioSesion.jsx
│   │   ├── PlantasReportaje.jsx
│   │   └── ReportesAdministrativos.jsx
│   ├── services/         # Servicios de API
│   │   └── api.js
│   ├── context/          # Contextos de React
│   │   └── AuthContext.jsx
│   ├── App.jsx           # Componente principal con rutas
│   ├── main.jsx          # Punto de entrada
│   └── index.css         # Estilos globales
├── index.html            # HTML principal
├── vite.config.js        # Configuración de Vite
└── package.json          # Dependencias
```

## 🎨 Diseño

El proyecto mantiene el diseño original de las plantillas HTML con:
- Modo oscuro/claro
- Diseño responsive
- Iconos Material Symbols
- Paleta de colores personalizada

## 📝 Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Construye la aplicación para producción
- `npm run preview`: Previsualiza la build de producción

## 🔐 Rutas

- `/login` - Página de inicio de sesión (pública)
- `/dashboard` - Dashboard principal (protegida)
- `/rutas` - Gestión de rutas (protegida)
- `/reportes` - Reportes operativos (protegida)
- `/reportes-administrativos` - Reportes administrativos (protegida)

Todas las rutas excepto `/login` están protegidas y requieren autenticación.

## 📁 Estructura de Servicios

- `src/services/api.js` - Configuración de Axios y servicios de API
- `src/context/AuthContext.jsx` - Contexto de autenticación
- `src/components/ProtectedRoute.jsx` - Componente para proteger rutas

## 📄 Licencia

Este proyecto es privado y pertenece a Emacruz.

