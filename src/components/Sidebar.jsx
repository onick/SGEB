import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  Calendar, 
  Users, 
  FileText, 
  Settings,
  Target,
  UserCog,
  BarChart3,
  Bell,
  LogOut,
  ChevronDown,
  ChevronRight,
  Zap,
  Shield
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const [expandedGroups, setExpandedGroups] = useState(['main', 'management']);

  const toggleGroup = (groupId) => {
    setExpandedGroups(prev => 
      prev.includes(groupId) 
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  const menuGroups = [
    {
      id: 'main',
      title: 'Principal',
      items: [
        {
          name: 'Dashboard',
          icon: Home,
          path: '/admin',
          badge: null,
          description: 'Vista general del sistema'
        },
        {
          name: 'Plan de Desarrollo',
          icon: Target,
          path: '/admin/development-plan',
          badge: 'Beta',
          description: 'Seguimiento del proyecto'
        }
      ]
    },
    {
      id: 'management',
      title: 'Gestión',
      items: [
        {
          name: 'Gestión de Eventos',
          icon: Calendar,
          path: '/admin/events',
          badge: null,
          description: 'Crear y administrar eventos'
        },
        {
          name: 'Visitantes',
          icon: Users,
          path: '/admin/visitors',
          badge: null,
          description: 'Registro de asistentes'
        },
        {
          name: 'Gestión de Usuarios',
          icon: UserCog,
          path: '/admin/users',
          badge: 'Nuevo',
          description: 'Administrar usuarios del sistema'
        }
      ]
    },
    {
      id: 'analytics',
      title: 'Análisis',
      items: [
        {
          name: 'Reportes',
          icon: FileText,
          path: '/admin/reports',
          badge: null,
          description: 'Informes y estadísticas'
        },
        {
          name: 'Analytics',
          icon: BarChart3,
          path: '/admin/analytics',
          badge: 'Pro',
          description: 'Métricas avanzadas'
        }
      ]
    },
    {
      id: 'system',
      title: 'Sistema',
      items: [
        {
          name: 'Notificaciones',
          icon: Bell,
          path: '/admin/notifications',
          badge: '3',
          description: 'Centro de notificaciones'
        },
        {
          name: 'Configuración',
          icon: Settings,
          path: '/admin/settings',
          badge: null,
          description: 'Ajustes del sistema'
        }
      ]
    }
  ];

  const isActive = (path) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 w-72 min-h-screen shadow-2xl border-r border-slate-700 flex flex-col">
      {/* Header con logo y branding */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">SGEV2</h2>
            <p className="text-sm text-slate-400">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* User Profile Section */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center space-x-3 p-3 bg-slate-800/50 rounded-lg">
          <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-white">Administrator</p>
            <p className="text-xs text-slate-400">admin@sgev2.com</p>
          </div>
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
        </div>
      </div>
      
      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuGroups.map((group) => (
          <div key={group.id} className="mb-6">
            {/* Group Header */}
            <button
              onClick={() => toggleGroup(group.id)}
              className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider hover:text-slate-300 transition-colors"
            >
              <span>{group.title}</span>
              {expandedGroups.includes(group.id) ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>

            {/* Group Items */}
            {expandedGroups.includes(group.id) && (
              <div className="mt-2 space-y-1">
                {group.items.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={`group flex items-center px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive(item.path)
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                        : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
                    }`}
                  >
                    <item.icon className={`w-5 h-5 mr-3 transition-transform group-hover:scale-110 ${
                      isActive(item.path) ? 'text-white' : 'text-slate-400'
                    }`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span>{item.name}</span>
                        {item.badge && (
                          <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                            item.badge === 'Nuevo' 
                              ? 'bg-green-500 text-white' 
                              : item.badge === 'Beta' 
                              ? 'bg-yellow-500 text-black'
                              : item.badge === 'Pro'
                              ? 'bg-purple-500 text-white'
                              : 'bg-red-500 text-white'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </div>
                      {!isActive(item.path) && (
                        <p className="text-xs text-slate-500 mt-0.5 group-hover:text-slate-400">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Footer con actions */}
      <div className="p-4 border-t border-slate-700 space-y-2">
        <button className="w-full flex items-center px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors">
          <Settings className="w-4 h-4 mr-3" />
          Configuración Rápida
        </button>
        <button className="w-full flex items-center px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-colors">
          <LogOut className="w-4 h-4 mr-3" />
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default Sidebar; 