import { createSignal } from 'solid-js';

function Visitors() {
  const [searchTerm, setSearchTerm] = createSignal('');
  const [selectedFilter, setSelectedFilter] = createSignal('todos');
  const [selectedVisitor, setSelectedVisitor] = createSignal(null);

  const containerStyle = {
    padding: '25px',
    backgroundColor: '#f7fafc'
  };

  const headerStyle = {
    marginBottom: '30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '15px'
  };

  const titleStyle = {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#2d3748'
  };

  const controlsStyle = {
    display: 'flex',
    gap: '15px',
    alignItems: 'center',
    flexWrap: 'wrap'
  };

  const searchInputStyle = {
    padding: '10px 15px',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '14px',
    minWidth: '250px',
    outline: 'none'
  };

  const filterSelectStyle = {
    padding: '10px 15px',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '14px',
    backgroundColor: 'white',
    cursor: 'pointer'
  };

  const addButtonStyle = {
    padding: '10px 20px',
    backgroundColor: '#38a169',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer'
  };

  const visitorsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '20px'
  };

  const visitorCardStyle = {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    border: '1px solid #e2e8f0',
    transition: 'transform 0.2s, box-shadow 0.2s',
    cursor: 'pointer'
  };

  const visitorHeaderStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px'
  };

  const avatarStyle = {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: '#4299e1',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    fontWeight: 'bold',
    marginRight: '15px'
  };

  const visitorInfoStyle = {
    flex: 1
  };

  const visitorNameStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: '4px'
  };

  const visitorEmailStyle = {
    fontSize: '14px',
    color: '#4a5568',
    marginBottom: '2px'
  };

  const visitorPhoneStyle = {
    fontSize: '14px',
    color: '#4a5568'
  };

  const visitorStatsStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '15px',
    marginBottom: '15px',
    padding: '15px',
    backgroundColor: '#f7fafc',
    borderRadius: '8px'
  };

  const statStyle = {
    textAlign: 'center'
  };

  const statValueStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#2d3748'
  };

  const statLabelStyle = {
    fontSize: '12px',
    color: '#4a5568'
  };

  const visitorDetailsStyle = {
    marginBottom: '15px'
  };

  const detailRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 0',
    borderBottom: '1px solid #e2e8f0',
    fontSize: '14px'
  };

  const labelStyle = {
    color: '#4a5568',
    fontWeight: '500'
  };

  const valueStyle = {
    color: '#2d3748'
  };

  const interestsStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
    marginBottom: '15px'
  };

  const interestTagStyle = {
    padding: '4px 8px',
    backgroundColor: '#bee3f8',
    color: '#2a69ac',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '500'
  };

  const actionsStyle = {
    display: 'flex',
    gap: '8px',
    justifyContent: 'flex-end'
  };

  const actionButtonStyle = (variant = 'primary') => ({
    padding: '6px 12px',
    border: 'none',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '500',
    cursor: 'pointer',
    backgroundColor: variant === 'primary' ? '#4299e1' : 
                     variant === 'secondary' ? '#e2e8f0' : '#38a169',
    color: variant === 'primary' ? 'white' : 
           variant === 'secondary' ? '#4a5568' : 'white'
  });

  // Datos mock de visitantes
  const mockVisitors = [
    {
      id: 1,
      name: 'María González',
      email: 'maria.gonzalez@email.com',
      phone: '+1 (809) 555-0123',
      age: 28,
      gender: 'Femenino',
      city: 'Santo Domingo',
      registrationDate: '2024-01-15',
      lastVisit: '2024-12-08',
      totalVisits: 12,
      favoriteCategory: 'Arte',
      interests: ['Arte Contemporáneo', 'Música', 'Teatro'],
      eventHistory: ['Exposición Picasso', 'Concierto Jazz', 'Obra Romeo y Julieta'],
      vipStatus: true
    },
    {
      id: 2,
      name: 'Carlos Rodríguez',
      email: 'carlos.rodriguez@email.com',
      phone: '+1 (809) 555-0456',
      age: 35,
      gender: 'Masculino',
      city: 'Santiago',
      registrationDate: '2024-03-22',
      lastVisit: '2024-12-10',
      totalVisits: 8,
      favoriteCategory: 'Música',
      interests: ['Jazz', 'Música Clásica', 'Conferencias'],
      eventHistory: ['Festival Jazz', 'Conferencia Historia', 'Concierto Sinfónico'],
      vipStatus: false
    },
    {
      id: 3,
      name: 'Ana Martínez',
      email: 'ana.martinez@email.com',
      phone: '+1 (809) 555-0789',
      age: 42,
      gender: 'Femenino',
      city: 'Santo Domingo',
      registrationDate: '2023-11-10',
      lastVisit: '2024-12-12',
      totalVisits: 25,
      favoriteCategory: 'Teatro',
      interests: ['Teatro', 'Literatura', 'Arte'],
      eventHistory: ['Hamlet', 'Encuentro Literario', 'Exposición Moderna'],
      vipStatus: true
    },
    {
      id: 4,
      name: 'Luis Fernández',
      email: 'luis.fernandez@email.com',
      phone: '+1 (809) 555-0321',
      age: 31,
      gender: 'Masculino',
      city: 'La Romana',
      registrationDate: '2024-06-05',
      lastVisit: '2024-12-05',
      totalVisits: 4,
      favoriteCategory: 'Conferencias',
      interests: ['Historia', 'Cultura', 'Arqueología'],
      eventHistory: ['Conferencia Maya', 'Taller Arqueología'],
      vipStatus: false
    },
    {
      id: 5,
      name: 'Isabella Pérez',
      email: 'isabella.perez@email.com',
      phone: '+1 (809) 555-0654',
      age: 24,
      gender: 'Femenino',
      city: 'Puerto Plata',
      registrationDate: '2024-08-18',
      lastVisit: '2024-12-11',
      totalVisits: 6,
      favoriteCategory: 'Danza',
      interests: ['Danza', 'Música', 'Performance'],
      eventHistory: ['Festival Danza', 'Concierto Folk', 'Performance Art'],
      vipStatus: false
    }
  ];

  const filters = [
    { id: 'todos', label: 'Todos los Visitantes' },
    { id: 'vip', label: 'Visitantes VIP' },
    { id: 'recientes', label: 'Registros Recientes' },
    { id: 'activos', label: 'Más Activos' }
  ];

  const filteredVisitors = () => {
    let visitors = mockVisitors;
    
    if (selectedFilter() === 'vip') {
      visitors = visitors.filter(visitor => visitor.vipStatus);
    } else if (selectedFilter() === 'recientes') {
      visitors = visitors.filter(visitor => 
        new Date(visitor.registrationDate) > new Date('2024-06-01')
      );
    } else if (selectedFilter() === 'activos') {
      visitors = visitors.filter(visitor => visitor.totalVisits >= 10);
    }
    
    if (searchTerm()) {
      visitors = visitors.filter(visitor => 
        visitor.name.toLowerCase().includes(searchTerm().toLowerCase()) ||
        visitor.email.toLowerCase().includes(searchTerm().toLowerCase()) ||
        visitor.interests.some(interest => 
          interest.toLowerCase().includes(searchTerm().toLowerCase())
        )
      );
    }
    
    return visitors;
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-DO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <h1 style={titleStyle}>👥 Gestión de Visitantes</h1>
        
        <div style={controlsStyle}>
          <input
            type="text"
            placeholder="🔍 Buscar por nombre, email o intereses..."
            style={searchInputStyle}
            value={searchTerm()}
            onInput={(e) => setSearchTerm(e.target.value)}
          />
          
          <select
            style={filterSelectStyle}
            value={selectedFilter()}
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
            {filters.map(filter => (
              <option value={filter.id}>{filter.label}</option>
            ))}
          </select>
          
          <button style={addButtonStyle}>
            ➕ Registrar Visitante
          </button>
        </div>
      </header>

      <div style={visitorsGridStyle}>
        {filteredVisitors().map(visitor => (
          <div 
            style={visitorCardStyle}
            onClick={() => setSelectedVisitor(visitor)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
            }}
          >
            <div style={visitorHeaderStyle}>
              <div style={avatarStyle}>
                {getInitials(visitor.name)}
              </div>
              <div style={visitorInfoStyle}>
                <h3 style={visitorNameStyle}>
                  {visitor.name}
                  {visitor.vipStatus && (
                    <span style={{
                      marginLeft: '8px',
                      fontSize: '12px',
                      backgroundColor: '#ffd700',
                      color: '#744210',
                      padding: '2px 6px',
                      borderRadius: '10px'
                    }}>
                      ⭐ VIP
                    </span>
                  )}
                </h3>
                <div style={visitorEmailStyle}>📧 {visitor.email}</div>
                <div style={visitorPhoneStyle}>📱 {visitor.phone}</div>
              </div>
            </div>

            <div style={visitorStatsStyle}>
              <div style={statStyle}>
                <div style={statValueStyle}>{visitor.totalVisits}</div>
                <div style={statLabelStyle}>Visitas</div>
              </div>
              <div style={statStyle}>
                <div style={statValueStyle}>{visitor.age}</div>
                <div style={statLabelStyle}>Años</div>
              </div>
              <div style={statStyle}>
                <div style={statValueStyle}>{visitor.eventHistory.length}</div>
                <div style={statLabelStyle}>Eventos</div>
              </div>
            </div>

            <div style={visitorDetailsStyle}>
              <div style={detailRowStyle}>
                <span style={labelStyle}>🏙️ Ciudad:</span>
                <span style={valueStyle}>{visitor.city}</span>
              </div>
              <div style={detailRowStyle}>
                <span style={labelStyle}>📅 Registro:</span>
                <span style={valueStyle}>{formatDate(visitor.registrationDate)}</span>
              </div>
              <div style={detailRowStyle}>
                <span style={labelStyle}>🕒 Última visita:</span>
                <span style={valueStyle}>{formatDate(visitor.lastVisit)}</span>
              </div>
              <div style={detailRowStyle}>
                <span style={labelStyle}>❤️ Categoría favorita:</span>
                <span style={valueStyle}>{visitor.favoriteCategory}</span>
              </div>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <div style={{ ...labelStyle, marginBottom: '8px' }}>🎯 Intereses:</div>
              <div style={interestsStyle}>
                {visitor.interests.map(interest => (
                  <span style={interestTagStyle}>{interest}</span>
                ))}
              </div>
            </div>

            <div style={actionsStyle}>
              <button style={actionButtonStyle('secondary')}>
                📝 Editar
              </button>
              <button style={actionButtonStyle('primary')}>
                📊 Historial
              </button>
              <button style={actionButtonStyle('success')}>
                ✉️ Contactar
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredVisitors().length === 0 && (
        <div style={{ 
          textAlign: 'center', 
          padding: '60px', 
          color: '#4a5568',
          fontSize: '18px',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          {searchTerm() || selectedFilter() !== 'todos' 
            ? 'No se encontraron visitantes con los filtros aplicados.' 
            : 'No hay visitantes registrados aún.'
          }
        </div>
      )}
    </div>
  );
}

export default Visitors; 