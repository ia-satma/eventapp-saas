"use server";

import { db, withTenantContext, beacons, attendeeLocations, sessions } from "@/shared/db";
import { sql } from "drizzle-orm";

// Obtener mapa de beacons de un evento
export async function getEventBeacons(eventId: string, tenantId: string) {
  try {
    const beaconList = await withTenantContext(tenantId, async () => {
      return await db
        .select()
        .from(beacons)
        .where(sql`event_id = ${eventId}`)
        .orderBy(beacons.floor, beacons.name);
    });

    return { success: true, data: beaconList };
  } catch (error) {
    console.error("Error fetching beacons:", error);
    return { success: false, error: "Error al obtener beacons" };
  }
}

// Registrar ubicación del asistente (desde la app móvil)
export async function updateAttendeeLocation(
  attendeeId: string,
  tenantId: string,
  location: {
    beaconId?: string;
    x: number;
    y: number;
    floor: number;
    accuracy: number;
  }
) {
  try {
    await withTenantContext(tenantId, async () => {
      await db.insert(attendeeLocations).values({
        attendeeId,
        beaconId: location.beaconId,
        x: location.x,
        y: location.y,
        floor: location.floor,
        accuracy: location.accuracy,
      });
    });

    return { success: true };
  } catch (error) {
    console.error("Error updating location:", error);
    return { success: false, error: "Error al actualizar ubicación" };
  }
}

// Obtener mapa de calor de asistentes en tiempo real
export async function getHeatmapData(eventId: string, tenantId: string) {
  try {
    const heatmap = await withTenantContext(tenantId, async () => {
      // Obtener ubicaciones recientes (últimos 5 minutos)
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

      const locations = await db
        .select({
          x: attendeeLocations.x,
          y: attendeeLocations.y,
          floor: attendeeLocations.floor,
        })
        .from(attendeeLocations)
        .innerJoin(beacons, sql`${beacons.id} = ${attendeeLocations.beaconId}`)
        .where(sql`
          ${beacons.eventId} = ${eventId}
          AND ${attendeeLocations.timestamp} > ${fiveMinutesAgo}
        `);

      // Agrupar por zonas para el mapa de calor
      const zones: Record<string, { x: number; y: number; count: number }> = {};

      locations.forEach((loc) => {
        if (loc.x === null || loc.y === null) return;
        // Redondear a zonas de 10x10
        const zoneX = Math.floor(loc.x / 10) * 10;
        const zoneY = Math.floor(loc.y / 10) * 10;
        const key = `${zoneX}-${zoneY}-${loc.floor}`;

        if (!zones[key]) {
          zones[key] = { x: zoneX, y: zoneY, count: 0 };
        }
        zones[key].count++;
      });

      return Object.values(zones);
    });

    return { success: true, data: heatmap };
  } catch (error) {
    console.error("Error getting heatmap:", error);
    return { success: false, error: "Error al obtener mapa de calor" };
  }
}

// Encontrar la ruta más corta entre dos puntos
export async function findRoute(
  eventId: string,
  tenantId: string,
  from: { x: number; y: number; floor: number },
  to: { x: number; y: number; floor: number }
) {
  try {
    const route = await withTenantContext(tenantId, async () => {
      // Obtener todos los beacons como puntos de referencia
      const beaconList = await db
        .select()
        .from(beacons)
        .where(sql`event_id = ${eventId}`);

      // Algoritmo simplificado: camino directo
      // En producción, se usaría A* con obstáculos del mapa
      const path: { x: number; y: number; floor: number; instruction?: string }[] = [];

      // Si están en diferentes pisos, agregar cambio de piso
      if (from.floor !== to.floor) {
        // Encontrar escaleras/ascensores más cercanos
        const stairs = beaconList.find(
          (b) => b.name.toLowerCase().includes("escalera") || b.name.toLowerCase().includes("ascensor")
        );

        if (stairs && stairs.x !== null && stairs.y !== null && stairs.floor !== null) {
          path.push({
            x: from.x,
            y: from.y,
            floor: from.floor,
            instruction: `Camina hacia ${stairs.name}`,
          });
          path.push({
            x: stairs.x,
            y: stairs.y,
            floor: from.floor,
            instruction: `Sube/Baja al piso ${to.floor}`,
          });
          path.push({
            x: stairs.x,
            y: stairs.y,
            floor: to.floor,
            instruction: "Continúa caminando",
          });
        }
      }

      path.push({
        x: to.x,
        y: to.y,
        floor: to.floor,
        instruction: "Has llegado a tu destino",
      });

      // Calcular distancia total estimada
      let totalDistance = 0;
      for (let i = 1; i < path.length; i++) {
        const dx = path[i].x - path[i - 1].x;
        const dy = path[i].y - path[i - 1].y;
        totalDistance += Math.sqrt(dx * dx + dy * dy);
      }

      // Estimar tiempo (asumiendo 1.2 m/s de velocidad promedio)
      const estimatedTimeSeconds = totalDistance / 1.2;

      return {
        path,
        totalDistance,
        estimatedTimeSeconds,
      };
    });

    return { success: true, data: route };
  } catch (error) {
    console.error("Error finding route:", error);
    return { success: false, error: "Error al calcular ruta" };
  }
}

