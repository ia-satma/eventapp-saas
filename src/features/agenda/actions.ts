"use server";

import { db, withTenantContext, sessions, attendeeSessions, speakers, sessionSpeakers } from "@/shared/db";
import { sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// Obtener agenda completa de un evento
export async function getEventAgenda(eventId: string, tenantId: string) {
  try {
    const agenda = await withTenantContext(tenantId, async () => {
      const sessionsData = await db
        .select()
        .from(sessions)
        .where(sql`event_id = ${eventId}`)
        .orderBy(sessions.startTime);

      // Obtener speakers para cada sesión
      const sessionsWithSpeakers = await Promise.all(
        sessionsData.map(async (session) => {
          const speakersData = await db
            .select({
              speaker: speakers,
            })
            .from(sessionSpeakers)
            .innerJoin(speakers, sql`${speakers.id} = ${sessionSpeakers.speakerId}`)
            .where(sql`${sessionSpeakers.sessionId} = ${session.id}`);

          return {
            ...session,
            speakers: speakersData.map((s) => s.speaker),
          };
        })
      );

      return sessionsWithSpeakers;
    });

    return { success: true, data: agenda };
  } catch (error) {
    console.error("Error fetching agenda:", error);
    return { success: false, error: "Error al obtener agenda" };
  }
}

// Obtener agenda agrupada por día y track
export async function getEventAgendaGrouped(eventId: string, tenantId: string) {
  try {
    const result = await getEventAgenda(eventId, tenantId);
    if (!result.success || !result.data) {
      return result;
    }

    // Agrupar por fecha
    const grouped: Record<string, typeof result.data> = {};

    result.data.forEach((session) => {
      const date = new Date(session.startTime).toISOString().split("T")[0];
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(session);
    });

    // Ordenar cada día por hora
    Object.keys(grouped).forEach((date) => {
      grouped[date].sort((a, b) =>
        new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
      );
    });

    return { success: true, data: grouped };
  } catch (error) {
    console.error("Error grouping agenda:", error);
    return { success: false, error: "Error al agrupar agenda" };
  }
}

// Agregar sesión a la agenda personal del asistente
export async function addToPersonalAgenda(
  attendeeId: string,
  sessionId: string,
  tenantId: string
) {
  try {
    // Verificar conflictos de horario
    const conflict = await withTenantContext(tenantId, async () => {
      // Obtener la sesión a agregar
      const targetSession = await db
        .select()
        .from(sessions)
        .where(sql`id = ${sessionId}`)
        .limit(1);

      if (targetSession.length === 0) {
        return { hasConflict: false, error: "Sesión no encontrada" };
      }

      const target = targetSession[0];

      // Buscar sesiones ya en la agenda personal
      const personalSessions = await db
        .select({
          session: sessions,
        })
        .from(attendeeSessions)
        .innerJoin(sessions, sql`${sessions.id} = ${attendeeSessions.sessionId}`)
        .where(sql`${attendeeSessions.attendeeId} = ${attendeeId}`);

      // Verificar solapamiento
      for (const { session } of personalSessions) {
        const targetStart = new Date(target.startTime).getTime();
        const targetEnd = new Date(target.endTime).getTime();
        const sessionStart = new Date(session.startTime).getTime();
        const sessionEnd = new Date(session.endTime).getTime();

        // Hay conflicto si se solapan
        if (targetStart < sessionEnd && targetEnd > sessionStart) {
          return {
            hasConflict: true,
            conflictWith: session,
            message: `Conflicto con "${session.title}" (${formatTime(session.startTime)} - ${formatTime(session.endTime)})`,
          };
        }
      }

      return { hasConflict: false };
    });

    if (conflict.error) {
      return { success: false, error: conflict.error };
    }

    if (conflict.hasConflict) {
      return {
        success: false,
        error: conflict.message,
        conflict: conflict.conflictWith,
      };
    }

    // Agregar a agenda personal
    await withTenantContext(tenantId, async () => {
      await db.insert(attendeeSessions).values({
        attendeeId,
        sessionId,
        status: "confirmed",
      });
    });

    revalidatePath("/agenda");

    return { success: true };
  } catch (error) {
    console.error("Error adding to personal agenda:", error);
    return { success: false, error: "Error al agregar a agenda" };
  }
}

// Remover sesión de la agenda personal
export async function removeFromPersonalAgenda(
  attendeeId: string,
  sessionId: string,
  tenantId: string
) {
  try {
    await withTenantContext(tenantId, async () => {
      await db
        .delete(attendeeSessions)
        .where(sql`attendee_id = ${attendeeId} AND session_id = ${sessionId}`);
    });

    revalidatePath("/agenda");

    return { success: true };
  } catch (error) {
    console.error("Error removing from personal agenda:", error);
    return { success: false, error: "Error al remover de agenda" };
  }
}

// Obtener agenda personal del asistente
export async function getPersonalAgenda(attendeeId: string, tenantId: string) {
  try {
    const agenda = await withTenantContext(tenantId, async () => {
      const result = await db
        .select({
          session: sessions,
          status: attendeeSessions.status,
        })
        .from(attendeeSessions)
        .innerJoin(sessions, sql`${sessions.id} = ${attendeeSessions.sessionId}`)
        .where(sql`${attendeeSessions.attendeeId} = ${attendeeId}`)
        .orderBy(sessions.startTime);

      return result;
    });

    return { success: true, data: agenda };
  } catch (error) {
    console.error("Error fetching personal agenda:", error);
    return { success: false, error: "Error al obtener agenda personal" };
  }
}

// Recomendar sesiones basadas en intereses del asistente
export async function getRecommendedSessions(
  attendeeId: string,
  eventId: string,
  tenantId: string
) {
  try {
    const recommendations = await withTenantContext(tenantId, async () => {
      // Obtener intereses del asistente
      const attendeeResult = await db.query.attendees.findFirst({
        where: sql`id = ${attendeeId}`,
      });

      if (!attendeeResult || !attendeeResult.interests) {
        return [];
      }

      const interests = attendeeResult.interests;

      // Obtener todas las sesiones del evento
      const allSessions = await db
        .select()
        .from(sessions)
        .where(sql`event_id = ${eventId}`)
        .orderBy(sessions.startTime);

      // Obtener sesiones ya en agenda personal
      const personalSessionIds = await db
        .select({ sessionId: attendeeSessions.sessionId })
        .from(attendeeSessions)
        .where(sql`attendee_id = ${attendeeId}`);

      const addedIds = new Set(personalSessionIds.map((s) => s.sessionId));

      // Filtrar y puntuar sesiones
      const scored = allSessions
        .filter((session) => !addedIds.has(session.id))
        .map((session) => {
          let score = 0;
          const sessionText = `${session.title} ${session.description || ""} ${session.track || ""}`.toLowerCase();

          // Calcular score basado en coincidencia de intereses
          interests.forEach((interest) => {
            if (sessionText.includes(interest.toLowerCase())) {
              score += 10;
            }
          });

          // Bonus por track matching
          if (session.track && interests.some((i) => i.toLowerCase() === session.track?.toLowerCase())) {
            score += 20;
          }

          return { session, score };
        })
        .filter((item) => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);

      return scored.map((item) => item.session);
    });

    return { success: true, data: recommendations };
  } catch (error) {
    console.error("Error getting recommendations:", error);
    return { success: false, error: "Error al obtener recomendaciones" };
  }
}

// Helper para formatear hora
function formatTime(date: Date | string): string {
  return new Date(date).toLocaleTimeString("es-MX", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Crear nueva sesión (para organizadores)
export async function createSession(
  eventId: string,
  tenantId: string,
  data: {
    title: string;
    description?: string;
    startTime: Date;
    endTime: Date;
    room?: string;
    track?: string;
    capacity?: number;
    type?: string;
  }
) {
  try {
    const session = await withTenantContext(tenantId, async () => {
      const result = await db
        .insert(sessions)
        .values({
          tenantId,
          eventId,
          ...data,
        })
        .returning();

      return result[0];
    });

    revalidatePath(`/events/${eventId}/agenda`);

    return { success: true, data: session };
  } catch (error) {
    console.error("Error creating session:", error);
    return { success: false, error: "Error al crear sesión" };
  }
}
