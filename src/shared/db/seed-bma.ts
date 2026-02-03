/**
 * Seed data para BMA 2026
 * Ejecutar con: npx tsx src/shared/db/seed-bma.ts
 */

import { db } from './index';
import { packages, packagePricing, tenants, events } from './schema';
import { eq } from 'drizzle-orm';

const BMA_PACKAGES = [
  {
    name: 'TODO INCLUIDO',
    slug: 'todo-incluido',
    description: 'Acceso completo al congreso con todas las actividades y beneficios',
    features: [
      'Acceso a todas las sesiones académicas',
      'Cena de Gala',
      'Comidas incluidas (3 días)',
      'Material del congreso',
      'Certificado de participación',
      'Acceso a área de networking VIP',
      'Transporte hotel-sede-hotel',
    ],
    intranetUrl: 'https://intranet.bma.org.mx/pagos/congreso2026/todo-incluido',
    sortOrder: 1,
  },
  {
    name: 'SESIONES ACADÉMICAS',
    slug: 'sesiones-academicas',
    description: 'Acceso a todas las conferencias y talleres del congreso',
    features: [
      'Acceso a todas las sesiones académicas',
      'Material del congreso',
      'Certificado de participación',
      'Coffee breaks incluidos',
    ],
    intranetUrl: 'https://intranet.bma.org.mx/pagos/congreso2026/sesiones-academicas',
    sortOrder: 2,
  },
  {
    name: 'ACOMPAÑANTES',
    slug: 'acompanantes',
    description: 'Paquete para acompañantes de los asistentes registrados',
    features: [
      'Cena de Gala',
      'Comidas incluidas (3 días)',
      'Actividades recreativas',
      'Transporte hotel-sede-hotel',
    ],
    intranetUrl: 'https://intranet.bma.org.mx/pagos/congreso2026/acompanantes',
    sortOrder: 3,
  },
];

// Precios según SPEC.md
// Período 1: Oct-Dic 2025 (Precio Temprano)
// Período 2: Ene-Feb 2026 (Precio Normal)
const PRICING_DATA = {
  'todo-incluido': {
    barrista: { temprano: 14000, normal: 16000 },
    no_barrista: { temprano: 16000, normal: 18000 }, // +IVA
  },
  'sesiones-academicas': {
    barrista: { temprano: 12000, normal: 13000 },
    no_barrista: { temprano: 13500, normal: 15500 }, // +IVA
  },
  'acompanantes': {
    barrista: { temprano: 7300, normal: 8500 },
    no_barrista: { temprano: 9000, normal: 10000 }, // +IVA
  },
};

async function seedBMA() {
  console.log('🚀 Iniciando seed de datos BMA 2026...\n');

  try {
    // 1. Crear o encontrar el tenant BMA
    let bmaTenant = await db.query.tenants.findFirst({
      where: eq(tenants.slug, 'bma'),
    });

    if (!bmaTenant) {
      console.log('📝 Creando tenant BMA...');
      const [newTenant] = await db.insert(tenants).values({
        name: 'Barra Mexicana, Colegio de Abogados A.C.',
        slug: 'bma',
        logo: '/bma-logo.png',
        primaryColor: '#8A1539',
      }).returning();
      bmaTenant = newTenant;
      console.log('✅ Tenant BMA creado\n');
    } else {
      console.log('✅ Tenant BMA ya existe\n');
    }

    // 2. Crear o encontrar el evento BMA 2026
    let bmaEvent = await db.query.events.findFirst({
      where: eq(events.slug, 'congreso-nacional-2026'),
    });

    if (!bmaEvent) {
      console.log('📝 Creando evento Congreso BMA 2026...');
      const [newEvent] = await db.insert(events).values({
        tenantId: bmaTenant.id,
        name: 'XX Congreso Nacional de la Abogacía',
        slug: 'congreso-nacional-2026',
        description: 'El XX Congreso Nacional de la Abogacía reúne a los profesionales del derecho más destacados de México.',
        startDate: new Date('2026-02-19T09:00:00'),
        endDate: new Date('2026-02-21T18:00:00'),
        timezone: 'America/Monterrey',
        venue: 'Cintermex',
        address: 'Av. Fundidora 501, Obrera',
        city: 'Monterrey',
        country: 'México',
        capacity: 2000,
        isPublic: true,
        status: 'published',
      }).returning();
      bmaEvent = newEvent;
      console.log('✅ Evento BMA 2026 creado\n');
    } else {
      console.log('✅ Evento BMA 2026 ya existe\n');
    }

    // 3. Crear paquetes
    console.log('📝 Creando paquetes...');

    for (const pkg of BMA_PACKAGES) {
      // Verificar si ya existe
      const existingPackage = await db.query.packages.findFirst({
        where: eq(packages.slug, pkg.slug),
      });

      if (existingPackage) {
        console.log(`  ⏭️  Paquete "${pkg.name}" ya existe`);
        continue;
      }

      const [newPackage] = await db.insert(packages).values({
        tenantId: bmaTenant.id,
        eventId: bmaEvent.id,
        name: pkg.name,
        slug: pkg.slug,
        description: pkg.description,
        features: pkg.features,
        intranetUrl: pkg.intranetUrl,
        sortOrder: pkg.sortOrder,
        isActive: true,
      }).returning();

      console.log(`  ✅ Paquete "${pkg.name}" creado`);

      // 4. Crear precios para cada paquete
      const pricing = PRICING_DATA[pkg.slug as keyof typeof PRICING_DATA];

      // Precio Temprano - Barrista
      await db.insert(packagePricing).values({
        packageId: newPackage.id,
        userType: 'barrista',
        periodName: 'Precio Temprano',
        periodStart: '2025-10-01',
        periodEnd: '2025-12-31',
        price: pricing.barrista.temprano.toString(),
        includesIva: true,
        currency: 'MXN',
      });

      // Precio Normal - Barrista
      await db.insert(packagePricing).values({
        packageId: newPackage.id,
        userType: 'barrista',
        periodName: 'Precio Normal',
        periodStart: '2026-01-01',
        periodEnd: '2026-02-18',
        price: pricing.barrista.normal.toString(),
        includesIva: true,
        currency: 'MXN',
      });

      // Precio Temprano - No Barrista
      await db.insert(packagePricing).values({
        packageId: newPackage.id,
        userType: 'no_barrista',
        periodName: 'Precio Temprano',
        periodStart: '2025-10-01',
        periodEnd: '2025-12-31',
        price: pricing.no_barrista.temprano.toString(),
        includesIva: false, // +IVA
        currency: 'MXN',
      });

      // Precio Normal - No Barrista
      await db.insert(packagePricing).values({
        packageId: newPackage.id,
        userType: 'no_barrista',
        periodName: 'Precio Normal',
        periodStart: '2026-01-01',
        periodEnd: '2026-02-18',
        price: pricing.no_barrista.normal.toString(),
        includesIva: false, // +IVA
        currency: 'MXN',
      });

      console.log(`     💰 Precios configurados para "${pkg.name}"`);
    }

    console.log('\n✅ Seed BMA 2026 completado exitosamente!');
    console.log('\n📊 Resumen:');
    console.log(`   - Tenant: ${bmaTenant.name}`);
    console.log(`   - Evento: ${bmaEvent.name}`);
    console.log(`   - Paquetes: ${BMA_PACKAGES.length}`);
    console.log(`   - Precios por paquete: 4 (2 períodos x 2 tipos de usuario)`);

  } catch (error) {
    console.error('❌ Error en seed:', error);
    throw error;
  }
}

// Ejecutar si es el archivo principal
seedBMA()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
