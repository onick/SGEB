import { A } from '@solidjs/router';

function KioskHome() {
  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    textAlign: 'center'
  };

  const headerStyle = {
    color: 'white',
    marginBottom: '40px'
  };

  const titleStyle = {
    fontSize: '48px',
    fontWeight: 'bold',
    marginBottom: '10px',
    textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
  };

  const subtitleStyle = {
    fontSize: '24px',
    opacity: 0.9,
    marginBottom: '20px'
  };

  const menuGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
    maxWidth: '900px',
    width: '100%'
  };

  const menuCardStyle = {
    backgroundColor: 'white',
    borderRadius: '15px',
    padding: '40px 30px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
    textDecoration: 'none',
    color: 'inherit'
  };

  const iconStyle = {
    fontSize: '60px',
    marginBottom: '20px'
  };

  const cardTitleStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: '15px'
  };

  const cardDescStyle = {
    fontSize: '16px',
    color: '#4a5568',
    lineHeight: '1.5'
  };

  const adminLinkStyle = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    padding: '10px 20px',
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: 'white',
    borderRadius: '25px',
    textDecoration: 'none',
    fontSize: '14px',
    backdropFilter: 'blur(10px)'
  };

  const menuOptions = [
    {
      icon: '🎭',
      title: 'Eventos Culturales',
      description: 'Descubre nuestros próximos eventos, exposiciones y actividades culturales',
      path: '/events'
    },
    {
      icon: '📝',
      title: 'Registro de Visitantes',
      description: 'Regístrate para recibir información y acceder a eventos exclusivos',
      path: '/register'
    },
    {
      icon: '🎨',
      title: 'Exposiciones',
      description: 'Explora nuestras exposiciones permanentes y temporales',
      path: '/exhibitions'
    },
    {
      icon: 'ℹ️',
      title: 'Información',
      description: 'Horarios, ubicación y servicios del Centro Cultural',
      path: '/info'
    }
  ];

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <h1 style={titleStyle}>🏛️ Bienvenido</h1>
        <h2 style={subtitleStyle}>Centro Cultural Banreservas</h2>
        <p style={{ fontSize: '18px', opacity: 0.8 }}>
          Tu ventana a la cultura dominicana
        </p>
      </header>

      <div style={menuGridStyle}>
        {menuOptions.map(option => (
          <A 
            href={option.path}
            style={menuCardStyle}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-5px)';
              e.target.style.boxShadow = '0 15px 40px rgba(0,0,0,0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
            }}
          >
            <div style={iconStyle}>{option.icon}</div>
            <h3 style={cardTitleStyle}>{option.title}</h3>
            <p style={cardDescStyle}>{option.description}</p>
          </A>
        ))}
      </div>

      <A href="/admin/login" style={adminLinkStyle}>
        🔐 Panel Administrativo
      </A>
    </div>
  );
}

export default KioskHome; 