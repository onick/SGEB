import { useNavigate } from '@solidjs/router';
import { onMount } from 'solid-js';
import Sidebar from '../components/Sidebar';
import { isAuthenticated } from '../App';

function AdminLayout(props) {
  const navigate = useNavigate();

  onMount(() => {
    // Verificar autenticación
    if (!isAuthenticated()) {
      navigate('/admin/login');
    }
  });

  const containerStyle = {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f7fafc'
  };

  const contentStyle = {
    marginLeft: '250px',
    flex: 1,
    padding: '20px',
    transition: 'margin-left 0.3s ease'
  };

  const headerStyle = {
    backgroundColor: 'white',
    padding: '15px 25px',
    marginBottom: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const titleStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#2d3748'
  };

  const userInfoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  };

  const logoutButtonStyle = {
    padding: '8px 16px',
    backgroundColor: '#e53e3e',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500'
  };

  const handleLogout = () => {
    // Limpiar autenticación
    localStorage.removeItem('auth_token');
    navigate('/admin/login');
  };

  return (
    <div style={containerStyle}>
      <Sidebar />
      
      <main style={contentStyle}>
        <header style={headerStyle}>
          <h1 style={titleStyle}>Centro Cultural Banreservas</h1>
          
          <div style={userInfoStyle}>
            <span style={{ color: '#4a5568' }}>
              👤 Admin User
            </span>
            <button 
              style={logoutButtonStyle}
              onClick={handleLogout}
            >
              Cerrar Sesión
            </button>
          </div>
        </header>
        
        <div style={{ 
          backgroundColor: 'white',
          borderRadius: '8px',
          minHeight: 'calc(100vh - 120px)',
          overflow: 'hidden'
        }}>
          {props.children}
        </div>
      </main>
    </div>
  );
}

export default AdminLayout; 