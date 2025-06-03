import { createClient } from '@supabase/supabase-js'

// Configuración de Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Verificar si las variables están configuradas
const isSupabaseConfigured = supabaseUrl && 
  supabaseKey && 
  supabaseUrl !== 'YOUR_SUPABASE_URL' && 
  supabaseKey !== 'YOUR_SUPABASE_ANON_KEY' &&
  supabaseUrl.startsWith('https://')

// Cliente de Supabase - solo crear si está configurado
export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseKey)
  : null

// Función para verificar si Supabase está configurado
export const isSupabaseReady = () => isSupabaseConfigured

// ============================================================================
// FUNCIONES DE EVENTOS
// ============================================================================

export const eventService = {
  // Obtener todos los eventos
  async getEvents() {
    if (!isSupabaseConfigured) {
      console.warn('Supabase no configurado, devolviendo datos mock')
      return getMockEvents()
    }
    
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching events:', error)
      return getMockEvents()
    }
  },

  // Obtener eventos activos
  async getActiveEvents() {
    if (!isSupabaseConfigured) {
      console.warn('Supabase no configurado, devolviendo datos mock')
      return getMockEvents().filter(event => event.status === 'active')
    }
    
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('status', 'active')
        .gte('date', new Date().toISOString())
        .order('date', { ascending: true })
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching active events:', error)
      return getMockEvents().filter(event => event.status === 'active')
    }
  },

  // Crear nuevo evento
  async createEvent(eventData) {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase no configurado. Configure las variables de entorno.')
    }
    
    try {
      const { data, error } = await supabase
        .from('events')
        .insert([{
          title: eventData.title,
          description: eventData.description,
          date: eventData.date,
          capacity: eventData.capacity,
          current_visitors: 0,
          status: 'active',
          created_at: new Date().toISOString()
        }])
        .select()
      
      if (error) throw error
      return data[0]
    } catch (error) {
      console.error('Error creating event:', error)
      throw error
    }
  },

  // Actualizar evento
  async updateEvent(id, updates) {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase no configurado. Configure las variables de entorno.')
    }
    
    try {
      const { data, error } = await supabase
        .from('events')
        .update(updates)
        .eq('id', id)
        .select()
      
      if (error) throw error
      return data[0]
    } catch (error) {
      console.error('Error updating event:', error)
      throw error
    }
  },

  // Eliminar evento
  async deleteEvent(id) {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase no configurado. Configure las variables de entorno.')
    }
    
    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      return true
    } catch (error) {
      console.error('Error deleting event:', error)
      throw error
    }
  }
}

// ============================================================================
// FUNCIONES DE VISITANTES
// ============================================================================

export const visitorService = {
  // Registrar nuevo visitante
  async registerVisitor(visitorData) {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase no configurado. Configure las variables de entorno.')
    }
    
    try {
      const { data, error } = await supabase
        .from('visitors')
        .insert([{
          name: visitorData.name,
          email: visitorData.email,
          phone: visitorData.phone,
          event_id: visitorData.event_id,
          entry_time: new Date().toISOString(),
          created_at: new Date().toISOString()
        }])
        .select()
      
      if (error) throw error

      // Actualizar contador de visitantes del evento
      await this.updateEventVisitorCount(visitorData.event_id)
      
      return data[0]
    } catch (error) {
      console.error('Error registering visitor:', error)
      throw error
    }
  },

  // Registrar salida de visitante
  async registerExit(visitorId) {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase no configurado. Configure las variables de entorno.')
    }
    
    try {
      const { data, error } = await supabase
        .from('visitors')
        .update({ exit_time: new Date().toISOString() })
        .eq('id', visitorId)
        .select()
      
      if (error) throw error

      // Actualizar contador de visitantes del evento
      if (data[0]?.event_id) {
        await this.updateEventVisitorCount(data[0].event_id)
      }
      
      return data[0]
    } catch (error) {
      console.error('Error registering exit:', error)
      throw error
    }
  },

  // Obtener visitantes por evento
  async getVisitorsByEvent(eventId) {
    if (!isSupabaseConfigured) {
      return []
    }
    
    try {
      const { data, error } = await supabase
        .from('visitors')
        .select('*')
        .eq('event_id', eventId)
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching visitors:', error)
      return []
    }
  },

  // Obtener visitantes actuales (sin salida registrada)
  async getCurrentVisitors(eventId) {
    if (!isSupabaseConfigured) {
      return []
    }
    
    try {
      const { data, error } = await supabase
        .from('visitors')
        .select('*')
        .eq('event_id', eventId)
        .is('exit_time', null)
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching current visitors:', error)
      return []
    }
  },

  // Actualizar contador de visitantes en el evento
  async updateEventVisitorCount(eventId) {
    if (!isSupabaseConfigured) {
      return 0
    }
    
    try {
      const currentVisitors = await this.getCurrentVisitors(eventId)
      
      const { error } = await supabase
        .from('events')
        .update({ current_visitors: currentVisitors.length })
        .eq('id', eventId)
      
      if (error) throw error
      return currentVisitors.length
    } catch (error) {
      console.error('Error updating visitor count:', error)
      throw error
    }
  }
}

