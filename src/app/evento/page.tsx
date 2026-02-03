"use client";

import Link from "next/link";
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
  ExternalLink,
  Phone,
  Mail,
  Globe,
  Star,
  Shield,
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
  Check,
  Hotel,
  Car,
  Wifi,
  UtensilsCrossed,
  Dumbbell,
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
  name: "XX Congreso Nacional de la Abogacía",
  tagline: "Derecho y justicia en tiempos de reformas",
  description: "El epicentro del liderazgo jurídico en México. Únete a más de 600 participantes y 80 conferencistas destacados en el evento legal más importante del país.",
  dates: {
    start: "19 de febrero de 2026",
    end: "21 de febrero de 2026",
    year: 2026,
  },
  location: {
    venue: "Cintermex",
    address: "Av. Fundidora 501, Obrera",
    city: "Monterrey, Nuevo León",
    postalCode: "64010",
    country: "México",
  },
  organizer: {
    name: "Barra Mexicana, Colegio de Abogados A.C.",
    founded: 1922,
    phone: "55 5208-3115",
    email: "acruz@bma.org.mx",
    website: "https://www.bma.org.mx",
  },
};

// Hoteles sede
const HOTELS = [
  {
    name: "Hilton Monterrey Valle",
    stars: 5,
    distance: "10 min del venue",
    address: "Av. Diego Rivera 500, Valle Oriente",
    features: ["Transporte incluido", "Desayuno buffet", "WiFi gratis", "Gym y Spa"],
    priceRange: "Desde $2,800/noche",
    phone: "+52 81 8133 7300",
    website: "https://www.hilton.com",
    image: "/hotels/hilton.jpg",
  },
  {
    name: "Westin Monterrey Valle",
    stars: 5,
    distance: "12 min del venue",
    address: "Av. Diego Rivera 1000, Valle Oriente",
    features: ["Transporte incluido", "Heavenly Bed", "WiFi gratis", "Restaurante gourmet"],
    priceRange: "Desde $2,600/noche",
    phone: "+52 81 8368 6000",
    website: "https://www.marriott.com",
    image: "/hotels/westin.jpg",
  },
  {
    name: "Camino Real Monterrey",
    stars: 5,
    distance: "8 min del venue",
    address: "Av. Diego Rivera 2000, Valle Oriente",
    features: ["Transporte incluido", "Pool & Gym", "WiFi gratis", "Business Center"],
    priceRange: "Desde $2,200/noche",
    phone: "+52 81 8368 1000",
    website: "https://www.caminoreal.com",
    image: "/hotels/camino.jpg",
  },
];

// Paquetes resumidos para la landing
const PACKAGES_PREVIEW = [
  {
    name: "TODO INCLUIDO",
    priceBarrista: "$14,000",
    priceNoBarrista: "$16,000 + IVA",
    features: ["Sesiones académicas", "Cena de Gala", "Comidas 3 días", "Transporte", "Kit completo"],
    popular: true,
  },
  {
    name: "SESIONES ACADÉMICAS",
    priceBarrista: "$12,000",
    priceNoBarrista: "$13,500 + IVA",
    features: ["Sesiones académicas", "Coffee breaks", "Material digital", "Certificado"],
    popular: false,
  },
  {
    name: "ACOMPAÑANTES",
    priceBarrista: "$7,300",
    priceNoBarrista: "$9,000 + IVA",
    features: ["Cena de Gala", "Comidas 3 días", "Tours recreativos", "Transporte"],
    popular: false,
  },
];

