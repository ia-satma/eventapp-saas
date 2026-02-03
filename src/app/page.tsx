import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Users,
  MapPin,
  Network,
  Trophy,
  ArrowRight,
  Sparkles,
  Shield,
  Zap,
  Scale,
  Ticket,
  Star,
} from "lucide-react";

export default function Home() {
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
            <Link href="/events" className="text-sm text-slate-400 hover:text-white transition-colors">
              Eventos
            </Link>
            <Link href="/evento" className="text-sm text-amber-400 hover:text-amber-300 transition-colors">
              BMA 2026
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

      {/* Featured Event Banner */}
      <section className="bg-gradient-to-r from-amber-500/10 via-slate-900 to-amber-500/10 border-b border-amber-500/20">
        <div className="container mx-auto px-4 py-4">
          <Link href="/evento" className="flex items-center justify-center gap-4 group">
            <Badge className="bg-amber-500 text-black">
              <Star className="w-3 h-3 mr-1" /> Destacado
            </Badge>
            <span className="text-white font-medium group-hover:text-amber-400 transition-colors">
              XX Congreso Nacional de Abogados BMA 2026
            </span>
            <span className="text-slate-400">19-21 Feb • Monterrey</span>
            <ArrowRight className="w-4 h-4 text-amber-500 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Hero */}
      <section className="container mx-auto px-4 py-24 text-center">
        <Badge className="mb-4 bg-amber-500/20 text-amber-300 border-amber-500/30">
          <Sparkles className="w-3 h-3 mr-1" />
          Plataforma de Eventos con IA
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">
          La forma inteligente de
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
            gestionar eventos
          </span>
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-8">
          Registro sin fricción, networking con IA, navegación indoor y analíticas en tiempo real.
          Todo en una plataforma diseñada para el éxito de tu evento.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/evento">
            <Button size="lg" className="gap-2 bg-amber-500 hover:bg-amber-600 text-black font-semibold">
              <Ticket className="w-5 h-5" />
              Ver Congreso BMA 2026
            </Button>
          </Link>
          <Link href="/events">
            <Button size="lg" variant="outline" className="border-slate-700 text-white hover:bg-slate-800">
              Explorar Eventos
            </Button>
          </Link>
        </div>
      </section>

      {/* Quick Event Preview */}
      <section className="container mx-auto px-4 py-12">
        <Link href="/evento">
          <Card className="bg-gradient-to-r from-slate-800/50 to-amber-900/20 border-amber-500/30 hover:border-amber-500/50 transition-all duration-300 overflow-hidden group cursor-pointer">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-24 h-24 rounded-2xl bg-amber-500/20 flex items-center justify-center shrink-0">
                  <Scale className="w-12 h-12 text-amber-500" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <Badge className="mb-2 bg-green-500/20 text-green-400 border-green-500/30">
                    Inscripciones Abiertas
                  </Badge>
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                    XX Congreso Nacional de Abogados BMA 2026
                  </h3>
                  <p className="text-amber-200/80 mb-4">"Derecho y justicia en tiempos de reformas"</p>
                  <div className="flex flex-wrap gap-4 text-slate-400 justify-center md:justify-start">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-amber-500" />
                      19-21 Feb 2026
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-amber-500" />
                      Parque Fundidora, Monterrey
                    </span>
                    <span className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-amber-500" />
                      600+ asistentes
                    </span>
                  </div>
                </div>
                <Button className="bg-amber-500 hover:bg-amber-600 text-black font-semibold shrink-0">
                  Ver Detalles
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </Link>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 text-white">Todo lo que necesitas</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Funcionalidades diseñadas para crear experiencias memorables
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={Users}
            title="Registro Inteligente"
            description="Formularios con lógica condicional, perfilado progresivo y validación en tiempo real."
          />
          <FeatureCard
            icon={Calendar}
            title="Agenda con IA"
            description="Recomendaciones personalizadas, detección de conflictos y reservas inteligentes."
          />
          <FeatureCard
            icon={Network}
            title="Networking con IA"
            description="Matchmaking estilo Tinder basado en intereses, objetivos y compatibilidad."
          />
          <FeatureCard
            icon={MapPin}
            title="Navegación Indoor"
            description="Mapas interactivos con beacons, rutas paso a paso y modo contextual."
          />
          <FeatureCard
            icon={Trophy}
            title="Gamificación"
            description="Sistema de puntos, misiones de networking y leaderboards en tiempo real."
          />
          <FeatureCard
            icon={Zap}
            title="Analytics en Vivo"
            description="Métricas de asistencia, mapas de calor y dashboards para organizadores."
          />
        </div>
      </section>

      {/* Security */}
      <section className="container mx-auto px-4 py-24">
        <Card className="bg-amber-500/5 border-amber-500/20">
          <CardContent className="p-12 flex flex-col md:flex-row items-center gap-8">
            <div className="w-20 h-20 rounded-full bg-amber-500/10 flex items-center justify-center">
              <Shield className="w-10 h-10 text-amber-500" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2 text-white">Seguridad Multi-Tenant</h3>
              <p className="text-slate-400 max-w-2xl">
                Aislamiento de datos a nivel de base de datos con Row-Level Security (RLS).
                Cada organizador tiene sus datos completamente separados y protegidos.
              </p>
            </div>
            <Link href="/security">
              <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800">
                Saber más
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-3xl font-bold mb-4 text-white">¿Listo para comenzar?</h2>
        <p className="text-slate-400 mb-8">
          Crea tu primer evento en minutos
        </p>
        <Link href="/register">
          <Button size="lg" className="gap-2 bg-amber-500 hover:bg-amber-600 text-black font-semibold">
            Empezar Gratis <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold mb-4 text-white">Producto</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><Link href="/features" className="hover:text-amber-400 transition-colors">Funcionalidades</Link></li>
                <li><Link href="/pricing" className="hover:text-amber-400 transition-colors">Precios</Link></li>
                <li><Link href="/evento" className="hover:text-amber-400 transition-colors">Demo BMA 2026</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Recursos</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><Link href="/docs" className="hover:text-amber-400 transition-colors">Documentación</Link></li>
                <li><Link href="/api" className="hover:text-amber-400 transition-colors">API</Link></li>
                <li><Link href="/guides" className="hover:text-amber-400 transition-colors">Guías</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Empresa</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><Link href="/about" className="hover:text-amber-400 transition-colors">Nosotros</Link></li>
                <li><Link href="/contact" className="hover:text-amber-400 transition-colors">Contacto</Link></li>
                <li><Link href="/careers" className="hover:text-amber-400 transition-colors">Carreras</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><Link href="/privacy" className="hover:text-amber-400 transition-colors">Privacidad</Link></li>
                <li><Link href="/terms" className="hover:text-amber-400 transition-colors">Términos</Link></li>
                <li><Link href="/cookies" className="hover:text-amber-400 transition-colors">Cookies</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm text-slate-500">
            <p>© 2026 EventApp. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Users;
  title: string;
  description: string;
}) {
  return (
    <Card className="group hover:shadow-lg hover:shadow-amber-500/5 transition-all duration-300 bg-slate-800/50 border-slate-700/50 hover:border-amber-500/30">
      <CardHeader>
        <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center mb-4 group-hover:bg-amber-500/20 transition-colors">
          <Icon className="w-6 h-6 text-amber-500" />
        </div>
        <CardTitle className="text-xl text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base text-slate-400">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
