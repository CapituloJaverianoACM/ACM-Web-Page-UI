"use client";
import { ACMPATH } from "./acm-logo-raw-path";

const SvgShineLoader = ({
  svgPath,
  viewBox = "0 0 100 100",
  size = 200,
  color = "#4a90e2",
  strokeColor = "#2171b5",
  duration = "2s",
  rotate = false,
  shineIntensity = 0.9,
  shineWidth = 25,
  shineAngle = 45, // Ángulo del shine para efecto más realista
}) => {
  const maskId = `mask-${Math.random().toString(36).substr(2, 9)}`;
  const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`;
  const clipPathId = `clip-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="flex items-center justify-center">
      <svg
        width={size}
        height={size}
        viewBox={viewBox}
        className={`${rotate ? "animate-spin" : ""}`}
        style={rotate ? { animationDuration: "3s" } : {}}
      >
        <defs>
          <clipPath id={clipPathId}>
            <path d={svgPath} />
          </clipPath>

          <linearGradient
            id={gradientId}
            x1="-10%"
            y1="0%"
            x2="100%"
            y2="100%"
            gradientTransform={`rotate(${shineAngle})`}
          >
            <stop offset="0%" stopColor="rgba(255,255,255,0)" stopOpacity="0" />
            <stop
              offset={`${(100 - shineWidth) / 2}%`}
              stopColor="rgba(255,255,255,0)"
              stopOpacity="0"
            />
            <stop
              offset="45%"
              stopColor={`rgba(255,255,255,${shineIntensity})`}
              stopOpacity="1"
            />
            <stop
              offset="50%"
              stopColor={`rgba(255,255,255,${shineIntensity * 1.2})`}
              stopOpacity="1"
            />
            <stop
              offset="55%"
              stopColor={`rgba(255,255,255,${shineIntensity})`}
              stopOpacity="1"
            />
            <stop
              offset={`${(100 + shineWidth) / 2}%`}
              stopColor="rgba(255,255,255,0)"
              stopOpacity="0"
            />
            <stop
              offset="100%"
              stopColor="rgba(255,255,255,0)"
              stopOpacity="0"
            />
          </linearGradient>
        </defs>

        <path d={svgPath} fill={color} stroke={strokeColor} strokeWidth="2" />

        <g clipPath={`url(#${clipPathId})`}>
          <rect
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
            fill={`url(#${gradientId})`}
            opacity="0.8"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              values="-250 -250; 250 250"
              dur={duration}
              repeatCount="indefinite"
            />
          </rect>
        </g>

        <path
          d={svgPath}
          fill="none"
          stroke={strokeColor}
          strokeWidth="1"
          opacity="0.8"
        />
      </svg>
    </div>
  );
};

type LogoLoaderProps = {
  size: number;
};

const LogoLoader: React.FC<LogoLoaderProps> = ({ size }) => {
  return (
    <SvgShineLoader
      svgPath={ACMPATH}
      color="#36454F"
      strokeColor="#36454F"
      size={size}
      viewBox="0 0 820 406"
      duration="0.5s"
      shineAngle={10}
      shineWidth={50}
      shineIntensity={0.7}
    />
  );
};
export default LogoLoader;
