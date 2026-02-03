"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  MapPin,
  Users,
  ArrowRight,
  Scale,
  Search,
  Filter,
} from "lucide-react";
import { Input } from "@/components/ui/input";

const EVENTS = [
  {
    id: "bma-2026",
    slug: "evento",
    name: "XX Congreso Nacional de Abogados BMA 2026",
    tagline: "Derecho y justicia en tiempos de reformas",
    dates: "19-21 Feb 2026",
    location: "Monterrey, NL",
    venue: "Parque Fundidora - Nave Lewis",
    attendees: 600,
    image: "/events/bma-2026.jpg",
    status: "open",
    category: "Congreso",
    featured: true,
  },
  {
    id: "forum-fiscal-2026",
    slug: "#",
    name: "Forum Fiscal Internacional 2026",
    tagline: "Tendencias globales en fiscalidad",
    dates: "15-16 Mar 2026",
    location: "CDMX",
    venue: "Centro Citibanamex",
    attendees: 400,
    image: "/events/forum-fiscal.jpg",
    status: "coming_soon",
    category: "Forum",
    featured: false,
  },
  {
    id: "cumbre-litigio-2026",
    slug: "#",
    name: "Cumbre de Litigio Estratégico",
    tagline: "Estrategias que transforman el derecho",
    dates: "20-21 Abr 2026",
    location: "Guadalajara, JAL",
    venue: "Expo Guadalajara",
    attendees: 350,
    image: "/events/cumbre-litigio.jpg",
    status: "coming_soon",
    category: "Cumbre",
    featured: false,
  },
];

function getStatusBadge(status: string) {
  switch (status) {
    case "open":
      return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Inscripciones Abiertas</Badge>;
    case "coming_soon":
      return <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">Próximamente</Badge>;
    case "sold_out":
      return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Agotado</Badge>;
    default:
      return null;
  }
}

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Scale className="w-6 h-6 text-amber-500" />
            <span className="font-bold text-xl text-white">EventApp</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/events" className="text-sm text-amber-400">
              Eventos
            </Link>
            <Link href="/login">
              <Button variant="outline" size="sm" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                Iniciar Sesión
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-black">
                Crear Cuenta
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 border-b border-slate-800">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Eventos <span className="text-amber-500">Jurídicos</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mb-8">
            Descubre los mejores congresos, foros y cumbres del mundo legal en México
          </p>

          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <Input
                placeholder="Buscar eventos..."
                className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
              />
            </div>
            <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Event */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-sm uppercase tracking-wider text-amber-500 mb-6 font-semibold">
            Evento Destacado
          </h2>

          {EVENTS.filter((e) => e.featured).map((event) => (
            <Link href={`/${event.slug}`} key={event.id}>
              <Card className="bg-gradient-to-r from-amber-500/10 to-slate-800 border-amber-500/30 hover:border-amber-500/50 transition-all duration-300 overflow-hidden group cursor-pointer">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-2 gap-0">
                    {/* Image placeholder */}
                    <div className="aspect-video md:aspect-auto bg-gradient-to-br from-amber-600/20 to-slate-800 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
                      <Scale className="w-24 h-24 text-amber-500/30" />
                      <div className="absolute top-4 left-4">
                        {getStatusBadge(event.status)}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 flex flex-col justify-center">
                      <Badge className="w-fit mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30">
                        {event.category}
                      </Badge>
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                        {event.name}
                      </h3>
                      <p className="text-amber-200/80 mb-4">"{event.tagline}"</p>

                      <div className="flex flex-wrap gap-4 text-slate-400 mb-6">
                        <span className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-amber-500" />
                          {event.dates}
                        </span>
                        <span className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-amber-500" />
                          {event.location}
                        </span>
                        <span className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-amber-500" />
                          {event.attendees}+ asistentes
                        </span>
                      </div>

                      <Button className="w-fit bg-amber-500 hover:bg-amber-600 text-black font-semibold group-hover:translate-x-1 transition-transform">
                        Ver Evento
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Other Events */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-sm uppercase tracking-wider text-slate-500 mb-6 font-semibold">
            Próximos Eventos
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EVENTS.filter((e) => !e.featured).map((event) => (
              <Card
                key={event.id}
                className="bg-slate-800/50 border-slate-700/50 hover:border-slate-600 transition-all duration-300 overflow-hidden group"
              >
                <div className="aspect-video bg-gradient-to-br from-slate-700/50 to-slate-800 flex items-center justify-center relative">
                  <Scale className="w-12 h-12 text-slate-600" />
                  <div className="absolute top-3 left-3">
                    {getStatusBadge(event.status)}
                  </div>
                </div>
                <CardContent className="p-6">
                  <Badge className="mb-3 bg-slate-700 text-slate-300 border-slate-600">
                    {event.category}
                  </Badge>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                    {event.name}
                  </h3>
                  <p className="text-slate-400 text-sm mb-4">"{event.tagline}"</p>

                  <div className="flex flex-col gap-2 text-sm text-slate-500 mb-4">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {event.dates}
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {event.location}
                    </span>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
                    disabled={event.status === "coming_soon"}
                  >
                    {event.status === "coming_soon" ? "Próximamente" : "Ver Detalles"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-slate-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            ¿Organizas eventos jurídicos?
          </h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            Gestiona tu evento con nuestra plataforma: registro, agenda, networking y analíticas en tiempo real.
          </p>
          <Button className="bg-amber-500 hover:bg-amber-600 text-black font-semibold">
            Crear mi Evento
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8">
        <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
          © 2026 EventApp. Plataforma de gestión de eventos con IA.
        </div>
      </footer>
    </div>
  );
}
