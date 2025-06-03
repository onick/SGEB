import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { 
  Search, 
  Bell, 
  Settings, 
  ChevronRight,
  Home,
  Calendar,
  Users,
  FileText,
  Target,
  UserCog,
  BarChart3
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import AdminDashboard from '../pages/admin/AdminDashboard';
import DevelopmentPlan from '../pages/admin/DevelopmentPlan';
import Events from '../pages/admin/Events';
import Visitors from '../pages/admin/Visitors';
import Reports from '../pages/admin/Reports';
import UsersPage from '../pages/admin/Users';

const AdminLayout = () => {
  const location = useLocation();

  // Mapeo de rutas a información de página
  const pageInfo = {
    '/admin': { 
      title: 'Dashboard', 
      subtitle: 'Vista general del sistema',
      icon: Home,
      breadcrumbs: ['Inicio']
    },
    '/admin/development-plan': { 
      title: 'Plan de Desarrollo', 
      subtitle: 'Seguimiento del progreso del proyecto',
      icon: Target,
      breadcrumbs: ['Inicio', 'Plan de Desarrollo']
    },
    '/admin/events': { 
      title: 'Gestión de Eventos', 
      subtitle: 'Crear y administrar eventos',
      icon: Calendar,
      breadcrumbs: ['Inicio', 'Gestión', 'Eventos']
    },
    '/admin/visitors': { 
      title: 'Visitantes', 
      subtitle: 'Registro y seguimiento de asistentes',
      icon: Users,
      breadcrumbs: ['Inicio', 'Gestión', 'Visitantes']
    },
    '/admin/users': { 
      title: 'Gestión de Usuarios', 
      subtitle: 'Administrar usuarios del sistema',
      icon: UserCog,
      breadcrumbs: ['Inicio', 'Gestión', 'Usuarios']
    },
    '/admin/reports': { 
      title: 'Reportes', 
      subtitle: 'Informes y estadísticas detalladas',
      icon: FileText,
      breadcrumbs: ['Inicio', 'Análisis', 'Reportes']
    },
    '/admin/analytics': { 
      title: 'Analytics', 
      subtitle: 'Métricas avanzadas del sistema',
      icon: BarChart3,
      breadcrumbs: ['Inicio', 'Análisis', 'Analytics']
    }
  };

  const currentPage = pageInfo[location.pathname] || pageInfo['/admin'];
  const PageIcon = currentPage.icon;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        {/* Header Superior */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Información de la página actual */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <PageIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">{currentPage.title}</h1>
                  <p className="text-sm text-gray-500">{currentPage.subtitle}</p>
                </div>
              </div>

              {/* Breadcrumbs */}
              <nav className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
                {currentPage.breadcrumbs.map((crumb, index) => (
                  <React.Fragment key={crumb}>
                    {index > 0 && <ChevronRight className="w-4 h-4" />}
                    <span className={index === currentPage.breadcrumbs.length - 1 ? 'text-blue-600 font-medium' : 'hover:text-gray-700'}>
                      {crumb}
                    </span>
                  </React.Fragment>
                ))}
              </nav>
            </div>

            {/* Acciones del header */}
            <div className="flex items-center space-x-4">
              {/* Barra de búsqueda */}
              <div className="hidden md:flex relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="pl-10 pr-4 py-2 w-64 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Notificaciones */}
              <button className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Configuración rápida */}
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings className="w-5 h-5" />
              </button>

              {/* Avatar del usuario */}
              <div className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">A</span>
                </div>
                <div className="hidden lg:block">
                  <p className="text-sm font-medium text-gray-900">Administrator</p>
                  <p className="text-xs text-gray-500">En línea</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Contenido principal */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            <Routes>
              <Route path="/" element={<AdminDashboard />} />
              <Route path="/development-plan" element={<DevelopmentPlan />} />
              <Route path="/events" element={<Events />} />
              <Route path="/visitors" element={<Visitors />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/analytics" element={<div className="text-center py-12"><h2 className="text-xl text-gray-500">Analytics - Próximamente</h2></div>} />
              <Route path="/notifications" element={<div className="text-center py-12"><h2 className="text-xl text-gray-500">Notificaciones - Próximamente</h2></div>} />
              <Route path="/settings" element={<div className="text-center py-12"><h2 className="text-xl text-gray-500">Configuración - Próximamente</h2></div>} />
            </Routes>
          </div>
        </main>

        {/* Footer opcional */}
        <footer className="bg-white border-t border-gray-200 px-6 py-3">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div>
              <span>© 2024 SGEV2. Todos los derechos reservados.</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>Versión 2.0.0</span>
              <span>•</span>
              <span>Estado: Activo</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout; 