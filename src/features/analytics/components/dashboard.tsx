"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Users,
  UserCheck,
  Heart,
  Calendar,
  TrendingUp,
  Trophy,
  Activity,
  Download,
  RefreshCw,
  Clock,
  MapPin,
} from "lucide-react";

interface DashboardMetrics {
  totalRegistrations: number;
  totalCheckins: number;
  checkinRate: number;
  totalMatches: number;
  totalSessions: number;
  avgSessionsPerAttendee: number;
  totalPointsAwarded: number;
}

interface SessionAttendance {
  sessionId: string;
  title: string;
  room: string | null;
  capacity: number | null;
  registeredCount: number;
  occupancyRate: number | null;
}

interface LeaderboardEntry {
  attendeeId: string;
  totalPoints: number;
  attendeeName: string;
  attendeeCompany: string | null;
}

interface RecentActivity {
  type: string;
  name: string;
  timestamp: Date | null;
  detail: string;
}

interface DashboardProps {
  eventName: string;
  metrics: DashboardMetrics;
  sessionAttendance: SessionAttendance[];
  leaderboard: LeaderboardEntry[];
  recentActivity: RecentActivity[];
  registrationsByDay: { date: string; count: number }[];
  ticketDistribution: { ticketType: string | null; count: number }[];
  onRefresh: () => void;
  onExport: () => void;
  isLoading?: boolean;
}

