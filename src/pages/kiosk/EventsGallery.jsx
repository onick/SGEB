import { createSignal, onMount } from 'solid-js';
import { A } from '@solidjs/router';
import { useApp } from '../../context/AppContext';

function EventsGallery() {
  const [selectedCategory, setSelectedCategory] = createSignal('todos');
  const { events, loadEvents, showNotification, openModal } = useApp();

  onMount(() => {
    loadEvents();
  });

  // Función para determinar si un evento es hoy
  const isEventToday = (eventDate) => {
    const today = new Date();
    const event = new Date(eventDate);
    return today.toDateString() === event.toDateString();
  };

  // Función para obtener el estado del evento
  const getEventStatus = (eventDate) => {
    const today = new Date();
    const event = new Date(eventDate);
    
    if (today.toDateString() === event.toDateString()) {
      return 'Hoy';
    } else if (event > today) {
      return 'Próximo';
    } else {
      return 'Finalizado';
    }
  };

  // Función para obtener el ícono del evento
  const getEventIcon = (title) => {
    // Detectar por título o categoría
    if (title.toLowerCase().includes('exposición') || title.toLowerCase().includes('arte') || title.toLowerCase().includes('fotografía') || title.toLowerCase().includes('escultura')) {
      return '🖼️'
    }
    if (title.toLowerCase().includes('concierto') || title.toLowerCase().includes('música') || title.toLowerCase().includes('jazz') || title.toLowerCase().includes('merengue')) {
      return '🎵'
    }
    if (title.toLowerCase().includes('taller') || title.toLowerCase().includes('cerámica') || title.toLowerCase().includes('fotografía cultural')) {
      return '🎨'
    }
    if (title.toLowerCase().includes('conferencia') || title.toLowerCase().includes('literatura') || title.toLowerCase().includes('historia')) {
      return '🎓'
    }
    if (title.toLowerCase().includes('festival') || title.toLowerCase().includes('danza')) {
      return '🎭'
    }
    if (title.toLowerCase().includes('teatro') || title.toLowerCase().includes('obra')) {
      return '🎪'
    }
    
    // Íconos por defecto según categoría
    const icons = {
      'Exposición': '🖼️',
      'Concierto': '🎵',
      'Taller': '🎨',
      'Conferencia': '🎓',
      'Festival': '🎭',
      'Teatro': '🎪'
    }
    return icons[title] || '🎪'
  };

  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: '#f7fafc',
    padding: '20px'
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '40px',
    padding: '30px',
    backgroundColor: 'white',
    borderRadius: '15px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  };

  const titleStyle = {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: '10px'
  };

  const subtitleStyle = {
    fontSize: '18px',
    color: '#4a5568'
  };

  const backButtonStyle = {
    position: 'fixed',
    top: '20px',
    left: '20px',
    padding: '12px 20px',
    backgroundColor: '#4299e1',
    color: 'white',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: '500',
    zIndex: 100
  };

  const filterStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '30px',
    flexWrap: 'wrap'
  };

  const filterButtonStyle = (isActive) => ({
    padding: '10px 20px',
    border: 'none',
    borderRadius: '25px',
    backgroundColor: isActive ? '#4299e1' : '#e2e8f0',
    color: isActive ? 'white' : '#4a5568',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'all 0.2s'
  });

  const eventsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '25px',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const eventCardStyle = (isToday) => ({
    backgroundColor: 'white',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: isToday ? '0 4px 20px rgba(245, 101, 101, 0.3)' : '0 4px 6px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    cursor: 'pointer',
    border: isToday ? '3px solid #f56565' : '1px solid #e2e8f0',
    position: 'relative'
  });

  const eventImageStyle = {
    width: '100%',
    height: '200px',
    backgroundColor: '#e2e8f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '60px'
  };

  const eventContentStyle = {
    padding: '20px'
  };

  const eventTitleStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: '8px'
  };

  const eventDateStyle = {
    fontSize: '14px',
    color: '#4299e1',
    fontWeight: '500',
    marginBottom: '10px'
  };

  const eventDescStyle = {
    fontSize: '14px',
    color: '#4a5568',
    lineHeight: '1.5',
    marginBottom: '15px'
  };

  const eventStatusStyle = (status) => ({
    display: 'inline-block',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    backgroundColor: status === 'Hoy' ? '#fed7d7' : 
                     status === 'Próximo' ? '#c6f6d5' : '#e2e8f0',
    color: status === 'Hoy' ? '#742a2a' : 
           status === 'Próximo' ? '#22543d' : '#4a5568',
    border: status === 'Hoy' ? '2px solid #f56565' : 
            status === 'Próximo' ? '2px solid #48bb78' : '2px solid #a0aec0'
  });

  const todayBadgeStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: '#f56565',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '10px',
    fontWeight: 'bold',
    zIndex: 10
  };

  const categories = [
    { id: 'todos', label: 'Todos los Eventos' },
    { id: 'Concierto', label: '🎵 Conciertos' },
    { id: 'Teatro', label: '🎪 Teatro' },
    { id: 'Exposición', label: '🖼️ Exposiciones' },
    { id: 'Taller', label: '🎨 Talleres' },
    { id: 'Conferencia', label: '🎓 Conferencias' },
    { id: 'Festival', label: '🎭 Festivales' }
  ];

  const filteredEvents = () => {
    if (selectedCategory() === 'todos') return events;
    return events.filter(event => event.category === selectedCategory());
  };

  // Función para manejar click en evento
  const handleEventClick = (event) => {
    const status = getEventStatus(event.date);
    if (status === 'Finalizado') {
      showNotification('Este evento ya ha finalizado', 'error');
      return;
    }
    
    if (event.current_visitors >= event.capacity) {
      showNotification('Este evento ha alcanzado su capacidad máxima', 'error');
      return;
    }
    
    openModal('registration', event);
  };

  return (
    <div style={containerStyle}>
      <A href="/" style={backButtonStyle}>
        ← Volver al Inicio
      </A>

      <header style={headerStyle}>
        <h1 style={titleStyle}>🎭 Eventos Culturales</h1>
        <p style={subtitleStyle}>
          Descubre todos nuestros eventos y actividades culturales
        </p>
      </header>

      <div style={filterStyle}>
        {categories.map(category => (
          <button
            style={filterButtonStyle(selectedCategory() === category.id)}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div style={eventsGridStyle}>
        {filteredEvents().map(event => (
          <div 
            style={eventCardStyle(isEventToday(event.date))}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
            }}
            onClick={() => handleEventClick(event)}
          >
            <div style={eventImageStyle}>
              {getEventIcon(event.title)}
            </div>
            
            <div style={eventContentStyle}>
              <h3 style={eventTitleStyle}>{event.title}</h3>
              <p style={eventDateStyle}>
                📅 {new Date(event.date).toLocaleDateString('es-DO', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })} • ⏰ {new Date(event.date).toLocaleTimeString('es-DO', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
              <p style={eventDescStyle}>{event.description}</p>
              <p style={{ fontSize: '12px', color: '#4a5568', marginBottom: '10px' }}>
                📍 {event.location}
              </p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={eventStatusStyle(getEventStatus(event.date))}>
                  {getEventStatus(event.date)}
                  {isEventToday(event.date) && ' 🔥'}
                </span>
                <span style={{ fontSize: '12px', color: '#4a5568' }}>
                  👥 {event.current_visitors}/{event.capacity}
                </span>
              </div>
              
              {isEventToday(event.date) && (
                <div style={{
                  marginTop: '10px',
                  padding: '8px',
                  backgroundColor: '#fed7d7',
                  borderRadius: '6px',
                  fontSize: '12px',
                  color: '#742a2a',
                  fontWeight: '500',
                  textAlign: 'center'
                }}>
                  ⚡ Registro con redirección automática al check-in
                </div>
              )}
              
              {!isEventToday(event.date) && getEventStatus(event.date) === 'Próximo' && (
                <div style={{
                  marginTop: '10px',
                  padding: '8px',
                  backgroundColor: '#c6f6d5',
                  borderRadius: '6px',
                  fontSize: '12px',
                  color: '#22543d',
                  fontWeight: '500',
                  textAlign: 'center'
                }}>
                  📧 Código enviado por email tras registro
                </div>
              )}
            </div>

            {isEventToday(event.date) && (
              <div style={todayBadgeStyle}>Hoy</div>
            )}
          </div>
        ))}
      </div>

      {filteredEvents().length === 0 && (
        <div style={{ 
          textAlign: 'center', 
          padding: '60px', 
          color: '#4a5568',
          fontSize: '18px'
        }}>
          No hay eventos disponibles en esta categoría.
        </div>
      )}
    </div>
  );
}

export default EventsGallery; 