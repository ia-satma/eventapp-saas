import Link from "next/link";
import { Scale, ArrowLeft } from "lucide-react";

export default function CookiesPage() {
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
          <h1 className="text-4xl font-bold text-white mb-8">Política de Cookies</h1>
          <p className="text-slate-400 mb-6">Última actualización: 1 de enero de 2026</p>

          <div className="space-y-8 text-slate-400">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">¿Qué son las Cookies?</h2>
              <p>Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web. Nos ayudan a recordar tus preferencias y mejorar tu experiencia.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Tipos de Cookies que Usamos</h2>
              <ul className="list-disc list-inside space-y-2">
                <li><strong className="text-white">Esenciales:</strong> Necesarias para el funcionamiento del sitio (sesión, autenticación)</li>
                <li><strong className="text-white">Funcionales:</strong> Recuerdan tus preferencias (idioma, tema)</li>
                <li><strong className="text-white">Analíticas:</strong> Nos ayudan a entender cómo usas la plataforma</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Gestión de Cookies</h2>
              <p>Puedes configurar tu navegador para rechazar cookies, aunque esto puede afectar la funcionalidad del sitio.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Contacto</h2>
              <p>Para preguntas: <a href="mailto:privacy@eventapp.mx" className="text-amber-400 hover:text-amber-300">privacy@eventapp.mx</a></p>
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
