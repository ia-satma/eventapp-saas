"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Heart,
  X,
  Linkedin,
  Briefcase,
  MapPin,
  Target,
  Gift,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from "lucide-react";
import type { Attendee } from "@/shared/db/schema";
import { motion, AnimatePresence, PanInfo } from "framer-motion";

interface ProfileCardProps {
  attendee: Attendee;
  matchScore: number;
  onLike: () => void;
  onPass: () => void;
  isLoading?: boolean;
}

export function ProfileCard({
  attendee,
  matchScore,
  onLike,
  onPass,
  isLoading = false,
}: ProfileCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [exitDirection, setExitDirection] = useState<"left" | "right" | null>(null);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 100;
    if (info.offset.x > threshold) {
      setExitDirection("right");
      setTimeout(onLike, 200);
    } else if (info.offset.x < -threshold) {
      setExitDirection("left");
      setTimeout(onPass, 200);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 0.7) return "text-green-500";
    if (score >= 0.4) return "text-yellow-500";
    return "text-orange-500";
  };

  const initials = attendee.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      animate={
        exitDirection === "left"
          ? { x: -500, opacity: 0, rotate: -20 }
          : exitDirection === "right"
          ? { x: 500, opacity: 0, rotate: 20 }
          : { x: 0, opacity: 1, rotate: 0 }
      }
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="cursor-grab active:cursor-grabbing"
    >
      <Card className="overflow-hidden">
        {/* Header con avatar y score */}
        <div className="relative h-48 bg-gradient-to-br from-primary/20 to-primary/5">
          <div className="absolute inset-0 flex items-center justify-center">
            <Avatar className="w-32 h-32 border-4 border-background shadow-xl">
              <AvatarImage src={undefined} alt={attendee.name} />
              <AvatarFallback className="text-4xl bg-primary/10">
                {initials}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Match score badge */}
          <div className="absolute top-4 right-4">
            <Badge variant="secondary" className="gap-1 px-3 py-1">
              <Sparkles className="w-3 h-3" />
              <span className={getScoreColor(matchScore)}>
                {Math.round(matchScore * 100)}% match
              </span>
            </Badge>
          </div>
        </div>

        <CardContent className="p-6">
          {/* Nombre y empresa */}
          <div className="text-center mb-4">
            <h3 className="text-2xl font-bold">{attendee.name}</h3>
            {(attendee.title || attendee.company) && (
              <p className="text-muted-foreground flex items-center justify-center gap-2 mt-1">
                <Briefcase className="w-4 h-4" />
                {attendee.title}
                {attendee.title && attendee.company && " @ "}
                {attendee.company}
              </p>
            )}
          </div>

          {/* Intereses */}
          {attendee.interests && attendee.interests.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center mb-4">
              {attendee.interests.slice(0, 4).map((interest) => (
                <Badge key={interest} variant="outline">
                  {interest}
                </Badge>
              ))}
              {attendee.interests.length > 4 && (
                <Badge variant="outline">+{attendee.interests.length - 4}</Badge>
              )}
            </div>
          )}

          {/* Bio resumida o expandida */}
          {attendee.bio && (
            <div className="mb-4">
              <p
                className={`text-center text-muted-foreground ${
                  expanded ? "" : "line-clamp-2"
                }`}
              >
                {attendee.bio}
              </p>
              {attendee.bio.length > 100 && (
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="text-sm text-primary flex items-center justify-center w-full mt-1"
                >
                  {expanded ? (
                    <>
                      <ChevronUp className="w-4 h-4" /> Ver menos
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4" /> Ver más
                    </>
                  )}
                </button>
              )}
            </div>
          )}

          {/* Looking for / Offering */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {attendee.lookingFor && (
              <div className="p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-2 text-sm font-medium mb-1">
                  <Target className="w-4 h-4 text-primary" />
                  Busca
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {attendee.lookingFor}
                </p>
              </div>
            )}
            {attendee.offering && (
              <div className="p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-2 text-sm font-medium mb-1">
                  <Gift className="w-4 h-4 text-green-500" />
                  Ofrece
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {attendee.offering}
                </p>
              </div>
            )}
          </div>

          {/* LinkedIn */}
          {attendee.linkedin && (
            <a
              href={attendee.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-sm text-blue-500 hover:underline mb-6"
            >
              <Linkedin className="w-4 h-4" />
              Ver perfil de LinkedIn
            </a>
          )}

          {/* Botones de acción */}
          <div className="flex gap-4 justify-center">
            <Button
              size="lg"
              variant="outline"
              className="w-16 h-16 rounded-full border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
              onClick={onPass}
              disabled={isLoading}
            >
              <X className="w-8 h-8" />
            </Button>
            <Button
              size="lg"
              className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
              onClick={onLike}
              disabled={isLoading}
            >
              <Heart className="w-8 h-8" />
            </Button>
          </div>

          {/* Hint de swipe */}
          <p className="text-center text-xs text-muted-foreground mt-4">
            Desliza a la derecha para conectar, izquierda para pasar
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Componente para mostrar un match exitoso
interface MatchSuccessProps {
  attendee: Attendee;
  onClose: () => void;
}

export function MatchSuccess({ attendee, onClose }: MatchSuccessProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <Card className="w-full max-w-sm mx-4 text-center overflow-hidden">
        <div className="p-8 bg-gradient-to-br from-pink-500/20 to-rose-500/20">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="text-6xl mb-4"
          >
            🎉
          </motion.div>
          <h2 className="text-2xl font-bold mb-2">¡Es un Match!</h2>
          <p className="text-muted-foreground">
            Tú y {attendee.name} quieren conectar
          </p>
        </div>
        <CardContent className="p-6">
          <Avatar className="w-20 h-20 mx-auto mb-4 border-4 border-primary">
            <AvatarFallback className="text-2xl">
              {attendee.name.split(" ").map((n) => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <p className="text-sm text-muted-foreground mb-4">
            Ahora pueden enviarse mensajes y coordinar una reunión
          </p>
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Seguir explorando
            </Button>
            <Button className="flex-1">Enviar mensaje</Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
