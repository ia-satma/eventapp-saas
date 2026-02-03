"use server";

import { db, withTenantContext, attendees, events } from "@/shared/db";
import { fullRegistrationSchema, vipRegistrationSchema, type FullRegistration } from "./schemas";
import { revalidatePath } from "next/cache";
import { sql } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

// Generar código QR único para el asistente
function generateQRCode(): string {
  return `EVT-${uuidv4().slice(0, 8).toUpperCase()}`;
}

// Registrar asistente en un evento
export async function registerAttendee(
  eventId: string,
  tenantId: string,
  data: FullRegistration,
  ticketType: string = "general"
) {
  try {
    // Validar datos según tipo de ticket
    const schema = ticketType === "vip" ? vipRegistrationSchema : fullRegistrationSchema;
    const validatedData = schema.parse(data);

    // Verificar que el evento existe y pertenece al tenant
    const eventResult = await withTenantContext(tenantId, async () => {
      return await db
        .select()
        .from(events)
        .where(sql`id = ${eventId}`)
        .limit(1);
    });

    if (eventResult.length === 0) {
      return { success: false, error: "Evento no encontrado" };
    }

    const event = eventResult[0];

    // Verificar capacidad del evento
    if (event.capacity) {
      const attendeeCount = await withTenantContext(tenantId, async () => {
        const result = await db
          .select({ count: sql<number>`count(*)` })
          .from(attendees)
          .where(sql`event_id = ${eventId} AND status != 'cancelled'`);
        return result[0]?.count || 0;
      });

      if (attendeeCount >= event.capacity) {
        return { success: false, error: "El evento está lleno" };
      }
    }

    // Verificar si el email ya está registrado
    const existingAttendee = await withTenantContext(tenantId, async () => {
      return await db
        .select()
        .from(attendees)
        .where(sql`event_id = ${eventId} AND email = ${validatedData.email}`)
        .limit(1);
    });

    if (existingAttendee.length > 0) {
      return { success: false, error: "Este email ya está registrado para el evento" };
    }

    // Crear el registro
    const qrCode = generateQRCode();

    const newAttendee = await withTenantContext(tenantId, async () => {
      const result = await db
        .insert(attendees)
        .values({
          tenantId,
          eventId,
          email: validatedData.email,
          name: validatedData.name,
          company: validatedData.company,
          title: validatedData.title,
          phone: validatedData.phone,
          ticketType,
          qrCode,
          bio: validatedData.bio,
          interests: validatedData.interests,
          linkedin: validatedData.linkedin,
          lookingFor: validatedData.lookingFor,
          offering: validatedData.offering,
          status: "registered",
        })
        .returning();

      return result[0];
    });

    revalidatePath(`/events/${eventId}`);

    return {
      success: true,
      data: {
        id: newAttendee.id,
        qrCode: newAttendee.qrCode,
        name: newAttendee.name,
        email: newAttendee.email,
      },
    };
  } catch (error) {
    console.error("Error registering attendee:", error);
    return { success: false, error: "Error al procesar el registro" };
  }
}

// Obtener información de registro de un asistente
export async function getAttendeeByQR(qrCode: string, tenantId: string) {
  try {
    const result = await withTenantContext(tenantId, async () => {
      return await db
        .select()
        .from(attendees)
        .where(sql`qr_code = ${qrCode}`)
        .limit(1);
    });

    if (result.length === 0) {
      return { success: false, error: "Asistente no encontrado" };
    }

    return { success: true, data: result[0] };
  } catch (error) {
    console.error("Error fetching attendee:", error);
    return { success: false, error: "Error al buscar asistente" };
  }
}

// Check-in de asistente
export async function checkInAttendee(attendeeId: string, tenantId: string) {
  try {
    const result = await withTenantContext(tenantId, async () => {
      return await db
        .update(attendees)
        .set({
          status: "checked_in",
          checkedInAt: new Date(),
        })
        .where(sql`id = ${attendeeId}`)
        .returning();
    });

    if (result.length === 0) {
      return { success: false, error: "Asistente no encontrado" };
    }

    return { success: true, data: result[0] };
  } catch (error) {
    console.error("Error checking in attendee:", error);
    return { success: false, error: "Error al hacer check-in" };
  }
}

// Obtener estadísticas de registro
export async function getRegistrationStats(eventId: string, tenantId: string) {
  try {
    const stats = await withTenantContext(tenantId, async () => {
      const totalResult = await db
        .select({ count: sql<number>`count(*)` })
        .from(attendees)
        .where(sql`event_id = ${eventId}`);

      const checkedInResult = await db
        .select({ count: sql<number>`count(*)` })
        .from(attendees)
        .where(sql`event_id = ${eventId} AND status = 'checked_in'`);

      const byTypeResult = await db
        .select({
          ticketType: attendees.ticketType,
          count: sql<number>`count(*)`,
        })
        .from(attendees)
        .where(sql`event_id = ${eventId}`)
        .groupBy(attendees.ticketType);

      return {
        total: totalResult[0]?.count || 0,
        checkedIn: checkedInResult[0]?.count || 0,
        byType: byTypeResult,
      };
    });

    return { success: true, data: stats };
  } catch (error) {
    console.error("Error fetching registration stats:", error);
    return { success: false, error: "Error al obtener estadísticas" };
  }
}
