import { pgTable, uuid, text, timestamp, boolean, integer, jsonb, real, decimal, date } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// ============================================
// MULTI-TENANT: Todas las tablas tienen tenant_id
// Usar withTenantContext() para todas las queries
// ============================================

// ============================================
// BMA 2026: Tablas para gestión de paquetes y registro
// ============================================

// Paquetes del Congreso BMA
export const packages = pgTable('packages', {
  id: uuid('id').primaryKey().defaultRandom(),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),
  eventId: uuid('event_id').references(() => events.id, { onDelete: 'cascade' }),
  name: text('name').notNull(), // "TODO INCLUIDO", "SESIONES ACADÉMICAS", "ACOMPAÑANTES"
  slug: text('slug').notNull(), // "todo-incluido", "sesiones-academicas", "acompanantes"
  description: text('description'),
  features: jsonb('features').$type<string[]>(), // Array de características incluidas
  intranetUrl: text('intranet_url'), // URL de pago en intranet BMA
  sortOrder: integer('sort_order').default(0),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Precios por período y tipo de usuario
export const packagePricing = pgTable('package_pricing', {
  id: uuid('id').primaryKey().defaultRandom(),
  packageId: uuid('package_id').notNull().references(() => packages.id, { onDelete: 'cascade' }),
  userType: text('user_type').notNull(), // "barrista" | "no_barrista"
  periodName: text('period_name').notNull(), // "Precio Temprano", "Precio Normal"
  periodStart: date('period_start').notNull(),
  periodEnd: date('period_end').notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  includesIva: boolean('includes_iva').default(false), // Barristas: ya incluye IVA, No Barristas: +IVA
  currency: text('currency').default('MXN'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Organizadores (Tenants)
export const tenants = pgTable('tenants', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  logo: text('logo'),
  primaryColor: text('primary_color').default('#6366f1'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Usuarios (pueden pertenecer a múltiples tenants)
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  name: text('name'),
  image: text('image'),
  emailVerified: timestamp('email_verified'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Relación Usuario-Tenant (roles)
export const tenantUsers = pgTable('tenant_users', {
  id: uuid('id').primaryKey().defaultRandom(),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  role: text('role').notNull().default('member'), // admin, organizer, member
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Eventos
export const events = pgTable('events', {
  id: uuid('id').primaryKey().defaultRandom(),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  description: text('description'),
  slug: text('slug').notNull(),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date').notNull(),
  timezone: text('timezone').default('America/Mexico_City'),
  venue: text('venue'),
  address: text('address'),
  city: text('city'),
  country: text('country'),
  capacity: integer('capacity'),
  isPublic: boolean('is_public').default(true),
  coverImage: text('cover_image'),
  status: text('status').default('draft'), // draft, published, cancelled, completed
  settings: jsonb('settings'), // configuraciones adicionales
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Sesiones/Agenda
export const sessions = pgTable('sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),
  eventId: uuid('event_id').notNull().references(() => events.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  description: text('description'),
  startTime: timestamp('start_time').notNull(),
  endTime: timestamp('end_time').notNull(),
  room: text('room'),
  track: text('track'), // categoría/track de la sesión
  capacity: integer('capacity'),
  type: text('type').default('talk'), // talk, workshop, networking, break
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Speakers
export const speakers = pgTable('speakers', {
  id: uuid('id').primaryKey().defaultRandom(),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),
  eventId: uuid('event_id').notNull().references(() => events.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  bio: text('bio'),
  title: text('title'), // cargo/título profesional
  company: text('company'),
  photo: text('photo'),
  email: text('email'),
  linkedin: text('linkedin'),
  twitter: text('twitter'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Relación Speaker-Session
export const sessionSpeakers = pgTable('session_speakers', {
  id: uuid('id').primaryKey().defaultRandom(),
  sessionId: uuid('session_id').notNull().references(() => sessions.id, { onDelete: 'cascade' }),
  speakerId: uuid('speaker_id').notNull().references(() => speakers.id, { onDelete: 'cascade' }),
});

// Asistentes (Registros)
export const attendees = pgTable('attendees', {
  id: uuid('id').primaryKey().defaultRandom(),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),
  eventId: uuid('event_id').notNull().references(() => events.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').references(() => users.id),
  email: text('email').notNull(),
  name: text('name').notNull(),
  company: text('company'),
  title: text('title'),
  phone: text('phone'),
  ticketType: text('ticket_type').default('general'), // general, vip, speaker, sponsor
  status: text('status').default('registered'), // registered, checked_in, cancelled
  checkedInAt: timestamp('checked_in_at'),
  qrCode: text('qr_code'),

  // ========== CAMPOS BMA 2026 ==========
  packageId: uuid('package_id').references(() => packages.id), // Paquete seleccionado
  isBarrista: boolean('is_barrista').default(false), // ¿Es miembro de la BMA?
  barristaNumber: text('barrista_number'), // Número de cédula/registro de barrista
  paymentStatus: text('payment_status').default('pending'), // pending, paid, refunded
  paymentDate: timestamp('payment_date'), // Fecha de confirmación de pago
  paymentReference: text('payment_reference'), // Referencia de pago de intranet BMA
  priceAtRegistration: decimal('price_at_registration', { precision: 10, scale: 2 }), // Precio al momento de registro
  // =====================================

  // Campos para networking
  bio: text('bio'),
  interests: text('interests').array(),
  linkedin: text('linkedin'),
  lookingFor: text('looking_for'), // qué busca en el evento
  offering: text('offering'), // qué ofrece
  // Vector embedding para matchmaking (pgvector)
  profileEmbedding: real('profile_embedding').array(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Agenda personal de asistentes
export const attendeeSessions = pgTable('attendee_sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  attendeeId: uuid('attendee_id').notNull().references(() => attendees.id, { onDelete: 'cascade' }),
  sessionId: uuid('session_id').notNull().references(() => sessions.id, { onDelete: 'cascade' }),
  status: text('status').default('interested'), // interested, confirmed, attended
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Networking Matches
export const networkingMatches = pgTable('networking_matches', {
  id: uuid('id').primaryKey().defaultRandom(),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),
  eventId: uuid('event_id').notNull().references(() => events.id, { onDelete: 'cascade' }),
  attendee1Id: uuid('attendee_1_id').notNull().references(() => attendees.id, { onDelete: 'cascade' }),
  attendee2Id: uuid('attendee_2_id').notNull().references(() => attendees.id, { onDelete: 'cascade' }),
  matchScore: real('match_score'), // 0-1, qué tan bueno es el match
  status: text('status').default('pending'), // pending, accepted, rejected, met
  attendee1Status: text('attendee_1_status').default('pending'), // pending, liked, passed
  attendee2Status: text('attendee_2_status').default('pending'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Beacons para navegación indoor
export const beacons = pgTable('beacons', {
  id: uuid('id').primaryKey().defaultRandom(),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),
  eventId: uuid('event_id').notNull().references(() => events.id, { onDelete: 'cascade' }),
  uuid: text('uuid').notNull(), // UUID del beacon
  major: integer('major').notNull(),
  minor: integer('minor').notNull(),
  name: text('name').notNull(),
  location: text('location'), // descripción de ubicación
  x: real('x'), // coordenada X en el mapa
  y: real('y'), // coordenada Y en el mapa
  floor: integer('floor').default(0),
  roomId: text('room_id'), // asociado a una sala
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Ubicaciones de asistentes (para mapas de calor)
export const attendeeLocations = pgTable('attendee_locations', {
  id: uuid('id').primaryKey().defaultRandom(),
  attendeeId: uuid('attendee_id').notNull().references(() => attendees.id, { onDelete: 'cascade' }),
  beaconId: uuid('beacon_id').references(() => beacons.id),
  x: real('x'),
  y: real('y'),
  floor: integer('floor'),
  accuracy: real('accuracy'),
  timestamp: timestamp('timestamp').defaultNow().notNull(),
});

// Gamificación: Puntos y logros
export const attendeePoints = pgTable('attendee_points', {
  id: uuid('id').primaryKey().defaultRandom(),
  attendeeId: uuid('attendee_id').notNull().references(() => attendees.id, { onDelete: 'cascade' }),
  eventId: uuid('event_id').notNull().references(() => events.id, { onDelete: 'cascade' }),
  points: integer('points').default(0),
  action: text('action').notNull(), // check_in, session_attend, networking, survey
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ============================================
// RELATIONS
// ============================================

export const tenantsRelations = relations(tenants, ({ many }) => ({
  events: many(events),
  users: many(tenantUsers),
}));

export const eventsRelations = relations(events, ({ one, many }) => ({
  tenant: one(tenants, { fields: [events.tenantId], references: [tenants.id] }),
  sessions: many(sessions),
  speakers: many(speakers),
  attendees: many(attendees),
}));

export const sessionsRelations = relations(sessions, ({ one, many }) => ({
  event: one(events, { fields: [sessions.eventId], references: [events.id] }),
  speakers: many(sessionSpeakers),
}));

export const attendeesRelations = relations(attendees, ({ one, many }) => ({
  event: one(events, { fields: [attendees.eventId], references: [events.id] }),
  user: one(users, { fields: [attendees.userId], references: [users.id] }),
  package: one(packages, { fields: [attendees.packageId], references: [packages.id] }),
  sessions: many(attendeeSessions),
  points: many(attendeePoints),
}));

// Relaciones de packages
export const packagesRelations = relations(packages, ({ one, many }) => ({
  tenant: one(tenants, { fields: [packages.tenantId], references: [tenants.id] }),
  event: one(events, { fields: [packages.eventId], references: [events.id] }),
  pricing: many(packagePricing),
  attendees: many(attendees),
}));

export const packagePricingRelations = relations(packagePricing, ({ one }) => ({
  package: one(packages, { fields: [packagePricing.packageId], references: [packages.id] }),
}));

// ============================================
// TYPES EXPORT
// ============================================

export type Tenant = typeof tenants.$inferSelect;
export type NewTenant = typeof tenants.$inferInsert;

export type Event = typeof events.$inferSelect;
export type NewEvent = typeof events.$inferInsert;

export type Session = typeof sessions.$inferSelect;
export type NewSession = typeof sessions.$inferInsert;

export type Speaker = typeof speakers.$inferSelect;
export type NewSpeaker = typeof speakers.$inferInsert;

export type Attendee = typeof attendees.$inferSelect;
export type NewAttendee = typeof attendees.$inferInsert;

export type NetworkingMatch = typeof networkingMatches.$inferSelect;
export type NewNetworkingMatch = typeof networkingMatches.$inferInsert;

export type Beacon = typeof beacons.$inferSelect;
export type NewBeacon = typeof beacons.$inferInsert;

// BMA 2026 Types
export type Package = typeof packages.$inferSelect;
export type NewPackage = typeof packages.$inferInsert;

export type PackagePricing = typeof packagePricing.$inferSelect;
export type NewPackagePricing = typeof packagePricing.$inferInsert;