// Agenda del evento
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
        panelists: ["Dr. Diego Valadés", "Mtra. Ana Laura Magaloni", "Lic. Juan Luis González"],
        icon: Users,
      },
      {
        time: "13:00 - 15:00",
        title: "Comida",
        type: "social",
        location: "Restaurante Principal",
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
        time: "19:00 - 22:00",
        title: "Cóctel de Bienvenida",
        type: "social",
        location: "Terraza",
        description: "Evento de networking con música en vivo.",
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
        icon: Monitor,
      },
      {
        time: "10:30 - 11:00",
        title: "Coffee Break & Demo Zone",
        type: "networking",
        location: "Área de Exposición",
        icon: Coffee,
      },
      {
        time: "11:00 - 13:00",
        title: "Panel: LegalTech - Casos de Éxito en México",
        type: "panel",
        location: "Auditorio Principal",
        icon: Network,
      },
      {
        time: "13:00 - 15:00",
        title: "Comida de Networking por Especialidad",
        type: "social",
        location: "Mesas Temáticas",
        icon: Utensils,
      },
      {
        time: "15:00 - 18:30",
        title: "Sesiones Paralelas y Workshops",
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
        time: "20:00 - 00:00",
        title: "Cena de Gala",
        type: "gala",
        location: "Salón Monterrey",
        description: "Cena formal con premiación a la trayectoria y baile.",
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
        icon: Landmark,
      },
      {
        time: "13:00 - 14:30",
        title: "Brunch de Clausura",
        type: "social",
        location: "Terraza",
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
        description: "Recorrido opcional (incluido en paquete Todo Incluido).",
        icon: Camera,
      },
    ],
  },
};

function getSessionColor(type: string) {
  const colors: Record<string, string> = {
    magistral: "bg-primary/10 text-primary border-primary/30",
    panel: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30",
    paralelas: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/30",
    workshop: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/30",
    networking: "bg-accent/20 text-accent-foreground border-accent/30",
    social: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/30",
    gala: "bg-primary/10 text-primary border-primary/30",
    registro: "bg-muted text-muted-foreground border-border",
    ceremonia: "bg-primary/10 text-primary border-primary/30",
    asamblea: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30",
  };
  return colors[type] || "bg-muted text-muted-foreground border-border";
}

