"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Plus,
  Check,
  ChevronRight,
  Mic,
  Coffee,
  Laptop
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import type { Session, Speaker } from "@/shared/db/schema";

interface SessionWithSpeakers extends Session {
  speakers: Speaker[];
}

interface AgendaViewProps {
  agenda: Record<string, SessionWithSpeakers[]>;
  personalSessionIds?: Set<string>;
  onAddToAgenda?: (sessionId: string) => void;
  onRemoveFromAgenda?: (sessionId: string) => void;
  isLoading?: boolean;
}

const SESSION_TYPE_ICONS = {
  talk: Mic,
  workshop: Laptop,
  networking: Users,
  break: Coffee,
};

const SESSION_TYPE_COLORS = {
  talk: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  workshop: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  networking: "bg-green-500/10 text-green-500 border-green-500/20",
  break: "bg-orange-500/10 text-orange-500 border-orange-500/20",
};

export function AgendaView({
  agenda,
  personalSessionIds = new Set(),
  onAddToAgenda,
  onRemoveFromAgenda,
  isLoading = false,
}: AgendaViewProps) {
  const dates = Object.keys(agenda).sort();
  const [activeDate, setActiveDate] = useState(dates[0] || "");

  if (dates.length === 0) {
    return (
      <Card className="text-center py-12">
        <CardContent>
          <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">Agenda vacía</h3>
          <p className="text-muted-foreground">
            Aún no hay sesiones programadas para este evento
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Selector de fechas */}
      <Tabs value={activeDate} onValueChange={setActiveDate}>
        <TabsList className="w-full justify-start overflow-x-auto">
          {dates.map((date) => (
            <TabsTrigger key={date} value={date} className="min-w-[120px]">
              <div className="flex flex-col items-center">
                <span className="text-xs text-muted-foreground">
                  {format(new Date(date), "EEEE", { locale: es })}
                </span>
                <span className="font-semibold">
                  {format(new Date(date), "d MMM", { locale: es })}
                </span>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>

        {dates.map((date) => (
          <TabsContent key={date} value={date} className="mt-6">
            <div className="space-y-4">
              {agenda[date].map((session, index) => (
                <SessionCard
                  key={session.id}
                  session={session}
                  isInPersonalAgenda={personalSessionIds.has(session.id)}
                  onAdd={() => onAddToAgenda?.(session.id)}
                  onRemove={() => onRemoveFromAgenda?.(session.id)}
                  isLoading={isLoading}
                  showTimeConnector={index < agenda[date].length - 1}
                />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

interface SessionCardProps {
  session: SessionWithSpeakers;
  isInPersonalAgenda: boolean;
  onAdd: () => void;
  onRemove: () => void;
  isLoading: boolean;
  showTimeConnector: boolean;
}

function SessionCard({
  session,
  isInPersonalAgenda,
  onAdd,
  onRemove,
  isLoading,
  showTimeConnector,
}: SessionCardProps) {
  const TypeIcon = SESSION_TYPE_ICONS[session.type as keyof typeof SESSION_TYPE_ICONS] || Mic;
  const typeColor = SESSION_TYPE_COLORS[session.type as keyof typeof SESSION_TYPE_COLORS] || SESSION_TYPE_COLORS.talk;

  return (
    <div className="relative">
      {/* Línea de tiempo */}
      <div className="absolute left-6 top-0 bottom-0 flex flex-col items-center">
        <div className="w-3 h-3 rounded-full bg-primary" />
        {showTimeConnector && (
          <div className="w-0.5 flex-1 bg-border" />
        )}
      </div>

      {/* Contenido de la sesión */}
      <div className="ml-14">
        <Card className={`transition-all hover:shadow-md ${isInPersonalAgenda ? "ring-2 ring-primary" : ""}`}>
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                {/* Hora y tipo */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Clock className="w-4 h-4" />
                  <span>
                    {format(new Date(session.startTime), "HH:mm")} - {format(new Date(session.endTime), "HH:mm")}
                  </span>
                  <Badge variant="outline" className={typeColor}>
                    <TypeIcon className="w-3 h-3 mr-1" />
                    {session.type}
                  </Badge>
                  {session.track && (
                    <Badge variant="secondary">{session.track}</Badge>
                  )}
                </div>

                {/* Título */}
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                  {session.title}
                </h3>

                {/* Descripción */}
                {session.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {session.description}
                  </p>
                )}

                {/* Speakers */}
                {session.speakers.length > 0 && (
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex -space-x-2">
                      {session.speakers.slice(0, 3).map((speaker) => (
                        <Avatar key={speaker.id} className="w-8 h-8 border-2 border-background">
                          <AvatarImage src={speaker.photo || undefined} alt={speaker.name} />
                          <AvatarFallback className="text-xs">
                            {speaker.name.split(" ").map((n) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {session.speakers.map((s) => s.name).join(", ")}
                    </span>
                  </div>
                )}

                {/* Ubicación y capacidad */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  {session.room && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {session.room}
                    </span>
                  )}
                  {session.capacity && (
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {session.capacity} lugares
                    </span>
                  )}
                </div>
              </div>

              {/* Botón de agregar/quitar */}
              <div className="flex-shrink-0">
                {isInPersonalAgenda ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onRemove}
                    disabled={isLoading}
                    className="text-green-600 border-green-600"
                  >
                    <Check className="w-4 h-4 mr-1" />
                    Agregado
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onAdd}
                    disabled={isLoading}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Agregar
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Componente para mostrar recomendaciones
interface RecommendedSessionsProps {
  sessions: SessionWithSpeakers[];
  onAdd: (sessionId: string) => void;
}

export function RecommendedSessions({ sessions, onAdd }: RecommendedSessionsProps) {
  if (sessions.length === 0) return null;

  return (
    <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <span className="text-xl">✨</span>
          Recomendado para ti
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="flex items-center justify-between p-3 rounded-lg bg-background/50 hover:bg-background transition-colors"
            >
              <div className="flex-1 min-w-0">
                <h4 className="font-medium truncate">{session.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(session.startTime), "EEEE d MMM, HH:mm", { locale: es })}
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => onAdd(session.id)}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
