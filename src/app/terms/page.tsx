import Link from "next/link";
import { Scale, ArrowLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2">
            <Scale className="w-6 h-6 text-amber-500" />
            <span className="font-bold text-xl text-white">EventApp</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8">
          <ArrowLeft className="w-4 h-4" /> Volver al inicio
        </Link>

        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">Términos de Servicio</h1>
          <p className="text-slate-400 mb-6">Última actualización: 1 de enero de 2026</p>

          <div className="space-y-8 text-slate-400">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Aceptación de los Términos</h2>
              <p>Al acceder y usar EventApp, aceptas estos términos. Si no estás de acuerdo, no uses la plataforma.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Descripción del Servicio</h2>
              <p>EventApp es una plataforma SaaS para gestión de eventos que incluye registro, agenda, networking y analíticas.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Cuentas de Usuario</h2>
              <p>Eres responsable de mantener la confidencialidad de tu cuenta y contraseña. Notifícanos inmediatamente si detectas uso no autorizado.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Uso Aceptable</h2>
              <p>No debes usar la plataforma para actividades ilegales, spam, contenido ofensivo, o cualquier acción que perjudique a otros usuarios o al servicio.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Propiedad Intelectual</h2>
              <p>Todo el contenido de EventApp es propiedad de EventApp MX S.A. de C.V. o sus licenciantes. No puedes copiar, modificar o distribuir sin autorización.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Limitación de Responsabilidad</h2>
              <p>EventApp se proporciona "tal cual". No garantizamos disponibilidad ininterrumpida ni que el servicio esté libre de errores.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Contacto</h2>
              <p>Para preguntas sobre estos términos: <a href="mailto:legal@eventapp.mx" className="text-amber-400 hover:text-amber-300">legal@eventapp.mx</a></p>
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