// Obtener la sesión actual de una sala (basado en ubicación)
export async function getCurrentSessionByRoom(
  eventId: string,
  roomId: string,
  tenantId: string
) {
  try {
    const session = await withTenantContext(tenantId, async () => {
      const now = new Date();

      const result = await db
        .select()
        .from(sessions)
        .where(sql`
          event_id = ${eventId}
          AND room = ${roomId}
          AND start_time <= ${now}
          AND end_time > ${now}
        `)
        .limit(1);

      return result[0] || null;
    });

    return { success: true, data: session };
  } catch (error) {
    console.error("Error fetching current session:", error);
    return { success: false, error: "Error al obtener sesión actual" };
  }
}

// Obtener puntos de interés cercanos
export async function getNearbyPOIs(
  eventId: string,
  tenantId: string,
  currentLocation: { x: number; y: number; floor: number },
  radius: number = 50
) {
  try {
    const pois = await withTenantContext(tenantId, async () => {
      const beaconList = await db
        .select()
        .from(beacons)
        .where(sql`event_id = ${eventId} AND floor = ${currentLocation.floor}`);

      // Filtrar por radio
      const nearby = beaconList.filter((beacon) => {
        if (beacon.x === null || beacon.y === null) return false;
        const dx = beacon.x - currentLocation.x;
        const dy = beacon.y - currentLocation.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance <= radius;
      });

      return nearby;
    });

    return { success: true, data: pois };
  } catch (error) {
    console.error("Error fetching nearby POIs:", error);
    return { success: false, error: "Error al obtener puntos cercanos" };
  }
}

// Crear o actualizar beacon (para organizadores)
export async function upsertBeacon(
  eventId: string,
  tenantId: string,
  data: {
    id?: string;
    uuid: string;
    major: number;
    minor: number;
    name: string;
    location?: string;
    x?: number;
    y?: number;
    floor?: number;
    roomId?: string;
  }
) {
  try {
    const beacon = await withTenantContext(tenantId, async () => {
      if (data.id) {
        // Actualizar existente
        const result = await db
          .update(beacons)
          .set({
            uuid: data.uuid,
            major: data.major,
            minor: data.minor,
            name: data.name,
            location: data.location,
            x: data.x,
            y: data.y,
            floor: data.floor,
            roomId: data.roomId,
          })
          .where(sql`id = ${data.id}`)
          .returning();

        return result[0];
      } else {
        // Crear nuevo
        const result = await db
          .insert(beacons)
          .values({
            tenantId,
            eventId,
            uuid: data.uuid,
            major: data.major,
            minor: data.minor,
            name: data.name,
            location: data.location,
            x: data.x,
            y: data.y,
            floor: data.floor,
            roomId: data.roomId,
          })
          .returning();

        return result[0];
      }
    });

    return { success: true, data: beacon };
  } catch (error) {
    console.error("Error upserting beacon:", error);
    return { success: false, error: "Error al guardar beacon" };
  }
}
