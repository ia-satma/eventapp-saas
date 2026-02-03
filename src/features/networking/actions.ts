"use server";

import { db, withTenantContext, attendees, networkingMatches } from "@/shared/db";
import { sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// Calcular score de matching entre dos perfiles
function calculateMatchScore(
  profile1: { interests?: string[] | null; lookingFor?: string | null; offering?: string | null },
  profile2: { interests?: string[] | null; lookingFor?: string | null; offering?: string | null }
): number {
  let score = 0;
  const maxScore = 100;

  // Coincidencia de intereses (hasta 40 puntos)
  if (profile1.interests && profile2.interests) {
    const commonInterests = profile1.interests.filter((i) =>
      profile2.interests?.includes(i)
    );
    const interestScore = (commonInterests.length / Math.max(profile1.interests.length, profile2.interests.length)) * 40;
    score += interestScore;
  }

  // Match de lookingFor con offering (hasta 30 puntos cada dirección)
  if (profile1.lookingFor && profile2.offering) {
    const words1 = profile1.lookingFor.toLowerCase().split(/\s+/);
    const words2 = profile2.offering.toLowerCase().split(/\s+/);
    const match = words1.some((w) => words2.some((w2) => w2.includes(w) || w.includes(w2)));
    if (match) score += 30;
  }

  if (profile2.lookingFor && profile1.offering) {
    const words1 = profile2.lookingFor.toLowerCase().split(/\s+/);
    const words2 = profile1.offering.toLowerCase().split(/\s+/);
    const match = words1.some((w) => words2.some((w2) => w2.includes(w) || w.includes(w2)));
    if (match) score += 30;
  }

  return Math.min(score, maxScore) / maxScore; // Normalizar a 0-1
}

// Generar matches potenciales para un asistente
export async function generatePotentialMatches(
  attendeeId: string,
  eventId: string,
  tenantId: string,
  limit: number = 10
) {
  try {
    const matches = await withTenantContext(tenantId, async () => {
      // Obtener perfil del asistente actual
      const currentAttendee = await db
        .select()
        .from(attendees)
        .where(sql`id = ${attendeeId}`)
        .limit(1);

      if (currentAttendee.length === 0) {
        throw new Error("Asistente no encontrado");
      }

      const myProfile = currentAttendee[0];

      // Obtener todos los demás asistentes del evento
      const otherAttendees = await db
        .select()
        .from(attendees)
        .where(sql`
          event_id = ${eventId}
          AND id != ${attendeeId}
          AND status != 'cancelled'
        `);

      // Obtener matches existentes para no duplicar
      const existingMatches = await db
        .select()
        .from(networkingMatches)
        .where(sql`
          (attendee_1_id = ${attendeeId} OR attendee_2_id = ${attendeeId})
          AND event_id = ${eventId}
        `);

      const matchedIds = new Set(
        existingMatches.flatMap((m) => [m.attendee1Id, m.attendee2Id])
      );

      // Calcular scores y filtrar
      const potentialMatches = otherAttendees
        .filter((a) => !matchedIds.has(a.id))
        .map((attendee) => ({
          attendee,
          score: calculateMatchScore(myProfile, attendee),
        }))
        .filter((m) => m.score > 0.2) // Mínimo 20% de compatibilidad
        .sort((a, b) => b.score - a.score)
        .slice(0, limit);

      return potentialMatches;
    });

    return { success: true, data: matches };
  } catch (error) {
    console.error("Error generating matches:", error);
    return { success: false, error: "Error al generar matches" };
  }
}

// Acción de "like" en un perfil (estilo Tinder)
export async function likeProfile(
  attendeeId: string,
  targetAttendeeId: string,
  eventId: string,
  tenantId: string
) {
  try {
    const result = await withTenantContext(tenantId, async () => {
      // Verificar si ya existe un match pendiente del otro lado
      const existingMatch = await db
        .select()
        .from(networkingMatches)
        .where(sql`
          event_id = ${eventId}
          AND attendee_1_id = ${targetAttendeeId}
          AND attendee_2_id = ${attendeeId}
        `)
        .limit(1);

      if (existingMatch.length > 0) {
        // El otro ya le dio like, es un match mutuo
        await db
          .update(networkingMatches)
          .set({
            attendee2Status: "liked",
            status: "accepted",
            updatedAt: new Date(),
          })
          .where(sql`id = ${existingMatch[0].id}`);

        return { isMatch: true, matchId: existingMatch[0].id };
      }

      // Crear nuevo match unilateral
      const [attendee1, attendee2] = await Promise.all([
        db.select().from(attendees).where(sql`id = ${attendeeId}`).limit(1),
        db.select().from(attendees).where(sql`id = ${targetAttendeeId}`).limit(1),
      ]);

      const score = calculateMatchScore(attendee1[0], attendee2[0]);

      const newMatch = await db
        .insert(networkingMatches)
        .values({
          tenantId,
          eventId,
          attendee1Id: attendeeId,
          attendee2Id: targetAttendeeId,
          matchScore: score,
          attendee1Status: "liked",
          attendee2Status: "pending",
          status: "pending",
        })
        .returning();

      return { isMatch: false, matchId: newMatch[0].id };
    });

    revalidatePath("/networking");

    return { success: true, ...result };
  } catch (error) {
    console.error("Error liking profile:", error);
    return { success: false, error: "Error al procesar like" };
  }
}

// Acción de "pass" (no interesado)
export async function passProfile(
  attendeeId: string,
  targetAttendeeId: string,
  eventId: string,
  tenantId: string
) {
  try {
    await withTenantContext(tenantId, async () => {
      // Verificar si ya existe un match del otro lado
      const existingMatch = await db
        .select()
        .from(networkingMatches)
        .where(sql`
          event_id = ${eventId}
          AND attendee_1_id = ${targetAttendeeId}
          AND attendee_2_id = ${attendeeId}
        `)
        .limit(1);

      if (existingMatch.length > 0) {
        // Marcar como rechazado
        await db
          .update(networkingMatches)
          .set({
            attendee2Status: "passed",
            status: "rejected",
            updatedAt: new Date(),
          })
          .where(sql`id = ${existingMatch[0].id}`);
      } else {
        // Crear registro de "pass" para no volver a mostrarlo
        await db.insert(networkingMatches).values({
          tenantId,
          eventId,
          attendee1Id: attendeeId,
          attendee2Id: targetAttendeeId,
          attendee1Status: "passed",
          attendee2Status: "pending",
          status: "rejected",
        });
      }
    });

    revalidatePath("/networking");

    return { success: true };
  } catch (error) {
    console.error("Error passing profile:", error);
    return { success: false, error: "Error al procesar pass" };
  }
}

// Obtener matches mutuos (conexiones confirmadas)
export async function getMutualMatches(
  attendeeId: string,
  eventId: string,
  tenantId: string
) {
  try {
    const matches = await withTenantContext(tenantId, async () => {
      const results = await db
        .select()
        .from(networkingMatches)
        .where(sql`
          event_id = ${eventId}
          AND status = 'accepted'
          AND (attendee_1_id = ${attendeeId} OR attendee_2_id = ${attendeeId})
        `);

      // Obtener detalles de los otros asistentes
      const matchedAttendees = await Promise.all(
        results.map(async (match) => {
          const otherId = match.attendee1Id === attendeeId ? match.attendee2Id : match.attendee1Id;
          const other = await db
            .select()
            .from(attendees)
            .where(sql`id = ${otherId}`)
            .limit(1);

          return {
            match,
            attendee: other[0],
          };
        })
      );

      return matchedAttendees;
    });

    return { success: true, data: matches };
  } catch (error) {
    console.error("Error fetching mutual matches:", error);
    return { success: false, error: "Error al obtener matches" };
  }
}

// Marcar que se conocieron en persona
export async function markAsMet(matchId: string, tenantId: string) {
  try {
    await withTenantContext(tenantId, async () => {
      await db
        .update(networkingMatches)
        .set({ status: "met", updatedAt: new Date() })
        .where(sql`id = ${matchId}`);
    });

    revalidatePath("/networking");

    return { success: true };
  } catch (error) {
    console.error("Error marking as met:", error);
    return { success: false, error: "Error al marcar como conocido" };
  }
}

// Obtener estadísticas de networking
export async function getNetworkingStats(
  attendeeId: string,
  eventId: string,
  tenantId: string
) {
  try {
    const stats = await withTenantContext(tenantId, async () => {
      const totalMatchesResult = await db
        .select({ count: sql<number>`count(*)` })
        .from(networkingMatches)
        .where(sql`
          event_id = ${eventId}
          AND status = 'accepted'
          AND (attendee_1_id = ${attendeeId} OR attendee_2_id = ${attendeeId})
        `);

      const metResult = await db
        .select({ count: sql<number>`count(*)` })
        .from(networkingMatches)
        .where(sql`
          event_id = ${eventId}
          AND status = 'met'
          AND (attendee_1_id = ${attendeeId} OR attendee_2_id = ${attendeeId})
        `);

      const pendingResult = await db
        .select({ count: sql<number>`count(*)` })
        .from(networkingMatches)
        .where(sql`
          event_id = ${eventId}
          AND status = 'pending'
          AND attendee_2_id = ${attendeeId}
          AND attendee_1_status = 'liked'
        `);

      return {
        totalMatches: totalMatchesResult[0]?.count || 0,
        peopleMet: metResult[0]?.count || 0,
        pendingLikes: pendingResult[0]?.count || 0,
      };
    });

    return { success: true, data: stats };
  } catch (error) {
    console.error("Error fetching networking stats:", error);
    return { success: false, error: "Error al obtener estadísticas" };
  }
}
