import { createSignal } from 'solid-js';

function AdminDashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = createSignal('week');

  const containerStyle = {
    padding: '25px',
    backgroundColor: '#f7fafc'
  };

  const headerStyle = {
    marginBottom: '30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const titleStyle = {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#2d3748'
  };

  const timeframeSelectorStyle = {
    display: 'flex',
    gap: '8px'
  };

  const timeframeButtonStyle = (isActive) => ({
    padding: '8px 16px',
    border: 'none',
    borderRadius: '6px',
    backgroundColor: isActive ? '#4299e1' : '#e2e8f0',
    color: isActive ? 'white' : '#4a5568',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500'
  });

  const statsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '30px'
  };

  const statCardStyle = {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '25px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    border: '1px solid #e2e8f0'
  };

  const statIconStyle = {
    fontSize: '32px',
    marginBottom: '15px'
  };

  const statValueStyle = {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: '5px'
  };

  const statLabelStyle = {
    fontSize: '14px',
    color: '#4a5568',
    marginBottom: '10px'
  };

  const statTrendStyle = (isPositive) => ({
    fontSize: '12px',
    color: isPositive ? '#22543d' : '#742a2a',
    fontWeight: '500'
  });

  const contentGridStyle = {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '25px'
  };

  const sectionStyle = {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '25px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    border: '1px solid #e2e8f0'
  };

  const sectionTitleStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: '20px'
  };

  const eventItemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 0',
    borderBottom: '1px solid #e2e8f0'
  };

  const eventInfoStyle = {
    flex: 1
  };

  const eventTitleStyle = {
    fontSize: '14px',
    fontWeight: '500',
    color: '#2d3748',
    marginBottom: '4px'
  };

  const eventDateStyle = {
    fontSize: '12px',
    color: '#4a5568'
  };

  const eventStatusStyle = (status) => ({
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '11px',
    fontWeight: '500',
    backgroundColor: status === 'Activo' ? '#c6f6d5' : 
                     status === 'Próximo' ? '#bee3f8' : '#fed7d7',
    color: status === 'Activo' ? '#22543d' : 
           status === 'Próximo' ? '#2a69ac' : '#742a2a'
  });

  const actionButtonStyle = {
    padding: '10px 20px',
    backgroundColor: '#4299e1',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    marginRight: '10px',
    textDecoration: 'none',
    display: 'inline-block',
    textAlign: 'center'
  };

  // Datos mock
  const stats = [
    {
      icon: '🎭',
      value: '24',
      label: 'Eventos Activos',
      trend: '+12% vs mes anterior',
      isPositive: true
    },
    {
      icon: '👥',
      value: '1,247',
      label: 'Visitantes Registrados',
      trend: '+8% vs mes anterior',
      isPositive: true
    },
    {
      icon: '📊',
      value: '89%',
      label: 'Tasa de Ocupación',
      trend: '+5% vs mes anterior',
      isPositive: true
    },
    {
      icon: '⭐',
      value: '4.8',
      label: 'Satisfacción Promedio',
      trend: '+0.3 vs mes anterior',
      isPositive: true
    }
  ];

  const upcomingEvents = [
    {
      title: 'Concierto de Jazz Dominicano',
      date: '15 Dic, 8:00 PM',
      status: 'Próximo',
      capacity: '89/150'
    },
    {
      title: 'Exposición Arte Contemporáneo',
      date: '10-30 Dic',
      status: 'Activo',
      capacity: '156/300'
    },
    {
      title: 'Obra: Sueños de Libertad',
      date: '20 Dic, 7:30 PM',
      status: 'Próximo',
      capacity: '180/200'
    },
    {
      title: 'Conferencia Historia del Merengue',
      date: '22 Dic, 6:00 PM',
      status: 'Próximo',
      capacity: '45/100'
    }
  ];

  const quickActions = [
    { label: '➕ Nuevo Evento', href: '/admin/events' },
    { label: '📝 Registrar Visitante', href: '/admin/visitors' },
    { label: '📊 Ver Reportes', href: '/admin/reports' },
    { label: '⚙️ Configuración', href: '/admin/settings' }
  ];

  const timeframes = [
    { id: 'day', label: 'Hoy' },
    { id: 'week', label: 'Esta Semana' },
    { id: 'month', label: 'Este Mes' },
    { id: 'year', label: 'Este Año' }
  ];

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <h1 style={titleStyle}>📊 Dashboard</h1>
        
        <div style={timeframeSelectorStyle}>
          {timeframes.map(timeframe => (
            <button
              style={timeframeButtonStyle(selectedTimeframe() === timeframe.id)}
              onClick={() => setSelectedTimeframe(timeframe.id)}
            >
              {timeframe.label}
            </button>
          ))}
        </div>
      </header>

      {/* Estadísticas principales */}
      <div style={statsGridStyle}>
        {stats.map(stat => (
          <div style={statCardStyle}>
            <div style={statIconStyle}>{stat.icon}</div>
            <div style={statValueStyle}>{stat.value}</div>
            <div style={statLabelStyle}>{stat.label}</div>
            <div style={statTrendStyle(stat.isPositive)}>
              {stat.isPositive ? '📈' : '📉'} {stat.trend}
            </div>
          </div>
        ))}
      </div>

      {/* Contenido principal */}
      <div style={contentGridStyle}>
        {/* Próximos eventos */}
        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>🎭 Próximos Eventos</h2>
          
          {upcomingEvents.map(event => (
            <div style={eventItemStyle}>
              <div style={eventInfoStyle}>
                <div style={eventTitleStyle}>{event.title}</div>
                <div style={eventDateStyle}>📅 {event.date}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '12px', color: '#4a5568' }}>
                  👥 {event.capacity}
                </span>
                <span style={eventStatusStyle(event.status)}>{event.status}</span>
              </div>
            </div>
          ))}
          
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <a href="/admin/events" style={actionButtonStyle}>
              Ver Todos los Eventos
            </a>
          </div>
        </div>

        {/* Acciones rápidas */}
        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>⚡ Acciones Rápidas</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {quickActions.map(action => (
              <a 
                href={action.href}
                style={{
                  ...actionButtonStyle,
                  marginRight: '0',
                  backgroundColor: '#f7fafc',
                  color: '#2d3748',
                  border: '2px solid #e2e8f0'
                }}
              >
                {action.label}
              </a>
            ))}
          </div>

          {/* Resumen rápido */}
          <div style={{ 
            marginTop: '30px', 
            padding: '20px', 
            backgroundColor: '#f7fafc', 
            borderRadius: '8px' 
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '15px' }}>
              📈 Resumen del Día
            </h3>
            <div style={{ fontSize: '14px', color: '#4a5568', lineHeight: '1.6' }}>
              • 3 eventos en curso<br />
              • 45 nuevos registros<br />
              • 12 check-ins realizados<br />
              • 0 incidencias reportadas
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard; 