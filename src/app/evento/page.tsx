"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Ticket,
  Building2,
  Scale,
  Gavel,
  BookOpen,
  Award,
  ChevronRight,
  ExternalLink,
  Phone,
  Mail,
  Globe,
  Linkedin,
  Twitter,
  Play,
  Star,
  TrendingUp,
  Shield,
  Briefcase,
  GraduationCap,
  Landmark,
  FileText,
  MessageSquare,
  Network,
  Coffee,
  Utensils,
  Music,
  Camera,
  Mic,
  Monitor,
  Presentation,
} from "lucide-react";
import { useState } from "react";
import type { LucideIcon } from "lucide-react";

// Tipos
interface Session {
  time: string;
  title: string;
  type: string;
  location: string;
  icon: LucideIcon;
  description?: string;
  speaker?: string;
  panelists?: string[];
  tracks?: { name: string; room: string }[];
  dresscode?: string;
}

interface AgendaDay {
  day: string;
  date: string;
  theme: string;
  sessions: Session[];
}

// Datos del evento
const EVENT_DATA = {
  name: "XX Congreso Nacional de Abogados BMA 2026",
  tagline: "Derecho y justicia en tiempos de reformas",
  description: "El epicentro del liderazgo jurídico en México. Únete a más de 600 participantes y 80 conferencistas destacados en el evento legal más importante del país.",
  dates: {
    start: "19 de febrero de 2026",
    end: "21 de febrero de 2026",
    year: 2026,
  },
  location: {
    venue: "Parque Fundidora - Nave Lewis",
    address: "Av. Fundidora y Adolfo Prieto S/N",
    city: "Monterrey, Nuevo León",
    postalCode: "64010",
    country: "México",
    coordinates: { lat: 25.6784, lng: -100.2842 },
  },
  stats: {
    attendees: 600,
    speakers: 80,
    sessions: 45,
    networkingHours: 20,
  },
  tickets: [
    {
      name: "Social (Acompañantes)",
      price: 10440,
      features: [
        "Acceso a eventos sociales",
        "Cena de gala",
        "Coctel de bienvenida",
        "Tours culturales",
        "Kit de bienvenida",
      ],
    },
    {
      name: "Sesiones Académicas",
      price: 15660,
      features: [
        "Acceso a todas las conferencias",
        "Material didáctico digital",
        "Certificado de participación",
        "Coffee breaks",
        "Acceso a grabaciones",
        "Networking sessions",
      ],
      popular: true,
    },
    {
      name: "Todo Incluido",
      price: 18560,
      features: [
        "Todo lo de Sesiones Académicas",
        "Todos los eventos sociales",
        "Cena de gala VIP",
        "Asientos preferenciales",
        "Meet & Greet con ponentes",
        "Acceso área VIP",
        "Estacionamiento incluido",
      ],
    },
  ],
  organizer: {
    name: "Barra Mexicana, Colegio de Abogados",
    founded: 1922,
    phone: "55 5208-3115",
    email: "acruz@bma.org.mx",
    website: "https://www.bma.org.mx",
  },
};

