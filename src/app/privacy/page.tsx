import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Scale, ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Scale className="w-6 h-6 text-amber-500" />
            <span className="font-bold text-xl text-white">EventApp</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al inicio
        </Link>

        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">Política de Privacidad</h1>

          <div className="prose prose-invert prose-slate max-w-none">
            <p className="text-slate-400 mb-6">
              Última actualización: 1 de enero de 2026
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">1. Información que Recopilamos</h2>
              <p className="text-slate-400 mb-4">
                Recopilamos información que nos proporcionas directamente, incluyendo:
              </p>
              <ul className="list-disc list-inside text-slate-400 space-y-2">
                <li>Nombre y datos de contacto</li>
                <li>Información de perfil profesional</li>
                <li>Preferencias de eventos e intereses</li>
                <li>Historial de participación en eventos</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">2. Uso de la Información</h2>
              <p className="text-slate-400 mb-4">
                Utilizamos tu información para:
              </p>
              <ul className="list-disc list-inside text-slate-400 space-y-2">
                <li>Gestionar tu registro y participación en eventos</li>
                <li>Personalizar recomendaciones de agenda y networking</li>
                <li>Mejorar nuestros servicios y experiencia de usuario</li>
                <li>Comunicaciones relacionadas con eventos</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">3. Compartir Información</h2>
              <p className="text-slate-400">
                No vendemos tu información personal. Podemos compartirla con:
              </p>
              <ul className="list-disc list-inside text-slate-400 space-y-2 mt-4">
                <li>Organizadores de eventos a los que te registras</li>
                <li>Otros asistentes (solo con tu consentimiento para networking)</li>
                <li>Proveedores de servicios que nos ayudan a operar la plataforma</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">4. Seguridad</h2>
              <p className="text-slate-400">
                Implementamos medidas de seguridad técnicas y organizativas para proteger tu información,
                incluyendo encriptación de datos, Row-Level Security (RLS) y acceso controlado.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">5. Tus Derechos</h2>
              <p className="text-slate-400 mb-4">
                Tienes derecho a:
              </p>
              <ul className="list-disc list-inside text-slate-400 space-y-2">
                <li>Acceder a tu información personal</li>
                <li>Rectificar datos inexactos</li>
                <li>Solicitar la eliminación de tus datos</li>
                <li>Oponerte al procesamiento de datos</li>
                <li>Exportar tus datos en formato portable</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">6. Contacto</h2>
              <p className="text-slate-400">
                Para ejercer tus derechos o preguntas sobre privacidad, contáctanos en:
                <br />
                <a href="mailto:privacy@eventapp.mx" className="text-amber-400 hover:text-amber-300">
                  privacy@eventapp.mx
                </a>
              </p>
            </section>
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
