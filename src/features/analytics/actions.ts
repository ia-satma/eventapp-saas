"use server";

import { db, withTenantContext, events, attendees, sessions, networkingMatches, attendeeSessions, attendeePoints } from "@/shared/db";
import { sql } from "drizzle-orm";

// Obtener métricas generales del evento
export async function getEventMetrics(eventId: string, tenantId: string) {
  try {
    const metrics = await withTenantContext(tenantId, async () => {
      // Total de registros
      const registrations = await db
        .select({ count: sql<number>`count(*)` })
        .from(attendees)
        .where(sql`event_id = ${eventId} AND status != 'cancelled'`);

      // Check-ins
      const checkins = await db
        .select({ count: sql<number>`count(*)` })
        .from(attendees)
        .where(sql`event_id = ${eventId} AND status = 'checked_in'`);

      // Matches de networking
      const matches = await db
        .select({ count: sql<number>`count(*)` })
        .from(networkingMatches)
        .where(sql`event_id = ${eventId} AND status = 'accepted'`);

      // Total de sesiones
      const sessionCount = await db
        .select({ count: sql<number>`count(*)` })
        .from(sessions)
        .where(sql`event_id = ${eventId}`);

      // Promedio de sesiones por asistente
      const sessionsPerAttendee = await db
        .select({
          avg: sql<number>`COALESCE(AVG(session_count), 0)`,
        })
        .from(
          db
            .select({
              attendeeId: attendeeSessions.attendeeId,
              sessionCount: sql<number>`count(*)`.as("session_count"),
            })
            .from(attendeeSessions)
            .innerJoin(sessions, sql`${sessions.id} = ${attendeeSessions.sessionId}`)
            .where(sql`${sessions.eventId} = ${eventId}`)
            .groupBy(attendeeSessions.attendeeId)
            .as("subq")
        );

      // Puntos totales otorgados
      const totalPoints = await db
        .select({ sum: sql<number>`COALESCE(SUM(points), 0)` })
        .from(attendeePoints)
        .where(sql`event_id = ${eventId}`);

      return {
        totalRegistrations: registrations[0]?.count || 0,
        totalCheckins: checkins[0]?.count || 0,
        checkinRate: registrations[0]?.count
          ? Math.round((checkins[0]?.count / registrations[0]?.count) * 100)
          : 0,
        totalMatches: matches[0]?.count || 0,
        totalSessions: sessionCount[0]?.count || 0,
        avgSessionsPerAttendee: Math.round(sessionsPerAttendee[0]?.avg || 0),
        totalPointsAwarded: totalPoints[0]?.sum || 0,
      };
    });

    return { success: true, data: metrics };
  } catch (error) {
    console.error("Error fetching event metrics:", error);
    return { success: false, error: "Error al obtener métricas" };
  }
}

// Obtener registros por día
export async function getRegistrationsByDay(eventId: string, tenantId: string) {
  try {
    const data = await withTenantContext(tenantId, async () => {
      const result = await db
        .select({
          date: sql<string>`DATE(created_at)`.as("date"),
          count: sql<number>`count(*)`,
        })
        .from(attendees)
        .where(sql`event_id = ${eventId}`)
        .groupBy(sql`DATE(created_at)`)
        .orderBy(sql`DATE(created_at)`);

      return result;
    });

    return { success: true, data };
  } catch (error) {
    console.error("Error fetching registrations by day:", error);
    return { success: false, error: "Error al obtener datos" };
  }
}

// Obtener asistencia por sesión
export async function getSessionAttendance(eventId: string, tenantId: string) {
  try {
    const data = await withTenantContext(tenantId, async () => {
      const result = await db
        .select({
          sessionId: sessions.id,
          title: sessions.title,
          room: sessions.room,
          capacity: sessions.capacity,
          registeredCount: sql<number>`count(${attendeeSessions.id})`,
        })
        .from(sessions)
        .leftJoin(attendeeSessions, sql`${attendeeSessions.sessionId} = ${sessions.id}`)
        .where(sql`${sessions.eventId} = ${eventId}`)
        .groupBy(sessions.id, sessions.title, sessions.room, sessions.capacity)
        .orderBy(sessions.startTime);

      return result.map((session) => ({
        ...session,
        occupancyRate: session.capacity
          ? Math.round((session.registeredCount / session.capacity) * 100)
          : null,
      }));
    });

    return { success: true, data };
  } catch (error) {
    console.error("Error fetching session attendance:", error);
    return { success: false, error: "Error al obtener asistencia" };
  }
}

