import { LinkPreview } from "../ui/link-preview";

export function Rules() {
  return (
    <div id="rules" className="max-w-7xl mx-auto my-12 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center text-gray-900 dark:text-white mb-6">📏 Reglas de la Liga Javeriana de Programación</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Objetivos del Concurso */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-4">🎯 Objetivos del Concurso</h3>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
            <li>Promover la resolución de problemas y el pensamiento lógico a través de la programación.</li>
          </ul>
        </div>

        {/* Criterios de Participación */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-4">🎯 Criterios de Participación</h3>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
            <li>El concurso está abierto a estudiantes de todas las facultades de la Universidad Javeriana.</li>
            <li>Los participantes deben inscribirse previamente en la plataforma del evento.</li>
          </ul>
        </div>

        {/* Formato del Concurso */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-4">🎯 Formato del Concurso</h3>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
            <li>Los concursos se dividen en eliminatorias y finales.</li>
            <li>El participante tendrá un tiempo limitado para resolver una serie de problemas de programación.</li>
            <li>Se permitirá el uso de cualquier lenguaje de programación.</li>
          </ul>
        </div>

        {/* Evaluación */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-4">🎯 Evaluación</h3>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
            <li>
              {'La evaluación se basará en el resultado dado por el sistema de evaluación de '}
              <LinkPreview url="https://codeforces.com" className="text-[--azul-electrico] dark:text-blue-400 dark:hover:text-blue-300 hover:underline">
                Codeforces
              </LinkPreview>
              .
            </li>
          </ul>
        </div>

        {/* Reglas Específicas */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-4">🎯 Reglas Específicas</h3>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
            <li>No se puede hacer uso de ninguna Inteligencia Artificial (IA).</li>
            <li>
              {'Solo se puede utilizar la documentación oficial de C++: '}
              <LinkPreview url="https://cplusplus.com" className="text-[--azul-electrico] dark:text-blue-400 dark:hover:text-blue-300 hover:underline">
                cplusplus.com
              </LinkPreview>
              {' y '}
              <LinkPreview url="https://en.cppreference.com" className="text-[--azul-electrico] dark:text-blue-400 dark:hover:text-blue-300 hover:underline">
                cppreference.com
              </LinkPreview>
              .</li>
            <li>Si después de 15 minutos ninguno ha mandado el ejercicio, se desempatara con una prueba de velocidad.</li>
            <li>La dinámica de las competencias es un 1vs1: el que primero mande el ejercicio resuelto gana.</li>
            <li>El ranking se determina por la cantidad de victorias. En caso de empate en victorias, el ganador será el que menos partidas haya jugado.</li>
          </ul>
        </div>

        {/* Conducta Durante el Concurso */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-4">🎯 Conducta Durante el Concurso</h3>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
            <li>Se prohíbe el uso de recursos externos no autorizados, como foros de discusión o códigos previamente resueltos.</li>
            <li>Se espera que todos los participantes mantengan una actitud de respeto y honestidad.</li>
            <li>El incumplimiento de las normas puede resultar en descalificación.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
