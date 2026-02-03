"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Scale,
  Calendar,
  Users,
  MapPin,
  Bell,
  Settings,
  LogOut,
  Ticket,
  Star,
  Clock,
  ChevronRight,
  TrendingUp,
  MessageSquare,
  Network,
  Award,
  QrCode,
} from "lucide-react";

// Datos de ejemplo del usuario
const USER = {
  name: "Carlos Rodríguez",
  email: "carlos@despacho.mx",
  avatar: null,
  role: "Asistente",
};

// Eventos registrados del usuario
const REGISTERED_EVENTS = [
  {
    id: "bma-2026",
    name: "XX Congreso Nacional de Abogados BMA 2026",
    dates: "19-21 Feb 2026",
    location: "Monterrey, NL",
    ticketType: "Todo Incluido",
    status: "confirmed",
    qrCode: "BMA2026-CR-001234",
  },
];

// Sesiones guardadas
const SAVED_SESSIONS = [
  {
    id: 1,
    title: "Conferencia Magistral: El Estado de Derecho ante las Reformas",
    speaker: "Min. Norma Lucía Piña Hernández",
    time: "09:30 - 10:30",
    day: "Jueves 19",
    room: "Auditorio Principal",
  },
  {
    id: 2,
    title: "Panel: Reforma Judicial - Retos y Oportunidades",
    speaker: "Dr. Diego Valadés y más",
    time: "11:00 - 13:00",
    day: "Jueves 19",
    room: "Auditorio Principal",
  },
  {
    id: 3,
    title: "Workshop: Herramientas de IA para Abogados",
    speaker: "Equipo LegalTech BMA",
    time: "17:00 - 18:30",
    day: "Viernes 20",
    room: "Sala de Capacitación",
  },
];

// Matches de networking
const NETWORKING_MATCHES = [
  {
    id: 1,
    name: "María García López",
    title: "Socia - Derecho Corporativo",
    company: "Baker McKenzie",
    compatibility: 92,
    interests: ["M&A", "Compliance", "IA Legal"],
  },
  {
    id: 2,
    name: "Roberto Sánchez M.",
    title: "Director Jurídico",
    company: "Grupo FEMSA",
    compatibility: 87,
    interests: ["Fiscal", "Corporativo", "ESG"],
  },
  {
    id: 3,
    name: "Ana Martínez R.",
    title: "Fundadora",
    company: "LegalTech Mx",
    compatibility: 85,
    interests: ["LegalTech", "Startups", "Innovación"],
  },
];

