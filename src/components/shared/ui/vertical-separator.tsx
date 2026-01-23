interface VerticalSeparatorProps {
  height?: string;
  className?: string;
  color: string;
}

export function VerticalSeparator({
  height = "h-full",
  className = "",
  color = "white",
}: VerticalSeparatorProps) {
  const bg_color: string = `bg-${color}`;
  const via_color: string = `via-${color}`;
  const via_color_80: string = `via-${color}/80`;
  const to_color: string = `to-${color}`;
  const from_color: string = `from-${color}`;

  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 ${height} ${className}`}
    >
      {/* Top decorative diamond */}
      <div
        className={`w-2 h-2 ${bg_color} rotate-45 shadow-lg shadow-white/50`}
      />

      {/* Top gradient line */}
      <div
        className={`w-px h-12 bg-linear-to-b from-transparent ${via_color} ${to_color}`}
      />

      {/* Center decorative circle */}
      <div className="relative">
        <div
          className={`w-3 h-3 ${bg_color} rounded-full shadow-lg shadow-white/50`}
        />
        <div
          className={`absolute inset-0 w-3 h-3 ${bg_color} rounded-full animate-ping opacity-75`}
        />
      </div>

      {/* Main line */}
      <div
        className={`w-px flex-1 bg-linear-to-b ${from_color} ${via_color_80} ${to_color}`}
      />

      {/* Bottom decorative circle */}
      <div className="relative">
        <div
          className={`w-3 h-3 ${bg_color} rounded-full shadow-lg shadow-white/50`}
        />
        <div
          className={`absolute inset-0 w-3 h-3 ${bg_color} rounded-full animate-ping opacity-75`}
        />
      </div>

      {/* Bottom gradient line */}
      <div
        className={`w-px h-12 bg-linear-to-b ${from_color} to-transparent`}
      />

      {/* Bottom decorative diamond */}
      <div
        className={`w-2 h-2 ${bg_color} rotate-45 shadow-lg shadow-white/50`}
      />
    </div>
  );
}
