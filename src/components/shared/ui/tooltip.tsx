"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "motion/react";
import { cn } from "./cn";
import dynamic from 'next/dynamic';

/** Tipos */
type TooltipItem = {
  id: string | number;
  name: string;
  designation?: string;
  image: string;  
  imageDark?: string;  
  className?: string;
};

type AnimatedTooltipProps = {
  items: TooltipItem[];
  className?: string;
  /** Posicion del tooltip: 'top' | 'bottom' | 'left' | 'right' */
  position?: 'top' | 'bottom' | 'left' | 'right';
};

const springConfig = { stiffness: 100, damping: 15 };

const getTooltipPositionClasses = (position: 'top' | 'bottom' | 'left' | 'right') => {
  switch (position) {
    case 'top':
      return 'absolute -top-12 left-1/2 -translate-x-1/2'; 
    case 'bottom':
      return 'absolute -bottom-12 left-1/2 -translate-x-1/2';
    case 'left':
      return 'absolute top-1/2 -left-12 -translate-y-1/2';
    case 'right':
      return 'absolute top-1/2 -right-12 -translate-y-1/2';
    default:
      return 'absolute -top-12 left-1/2 -translate-x-1/2';
  }
};

function AnimatedTooltipComponent({
  items,
  className,
  position = 'top',
}: AnimatedTooltipProps) {
  const [hoveredId, setHoveredId] = useState<string | number | null>(null);
  const [isClient, setIsClient] = useState(false);
  const x = useMotionValue(0);
  const frameRef = useRef<number | null>(null);

  const rotate = useSpring(useTransform(x, [-100, 100], [-45, 45]), springConfig);
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  );

  useEffect(() => {
    setIsClient(true);
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isClient) return;
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      const target = event.currentTarget;
      if (!target) return;
      
      const rect = target.getBoundingClientRect();
      const localX = event.clientX - rect.left;
      x.set(localX - rect.width / 2);
    });
  };

  return (
    <div className={cn("flex items-center justify-center", className)}>
      {items.map((item) => (
        <div
          key={item.id}
          className="group relative -mr-4"
          onMouseEnter={() => setHoveredId(item.id)}
          onMouseLeave={() => setHoveredId(null)}
          onMouseMove={handleMouseMove}
        >
          <AnimatePresence>
            {hoveredId === item.id && isClient && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { type: "spring", stiffness: 260, damping: 10 },
                }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                style={{ translateX, rotate, whiteSpace: "nowrap" }}
                className={cn(
                  getTooltipPositionClasses(position),
                  "z-50 flex flex-col items-center rounded-md bg-black px-2 py-1 text-xs shadow-xl"
                )}
              >
                <div className="relative z-30 text-sm font-bold text-white">
                  {item.name}
                </div>
                {item.designation && (
                  <div className="text-xs text-white/90">{item.designation}</div>
                )}
                
                <div className="absolute inset-x-10 -bottom-px z-30 h-px w-[20%] bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
                <div className="absolute -bottom-px left-10 z-30 h-px w-[40%] bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
              </motion.div>
            )}
          </AnimatePresence>

          <div
            className={cn(
              "relative h-14 w-14 rounded-full border-2 border-white overflow-hidden",
              "transition duration-500 group-hover:z-30 group-hover:scale-105",
              item.className
            )}
          >
            {/* Claro */}
            <img
              src={item.image}
              alt={item.name}
              className={cn(
                "absolute inset-0 h-full w-full object-contain bg-transparent",
                item.imageDark ? "dark:hidden" : ""
              )}
              draggable={false}
            />
            {/* Oscuro */}
            {item.imageDark && (
              <img
                src={item.imageDark}
                alt={item.name}
                className="absolute inset-0 hidden h-full w-full object-contain bg-transparent dark:block"
                draggable={false}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}


const AnimatedTooltip = dynamic(() => Promise.resolve(AnimatedTooltipComponent), {
  ssr: false,
  loading: () => (
    <div className="h-14 w-14 rounded-full border-2 border-white bg-gray-200 animate-pulse" />
  ),
});

export default AnimatedTooltip;