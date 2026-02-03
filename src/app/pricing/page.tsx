"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Scale,
  Check,
  ArrowRight,
  Users,
  Building2,
  Rocket,
  Zap,
  Shield,
  Headphones,
} from "lucide-react";

const PLANS = [
  {
    name: "Starter",
    description: "Para eventos pequeños y organizadores individuales",
    price: "Gratis",
    priceDetail: "hasta 100 asistentes",
    features: [
      "1 evento activo",
      "Hasta 100 asistentes",
      "Registro básico",
      "Agenda simple",
      "Soporte por email",
    ],
    cta: "Empezar Gratis",
    ctaVariant: "outline" as const,
  },
  {
    name: "Professional",
    description: "Para organizadores de eventos medianos",
    price: "$2,999",
    priceDetail: "por evento",
    popular: true,
    features: [
      "Eventos ilimitados",
      "Hasta 500 asistentes",
      "Networking con IA",
      "Agenda inteligente",
      "Analytics básicos",
      "Check-in con QR",
      "Soporte prioritario",
    ],
    cta: "Comenzar Prueba",
    ctaVariant: "default" as const,
  },
  {
    name: "Enterprise",
    description: "Para grandes congresos y organizaciones",
    price: "Contactar",
    priceDetail: "precio personalizado",
    features: [
      "Todo lo de Professional",
      "Asistentes ilimitados",
      "Navegación indoor",
      "Gamificación completa",
      "Analytics avanzados",
      "API personalizada",
      "Account manager dedicado",
      "SLA garantizado",
    ],
    cta: "Contactar Ventas",
    ctaVariant: "outline" as const,
  },
];

const FEATURES = [
  {
    icon: Users,
    title: "Multi-Tenant",
    description: "Cada organizador tiene su espacio aislado y seguro",
  },
  {
    icon: Zap,
    title: "IA Integrada",
    description: "Matchmaking, recomendaciones y automatización inteligente",
  },
  {
    icon: Shield,
    title: "Seguridad",
    description: "Row-Level Security, encriptación y cumplimiento GDPR",
  },
  {
    icon: Headphones,
    title: "Soporte 24/7",
    description: "Equipo dedicado para ayudarte en todo momento",
  },
];

export default function PricingPage() {
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
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-amber-500/20 text-amber-300 border-amber-500/30">
            Precios transparentes
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Elige el plan perfecto para tu evento
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Desde eventos pequeños hasta grandes congresos. Sin sorpresas, sin costos ocultos.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          {PLANS.map((plan, idx) => (
            <Card
              key={idx}
              className={`relative overflow-hidden transition-all duration-300 ${
                plan.popular
                  ? "bg-gradient-to-b from-amber-500/20 to-slate-800 border-amber-500/50 scale-105 shadow-xl shadow-amber-500/10"
                  : "bg-slate-800/50 border-slate-700/50 hover:border-slate-600"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-amber-500 text-black text-center py-1 text-sm font-semibold">
                  Más Popular
                </div>
              )}
              <CardHeader className={plan.popular ? "pt-10" : ""}>
                <div className="flex items-center gap-2 mb-2">
                  {idx === 0 && <Rocket className="w-5 h-5 text-slate-400" />}
                  {idx === 1 && <Zap className="w-5 h-5 text-amber-500" />}
                  {idx === 2 && <Building2 className="w-5 h-5 text-purple-400" />}
                  <CardTitle className="text-xl text-white">{plan.name}</CardTitle>
                </div>
                <CardDescription className="text-slate-400">
                  {plan.description}
                </CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-slate-400 ml-2">{plan.priceDetail}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-start gap-3 text-slate-300">
                      <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-green-400" />
                      </div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href={plan.name === "Enterprise" ? "/contact" : "/register"}>
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-amber-500 hover:bg-amber-600 text-black"
                        : "bg-slate-700 hover:bg-slate-600 text-white"
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Incluido en todos los planes
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {FEATURES.map((feature, idx) => (
              <Card key={idx} className="bg-slate-800/30 border-slate-700/30">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
                    <feature.icon className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                    <p className="text-sm text-slate-400">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto mt-20">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Preguntas Frecuentes
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "¿Puedo cambiar de plan en cualquier momento?",
                a: "Sí, puedes actualizar o degradar tu plan en cualquier momento. Los cambios se aplican inmediatamente.",
              },
              {
                q: "¿Hay período de prueba?",
                a: "El plan Starter es gratis para siempre. El plan Professional incluye 14 días de prueba sin costo.",
              },
              {
                q: "¿Qué métodos de pago aceptan?",
                a: "Aceptamos tarjetas de crédito/débito, transferencia bancaria y PayPal. Factura disponible.",
              },
              {
                q: "¿Puedo cancelar cuando quiera?",
                a: "Sí, puedes cancelar en cualquier momento sin penalización. No hay contratos de permanencia.",
              },
            ].map((faq, idx) => (
              <Card key={idx} className="bg-slate-800/30 border-slate-700/30">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-white mb-2">{faq.q}</h3>
                  <p className="text-slate-400 text-sm">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-20">
          <h2 className="text-2xl font-bold text-white mb-4">¿Listo para empezar?</h2>
          <p className="text-slate-400 mb-8">
            Crea tu cuenta gratis y organiza tu primer evento hoy
          </p>
          <Link href="/register">
            <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-black font-semibold">
              Crear Cuenta Gratis
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
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