// Agenda del evento (ejemplo profesional)
const AGENDA: Record<string, AgendaDay> = {
  "19-feb": {
    day: "Jueves 19",
    date: "19 de febrero",
    theme: "Inauguración y Reformas Constitucionales",
    sessions: [
      {
        time: "08:00 - 09:00",
        title: "Registro y Acreditación",
        type: "registro",
        location: "Lobby Principal",
        icon: FileText,
      },
      {
        time: "09:00 - 09:30",
        title: "Ceremonia de Inauguración",
        type: "ceremonia",
        location: "Auditorio Principal",
        description: "Palabras de bienvenida del Presidente de la BMA y autoridades invitadas.",
        icon: Award,
      },
      {
        time: "09:30 - 10:30",
        title: "Conferencia Magistral: El Estado de Derecho ante las Reformas del 2024-2026",
        type: "magistral",
        location: "Auditorio Principal",
        speaker: "Min. Norma Lucía Piña Hernández",
        description: "Análisis profundo del impacto de las reformas constitucionales recientes en el sistema de justicia mexicano.",
        icon: Gavel,
      },
      {
        time: "10:30 - 11:00",
        title: "Coffee Break & Networking",
        type: "networking",
        location: "Área de Exposición",
        icon: Coffee,
      },
      {
        time: "11:00 - 13:00",
        title: "Panel: Reforma Judicial - Retos y Oportunidades",
        type: "panel",
        location: "Auditorio Principal",
        panelists: ["Dr. Diego Valadés", "Mtra. Ana Laura Magaloni", "Lic. Juan Luis González Alcántara"],
        description: "Debate sobre la elección de jueces, autonomía judicial y acceso a la justicia.",
        icon: Users,
      },
      {
        time: "13:00 - 15:00",
        title: "Comida",
        type: "social",
        location: "Restaurante Nave Lewis",
        icon: Utensils,
      },
      {
        time: "15:00 - 16:30",
        title: "Sesiones Paralelas - Bloque A",
        type: "paralelas",
        location: "Salas 1-4",
        tracks: [
          { name: "Derecho Corporativo", room: "Sala 1" },
          { name: "Litigio Civil", room: "Sala 2" },
          { name: "Derecho Penal", room: "Sala 3" },
          { name: "Propiedad Intelectual", room: "Sala 4" },
        ],
        icon: Presentation,
      },
      {
        time: "16:30 - 17:00",
        title: "Coffee Break",
        type: "networking",
        location: "Área de Exposición",
        icon: Coffee,
      },
      {
        time: "17:00 - 18:30",
        title: "Sesiones Paralelas - Bloque B",
        type: "paralelas",
        location: "Salas 1-4",
        tracks: [
          { name: "Derecho Fiscal", room: "Sala 1" },
          { name: "Derecho Laboral", room: "Sala 2" },
          { name: "Arbitraje Internacional", room: "Sala 3" },
          { name: "Compliance y Anticorrupción", room: "Sala 4" },
        ],
        icon: Presentation,
      },
      {
        time: "19:00 - 22:00",
        title: "Coctel de Bienvenida",
        type: "social",
        location: "Terraza Fundidora",
        description: "Evento de networking con música en vivo y gastronomía regional.",
        icon: Music,
      },
    ],
  },
  "20-feb": {
    day: "Viernes 20",
    date: "20 de febrero",
    theme: "Tecnología, IA y el Futuro del Derecho",
    sessions: [
      {
        time: "08:30 - 09:00",
        title: "Registro",
        type: "registro",
        location: "Lobby Principal",
        icon: FileText,
      },
      {
        time: "09:00 - 10:30",
        title: "Conferencia Magistral: Inteligencia Artificial en la Práctica Jurídica",
        type: "magistral",
        location: "Auditorio Principal",
        speaker: "Dr. Richard Susskind",
        description: "Cómo la IA está transformando la profesión legal y qué habilidades necesitarán los abogados del futuro.",
        icon: Monitor,
      },
      {
        time: "10:30 - 11:00",
        title: "Coffee Break & Demo Zone",
        type: "networking",
        location: "Área de Exposición",
        description: "Demostración de herramientas LegalTech.",
        icon: Coffee,
      },
      {
        time: "11:00 - 13:00",
        title: "Panel: LegalTech - Casos de Éxito en México",
        type: "panel",
        location: "Auditorio Principal",
        panelists: ["Lic. Andrea Porras", "Ing. Ricardo Blanco", "Lic. María Fernanda Garza"],
        description: "Experiencias reales de implementación de tecnología en despachos mexicanos.",
        icon: TrendingUp,
      },
      {
        time: "13:00 - 15:00",
        title: "Comida de Networking por Especialidad",
        type: "social",
        location: "Mesas Temáticas",
        description: "Comida organizada por área de práctica para facilitar conexiones relevantes.",
        icon: Network,
      },
      {
        time: "15:00 - 16:30",
        title: "Sesiones Paralelas - Bloque C",
        type: "paralelas",
        location: "Salas 1-4",
        tracks: [
          { name: "Ciberseguridad Legal", room: "Sala 1" },
          { name: "Protección de Datos", room: "Sala 2" },
          { name: "Contratos Electrónicos", room: "Sala 3" },
          { name: "E-Discovery", room: "Sala 4" },
        ],
        icon: Presentation,
      },
      {
        time: "16:30 - 17:00",
        title: "Coffee Break",
        type: "networking",
        location: "Área de Exposición",
        icon: Coffee,
      },
      {
        time: "17:00 - 18:30",
        title: "Workshop: Herramientas de IA para Abogados",
        type: "workshop",
        location: "Sala de Capacitación",
        speaker: "Equipo LegalTech BMA",
        description: "Sesión práctica hands-on con las principales herramientas de IA para investigación jurídica.",
        icon: GraduationCap,
      },
      {
        time: "20:00 - 00:00",
        title: "Cena de Gala",
        type: "gala",
        location: "Salón Monterrey",
        description: "Cena formal con premiación a la trayectoria, entretenimiento y baile.",
        dresscode: "Etiqueta",
        icon: Star,
      },
    ],
  },
  "21-feb": {
    day: "Sábado 21",
    date: "21 de febrero",
    theme: "Ética, ESG y Clausura",
    sessions: [
      {
        time: "09:00 - 09:30",
        title: "Registro",
        type: "registro",
        location: "Lobby Principal",
        icon: FileText,
      },
      {
        time: "09:30 - 11:00",
        title: "Conferencia Magistral: Ética Profesional en la Era Digital",
        type: "magistral",
        location: "Auditorio Principal",
        speaker: "Dr. Miguel Carbonell",
        description: "Los nuevos dilemas éticos que enfrentan los abogados en un mundo hiperconectado.",
        icon: Shield,
      },
      {
        time: "11:00 - 11:30",
        title: "Coffee Break",
        type: "networking",
        location: "Área de Exposición",
        icon: Coffee,
      },
      {
        time: "11:30 - 13:00",
        title: "Panel: ESG y Responsabilidad Corporativa",
        type: "panel",
        location: "Auditorio Principal",
        panelists: ["Lic. Gabriela Rodríguez", "Dr. Eduardo Bohórquez", "Mtra. Patricia Aued"],
        description: "El rol del abogado en sostenibilidad, gobernanza corporativa y responsabilidad social.",
        icon: Landmark,
      },
      {
        time: "13:00 - 14:30",
        title: "Brunch de Clausura",
        type: "social",
        location: "Terraza Fundidora",
        icon: Utensils,
      },
      {
        time: "14:30 - 15:30",
        title: "Asamblea General BMA",
        type: "asamblea",
        location: "Auditorio Principal",
        description: "Solo para miembros de la Barra Mexicana de Abogados.",
        icon: Users,
      },
      {
        time: "15:30 - 16:30",
        title: "Sesión de Cierre y Compromisos",
        type: "ceremonia",
        location: "Auditorio Principal",
        description: "Declaratoria de Monterrey 2026 y anuncio de la sede del XXI Congreso.",
        icon: Award,
      },
      {
        time: "16:30 - 19:00",
        title: "Tour Cultural: Monterrey Histórico",
        type: "social",
        location: "Punto de encuentro: Lobby",
        description: "Recorrido opcional por sitios emblemáticos de Monterrey (incluido en paquete Todo Incluido).",
        icon: Camera,
      },
    ],
  },
};

