import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom'
import { 
  Calendar, 
  Users, 
  QrCode, 
  CheckCircle, 
  Clock, 
  Settings, 
  Search, 
  Copy, 
  Filter,
  BarChart3,
  TrendingUp,
  PieChart,
  ArrowRight,
  Ticket,
  ArrowLeft,
  UserPlus,
  Eye,
  X,
  Home,
  ChevronDown,
  Activity,
  Target,
  UserCheck,
  AlertCircle,
  Plus,
  Edit,
  Trash2,
  MapPin,
  Check
} from 'lucide-react'
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart as RechartsPieChart, 
  Pie,
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ComposedChart
} from 'recharts'
import { AppProvider, useApp } from './context/AppContext'
import Notification from './components/UI/Notification'
import SupabaseWarning from './components/UI/SupabaseWarning'
import { isSupabaseReady } from './lib/supabase'

// Componente principal de la aplicación
function AppContent() {
  const { activeEvents, loading } = useApp()

  if (loading) {
    return (
      <div style={{ 
        padding: '20px', 
        fontFamily: 'system-ui, -apple-system, sans-serif',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #003366, #0066cc)',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          padding: '2rem',
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid rgba(255, 255, 255, 0.3)',
            borderTop: '3px solid white',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }} />
          <p>Cargando sistema...</p>
        </div>
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    )
  }

  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'system-ui, -apple-system, sans-serif',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #003366, #0066cc)',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {!isSupabaseReady() && <SupabaseWarning />}
      
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '3rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem'
      }}>
        <img 
          src="/logo.png" 
          alt="Centro Cultural Banreservas" 
          style={{ 
            width: '80px', 
            height: 'auto',
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
          }} 
        />
        <div>
          <h1 style={{ 
            fontSize: '1.8rem', 
            margin: '0',
            fontWeight: '400',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}>
            Bienvenidos al Centro Cultural Banreservas
          </h1>
          <p style={{ 
            fontSize: '1rem', 
            opacity: 0.9, 
            fontWeight: '300',
            margin: '0.5rem 0 0 0'
          }}>
            Sistema de Gestión de Eventos y Visitantes
          </p>
        </div>
      </div>
      
      <Routes>
        <Route path="/" element={<VisitorHomePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events-admin" element={<EventsAdminPage />} />
        <Route path="/checkin" element={<CheckinPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/registrations" element={<RegistrationsAdminPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      
      <Notification />

      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <Link to="/registrations" style={{ 
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.75rem 1.5rem',
          background: 'rgba(16, 185, 129, 0.1)',
          backdropFilter: 'blur(10px)',
          color: 'rgba(16, 185, 129, 0.9)',
          textDecoration: 'none',
          borderRadius: '8px',
          fontSize: '0.9rem',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          transition: 'all 0.3s ease'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.color = '#10b981'
          e.currentTarget.style.background = 'rgba(16, 185, 129, 0.2)'
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.color = 'rgba(16, 185, 129, 0.9)'
          e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)'
        }}
        >
          <Users size={16} />
          Ver Registros
        </Link>
        
        <Link to="/admin" style={{ 
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.75rem 1.5rem',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          color: 'rgba(255, 255, 255, 0.7)',
          textDecoration: 'none',
          borderRadius: '8px',
          fontSize: '0.9rem',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          transition: 'all 0.3s ease'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.color = 'white'
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
        }}
        >
          <Settings size={16} />
          Panel Administrativo
        </Link>
      </div>
    </div>
  )
}

