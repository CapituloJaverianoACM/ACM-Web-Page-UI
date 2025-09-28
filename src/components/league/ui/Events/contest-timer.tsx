import React, { useState, useEffect } from 'react';
import { checkInForContest } from '@/controllers/participation.controller';
import EventCard from './event-card';

interface ContestTimerProps {
  startTime: string; // La fecha y hora de inicio del concurso
  contestId: number;
  studentId: number;
  hasCheckedIn: boolean;
}

const ContestTimer: React.FC<ContestTimerProps> = ({ startTime, contestId, studentId, hasCheckedIn }) => {
  // Función para calcular el tiempo restante
  const calculateRemainingTime = () => {
    const difference = +new Date(startTime) - +new Date();
    let remaining = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      remaining = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return remaining;
  };

  // Estados del componente
  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());
  const [isCheckInEnabled, setCheckInEnabled] = useState(false);
  const [checkedIn, setCheckedIn] = useState(hasCheckedIn);

  // Efecto para actualizar el temporizador cada segundo
  // Efecto para actualizar el temporizador cada segundo
  useEffect(() => {
    const timer = setInterval(() => {
      const newRemainingTime = calculateRemainingTime();
      setRemainingTime(newRemainingTime);

      // Lógica para habilitar el check-in
      const totalHoursRemaining = (newRemainingTime.days * 24) + newRemainingTime.hours;
      if (totalHoursRemaining < 2) {
        setCheckInEnabled(true);
      }

      // Detener el temporizador si el tiempo ha terminado (VERSIÓN CORREGIDA)
      if (
        newRemainingTime.days <= 0 &&
        newRemainingTime.hours <= 0 &&
        newRemainingTime.minutes <= 0 &&
        newRemainingTime.seconds <= 0
      ) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer); // Limpieza al desmontar el componente
  }, [startTime]);

  // Función para manejar el clic en el botón de check-in
  const handleCheckIn = async () => {
    try {
      await checkInForContest(contestId, studentId);
      setCheckedIn(true);
    } catch (error) {
      alert((error as Error).message);
    }
  };

  // Renderizado condicional
  if (checkedIn) {
    return (
      <div className="text-center p-4">
        <p className="font-semibold text-green-600">¡Ya estás listo!</p>
        <p className="text-sm">Ya estamos a menos de dos horas de empezar, ¡prepárate!</p>
      </div>
    );
  }

  return (
    <div className="p-4 text-center">
      <p className="font-semibold mb-2">Falta para el concurso:</p>
      <div className="flex justify-center gap-4 mb-4">
        <div>
          <span className="text-2xl font-bold">{remainingTime.days}</span>
          <span className="block text-xs">Días</span>
        </div>
        <div>
          <span className="text-2xl font-bold">{remainingTime.hours}</span>
          <span className="block text-xs">Horas</span>
        </div>
        <div>
          <span className="text-2xl font-bold">{remainingTime.minutes}</span>
          <span className="block text-xs">Minutos</span>
        </div>
        <div>
          <span className="text-2xl font-bold">{remainingTime.seconds}</span>
          <span className="block text-xs">Segundos</span>
        </div>
      </div>
      {isCheckInEnabled && (
        <EventCard.RegisterButton onClick={handleCheckIn}>
          Hacer Check-in
        </EventCard.RegisterButton>
      )}
    </div>
  );
};

export default ContestTimer;