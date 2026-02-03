"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Scale,
  Search,
  Download,
  Upload,
  Users,
  CheckCircle,
  Clock,
  Star,
  BookOpen,
  UserPlus,
  Filter,
  FileSpreadsheet,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Datos de ejemplo para la demo
const MOCK_ATTENDEES = [
  {
    id: "1",
    name: "Juan Carlos Ramirez",
    email: "jramirez@despacho.mx",
    company: "Ramirez & Asociados",
    package: "TODO INCLUIDO",
    isBarrista: true,
    barristaNumber: "BMA-12345",
    paymentStatus: "paid",
    priceAtRegistration: 14000,
    createdAt: "2025-10-15",
  },
  {
    id: "2",
    name: "Maria Elena Torres",
    email: "metorres@legal.com",
    company: "Torres Legal",
    package: "SESIONES ACADEMICAS",
    isBarrista: true,
    barristaNumber: "BMA-23456",
    paymentStatus: "paid",
    priceAtRegistration: 12000,
    createdAt: "2025-10-18",
  },
  {
    id: "3",
    name: "Roberto Garcia Lopez",
    email: "rgarcia@gmail.com",
    company: "Garcia Abogados",
    package: "TODO INCLUIDO",
    isBarrista: false,
    barristaNumber: null,
    paymentStatus: "pending",
    priceAtRegistration: 16000,
    createdAt: "2025-10-20",
  },
  {
    id: "4",
    name: "Ana Patricia Mendez",
    email: "apmendez@juridico.mx",
    company: "Mendez & Hijos",
    package: "ACOMPAÑANTES",
    isBarrista: true,
    barristaNumber: "BMA-34567",
    paymentStatus: "paid",
    priceAtRegistration: 7300,
    createdAt: "2025-10-22",
  },
  {
    id: "5",
    name: "Fernando Ortiz Vega",
    email: "fortiz@despachoortiz.com",
    company: "Ortiz Vega SC",
    package: "TODO INCLUIDO",
    isBarrista: false,
    barristaNumber: null,
    paymentStatus: "pending",
    priceAtRegistration: 18000,
    createdAt: "2025-11-01",
  },
  {
    id: "6",
    name: "Lucia Hernandez Diaz",
    email: "lhernandez@abogados.mx",
    company: "Hernandez Legal",
    package: "SESIONES ACADEMICAS",
    isBarrista: true,
    barristaNumber: "BMA-45678",
    paymentStatus: "paid",
    priceAtRegistration: 12000,
    createdAt: "2025-11-05",
  },
];

type PaymentStatus = "all" | "paid" | "pending";
type PackageFilter = "all" | "TODO INCLUIDO" | "SESIONES ACADEMICAS" | "ACOMPAÑANTES";
type BarristaFilter = "all" | "barrista" | "no_barrista";

