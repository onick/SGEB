import { createSignal } from 'solid-js';

function Events() {
  const [searchTerm, setSearchTerm] = createSignal('');
  const [selectedFilter, setSelectedFilter] = createSignal('todos');
  const [selectedEvent, setSelectedEvent] = createSignal(null);

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
    minWidth: '200px',
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

  const eventsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
    gap: '20px'
  };

  const eventCardStyle = {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    border: '1px solid #e2e8f0',
    transition: 'transform 0.2s, box-shadow 0.2s',
    cursor: 'pointer'
  };

  const eventHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '15px'
  };

  const eventTitleStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: '5px'
  };

  const eventCategoryStyle = {
    fontSize: '12px',
    color: '#4a5568',
    backgroundColor: '#e2e8f0',
    padding: '4px 8px',
    borderRadius: '12px'
  };

  const eventStatusStyle = (status) => ({
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '500',
    backgroundColor: status === 'Activo' ? '#c6f6d5' : 
                     status === 'Completado' ? '#e2e8f0' : 
                     status === 'Cancelado' ? '#fed7d7' : '#bee3f8',
    color: status === 'Activo' ? '#22543d' : 
           status === 'Completado' ? '#4a5568' : 
           status === 'Cancelado' ? '#742a2a' : '#2a69ac'
  });

  const eventDetailsStyle = {
    marginBottom: '15px'
  };

  const eventDateStyle = {
    fontSize: '14px',
    color: '#4299e1',
    marginBottom: '8px'
  };

  const eventDescStyle = {
    fontSize: '14px',
    color: '#4a5568',
    lineHeight: '1.5',
    marginBottom: '15px'
  };

  const eventMetricsStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '15px',
    marginBottom: '15px'
  };

  const metricStyle = {
    textAlign: 'center'
  };

  const metricValueStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#2d3748'
  };

  const metricLabelStyle = {
    fontSize: '12px',
    color: '#4a5568'
  };

  const eventActionsStyle = {
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
                     variant === 'danger' ? '#e53e3e' : '#e2e8f0',
    color: variant === 'primary' ? 'white' : 
           variant === 'danger' ? 'white' : '#4a5568'
  });

  const progressBarStyle = {
    width: '100%',
    height: '6px',
    backgroundColor: '#e2e8f0',
    borderRadius: '3px',
    overflow: 'hidden',
    marginBottom: '15px'
  };

  const progressFillStyle = (percentage) => ({
    width: `${percentage}%`,
    height: '100%',
    backgroundColor: percentage > 80 ? '#38a169' : 
                     percentage > 50 ? '#ecc94b' : '#e53e3e',
    transition: 'width 0.3s ease'
  });

  // Datos mock de eventos
  const mockEvents = [
    {
      id: 1,
      title: 'Concierto de Jazz Dominicano',
      category: 'Música',
      status: 'Próximo',
      date: '15 de Diciembre, 2024',
      time: '8:00 PM',
      description: 'Una noche mágica con los mejores exponentes del jazz dominicano.',
      capacity: 150,
      registered: 89,
      checkedIn: 0,
      location: 'Auditorio Principal',
      price: 'RD$ 800'
    },
    {
      id: 2,
      title: 'Exposición: Arte Contemporáneo RD',
      category: 'Arte',
      status: 'Activo',
      date: '10 - 30 de Diciembre, 2024',
      time: 'Todo el día',
      description: 'Muestra de artistas contemporáneos dominicanos.',
      capacity: 300,
      registered: 156,
      checkedIn: 89,
      location: 'Galería Norte',
      price: 'Gratuito'
    },
    {
      id: 3,
      title: 'Obra: "Sueños de Libertad"',
      category: 'Teatro',
      status: 'Próximo',
      date: '20 de Diciembre, 2024',
      time: '7:30 PM',
      description: 'Drama histórico sobre la independencia dominicana.',
      capacity: 200,
      registered: 180,
      checkedIn: 0,
      location: 'Teatro Principal',
      price: 'RD$ 600'
    },
    {
      id: 4,
      title: 'Conferencia: Historia del Merengue',
      category: 'Conferencia',
      status: 'Próximo',
      date: '22 de Diciembre, 2024',
      time: '6:00 PM',
      description: 'Conferencia magistral sobre los orígenes del merengue.',
      capacity: 100,
      registered: 45,
      checkedIn: 0,
      location: 'Sala de Conferencias',
      price: 'RD$ 300'
    },
    {
      id: 5,
      title: 'Festival de Danza Folclórica',
      category: 'Danza',
      status: 'Completado',
      date: '5 de Diciembre, 2024',
      time: '6:00 PM',
      description: 'Celebración de la danza tradicional dominicana.',
      capacity: 250,
      registered: 230,
      checkedIn: 215,
      location: 'Plaza Central',
      price: 'RD$ 400'
    }
  ];

  const filters = [
    { id: 'todos', label: 'Todos los Estados' },
    { id: 'Activo', label: 'Activos' },
    { id: 'Próximo', label: 'Próximos' },
    { id: 'Completado', label: 'Completados' },
    { id: 'Cancelado', label: 'Cancelados' }
  ];

  const filteredEvents = () => {
    let events = mockEvents;
    
    if (selectedFilter() !== 'todos') {
      events = events.filter(event => event.status === selectedFilter());
    }
    
    if (searchTerm()) {
      events = events.filter(event => 
        event.title.toLowerCase().includes(searchTerm().toLowerCase()) ||
        event.category.toLowerCase().includes(searchTerm().toLowerCase())
      );
    }
    
    return events;
  };

  const getOccupancyPercentage = (registered, capacity) => {
    return Math.round((registered / capacity) * 100);
  };

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <h1 style={titleStyle}>🎭 Gestión de Eventos</h1>
        
        <div style={controlsStyle}>
          <input
            type="text"
            placeholder="🔍 Buscar eventos..."
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
            ➕ Nuevo Evento
          </button>
        </div>
      </header>

      <div style={eventsGridStyle}>
        {filteredEvents().map(event => (
          <div 
            style={eventCardStyle}
            onClick={() => setSelectedEvent(event)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
            }}
          >
            <div style={eventHeaderStyle}>
              <div>
                <h3 style={eventTitleStyle}>{event.title}</h3>
                <span style={eventCategoryStyle}>{event.category}</span>
              </div>
              <span style={eventStatusStyle(event.status)}>{event.status}</span>
            </div>

            <div style={eventDetailsStyle}>
              <div style={eventDateStyle}>
                📅 {event.date} • ⏰ {event.time}
              </div>
              <div style={eventDateStyle}>
                📍 {event.location} • 💰 {event.price}
              </div>
              <p style={eventDescStyle}>{event.description}</p>
            </div>

            <div style={progressBarStyle}>
              <div style={progressFillStyle(getOccupancyPercentage(event.registered, event.capacity))}></div>
            </div>

            <div style={eventMetricsStyle}>
              <div style={metricStyle}>
                <div style={metricValueStyle}>{event.capacity}</div>
                <div style={metricLabelStyle}>Capacidad</div>
              </div>
              <div style={metricStyle}>
                <div style={metricValueStyle}>{event.registered}</div>
                <div style={metricLabelStyle}>Registrados</div>
              </div>
              <div style={metricStyle}>
                <div style={metricValueStyle}>{event.checkedIn}</div>
                <div style={metricLabelStyle}>Asistieron</div>
              </div>
            </div>

            <div style={eventActionsStyle}>
              <button style={actionButtonStyle('secondary')}>
                📝 Editar
              </button>
              <button style={actionButtonStyle('primary')}>
                👥 Ver Detalles
              </button>
              {event.status === 'Próximo' && (
                <button style={actionButtonStyle('danger')}>
                  ❌ Cancelar
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredEvents().length === 0 && (
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
            ? 'No se encontraron eventos con los filtros aplicados.' 
            : 'No hay eventos registrados aún.'
          }
        </div>
      )}
    </div>
  );
}

export default Events; 