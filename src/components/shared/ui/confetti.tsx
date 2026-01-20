"use client";
import React from "react";
import CanvasConfetti from "react-canvas-confetti/dist/presets/fireworks";

const Confetti: React.FC = () => {
  return <CanvasConfetti autorun={{ speed: 1, duration: 1000 }} />;
};

export default Confetti;