export default function DashboardPage() {
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
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
              <Settings className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-700">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                <span className="text-amber-500 font-semibold text-sm">
                  {USER.name.charAt(0)}
                </span>
              </div>
              <div className="hidden md:block">
                <div className="text-sm font-medium text-white">{USER.name}</div>
                <div className="text-xs text-slate-500">{USER.email}</div>
              </div>
            </div>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            ¡Hola, {USER.name.split(" ")[0]}!
          </h1>
          <p className="text-slate-400">
            Bienvenido a tu panel. Aquí puedes gestionar tus eventos y conexiones.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                  <Ticket className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">1</div>
                  <div className="text-xs text-slate-500">Eventos</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">3</div>
                  <div className="text-xs text-slate-500">Sesiones</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <Network className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">3</div>
                  <div className="text-xs text-slate-500">Matches</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <Award className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">250</div>
                  <div className="text-xs text-slate-500">Puntos</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Registered Events */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">Mis Eventos</h2>
                <Link href="/events">
                  <Button variant="ghost" size="sm" className="text-amber-400 hover:text-amber-300">
                    Ver todos
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>

              {REGISTERED_EVENTS.map((event) => (
                <Card
                  key={event.id}
                  className="bg-gradient-to-r from-slate-800/50 to-amber-900/10 border-amber-500/30"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                            Confirmado
                          </Badge>
                          <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                            {event.ticketType}
                          </Badge>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">{event.name}</h3>
                        <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {event.dates}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {event.location}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-24 h-24 bg-white rounded-lg flex items-center justify-center">
                          <QrCode className="w-20 h-20 text-slate-900" />
                        </div>
                        <span className="text-xs text-slate-500 font-mono">{event.qrCode}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4 pt-4 border-t border-slate-700/50">
                      <Link href="/evento" className="flex-1">
                        <Button className="w-full bg-amber-500 hover:bg-amber-600 text-black">
                          Ver Evento
                        </Button>
                      </Link>
                      <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-700">
                        Mi QR
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </section>

            {/* Saved Sessions */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">Mi Agenda</h2>
                <Link href="/evento#agenda">
                  <Button variant="ghost" size="sm" className="text-amber-400 hover:text-amber-300">
                    Ver programa
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>

              <div className="space-y-3">
                {SAVED_SESSIONS.map((session) => (
                  <Card
                    key={session.id}
                    className="bg-slate-800/50 border-slate-700/50 hover:border-slate-600 transition-colors"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0">
                          <Clock className="w-5 h-5 text-blue-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-white truncate">{session.title}</h4>
                          <p className="text-sm text-amber-400">{session.speaker}</p>
                          <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                            <span>{session.day}</span>
                            <span>•</span>
                            <span>{session.time}</span>
                            <span>•</span>
                            <span>{session.room}</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-400">
                          <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Networking Matches */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">Networking</h2>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  3 nuevos
                </Badge>
              </div>

              <div className="space-y-3">
                {NETWORKING_MATCHES.map((match) => (
                  <Card
                    key={match.id}
                    className="bg-slate-800/50 border-slate-700/50 hover:border-green-500/30 transition-colors cursor-pointer"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center shrink-0">
                          <Users className="w-6 h-6 text-slate-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="font-medium text-white truncate">{match.name}</h4>
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs shrink-0">
                              {match.compatibility}%
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-400 truncate">{match.title}</p>
                          <p className="text-xs text-amber-400">{match.company}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {match.interests.slice(0, 2).map((interest, idx) => (
                              <span
                                key={idx}
                                className="text-xs px-2 py-0.5 rounded-full bg-slate-700 text-slate-300"
                              >
                                {interest}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3 pt-3 border-t border-slate-700/50">
                        <Button
                          size="sm"
                          className="flex-1 bg-green-500/20 hover:bg-green-500/30 text-green-400"
                        >
                          Conectar
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-slate-700 text-slate-400 hover:bg-slate-700"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Button
                variant="outline"
                className="w-full mt-4 border-slate-700 text-white hover:bg-slate-800"
              >
                <Network className="w-4 h-4 mr-2" />
                Buscar más conexiones
              </Button>
            </section>

            {/* Gamification */}
            <section>
              <Card className="bg-gradient-to-br from-purple-500/10 to-slate-800 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Award className="w-5 h-5 text-purple-400" />
                    Mis Logros
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className="text-4xl font-bold text-white mb-1">250</div>
                    <div className="text-sm text-slate-400">puntos acumulados</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">Siguiente nivel</span>
                      <span className="text-purple-400">500 pts</span>
                    </div>
                    <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-amber-500 rounded-full"
                        style={{ width: "50%" }}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    <div className="text-center p-2 bg-slate-800/50 rounded-lg">
                      <div className="text-lg">🎫</div>
                      <div className="text-xs text-slate-500">Registro</div>
                    </div>
                    <div className="text-center p-2 bg-slate-800/50 rounded-lg">
                      <div className="text-lg">📅</div>
                      <div className="text-xs text-slate-500">Agenda</div>
                    </div>
                    <div className="text-center p-2 bg-slate-800/50 rounded-lg opacity-50">
                      <div className="text-lg">🤝</div>
                      <div className="text-xs text-slate-500">5 Matches</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Quick Actions */}
            <section>
              <h2 className="text-lg font-bold text-white mb-4">Acciones Rápidas</h2>
              <div className="space-y-2">
                <Link href="/evento">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-slate-700 text-white hover:bg-slate-800"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Ver programa completo
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="w-full justify-start border-slate-700 text-white hover:bg-slate-800"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Mapa del evento
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-slate-700 text-white hover:bg-slate-800"
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Leaderboard
                </Button>
                <Link href="/login">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-red-500/30 text-red-400 hover:bg-red-500/10"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Cerrar sesión
                  </Button>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
