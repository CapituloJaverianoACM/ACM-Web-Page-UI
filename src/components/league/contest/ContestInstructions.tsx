export const ContestInstructions: React.FC = () => {
  return (
    <div className="w-full max-w-[3000px] flex-grow p-10 bg-white/20 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] shadow-2xl flex flex-col justify-between">
      <div>
        <h2 className="text-4xl font-extralight text-white italic mb-6 tracking-tight">
          Instrucciones
        </h2>
        <div className="space-y-4 max-w-2xl">
          <p className="text-white text-lg leading-relaxed border-l-2 border-white/50 pl-4">
            Sigue el flujo de nodos para completar el nivel.
          </p>
          <p className="text-white text-lg leading-relaxed border-l-2 border-white/50 pl-4">
            Haz clic en "Listo" cuando tu equipo esté preparado.
          </p>
        </div>
      </div>

      <button className="w-fit mt-10 px-12 py-3 bg-green-500/30 hover:bg-green-500/40 border border-green-400/40 text-green-300 rounded-xl transition-all duration-300 font-bold tracking-widest hover:scale-105 active:scale-95 uppercase text-sm">
        Listo
      </button>
    </div>
  );
};
