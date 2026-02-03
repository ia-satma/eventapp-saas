"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Scale,
  ArrowLeft,
  ArrowRight,
  Check,
  Star,
  Users,
  BookOpen,
  ExternalLink,
  Mail,
  User,
  Building,
  CreditCard,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Datos de paquetes BMA 2026
const PACKAGES = [
  {
    id: "todo-incluido",
    name: "TODO INCLUIDO",
    description: "Acceso completo al congreso con todas las actividades y beneficios",
    icon: Star,
    features: [
      "Acceso a todas las sesiones academicas",
      "Cena de Gala",
      "Comidas incluidas (3 dias)",
      "Material del congreso",
      "Certificado de participacion",
      "Acceso a area de networking VIP",
      "Transporte hotel-sede-hotel",
    ],
    pricing: {
      barrista: { temprano: 14000, normal: 16000 },
      no_barrista: { temprano: 16000, normal: 18000 },
    },
    popular: true,
    intranetUrl: "https://intranet.bma.org.mx/pagos/congreso2026/todo-incluido",
  },
  {
    id: "sesiones-academicas",
    name: "SESIONES ACADEMICAS",
    description: "Acceso a todas las conferencias y talleres del congreso",
    icon: BookOpen,
    features: [
      "Acceso a todas las sesiones academicas",
      "Material del congreso",
      "Certificado de participacion",
      "Coffee breaks incluidos",
    ],
    pricing: {
      barrista: { temprano: 12000, normal: 13000 },
      no_barrista: { temprano: 13500, normal: 15500 },
    },
    popular: false,
    intranetUrl: "https://intranet.bma.org.mx/pagos/congreso2026/sesiones-academicas",
  },
  {
    id: "acompanantes",
    name: "ACOMPAÑANTES",
    description: "Paquete para acompañantes de los asistentes registrados",
    icon: Users,
    features: [
      "Cena de Gala",
      "Comidas incluidas (3 dias)",
      "Actividades recreativas",
      "Transporte hotel-sede-hotel",
    ],
    pricing: {
      barrista: { temprano: 7300, normal: 8500 },
      no_barrista: { temprano: 9000, normal: 10000 },
    },
    popular: false,
    intranetUrl: "https://intranet.bma.org.mx/pagos/congreso2026/acompanantes",
  },
];

// Determinar periodo de precios basado en fecha actual
function getCurrentPricingPeriod(): "temprano" | "normal" {
  const now = new Date();
  const earlyBirdEnd = new Date("2025-12-31");
  return now <= earlyBirdEnd ? "temprano" : "normal";
}

function formatPrice(price: number, includesIva: boolean): string {
  const formatted = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
  return includesIva ? formatted : `${formatted} + IVA`;
}

