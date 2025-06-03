-- ============================================================================
-- SCRIPT DE INICIALIZACIÓN PARA CENTRO CULTURAL BANRESERVAS
-- Sistema de Gestión de Eventos y Visitantes (SGEV)
-- ============================================================================

-- Habilitar extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- TABLA DE EVENTOS
-- ============================================================================

CREATE TABLE IF NOT EXISTS events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    date TIMESTAMP WITH TIME ZONE NOT NULL,
    capacity INTEGER DEFAULT 100,
    current_visitors INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'completed', 'cancelled')),
    image_url TEXT,
    location VARCHAR(255),
    category VARCHAR(100),
    price DECIMAL(10,2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índices para optimizar consultas
CREATE INDEX IF NOT EXISTS idx_events_date ON events (date);
CREATE INDEX IF NOT EXISTS idx_events_status ON events (status);
CREATE INDEX IF NOT EXISTS idx_events_category ON events (category);

-- ============================================================================
-- TABLA DE VISITANTES
-- ============================================================================

CREATE TABLE IF NOT EXISTS visitors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    document_id VARCHAR(50),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    entry_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    exit_time TIMESTAMP WITH TIME ZONE,
    visitor_type VARCHAR(50) DEFAULT 'general' CHECK (visitor_type IN ('general', 'student', 'senior', 'vip', 'staff')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índices para optimizar consultas
CREATE INDEX IF NOT EXISTS idx_visitors_event_id ON visitors (event_id);
CREATE INDEX IF NOT EXISTS idx_visitors_entry_time ON visitors (entry_time);
CREATE INDEX IF NOT EXISTS idx_visitors_email ON visitors (email);

-- ============================================================================
-- TABLA DE USUARIOS ADMINISTRATIVOS
-- ============================================================================

CREATE TABLE IF NOT EXISTS admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin', 'operator', 'viewer')),
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índice para optimizar consultas
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users (email);
CREATE INDEX IF NOT EXISTS idx_admin_users_role ON admin_users (role);

-- ============================================================================
-- TABLA DE REPORTES DIARIOS
-- ============================================================================

CREATE TABLE IF NOT EXISTS daily_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    report_date DATE NOT NULL UNIQUE,
    total_visitors INTEGER DEFAULT 0,
    total_events INTEGER DEFAULT 0,
    peak_hour INTEGER, -- Hora con más visitantes (0-23)
    total_revenue DECIMAL(10,2) DEFAULT 0.00,
    notes TEXT,
    generated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índice para optimizar consultas
CREATE INDEX IF NOT EXISTS idx_daily_reports_date ON daily_reports (report_date);

-- ============================================================================
-- TABLA DE CATEGORÍAS DE EVENTOS
-- ============================================================================

CREATE TABLE IF NOT EXISTS event_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    color VARCHAR(7) DEFAULT '#3b82f6', -- Color hexadecimal
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- FUNCIONES Y TRIGGERS PARA MANTENER CONSISTENCIA
-- ============================================================================

-- Función para actualizar el contador de visitantes actuales
CREATE OR REPLACE FUNCTION update_current_visitors()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        -- Nuevo visitante entra
        UPDATE events 
        SET current_visitors = current_visitors + 1,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = NEW.event_id;
        RETURN NEW;
    ELSIF TG_OP = 'UPDATE' THEN
        -- Visitante sale (se registra exit_time)
        IF OLD.exit_time IS NULL AND NEW.exit_time IS NOT NULL THEN
            UPDATE events 
            SET current_visitors = GREATEST(current_visitors - 1, 0),
                updated_at = CURRENT_TIMESTAMP
            WHERE id = NEW.event_id;
        END IF;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        -- Se elimina registro de visitante
        IF OLD.exit_time IS NULL THEN
            UPDATE events 
            SET current_visitors = GREATEST(current_visitors - 1, 0),
                updated_at = CURRENT_TIMESTAMP
            WHERE id = OLD.event_id;
        END IF;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Triggers para mantener contadores actualizados
DROP TRIGGER IF EXISTS trigger_update_visitors_on_insert ON visitors;
CREATE TRIGGER trigger_update_visitors_on_insert
    AFTER INSERT ON visitors
    FOR EACH ROW EXECUTE FUNCTION update_current_visitors();

DROP TRIGGER IF EXISTS trigger_update_visitors_on_update ON visitors;
CREATE TRIGGER trigger_update_visitors_on_update
    AFTER UPDATE ON visitors
    FOR EACH ROW EXECUTE FUNCTION update_current_visitors();

DROP TRIGGER IF EXISTS trigger_update_visitors_on_delete ON visitors;
CREATE TRIGGER trigger_update_visitors_on_delete
    AFTER DELETE ON visitors
    FOR EACH ROW EXECUTE FUNCTION update_current_visitors();

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para eventos
DROP TRIGGER IF EXISTS trigger_update_events_updated_at ON events;
CREATE TRIGGER trigger_update_events_updated_at
    BEFORE UPDATE ON events
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger para admin_users
DROP TRIGGER IF EXISTS trigger_update_admin_users_updated_at ON admin_users;
CREATE TRIGGER trigger_update_admin_users_updated_at
    BEFORE UPDATE ON admin_users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- DATOS DE EJEMPLO PARA DESARROLLO
-- ============================================================================

-- Insertar categorías de eventos
INSERT INTO event_categories (name, description, color) VALUES
('Exposición', 'Exposiciones de arte y cultura', '#8B5CF6'),
('Concierto', 'Eventos musicales y espectáculos', '#10B981'),
('Teatro', 'Obras teatrales y performances', '#F59E0B'),
('Taller', 'Talleres educativos y formativos', '#3B82F6'),
('Conferencia', 'Charlas y conferencias', '#EF4444')
ON CONFLICT (name) DO NOTHING;

-- Insertar eventos de ejemplo
INSERT INTO events (title, description, date, capacity, category, location) VALUES
(
    'Exposición: Arte Contemporáneo Dominicano',
    'Una muestra de las obras más representativas del arte contemporáneo de República Dominicana, featuring artistas locales reconocidos internacionalmente.',
    CURRENT_TIMESTAMP + INTERVAL '2 days',
    150,
    'Exposición',
    'Sala Principal'
),
(
    'Concierto: Música Clásica Dominicana',
    'Un recorrido por la música clásica dominicana interpretada por la Orquesta Sinfónica Nacional, incluyendo obras de compositores destacados.',
    CURRENT_TIMESTAMP + INTERVAL '5 days',
    200,
    'Concierto',
    'Auditorio Principal'
),
(
    'Taller: Fotografía Cultural',
    'Aprende técnicas de fotografía especializada en capturar la esencia de eventos culturales y patrimoniales.',
    CURRENT_TIMESTAMP + INTERVAL '7 days',
    30,
    'Taller',
    'Aula 101'
),
(
    'Teatro: Obras Clásicas Dominicanas',
    'Representación de obras teatrales clásicas de autores dominicanos, interpretadas por el grupo de teatro residente.',
    CURRENT_TIMESTAMP + INTERVAL '10 days',
    120,
    'Teatro',
    'Teatro Pequeño'
)
ON CONFLICT DO NOTHING;

-- Insertar admin user de ejemplo (usando el sistema de auth de Supabase)
INSERT INTO admin_users (email, full_name, role) VALUES
('admin@banreservas.com', 'Administrador Principal', 'super_admin'),
('operador@banreservas.com', 'Operador del Sistema', 'operator')
ON CONFLICT (email) DO NOTHING;

-- ============================================================================
-- VISTAS ÚTILES PARA REPORTES
-- ============================================================================

-- Vista de eventos con estadísticas
CREATE OR REPLACE VIEW events_with_stats AS
SELECT 
    e.*,
    COALESCE(v.total_visitors, 0) as total_registered_visitors,
    COALESCE(v.current_visitors_count, 0) as active_visitors,
    ROUND((COALESCE(v.current_visitors_count, 0)::DECIMAL / e.capacity) * 100, 2) as occupancy_percentage,
    CASE 
        WHEN e.current_visitors >= e.capacity THEN 'Lleno'
        WHEN e.current_visitors >= e.capacity * 0.8 THEN 'Casi lleno'
        WHEN e.current_visitors >= e.capacity * 0.5 THEN 'Ocupado'
        ELSE 'Disponible'
    END as availability_status
FROM events e
LEFT JOIN (
    SELECT 
        event_id,
        COUNT(*) as total_visitors,
        COUNT(*) FILTER (WHERE exit_time IS NULL) as current_visitors_count
    FROM visitors 
    GROUP BY event_id
) v ON e.id = v.event_id;

-- Vista de estadísticas diarias
CREATE OR REPLACE VIEW daily_stats AS
SELECT 
    DATE(v.created_at) as date,
    COUNT(*) as total_visitors,
    COUNT(DISTINCT v.event_id) as events_with_visitors,
    EXTRACT(HOUR FROM v.created_at) as hour,
    COUNT(*) as visitors_per_hour
FROM visitors v
WHERE v.created_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY DATE(v.created_at), EXTRACT(HOUR FROM v.created_at)
ORDER BY date DESC, hour;

-- ============================================================================
-- POLÍTICAS DE SEGURIDAD RLS (ROW LEVEL SECURITY)
-- ============================================================================

-- Habilitar RLS en las tablas principales
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE visitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_reports ENABLE ROW LEVEL SECURITY;

-- Política para eventos (lectura pública, escritura solo autenticados)
CREATE POLICY "Los eventos son públicamente visibles"
    ON events FOR SELECT
    USING (true);

CREATE POLICY "Solo usuarios autenticados pueden modificar eventos"
    ON events FOR ALL
    USING (auth.role() = 'authenticated');

-- Política para visitantes (solo usuarios autenticados)
CREATE POLICY "Solo usuarios autenticados pueden ver visitantes"
    ON visitors FOR SELECT
    USING (auth.role() = 'authenticated');

CREATE POLICY "Solo usuarios autenticados pueden registrar visitantes"
    ON visitors FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Solo usuarios autenticados pueden actualizar visitantes"
    ON visitors FOR UPDATE
    USING (auth.role() = 'authenticated');

-- Política para admin_users (solo el propio usuario o super_admin)
CREATE POLICY "Los usuarios pueden ver su propio perfil"
    ON admin_users FOR SELECT
    USING (auth.email() = email OR 
           EXISTS (SELECT 1 FROM admin_users WHERE email = auth.email() AND role = 'super_admin'));

-- Política para reportes (solo usuarios autenticados)
CREATE POLICY "Solo usuarios autenticados pueden ver reportes"
    ON daily_reports FOR ALL
    USING (auth.role() = 'authenticated');

-- ============================================================================
-- COMENTARIOS PARA DOCUMENTACIÓN
-- ============================================================================

COMMENT ON TABLE events IS 'Tabla principal de eventos del Centro Cultural Banreservas';
COMMENT ON TABLE visitors IS 'Registro de visitantes por evento con entrada y salida';
COMMENT ON TABLE admin_users IS 'Usuarios administrativos del sistema';
COMMENT ON TABLE daily_reports IS 'Reportes diarios automáticos del sistema';
COMMENT ON TABLE event_categories IS 'Categorías de eventos para organización';

COMMENT ON COLUMN events.current_visitors IS 'Contador en tiempo real de visitantes activos';
COMMENT ON COLUMN visitors.exit_time IS 'NULL indica que el visitante aún está en el evento';
COMMENT ON COLUMN admin_users.role IS 'Roles: super_admin, admin, operator, viewer';

-- ============================================================================
-- FINALIZACIÓN
-- ============================================================================

-- Mensaje de confirmación
DO $$
BEGIN
    RAISE NOTICE 'Base de datos inicializada correctamente para Centro Cultural Banreservas';
    RAISE NOTICE 'Tablas creadas: events, visitors, admin_users, daily_reports, event_categories';
    RAISE NOTICE 'Triggers y funciones configurados para mantener consistencia';
    RAISE NOTICE 'Políticas RLS habilitadas para seguridad';
    RAISE NOTICE 'Datos de ejemplo insertados para desarrollo';
END $$; 