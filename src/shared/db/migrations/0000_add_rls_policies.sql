-- ============================================
-- ROW-LEVEL SECURITY (RLS) POLICIES
-- Seguridad Multi-Tenant para App de Eventos
-- ============================================

-- Habilitar RLS en todas las tablas con tenant_id
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE speakers ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendees ENABLE ROW LEVEL SECURITY;
ALTER TABLE networking_matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE beacons ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendee_points ENABLE ROW LEVEL SECURITY;

-- Función para obtener el tenant_id actual
CREATE OR REPLACE FUNCTION app.current_tenant_id()
RETURNS uuid AS $$
  SELECT NULLIF(current_setting('app.current_tenant_id', true), '')::uuid;
$$ LANGUAGE SQL STABLE;

-- ============================================
-- POLÍTICAS RLS POR TABLA
-- ============================================

-- Events: Solo ver eventos del tenant actual
CREATE POLICY tenant_isolation_events ON events
  FOR ALL
  USING (tenant_id = app.current_tenant_id());

-- Sessions: Solo ver sesiones del tenant actual
CREATE POLICY tenant_isolation_sessions ON sessions
  FOR ALL
  USING (tenant_id = app.current_tenant_id());

-- Speakers: Solo ver speakers del tenant actual
CREATE POLICY tenant_isolation_speakers ON speakers
  FOR ALL
  USING (tenant_id = app.current_tenant_id());

-- Attendees: Solo ver asistentes del tenant actual
CREATE POLICY tenant_isolation_attendees ON attendees
  FOR ALL
  USING (tenant_id = app.current_tenant_id());

-- Networking Matches: Solo ver matches del tenant actual
CREATE POLICY tenant_isolation_networking ON networking_matches
  FOR ALL
  USING (tenant_id = app.current_tenant_id());

-- Beacons: Solo ver beacons del tenant actual
CREATE POLICY tenant_isolation_beacons ON beacons
  FOR ALL
  USING (tenant_id = app.current_tenant_id());

-- Attendee Points: Solo ver puntos del tenant actual (via event)
CREATE POLICY tenant_isolation_points ON attendee_points
  FOR ALL
  USING (
    event_id IN (
      SELECT id FROM events WHERE tenant_id = app.current_tenant_id()
    )
  );

-- ============================================
-- ÍNDICES PARA PERFORMANCE
-- ============================================

-- Índices en tenant_id para queries rápidas
CREATE INDEX IF NOT EXISTS idx_events_tenant ON events(tenant_id);
CREATE INDEX IF NOT EXISTS idx_sessions_tenant ON sessions(tenant_id);
CREATE INDEX IF NOT EXISTS idx_attendees_tenant ON attendees(tenant_id);
CREATE INDEX IF NOT EXISTS idx_attendees_event ON attendees(event_id);
CREATE INDEX IF NOT EXISTS idx_attendees_email ON attendees(email);
CREATE INDEX IF NOT EXISTS idx_networking_tenant ON networking_matches(tenant_id);
CREATE INDEX IF NOT EXISTS idx_beacons_tenant ON beacons(tenant_id);

-- Índice para búsqueda de sesiones por evento y fecha
CREATE INDEX IF NOT EXISTS idx_sessions_event_time ON sessions(event_id, start_time);

-- Índice para gamificación
CREATE INDEX IF NOT EXISTS idx_points_attendee ON attendee_points(attendee_id);
CREATE INDEX IF NOT EXISTS idx_points_event ON attendee_points(event_id);
