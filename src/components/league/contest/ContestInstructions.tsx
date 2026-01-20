const INSTRUCTIONS: string[] = [
  "Cuando estes listo, presiona el botón de 'Listo'.",
  "Si dejas de estar listo, puedes seleccionar 'No estoy listo'.",
  "Cuando los dos contricantes esten listos, se asignará un problema de Codeforces.",
  "Cuando envíes el problema satisfactoriamente, presiona verificar para que nuestro sistema pueda verificar tu envío.",
  "Ten en cuenta que tu usuario de Codeforces debe coincidir con la cuenta del envío.",
  "Si el veredicto es 'ACCEPTED', se creará una ventana de 5 segundos en caso de que el oponente tenga el mismo veredicto.",
];

export const ContestInstructions: React.FC = () => {
  return (
    <div className="w-full max-w-750 grow p-10 bg-white/20 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] shadow-2xl flex flex-col justify-between">
      <div>
        <h2 className="text-4xl font-extralight text-white italic mb-6 tracking-tight">
          Instrucciones
        </h2>
        <div className="space-y-4 max-w-2xl">
          {INSTRUCTIONS.map((instruction) => (
            <p className="text-white text-lg leading-relaxed border-l-2 border-white/50 pl-4">
              {instruction}
            </p>
          ))}
        </div>
      </div>

      <button className="w-fit mt-10 px-12 py-3 bg-green-500/30 hover:bg-green-500/40 border border-green-400/40 text-green-300 rounded-xl transition-all duration-300 font-bold tracking-widest hover:scale-105 active:scale-95 uppercase text-sm">
        Listo
      </button>
    </div>
  );
};
