import { neon } from '@neondatabase/serverless';
import { drizzle, NeonHttpDatabase } from 'drizzle-orm/neon-http';
import { sql } from 'drizzle-orm';
import * as schema from './schema';

// Tipo del database
type Database = NeonHttpDatabase<typeof schema>;

// Singleton pattern con lazy initialization
let _db: Database | null = null;

export function getDb(): Database {
  if (_db) return _db;

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL is not set. Please configure your environment variables.');
  }

  const client = neon(connectionString);
  _db = drizzle(client, { schema });
  return _db;
}

// Export db usando proxy para lazy initialization
export const db: Database = new Proxy({} as Database, {
  get(_, prop: string | symbol) {
    const database = getDb();
    const value = (database as any)[prop];
    if (typeof value === 'function') {
      return value.bind(database);
    }
    return value;
  },
});

// ============================================
// MULTI-TENANT SECURITY WRAPPER
// ============================================

/**
 * Wrapper obligatorio para todas las operaciones de base de datos.
 * Inyecta el contexto del tenant para Row-Level Security (RLS).
 *
 * USO:
 * const events = await withTenantContext(tenantId, async () => {
 *   return await db.select().from(schema.events);
 * });
 *
 * NUNCA hagas queries directas sin este wrapper.
 */
export async function withTenantContext<T>(
  tenantId: string,
  operation: () => Promise<T>
): Promise<T> {
  const database = getDb();
  // Establecer el tenant_id en la configuración de la sesión
  await database.execute(sql`SELECT set_config('app.current_tenant_id', ${tenantId}, true)`);

  // Ejecutar la operación
  return await operation();
}

/**
 * Verificar que el usuario tiene acceso al tenant.
 * Usar en API routes y Server Actions.
 */
export async function verifyTenantAccess(
  userId: string,
  tenantId: string
): Promise<boolean> {
  const database = getDb();
  const result = await database
    .select()
    .from(schema.tenantUsers)
    .where(sql`user_id = ${userId} AND tenant_id = ${tenantId}`)
    .limit(1);

  return result.length > 0;
}

/**
 * Obtener todos los tenants de un usuario.
 */
export async function getUserTenants(userId: string) {
  const database = getDb();
  const result = await database
    .select({
      tenant: schema.tenants,
      role: schema.tenantUsers.role,
    })
    .from(schema.tenantUsers)
    .innerJoin(schema.tenants, sql`${schema.tenants.id} = ${schema.tenantUsers.tenantId}`)
    .where(sql`${schema.tenantUsers.userId} = ${userId}`);

  return result;
}

// Re-exportar schema para conveniencia
export * from './schema';