// Página de inicio para visitantes
function VisitorHomePage() {
  const { activeEvents } = useApp()
  
  return (
    <div style={{ textAlign: 'center', maxWidth: '800px' }}>
      {!isSupabaseReady() && (
        <div style={{
          background: 'rgba(249, 115, 22, 0.1)',
          border: '1px solid rgba(249, 115, 22, 0.3)',
          borderRadius: '8px',
          padding: '1rem',
          marginBottom: '2rem'
        }}>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#f97316' }}>
            📊 Mostrando datos de demostración
          </p>
        </div>
      )}
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center',
        gap: '3rem',
        marginBottom: '3rem',
        maxWidth: '1200px',
        width: '100%'
      }}>
        <Link to="/events" style={{ textDecoration: 'none', flex: '1', minWidth: '400px', maxWidth: '500px' }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            padding: '3rem 2rem',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            height: '280px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            color: 'white'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)'
            e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.3)'
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
          }}
          >
            <Calendar size={64} style={{ marginBottom: '1.5rem', color: '#d4af37' }} />
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', fontWeight: '500' }}>
              Explora nuestros eventos
            </h3>
            <p style={{ fontSize: '1rem', opacity: 0.9, marginBottom: '1.5rem', lineHeight: 1.5 }}>
              Descubre actividades culturales, exposiciones y talleres únicos
            </p>
            <div style={{
              background: '#d4af37',
              color: 'white',
              padding: '0.75rem 2rem',
              borderRadius: '25px',
              fontSize: '1.1rem',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              Ver eventos ({activeEvents.length})
              <ArrowRight size={20} />
            </div>
          </div>
        </Link>

        <Link to="/checkin" style={{ textDecoration: 'none', flex: '1', minWidth: '400px', maxWidth: '500px' }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            padding: '3rem 2rem',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            height: '280px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            color: 'white'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)'
            e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.3)'
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
          }}
          >
            <QrCode size={64} style={{ marginBottom: '1.5rem', color: '#10b981' }} />
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', fontWeight: '500' }}>
              ¿Ya estás registrado?
            </h3>
            <p style={{ fontSize: '1rem', opacity: 0.9, marginBottom: '1.5rem', lineHeight: 1.5 }}>
              Realiza tu check-in con tu código de registro o invitación
            </p>
            <div style={{
              background: '#10b981',
              color: 'white',
              padding: '0.75rem 2rem',
              borderRadius: '25px',
              fontSize: '1.1rem',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              Hacer Check-in
              <Ticket size={20} />
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

// PÁGINA DE EVENTOS - OPTIMIZADA PARA 4 TARJETAS POR FILA
function EventsPage() {
  const { activeEvents, showNotification, registerToEvent } = useApp()
  const [selectedEvent, setSelectedEvent] = React.useState(null)
  const [showRegistrationModal, setShowRegistrationModal] = React.useState(false)
  const [selectedFilter, setSelectedFilter] = React.useState('Hoy') // Por defecto mostrar eventos de hoy
  const [registrationData, setRegistrationData] = React.useState({
    name: '',
    email: '',
    phone: ''
  })
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  
  // Función para determinar el estado de un evento
  const getEventStatus = (eventDate) => {
    const today = new Date()
    const event = new Date(eventDate)
    
    // Comparar solo las fechas (sin horas)
    today.setHours(0, 0, 0, 0)
    event.setHours(0, 0, 0, 0)
    
    if (event.getTime() === today.getTime()) {
      return 'Hoy'
    } else if (event > today) {
      return 'Próximos'
    } else {
      return 'Finalizados'
    }
  }
  
  // Filtrar eventos según el filtro seleccionado
  const filteredEvents = React.useMemo(() => {
    return activeEvents.filter(event => {
      const status = getEventStatus(event.date)
      return status === selectedFilter
    })
  }, [activeEvents, selectedFilter])
  
  // Contar eventos por categoría
  const eventCounts = React.useMemo(() => {
    const counts = { 'Próximos': 0, 'Hoy': 0, 'Finalizados': 0 }
    activeEvents.forEach(event => {
      const status = getEventStatus(event.date)
      counts[status]++
    })
    return counts
  }, [activeEvents])
  
  const handleEventClick = (event) => {
    if (event.current_visitors >= event.capacity) {
      showNotification('Este evento ya está lleno', 'error')
      return
    }
    setSelectedEvent(event)
    setShowRegistrationModal(true)
  }

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault()
    
    if (!registrationData.name.trim() || !registrationData.email.trim()) {
      showNotification('Por favor completa todos los campos obligatorios', 'error')
      return
    }

    setIsSubmitting(true)
    
    try {
      // Usar el sistema real de registros
      const registration = await registerToEvent(selectedEvent.id, registrationData)
      
      // Verificar si el evento es hoy
      const eventDate = new Date(selectedEvent.date)
      const today = new Date()
      const isEventToday = eventDate.toDateString() === today.toDateString()
      
      if (isEventToday) {
        // Evento es HOY - Redirección automática al check-in
        showNotification(`¡Registro exitoso! Tu código es: ${registration.code}. Redirigiendo al check-in...`, 'success')
        
        // Cerrar modal de registro
        setShowRegistrationModal(false)
        setRegistrationData({ name: '', email: '', phone: '' })
        setSelectedEvent(null)
        
        // Redirección automática para eventos del día
        setTimeout(() => {
          window.location.href = `/checkin?code=${registration.code}&name=${encodeURIComponent(registrationData.name)}`
        }, 2000)
        
      } else {
        // Evento es PRÓXIMO - Mostrar código para guardar
        showNotification(`¡Registro exitoso! Tu código de acceso es: ${registration.code}. ¡Guárdalo bien!`, 'success')
        
        // Mostrar información adicional sobre el evento próximo
        setTimeout(() => {
          showNotification(`Recuerda: ${selectedEvent.title} - ${new Date(selectedEvent.date).toLocaleDateString('es-DO', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}`, 'info')
        }, 3000)
        
        // Cerrar modal sin redirección
        setShowRegistrationModal(false)
        setRegistrationData({ name: '', email: '', phone: '' })
        setSelectedEvent(null)
      }
      
    } catch (error) {
      showNotification('Error al procesar el registro. Intenta nuevamente.', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const closeModal = () => {
    setShowRegistrationModal(false)
    setSelectedEvent(null)
    setRegistrationData({ name: '', email: '', phone: '' })
  }
  
  return (
    <div style={{ textAlign: 'center', maxWidth: '1600px', width: '100%', position: 'relative' }}>
      {/* Botón Volver al Inicio - Alineado con el título principal */}
      <Link to="/" style={{ 
        position: 'absolute',
        top: '1rem',
        left: '0',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.75rem 1.5rem',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '12px',
        fontSize: '1rem',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        transition: 'all 0.3s ease',
        zIndex: 10
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
      >
        <Home size={18} />
        Volver al Inicio
      </Link>

      {/* Contenido principal con margen reducido */}
      <div style={{ marginTop: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <Calendar size={48} style={{ color: '#d4af37' }} />
          <h2 style={{ fontSize: '2.5rem', margin: '0', fontWeight: '300' }}>
            Eventos Disponibles
          </h2>
        </div>
        <p style={{ fontSize: '1.2rem', marginBottom: '3rem', opacity: 0.9, lineHeight: 1.6 }}>
          Selecciona un evento para registrarte y vivir una experiencia cultural única
        </p>
        
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          justifyContent: 'center',
          marginBottom: '3rem',
          flexWrap: 'wrap'
        }}>
          {['Próximos', 'Hoy', 'Finalizados'].map(filter => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              style={{
                padding: '0.75rem 1.5rem',
                background: filter === selectedFilter ? '#d4af37' : 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '25px',
                fontSize: '0.9rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                if (filter !== selectedFilter) {
                  e.target.style.background = 'rgba(255, 255, 255, 0.2)'
                }
              }}
              onMouseOut={(e) => {
                if (filter !== selectedFilter) {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              {filter} ({eventCounts[filter]})
            </button>
          ))}
        </div>
        
        {filteredEvents.length === 0 ? (
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            padding: '3rem 2rem',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            marginBottom: '3rem'
          }}>
            <Calendar size={64} style={{ marginBottom: '1rem', opacity: 0.5 }} />
            <h3 style={{ marginBottom: '0.5rem', fontWeight: '300' }}>
              No hay eventos {selectedFilter.toLowerCase()}
            </h3>
            <p style={{ opacity: 0.7, fontSize: '0.9rem' }}>
              {selectedFilter === 'Hoy' && 'No hay eventos programados para hoy.'}
              {selectedFilter === 'Próximos' && 'No hay eventos próximos programados.'}
              {selectedFilter === 'Finalizados' && 'No hay eventos finalizados para mostrar.'}
            </p>
          </div>
        ) : (
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '1.2rem',
            marginBottom: '3rem',
            padding: '0 2rem'
          }}>
            <style>
              {`
                @media (max-width: 1600px) {
                  .events-grid {
                    grid-template-columns: repeat(4, 1fr) !important;
                  }
                }
                @media (max-width: 1200px) {
                  .events-grid {
                    grid-template-columns: repeat(3, 1fr) !important;
                  }
                }
                @media (max-width: 900px) {
                  .events-grid {
                    grid-template-columns: repeat(2, 1fr) !important;
                  }
                }
                @media (max-width: 600px) {
                  .events-grid {
                    grid-template-columns: 1fr !important;
                  }
                }
              `}
            </style>
            {filteredEvents.map(event => (
              <div 
                key={event.id}
                onClick={() => handleEventClick(event)}
                className="events-grid"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  padding: '1.5rem',
                  borderRadius: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textAlign: 'left',
                  height: '280px',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)'
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.3)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                  <Calendar size={18} style={{ color: '#d4af37' }} />
                  <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>
                    {new Date(event.date).toLocaleDateString('es-DO', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                
                <h3 style={{ marginBottom: '0.8rem', fontSize: '1.2rem', fontWeight: '500', lineHeight: 1.3 }}>
                  {event.title}
                </h3>
                
                <p style={{ 
                  opacity: 0.8, 
                  fontSize: '0.9rem', 
                  marginBottom: '1rem', 
                  lineHeight: 1.4,
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  flex: 1
                }}>
                  {event.description}
                </p>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Users size={16} style={{ color: '#d4af37' }} />
                    <span style={{ fontSize: '0.8rem' }}>
                      {event.current_visitors || 0}/{event.capacity || 'Sin límite'}
                    </span>
                  </div>
                  
                  <div style={{
                    background: event.current_visitors >= event.capacity ? 'rgba(239, 68, 68, 0.2)' : 'rgba(34, 197, 94, 0.2)',
                    color: event.current_visitors >= event.capacity ? '#ef4444' : '#22c55e',
                    padding: '0.3rem 0.8rem',
                    borderRadius: '12px',
                    fontSize: '0.7rem',
                    fontWeight: '500'
                  }}>
                    {event.current_visitors >= event.capacity ? 'Lleno' : 'Disponible'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Modal de Registro */}
        {showRegistrationModal && selectedEvent && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '2rem'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #003366, #0066cc)',
              borderRadius: '16px',
              padding: '2rem',
              maxWidth: '500px',
              width: '100%',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              position: 'relative'
            }}>
              {/* Botón cerrar */}
              <button
                onClick={closeModal}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  padding: '0.5rem',
                  borderRadius: '50%',
                  transition: 'background 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
                onMouseOut={(e) => e.target.style.background = 'none'}
              >
                ×
              </button>

              {/* Header del modal */}
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Calendar size={48} style={{ color: '#d4af37', marginBottom: '1rem' }} />
                <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', fontWeight: '300' }}>
                  Registro al Evento
                </h3>
                <h4 style={{ fontSize: '1.2rem', color: '#d4af37', marginBottom: '0.5rem' }}>
                  {selectedEvent.title}
                </h4>
                <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>
                  {new Date(selectedEvent.date).toLocaleDateString('es-DO', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>

              {/* Formulario */}
              <form onSubmit={handleRegistrationSubmit}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '500' }}>
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    value={registrationData.name}
                    onChange={(e) => setRegistrationData({...registrationData, name: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'border-color 0.3s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#d4af37'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)'}
                    placeholder="Ingresa tu nombre completo"
                    required
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '500' }}>
                    Correo electrónico *
                  </label>
                  <input
                    type="email"
                    value={registrationData.email}
                    onChange={(e) => setRegistrationData({...registrationData, email: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'border-color 0.3s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#d4af37'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)'}
                    placeholder="tu@email.com"
                    required
                  />
                </div>

                <div style={{ marginBottom: '2rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '500' }}>
                    Teléfono (opcional)
                  </label>
                  <input
                    type="tel"
                    value={registrationData.phone}
                    onChange={(e) => setRegistrationData({...registrationData, phone: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'border-color 0.3s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#d4af37'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)'}
                    placeholder="(809) 123-4567"
                  />
                </div>

                {/* Botones */}
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button
                    type="button"
                    onClick={closeModal}
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '1rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
                    onMouseOut={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      background: isSubmitting ? 'rgba(212, 175, 55, 0.5)' : '#d4af37',
                      border: 'none',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '1rem',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem'
                    }}
                    onMouseOver={(e) => {
                      if (!isSubmitting) e.target.style.background = '#b8941f'
                    }}
                    onMouseOut={(e) => {
                      if (!isSubmitting) e.target.style.background = '#d4af37'
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <div style={{
                          width: '16px',
                          height: '16px',
                          border: '2px solid rgba(255, 255, 255, 0.3)',
                          borderTop: '2px solid white',
                          borderRadius: '50%',
                          animation: 'spin 1s linear infinite'
                        }} />
                        Registrando...
                      </>
                    ) : (
                      'Confirmar Registro'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Página de Check-in
function CheckinPage() {
  const { showNotification, performCheckin, validateRegistrationCode } = useApp()
  const [activeModal, setActiveModal] = React.useState(null)
  const [checkinData, setCheckinData] = React.useState({
    code: '',
    name: '',
    email: ''
  })
  const [isProcessing, setIsProcessing] = React.useState(false)
  const [searchResults, setSearchResults] = React.useState([])
  
  // Detectar parámetros de URL al cargar la página
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const codeFromUrl = urlParams.get('code')
    const nameFromUrl = urlParams.get('name')
    
    if (codeFromUrl) {
      // Abrir automáticamente el modal de código único con el código precargado
      setActiveModal('código único')
      setCheckinData({
        code: codeFromUrl,
        name: nameFromUrl ? decodeURIComponent(nameFromUrl) : '',
        email: ''
      })
      
      // Limpiar la URL
      window.history.replaceState({}, document.title, '/checkin')
      
      // Mostrar mensaje informativo
      showNotification(`Código de registro detectado: ${codeFromUrl}`, 'info')
    }
  }, [])

  const handleCheckin = (method) => {
    setActiveModal(method)
    setCheckinData({ code: '', name: '', email: '' })
    setSearchResults([])
  }

  const closeModal = () => {
    setActiveModal(null)
    setCheckinData({ code: '', name: '', email: '' })
    setSearchResults([])
  }

  const handleCodeSubmit = async (e) => {
    e.preventDefault()
    if (!checkinData.code.trim()) {
      showNotification('Por favor ingresa tu código de registro', 'error')
      return
    }

    setIsProcessing(true)
    
    try {
      // Usar el sistema real de validación y check-in
      await performCheckin(checkinData.code)
      closeModal()
      
    } catch (error) {
      // El error ya se maneja en performCheckin
      console.error('Error en check-in:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleNameSearch = async () => {
    if (!checkinData.name.trim()) {
      showNotification('Por favor ingresa un nombre para buscar', 'error')
      return
    }

    setIsProcessing(true)
    
    try {
      // Obtener registros del localStorage
      const savedRegistrations = JSON.parse(localStorage.getItem('eventRegistrations') || '[]')
      
      const results = savedRegistrations.filter(reg => 
        reg.name.toLowerCase().includes(checkinData.name.toLowerCase()) ||
        reg.email.toLowerCase().includes(checkinData.email.toLowerCase())
      )

      setSearchResults(results)
      
      if (results.length === 0) {
        showNotification('No se encontraron registros con ese nombre', 'error')
      } else {
        showNotification(`Se encontraron ${results.length} registro(s)`, 'success')
      }
      
    } catch (error) {
      showNotification('Error en la búsqueda. Intenta nuevamente.', 'error')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleSelectRegistration = async (registration) => {
    if (registration.checkedIn) {
      showNotification('Este registro ya tiene check-in realizado', 'error')
      return
    }

    setIsProcessing(true)
    
    try {
      // Usar el sistema real de check-in con el código del registro
      await performCheckin(registration.code)
      closeModal()
      
    } catch (error) {
      // El error ya se maneja en performCheckin
      console.error('Error en check-in:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleQRScan = async () => {
    setIsProcessing(true)
    
    try {
      // Simular escaneo QR (en una implementación real, aquí iría la lógica de la cámara)
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Obtener registros reales
      const savedRegistrations = JSON.parse(localStorage.getItem('eventRegistrations') || '[]')
      
      if (savedRegistrations.length === 0) {
        showNotification('No hay registros disponibles para escanear', 'error')
        return
      }
      
      // Simular escaneo exitoso con un registro real aleatorio
      const availableRegistrations = savedRegistrations.filter(reg => !reg.checkedIn)
      
      if (availableRegistrations.length === 0) {
        showNotification('Todos los códigos QR ya han sido utilizados', 'error')
        return
      }
      
      const randomRegistration = availableRegistrations[Math.floor(Math.random() * availableRegistrations.length)]
      
      // Usar el sistema real de check-in
      await performCheckin(randomRegistration.code)
      closeModal()
      
    } catch (error) {
      showNotification('Error al escanear QR. Intenta nuevamente.', 'error')
    } finally {
      setIsProcessing(false)
    }
  }
  
  return (
    <div style={{ textAlign: 'center', maxWidth: '1200px', width: '100%' }}>
      <QrCode size={48} style={{ marginBottom: '1.5rem', color: '#10b981' }} />
      <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: '300' }}>
        Realizar Check-in
      </h2>
      <p style={{ fontSize: '1.2rem', marginBottom: '3rem', opacity: 0.9, lineHeight: 1.6 }}>
        Elige cómo quieres hacer tu check-in al evento
      </p>
      
      <div 
        className="checkin-grid"
        style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.5rem',
          marginBottom: '3rem',
          padding: '0 2rem'
        }}
      >
        <style>
          {`
            @media (max-width: 1000px) {
              .checkin-grid {
                grid-template-columns: repeat(2, 1fr) !important;
              }
            }
            @media (max-width: 600px) {
              .checkin-grid {
                grid-template-columns: 1fr !important;
              }
            }
          `}
        </style>
        <div 
          onClick={() => handleCheckin('código único')}
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            padding: '1.5rem 2rem',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            textAlign: 'left',
            gap: '1rem',
            minHeight: '100px'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          <Ticket size={28} style={{ color: '#d4af37', flexShrink: 0 }} />
          <div>
            <h3 style={{ margin: '0 0 0.3rem 0', fontSize: '1.1rem' }}>Ingreso de código único</h3>
            <p style={{ margin: 0, opacity: 0.8, fontSize: '0.85rem' }}>
              Ingresa el código que recibiste por correo
            </p>
          </div>
        </div>

        <div 
          onClick={() => handleCheckin('escaneo QR')}
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            padding: '1.5rem 2rem',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            textAlign: 'left',
            gap: '1rem',
            minHeight: '100px'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          <QrCode size={28} style={{ color: '#10b981', flexShrink: 0 }} />
          <div>
            <h3 style={{ margin: '0 0 0.3rem 0', fontSize: '1.1rem' }}>Escanear código QR</h3>
            <p style={{ margin: 0, opacity: 0.8, fontSize: '0.85rem' }}>
              Escanea el QR de tu invitación o registro
            </p>
          </div>
        </div>

        <div 
          onClick={() => handleCheckin('búsqueda por nombre')}
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            padding: '1.5rem 2rem',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            textAlign: 'left',
            gap: '1rem',
            minHeight: '100px'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          <Search size={28} style={{ color: '#3b82f6', flexShrink: 0 }} />
          <div>
            <h3 style={{ margin: '0 0 0.3rem 0', fontSize: '1.1rem' }}>Búsqueda por nombre</h3>
            <p style={{ margin: 0, opacity: 0.8, fontSize: '0.85rem' }}>
              ¿Olvidaste tu código? Búscate por nombre
            </p>
          </div>
        </div>
      </div>
      
      {/* Modal de Código Único */}
      {activeModal === 'código único' && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '2rem'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #003366, #0066cc)',
            borderRadius: '16px',
            padding: '2rem',
            maxWidth: '400px',
            width: '100%',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            position: 'relative'
          }}>
            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '1.5rem',
                cursor: 'pointer',
                padding: '0.5rem',
                borderRadius: '50%',
                transition: 'background 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
              onMouseOut={(e) => e.target.style.background = 'none'}
            >
              ×
            </button>

            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <Ticket size={48} style={{ color: '#d4af37', marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', fontWeight: '300' }}>
                Ingreso de Código
              </h3>
              <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>
                Ingresa el código que recibiste por correo
              </p>
            </div>

            <form onSubmit={handleCodeSubmit}>
              <div style={{ marginBottom: '2rem' }}>
                <input
                  type="text"
                  value={checkinData.code}
                  onChange={(e) => setCheckinData({...checkinData, code: e.target.value.toUpperCase()})}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    fontSize: '1.2rem',
                    textAlign: 'center',
                    letterSpacing: '2px',
                    outline: 'none',
                    transition: 'border-color 0.3s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#d4af37'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)'}
                  placeholder="EXPO-ABC123"
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  type="button"
                  onClick={closeModal}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
                  onMouseOut={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    background: isProcessing ? 'rgba(212, 175, 55, 0.5)' : '#d4af37',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '1rem',
                    cursor: isProcessing ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                  onMouseOver={(e) => {
                    if (!isProcessing) e.target.style.background = '#b8941f'
                  }}
                  onMouseOut={(e) => {
                    if (!isProcessing) e.target.style.background = '#d4af37'
                  }}
                >
                  {isProcessing ? (
                    <>
                      <div style={{
                        width: '16px',
                        height: '16px',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                        borderTop: '2px solid white',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                      }} />
                      Verificando...
                    </>
                  ) : (
                    'Hacer Check-in'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Escaneo QR */}
      {activeModal === 'escaneo QR' && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '2rem'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #003366, #0066cc)',
            borderRadius: '16px',
            padding: '2rem',
            maxWidth: '400px',
            width: '100%',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            position: 'relative',
            textAlign: 'center'
          }}>
            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '1.5rem',
                cursor: 'pointer',
                padding: '0.5rem',
                borderRadius: '50%',
                transition: 'background 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
              onMouseOut={(e) => e.target.style.background = 'none'}
            >
              ×
            </button>

            <div style={{ marginBottom: '2rem' }}>
              <QrCode size={48} style={{ color: '#10b981', marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', fontWeight: '300' }}>
                Escanear Código QR
              </h3>
              <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>
                Coloca tu código QR frente a la cámara
              </p>
            </div>

            {/* Simulación de área de escaneo */}
            <div style={{
              width: '200px',
              height: '200px',
              border: '2px dashed #10b981',
              borderRadius: '12px',
              margin: '0 auto 2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(16, 185, 129, 0.1)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {isProcessing ? (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '1rem'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    border: '3px solid rgba(16, 185, 129, 0.3)',
                    borderTop: '3px solid #10b981',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                  <span style={{ fontSize: '0.8rem', color: '#10b981' }}>Escaneando...</span>
                </div>
              ) : (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <QrCode size={60} style={{ color: '#10b981', opacity: 0.5 }} />
                  <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>Área de escaneo</span>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={closeModal}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
                onMouseOut={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
              >
                Cancelar
              </button>
              <button
                onClick={handleQRScan}
                disabled={isProcessing}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  background: isProcessing ? 'rgba(16, 185, 129, 0.5)' : '#10b981',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '1rem',
                  cursor: isProcessing ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  if (!isProcessing) e.target.style.background = '#059669'
                }}
                onMouseOut={(e) => {
                  if (!isProcessing) e.target.style.background = '#10b981'
                }}
              >
                {isProcessing ? 'Escaneando...' : 'Simular Escaneo'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Búsqueda por Nombre */}
      {activeModal === 'búsqueda por nombre' && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '2rem'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #003366, #0066cc)',
            borderRadius: '16px',
            padding: '2rem',
            maxWidth: '500px',
            width: '100%',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            position: 'relative',
            maxHeight: '80vh',
            overflow: 'auto'
          }}>
            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '1.5rem',
                cursor: 'pointer',
                padding: '0.5rem',
                borderRadius: '50%',
                transition: 'background 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
              onMouseOut={(e) => e.target.style.background = 'none'}
            >
              ×
            </button>

            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <Search size={48} style={{ color: '#3b82f6', marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', fontWeight: '300' }}>
                Búsqueda por Nombre
              </h3>
              <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>
                Busca tu registro por nombre o email
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <input
                type="text"
                value={checkinData.name}
                onChange={(e) => setCheckinData({...checkinData, name: e.target.value})}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'border-color 0.3s ease',
                  marginBottom: '1rem'
                }}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)'}
                placeholder="Nombre completo"
              />
              
              <button
                onClick={handleNameSearch}
                disabled={isProcessing}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: isProcessing ? 'rgba(59, 130, 246, 0.5)' : '#3b82f6',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '1rem',
                  cursor: isProcessing ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
                onMouseOver={(e) => {
                  if (!isProcessing) e.target.style.background = '#2563eb'
                }}
                onMouseOut={(e) => {
                  if (!isProcessing) e.target.style.background = '#3b82f6'
                }}
              >
                {isProcessing ? (
                  <>
                    <div style={{
                      width: '16px',
                      height: '16px',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      borderTop: '2px solid white',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }} />
                    Buscando...
                  </>
                ) : (
                  <>
                    <Search size={16} />
                    Buscar
                  </>
                )}
              </button>
            </div>

            {/* Resultados de búsqueda */}
            {searchResults.length > 0 && (
              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem', color: '#3b82f6' }}>
                  Resultados encontrados:
                </h4>
                <div style={{ maxHeight: '200px', overflow: 'auto' }}>
                  {searchResults.map(registration => (
                    <div
                      key={registration.id}
                      onClick={() => handleSelectRegistration(registration)}
                      style={{
                        background: registration.checkedIn ? 'rgba(239, 68, 68, 0.1)' : 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        padding: '0.75rem',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {registration.name}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// Componentes de Estadísticas con Recharts
const StatsCard = ({ title, value, icon: Icon, color, trend }) => (
  <div style={{
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '12px',
    padding: '1.5rem',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
    backdropFilter: 'blur(10px)'
  }}>
    <div style={{
      position: 'absolute',
      top: '-20px',
      right: '-20px',
      width: '60px',
      height: '60px',
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Icon size={24} style={{ color: `rgb(${color})` }} />
    </div>
    <h3 style={{ 
      margin: '0 0 0.5rem 0', 
      color: `rgb(${color})`,
      fontSize: '0.9rem',
      fontWeight: '500',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    }}>
      {title}
    </h3>
    <p style={{ 
      margin: 0, 
      fontSize: '2.2rem', 
      fontWeight: 'bold',
      color: 'white'
    }}>
      {value}
    </p>
    {trend && (
      <div style={{
        marginTop: '0.5rem',
        fontSize: '0.8rem',
        color: trend > 0 ? '#10b981' : '#ef4444',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.25rem'
      }}>
        <TrendingUp size={12} />
        {trend > 0 ? '+' : ''}{trend}%
      </div>
    )}
  </div>
)

const RegistrationTrendsChart = ({ data }) => (
  <div style={{
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '12px',
    padding: '1.5rem',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  }}>
    <h3 style={{ 
      margin: '0 0 1.5rem 0', 
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    }}>
      <BarChart3 size={20} />
      Tendencia de Registros
    </h3>
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
        <XAxis 
          dataKey="date" 
          stroke="rgba(255,255,255,0.7)"
          fontSize={12}
        />
        <YAxis stroke="rgba(255,255,255,0.7)" fontSize={12} />
        <Tooltip 
          contentStyle={{
            backgroundColor: 'rgba(0,0,0,0.8)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '8px',
            color: 'white'
          }}
        />
        <Legend />
        <Area
          type="monotone"
          dataKey="registrations"
          fill="rgba(139, 92, 246, 0.3)"
          stroke="#8b5cf6"
          strokeWidth={2}
          name="Registros"
        />
        <Bar 
          dataKey="checkins" 
          fill="#10b981" 
          name="Check-ins"
          radius={[4, 4, 0, 0]}
        />
      </ComposedChart>
    </ResponsiveContainer>
  </div>
)

const EventDistributionChart = ({ data }) => {
  const COLORS = ['#8b5cf6', '#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#06b6d4']
  
  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '12px',
      padding: '1.5rem',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    }}>
      <h3 style={{ 
        margin: '0 0 1.5rem 0', 
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <PieChart size={20} />
        Distribución por Eventos
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{
              backgroundColor: 'rgba(0,0,0,0.8)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px',
              color: 'white'
            }}
          />
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  )
}

const CheckinStatusChart = ({ data }) => (
  <div style={{
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '12px',
    padding: '1.5rem',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  }}>
    <h3 style={{ 
      margin: '0 0 1.5rem 0', 
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    }}>
      <CheckCircle size={20} />
      Estado de Check-ins
    </h3>
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
        <XAxis 
          dataKey="time" 
          stroke="rgba(255,255,255,0.7)"
          fontSize={12}
        />
        <YAxis stroke="rgba(255,255,255,0.7)" fontSize={12} />
        <Tooltip 
          contentStyle={{
            backgroundColor: 'rgba(0,0,0,0.8)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '8px',
            color: 'white'
          }}
        />
        <Legend />
        <Area
          type="monotone"
          dataKey="checkedIn"
          stackId="1"
          stroke="#10b981"
          fill="rgba(16, 185, 129, 0.6)"
          name="Check-ins Realizados"
        />
        <Area
          type="monotone"
          dataKey="pending"
          stackId="1"
          stroke="#f59e0b"
          fill="rgba(245, 158, 11, 0.6)"
          name="Pendientes"
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
)

// Nuevo componente de gráfico de crecimiento mensual basado en la referencia
const MonthlyGrowthChart = ({ data }) => (
  <div style={{
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '12px',
    padding: '2rem',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    gridColumn: 'span 2' // Ocupa 2 columnas para ser más ancho
  }}>
    <h3 style={{ 
      margin: '0 0 2rem 0', 
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '1.5rem',
      textAlign: 'center',
      justifyContent: 'center'
    }}>
      <TrendingUp size={24} />
      Crecimiento Mensual
    </h3>
    
    {/* Tarjetas de meses con estadísticas */}
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      gap: '1rem',
      flexWrap: 'wrap'
    }}>
      {data.map((monthData, index) => (
        <div key={index} style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '12px',
          padding: '1.5rem 1rem',
          textAlign: 'center',
          flex: '1',
          minWidth: '140px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          transition: 'all 0.3s ease'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
          e.currentTarget.style.transform = 'translateY(-2px)'
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
          e.currentTarget.style.transform = 'translateY(0)'
        }}
        >
          <div style={{
            fontSize: '0.9rem',
            color: 'rgba(255, 255, 255, 0.7)',
            marginBottom: '0.5rem',
            fontWeight: '500'
          }}>
            {monthData.month} {monthData.year}
          </div>
          <div style={{
            fontSize: '1.8rem',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '0.5rem'
          }}>
            {monthData.visitors} visitantes
          </div>
          <div style={{
            fontSize: '0.8rem',
            color: monthData.growth >= 0 ? '#10b981' : '#ef4444',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.25rem'
          }}>
            {monthData.growth >= 0 ? (
              <TrendingUp size={12} />
            ) : (
              <TrendingUp size={12} style={{ transform: 'rotate(180deg)' }} />
            )}
            {monthData.growth >= 0 ? '+' : ''}{monthData.growth}%
          </div>
        </div>
      ))}
    </div>
  </div>
)

// Página de Administración Principal
function AdminPage() {
  const { events, eventRegistrations, showNotification } = useApp()
  
  const getAllRegistrations = () => {
    const savedRegistrations = JSON.parse(localStorage.getItem('eventRegistrations') || '[]')
    return [...eventRegistrations, ...savedRegistrations].filter((reg, index, self) =>
      index === self.findIndex(r => r.id === reg.id)
    )
  }

  const allRegistrations = getAllRegistrations()
  const totalRegistrations = allRegistrations.length
  const checkedInCount = allRegistrations.filter(reg => reg.checkedIn).length
  const pendingCount = totalRegistrations - checkedInCount
  
  // Calcular métricas KPI adicionales
  const conversionRate = totalRegistrations > 0 ? ((checkedInCount / totalRegistrations) * 100).toFixed(1) : 0
  const averageAttendancePerEvent = events.length > 0 ? Math.round(totalRegistrations / events.length) : 0

  // Datos para los gráficos
  const trendData = [
    { name: 'Ene', registros: 45, checkins: 38 },
    { name: 'Feb', registros: 52, checkins: 45 },
    { name: 'Mar', registros: 48, checkins: 42 },
    { name: 'Abr', registros: 61, checkins: 55 },
    { name: 'May', registros: 55, checkins: 48 },
    { name: 'Jun', registros: 67, checkins: 62 }
  ]

  const eventDistribution = events.map(event => ({
    name: event.title.length > 15 ? event.title.substring(0, 15) + '...' : event.title,
    value: allRegistrations.filter(reg => reg.eventId === event.id).length,
    color: `hsl(${Math.random() * 360}, 70%, 60%)`
  }))

  const checkinStatusData = [
    { name: 'Check-in Realizado', value: checkedInCount, color: '#10b981' },
    { name: 'Pendiente', value: pendingCount, color: '#f59e0b' }
  ]

  const growthData = [
    { name: 'Ene', eventos: 2, asistentes: 45 },
    { name: 'Feb', eventos: 3, asistentes: 52 },
    { name: 'Mar', eventos: 2, asistentes: 48 },
    { name: 'Abr', eventos: 4, asistentes: 61 },
    { name: 'May', eventos: 3, asistentes: 55 },
    { name: 'Jun', eventos: 4, asistentes: 67 }
  ]

  return (
    <div style={{ maxWidth: '1400px', width: '100%', padding: '2rem' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '80px',
          height: '80px',
          background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
          borderRadius: '20px',
          marginBottom: '1rem'
        }}>
          <BarChart3 size={40} style={{ color: 'white' }} />
        </div>
        <h2 style={{ 
          fontSize: '2.5rem', 
          marginBottom: '0.5rem', 
          fontWeight: '300',
          background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Dashboard de Estadísticas
        </h2>
        <p style={{ fontSize: '1.2rem', opacity: 0.9, color: 'white' }}>
          Análisis completo del sistema de eventos
        </p>
      </div>

      {/* Métricas principales */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '1.5rem', 
        marginBottom: '3rem' 
      }}>
        <StatsCard 
          title="Total Eventos" 
          value={events.length} 
          icon={Calendar} 
          color="139, 92, 246"
          trend={12}
        />
        <StatsCard 
          title="Asistentes Registrados" 
          value={totalRegistrations} 
          icon={Users} 
          color="16, 185, 129"
          trend={8}
        />
        <StatsCard 
          title="Tasa de Conversión" 
          value={`${conversionRate}%`} 
          icon={TrendingUp} 
          color="59, 130, 246"
          trend={conversionRate > 70 ? 5 : -2}
        />
        <StatsCard 
          title="Check-ins Realizados" 
          value={checkedInCount} 
          icon={CheckCircle} 
          color="34, 197, 94"
          trend={15}
        />
        <StatsCard 
          title="Promedio por Evento" 
          value={averageAttendancePerEvent} 
          icon={BarChart3} 
          color="168, 85, 247"
          trend={10}
        />
        <StatsCard 
          title="Pendientes" 
          value={pendingCount} 
          icon={Clock} 
          color="245, 158, 11"
          trend={-5}
        />
      </div>

      {/* Gráficos */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', 
        gap: '2rem', 
        marginBottom: '3rem' 
      }}>
        <RegistrationTrendsChart data={trendData} />
        <EventDistributionChart data={eventDistribution} />
        <CheckinStatusChart data={checkinStatusData} />
        <MonthlyGrowthChart data={growthData} />
      </div>

      {/* Enlaces rápidos mejorados */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '16px',
        padding: '2rem',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <h3 style={{ 
          margin: '0 0 2rem 0', 
          color: 'white',
          textAlign: 'center',
          fontSize: '1.5rem'
        }}>
          Acciones Rápidas
        </h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '1.5rem' 
        }}>
          <Link to="/registrations" style={{ textDecoration: 'none' }}>
            <div style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(16, 185, 129, 0.1))',
              backdropFilter: 'blur(10px)',
              padding: '2rem',
              borderRadius: '12px',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              color: 'white',
              textAlign: 'center'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(16, 185, 129, 0.2)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
            >
              <Users size={40} style={{ marginBottom: '1rem', color: '#10b981' }} />
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.3rem' }}>Gestionar Registros</h4>
              <p style={{ margin: 0, opacity: 0.8, fontSize: '0.9rem' }}>
                Ver, filtrar y administrar todos los registros
              </p>
            </div>
          </Link>
          
          <Link to="/checkin" style={{ textDecoration: 'none' }}>
            <div style={{
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(59, 130, 246, 0.1))',
              backdropFilter: 'blur(10px)',
              padding: '2rem',
              borderRadius: '12px',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              color: 'white',
              textAlign: 'center'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(59, 130, 246, 0.2)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
            >
              <QrCode size={40} style={{ marginBottom: '1rem', color: '#3b82f6' }} />
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.3rem' }}>Check-in Manual</h4>
              <p style={{ margin: 0, opacity: 0.8, fontSize: '0.9rem' }}>
                Realizar check-ins de visitantes
              </p>
            </div>
          </Link>
          
          <Link to="/events" style={{ textDecoration: 'none' }}>
            <div style={{
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(139, 92, 246, 0.1))',
              backdropFilter: 'blur(10px)',
              padding: '2rem',
              borderRadius: '12px',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              color: 'white',
              textAlign: 'center'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(139, 92, 246, 0.2)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
            >
              <Calendar size={40} style={{ marginBottom: '1rem', color: '#8b5cf6' }} />
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.3rem' }}>Ver Eventos</h4>
              <p style={{ margin: 0, opacity: 0.8, fontSize: '0.9rem' }}>
                Explorar todos los eventos disponibles
              </p>
            </div>
          </Link>

          <Link to="/events-admin" style={{ textDecoration: 'none' }}>
            <div style={{
              background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(245, 158, 11, 0.1))',
              backdropFilter: 'blur(10px)',
              padding: '2rem',
              borderRadius: '12px',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              color: 'white',
              textAlign: 'center'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(245, 158, 11, 0.2)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
            >
              <Settings size={40} style={{ marginBottom: '1rem', color: '#f59e0b' }} />
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.3rem' }}>Administrar Eventos</h4>
              <p style={{ margin: 0, opacity: 0.8, fontSize: '0.9rem' }}>
                Crear, editar y eliminar eventos
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

// Página de Administración de Registros
function RegistrationsAdminPage() {
  const { eventRegistrations, events, showNotification } = useApp()
  const [filter, setFilter] = React.useState('all') // all, pending, checked-in
  const [searchTerm, setSearchTerm] = React.useState('')

  // Cargar registros desde localStorage al montar el componente
  React.useEffect(() => {
    const savedRegistrations = JSON.parse(localStorage.getItem('eventRegistrations') || '[]')
    console.log('Registros guardados:', savedRegistrations)
  }, [])

  // Obtener todos los registros (estado + localStorage)
  const getAllRegistrations = () => {
    const savedRegistrations = JSON.parse(localStorage.getItem('eventRegistrations') || '[]')
    return [...eventRegistrations, ...savedRegistrations].filter((reg, index, self) =>
      index === self.findIndex(r => r.id === reg.id)
    )
  }

  // Filtrar registros
  const filteredRegistrations = getAllRegistrations().filter(reg => {
    const matchesFilter = filter === 'all' || 
      (filter === 'pending' && !reg.checkedIn) ||
      (filter === 'checked-in' && reg.checkedIn)
    
    const matchesSearch = !searchTerm || 
      reg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.code.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesFilter && matchesSearch
  })

  const getEventTitle = (eventId) => {
    const event = events.find(e => e.id === eventId)
    return event ? event.title : 'Evento no encontrado'
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    showNotification('Código copiado al portapapeles', 'success')
  }

  const totalRegistrations = getAllRegistrations().length
  const checkedInCount = getAllRegistrations().filter(reg => reg.checkedIn).length
  const pendingCount = totalRegistrations - checkedInCount

  return (
    <div style={{ maxWidth: '1200px', width: '100%', padding: '2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <Users size={48} style={{ marginBottom: '1rem', color: '#10b981' }} />
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: '300' }}>
          Administración de Registros
        </h2>
        <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>
          Gestiona todos los registros y códigos de eventos
        </p>
      </div>

      {/* Estadísticas */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '1rem', 
        marginBottom: '2rem' 
      }}>
        <div style={{
          background: 'rgba(16, 185, 129, 0.1)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: '12px',
          padding: '1.5rem',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#10b981' }}>Total Registros</h3>
          <p style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold' }}>{totalRegistrations}</p>
        </div>
        <div style={{
          background: 'rgba(59, 130, 246, 0.1)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          borderRadius: '12px',
          padding: '1.5rem',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#3b82f6' }}>Check-ins Realizados</h3>
          <p style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold' }}>{checkedInCount}</p>
        </div>
        <div style={{
          background: 'rgba(245, 158, 11, 0.1)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          borderRadius: '12px',
          padding: '1.5rem',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#f59e0b' }}>Pendientes</h3>
          <p style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold' }}>{pendingCount}</p>
        </div>
      </div>

      {/* Controles de filtro */}
      <div style={{ 
        display: 'flex', 
        gap: '1rem', 
        marginBottom: '2rem',
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
        <input
          type="text"
          placeholder="Buscar por nombre, email o código..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: 1,
            minWidth: '300px',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            background: 'rgba(255, 255, 255, 0.1)',
            color: 'white',
            fontSize: '1rem'
          }}
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            background: 'rgba(255, 255, 255, 0.1)',
            color: 'white',
            fontSize: '1rem'
          }}
        >
          <option value="all">Todos los registros</option>
          <option value="pending">Pendientes de check-in</option>
          <option value="checked-in">Con check-in realizado</option>
        </select>
      </div>

      {/* Lista de registros */}
      {filteredRegistrations.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '3rem',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <Users size={48} style={{ opacity: 0.5, marginBottom: '1rem' }} />
          <h3 style={{ margin: '0 0 0.5rem 0', opacity: 0.7 }}>No hay registros</h3>
          <p style={{ margin: 0, opacity: 0.5 }}>
            {searchTerm || filter !== 'all' 
              ? 'No se encontraron registros con los filtros aplicados'
              : 'Aún no hay registros de eventos'
            }
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filteredRegistrations.map((registration) => (
            <div
              key={registration.id}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '1.5rem',
                display: 'grid',
                gridTemplateColumns: 'auto 1fr auto auto',
                gap: '1rem',
                alignItems: 'center'
              }}
            >
              {/* Estado */}
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: registration.checkedIn ? '#10b981' : '#f59e0b'
              }} />

              {/* Información principal */}
              <div>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>
                  {registration.name}
                </h4>
                <p style={{ margin: '0 0 0.25rem 0', opacity: 0.7, fontSize: '0.9rem' }}>
                  {registration.email}
                </p>
                <p style={{ margin: '0 0 0.25rem 0', opacity: 0.7, fontSize: '0.9rem' }}>
                  Evento: {getEventTitle(registration.eventId)}
                </p>
                <p style={{ margin: 0, opacity: 0.5, fontSize: '0.8rem' }}>
                  Registrado: {new Date(registration.registeredAt).toLocaleString('es-DO')}
                  {registration.checkedIn && (
                    <span> • Check-in: {new Date(registration.checkedInAt).toLocaleString('es-DO')}</span>
                  )}
                </p>
              </div>

              {/* Código */}
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  background: 'rgba(212, 175, 55, 0.2)',
                  border: '1px solid rgba(212, 175, 55, 0.5)',
                  borderRadius: '6px',
                  padding: '0.5rem 1rem',
                  fontFamily: 'monospace',
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                  color: '#d4af37'
                }}>
                  {registration.code}
                </div>
              </div>

              {/* Acciones */}
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => copyToClipboard(registration.code)}
                  style={{
                    background: 'rgba(59, 130, 246, 0.2)',
                    border: '1px solid rgba(59, 130, 246, 0.5)',
                    borderRadius: '6px',
                    padding: '0.5rem',
                    color: '#3b82f6',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}
                  title="Copiar código"
                >
                  <Copy size={16} />
                </button>
                {registration.checkedIn && (
                  <div style={{
                    background: 'rgba(16, 185, 129, 0.2)',
                    border: '1px solid rgba(16, 185, 129, 0.5)',
                    borderRadius: '6px',
                    padding: '0.5rem',
                    color: '#10b981',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <CheckCircle size={16} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Página de Gestión de Eventos (Administrativa)
function EventsAdminPage() {
  const { events, showNotification, createEvent, updateEvent, deleteEvent } = useApp()
  const [showCreateModal, setShowCreateModal] = React.useState(false)
  const [editingEvent, setEditingEvent] = React.useState(null)
  const [formData, setFormData] = React.useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    capacity: '',
    image: ''
  })

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      capacity: '',
      image: ''
    })
  }

  const handleCreateEvent = async (e) => {
    e.preventDefault()
    
    if (!formData.title || !formData.date || !formData.time || !formData.location) {
      showNotification('Por favor completa todos los campos obligatorios', 'error')
      return
    }

    try {
      const eventData = {
        ...formData,
        capacity: parseInt(formData.capacity) || 50,
        datetime: `${formData.date}T${formData.time}:00`,
        created_at: new Date().toISOString()
      }

      await createEvent(eventData)
      showNotification('Evento creado exitosamente', 'success')
      setShowCreateModal(false)
      resetForm()
    } catch (error) {
      showNotification('Error al crear el evento', 'error')
    }
  }

  const handleEditEvent = async (e) => {
    e.preventDefault()
    
    if (!formData.title || !formData.date || !formData.time || !formData.location) {
      showNotification('Por favor completa todos los campos obligatorios', 'error')
      return
    }

    try {
      const eventData = {
        ...formData,
        capacity: parseInt(formData.capacity) || 50,
        datetime: `${formData.date}T${formData.time}:00`
      }

      await updateEvent(editingEvent.id, eventData)
      showNotification('Evento actualizado exitosamente', 'success')
      setEditingEvent(null)
      resetForm()
    } catch (error) {
      showNotification('Error al actualizar el evento', 'error')
    }
  }

  const handleDeleteEvent = async (eventId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este evento?')) {
      try {
        await deleteEvent(eventId)
        showNotification('Evento eliminado exitosamente', 'success')
      } catch (error) {
        showNotification('Error al eliminar el evento', 'error')
      }
    }
  }

  const openEditModal = (event) => {
    const eventDate = new Date(event.datetime)
    setFormData({
      title: event.title,
      description: event.description || '',
      date: eventDate.toISOString().split('T')[0],
      time: eventDate.toTimeString().slice(0, 5),
      location: event.location,
      capacity: event.capacity.toString(),
      image: event.image || ''
    })
    setEditingEvent(event)
  }

  const getEventStatus = (eventDate) => {
    const now = new Date()
    const event = new Date(eventDate)
    
    if (event < now) return { status: 'Finalizado', color: '#ef4444' }
    if (event.toDateString() === now.toDateString()) return { status: 'Hoy', color: '#f59e0b' }
    return { status: 'Próximo', color: '#10b981' }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem'
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '80px',
          height: '80px',
          background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
          borderRadius: '20px',
          marginBottom: '1rem'
        }}>
          <Calendar size={40} style={{ color: 'white' }} />
        </div>
        <h2 style={{ 
          fontSize: '2.5rem', 
          marginBottom: '0.5rem', 
          fontWeight: '300',
          background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Gestión de Eventos
        </h2>
        <p style={{ fontSize: '1.2rem', opacity: 0.9, color: 'white' }}>
          Crea, edita y administra todos los eventos
        </p>
      </div>

      {/* Menú de Navegación Administrativo */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        marginBottom: '3rem',
        flexWrap: 'wrap'
      }}>
        <Link to="/admin" style={{ textDecoration: 'none' }}>
          <button style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
            padding: '1rem 2rem',
            color: 'white',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            minWidth: '140px',
            justifyContent: 'center',
            backdropFilter: 'blur(10px)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
          >
            <BarChart3 size={20} />
            Dashboard
          </button>
        </Link>

        <button style={{
          background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
          border: 'none',
          borderRadius: '12px',
          padding: '1rem 2rem',
          color: 'white',
          fontSize: '1rem',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          minWidth: '140px',
          justifyContent: 'center',
          boxShadow: '0 4px 15px rgba(139, 92, 246, 0.3)'
        }}>
          <Calendar size={20} />
          Gestión de Eventos
        </button>

        <Link to="/checkin" style={{ textDecoration: 'none' }}>
          <button style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
            padding: '1rem 2rem',
            color: 'white',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            minWidth: '140px',
            justifyContent: 'center',
            backdropFilter: 'blur(10px)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
          >
            <QrCode size={20} />
            Kiosco
          </button>
        </Link>

        <Link to="/registrations" style={{ textDecoration: 'none' }}>
          <button style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
            padding: '1rem 2rem',
            color: 'white',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            minWidth: '140px',
            justifyContent: 'center',
            backdropFilter: 'blur(10px)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
          >
            <Users size={20} />
            Usuarios
          </button>
        </Link>
      </div>

      {/* Botón Crear Evento */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <button
          onClick={() => setShowCreateModal(true)}
          style={{
            background: 'linear-gradient(135deg, #10b981, #059669)',
            border: 'none',
            borderRadius: '12px',
            padding: '1rem 2rem',
            color: 'white',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.4)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.3)'
          }}
        >
          <Plus size={20} />
          Crear Nuevo Evento
        </button>
      </div>

      {/* Lista de Eventos */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
        gap: '2rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {events.map(event => {
          const eventStatus = getEventStatus(event.datetime)
          return (
            <div
              key={event.id}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                padding: '1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)'
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Status Badge */}
              <div style={{
                display: 'inline-block',
                background: eventStatus.color,
                color: 'white',
                padding: '0.25rem 0.75rem',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: '600',
                marginBottom: '1rem'
              }}>
                {eventStatus.status}
              </div>

              <h3 style={{ 
                margin: '0 0 0.5rem 0', 
                color: 'white',
                fontSize: '1.3rem'
              }}>
                {event.title}
              </h3>
              
              <p style={{ 
                margin: '0 0 1rem 0', 
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '0.9rem',
                lineHeight: '1.4'
              }}>
                {event.description}
              </p>

              <div style={{ marginBottom: '1rem' }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  marginBottom: '0.5rem',
                  color: 'rgba(255, 255, 255, 0.9)'
                }}>
                  <Calendar size={16} />
                  <span>{new Date(event.datetime).toLocaleDateString()}</span>
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  marginBottom: '0.5rem',
                  color: 'rgba(255, 255, 255, 0.9)'
                }}>
                  <Clock size={16} />
                  <span>{new Date(event.datetime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  marginBottom: '0.5rem',
                  color: 'rgba(255, 255, 255, 0.9)'
                }}>
                  <MapPin size={16} />
                  <span>{event.location}</span>
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  color: 'rgba(255, 255, 255, 0.9)'
                }}>
                  <Users size={16} />
                  <span>Capacidad: {event.capacity}</span>
                </div>
              </div>

              {/* Botones de Acción */}
              <div style={{
                display: 'flex',
                gap: '0.5rem',
                marginTop: '1rem'
              }}>
                <button
                  onClick={() => openEditModal(event)}
                  style={{
                    flex: 1,
                    background: 'rgba(59, 130, 246, 0.8)',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.75rem',
                    color: 'white',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = 'rgba(59, 130, 246, 1)'}
                  onMouseOut={(e) => e.currentTarget.style.background = 'rgba(59, 130, 246, 0.8)'}
                >
                  <Edit size={16} />
                  Editar
                </button>
                
                <button
                  onClick={() => handleDeleteEvent(event.id)}
                  style={{
                    flex: 1,
                    background: 'rgba(239, 68, 68, 0.8)',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.75rem',
                    color: 'white',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 1)'}
                  onMouseOut={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.8)'}
                >
                  <Trash2 size={16} />
                  Eliminar
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Modal Crear Evento */}
      {showCreateModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '2rem'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '16px',
            padding: '2rem',
            width: '100%',
            maxWidth: '500px',
            maxHeight: '90vh',
            overflow: 'auto',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem'
            }}>
              <h3 style={{ margin: 0, color: 'white', fontSize: '1.5rem' }}>
                Crear Nuevo Evento
              </h3>
              <button
                onClick={() => {
                  setShowCreateModal(false)
                  resetForm()
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  padding: '0.5rem'
                }}
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleCreateEvent}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'white' }}>
                  Título del Evento *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                  placeholder="Nombre del evento"
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'white' }}>
                  Descripción
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    fontSize: '1rem',
                    outline: 'none',
                    minHeight: '80px',
                    resize: 'vertical'
                  }}
                  placeholder="Descripción del evento"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'white' }}>
                    Fecha *
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      fontSize: '1rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'white' }}>
                    Hora *
                  </label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      fontSize: '1rem',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'white' }}>
                  Ubicación *
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                  placeholder="Lugar del evento"
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'white' }}>
                  Capacidad
                </label>
                <input
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                  placeholder="50"
                  min="1"
                />
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'white' }}>
                  URL de Imagen
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false)
                    resetForm()
                  }}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '1rem',
                    cursor: 'pointer'
                  }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '1rem',
                    cursor: 'pointer'
                  }}
                >
                  Crear Evento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Editar Evento */}
      {editingEvent && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '2rem'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '16px',
            padding: '2rem',
            width: '100%',
            maxWidth: '500px',
            maxHeight: '90vh',
            overflow: 'auto',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem'
            }}>
              <h3 style={{ margin: 0, color: 'white', fontSize: '1.5rem' }}>
                Editar Evento
              </h3>
              <button
                onClick={() => {
                  setEditingEvent(null)
                  resetForm()
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  padding: '0.5rem'
                }}
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleEditEvent}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'white' }}>
                  Título del Evento *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                  placeholder="Nombre del evento"
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'white' }}>
                  Descripción
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    fontSize: '1rem',
                    outline: 'none',
                    minHeight: '80px',
                    resize: 'vertical'
                  }}
                  placeholder="Descripción del evento"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'white' }}>
                    Fecha *
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      fontSize: '1rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'white' }}>
                    Hora *
                  </label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      fontSize: '1rem',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'white' }}>
                  Ubicación *
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                  placeholder="Lugar del evento"
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'white' }}>
                  Capacidad
                </label>
                <input
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                  placeholder="50"
                  min="1"
                />
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'white' }}>
                  URL de Imagen
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  type="button"
                  onClick={() => {
                    setEditingEvent(null)
                    resetForm()
                  }}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '1rem',
                    cursor: 'pointer'
                  }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '1rem',
                    cursor: 'pointer'
                  }}
                >
                  Actualizar Evento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

// Componente App principal que envuelve todo con el Provider
function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}

export default App