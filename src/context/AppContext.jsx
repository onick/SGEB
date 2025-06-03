import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { eventService, visitorService, authService } from '../lib/supabase'

// ============================================================================
// TIPOS DE ACCIONES
// ============================================================================

const actionTypes = {
  // Autenticación
  SET_USER: 'SET_USER',
  SET_LOADING: 'SET_LOADING',
  
  // Eventos
  SET_EVENTS: 'SET_EVENTS',
  ADD_EVENT: 'ADD_EVENT',
  UPDATE_EVENT: 'UPDATE_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
  
  // Visitantes
  SET_VISITORS: 'SET_VISITORS',
  ADD_VISITOR: 'ADD_VISITOR',
  UPDATE_VISITOR: 'UPDATE_VISITOR',
  
  // Registros de eventos (NUEVO)
  ADD_EVENT_REGISTRATION: 'ADD_EVENT_REGISTRATION',
  UPDATE_EVENT_REGISTRATION: 'UPDATE_EVENT_REGISTRATION',
  SET_EVENT_REGISTRATIONS: 'SET_EVENT_REGISTRATIONS',
  
  // UI y notificaciones
  SET_NOTIFICATION: 'SET_NOTIFICATION',
  CLEAR_NOTIFICATION: 'CLEAR_NOTIFICATION',
  SET_MODAL: 'SET_MODAL'
}

// ============================================================================
// ESTADO INICIAL
// ============================================================================

const initialState = {
  // Autenticación
  user: null,
  isAuthenticated: false,
  loading: true,
  
  // Eventos
  events: [],
  activeEvents: [],
  selectedEvent: null,
  
  // Visitantes
  visitors: [],
  currentVisitors: [],
  
  // Registros de eventos (NUEVO)
  eventRegistrations: [], // Almacenar todos los registros con códigos
  
  // UI
  notification: null,
  modal: { isOpen: false, type: null, data: null }
}

// ============================================================================
// REDUCER
// ============================================================================

function appReducer(state, action) {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        loading: false
      }
    
    case actionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      }
    
    case actionTypes.SET_EVENTS:
      console.log('📅 Eventos cargados:', action.payload.length)
      const today = new Date()
      today.setHours(0, 0, 0, 0) // Inicio del día
      
      const activeEventsFiltered = action.payload.filter(event => {
        const eventDate = new Date(event.date)
        eventDate.setHours(0, 0, 0, 0) // Inicio del día del evento
        
        const isActive = event.status === 'active'
        const isToday = eventDate.getTime() === today.getTime()
        const isFuture = eventDate > today
        
        console.log(`📊 Evento: ${event.title}`, {
          fecha: eventDate.toDateString(),
          hoy: today.toDateString(),
          esHoy: isToday,
          esFuturo: isFuture,
          esActivo: isActive,
          incluido: isActive && (isToday || isFuture)
        })
        
        return isActive && (isToday || isFuture)
      })
      
      console.log('✅ Eventos activos filtrados:', activeEventsFiltered.length)
      
      return {
        ...state,
        events: action.payload,
        activeEvents: activeEventsFiltered
      }
    
    case actionTypes.ADD_EVENT:
      const newEvents = [action.payload, ...state.events]
      const today1 = new Date()
      today1.setHours(0, 0, 0, 0)
      
      return {
        ...state,
        events: newEvents,
        activeEvents: newEvents.filter(event => {
          const eventDate = new Date(event.date)
          eventDate.setHours(0, 0, 0, 0)
          return event.status === 'active' && (eventDate.getTime() === today1.getTime() || eventDate > today1)
        })
      }
    
    case actionTypes.UPDATE_EVENT:
      const updatedEvents = state.events.map(event =>
        event.id === action.payload.id ? action.payload : event
      )
      const today2 = new Date()
      today2.setHours(0, 0, 0, 0)
      
      return {
        ...state,
        events: updatedEvents,
        activeEvents: updatedEvents.filter(event => {
          const eventDate = new Date(event.date)
          eventDate.setHours(0, 0, 0, 0)
          return event.status === 'active' && (eventDate.getTime() === today2.getTime() || eventDate > today2)
        })
      }
    
    case actionTypes.DELETE_EVENT:
      const filteredEvents = state.events.filter(event => event.id !== action.payload)
      const today3 = new Date()
      today3.setHours(0, 0, 0, 0)
      
      return {
        ...state,
        events: filteredEvents,
        activeEvents: filteredEvents.filter(event => {
          const eventDate = new Date(event.date)
          eventDate.setHours(0, 0, 0, 0)
          return event.status === 'active' && (eventDate.getTime() === today3.getTime() || eventDate > today3)
        })
      }
    
    case actionTypes.SET_VISITORS:
      return {
        ...state,
        visitors: action.payload
      }
    
    case actionTypes.ADD_VISITOR:
      return {
        ...state,
        visitors: [action.payload, ...state.visitors]
      }
    
    case actionTypes.UPDATE_VISITOR:
      return {
        ...state,
        visitors: state.visitors.map(visitor =>
          visitor.id === action.payload.id ? action.payload : visitor
        )
      }
    
    case actionTypes.ADD_EVENT_REGISTRATION:
      return {
        ...state,
        eventRegistrations: [action.payload, ...state.eventRegistrations]
      }
    
    case actionTypes.UPDATE_EVENT_REGISTRATION:
      return {
        ...state,
        eventRegistrations: state.eventRegistrations.map(registration =>
          registration.id === action.payload.id ? action.payload : registration
        )
      }
    
    case actionTypes.SET_EVENT_REGISTRATIONS:
      return {
        ...state,
        eventRegistrations: action.payload
      }
    
    case actionTypes.SET_NOTIFICATION:
      return {
        ...state,
        notification: action.payload
      }
    
    case actionTypes.CLEAR_NOTIFICATION:
      return {
        ...state,
        notification: null
      }
    
    case actionTypes.SET_MODAL:
      return {
        ...state,
        modal: action.payload
      }
    
    default:
      return state
  }
}