// Speakers destacados
const SPEAKERS = [
  {
    name: "Min. Norma Lucía Piña Hernández",
    title: "Ministra de la Suprema Corte de Justicia de la Nación",
    organization: "SCJN",
    topic: "Estado de Derecho y Reformas Constitucionales",
    image: "/speakers/speaker-1.jpg",
    bio: "Primera mujer en presidir la Suprema Corte de Justicia de la Nación. Destacada jurista con más de 30 años de carrera judicial.",
    social: { linkedin: "#", twitter: "#" },
    featured: true,
  },
  {
    name: "Dr. Richard Susskind",
    title: "Futurista Legal & Autor",
    organization: "Oxford University",
    topic: "Inteligencia Artificial en la Práctica Jurídica",
    image: "/speakers/speaker-2.jpg",
    bio: "Autor de 'The End of Lawyers?' y asesor tecnológico del Lord Chief Justice de Inglaterra. Visionario del futuro de la profesión legal.",
    social: { linkedin: "#", twitter: "#" },
    featured: true,
  },
  {
    name: "Dr. Diego Valadés",
    title: "Investigador Emérito",
    organization: "UNAM - Instituto de Investigaciones Jurídicas",
    topic: "Reforma Judicial y Autonomía",
    image: "/speakers/speaker-3.jpg",
    bio: "Ex Procurador General de la República. Autor de más de 40 libros sobre derecho constitucional.",
    social: { linkedin: "#" },
    featured: true,
  },
  {
    name: "Dr. Miguel Carbonell",
    title: "Investigador del IIJ-UNAM",
    organization: "UNAM",
    topic: "Ética Profesional en la Era Digital",
    image: "/speakers/speaker-4.jpg",
    bio: "Uno de los constitucionalistas más influyentes de México. Autor prolífico y conferencista internacional.",
    social: { linkedin: "#", twitter: "#" },
    featured: true,
  },
  {
    name: "Mtra. Ana Laura Magaloni",
    title: "Directora División de Estudios Jurídicos",
    organization: "CIDE",
    topic: "Acceso a la Justicia",
    image: "/speakers/speaker-5.jpg",
    bio: "Especialista en sistemas de justicia y políticas públicas judiciales.",
    social: { linkedin: "#" },
  },
  {
    name: "Lic. Juan Luis González Alcántara",
    title: "Ministro de la SCJN",
    organization: "Suprema Corte de Justicia",
    topic: "Independencia Judicial",
    image: "/speakers/speaker-6.jpg",
    bio: "Ministro de la Suprema Corte desde 2018. Especialista en derechos humanos y justicia constitucional.",
    social: { linkedin: "#" },
  },
  {
    name: "Lic. Andrea Porras",
    title: "CEO & Founder",
    organization: "LegalTech MX",
    topic: "Transformación Digital en Despachos",
    image: "/speakers/speaker-7.jpg",
    bio: "Emprendedora pionera en LegalTech en Latinoamérica. Forbes 30 Under 30.",
    social: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Dr. Eduardo Bohórquez",
    title: "Director Ejecutivo",
    organization: "Transparencia Mexicana",
    topic: "ESG y Anticorrupción",
    image: "/speakers/speaker-8.jpg",
    bio: "Líder en temas de transparencia y combate a la corrupción. Asesor de organismos internacionales.",
    social: { linkedin: "#", twitter: "#" },
  },
];