// ============================================================================
// FUNCIONES DE AUTENTICACIÓN
// ============================================================================

export const authService = {
  // Login de administrador
  async signIn(email, password) {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase no configurado. Configure las variables de entorno.')
    }
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error signing in:', error)
      throw error
    }
  },

  // Logout
  async signOut() {
    if (!isSupabaseConfigured) {
      return
    }
    
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error) {
      console.error('Error signing out:', error)
      throw error
    }
  },

  // Obtener usuario actual
  async getCurrentUser() {
    if (!isSupabaseConfigured) {
      return null
    }
    
    try {
      const { data: { user } } = await supabase.auth.getUser()
      return user
    } catch (error) {
      console.error('Error getting current user:', error)
      return null
    }
  },

  // Verificar si está autenticado
  async isAuthenticated() {
    const user = await this.getCurrentUser()
    return !!user
  }
}

// ============================================================================
// FUNCIONES DE REPORTES
// ============================================================================

export const reportService = {
  // Estadísticas diarias
  async getDailyStats(date = new Date().toISOString().split('T')[0]) {
    if (!isSupabaseConfigured) {
      return {
        totalVisitors: 0,
        eventsWithVisitors: 0,
        hourlyDistribution: {},
        eventDistribution: {}
      }
    }
    
    try {
      const { data: visitors, error } = await supabase
        .from('visitors')
        .select('*, events(title)')
        .gte('created_at', `${date}T00:00:00`)
        .lt('created_at', `${date}T23:59:59`)
      
      if (error) throw error

      const stats = {
        totalVisitors: visitors.length,
        eventsWithVisitors: [...new Set(visitors.map(v => v.event_id))].length,
        hourlyDistribution: {},
        eventDistribution: {}
      }

      // Distribución por horas
      visitors.forEach(visitor => {
        const hour = new Date(visitor.created_at).getHours()
        stats.hourlyDistribution[hour] = (stats.hourlyDistribution[hour] || 0) + 1
      })

      // Distribución por eventos
      visitors.forEach(visitor => {
        const eventTitle = visitor.events?.title || 'Evento sin título'
        stats.eventDistribution[eventTitle] = (stats.eventDistribution[eventTitle] || 0) + 1
      })

      return stats
    } catch (error) {
      console.error('Error getting daily stats:', error)
      return {
        totalVisitors: 0,
        eventsWithVisitors: 0,
        hourlyDistribution: {},
        eventDistribution: {}
      }
    }
  },

  // Generar reporte semanal
  async getWeeklyReport() {
    if (!isSupabaseConfigured) {
      return null
    }
    
    try {
      const endDate = new Date()
      const startDate = new Date()
      startDate.setDate(endDate.getDate() - 7)

      const { data, error } = await supabase
        .from('visitors')
        .select('*, events(title)')
        .gte('created_at', startDate.toISOString())
        .lte('created_at', endDate.toISOString())
      
      if (error) throw error

      const dailyStats = {}
      data.forEach(visitor => {
        const date = visitor.created_at.split('T')[0]
        dailyStats[date] = (dailyStats[date] || 0) + 1
      })

      return {
        totalVisitors: data.length,
        dailyBreakdown: dailyStats,
        averageDaily: Math.round(data.length / 7),
        period: { start: startDate, end: endDate }
      }
    } catch (error) {
      console.error('Error getting weekly report:', error)
      return null
    }
  }
}

// ============================================================================
// DATOS MOCK PARA DESARROLLO
// ============================================================================