// ============================================================================
// CONTEXTO
// ============================================================================

const AppContext = createContext()

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  // ============================================================================
  // EFECTOS
  // ============================================================================

  // Cargar datos iniciales
  useEffect(() => {
    checkAuth()
    loadEvents()
    loadRegistrationsFromStorage() // Cargar registros guardados
  }, [])

  // Auto-limpiar notificaciones después de 5 segundos
  useEffect(() => {
    if (state.notification) {
      const timer = setTimeout(() => {
        dispatch({ type: actionTypes.CLEAR_NOTIFICATION })
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [state.notification])

  // ============================================================================
  // FUNCIONES DE AUTENTICACIÓN
  // ============================================================================

  const checkAuth = async () => {
    try {
      const user = await authService.getCurrentUser()
      dispatch({ type: actionTypes.SET_USER, payload: user })
    } catch (error) {
      console.error('Error checking auth:', error)
      dispatch({ type: actionTypes.SET_USER, payload: null })
    }
  }

  const login = async (email, password) => {
    try {
      dispatch({ type: actionTypes.SET_LOADING, payload: true })
      const { user } = await authService.signIn(email, password)
      dispatch({ type: actionTypes.SET_USER, payload: user })
      showNotification('Inicio de sesión exitoso', 'success')
      return user
    } catch (error) {
      showNotification('Error al iniciar sesión: ' + error.message, 'error')
      throw error
    } finally {
      dispatch({ type: actionTypes.SET_LOADING, payload: false })
    }
  }

  const logout = async () => {
    try {
      await authService.signOut()
      dispatch({ type: actionTypes.SET_USER, payload: null })
      showNotification('Sesión cerrada exitosamente', 'success')
    } catch (error) {
      showNotification('Error al cerrar sesión', 'error')
    }
  }

  // ============================================================================
  // FUNCIONES DE EVENTOS
  // ============================================================================

  const loadEvents = async () => {
    try {
      console.log('🔄 Iniciando carga de eventos...')
      const events = await eventService.getEvents()
      console.log('📦 Eventos obtenidos del servicio:', events?.length || 0)
      console.log('📋 Primeros 3 eventos:', events?.slice(0, 3))
      dispatch({ type: actionTypes.SET_EVENTS, payload: events })
    } catch (error) {
      console.error('❌ Error loading events:', error)
      showNotification('Error al cargar eventos', 'error')
    }
  }

  const createEvent = async (eventData) => {
    try {
      const newEvent = await eventService.createEvent(eventData)
      dispatch({ type: actionTypes.ADD_EVENT, payload: newEvent })
      showNotification('Evento creado exitosamente', 'success')
      return newEvent
    } catch (error) {
      showNotification('Error al crear evento: ' + error.message, 'error')
      throw error
    }
  }

  const updateEvent = async (id, updates) => {
    try {
      const updatedEvent = await eventService.updateEvent(id, updates)
      dispatch({ type: actionTypes.UPDATE_EVENT, payload: updatedEvent })
      showNotification('Evento actualizado exitosamente', 'success')
      return updatedEvent
    } catch (error) {
      showNotification('Error al actualizar evento', 'error')
      throw error
    }
  }

  const deleteEvent = async (id) => {
    try {
      await eventService.deleteEvent(id)
      dispatch({ type: actionTypes.DELETE_EVENT, payload: id })
      showNotification('Evento eliminado exitosamente', 'success')
    } catch (error) {
      showNotification('Error al eliminar evento', 'error')
      throw error
    }
  }

  // ============================================================================
  // FUNCIONES DE VISITANTES
  // ============================================================================

  const registerVisitor = async (visitorData) => {
    try {
      const newVisitor = await visitorService.registerVisitor(visitorData)
      dispatch({ type: actionTypes.ADD_VISITOR, payload: newVisitor })
      
      // Actualizar el evento con el nuevo contador
      const updatedEvents = state.events.map(event => 
        event.id === visitorData.event_id 
          ? { ...event, current_visitors: event.current_visitors + 1 }
          : event
      )
      dispatch({ type: actionTypes.SET_EVENTS, payload: updatedEvents })
      
      showNotification('Visitante registrado exitosamente', 'success')
      return newVisitor
    } catch (error) {
      showNotification('Error al registrar visitante: ' + error.message, 'error')
      throw error
    }
  }

  const registerExit = async (visitorId) => {
    try {
      const updatedVisitor = await visitorService.registerExit(visitorId)
      dispatch({ type: actionTypes.UPDATE_VISITOR, payload: updatedVisitor })
      
      // Actualizar el evento con el nuevo contador
      const updatedEvents = state.events.map(event => 
        event.id === updatedVisitor.event_id 
          ? { ...event, current_visitors: Math.max(0, event.current_visitors - 1) }
          : event
      )
      dispatch({ type: actionTypes.SET_EVENTS, payload: updatedEvents })
      
      showNotification('Salida registrada exitosamente', 'success')
      return updatedVisitor
    } catch (error) {
      showNotification('Error al registrar salida', 'error')
      throw error
    }
  }

  const loadVisitorsByEvent = async (eventId) => {
    try {
      const visitors = await visitorService.getVisitorsByEvent(eventId)
      dispatch({ type: actionTypes.SET_VISITORS, payload: visitors })
      return visitors
    } catch (error) {
      showNotification('Error al cargar visitantes', 'error')
      return []
    }
  }

  // ============================================================================
  // FUNCIONES DE REGISTROS DE EVENTOS
  // ============================================================================

  const registerToEvent = async (eventId, registrationData) => {
    try {
      // Generar código único
      const registrationCode = `${eventId.toUpperCase()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`
      
      // Crear registro
      const newRegistration = {
        id: Date.now().toString(),
        eventId: eventId,
        code: registrationCode,
        name: registrationData.name,
        email: registrationData.email,
        phone: registrationData.phone || '',
        registeredAt: new Date().toISOString(),
        checkedIn: false,
        checkedInAt: null
      }
      
      // Guardar en el estado
      dispatch({ type: actionTypes.ADD_EVENT_REGISTRATION, payload: newRegistration })
      
      // Guardar en localStorage para persistencia
      const existingRegistrations = JSON.parse(localStorage.getItem('eventRegistrations') || '[]')
      existingRegistrations.push(newRegistration)
      localStorage.setItem('eventRegistrations', JSON.stringify(existingRegistrations))
      
      showNotification(`¡Registro exitoso! Tu código es: ${registrationCode}`, 'success')
      return newRegistration
      
    } catch (error) {
      showNotification('Error al procesar el registro: ' + error.message, 'error')
      throw error
    }
  }

  const validateRegistrationCode = (code) => {
    // Buscar en registros del estado
    const registration = state.eventRegistrations.find(reg => 
      reg.code.toLowerCase() === code.toLowerCase()
    )
    
    // Si no está en el estado, buscar en localStorage
    if (!registration) {
      const savedRegistrations = JSON.parse(localStorage.getItem('eventRegistrations') || '[]')
      return savedRegistrations.find(reg => 
        reg.code.toLowerCase() === code.toLowerCase()
      )
    }
    
    return registration
  }

  const performCheckin = async (code) => {
    try {
      const registration = validateRegistrationCode(code)
      
      if (!registration) {
        throw new Error('Código no válido')
      }
      
      if (registration.checkedIn) {
        throw new Error('Este código ya fue utilizado para check-in')
      }
      
      // Actualizar registro
      const updatedRegistration = {
        ...registration,
        checkedIn: true,
        checkedInAt: new Date().toISOString()
      }
      
      // Actualizar en el estado
      dispatch({ type: actionTypes.UPDATE_EVENT_REGISTRATION, payload: updatedRegistration })
      
      // Actualizar en localStorage
      const savedRegistrations = JSON.parse(localStorage.getItem('eventRegistrations') || '[]')
      const updatedRegistrations = savedRegistrations.map(reg =>
        reg.id === registration.id ? updatedRegistration : reg
      )
      localStorage.setItem('eventRegistrations', JSON.stringify(updatedRegistrations))
      
      // Buscar información del evento
      const event = state.events.find(e => e.id === registration.eventId)
      const eventTitle = event ? event.title : 'Evento'
      
      showNotification(`¡Check-in exitoso! Bienvenido/a ${registration.name} al evento: ${eventTitle}`, 'success')
      return updatedRegistration
      
    } catch (error) {
      showNotification(error.message, 'error')
      throw error
    }
  }

  const loadRegistrationsFromStorage = () => {
    try {
      const savedRegistrations = JSON.parse(localStorage.getItem('eventRegistrations') || '[]')
      dispatch({ type: actionTypes.SET_EVENT_REGISTRATIONS, payload: savedRegistrations })
    } catch (error) {
      console.error('Error loading registrations from storage:', error)
    }
  }

  // ============================================================================
  // FUNCIONES DE UI
  // ============================================================================

  const showNotification = (message, type = 'info') => {
    dispatch({
      type: actionTypes.SET_NOTIFICATION,
      payload: { message, type, timestamp: Date.now() }
    })
  }

  const openModal = (type, data = null) => {
    dispatch({
      type: actionTypes.SET_MODAL,
      payload: { isOpen: true, type, data }
    })
  }

  const closeModal = () => {
    dispatch({
      type: actionTypes.SET_MODAL,
      payload: { isOpen: false, type: null, data: null }
    })
  }

  // ============================================================================
  // VALOR DEL CONTEXTO
  // ============================================================================

  const contextValue = {
    // Estado
    ...state,
    
    // Funciones de autenticación
    login,
    logout,
    checkAuth,
    
    // Funciones de eventos
    loadEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    
    // Funciones de visitantes
    registerVisitor,
    registerExit,
    loadVisitorsByEvent,
    
    // Funciones de registros de eventos
    registerToEvent,
    validateRegistrationCode,
    performCheckin,
    loadRegistrationsFromStorage,
    
    // Funciones de UI
    showNotification,
    openModal,
    closeModal
  }

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  )
}

// ============================================================================
// HOOK PERSONALIZADO
// ============================================================================

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp debe ser usado dentro de AppProvider')
  }
  return context
}

export default AppContext 