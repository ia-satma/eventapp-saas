import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Scale,
  Target,
  Heart,
  Lightbulb,
  Users,
  Globe,
  Award,
  ArrowRight,
  Linkedin,
  Twitter,
} from "lucide-react";

const TEAM = [
  {
    name: "María González",
    role: "CEO & Co-Fundadora",
    bio: "Ex-VP de Producto en Eventbrite. 15 años en la industria de eventos.",
    linkedin: "#",
  },
  {
    name: "Carlos Rodríguez",
    role: "CTO & Co-Fundador",
    bio: "Ex-Staff Engineer en Stripe. Experto en sistemas escalables.",
    linkedin: "#",
  },
  {
    name: "Ana Martínez",
    role: "Head of Product",
    bio: "Ex-Product Lead en Zoom Events. MBA por Stanford.",
    linkedin: "#",
  },
  {
    name: "Roberto Sánchez",
    role: "Head of Engineering",
    bio: "Ex-Principal Engineer en Twilio. 10 años en startups.",
    linkedin: "#",
  },
];

const VALUES = [
  {
    icon: Target,
    title: "Enfoque en el Usuario",
    description: "Cada decisión comienza con la pregunta: ¿cómo mejora esto la experiencia del usuario?",
  },
  {
    icon: Lightbulb,
    title: "Innovación Constante",
    description: "Utilizamos IA y tecnologías emergentes para resolver problemas de formas nunca antes vistas.",
  },
  {
    icon: Heart,
    title: "Pasión por los Eventos",
    description: "Creemos que los eventos tienen el poder de conectar personas y transformar industrias.",
  },
  {
    icon: Users,
    title: "Colaboración",
    description: "Trabajamos junto a nuestros clientes para construir la plataforma que realmente necesitan.",
  },
];

const STATS = [
  { value: "50K+", label: "Eventos gestionados" },
  { value: "2M+", label: "Asistentes registrados" },
  { value: "98%", label: "Satisfacción cliente" },
  { value: "15", label: "Países" },
];

export default function AboutPage() {
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
            <Link href="/login">
              <Button variant="outline" size="sm" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                Iniciar Sesión
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        {/* Hero */}
        <div className="text-center mb-20">
          <Badge className="mb-4 bg-amber-500/20 text-amber-300 border-amber-500/30">
            Sobre Nosotros
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Transformando la forma en que
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
              el mundo se conecta
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Nacimos con una misión clara: hacer que cada evento sea una experiencia extraordinaria
            tanto para organizadores como para asistentes.
          </p>
        </div>

        {/* Story */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Nuestra Historia</h2>
              <div className="space-y-4 text-slate-400">
                <p>
                  EventApp nació en 2023 cuando un grupo de profesionales de la industria de eventos
                  y tecnología se unieron con una visión compartida: democratizar el acceso a
                  herramientas de gestión de eventos de clase mundial.
                </p>
                <p>
                  Frustrados por las limitaciones de las plataformas existentes, decidimos construir
                  una solución que combinara lo mejor de la inteligencia artificial con una experiencia
                  de usuario excepcional.
                </p>
                <p>
                  Hoy, EventApp es utilizado por organizadores de eventos en 15 países, desde pequeñas
                  conferencias hasta grandes congresos con miles de asistentes.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((stat, idx) => (
                <Card key={idx} className="bg-slate-800/50 border-slate-700/50 text-center p-6">
                  <div className="text-3xl font-bold text-amber-500 mb-1">{stat.value}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Nuestros Valores</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((value, idx) => (
              <Card key={idx} className="bg-slate-800/50 border-slate-700/50">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 rounded-xl bg-amber-500/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-7 h-7 text-amber-500" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{value.title}</h3>
                  <p className="text-sm text-slate-400">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-4">Nuestro Equipo</h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            Un equipo apasionado de expertos en eventos, tecnología y diseño
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((member, idx) => (
              <Card key={idx} className="bg-slate-800/50 border-slate-700/50 hover:border-amber-500/30 transition-colors">
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 rounded-full bg-slate-700 flex items-center justify-center mx-auto mb-4">
                    <Users className="w-10 h-10 text-slate-500" />
                  </div>
                  <h3 className="font-semibold text-white mb-1">{member.name}</h3>
                  <p className="text-amber-400 text-sm mb-2">{member.role}</p>
                  <p className="text-xs text-slate-400 mb-4">{member.bio}</p>
                  <a
                    href={member.linkedin}
                    className="text-slate-400 hover:text-amber-400 transition-colors"
                  >
                    <Linkedin className="w-5 h-5 mx-auto" />
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Awards */}
        <div className="bg-gradient-to-r from-amber-500/10 to-slate-800 rounded-2xl p-8 md:p-12 mb-20">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-20 h-20 rounded-2xl bg-amber-500/20 flex items-center justify-center shrink-0">
              <Award className="w-10 h-10 text-amber-500" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-white mb-2">Reconocimientos</h2>
              <p className="text-slate-400">
                EventApp ha sido reconocido como una de las startups más innovadoras en el espacio
                de tecnología para eventos por TechCrunch, Forbes México y Event Manager Blog.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Únete a nuestra misión</h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            Estamos construyendo el futuro de los eventos. ¿Quieres ser parte?
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/careers">
              <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-black font-semibold">
                Ver Vacantes
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-slate-700 text-white hover:bg-slate-800">
                Contactar
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
