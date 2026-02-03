"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Navigation,
  MapPin,
  Users,
  Layers,
  ZoomIn,
  ZoomOut,
  Locate,
  Coffee,
  DoorOpen,
  Mic,
  Info,
} from "lucide-react";
import type { Beacon } from "@/shared/db/schema";

interface IndoorMapProps {
  beacons: Beacon[];
  currentLocation?: { x: number; y: number; floor: number };
  heatmapData?: { x: number; y: number; count: number }[];
  selectedDestination?: { x: number; y: number; floor: number };
  routePath?: { x: number; y: number; floor: number; instruction?: string }[];
  onBeaconClick?: (beacon: Beacon) => void;
  onLocationSelect?: (x: number, y: number, floor: number) => void;
  mapImage?: string;
}

const ROOM_ICONS: Record<string, typeof Mic> = {
  sala: Mic,
  auditorio: Mic,
  coffee: Coffee,
  networking: Users,
  registro: DoorOpen,
};

export function IndoorMap({
  beacons,
  currentLocation,
  heatmapData = [],
  selectedDestination,
  routePath = [],
  onBeaconClick,
  onLocationSelect,
  mapImage,
}: IndoorMapProps) {
  const [zoom, setZoom] = useState(1);
  const [floor, setFloor] = useState(0);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  // Filtrar beacons por piso
  const visibleBeacons = beacons.filter((b) => b.floor === floor);

  // Calcular dimensiones del mapa
  const mapWidth = 800;
  const mapHeight = 600;

  // Obtener pisos únicos
  const floors = [...new Set(beacons.map((b) => b.floor))].sort();

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoom((prev) => Math.min(Math.max(prev + delta, 0.5), 3));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      setIsDragging(true);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan((prev) => ({
        x: prev.x + e.movementX,
        y: prev.y + e.movementY,
      }));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const centerOnLocation = () => {
    if (currentLocation) {
      setPan({
        x: mapWidth / 2 - currentLocation.x * zoom,
        y: mapHeight / 2 - currentLocation.y * zoom,
      });
      setFloor(currentLocation.floor);
    }
  };

  const handleMapClick = (e: React.MouseEvent) => {
    if (!onLocationSelect || isDragging) return;

    const rect = mapRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = (e.clientX - rect.left - pan.x) / zoom;
    const y = (e.clientY - rect.top - pan.y) / zoom;

    onLocationSelect(x, y, floor);
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Navigation className="w-5 h-5" />
          Mapa del Evento
        </CardTitle>

        <div className="flex items-center gap-2">
          {/* Selector de piso */}
          {floors.length > 1 && (
            <div className="flex items-center gap-1 bg-muted rounded-md p-1">
              <Layers className="w-4 h-4 text-muted-foreground mx-1" />
              {floors.map((f) => (
                <Button
                  key={f}
                  variant={floor === f ? "default" : "ghost"}
                  size="sm"
                  className="h-7 px-2"
                  onClick={() => setFloor(f || 0)}
                >
                  P{f}
                </Button>
              ))}
            </div>
          )}

          {/* Toggle de mapa de calor */}
          <Button
            variant={showHeatmap ? "default" : "outline"}
            size="sm"
            onClick={() => setShowHeatmap(!showHeatmap)}
          >
            <Users className="w-4 h-4" />
          </Button>

          {/* Controles de zoom */}
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setZoom((prev) => Math.min(prev + 0.2, 3))}
            >
              <ZoomIn className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setZoom((prev) => Math.max(prev - 0.2, 0.5))}
            >
              <ZoomOut className="w-4 h-4" />
            </Button>
            {currentLocation && (
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={centerOnLocation}
              >
                <Locate className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div
          ref={mapRef}
          className="relative overflow-hidden bg-slate-100 dark:bg-slate-900"
          style={{ height: "500px" }}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onClick={handleMapClick}
        >
          {/* Contenedor del mapa con transformaciones */}
          <div
            className="absolute"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transformOrigin: "0 0",
              width: mapWidth,
              height: mapHeight,
            }}
          >
            {/* Imagen de fondo del mapa */}
            {mapImage ? (
              <img
                src={mapImage}
                alt="Mapa del evento"
                className="absolute inset-0 w-full h-full object-contain"
                draggable={false}
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-700">
                {/* Grid de referencia */}
                <svg className="absolute inset-0 w-full h-full">
                  <defs>
                    <pattern
                      id="grid"
                      width="50"
                      height="50"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 50 0 L 0 0 0 50"
                        fill="none"
                        stroke="rgba(0,0,0,0.1)"
                        strokeWidth="1"
                      />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>
            )}

            {/* Mapa de calor */}
            {showHeatmap &&
              heatmapData.map((zone, i) => (
                <div
                  key={i}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    left: zone.x,
                    top: zone.y,
                    width: 60,
                    height: 60,
                    background: `radial-gradient(circle, rgba(255,100,100,${Math.min(zone.count * 0.2, 0.8)}) 0%, transparent 70%)`,
                    transform: "translate(-50%, -50%)",
                  }}
                />
              ))}

            {/* Ruta de navegación */}
            {routePath.length > 1 && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <polyline
                  points={routePath.map((p) => `${p.x},${p.y}`).join(" ")}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="10,5"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="15"
                    to="0"
                    dur="0.5s"
                    repeatCount="indefinite"
                  />
                </polyline>
              </svg>
            )}

            {/* Beacons/POIs */}
            {visibleBeacons.map((beacon) => {
              if (beacon.x === null || beacon.y === null) return null;

              const IconComponent =
                ROOM_ICONS[
                  Object.keys(ROOM_ICONS).find((key) =>
                    beacon.name.toLowerCase().includes(key)
                  ) || ""
                ] || MapPin;

              return (
                <button
                  key={beacon.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                  style={{ left: beacon.x, top: beacon.y }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onBeaconClick?.(beacon);
                  }}
                >
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    {/* Tooltip */}
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      {beacon.name}
                    </div>
                  </div>
                </button>
              );
            })}

            {/* Ubicación actual del usuario */}
            {currentLocation && currentLocation.floor === floor && (
              <div
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{ left: currentLocation.x, top: currentLocation.y }}
              >
                <div className="relative">
                  <div className="w-6 h-6 rounded-full bg-blue-500 border-4 border-white shadow-lg animate-pulse" />
                  <div className="absolute inset-0 rounded-full bg-blue-500/30 animate-ping" />
                </div>
              </div>
            )}

            {/* Destino seleccionado */}
            {selectedDestination && selectedDestination.floor === floor && (
              <div
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{ left: selectedDestination.x, top: selectedDestination.y }}
              >
                <div className="w-8 h-8 rounded-full bg-green-500 border-4 border-white shadow-lg flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
              </div>
            )}
          </div>

          {/* Instrucciones de navegación */}
          {routePath.length > 0 && (
            <div className="absolute bottom-4 left-4 right-4 bg-background/95 backdrop-blur rounded-lg shadow-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                  <Navigation className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">
                    {routePath[0]?.instruction || "Sigue el camino"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Próximo: {routePath[1]?.instruction || "Destino"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Leyenda */}
        <div className="p-4 border-t flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            Tu ubicación
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            Destino
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-primary" />
            Punto de interés
          </div>
          {showHeatmap && (
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              Zona concurrida
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Componente para instrucciones paso a paso
interface NavigationInstructionsProps {
  steps: { instruction: string; distance?: number }[];
  currentStep: number;
  onClose: () => void;
}

export function NavigationInstructions({
  steps,
  currentStep,
  onClose,
}: NavigationInstructionsProps) {
  return (
    <Card className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 z-50">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold flex items-center gap-2">
            <Navigation className="w-4 h-4 text-primary" />
            Navegación
          </h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            Cerrar
          </Button>
        </div>

        <div className="space-y-3">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 ${
                index === currentStep
                  ? "text-primary"
                  : index < currentStep
                  ? "text-muted-foreground"
                  : ""
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${
                  index === currentStep
                    ? "bg-primary text-primary-foreground"
                    : index < currentStep
                    ? "bg-muted"
                    : "border-2"
                }`}
              >
                {index < currentStep ? "✓" : index + 1}
              </div>
              <div className="flex-1">
                <p className={index === currentStep ? "font-medium" : ""}>
                  {step.instruction}
                </p>
                {step.distance && (
                  <p className="text-xs text-muted-foreground">
                    ~{step.distance}m
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
