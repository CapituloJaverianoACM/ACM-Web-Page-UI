import {
  Users,
  Target,
  Trophy,
  ClipboardCheck,
  ShieldCheck,
  Gavel,
} from "lucide-react";
import { LinkPreview } from "../ui/link-preview";
import { RuleCard } from "../ui/rule-card";

export function Rules() {
  const Icon_Class = "text-white w-6 h-6";
  return (
    <section id="rules" className="max-w-5xl mx-auto my-12 px-4">
      {" "}
      {/* Here is the header of title */}
      <h2 className="text-3xl md:text-4xl font-semibold text-center dark:text-white mb-6">
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
          <ul className="mt-3 space-y-2 list-none p-0">
            <li className="flex items-start gap-3">
              <span className="mt-1.5 h-2 w-2 rounded-full bg-[var(--azul-electrico)] shrink-0" />
              <span className="leading-6 mt-[2px]">
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
          <ul className="mt-3 space-y-2 list-none p-0">
            <li className="flex items-start gap-3">
              <span className="mt-1.5 h-2 w-2 rounded-full bg-[var(--azul-electrico)] shrink-0" />
              <span className="leading-6 mt-[2px]">
                {" "}
                El concurso está abierto a estudiantes de todas las facultades
                de la Universidad Javeriana.{" "}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 h-2 w-2 rounded-full bg-[var(--azul-electrico)] shrink-0" />
              <span className="leading-6 mt-[2px]">
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
          <ul className="mt-3 space-y-2 list-none p-0">
            <li className="flex items-start gap-3">
              <span className=" mt-3 h-2 w-2 rounded-full bg-[var(--azul-electrico)] shrink-0" />
              <span className="leading-6 mt-[7px]">
                {" "}
                Los concursos se dividen en eliminatorias y finales.{" "}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-3 h-2 w-2 rounded-full bg-[var(--azul-electrico)] shrink-0" />
              <span className="leading-6 mt-[7px]">
                {" "}
                El participante tendrá un tiempo limitado para resolver una
                serie de problemas de programación.{" "}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-2 h-2 w-2 rounded-full bg-[var(--azul-electrico)] shrink-0" />
              <span className="leading-6 mt-[5px]">
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
          <ul className="mt-3 space-y-2 list-none p-0">
            <li className="flex items-start gap-3">
              <span className="mt-1.5 h-2 w-2 rounded-full bg-[var(--azul-electrico)] shrink-0" />
              <span className="leading-6 mt-[2px]">
                {" "}
                La evaluación se basará en el resultado dado por el sistema de
                evaluación de{" "}
                <LinkPreview
                  url="https://codeforces.com"
                  className="text-[var(--azul-electrico)] dark:text-[var(--azul-crayon)] dark:hover:text-[var(--azul-niebla)] hover:underline"
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
          <ul className="mt-3 space-y-2 list-none p-0">
            <li className="flex items-start gap-3">
              <span className="mt-3 h-2 w-2 rounded-full bg-[var(--azul-electrico)] shrink-0" />
              <span className="leading-6 mt-[7px]">
                {" "}
                No se puede hacer uso de ninguna Inteligencia Artificial
                (IA).{" "}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-3 h-2 w-2 rounded-full bg-[var(--azul-electrico)] shrink-0" />
              <span className="leading-6 mt-[6px]">
                {"Solo se puede utilizar la documentación oficial de C++: "}
                <LinkPreview
                  url="https://cplusplus.com"
                  className="text-[var(--azul-electrico)] dark:text-[var(--azul-ultramar)] dark:hover:text-[var(--azul-crayon)] hover:underline"
                >
                  cplusplus.com
                </LinkPreview>
                {" y "}
                <LinkPreview
                  url="https://en.cppreference.com"
                  className="text-[var(--azul-electrico)] dark:text-[var(--azul-ultramar)] dark:hover:text-[var(--azul-crayon)] hover:underline"
                >
                  cppreference.com
                </LinkPreview>
                .
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-3 h-2 w-2 rounded-full bg-[var(--azul-electrico)] shrink-0" />
              <span className="leading-6 mt-[2px]">
                {" "}
                Si después de 15 minutos ninguno ha mandado el ejercicio, se
                desempatara con una prueba de velocidad.{" "}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-3 h-2 w-2 rounded-full bg-[var(--azul-electrico)] shrink-0" />
              <span className="leading-6 mt-[7px]">
                La dinámica de las competencias es un 1vs1: el que primero mande
                el ejercicio resuelto gana.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-3 h-2 w-2 rounded-full bg-[var(--azul-electrico)] shrink-0" />
              <span className="leading-6 mt-[1px]">
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
          <ul className="mt-1 space-y-2">
            <li className="flex items-start gap-3">
              <span className="mt-3 h-2 w-2 rounded-full bg-[var(--azul-electrico)] shrink-0" />
              <span className="leading-6 mt-[2px]">
                {" "}
                Se prohíbe el uso de recursos externos no autorizados, como
                foros de discusión o códigos previamente resueltos.{" "}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-3 h-2 w-2 rounded-full bg-[var(--azul-electrico)] shrink-0" />
              <span className="leading-6 mt-[7px]">
                {" "}
                Se espera que todos los participantes mantengan una actitud de
                respeto y honestidad.{" "}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 h-2 w-2 rounded-full bg-[var(--azul-electrico)] shrink-0" />
              <span className="leading-6 mt-[2px]">
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