export default function AsistentesAdminPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<PaymentStatus>("all");
  const [packageFilter, setPackageFilter] = useState<PackageFilter>("all");
  const [barristaFilter, setBarristaFilter] = useState<BarristaFilter>("all");
  const [showImportDialog, setShowImportDialog] = useState(false);

  // Filtrar asistentes
  const filteredAttendees = useMemo(() => {
    return MOCK_ATTENDEES.filter((attendee) => {
      // Búsqueda por texto
      const matchesSearch =
        attendee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        attendee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        attendee.company?.toLowerCase().includes(searchTerm.toLowerCase());

      // Filtro por status de pago
      const matchesStatus =
        statusFilter === "all" || attendee.paymentStatus === statusFilter;

      // Filtro por paquete
      const matchesPackage =
        packageFilter === "all" || attendee.package === packageFilter;

      // Filtro por tipo de usuario
      const matchesBarrista =
        barristaFilter === "all" ||
        (barristaFilter === "barrista" && attendee.isBarrista) ||
        (barristaFilter === "no_barrista" && !attendee.isBarrista);

      return matchesSearch && matchesStatus && matchesPackage && matchesBarrista;
    });
  }, [searchTerm, statusFilter, packageFilter, barristaFilter]);

  // Estadísticas
  const stats = useMemo(() => {
    const total = MOCK_ATTENDEES.length;
    const paid = MOCK_ATTENDEES.filter((a) => a.paymentStatus === "paid").length;
    const pending = total - paid;
    const barristas = MOCK_ATTENDEES.filter((a) => a.isBarrista).length;
    const byPackage = {
      "TODO INCLUIDO": MOCK_ATTENDEES.filter((a) => a.package === "TODO INCLUIDO").length,
      "SESIONES ACADEMICAS": MOCK_ATTENDEES.filter((a) => a.package === "SESIONES ACADEMICAS")
        .length,
      ACOMPAÑANTES: MOCK_ATTENDEES.filter((a) => a.package === "ACOMPAÑANTES").length,
    };
    const totalRevenue = MOCK_ATTENDEES.filter((a) => a.paymentStatus === "paid").reduce(
      (sum, a) => sum + a.priceAtRegistration,
      0
    );

    return { total, paid, pending, barristas, byPackage, totalRevenue };
  }, []);

  // Exportar CSV
  const handleExportCSV = () => {
    const headers = [
      "Nombre",
      "Email",
      "Empresa",
      "Paquete",
      "Barrista",
      "No. Barrista",
      "Estado Pago",
      "Precio",
      "Fecha Registro",
    ];
    const rows = filteredAttendees.map((a) => [
      a.name,
      a.email,
      a.company || "",
      a.package,
      a.isBarrista ? "Sí" : "No",
      a.barristaNumber || "",
      a.paymentStatus === "paid" ? "Pagado" : "Pendiente",
      a.priceAtRegistration,
      a.createdAt,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `asistentes_bma2026_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  // Importar CSV (demo)
  const handleImportCSV = () => {
    // En producción, esto procesaría el archivo CSV
    alert("Funcionalidad de importación - En desarrollo.\n\nFormato esperado:\nemail,nombre,paymentStatus");
    setShowImportDialog(false);
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      minimumFractionDigits: 0,
    }).format(amount);

  const getPackageIcon = (pkg: string) => {
    switch (pkg) {
      case "TODO INCLUIDO":
        return Star;
      case "SESIONES ACADEMICAS":
        return BookOpen;
      case "ACOMPAÑANTES":
        return Users;
      default:
        return Users;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 flex h-16 items-center justify-between">
          <Link href="/evento" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Scale className="w-5 h-5 text-primary" />
            </div>
            <div>
              <span className="font-bold text-lg text-foreground">BMA 2026</span>
              <p className="text-xs text-muted-foreground">Panel de Administración</p>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/evento">
              <Button variant="outline" size="sm">
                Ver Evento
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Gestión de Asistentes</h1>
          <p className="text-muted-foreground">
            XX Congreso Nacional de la Abogacía - Febrero 2026
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                  <p className="text-sm text-muted-foreground">Total Registros</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.paid}</p>
                  <p className="text-sm text-muted-foreground">Pagados</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.pending}</p>
                  <p className="text-sm text-muted-foreground">Pendientes</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                  <Scale className="w-5 h-5 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {Math.round((stats.barristas / stats.total) * 100)}%
                  </p>
                  <p className="text-sm text-muted-foreground">Barristas</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Revenue & Package Distribution */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Ingresos Confirmados</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">{formatCurrency(stats.totalRevenue)}</p>
              <p className="text-sm text-muted-foreground mt-1">
                De {stats.paid} pagos confirmados
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Distribución por Paquete</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.entries(stats.byPackage).map(([pkg, count]) => {
                  const Icon = getPackageIcon(pkg);
                  const percentage = Math.round((count / stats.total) * 100);
                  return (
                    <div key={pkg} className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm flex-1">{pkg}</span>
                      <span className="text-sm font-medium">{count}</span>
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
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

        {/* Filters & Actions */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nombre, email o empresa..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-2">
                <Select
                  value={statusFilter}
                  onValueChange={(v) => setStatusFilter(v as PaymentStatus)}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="paid">Pagados</SelectItem>
                    <SelectItem value="pending">Pendientes</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={packageFilter}
                  onValueChange={(v) => setPackageFilter(v as PackageFilter)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Paquete" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los paquetes</SelectItem>
                    <SelectItem value="TODO INCLUIDO">Todo Incluido</SelectItem>
                    <SelectItem value="SESIONES ACADEMICAS">Sesiones Académicas</SelectItem>
                    <SelectItem value="ACOMPAÑANTES">Acompañantes</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={barristaFilter}
                  onValueChange={(v) => setBarristaFilter(v as BarristaFilter)}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="barrista">Barristas</SelectItem>
                    <SelectItem value="no_barrista">No Barristas</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Dialog open={showImportDialog} onOpenChange={setShowImportDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Upload className="w-4 h-4 mr-2" />
                      Importar
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Importar CSV de Pagos</DialogTitle>
                      <DialogDescription>
                        Sube un archivo CSV con los emails de asistentes que han confirmado su pago.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                        <FileSpreadsheet className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Arrastra tu archivo CSV aquí o haz clic para seleccionar
                        </p>
                        <Input type="file" accept=".csv" className="max-w-xs mx-auto" />
                      </div>
                      <div className="bg-muted/50 rounded-lg p-4">
                        <p className="text-sm font-medium mb-2">Formato esperado:</p>
                        <code className="text-xs bg-background p-2 rounded block">
                          email,paymentReference,paymentDate
                          <br />
                          juan@email.com,REF123,2025-10-15
                        </code>
                      </div>
                      <Button onClick={handleImportCSV} className="w-full">
                        Procesar Importación
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button onClick={handleExportCSV}>
                  <Download className="w-4 h-4 mr-2" />
                  Exportar CSV
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Asistente</TableHead>
                  <TableHead>Paquete</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Precio</TableHead>
                  <TableHead>Registro</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAttendees.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <AlertCircle className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-muted-foreground">No se encontraron asistentes</p>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAttendees.map((attendee) => {
                    const PackageIcon = getPackageIcon(attendee.package);
                    return (
                      <TableRow key={attendee.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium text-foreground">{attendee.name}</p>
                            <p className="text-sm text-muted-foreground">{attendee.email}</p>
                            {attendee.company && (
                              <p className="text-xs text-muted-foreground">{attendee.company}</p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <PackageIcon className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">{attendee.package}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {attendee.isBarrista ? (
                            <Badge variant="secondary" className="bg-accent/20 text-accent-foreground">
                              Barrista
                            </Badge>
                          ) : (
                            <Badge variant="outline">No Barrista</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {attendee.paymentStatus === "paid" ? (
                            <Badge className="bg-green-500/20 text-green-700 border-green-500/30">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Pagado
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-amber-600 border-amber-500/30">
                              <Clock className="w-3 h-3 mr-1" />
                              Pendiente
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {formatCurrency(attendee.priceAtRegistration)}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(attendee.createdAt).toLocaleDateString("es-MX", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Results count */}
        <p className="text-sm text-muted-foreground mt-4 text-center">
          Mostrando {filteredAttendees.length} de {MOCK_ATTENDEES.length} asistentes
        </p>
      </main>
    </div>
  );
}
