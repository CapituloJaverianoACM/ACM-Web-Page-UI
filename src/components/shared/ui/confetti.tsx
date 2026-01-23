"use client";
import React from "react";
import CanvasConfetti from "react-canvas-confetti/dist/presets/fireworks";

export interface ConfettiProps {
  duration?: number;
}

const Confetti: React.FC<ConfettiProps> = ({ duration = 1000 }) => {
  return <CanvasConfetti autorun={{ speed: 1, duration }} />;
};

export default Confetti;
