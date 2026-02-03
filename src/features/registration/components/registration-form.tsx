"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { fullRegistrationSchema, type FullRegistration, INTEREST_OPTIONS, TICKET_TYPES } from "../schemas";
import { registerAttendee } from "../actions";
import { CheckCircle, Loader2, User, Briefcase, MessageSquare, Linkedin } from "lucide-react";

interface RegistrationFormProps {
  eventId: string;
  tenantId: string;
  eventName: string;
}

type Step = "ticket" | "basic" | "networking" | "success";

export function RegistrationForm({ eventId, tenantId, eventName }: RegistrationFormProps) {
  const [step, setStep] = useState<Step>("ticket");
  const [selectedTicket, setSelectedTicket] = useState<string>("general");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationResult, setRegistrationResult] = useState<{
    qrCode: string;
    name: string;
  } | null>(null);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const form = useForm<FullRegistration>({
    resolver: zodResolver(fullRegistrationSchema),
    defaultValues: {
      email: "",
      name: "",
      company: "",
      title: "",
      phone: "",
      bio: "",
      interests: [],
      linkedin: "",
      lookingFor: "",
      offering: "",
    },
  });

  const progress = step === "ticket" ? 25 : step === "basic" ? 50 : step === "networking" ? 75 : 100;

  const toggleInterest = (interest: string) => {
    const current = selectedInterests;
    if (current.includes(interest)) {
      setSelectedInterests(current.filter((i) => i !== interest));
    } else if (current.length < 5) {
      setSelectedInterests([...current, interest]);
    }
    form.setValue("interests", selectedInterests);
  };

  const onSubmit = async (data: FullRegistration) => {
    setIsSubmitting(true);
    try {
      const result = await registerAttendee(eventId, tenantId, {
        ...data,
        interests: selectedInterests,
      }, selectedTicket);

      if (result.success && result.data) {
        setRegistrationResult({
          qrCode: result.data.qrCode || "",
          name: result.data.name,
        });
        setStep("success");
      } else {
        form.setError("root", { message: result.error || "Error al registrar" });
      }
    } catch (error) {
      form.setError("root", { message: "Error inesperado" });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Paso 1: Selección de ticket
  if (step === "ticket") {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Registro para {eventName}</CardTitle>
          <CardDescription>Selecciona tu tipo de entrada</CardDescription>
          <div className="w-full bg-muted rounded-full h-2 mt-4">
            <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {TICKET_TYPES.map((ticket) => (
            <button
              key={ticket.id}
              onClick={() => {
                setSelectedTicket(ticket.id);
                setStep("basic");
              }}
              className={`w-full p-4 rounded-lg border-2 text-left transition-all hover:border-primary ${
                selectedTicket === ticket.id ? "border-primary bg-primary/5" : "border-border"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{ticket.name}</h3>
                  <p className="text-sm text-muted-foreground">{ticket.description}</p>
                </div>
                <Badge variant={selectedTicket === ticket.id ? "default" : "outline"}>
                  {ticket.id === "general" ? "Gratis" : ticket.id === "vip" ? "$199" : "Invitación"}
                </Badge>
              </div>
            </button>
          ))}
        </CardContent>
      </Card>
    );
  }

  // Paso 4: Éxito
  if (step === "success" && registrationResult) {
    return (
      <Card className="w-full max-w-2xl mx-auto text-center">
        <CardHeader>
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl">¡Registro Exitoso!</CardTitle>
          <CardDescription>
            Hola {registrationResult.name}, tu registro para {eventName} está confirmado
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">Tu código de acceso</p>
            <p className="text-3xl font-mono font-bold tracking-wider">{registrationResult.qrCode}</p>
          </div>
          <p className="text-sm text-muted-foreground">
            Hemos enviado un email de confirmación con tu código QR.
            Preséntalo el día del evento para hacer check-in.
          </p>
          <Button className="w-full" size="lg">
            Agregar a Calendario
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Pasos 2 y 3: Formulario
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>
              {step === "basic" ? "Información Personal" : "Perfil de Networking"}
            </CardTitle>
            <CardDescription>
              {step === "basic"
                ? "Datos básicos para tu registro"
                : "Opcional: Mejora tu experiencia de networking"}
            </CardDescription>
            <div className="w-full bg-muted rounded-full h-2 mt-4">
              <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {step === "basic" ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <User className="w-4 h-4" /> Nombre completo *
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Juan Pérez" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="juan@empresa.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4" /> Empresa
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Mi Empresa S.A." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cargo</FormLabel>
                        <FormControl>
                          <Input placeholder="Director de Tecnología" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teléfono</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="+52 55 1234 5678" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            ) : (
              <>
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" /> Bio corta
                      </FormLabel>
                      <FormControl>
                        <textarea
                          className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                          placeholder="Cuéntanos un poco sobre ti..."
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Máximo 500 caracteres</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <Label className="mb-3 block">Áreas de interés (max. 5)</Label>
                  <div className="flex flex-wrap gap-2">
                    {INTEREST_OPTIONS.map((interest) => (
                      <Badge
                        key={interest}
                        variant={selectedInterests.includes(interest) ? "default" : "outline"}
                        className="cursor-pointer hover:bg-primary/80"
                        onClick={() => toggleInterest(interest)}
                      >
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="lookingFor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>¿Qué buscas?</FormLabel>
                        <FormControl>
                          <Input placeholder="Inversores, socios, talento..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="offering"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>¿Qué ofreces?</FormLabel>
                        <FormControl>
                          <Input placeholder="Consultoría, servicios, productos..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="linkedin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Linkedin className="w-4 h-4" /> LinkedIn
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="https://linkedin.com/in/tu-perfil" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {form.formState.errors.root && (
              <p className="text-sm text-destructive">{form.formState.errors.root.message}</p>
            )}

            <div className="flex gap-3 pt-4">
              {step !== "basic" && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(step === "networking" ? "basic" : "ticket")}
                >
                  Atrás
                </Button>
              )}
              {step === "basic" ? (
                <>
                  <Button type="button" variant="outline" onClick={() => setStep("ticket")}>
                    Atrás
                  </Button>
                  <Button
                    type="button"
                    className="flex-1"
                    onClick={() => {
                      form.trigger(["name", "email"]).then((isValid) => {
                        if (isValid) setStep("networking");
                      });
                    }}
                  >
                    Continuar
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => onSubmit(form.getValues())}
                    disabled={isSubmitting}
                  >
                    Saltar este paso
                  </Button>
                  <Button type="submit" className="flex-1" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Registrando...
                      </>
                    ) : (
                      "Completar Registro"
                    )}
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
