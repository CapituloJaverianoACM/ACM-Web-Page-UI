export const ContestantsCards: React.FC = () => {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 w-full max-w-[3000px]">
      {/* Jugador Izquierda */}
      <div className="flex items-center gap-4 p-5 bg-radial-[at_90%_35%] from-green-500 to-transparent bg-backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg">
        <div className="w-14 h-14 rounded-full bg-linear-to-br from-white/30 to-transparent border border-white/40 shadow-inner" />
        <div>
          <h2 className="mb-0 font-bold text-lg tracking-tight text-white uppercase">
            Player 1
          </h2>
          <div className="flex gap-2 items-center">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-400 text-xs font-medium uppercase tracking-tighter">
              Status
            </span>
          </div>
          <p className="text-white/50 text-xs mt-1">15 wins</p>
        </div>
      </div>

      {/* Divisor central */}
      <div className="text-2xl select-none bg-transparent ">
        <h1 className="italic text-white">vs</h1>
      </div>

      {/* Jugador Derecha */}
      <div className="flex items-center justify-end gap-4 p-5 bg-white/20  bg-radial-[at_-10%_35%] from-red-500/80 to-transparent backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg text-right">
        <div>
          <h2 className="mb-0 font-bold text-lg tracking-tight text-white uppercase">
            Player 2
          </h2>
          <div className="flex items-center justify-end gap-2">
            <span className="text-green-400 text-xs font-medium uppercase tracking-tighter">
              Status
            </span>
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          </div>
          <p className="text-white/50 text-xs mt-1">15 wins</p>
        </div>
        <div className="w-14 h-14 rounded-full bg-linear-to-br from-white/30 to-transparent border border-white/40 shadow-inner" />
      </div>
    </div>
  );
};
