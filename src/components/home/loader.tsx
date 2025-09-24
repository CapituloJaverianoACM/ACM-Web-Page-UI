"use client";
import React from "react";


type LoaderPacmanProps = {
  size?: number;
  color?: string;
  speed?: number;
  dark?: boolean;
};


const LoaderPacman: React.FC<LoaderPacmanProps> = ({
  size = 25,
  color,
  speed = 0.5,
  dark = false,
}) => {
  const styleVars: React.CSSProperties = {
    // @ts-expect-error css var
    "--size": `${size}px`,
    "--color": color ?? "var(--loader-color)",
    "--speed": `${speed}s`,
  };

  return (
    <div className="pacman" style={styleVars} aria-label="Loading">
      {/* UP */}
      <div />
      {/* DOWN */}
      <div />
      {/* BALLS */}
      <div />
      <div />
      <div />
      <div />

      <style jsx>{`
        .pacman {
          position: relative;
          width: calc(var(--size) * 4);
          height: calc(var(--size) * 2);
          display: inline-block;
        }

        /* Mitades de Pacman (triángulos con border) */
        .pacman > div:first-of-type,
        .pacman > div:nth-child(2) {
          width: 0px;
          height: 0px;
          border-right: var(--size) solid transparent;
          border-top: var(--size) solid var(--color);
          border-left: var(--size) solid var(--color);
          border-bottom: var(--size) solid var(--color);
          border-radius: var(--size);
          position: relative;
          left: -30px;
        }

        .pacman > div:first-of-type {
          animation: rotate_pacman_half_up var(--speed) 0s infinite;
        }
        
        .pacman > div:nth-child(2) {
          animation: rotate_pacman_half_down var(--speed) 0s infinite;
          margin-top: calc(-2 * var(--size));
        }

        /* Bolitas */
        .pacman > div:nth-child(3),
        .pacman > div:nth-child(4),
        .pacman > div:nth-child(5),
        .pacman > div:nth-child(6) {
          background-color: var(--color);
          border-radius: 50%;
          width: 10px;
          height: 10px;
          position: absolute;
          transform: translate(0, calc(-1 * var(--size) / 4));
          top: calc(var(--size));
          left: calc(var(--size) * 2.8);
        }

        .pacman > div:nth-child(3) {
          animation: pacman-balls 1s -1s infinite linear;
        }
        .pacman > div:nth-child(4) {
          animation: pacman-balls 1s -0.67s infinite linear;
        }
        .pacman > div:nth-child(5) {
          animation: pacman-balls 1s -0.33s infinite linear;
        }
        .pacman > div:nth-child(6) {
          animation: pacman-balls 1s 0s infinite linear;
        }

        @keyframes rotate_pacman_half_up {
          0% {
            transform: rotate(270deg);
          }
          50% {
            transform: rotate(360deg);
          }
          100% {
            transform: rotate(270deg);
          }
        }

        @keyframes rotate_pacman_half_down {
          0% {
            transform: rotate(90deg);
          }
          50% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(90deg);
          }
        }

        @keyframes pacman-balls {
          75% {
            opacity: 0.7;
          }
          100% {
            transform: translate(calc(-4 * var(--size)), calc(-1 * var(--size) / 4));
          }
        }
      `}</style>
    </div>
  );
};

export default LoaderPacman;