// Obtener distribución por tipo de ticket
export async function getTicketDistribution(eventId: string, tenantId: string) {
  try {
    const data = await withTenantContext(tenantId, async () => {
      const result = await db
        .select({
          ticketType: attendees.ticketType,
          count: sql<number>`count(*)`,
        })
        .from(attendees)
        .where(sql`event_id = ${eventId} AND status != 'cancelled'`)
        .groupBy(attendees.ticketType);

      return result;
    });

    return { success: true, data };
  } catch (error) {
    console.error("Error fetching ticket distribution:", error);
    return { success: false, error: "Error al obtener distribución" };
  }
}

// Obtener check-ins por hora (para el día del evento)
export async function getCheckinsByHour(eventId: string, tenantId: string) {
  try {
    const data = await withTenantContext(tenantId, async () => {
      const result = await db
        .select({
          hour: sql<number>`EXTRACT(HOUR FROM checked_in_at)`.as("hour"),
          count: sql<number>`count(*)`,
        })
        .from(attendees)
        .where(sql`event_id = ${eventId} AND checked_in_at IS NOT NULL`)
        .groupBy(sql`EXTRACT(HOUR FROM checked_in_at)`)
        .orderBy(sql`EXTRACT(HOUR FROM checked_in_at)`);

      return result;
    });

    return { success: true, data };
  } catch (error) {
    console.error("Error fetching checkins by hour:", error);
    return { success: false, error: "Error al obtener datos" };
  }
}

// Obtener top asistentes por puntos (leaderboard)
export async function getLeaderboard(eventId: string, tenantId: string, limit: number = 10) {
  try {
    const data = await withTenantContext(tenantId, async () => {
      const result = await db
        .select({
          attendeeId: attendeePoints.attendeeId,
          totalPoints: sql<number>`SUM(points)`.as("total_points"),
          attendeeName: attendees.name,
          attendeeCompany: attendees.company,
        })
        .from(attendeePoints)
        .innerJoin(attendees, sql`${attendees.id} = ${attendeePoints.attendeeId}`)
        .where(sql`${attendeePoints.eventId} = ${eventId}`)
        .groupBy(attendeePoints.attendeeId, attendees.name, attendees.company)
        .orderBy(sql`SUM(points) DESC`)
        .limit(limit);

      return result;
    });

    return { success: true, data };
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return { success: false, error: "Error al obtener leaderboard" };
  }
}

// Obtener actividad reciente
export async function getRecentActivity(eventId: string, tenantId: string, limit: number = 20) {
  try {
    const activities = await withTenantContext(tenantId, async () => {
      // Obtener registros recientes
      const recentRegistrations = await db
        .select({
          type: sql<string>`'registration'`,
          name: attendees.name,
          timestamp: attendees.createdAt,
          detail: attendees.ticketType,
        })
        .from(attendees)
        .where(sql`event_id = ${eventId}`)
        .orderBy(sql`created_at DESC`)
        .limit(limit);

      // Obtener check-ins recientes
      const recentCheckins = await db
        .select({
          type: sql<string>`'checkin'`,
          name: attendees.name,
          timestamp: attendees.checkedInAt,
          detail: sql<string>`''`,
        })
        .from(attendees)
        .where(sql`event_id = ${eventId} AND checked_in_at IS NOT NULL`)
        .orderBy(sql`checked_in_at DESC`)
        .limit(limit);

      // Combinar y ordenar
      const combined = [...recentRegistrations, ...recentCheckins]
        .filter((a) => a.timestamp)
        .sort((a, b) => new Date(b.timestamp!).getTime() - new Date(a.timestamp!).getTime())
        .slice(0, limit);

      return combined;
    });

    return { success: true, data: activities };
  } catch (error) {
    console.error("Error fetching recent activity:", error);
    return { success: false, error: "Error al obtener actividad" };
  }
}

// Exportar lista de asistentes (para CSV)
export async function exportAttendeeList(eventId: string, tenantId: string) {
  try {
    const data = await withTenantContext(tenantId, async () => {
      return await db
        .select({
          name: attendees.name,
          email: attendees.email,
          company: attendees.company,
          title: attendees.title,
          ticketType: attendees.ticketType,
          status: attendees.status,
          checkedInAt: attendees.checkedInAt,
          createdAt: attendees.createdAt,
        })
        .from(attendees)
        .where(sql`event_id = ${eventId}`)
        .orderBy(attendees.name);
    });

    return { success: true, data };
  } catch (error) {
    console.error("Error exporting attendees:", error);
    return { success: false, error: "Error al exportar" };
  }
}