// Patrocinadores
const SPONSORS = {
  platinum: [
    { name: "Baker McKenzie", logo: "/sponsors/baker.png" },
    { name: "Galicia Abogados", logo: "/sponsors/galicia.png" },
  ],
  gold: [
    { name: "Von Wobeser", logo: "/sponsors/vw.png" },
    { name: "Creel García-Cuéllar", logo: "/sponsors/creel.png" },
    { name: "Basham, Ringe y Correa", logo: "/sponsors/basham.png" },
  ],
  silver: [
    { name: "Sánchez Devanny", logo: "/sponsors/sd.png" },
    { name: "Mijares Angoitia", logo: "/sponsors/ma.png" },
    { name: "González Calvillo", logo: "/sponsors/gc.png" },
    { name: "Nader Hayaux", logo: "/sponsors/nh.png" },
  ],
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 0,
  }).format(price);
}

function getSessionColor(type: string) {
  const colors: Record<string, string> = {
    magistral: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    panel: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    paralelas: "bg-green-500/10 text-green-400 border-green-500/30",
    workshop: "bg-orange-500/10 text-orange-400 border-orange-500/30",
    networking: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
    social: "bg-pink-500/10 text-pink-400 border-pink-500/30",
    gala: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    registro: "bg-gray-500/10 text-gray-400 border-gray-500/30",
    ceremonia: "bg-red-500/10 text-red-400 border-red-500/30",
    asamblea: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
  };
  return colors[type] || "bg-gray-500/10 text-gray-400 border-gray-500/30";
}

