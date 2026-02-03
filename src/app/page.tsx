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
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-6 h-6 text-primary" />
            <span className="font-bold text-xl">EventApp</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/events" className="text-sm text-muted-foreground hover:text-foreground">
              Eventos
            </Link>
            <Link href="/login">
              <Button variant="outline" size="sm">
                Iniciar Sesión
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Crear Cuenta</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="container py-24 text-center">
        <Badge variant="secondary" className="mb-4">
          <Sparkles className="w-3 h-3 mr-1" />
          Plataforma de Eventos con IA
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          La forma inteligente de
          <br />
          <span className="text-primary">gestionar eventos</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Registro sin fricción, networking con IA, navegación indoor y analíticas en tiempo real.
          Todo en una plataforma diseñada para el éxito de tu evento.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/demo">
            <Button size="lg" className="gap-2">
              Ver Demo <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/contact">
            <Button size="lg" variant="outline">
              Contactar Ventas
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="container py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Todo lo que necesitas</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
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
      <section className="container py-24">
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-12 flex flex-col md:flex-row items-center gap-8">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <Shield className="w-10 h-10 text-primary" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2">Seguridad Multi-Tenant</h3>
              <p className="text-muted-foreground max-w-2xl">
                Aislamiento de datos a nivel de base de datos con Row-Level Security (RLS).
                Cada organizador tiene sus datos completamente separados y protegidos.
              </p>
            </div>
            <Link href="/security">
              <Button variant="outline">Saber más</Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* CTA */}
      <section className="container py-24 text-center">
        <h2 className="text-3xl font-bold mb-4">¿Listo para comenzar?</h2>
        <p className="text-muted-foreground mb-8">
          Crea tu primer evento en minutos
        </p>
        <Link href="/register">
          <Button size="lg" className="gap-2">
            Empezar Gratis <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/20">
        <div className="container py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Producto</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/features">Funcionalidades</Link></li>
                <li><Link href="/pricing">Precios</Link></li>
                <li><Link href="/demo">Demo</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Recursos</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/docs">Documentación</Link></li>
                <li><Link href="/api">API</Link></li>
                <li><Link href="/guides">Guías</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about">Nosotros</Link></li>
                <li><Link href="/contact">Contacto</Link></li>
                <li><Link href="/careers">Carreras</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/privacy">Privacidad</Link></li>
                <li><Link href="/terms">Términos</Link></li>
                <li><Link href="/cookies">Cookies</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
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
    <Card className="group hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