export default function InscripcionPage() {
  const [step, setStep] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [isBarrista, setIsBarrista] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    company: "",
    barristaNumber: "",
  });
  const [loading, setLoading] = useState(false);
  const pricingPeriod = getCurrentPricingPeriod();

  const selectedPkg = PACKAGES.find((p) => p.id === selectedPackage);

  const getCurrentPrice = () => {
    if (!selectedPkg) return 0;
    const userType = isBarrista ? "barrista" : "no_barrista";
    return selectedPkg.pricing[userType][pricingPeriod];
  };

  const handleSubmit = async () => {
    if (!selectedPkg) return;
    setLoading(true);

    // Simular guardado y abrir URL de pago
    setTimeout(() => {
      setLoading(false);
      // Abrir URL de intranet BMA en nueva pestaña
      window.open(selectedPkg.intranetUrl, "_blank");
      setStep(4); // Paso de confirmación
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 flex h-16 items-center justify-between">
          <Link href="/evento" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Scale className="w-5 h-5 text-primary" />
            </div>
            <div>
              <span className="font-bold text-lg text-foreground">BMA 2026</span>
              <p className="text-xs text-muted-foreground">Congreso Nacional</p>
            </div>
          </Link>
          <Link href="/evento">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                    step >= s
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {step > s ? <Check className="w-4 h-4" /> : s}
                </div>
                {s < 3 && (
                  <div
                    className={cn(
                      "w-12 h-1 mx-2 rounded transition-colors",
                      step > s ? "bg-primary" : "bg-muted"
                    )}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">
              {step === 1 && "Selecciona tu paquete"}
              {step === 2 && "Tus datos"}
              {step === 3 && "Confirma tu registro"}
              {step === 4 && "¡Registro iniciado!"}
            </h1>
            <p className="text-muted-foreground mt-1">
              {step === 1 && "Elige el paquete que mejor se adapte a tus necesidades"}
              {step === 2 && "Completa tu información para el registro"}
              {step === 3 && "Revisa los detalles antes de continuar al pago"}
              {step === 4 && "Completa tu pago en la intranet de la BMA"}
            </p>
          </div>
        </div>

        {/* Step 1: Select Package */}
        {step === 1 && (
          <div className="space-y-6">
            {/* Barrista Toggle */}
            <Card className="bg-accent/10 border-accent/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Scale className="w-5 h-5 text-accent-foreground" />
                    <div>
                      <p className="font-medium text-foreground">¿Eres miembro de la BMA?</p>
                      <p className="text-sm text-muted-foreground">
                        Los Barristas tienen precios preferenciales con IVA incluido
                      </p>
                    </div>
                  </div>
                  <Switch checked={isBarrista} onCheckedChange={setIsBarrista} />
                </div>
              </CardContent>
            </Card>

            {/* Pricing Period Badge */}
            <div className="text-center">
              <Badge variant={pricingPeriod === "temprano" ? "default" : "secondary"} className="text-sm">
                {pricingPeriod === "temprano"
                  ? "Precio Temprano (hasta 31 Dic 2025)"
                  : "Precio Normal (Ene-Feb 2026)"}
              </Badge>
            </div>

            {/* Package Cards */}
            <div className="grid md:grid-cols-3 gap-4">
              {PACKAGES.map((pkg) => {
                const userType = isBarrista ? "barrista" : "no_barrista";
                const price = pkg.pricing[userType][pricingPeriod];
                const Icon = pkg.icon;
                const isSelected = selectedPackage === pkg.id;

                return (
                  <Card
                    key={pkg.id}
                    className={cn(
                      "cursor-pointer transition-all hover:shadow-lg relative",
                      isSelected
                        ? "border-primary ring-2 ring-primary/20"
                        : "border-border hover:border-primary/50",
                      pkg.popular && "md:-mt-2 md:mb-2"
                    )}
                    onClick={() => setSelectedPackage(pkg.id)}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <Badge className="bg-primary text-primary-foreground">
                          Mas Popular
                        </Badge>
                      </div>
                    )}
                    <CardHeader className="text-center pb-2">
                      <div
                        className={cn(
                          "w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-2",
                          isSelected ? "bg-primary/20" : "bg-muted"
                        )}
                      >
                        <Icon
                          className={cn(
                            "w-6 h-6",
                            isSelected ? "text-primary" : "text-muted-foreground"
                          )}
                        />
                      </div>
                      <CardTitle className="text-lg">{pkg.name}</CardTitle>
                      <CardDescription className="text-sm">{pkg.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                      <div className="mb-4">
                        <span className="text-3xl font-bold text-foreground">
                          {formatPrice(price, isBarrista)}
                        </span>
                      </div>
                      <ul className="space-y-2 text-left text-sm">
                        {pkg.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="flex justify-center pt-4">
              <Button
                size="lg"
                disabled={!selectedPackage}
                onClick={() => setStep(2)}
                className="bg-primary hover:bg-primary/90"
              >
                Continuar
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Form Data */}
        {step === 2 && (
          <div className="max-w-lg mx-auto space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Información Personal
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre completo *</Label>
                  <Input
                    id="name"
                    placeholder="Juan Perez Garcia"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Correo electronico *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="juan@ejemplo.com"
                      className="pl-10"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Despacho / Empresa</Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="company"
                      placeholder="Nombre del despacho"
                      className="pl-10"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>
                </div>

                {isBarrista && (
                  <div className="space-y-2">
                    <Label htmlFor="barristaNumber">Numero de Barrista *</Label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="barristaNumber"
                        placeholder="Tu numero de cedula BMA"
                        className="pl-10"
                        value={formData.barristaNumber}
                        onChange={(e) =>
                          setFormData({ ...formData, barristaNumber: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Atras
              </Button>
              <Button
                onClick={() => setStep(3)}
                disabled={!formData.name || !formData.email || (isBarrista && !formData.barristaNumber)}
                className="bg-primary hover:bg-primary/90"
              >
                Continuar
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && selectedPkg && (
          <div className="max-w-lg mx-auto space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Resumen de tu registro</CardTitle>
                <CardDescription>Verifica que todos los datos sean correctos</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Package Summary */}
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                      <selectedPkg.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{selectedPkg.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {isBarrista ? "Barrista" : "No Barrista"} -{" "}
                        {pricingPeriod === "temprano" ? "Precio Temprano" : "Precio Normal"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Personal Info */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Nombre:</span>
                    <span className="font-medium text-foreground">{formData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email:</span>
                    <span className="font-medium text-foreground">{formData.email}</span>
                  </div>
                  {formData.company && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Empresa:</span>
                      <span className="font-medium text-foreground">{formData.company}</span>
                    </div>
                  )}
                  {isBarrista && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">No. Barrista:</span>
                      <span className="font-medium text-foreground">{formData.barristaNumber}</span>
                    </div>
                  )}
                </div>

                <hr className="border-border" />

                {/* Price */}
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-foreground">Total a pagar:</span>
                  <span className="text-2xl font-bold text-primary">
                    {formatPrice(getCurrentPrice(), isBarrista)}
                  </span>
                </div>

                <p className="text-xs text-muted-foreground text-center">
                  Al continuar, seras redirigido a la intranet de la BMA para completar tu pago.
                </p>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(2)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Atras
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-primary hover:bg-primary/90"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Procesando...
                  </>
                ) : (
                  <>
                    Ir a Pago
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Success */}
        {step === 4 && (
          <div className="max-w-lg mx-auto text-center space-y-6">
            <div className="w-20 h-20 mx-auto rounded-full bg-green-500/20 flex items-center justify-center">
              <Check className="w-10 h-10 text-green-500" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                ¡Pre-registro completado!
              </h2>
              <p className="text-muted-foreground">
                Tu pre-registro ha sido guardado. Por favor completa tu pago en la intranet de la
                BMA para confirmar tu asistencia.
              </p>
            </div>

            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="text-left space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Paquete:</span>
                    <span className="font-medium text-foreground">{selectedPkg?.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total:</span>
                    <span className="font-bold text-primary">
                      {formatPrice(getCurrentPrice(), isBarrista)}
                    </span>
                  </div>
                </div>

                <Button
                  className="w-full bg-primary hover:bg-primary/90"
                  onClick={() => window.open(selectedPkg?.intranetUrl, "_blank")}
                >
                  Abrir Intranet BMA
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            <p className="text-sm text-muted-foreground">
              Tambien recibiras un correo con los detalles de tu pre-registro y las instrucciones de
              pago.
            </p>

            <Link href="/evento">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver a la pagina del evento
              </Button>
            </Link>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          © 2026 Barra Mexicana, Colegio de Abogados A.C. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
