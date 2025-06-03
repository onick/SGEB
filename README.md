# 🏛️ Centro Cultural Banreservas - SGEV2

## Sistema de Gestión de Eventos y Visitantes

### 🎯 Descripción

Sistema moderno de kiosco digital para el Centro Cultural Banreservas, desarrollado con **React 18**, **Vite**, **Supabase** y **Lucide Icons**. Permite gestionar eventos culturales, registrar visitantes y generar reportes en tiempo real.

---

## 🚀 Características Principales

### ✅ **Sistema Completo**
- 🎨 **Interfaz moderna** con glassmorphism y diseño responsivo
- 🏛️ **Logo oficial** del Centro Cultural Banreservas
- 📱 **Optimizado para kioscos táctiles**
- ⚡ **Iconos minimalistas** con Lucide React

### ✅ **Funcionalidades**
- 📅 **Gestión de eventos** (CRUD completo)
- 👥 **Registro de visitantes** (entrada/salida)
- 📊 **Reportes en tiempo real**
- 🔐 **Autenticación de administradores**
- 🔔 **Notificaciones elegantes**
- 📈 **Contadores automáticos** de capacidad

### ✅ **Tecnologías**
- **Frontend**: React 18, Vite, React Router
- **Backend**: Supabase (PostgreSQL + API REST + Auth)
- **Iconos**: Lucide React
- **Estilos**: CSS-in-JS con glassmorphism
- **Base de datos**: PostgreSQL con triggers y vistas

---

## 🛠️ Instalación y Configuración

### 1. **Prerrequisitos**
```bash
- Node.js 18+ 
- npm o yarn
- Cuenta en Supabase
```

### 2. **Clonar e instalar dependencias**
```bash
cd SGEV2
npm install
```

### 3. **Configurar Supabase**

