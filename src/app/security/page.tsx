import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Scale, ArrowLeft, Shield, Lock, Database, Eye, Server, CheckCircle2 } from "lucide-react";

const SECURITY_FEATURES = [
  {
    icon: Database,
    title: "Row-Level Security (RLS)",
    description: "Aislamiento de datos a nivel de base de datos. Cada tenant tiene acceso exclusivo a sus propios datos, sin posibilidad de acceso cruzado.",
  },
  {
    icon: Lock,
    title: "Encriptación E2E",
    description: "Todos los datos se encriptan en tránsito (TLS 1.3) y en reposo (AES-256). Las contraseñas se almacenan con bcrypt.",
  },
  {
    icon: Shield,
    title: "Autenticación Segura",
    description: "OAuth 2.0, JWT con expiración corta, MFA opcional, y protección contra ataques de fuerza bruta.",
  },
  {
    icon: Eye,
    title: "Auditoría Completa",
    description: "Registro de todas las acciones sensibles. Acceso a logs de auditoría para cumplimiento regulatorio.",
  },
  {
    icon: Server,
    title: "Infraestructura Segura",
    description: "Desplegado en infraestructura certificada SOC 2 Type II. Backups automáticos y recuperación ante desastres.",
  },
];

const COMPLIANCE = [
  "GDPR Compliant",
  "CCPA Ready",
  "ISO 27001 (en proceso)",
  "SOC 2 Type II",
];

export default function SecurityPage() {
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
            <Badge className="mb-4 bg-green-500/20 text-green-300 border-green-500/30">
              <Shield className="w-3 h-3 mr-1" /> Seguridad
            </Badge>
            <h1 className="text-4xl font-bold text-white mb-4">
              Seguridad de Nivel Empresarial
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              La seguridad de tus datos es nuestra máxima prioridad. Implementamos las mejores
              prácticas de la industria para proteger tu información.
            </p>
          </div>

          {/* Security Features */}
          <div className="space-y-6 mb-12">
            {SECURITY_FEATURES.map((feature, idx) => (
              <Card key={idx} className="bg-slate-800/50 border-slate-700/50">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0">
                    <feature.icon className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-slate-400">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Multi-Tenant Architecture */}
          <Card className="bg-gradient-to-r from-green-500/10 to-slate-800 border-green-500/30 mb-12">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Arquitectura Multi-Tenant</h2>
              <p className="text-slate-400 mb-6">
                Cada organizador opera en un espacio completamente aislado. Utilizamos Row-Level Security (RLS)
                directamente en PostgreSQL para garantizar que las consultas de un tenant nunca puedan acceder
                a datos de otro.
              </p>
              <div className="bg-slate-900/50 rounded-lg p-4 font-mono text-sm text-slate-300 overflow-x-auto">
                <pre>{`-- Política RLS ejemplo
CREATE POLICY tenant_isolation ON events
USING (tenant_id = app.current_tenant_id());

-- Todas las consultas se filtran automáticamente
SELECT * FROM events;
-- Solo retorna eventos del tenant actual`}</pre>
              </div>
            </CardContent>
          </Card>

          {/* Compliance */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Cumplimiento Normativo</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {COMPLIANCE.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-lg border border-slate-700"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="text-white">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="text-center bg-slate-800/30 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">¿Tienes preguntas de seguridad?</h2>
            <p className="text-slate-400 mb-6">
              Nuestro equipo de seguridad está disponible para responder cualquier pregunta
              y proporcionar documentación adicional para tu proceso de evaluación.
            </p>
            <Link href="mailto:security@eventapp.mx">
              <Button className="bg-green-500 hover:bg-green-600 text-black font-semibold">
                Contactar Equipo de Seguridad
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
