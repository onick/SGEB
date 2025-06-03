import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Calendar, 
  Users, 
  FileText, 
  Settings,
  Clipboard,
  Target
} from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    {
      name: 'Dashboard',
      icon: Home,
      path: '/admin'
    },
    {
      name: 'Plan de Desarrollo',
      icon: Target,
      path: '/admin/development-plan'
    },
    {
      name: 'Eventos',
      icon: Calendar,
      path: '/admin/events'
    },
    {
      name: 'Visitantes',
      icon: Users,
      path: '/admin/visitors'
    },
    {
      name: 'Reportes',
      icon: FileText,
      path: '/admin/reports'
    }
  ];

  return (
    <div className="bg-white w-64 min-h-screen shadow-sm border-r border-gray-200">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800">SGEV2 Admin</h2>
        <p className="text-sm text-gray-500">Panel de Administración</p>
      </div>
      
      <nav className="mt-6">
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar; 