function getMockEvents() {
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)
  
  const nextWeek = new Date(today)
  nextWeek.setDate(today.getDate() + 7)
  
  const nextMonth = new Date(today)
  nextMonth.setDate(today.getDate() + 30)
  
  const in3Days = new Date(today)
  in3Days.setDate(today.getDate() + 3)
  
  const in2Weeks = new Date(today)
  in2Weeks.setDate(today.getDate() + 14)
  
  const in5Days = new Date(today)
  in5Days.setDate(today.getDate() + 5)

  return [
    // EVENTOS DE HOY - Redirección automática
    {
      id: 'mock-1',
      title: 'Exposición: Arte Contemporáneo Dominicano',
      description: 'Una muestra de las obras más representativas del arte contemporáneo de República Dominicana.',
      date: today.toISOString(),
      capacity: 150,
      current_visitors: 45,
      status: 'active',
      category: 'Exposición',
      location: 'Sala Principal',
      created_at: new Date().toISOString()
    },
    {
      id: 'mock-3',
      title: 'Taller: Fotografía Cultural',
      description: 'Aprende técnicas de fotografía especializada en capturar la esencia de eventos culturales.',
      date: today.toISOString(),
      capacity: 30,
      current_visitors: 12,
      status: 'active',
      category: 'Taller',
      location: 'Aula 101',
      created_at: new Date().toISOString()
    },
    {
      id: 'mock-8',
      title: 'Concierto: Jazz en Vivo',
      description: 'Una noche íntima con los mejores músicos de jazz de la República Dominicana.',
      date: today.toISOString(),
      capacity: 80,
      current_visitors: 75,
      status: 'active',
      category: 'Concierto',
      location: 'Sala de Música',
      created_at: new Date().toISOString()
    },
    
    // EVENTOS PRÓXIMOS - Envío por email
    {
      id: 'mock-2',
      title: 'Concierto: Música Clásica Dominicana',
      description: 'Un recorrido por la música clásica dominicana interpretada por la Orquesta Sinfónica Nacional.',
      date: tomorrow.toISOString(),
      capacity: 200,
      current_visitors: 180,
      status: 'active',
      category: 'Concierto',
      location: 'Auditorio Principal',
      created_at: new Date().toISOString()
    },
    {
      id: 'mock-6',
      title: 'Obra de Teatro: "Sueños de Libertad"',
      description: 'Drama histórico que narra la lucha por la independencia dominicana con actuaciones magistrales.',
      date: in3Days.toISOString(),
      capacity: 120,
      current_visitors: 35,
      status: 'active',
      category: 'Teatro',
      location: 'Teatro Principal',
      created_at: new Date().toISOString()
    },
    {
      id: 'mock-7',
      title: 'Exposición: Fotografía Histórica RD',
      description: 'Colección única de fotografías que documentan la historia de República Dominicana.',
      date: in5Days.toISOString(),
      capacity: 100,
      current_visitors: 20,
      status: 'active',
      category: 'Exposición',
      location: 'Galería de Arte',
      created_at: new Date().toISOString()
    },
    {
      id: 'mock-4',
      title: 'Conferencia: Historia del Arte Caribeño',
      description: 'Una exploración profunda de las corrientes artísticas que han definido el Caribe a través de los siglos.',
      date: nextWeek.toISOString(),
      capacity: 100,
      current_visitors: 65,
      status: 'active',
      category: 'Conferencia',
      location: 'Sala de Conferencias',
      created_at: new Date().toISOString()
    },
    {
      id: 'mock-9',
      title: 'Taller: Cerámica Tradicional Taína',
      description: 'Aprende las técnicas ancestrales de cerámica utilizadas por los pueblos taínos.',
      date: in2Weeks.toISOString(),
      capacity: 25,
      current_visitors: 8,
      status: 'active',
      category: 'Taller',
      location: 'Taller de Artes',
      created_at: new Date().toISOString()
    },
    {
      id: 'mock-5',
      title: 'Festival: Danza Folklórica Dominicana',
      description: 'Celebración de las tradiciones dancísticas dominicanas con presentaciones de grupos locales.',
      date: nextMonth.toISOString(),
      capacity: 300,
      current_visitors: 85,
      status: 'active',
      category: 'Festival',
      location: 'Plaza Central',
      created_at: new Date().toISOString()
    },
    
    // EVENTOS CON CAPACIDAD COMPLETA - Para probar validaciones
    {
      id: 'mock-10',
      title: 'Conferencia: Literatura Dominicana Contemporánea',
      description: 'Encuentro con los autores más destacados de la literatura dominicana actual.',
      date: in3Days.toISOString(),
      capacity: 50,
      current_visitors: 50, // LLENO
      status: 'active',
      category: 'Conferencia',
      location: 'Biblioteca Central',
      created_at: new Date().toISOString()
    },
    
    // EVENTOS ADICIONALES VARIADOS
    {
      id: 'mock-11',
      title: 'Exposición: Esculturas en Madera',
      description: 'Obras maestras talladas en maderas preciosas dominicanas por artistas locales.',
      date: in5Days.toISOString(),
      capacity: 80,
      current_visitors: 15,
      status: 'active',
      category: 'Exposición',
      location: 'Sala de Esculturas',
      created_at: new Date().toISOString()
    },
    {
      id: 'mock-12',
      title: 'Concierto: Merengue Clásico',
      description: 'Tributo a los grandes maestros del merengue dominicano con orquesta en vivo.',
      date: nextWeek.toISOString(),
      capacity: 250,
      current_visitors: 120,
      status: 'active',
      category: 'Concierto',
      location: 'Gran Auditorio',
      created_at: new Date().toISOString()
    }
  ]
}

// ============================================================================
// FUNCIONES UTILITARIAS
// ============================================================================

export const utils = {
  // Formatear fecha para mostrar
  formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('es-DO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  },

  // Validar capacidad del evento
  async checkEventCapacity(eventId) {
    if (!isSupabaseConfigured) {
      return true // En modo mock, siempre hay capacidad
    }
    
    try {
      const { data: event } = await supabase
        .from('events')
        .select('capacity, current_visitors')
        .eq('id', eventId)
        .single()
      
      if (!event) return false
      return event.current_visitors < event.capacity
    } catch (error) {
      console.error('Error checking capacity:', error)
      return false
    }
  },

  // Generar código QR para evento
  generateEventQR(eventId) {
    const baseUrl = window.location.origin
    return `${baseUrl}/events/${eventId}/register`
  }
}

export default supabase 