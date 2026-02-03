import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Scale,
  Users,
  Calendar,
  Network,
  MapPin,
  Trophy,
  Zap,
  QrCode,
  Bell,
  BarChart3,
  Shield,
  Globe,
  Smartphone,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Check,
} from "lucide-react";

const FEATURES = [
  {
    icon: Users,
    title: "Registro Inteligente",
    description: "Formularios dinámicos con lógica condicional, perfilado progresivo y validación en tiempo real. Importa perfiles de LinkedIn con un clic.",
    highlights: ["Campos condicionales", "Validación en vivo", "Import LinkedIn"],
  },
  {
    icon: Calendar,
    title: "Agenda con IA",
    description: "Recomendaciones personalizadas basadas en intereses y objetivos. Detección automática de conflictos y sugerencias alternativas.",
    highlights: ["Recomendaciones IA", "Detección conflictos", "Reservas automáticas"],
  },
  {
    icon: Network,
    title: "Networking con IA",
    description: "Matchmaking estilo Tinder basado en intereses, objetivos y compatibilidad. Sistema de doble opt-in para conexiones de calidad.",
    highlights: ["Matchmaking inteligente", "Compatibilidad %", "Chat integrado"],
  },
  {
    icon: MapPin,
    title: "Navegación Indoor",
    description: "Mapas interactivos con tecnología de beacons BLE. Rutas paso a paso, puntos de interés y modo contextual por sala.",
    highlights: ["Mapas interactivos", "Beacons BLE", "Rutas en vivo"],
  },
  {
    icon: Trophy,
    title: "Gamificación",
    description: "Sistema de puntos, misiones de networking y leaderboards en tiempo real. Aumenta el engagement y la participación.",
    highlights: ["Sistema de puntos", "Misiones", "Leaderboards"],
  },
  {
    icon: Zap,
    title: "Analytics en Tiempo Real",
    description: "Dashboards con métricas de asistencia, mapas de calor, engagement por sesión y análisis de networking.",
    highlights: ["Tiempo real", "Mapas de calor", "Exportación datos"],
  },
  {
    icon: QrCode,
    title: "Check-in con QR",
    description: "Códigos QR únicos por asistente. Check-in instantáneo, integración con Apple/Google Wallet y badges digitales.",
    highlights: ["QR único", "Apple Wallet", "Check-in offline"],
  },
  {
    icon: Bell,
    title: "Notificaciones Push",
    description: "Comunicación directa con asistentes. Alertas de sesiones, matches de networking y actualizaciones del evento.",
    highlights: ["Push notifications", "Segmentación", "Programación"],
  },
  {
    icon: Shield,
    title: "Seguridad Multi-Tenant",
    description: "Aislamiento completo de datos con Row-Level Security. Cada organizador tiene su espacio 100% seguro.",
    highlights: ["RLS nativo", "GDPR ready", "Encriptación E2E"],
  },
];

export default function FeaturesPage() {
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
            <Link href="/pricing" className="text-sm text-slate-400 hover:text-white transition-colors">
              Precios
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

      <main className="container mx-auto px-4 py-16">
        {/* Hero */}
        <div className="text-center mb-20">
          <Badge className="mb-4 bg-amber-500/20 text-amber-300 border-amber-500/30">
            <Sparkles className="w-3 h-3 mr-1" />
            Funcionalidades
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Todo lo que necesitas para
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
              eventos extraordinarios
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Tecnología de vanguardia combinada con la mejor experiencia de usuario.
            Diseñado para organizadores exigentes.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {FEATURES.map((feature, idx) => (
            <Card
              key={idx}
              className="bg-slate-800/50 border-slate-700/50 hover:border-amber-500/30 transition-all duration-300 group"
            >
              <CardHeader>
                <div className="w-14 h-14 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4 group-hover:bg-amber-500/20 transition-colors">
                  <feature.icon className="w-7 h-7 text-amber-500" />
                </div>
                <CardTitle className="text-xl text-white">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-400 mb-4">
                  {feature.description}
                </CardDescription>
                <div className="flex flex-wrap gap-2">
                  {feature.highlights.map((h, hidx) => (
                    <span
                      key={hidx}
                      className="text-xs px-2 py-1 rounded-full bg-slate-700 text-slate-300"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Platform Support */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Disponible en todas las plataformas
          </h2>
          <div className="grid grid-cols-3 gap-6">
            <Card className="bg-slate-800/30 border-slate-700/30 text-center p-6">
              <Globe className="w-10 h-10 text-amber-500 mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-1">Web App</h3>
              <p className="text-sm text-slate-400">Acceso desde cualquier navegador</p>
            </Card>
            <Card className="bg-slate-800/30 border-slate-700/30 text-center p-6">
              <Smartphone className="w-10 h-10 text-amber-500 mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-1">iOS & Android</h3>
              <p className="text-sm text-slate-400">Apps nativas optimizadas</p>
            </Card>
            <Card className="bg-slate-800/30 border-slate-700/30 text-center p-6">
              <BarChart3 className="w-10 h-10 text-amber-500 mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-1">Dashboard</h3>
              <p className="text-sm text-slate-400">Panel de control completo</p>
            </Card>
          </div>
        </div>

        {/* Integration */}
        <div className="bg-gradient-to-r from-amber-500/10 to-slate-800 rounded-2xl p-8 md:p-12 mb-20">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <Badge className="mb-4 bg-white/10 text-white">Integraciones</Badge>
              <h2 className="text-3xl font-bold text-white mb-4">
                Conecta con tus herramientas favoritas
              </h2>
              <p className="text-slate-400 mb-6">
                API REST completa, webhooks y SDK para integrar EventApp con tu stack tecnológico.
                Stripe, SendGrid, Slack, HubSpot y más.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Stripe", "SendGrid", "Slack", "HubSpot", "Zapier", "Salesforce"].map((tool) => (
                  <span
                    key={tool}
                    className="px-3 py-1 bg-slate-700/50 rounded-full text-sm text-slate-300"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
            <div className="shrink-0">
              <Link href="/contact">
                <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-black font-semibold">
                  Ver Documentación API
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            ¿Listo para transformar tus eventos?
          </h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            Únete a organizadores que ya confían en EventApp para crear experiencias memorables.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/evento">
              <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-black font-semibold">
                Ver Demo en Vivo
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="border-slate-700 text-white hover:bg-slate-800">
                Ver Precios
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
          © 2026 EventApp. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
