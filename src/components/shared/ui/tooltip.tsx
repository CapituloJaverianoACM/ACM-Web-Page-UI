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

type TooltipItem = {
  id: string | number;
  name: string;
  designation?: string;
  image: string;  
  imageDark?: string;  
  className?: string;
  html_url?: string; 
};

type AnimatedTooltipProps = {
  items: TooltipItem[];
  className?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  tooltipOffset?: string;
};

const springConfig = { stiffness: 100, damping: 15 };

function AnimatedTooltipComponent({
  items,
  position = 'top',
  }: AnimatedTooltipProps) {
  const [hoveredIndex, setHoveredIndex] = useState<string | number | null>(null);
  const [isClient, setIsClient] = useState(false);
  const x = useMotionValue(0);
  const animationFrameRef = useRef<number | null>(null);

  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  );
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  );

  useEffect(() => {
    setIsClient(true);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Use currentTarget (which is correctly typed) instead of target to avoid TS2339
  const handleMouseMove = (event: React.MouseEvent<HTMLImageElement>) => {
    if (!isClient) return;

    const target = event.currentTarget;
    const halfWidth = target.offsetWidth / 2;
    const offsetX = event.nativeEvent.offsetX;

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      x.set(offsetX - halfWidth);
    });
  };


  const getPositionClasses = () => {
    switch (position) {
      case 'top':
        return 'absolute -top-16 left-0 -translate-x-1/4';
      case 'bottom':
        return 'absolute -bottom-16 left-0 -translate-x-1/4';
      case 'left':
        return 'absolute top-1/2 -left-16 -translate-y-1/2';
      case 'right':
        return 'absolute top-1/2 -right-16 -translate-y-1/2';
      default:
        return 'absolute -top-16 left-0 -translate-x-1/4';
    }
  };

  return (
    <>
      {items.map((item) => (
        <div
          key={item.id}
          className="group relative -mr-4"
          onMouseEnter={() => setHoveredIndex(item.id)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* */}
          <div className="flex md:hidden justify-center mb-1">
            <span className="w-14 text-center text-[5px] font-montserrat from-neutral-500 dark:text-white truncate">
              {item.name}
            </span>
          </div>
          <AnimatePresence>
            {hoveredIndex === item.id && isClient && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 10,
                  },
                }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                style={{
                  translateX: translateX,
                  rotate: rotate,
                  whiteSpace: "nowrap",
                }}
                className={cn(
                  getPositionClasses(),
                  "z-[100] flex flex-col items-center justify-center rounded-lg bg-black/90 backdrop-blur-sm px-3 py-2 text-xs shadow-2xl border border-white/10"
                )}
              >
                <div className="absolute inset-x-10 -bottom-px z-30 h-0.5 w-[40%] bg-gradient-to-r from-transparent via-blue-400 to-transparent" />
                <div className="absolute -bottom-px left-10 z-30 h-px w-[70%] bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />
                <div className="relative z-30 text-sm font-semibold text-white mb-0.5">
                  {item.name}
                </div>
                {item.designation && (
                  <div className="text-xs text-white/80">{item.designation}</div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <div
            className={cn(
              "relative h-14 w-14 rounded-full border-2 border-white overflow-hidden cursor-pointer",
              "!m-0 !p-0 transition duration-500 group-hover:z-[100] group-hover:scale-105",
              item.className
            )}
            onClick={() => {
              if (item.html_url) { 
                window.open(item.html_url, '_blank');
              }
            }}
          >
            {/* Imagen clara */}
            <img
              onMouseMove={handleMouseMove}
              src={item.image}
              alt={item.name}
              className={cn(
                "absolute inset-0 h-full w-full object-cover object-top bg-transparent",
                item.imageDark ? "dark:hidden" : ""
              )}
              draggable={false}
            />
            {/* Imagen oscura */}
            {item.imageDark && (
              <img
                onMouseMove={handleMouseMove}
                src={item.imageDark}
                alt={item.name}
                className="absolute inset-0 hidden h-full w-full object-cover object-top bg-transparent dark:block"
                draggable={false}
              />
            )}
          </div>
        </div>
      ))}
    </>
  );
}


const AnimatedTooltip = dynamic(() => Promise.resolve(AnimatedTooltipComponent), {
  ssr: false,
  loading: () => (
    <div className="flex items-center">
      {Array.from({ length: 3 }).map((_, i) => (
        <div 
          key={i}
          className="h-14 w-14 rounded-full border-2 border-white bg-gray-200 animate-pulse -mr-4" 
        />
      ))}
    </div>
  ),
});

export default AnimatedTooltip;