export default function EventoPage() {
  const [selectedDay, setSelectedDay] = useState("19-feb");

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-amber-500/10" />

        {/* Content */}
        <div className="relative container mx-auto px-4 py-24">
          {/* Badges */}
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 px-4 py-1">
              <Scale className="w-3 h-3 mr-1" /> XX Edición
            </Badge>
            <Badge className="bg-white/10 text-white border-white/20 px-4 py-1">
              <Calendar className="w-3 h-3 mr-1" /> 19-21 Feb 2026
            </Badge>
            <Badge className="bg-white/10 text-white border-white/20 px-4 py-1">
              <MapPin className="w-3 h-3 mr-1" /> Monterrey, NL
            </Badge>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center text-white mb-6 tracking-tight">
            XX Congreso Nacional
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
              de Abogados BMA
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-amber-200/80 text-center mb-4 font-light">
            "{EVENT_DATA.tagline}"
          </p>

          {/* Description */}
          <p className="text-lg text-slate-400 text-center max-w-3xl mx-auto mb-12">
            {EVENT_DATA.description}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
            {[
              { icon: Users, value: "600+", label: "Asistentes" },
              { icon: Mic, value: "80+", label: "Conferencistas" },
              { icon: BookOpen, value: "45+", label: "Sesiones" },
              { icon: Network, value: "20+", label: "Hrs Networking" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 text-center"
              >
                <stat.icon className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#registro">
              <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-black font-semibold text-lg px-8 h-14">
                <Ticket className="w-5 h-5 mr-2" />
                Inscribirme Ahora
              </Button>
            </Link>
            <Link href="#agenda">
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 text-lg px-8 h-14">
                <Calendar className="w-5 h-5 mr-2" />
                Ver Programa
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-20 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 mb-4">
                <MapPin className="w-3 h-3 mr-1" /> Sede del Evento
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                {EVENT_DATA.location.venue}
              </h2>
              <div className="space-y-4 text-slate-300">
                <p className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-amber-400 mt-1" />
                  <span>
                    {EVENT_DATA.location.address}
                    <br />
                    {EVENT_DATA.location.city}, CP {EVENT_DATA.location.postalCode}
                    <br />
                    {EVENT_DATA.location.country}
                  </span>
                </p>
                <p className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-amber-400 mt-1" />
                  <span>
                    <strong className="text-white">Fechas:</strong> {EVENT_DATA.dates.start} al {EVENT_DATA.dates.end}
                  </span>
                </p>
              </div>
              <div className="mt-8 flex gap-4">
                <Button className="bg-white/10 hover:bg-white/20 text-white">
                  <MapPin className="w-4 h-4 mr-2" />
                  Ver en Mapa
                </Button>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Hoteles Cercanos
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video bg-slate-800 rounded-2xl overflow-hidden border border-white/10">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3596.0044682244344!2d-100.28420532547844!3d25.678400477443095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8662be35e7f11d4f%3A0x5c51e8a9f1f2c2a!2sParque%20Fundidora!5e0!3m2!1sen!2smx!4v1706900000000!5m2!1sen!2smx"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Agenda Section */}
      <section id="agenda" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 mb-4">
              <Calendar className="w-3 h-3 mr-1" /> Programa
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Agenda del Congreso
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Tres días intensivos de conocimiento, networking y experiencias inolvidables
            </p>
          </div>

          {/* Day Tabs */}
          <Tabs value={selectedDay} onValueChange={setSelectedDay} className="w-full">
            <TabsList className="grid grid-cols-3 max-w-2xl mx-auto mb-8 bg-slate-800/50 p-1 rounded-xl">
              {Object.entries(AGENDA).map(([key, day]) => (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="data-[state=active]:bg-amber-500 data-[state=active]:text-black rounded-lg py-3"
                >
                  <div className="text-center">
                    <div className="font-semibold">{day.day}</div>
                    <div className="text-xs opacity-80">{day.date}</div>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(AGENDA).map(([key, day]) => (
              <TabsContent key={key} value={key}>
                <div className="mb-6 text-center">
                  <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                    <BookOpen className="w-3 h-3 mr-1" /> {day.theme}
                  </Badge>
                </div>
                <div className="space-y-4 max-w-4xl mx-auto">
                  {day.sessions.map((session, idx) => (
                    <Card
                      key={idx}
                      className={`bg-slate-800/50 border-slate-700/50 hover:border-amber-500/30 transition-all duration-300 overflow-hidden ${
                        session.type === "magistral" || session.type === "gala"
                          ? "border-l-4 border-l-amber-500"
                          : ""
                      }`}
                    >
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-start gap-4">
                          {/* Time */}
                          <div className="flex items-center gap-3 md:w-36 shrink-0">
                            <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                              <session.icon className="w-5 h-5 text-amber-400" />
                            </div>
                            <span className="text-amber-400 font-mono text-sm">{session.time}</span>
                          </div>

                          {/* Content */}
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <Badge className={`${getSessionColor(session.type)} text-xs`}>
                                {session.type.charAt(0).toUpperCase() + session.type.slice(1)}
                              </Badge>
                              <span className="text-slate-500 text-sm flex items-center gap-1">
                                <MapPin className="w-3 h-3" /> {session.location}
                              </span>
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">
                              {session.title}
                            </h3>
                            {session.speaker && (
                              <p className="text-amber-300 text-sm mb-2 flex items-center gap-1">
                                <Mic className="w-3 h-3" /> {session.speaker}
                              </p>
                            )}
                            {session.panelists && (
                              <p className="text-blue-300 text-sm mb-2">
                                <Users className="w-3 h-3 inline mr-1" />
                                {session.panelists.join(" • ")}
                              </p>
                            )}
                            {session.description && (
                              <p className="text-slate-400 text-sm">{session.description}</p>
                            )}
                            {session.tracks && (
                              <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2">
                                {session.tracks.map((track, tidx) => (
                                  <div
                                    key={tidx}
                                    className="bg-green-500/10 border border-green-500/20 rounded-lg px-3 py-2 text-xs"
                                  >
                                    <span className="text-green-400 font-medium">{track.name}</span>
                                    <br />
                                    <span className="text-slate-500">{track.room}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                            {session.dresscode && (
                              <Badge className="mt-2 bg-amber-500/20 text-amber-300">
                                Dress code: {session.dresscode}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Speakers Section */}
      <section id="ponentes" className="py-20 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 mb-4">
              <Mic className="w-3 h-3 mr-1" /> Conferencistas
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Speakers Destacados
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Aprende de los líderes más influyentes del mundo jurídico
            </p>
          </div>

          {/* Featured Speakers */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {SPEAKERS.filter((s) => s.featured).map((speaker, idx) => (
              <Card
                key={idx}
                className="bg-slate-800/50 border-slate-700/50 hover:border-amber-500/30 transition-all duration-300 group overflow-hidden"
              >
                <div className="aspect-square bg-gradient-to-br from-amber-500/20 to-slate-800 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-slate-700 flex items-center justify-center">
                      <Users className="w-16 h-16 text-slate-500" />
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                  <Badge className="absolute top-4 right-4 bg-amber-500 text-black">
                    <Star className="w-3 h-3 mr-1" /> Destacado
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-amber-400 transition-colors">
                    {speaker.name}
                  </h3>
                  <p className="text-amber-400 text-sm mb-1">{speaker.title}</p>
                  <p className="text-slate-500 text-sm mb-3">{speaker.organization}</p>
                  <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs">
                    {speaker.topic}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Other Speakers */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {SPEAKERS.filter((s) => !s.featured).map((speaker, idx) => (
              <Card
                key={idx}
                className="bg-slate-800/30 border-slate-700/30 hover:bg-slate-800/50 transition-all"
              >
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center shrink-0">
                    <Users className="w-6 h-6 text-slate-500" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-white font-medium truncate">{speaker.name}</h4>
                    <p className="text-slate-400 text-sm truncate">{speaker.organization}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              Ver los 80+ Conferencistas
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Tickets Section */}
      <section id="registro" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 mb-4">
              <Ticket className="w-3 h-3 mr-1" /> Inscripciones
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Elige tu Experiencia
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Tres opciones diseñadas para diferentes necesidades
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {EVENT_DATA.tickets.map((ticket, idx) => (
              <Card
                key={idx}
                className={`relative overflow-hidden transition-all duration-300 ${
                  ticket.popular
                    ? "bg-gradient-to-b from-amber-500/20 to-slate-800 border-amber-500/50 scale-105 shadow-xl shadow-amber-500/10"
                    : "bg-slate-800/50 border-slate-700/50 hover:border-amber-500/30"
                }`}
              >
                {ticket.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-amber-500 text-black text-center py-1 text-sm font-semibold">
                    Más Popular
                  </div>
                )}
                <CardHeader className={ticket.popular ? "pt-10" : ""}>
                  <CardTitle className="text-white text-xl">{ticket.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-white">{formatPrice(ticket.price)}</span>
                    <span className="text-slate-400 ml-2">MXN</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {ticket.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-start gap-3 text-slate-300">
                        <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center shrink-0 mt-0.5">
                          <svg
                            className="w-3 h-3 text-green-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${
                      ticket.popular
                        ? "bg-amber-500 hover:bg-amber-600 text-black"
                        : "bg-white/10 hover:bg-white/20 text-white"
                    }`}
                  >
                    Inscribirme
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="text-center text-slate-500 mt-8 text-sm">
            Precios en pesos mexicanos. Factura disponible. Opciones de pago: Tarjeta, transferencia, PayPal.
          </p>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="py-20 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 mb-4">
              <Briefcase className="w-3 h-3 mr-1" /> Patrocinadores
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Empresas que nos Apoyan
            </h2>
          </div>

          {/* Platinum */}
          <div className="mb-12">
            <h3 className="text-center text-slate-400 uppercase tracking-wider text-sm mb-6">
              Platinum
            </h3>
            <div className="flex flex-wrap justify-center gap-8">
              {SPONSORS.platinum.map((sponsor, idx) => (
                <div
                  key={idx}
                  className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-8 w-64 h-32 flex items-center justify-center hover:border-amber-500/30 transition-all"
                >
                  <span className="text-white font-semibold text-lg">{sponsor.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Gold */}
          <div className="mb-12">
            <h3 className="text-center text-slate-400 uppercase tracking-wider text-sm mb-6">
              Gold
            </h3>
            <div className="flex flex-wrap justify-center gap-6">
              {SPONSORS.gold.map((sponsor, idx) => (
                <div
                  key={idx}
                  className="bg-slate-800/30 border border-slate-700/30 rounded-xl p-6 w-48 h-24 flex items-center justify-center hover:border-amber-500/30 transition-all"
                >
                  <span className="text-slate-300 font-medium">{sponsor.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Silver */}
          <div>
            <h3 className="text-center text-slate-400 uppercase tracking-wider text-sm mb-6">
              Silver
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {SPONSORS.silver.map((sponsor, idx) => (
                <div
                  key={idx}
                  className="bg-slate-800/20 border border-slate-700/20 rounded-lg p-4 w-40 h-16 flex items-center justify-center hover:border-slate-600 transition-all"
                >
                  <span className="text-slate-400 text-sm">{sponsor.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact/Organizer Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-amber-500/10 to-slate-800 border-amber-500/20 max-w-4xl mx-auto">
            <CardContent className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <Badge className="bg-white/10 text-white border-white/20 mb-4">
                    <Building2 className="w-3 h-3 mr-1" /> Organizador
                  </Badge>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    {EVENT_DATA.organizer.name}
                  </h2>
                  <p className="text-slate-400 mb-6">
                    Fundada en {EVENT_DATA.organizer.founded}. El colegio de abogados más prestigioso de México,
                    comprometido con la excelencia en la práctica jurídica.
                  </p>
                  <div className="space-y-3">
                    <a
                      href={`tel:${EVENT_DATA.organizer.phone}`}
                      className="flex items-center gap-3 text-slate-300 hover:text-amber-400 transition-colors"
                    >
                      <Phone className="w-5 h-5" />
                      {EVENT_DATA.organizer.phone}
                    </a>
                    <a
                      href={`mailto:${EVENT_DATA.organizer.email}`}
                      className="flex items-center gap-3 text-slate-300 hover:text-amber-400 transition-colors"
                    >
                      <Mail className="w-5 h-5" />
                      {EVENT_DATA.organizer.email}
                    </a>
                    <a
                      href={EVENT_DATA.organizer.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-slate-300 hover:text-amber-400 transition-colors"
                    >
                      <Globe className="w-5 h-5" />
                      www.bma.org.mx
                    </a>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <Link href="https://congresobma2026.com/" target="_blank">
                    <Button size="lg" className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold">
                      <ExternalLink className="w-5 h-5 mr-2" />
                      Sitio Oficial del Congreso
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Contactar Organizadores
                  </Button>
                  <Button size="lg" variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                    <FileText className="w-5 h-5 mr-2" />
                    Descargar Programa PDF
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-amber-950/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            ¿Nos vemos en Monterrey?
          </h2>
          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Sé parte de la comunidad jurídica más influyente de México.
            Los cupos son limitados.
          </p>
          <Link href="#registro">
            <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-black font-semibold text-lg px-12 h-16">
              <Ticket className="w-6 h-6 mr-2" />
              Reservar mi Lugar
            </Button>
          </Link>
          <p className="text-slate-500 mt-4 text-sm">
            Inscríbete antes del 31 de enero y obtén 10% de descuento
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <Scale className="w-8 h-8 text-amber-500" />
              <div>
                <div className="font-bold text-white">BMA 2026</div>
                <div className="text-sm text-slate-500">XX Congreso Nacional</div>
              </div>
            </div>
            <div className="flex gap-6 text-sm text-slate-500">
              <Link href="#" className="hover:text-amber-400 transition-colors">
                Privacidad
              </Link>
              <Link href="#" className="hover:text-amber-400 transition-colors">
                Términos
              </Link>
              <Link href="#" className="hover:text-amber-400 transition-colors">
                Código de Conducta
              </Link>
            </div>
            <div className="text-sm text-slate-500">
              © 2026 Barra Mexicana de Abogados
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
