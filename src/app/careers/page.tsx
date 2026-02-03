import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Scale, ArrowLeft, MapPin, Clock, ArrowRight, Briefcase } from "lucide-react";

const JOBS = [
  {
    title: "Senior Frontend Engineer",
    team: "Engineering",
    location: "CDMX / Remoto",
    type: "Tiempo completo",
    description: "Buscamos un ingeniero frontend con experiencia en React y Next.js para liderar el desarrollo de nuestra interfaz de usuario.",
  },
  {
    title: "Product Designer",
    team: "Design",
    location: "CDMX / Remoto",
    type: "Tiempo completo",
    description: "Diseñador de producto con experiencia en aplicaciones B2B SaaS. Figma, sistemas de diseño y pensamiento estratégico.",
  },
  {
    title: "Backend Engineer",
    team: "Engineering",
    location: "Remoto",
    type: "Tiempo completo",
    description: "Ingeniero backend con experiencia en Node.js, PostgreSQL y arquitecturas serverless.",
  },
  {
    title: "Customer Success Manager",
    team: "Customer Success",
    location: "CDMX",
    type: "Tiempo completo",
    description: "Responsable de asegurar el éxito de nuestros clientes empresariales. Experiencia en SaaS B2B requerida.",
  },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Scale className="w-6 h-6 text-amber-500" />
            <span className="font-bold text-xl text-white">EventApp</span>
          </Link>
          <Link href="/contact">
            <Button variant="outline" size="sm" className="border-slate-700 text-slate-300 hover:bg-slate-800">
              Contactar
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8">
          <ArrowLeft className="w-4 h-4" /> Volver al inicio
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-amber-500/20 text-amber-300 border-amber-500/30">
              <Briefcase className="w-3 h-3 mr-1" /> Carreras
            </Badge>
            <h1 className="text-4xl font-bold text-white mb-4">
              Únete a nuestro equipo
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Estamos construyendo el futuro de los eventos. ¿Quieres ser parte de esta historia?
            </p>
          </div>

          <div className="bg-gradient-to-r from-amber-500/10 to-slate-800 rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">¿Por qué EventApp?</h2>
            <div className="grid md:grid-cols-3 gap-6 text-slate-400">
              <div>
                <h3 className="text-white font-semibold mb-2">Impacto real</h3>
                <p className="text-sm">Tu trabajo afecta a miles de eventos y millones de asistentes.</p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Equipo talentoso</h3>
                <p className="text-sm">Trabaja con expertos de empresas como Stripe, Eventbrite y Twilio.</p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Flexibilidad</h3>
                <p className="text-sm">Trabajo remoto, horarios flexibles y beneficios competitivos.</p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mb-6">Posiciones Abiertas</h2>
          <div className="space-y-4">
            {JOBS.map((job, idx) => (
              <Card key={idx} className="bg-slate-800/50 border-slate-700/50 hover:border-amber-500/30 transition-colors">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-slate-700 text-slate-300">{job.team}</Badge>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{job.title}</h3>
                      <p className="text-slate-400 text-sm mb-3">{job.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" /> {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" /> {job.type}
                        </span>
                      </div>
                    </div>
                    <Button className="bg-amber-500 hover:bg-amber-600 text-black shrink-0">
                      Aplicar
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-slate-400 mb-4">
              ¿No ves una posición que te interese? Envíanos tu CV de todas formas.
            </p>
            <Link href="mailto:careers@eventapp.mx">
              <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800">
                Enviar CV
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-800 py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
          © 2026 EventApp. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