export function OrganizerDashboard({
  eventName,
  metrics,
  sessionAttendance,
  leaderboard,
  recentActivity,
  registrationsByDay,
  ticketDistribution,
  onRefresh,
  onExport,
  isLoading = false,
}: DashboardProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{eventName}</h1>
          <p className="text-muted-foreground">Dashboard de Organizador</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onRefresh} disabled={isLoading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
            Actualizar
          </Button>
          <Button variant="outline" onClick={onExport}>
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Registros"
          value={metrics.totalRegistrations}
          icon={Users}
          description="Asistentes registrados"
          trend={null}
        />
        <MetricCard
          title="Check-ins"
          value={metrics.totalCheckins}
          icon={UserCheck}
          description={`${metrics.checkinRate}% de asistencia`}
          trend={metrics.checkinRate > 50 ? "up" : "down"}
        />
        <MetricCard
          title="Matches"
          value={metrics.totalMatches}
          icon={Heart}
          description="Conexiones realizadas"
          trend={null}
        />
        <MetricCard
          title="Sesiones"
          value={metrics.totalSessions}
          icon={Calendar}
          description={`${metrics.avgSessionsPerAttendee} promedio/persona`}
          trend={null}
        />
      </div>

      {/* Tabs de secciones */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="sessions">Sesiones</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="activity">Actividad</TabsTrigger>
        </TabsList>

        {/* Tab: Resumen */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Gráfico de registros por día */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Registros por Día</CardTitle>
                <CardDescription>Evolución de inscripciones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-end gap-2">
                  {registrationsByDay.map((day, i) => {
                    const maxCount = Math.max(...registrationsByDay.map((d) => d.count));
                    const height = (day.count / maxCount) * 100;
                    return (
                      <div
                        key={i}
                        className="flex-1 flex flex-col items-center gap-1"
                      >
                        <div
                          className="w-full bg-primary rounded-t transition-all hover:bg-primary/80"
                          style={{ height: `${height}%` }}
                          title={`${day.count} registros`}
                        />
                        <span className="text-xs text-muted-foreground">
                          {new Date(day.date).toLocaleDateString("es", { day: "numeric" })}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Distribución de tickets */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Distribución de Tickets</CardTitle>
                <CardDescription>Por tipo de entrada</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ticketDistribution.map((ticket) => {
                    const total = ticketDistribution.reduce((sum, t) => sum + t.count, 0);
                    const percentage = Math.round((ticket.count / total) * 100);
                    return (
                      <div key={ticket.ticketType || "unknown"} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="capitalize">{ticket.ticketType || "Sin tipo"}</span>
                          <span className="font-medium">{ticket.count} ({percentage}%)</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary transition-all"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab: Sesiones */}
        <TabsContent value="sessions">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Asistencia por Sesión</CardTitle>
              <CardDescription>Registros y ocupación por sala</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sesión</TableHead>
                    <TableHead>Sala</TableHead>
                    <TableHead className="text-right">Registrados</TableHead>
                    <TableHead className="text-right">Capacidad</TableHead>
                    <TableHead className="text-right">Ocupación</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sessionAttendance.map((session) => (
                    <TableRow key={session.sessionId}>
                      <TableCell className="font-medium">{session.title}</TableCell>
                      <TableCell>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {session.room || "-"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">{session.registeredCount}</TableCell>
                      <TableCell className="text-right">{session.capacity || "∞"}</TableCell>
                      <TableCell className="text-right">
                        {session.occupancyRate !== null ? (
                          <Badge
                            variant={
                              session.occupancyRate >= 90
                                ? "destructive"
                                : session.occupancyRate >= 70
                                ? "default"
                                : "secondary"
                            }
                          >
                            {session.occupancyRate}%
                          </Badge>
                        ) : (
                          "-"
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Engagement */}
        <TabsContent value="engagement">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Leaderboard */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  Leaderboard
                </CardTitle>
                <CardDescription>Top asistentes por puntos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboard.map((entry, index) => (
                    <div
                      key={entry.attendeeId}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50"
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          index === 0
                            ? "bg-yellow-500 text-yellow-950"
                            : index === 1
                            ? "bg-gray-300 text-gray-700"
                            : index === 2
                            ? "bg-amber-600 text-amber-950"
                            : "bg-muted"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <Avatar className="w-10 h-10">
                        <AvatarFallback>
                          {entry.attendeeName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{entry.attendeeName}</p>
                        {entry.attendeeCompany && (
                          <p className="text-sm text-muted-foreground truncate">
                            {entry.attendeeCompany}
                          </p>
                        )}
                      </div>
                      <Badge variant="secondary" className="font-mono">
                        {entry.totalPoints} pts
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Estadísticas de engagement */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  Métricas de Engagement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Heart className="w-5 h-5 text-pink-500" />
                      <span>Conexiones de Networking</span>
                    </div>
                    <span className="text-2xl font-bold">{metrics.totalMatches}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-blue-500" />
                      <span>Promedio sesiones/persona</span>
                    </div>
                    <span className="text-2xl font-bold">{metrics.avgSessionsPerAttendee}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Trophy className="w-5 h-5 text-yellow-500" />
                      <span>Puntos totales otorgados</span>
                    </div>
                    <span className="text-2xl font-bold">{metrics.totalPointsAwarded}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab: Actividad */}
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Actividad Reciente
              </CardTitle>
              <CardDescription>Últimas acciones en el evento</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 py-2 border-b last:border-0">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        activity.type === "registration"
                          ? "bg-blue-500/10 text-blue-500"
                          : "bg-green-500/10 text-green-500"
                      }`}
                    >
                      {activity.type === "registration" ? (
                        <Users className="w-5 h-5" />
                      ) : (
                        <UserCheck className="w-5 h-5" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {activity.type === "registration" ? "Se registró" : "Hizo check-in"}
                        {activity.detail && ` • ${activity.detail}`}
                      </p>
                    </div>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {activity.timestamp
                        ? formatRelativeTime(new Date(activity.timestamp))
                        : "-"}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Componente de tarjeta de métrica
interface MetricCardProps {
  title: string;
  value: number;
  icon: typeof Users;
  description: string;
  trend: "up" | "down" | null;
}

function MetricCard({ title, value, icon: Icon, description, trend }: MetricCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          {trend && (
            <Badge variant={trend === "up" ? "default" : "secondary"}>
              {trend === "up" ? "↑" : "↓"}
            </Badge>
          )}
        </div>
        <div className="mt-4">
          <p className="text-3xl font-bold">{value.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}

// Helper para formatear tiempo relativo
function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "Ahora";
  if (minutes < 60) return `Hace ${minutes}m`;
  if (hours < 24) return `Hace ${hours}h`;
  return `Hace ${days}d`;
}
