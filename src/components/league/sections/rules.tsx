import {
  Users,
  Target,
  Trophy,
  ClipboardCheck,
  ShieldCheck,
  Gavel,
} from "lucide-react";
import { LinkPreview } from "../ui/link-preview";

function RuleCard({
  // this is the component for each rule section, so all the rules have the same style.
  icon,
  title,
  children, // this is the same as description.
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    //style of the card as the one said.
    <div className="rounded-[32px] overflow-hidden bg-blue-50/80 dark:bg-blue-950/40 border border-blue-50 dark:border-blue-950/40 shadow-sm dark:shadow-md px-6 py-6 md:px-8 md:py-7">
      <div className="flex items-start gap-4">
        <div className="shrink-0 rounded-xl bg-blue-600 p-3 shadow-sm">
          <div className="text-white">{icon}</div>
        </div>
        {/* Style of the content on the card */}
        <div className="min-w-0">
          <h3 className="text-xl md:text-2xl font-semibold text-black dark:text-white mb-2">
            {title}
          </h3>
          <div className="mt-4 text-gray-700 dark:text-gray-200">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Rules() {
  const Icon_Class = "text-white w-6 h-6";
  return (
    <section id="rules" className="max-w-5xl mx-auto my-12 px-4">
      {" "}
      {/* Here is the header of title */}
      <h2 className="text-3xl md:text-4xl font-semibold text-center text-blue-900 dark:text-white mb-6">
        Reglas de la Liga Javeriana de Programación.
      </h2>
      {/* Cards with the rules */}
      {/* Objetivos del concurso */}
      <div className="space-y-6">
        <RuleCard
          title="Objetivos del Concurso"
          icon={<Target className={Icon_Class} />}
        >
          {/* list of bullet points */}
          <ul className="space-y-2">
            <li className="flex gap-3">
              <span className="mt-1 h-1 w-1 rounded-full bg-blue-600 shrink-0" />
              <span>
                {" "}
                Promover la resolución de problemas y el pensamiento lógico a
                través de la programación.{" "}
              </span>
            </li>
          </ul>
        </RuleCard>

        {/* Criterios de Participación */}
        <RuleCard
          title="Criterios de Participación"
          icon={<Users className={Icon_Class} />}
        >
          <ul className="space-y-2">
            <li className="flex gap-3">
              <span className="mt-1 h-1 w-1 rounded-full bg-blue-600 shrink-0" />
              <span>
                {" "}
                El concurso está abierto a estudiantes de todas las facultades
                de la Universidad Javeriana.{" "}
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 h-1 w-1 rounded-full bg-blue-600 shrink-0" />
              <span>
                {" "}
                Los participantes deben inscribirse previamente en la plataforma
                del evento.{" "}
              </span>
            </li>
          </ul>
        </RuleCard>

        {/* Formato del Concurso */}
        <RuleCard
          title="Formato del Concurso"
          icon={<Trophy className={Icon_Class} />}
        >
          <ul className="space-y-2">
            <li className="flex gap-3">
              <span className="mt-1 h-1 w-1 rounded-full bg-blue-600 shrink-0" />
              <span>
                {" "}
                Los concursos se dividen en eliminatorias y finales.{" "}
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 h-1 w-1 rounded-full bg-blue-600 shrink-0" />
              <span>
                {" "}
                El participante tendrá un tiempo limitado para resolver una
                serie de problemas de programación.{" "}
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 h-1 w-1 rounded-full bg-blue-600 shrink-0" />
              <span>
                {" "}
                Se permitirá el uso de cualquier lenguaje de programación.{" "}
              </span>
            </li>
          </ul>
        </RuleCard>

        {/* Evaluación */}
        <RuleCard
          title="Evaluación"
          icon={<ClipboardCheck className={Icon_Class} />}
        >
          <ul className="space-y-2">
            <li className="flex gap-3">
              <span className="mt-1 h-1 w-1 rounded-full bg-blue-600 shrink-0" />
              <span>
                {" "}
                La evaluación se basará en el resultado dado por el sistema de
                evaluación de{" "}
                <LinkPreview
                  url="https://codeforces.com"
                  className="text-[--azul-electrico] dark:text-blue-300 dark:hover:text-blue-200 hover:underline"
                >
                  Codeforces
                </LinkPreview>
                .
              </span>
            </li>
          </ul>
        </RuleCard>

        {/* Reglas Específicas */}
        <RuleCard
          title="Reglas Específicas"
          icon={<Gavel className={Icon_Class} />}
        >
          <ul className="space-y-2">
            <li className="flex gap-3">
              <span className="mt-1 h-1 w-1 rounded-full bg-blue-600 shrink-0" />
              <span>
                {" "}
                No se puede hacer uso de ninguna Inteligencia Artificial
                (IA).{" "}
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 h-1 w-1 rounded-full bg-blue-600 shrink-0" />
              <span>
                {"Solo se puede utilizar la documentación oficial de C++: "}
                <LinkPreview
                  url="https://cplusplus.com"
                  className="text-[--azul-electrico] dark:text-blue-400 dark:hover:text-blue-300 hover:underline"
                >
                  cplusplus.com
                </LinkPreview>
                {" y "}
                <LinkPreview
                  url="https://en.cppreference.com"
                  className="text-[--azul-electrico] dark:text-blue-400 dark:hover:text-blue-300 hover:underline"
                >
                  cppreference.com
                </LinkPreview>
                .
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 h-1 w-1 rounded-full bg-blue-600 shrink-0" />
              <span>
                {" "}
                Si después de 15 minutos ninguno ha mandado el ejercicio, se
                desempatara con una prueba de velocidad.{" "}
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 h-1 w-1 rounded-full bg-blue-600 shrink-0" />
              <span>
                {" "}
                La dinámica de las competencias es un 1vs1: el que primero mande
                el ejercicio resuelto gana.{" "}
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 h-1 w-1 rounded-full bg-blue-600 shrink-0" />
              <span>
                {" "}
                El ranking se determina por la cantidad de victorias. En caso de
                empate en victorias, el ganador será el que menos partidas haya
                jugado.{" "}
              </span>
            </li>
          </ul>
        </RuleCard>

        {/* Conducta Durante el Concurso */}
        <RuleCard
          title="Conducta Durante el Concurso"
          icon={<ShieldCheck className={Icon_Class} />}
        >
          <ul className="space-y-2">
            <li className="flex gap-3">
              <span className="mt-1 h-1 w-1 rounded-full bg-blue-600 shrink-0" />
              <span>
                {" "}
                Se prohíbe el uso de recursos externos no autorizados, como
                foros de discusión o códigos previamente resueltos.{" "}
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 h-1 w-1 rounded-full bg-blue-600 shrink-0" />
              <span>
                {" "}
                Se espera que todos los participantes mantengan una actitud de
                respeto y honestidad.{" "}
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 h-1 w-1 rounded-full bg-blue-600 shrink-0" />
              <span>
                {" "}
                El incumplimiento de las normas puede resultar en
                descalificación.{" "}
              </span>
            </li>
          </ul>
        </RuleCard>
      </div>
    </section>
  );
}