#### a) Crear proyecto en Supabase
1. Ve a [supabase.com](https://supabase.com)
2. Crea un nuevo proyecto
3. Copia la URL y la clave anónima

#### b) Ejecutar script de inicialización
1. En Supabase Dashboard → SQL Editor
2. Ejecuta el archivo `database/init.sql`
3. Esto creará todas las tablas, triggers y datos de ejemplo

#### c) Configurar variables de entorno
```bash
# Crea archivo .env.local
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu_clave_anonima_aqui
```

### 4. **Ejecutar aplicación**
```bash
npm run dev
```

La aplicación estará disponible en: `http://localhost:3002`

---

## 📁 Estructura del Proyecto

```
SGEV2/
├── src/
│   ├── components/
│   │   └── UI/
│   │       └── Notification.jsx     # Componente de notificaciones
│   │   ├── context/
│   │   │   └── AppContext.jsx           # Estado global de la aplicación
│   │   ├── lib/
│   │   │   └── supabase.js              # Configuración y servicios de Supabase
│   │   ├── App.jsx                      # Componente principal
│   │   └── index.jsx                    # Punto de entrada
│   ├── database/
│   │   └── init.sql                     # Script de inicialización de BD
│   ├── public/
│   │   └── logo.png                     # Logo oficial
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
```

---

## 🎨 Funcionalidades Implementadas

### 🏠 **Página Principal**
- Logo oficial del Centro Cultural
- Contador de eventos activos
- Navegación intuitiva

### 📅 **Gestión de Eventos**
- Lista de eventos activos
- Información de capacidad en tiempo real
- Estados visuales (Disponible/Lleno)
- Detalles completos de cada evento

### 👑 **Panel Administrativo**
- Estadísticas generales
- Acceso a funciones de administración
- Contadores de eventos totales

### 🔔 **Sistema de Notificaciones**
- Notificaciones elegantes con animaciones
- Diferentes tipos: éxito, error, información
- Auto-cierre automático

---

## 🗃️ Base de Datos

### **Tablas Principales**
- `events` - Eventos culturales
- `visitors` - Registro de visitantes
- `admin_users` - Usuarios administrativos
- `daily_reports` - Reportes diarios
- `event_categories` - Categorías de eventos

### **Características Avanzadas**
- ✅ **Triggers automáticos** para contadores
- ✅ **Vistas optimizadas** para reportes
- ✅ **Row Level Security** (RLS)
- ✅ **Índices optimizados**
- ✅ **Datos de ejemplo**

---

## 🔧 Servicios Implementados

### 📊 **eventService**
```javascript
- getEvents()           // Obtener todos los eventos
- getActiveEvents()     // Eventos activos únicamente
- createEvent()         // Crear nuevo evento
- updateEvent()         // Actualizar evento
- deleteEvent()         // Eliminar evento
```

### 👥 **visitorService**
```javascript
- registerVisitor()     // Registrar entrada
- registerExit()        // Registrar salida
- getVisitorsByEvent()  // Visitantes por evento
- getCurrentVisitors()  // Visitantes actuales
```

### 🔐 **authService**
```javascript
- signIn()              // Iniciar sesión
- signOut()             // Cerrar sesión
- getCurrentUser()      // Usuario actual
- isAuthenticated()     // Verificar autenticación
```

### 📈 **reportService**
```javascript
- getDailyStats()       // Estadísticas diarias
- getWeeklyReport()     // Reporte semanal
```

---

## 🎯 Próximos Pasos

### **Fase 2: Expansión**
- [ ] **Redis** para cache y tiempo real
- [ ] **Formularios completos** de registro
- [ ] **Dashboard avanzado** con gráficos
- [ ] **Códigos QR** para eventos
- [ ] **Impresión de badges** para visitantes

### **Fase 3: Optimización**
- [ ] **PWA** (Progressive Web App)
- [ ] **Modo offline**
- [ ] **Sincronización automática**
- [ ] **Backup automático**

---

## 🏗️ Arquitectura

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   React     │ ←→ │  Supabase   │ ←→ │ PostgreSQL  │
│  (Frontend) │    │ (API + Auth)│    │ (Database)  │
└─────────────┘    └─────────────┘    └─────────────┘
       ↑                   ↑                   ↑
   Vite (Dev)        REST API           Triggers/Views
   Lucide Icons      Real-time           RLS Security
```

---

## 🔒 Seguridad

### **Implementaciones**
- ✅ **Row Level Security** habilitado
- ✅ **Políticas de acceso** configuradas
- ✅ **Autenticación JWT** con Supabase
- ✅ **Validación** en frontend y backend

### **Roles de Usuario**
- `super_admin` - Acceso completo
- `admin` - Gestión de eventos y visitantes
- `operator` - Solo registro de visitantes
- `viewer` - Solo lectura

---

## 📞 Soporte

### **Credenciales de Prueba**
```
Email: admin@banreservas.com
Password: [Configurar en Supabase Auth]
```

### **Comandos Útiles**
```bash
npm run dev          # Desarrollo
npm run build        # Producción
npm run preview      # Vista previa
```

### **Logs y Debug**
- Consola del navegador para errores frontend
- Supabase Dashboard → Logs para errores backend
- Network tab para verificar API calls

---

## 🎉 Estado Actual

### ✅ **Completado**
- [x] **React 18** configurado y funcionando
- [x] **Supabase** conectado con todos los servicios
- [x] **Logo oficial** integrado
- [x] **Iconos Lucide** implementados
- [x] **Base de datos** completa con datos de ejemplo
- [x] **Contexto global** para manejo de estado
- [x] **Notificaciones** elegantes
- [x] **Navegación** funcional entre páginas
- [x] **Arquitectura escalable** lista para expansión

### 🔄 **En desarrollo**
- [ ] Formularios completos de administración
- [ ] Dashboard con métricas avanzadas
- [ ] Integración con Redis para cache

---

**🏛️ Centro Cultural Banreservas - Transformando la experiencia cultural digital**

*Sistema desarrollado con las mejores prácticas de desarrollo moderno para brindar una experiencia excepcional a visitantes y administradores.* 