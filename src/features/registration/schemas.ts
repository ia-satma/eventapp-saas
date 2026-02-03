import { z } from "zod";

// Schema base de registro
export const baseRegistrationSchema = z.object({
  email: z.string().email("Email inválido"),
  name: z.string().min(2, "Nombre muy corto").max(100),
  company: z.string().optional(),
  title: z.string().optional(),
  phone: z.string().optional(),
});

// Schema extendido para networking
export const networkingProfileSchema = z.object({
  bio: z.string().max(500, "Máximo 500 caracteres").optional(),
  interests: z.array(z.string()).max(5, "Máximo 5 intereses"),
  linkedin: z.string().url("URL de LinkedIn inválida").optional().or(z.literal("")),
  lookingFor: z.string().max(200).optional(),
  offering: z.string().max(200).optional(),
});

// Schema completo de registro
export const fullRegistrationSchema = baseRegistrationSchema.merge(
  networkingProfileSchema.partial()
);

// Schema para registro VIP
export const vipRegistrationSchema = fullRegistrationSchema.extend({
  dietaryRestrictions: z.string().optional(),
  hotelPreference: z.enum(["single", "double", "suite"]).optional(),
  arrivalDate: z.string().optional(),
  departureDate: z.string().optional(),
  specialRequests: z.string().max(500).optional(),
});

// Schema para registro de speaker
export const speakerRegistrationSchema = fullRegistrationSchema.extend({
  presentationTitle: z.string().min(5, "Título de presentación requerido"),
  presentationAbstract: z.string().min(50, "Abstract debe tener al menos 50 caracteres"),
  equipment: z.array(z.string()).optional(),
  previousExperience: z.string().optional(),
});

// Tipos inferidos
export type BaseRegistration = z.infer<typeof baseRegistrationSchema>;
export type NetworkingProfile = z.infer<typeof networkingProfileSchema>;
export type FullRegistration = z.infer<typeof fullRegistrationSchema>;
export type VIPRegistration = z.infer<typeof vipRegistrationSchema>;
export type SpeakerRegistration = z.infer<typeof speakerRegistrationSchema>;

// Opciones de intereses predefinidos
export const INTEREST_OPTIONS = [
  "Inteligencia Artificial",
  "Machine Learning",
  "Cloud Computing",
  "DevOps",
  "Frontend",
  "Backend",
  "Mobile",
  "Data Science",
  "Blockchain",
  "IoT",
  "Ciberseguridad",
  "UX/UI",
  "Product Management",
  "Startups",
  "Inversión",
  "Marketing Digital",
  "E-commerce",
  "SaaS",
  "Fintech",
  "EdTech",
] as const;

// Tipos de tickets disponibles
export const TICKET_TYPES = [
  { id: "general", name: "General", description: "Acceso a todas las sesiones" },
  { id: "vip", name: "VIP", description: "Acceso VIP + Networking exclusivo + Cena" },
  { id: "speaker", name: "Speaker", description: "Para ponentes del evento" },
  { id: "sponsor", name: "Patrocinador", description: "Para empresas patrocinadoras" },
] as const;
