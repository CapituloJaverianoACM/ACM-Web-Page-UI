"use client";

import { Button } from "@/components/shared/ui/button";
import { useState, useEffect } from "react";

// Props que recibirá el componente, incluyendo la fecha del evento.
interface EventCountdownProps {
  eventDate: Date;
}

// Interfaz para la estructura del tiempo restante.
interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function EventCountdown({ eventDate }: EventCountdownProps) {
  // Estado para simular si el usuario ya se ha registrado.
  const [isRegistered, setIsRegistered] = useState(false);

  // Estado para guardar el tiempo restante.
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  // Estado para saber si el check-in está disponible.
  const [isCheckInAvailable, setIsCheckInAvailable] = useState(false);

  // Función para calcular el tiempo restante hasta el check-in.
  const calculateTimeLeft = () => {
    // El check-in comienza 2 horas antes del evento.
    const checkInStartDate = new Date(eventDate.getTime() - 2 * 60 * 60 * 1000);
    const difference = +checkInStartDate - +new Date();

    let timeLeft: TimeLeft | null = null;

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      // Si la diferencia es 0 o negativa, el check-in está abierto.
      setIsCheckInAvailable(true);
    }

    return timeLeft;
  };

  // useEffect para actualizar el temporizador cada segundo si el usuario está registrado.
  useEffect(() => {
    if (isRegistered) {
      const timer = setInterval(() => {
        const newTimeLeft = calculateTimeLeft();
        if (newTimeLeft) {
          setTimeLeft(newTimeLeft);
        } else {
          clearInterval(timer);
        }
      }, 1000);

      // Limpia el intervalo cuando el componente se desmonte.
      return () => clearInterval(timer);
    }
  }, [isRegistered, eventDate]);

  // Simula la acción de registrarse.
  const handleRegister = () => {
    setIsRegistered(true);
    setTimeLeft(calculateTimeLeft()); // Calcula el tiempo inicial al registrarse.
  };

  // Renderizado del componente
  if (!isRegistered) {
    return (
      <Button onClick={handleRegister} className="btn btn--primary">
        Registrarse
      </Button>
    );
  }

  if (isCheckInAvailable) {
    return (
      <Button className="bg-green-500 hover:bg-green-600 text-white btn btn--primary">
        Check-in
      </Button>
    );
  }

  return (
    <div className="text-center p-4 rounded-lg bg-gray-100 dark:bg-gray-800 shadow-md">
      <h3 className="text-lg font-semibold mb-2 dark:text-white">
        Tiempo para el Check-in:
      </h3>
      {timeLeft ? (
        <div className="grid grid-flow-col gap-5 text-center auto-cols-max justify-center">
          <div className="flex flex-col">
            <span className="font-mono text-3xl">
              {String(timeLeft.days).padStart(2, "0")}
            </span>
            días
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-3xl">
              {String(timeLeft.hours).padStart(2, "0")}
            </span>
            horas
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-3xl">
              {String(timeLeft.minutes).padStart(2, "0")}
            </span>
            min
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-3xl">
              {String(timeLeft.seconds).padStart(2, "0")}
            </span>
            seg
          </div>
        </div>
      ) : (
        <p>Cargando temporizador...</p>
      )}
    </div>
  );
}