export default function EventoPage() {
  const [selectedDay, setSelectedDay] = useState("19-feb");

  return (
    <div className="min-h-screen bg-background">
      {/* Header/Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur-lg">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo BMA */}
            <Link href="/evento" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Scale className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="hidden sm:block">
                <div className="text-foreground font-bold leading-tight">Barra Mexicana</div>
                <div className="text-accent-foreground text-xs font-medium">Colegio de Abogados</div>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link href="#programa" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Programa
              </Link>
              <Link href="#hoteles" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Hoteles
              </Link>
              <Link href="#paquetes" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Paquetes
              </Link>
              <Link href="https://www.bma.org.mx" target="_blank" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                BMA.org.mx <ExternalLink className="w-3 h-3" />
              </Link>
            </nav>

            {/* CTA */}
            <div className="flex items-center gap-3">
              <Link href="/admin/asistentes" className="hidden sm:block">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  Admin
                </Button>
              </Link>
              <Link href="/inscripcion">
                <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                  <Ticket className="w-4 h-4 mr-1" />
                  Inscribirme
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

        <div className="relative container mx-auto px-4 py-20 md:py-28">
          {/* Badges */}
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            <Badge className="bg-primary/10 text-primary border-primary/30 px-4 py-1">
              <Scale className="w-3 h-3 mr-1" /> XX Edición
            </Badge>
            <Badge variant="outline" className="px-4 py-1">
              <Calendar className="w-3 h-3 mr-1" /> 19-21 Feb 2026
            </Badge>
            <Badge variant="outline" className="px-4 py-1">
              <MapPin className="w-3 h-3 mr-1" /> Monterrey, NL
            </Badge>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center text-foreground mb-6 tracking-tight">
            XX Congreso Nacional
            <br />
            <span className="text-primary">de la Abogacía</span>
          </h1>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-muted-foreground text-center mb-4 font-light">
            "{EVENT_DATA.tagline}"
          </p>

          {/* Description */}
          <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
            {EVENT_DATA.description}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
            {[
              { icon: Users, value: "600+", label: "Asistentes" },
              { icon: Mic, value: "80+", label: "Conferencistas" },
              { icon: BookOpen, value: "45+", label: "Sesiones" },
              { icon: Network, value: "20+", label: "Hrs Networking" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="bg-card border border-border rounded-2xl p-6 text-center"
              >
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/inscripcion">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg px-8 h-14">
                <Ticket className="w-5 h-5 mr-2" />
                Inscribirme Ahora
              </Button>
            </Link>
            <Link href="#programa">
              <Button size="lg" variant="outline" className="text-lg px-8 h-14">
                <Calendar className="w-5 h-5 mr-2" />
                Ver Programa
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-primary/10 text-primary border-primary/30 mb-4">
                <MapPin className="w-3 h-3 mr-1" /> Sede del Evento
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                {EVENT_DATA.location.venue}
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-primary mt-1" />
                  <span>
                    {EVENT_DATA.location.address}
                    <br />
                    {EVENT_DATA.location.city}, CP {EVENT_DATA.location.postalCode}
                  </span>
                </p>
                <p className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary mt-1" />
                  <span>
                    <strong className="text-foreground">Fechas:</strong> {EVENT_DATA.dates.start} al {EVENT_DATA.dates.end}
                  </span>
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video bg-muted rounded-2xl overflow-hidden border border-border">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3596.0044682244344!2d-100.28420532547844!3d25.678400477443095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8662bf89d5e08d03%3A0x7a5f9c2b4e8c8d0a!2sCintermex!5e0!3m2!1sen!2smx!4v1706900000000!5m2!1sen!2smx"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="opacity-90 hover:opacity-100 transition-all duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programa/Agenda Section */}
      <section id="programa" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-primary/10 text-primary border-primary/30 mb-4">
              <Calendar className="w-3 h-3 mr-1" /> Programa
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Agenda del Congreso
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Tres días intensivos de conocimiento, networking y experiencias inolvidables
            </p>
          </div>

          {/* Day Tabs */}
          <Tabs value={selectedDay} onValueChange={setSelectedDay} className="w-full">
            <TabsList className="grid grid-cols-3 max-w-2xl mx-auto mb-8 bg-muted p-1 rounded-xl">
              {Object.entries(AGENDA).map(([key, day]) => (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg py-3"
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
                  <Badge variant="secondary">
                    <BookOpen className="w-3 h-3 mr-1" /> {day.theme}
                  </Badge>
                </div>
                <div className="space-y-4 max-w-4xl mx-auto">
                  {day.sessions.map((session, idx) => (
                    <Card
                      key={idx}
                      className={`hover:border-primary/30 transition-all duration-300 overflow-hidden ${
                        session.type === "magistral" || session.type === "gala"
                          ? "border-l-4 border-l-primary"
                          : ""
                      }`}
                    >
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-start gap-4">
                          {/* Time */}
                          <div className="flex items-center gap-3 md:w-36 shrink-0">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <session.icon className="w-5 h-5 text-primary" />
                            </div>
                            <span className="text-primary font-mono text-sm">{session.time}</span>
                          </div>

                          {/* Content */}
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <Badge className={`${getSessionColor(session.type)} text-xs`}>
                                {session.type.charAt(0).toUpperCase() + session.type.slice(1)}
                              </Badge>
                              <span className="text-muted-foreground text-sm flex items-center gap-1">
                                <MapPin className="w-3 h-3" /> {session.location}
                              </span>
                            </div>
                            <h3 className="text-lg font-semibold text-foreground mb-2">
                              {session.title}
                            </h3>
                            {session.speaker && (
                              <p className="text-primary text-sm mb-2 flex items-center gap-1">
                                <Mic className="w-3 h-3" /> {session.speaker}
                              </p>
                            )}
                            {session.panelists && (
                              <p className="text-muted-foreground text-sm mb-2">
                                <Users className="w-3 h-3 inline mr-1" />
                                {session.panelists.join(" • ")}
                              </p>
                            )}
                            {session.description && (
                              <p className="text-muted-foreground text-sm">{session.description}</p>
                            )}
                            {session.tracks && (
                              <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2">
                                {session.tracks.map((track, tidx) => (
                                  <div
                                    key={tidx}
                                    className="bg-green-500/10 border border-green-500/20 rounded-lg px-3 py-2 text-xs"
                                  >
                                    <span className="text-green-600 dark:text-green-400 font-medium">{track.name}</span>
                                    <br />
                                    <span className="text-muted-foreground">{track.room}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                            {session.dresscode && (
                              <Badge className="mt-2 bg-primary/10 text-primary">
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

      {/* Hotels Section */}
      <section id="hoteles" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-primary/10 text-primary border-primary/30 mb-4">
              <Hotel className="w-3 h-3 mr-1" /> Hospedaje
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Hoteles Sede
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Tarifas preferenciales para asistentes del congreso. Incluye transporte al venue.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {HOTELS.map((hotel, idx) => (
              <Card key={idx} className="hover:border-primary/30 transition-all">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    {[...Array(hotel.stars)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <CardTitle className="text-xl">{hotel.name}</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {hotel.distance}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{hotel.address}</p>

                  <div className="space-y-2">
                    {hotel.features.map((feature, fidx) => (
                      <div key={fidx} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-green-500" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-border">
                    <p className="text-lg font-semibold text-primary">{hotel.priceRange}</p>
                    <p className="text-xs text-muted-foreground">Tarifa preferencial congresistas</p>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Phone className="w-3 h-3 mr-1" />
                      Llamar
                    </Button>
                    <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Reservar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Packages/Tickets Section */}
      <section id="paquetes" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-primary/10 text-primary border-primary/30 mb-4">
              <Ticket className="w-3 h-3 mr-1" /> Inscripciones
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Paquetes Disponibles
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Precios especiales para Barristas. Inscripción temprana hasta el 31 de diciembre.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-8">
            {PACKAGES_PREVIEW.map((pkg, idx) => (
              <Card
                key={idx}
                className={`relative overflow-hidden transition-all duration-300 ${
                  pkg.popular
                    ? "border-primary shadow-lg shadow-primary/10 scale-105"
                    : "hover:border-primary/30"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-primary text-primary-foreground text-center py-1 text-sm font-semibold">
                    Más Popular
                  </div>
                )}
                <CardHeader className={pkg.popular ? "pt-10" : ""}>
                  <CardTitle className="text-xl">{pkg.name}</CardTitle>
                  <div className="mt-4 space-y-1">
                    <div>
                      <span className="text-2xl font-bold text-foreground">{pkg.priceBarrista}</span>
                      <span className="text-sm text-muted-foreground ml-2">Barrista</span>
                    </div>
                    <div>
                      <span className="text-lg text-muted-foreground">{pkg.priceNoBarrista}</span>
                      <span className="text-xs text-muted-foreground ml-2">No Barrista</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {pkg.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link href="/inscripcion">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                <Ticket className="w-5 h-5 mr-2" />
                Ver Precios y Registrarme
              </Button>
            </Link>
            <p className="text-sm text-muted-foreground mt-4">
              Precios en pesos mexicanos. Barristas incluyen IVA.
            </p>
          </div>
        </div>
      </section>

      {/* Contact/Organizer Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-primary/5 to-card border-primary/20 max-w-4xl mx-auto">
            <CardContent className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <Badge variant="outline" className="mb-4">
                    <Building2 className="w-3 h-3 mr-1" /> Organizador
                  </Badge>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                    {EVENT_DATA.organizer.name}
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Fundada en {EVENT_DATA.organizer.founded}. El colegio de abogados más prestigioso de México.
                  </p>
                  <div className="space-y-3">
                    <a
                      href={`tel:${EVENT_DATA.organizer.phone}`}
                      className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Phone className="w-5 h-5" />
                      {EVENT_DATA.organizer.phone}
                    </a>
                    <a
                      href={`mailto:${EVENT_DATA.organizer.email}`}
                      className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Mail className="w-5 h-5" />
                      {EVENT_DATA.organizer.email}
                    </a>
                    <a
                      href={EVENT_DATA.organizer.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Globe className="w-5 h-5" />
                      www.bma.org.mx
                    </a>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <Link href="https://congresobma2026.com/" target="_blank">
                    <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                      <ExternalLink className="w-5 h-5 mr-2" />
                      Sitio Oficial del Congreso
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline" className="w-full">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Contactar Organizadores
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-b from-background to-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            ¿Nos vemos en Monterrey?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Sé parte de la comunidad jurídica más influyente de México.
          </p>
          <Link href="/inscripcion">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg px-12 h-16">
              <Ticket className="w-6 h-6 mr-2" />
              Reservar mi Lugar
            </Button>
          </Link>
          <p className="text-muted-foreground mt-4 text-sm">
            Precio temprano hasta el 31 de diciembre de 2025
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Scale className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <div className="font-bold text-foreground">BMA 2026</div>
                <div className="text-sm text-muted-foreground">XX Congreso Nacional</div>
              </div>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-primary transition-colors">
                Privacidad
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                Términos
              </Link>
              <Link href="/admin/asistentes" className="hover:text-primary transition-colors">
                Admin
              </Link>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2026 Barra Mexicana, Colegio de Abogados A.C.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
