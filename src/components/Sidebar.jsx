import { A, useLocation } from '@solidjs/router';
import { createSignal } from 'solid-js';

function Sidebar() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = createSignal(false);

  const menuItems = [
    {
      path: '/admin/dashboard',
      label: 'Dashboard',
      icon: '📊'
    },
    {
      path: '/admin/events',
      label: 'Eventos',
      icon: '🎭'
    },
    {
      path: '/admin/visitors',
      label: 'Visitantes',
      icon: '👥'
    },
    {
      path: '/admin/reports',
      label: 'Reportes',
      icon: '📈'
    }
  ];

  const sidebarStyle = () => ({
    width: isCollapsed() ? '70px' : '250px',
    height: '100vh',
    backgroundColor: '#1a365d',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    transition: 'width 0.3s ease',
    position: 'fixed',
    left: 0,
    top: 0,
    zIndex: 1000,
    boxShadow: '2px 0 5px rgba(0,0,0,0.1)'
  });

  const headerStyle = {
    padding: '20px',
    borderBottom: '1px solid #2d3748',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '18px'
  };

  const menuStyle = {
    flex: 1,
    paddingTop: '20px'
  };

  const menuItemStyle = (isActive) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '12px 20px',
    textDecoration: 'none',
    color: 'white',
    backgroundColor: isActive ? '#2b6cb0' : 'transparent',
    borderLeft: isActive ? '4px solid #4299e1' : '4px solid transparent',
    transition: 'all 0.2s',
    cursor: 'pointer'
  });

  const iconStyle = {
    fontSize: '20px',
    marginRight: isCollapsed() ? '0' : '12px',
    minWidth: '20px'
  };

  const toggleStyle = {
    padding: '15px',
    borderTop: '1px solid #2d3748',
    textAlign: 'center',
    cursor: 'pointer',
    backgroundColor: '#2d3748',
    color: '#a0aec0'
  };

  return (
    <div style={sidebarStyle()}>
      <div style={headerStyle}>
        {!isCollapsed() ? 'SGEV Admin' : '🏛️'}
      </div>
      
      <nav style={menuStyle}>
        {menuItems.map(item => (
          <A 
            href={item.path}
            style={menuItemStyle(location.pathname === item.path)}
          >
            <span style={iconStyle}>{item.icon}</span>
            {!isCollapsed() && <span>{item.label}</span>}
          </A>
        ))}
      </nav>

      <div 
        style={toggleStyle}
        onClick={() => setIsCollapsed(!isCollapsed())}
      >
        {isCollapsed() ? '▶️' : '◀️'}
      </div>
    </div>
  );
}

export default Sidebar; 