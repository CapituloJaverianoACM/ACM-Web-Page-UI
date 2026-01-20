import { useTranslations } from "next-intl";
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
  const t = useTranslations("League.rules");
  const Icon_Class = "text-white w-6 h-6";
  return (
    <section id="rules" className="max-w-5xl mx-auto my-12 px-4">
      {" "}
      {/* Here is the header of title */}
      <h2 className="text-3xl md:text-4xl font-semibold text-center dark:text-white mb-6">
        {t("title")}
      </h2>
      {/* Cards with the rules */}
      {/* Objetivos del concurso */}
      <div className="space-y-6">
        <RuleCard
          title={t("objectives.title")}
          icon={<Target className={Icon_Class} />}
        >
          {/* list of bullet points */}
          <ul className="mt-3 space-y-2 list-none p-0">
            <li className="flex items-start gap-3">
              <span className="mt-1.5 h-2 w-2 rounded-full bg-(--azul-electrico) shrink-0" />
              <span className="leading-6 mt-[2px]">
                {" "}
                {t("objectives.item1")}{" "}
              </span>
            </li>
          </ul>
        </RuleCard>

        {/* Criterios de Participación */}
        <RuleCard
          title={t("participation.title")}
          icon={<Users className={Icon_Class} />}
        >
          <ul className="mt-3 space-y-2 list-none p-0">
            <li className="flex items-start gap-3">
              <span className="mt-1.5 h-2 w-2 rounded-full bg-(--azul-electrico) shrink-0" />
              <span className="leading-6 mt-[2px]">
                {" "}
                {t("participation.item1")}{" "}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 h-2 w-2 rounded-full bg-(--azul-electrico) shrink-0" />
              <span className="leading-6 mt-[2px]">
                {" "}
                {t("participation.item2")}{" "}
              </span>
            </li>
          </ul>
        </RuleCard>

        {/* Formato del Concurso */}
        <RuleCard
          title={t("format.title")}
          icon={<Trophy className={Icon_Class} />}
        >
          <ul className="mt-3 space-y-2 list-none p-0">
            <li className="flex items-start gap-3">
              <span className=" mt-3 h-2 w-2 rounded-full bg-(--azul-electrico) shrink-0" />
              <span className="leading-6 mt-[7px]">{t("format.item1")}</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-3 h-2 w-2 rounded-full bg-(--azul-electrico) shrink-0" />
              <span className="leading-6 mt-[7px]">{t("format.item2")}</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-2 h-2 w-2 rounded-full bg-(--azul-electrico) shrink-0" />
              <span className="leading-6 mt-[5px]">{t("format.item3")}</span>
            </li>
          </ul>
        </RuleCard>

        {/* Evaluación */}
        <RuleCard
          title={t("evaluation.title")}
          icon={<ClipboardCheck className={Icon_Class} />}
        >
          <ul className="mt-3 space-y-2 list-none p-0">
            <li className="flex items-start gap-3">
              <span className="mt-1.5 h-2 w-2 rounded-full bg-(--azul-electrico) shrink-0" />
              <span className="leading-6 mt-[2px]">
                {" "}
                {t("evaluation.item1")}{" "}
                <LinkPreview
                  url="https://codeforces.com"
                  className="text-(--azul-electrico) dark:text-(--azul-crayon) dark:hover:text-(--azul-niebla) hover:underline"
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
          title={t("specific.title")}
          icon={<Gavel className={Icon_Class} />}
        >
          <ul className="mt-3 space-y-2 list-none p-0">
            <li className="flex items-start gap-3">
              <span className="mt-3 h-2 w-2 rounded-full bg-(--azul-electrico) shrink-0" />
              <span className="leading-6 mt-[7px]">
                {" "}
                {t("specific.item1")}{" "}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-3 h-2 w-2 rounded-full bg-(--azul-electrico) shrink-0" />
              <span className="leading-6 mt-[6px]">
                {t("specific.item2")}{" "}
                <LinkPreview
                  url="https://cplusplus.com"
                  className="text-(--azul-electrico) dark:text-(--azul-ultramar) dark:hover:text-(--azul-crayon) hover:underline"
                >
                  cplusplus.com
                </LinkPreview>{" "}
                {t("specific.item2b")}{" "}
                <LinkPreview
                  url="https://en.cppreference.com"
                  className="text-(--azul-electrico) dark:text-(--azul-ultramar) dark:hover:text-(--azul-crayon) hover:underline"
                >
                  cppreference.com
                </LinkPreview>
                .
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-3 h-2 w-2 rounded-full bg-(--azul-electrico) shrink-0" />
              <span className="leading-6 mt-[2px]">
                {" "}
                {t("specific.item3")}{" "}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-3 h-2 w-2 rounded-full bg-(--azul-electrico) shrink-0" />
              <span className="leading-6 mt-[7px]">{t("specific.item4")}</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-3 h-2 w-2 rounded-full bg-(--azul-electrico) shrink-0" />
              <span className="leading-6 mt-px"> {t("specific.item5")} </span>
            </li>
          </ul>
        </RuleCard>

        {/* Conducta Durante el Concurso */}
        <RuleCard
          title={t("conduct.title")}
          icon={<ShieldCheck className={Icon_Class} />}
        >
          <ul className="mt-1 space-y-2">
            <li className="flex items-start gap-3">
              <span className="mt-3 h-2 w-2 rounded-full bg-(--azul-electrico) shrink-0" />
              <span className="leading-6 mt-[2px]">{t("conduct.item2")}</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-3 h-2 w-2 rounded-full bg-(--azul-electrico) shrink-0" />
              <span className="leading-6 mt-[7px]">{t("conduct.item2")}</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 h-2 w-2 rounded-full bg-(--azul-electrico) shrink-0" />
              <span className="leading-6 mt-[2px]">{t("conduct.item3")}</span>
            </li>
          </ul>
        </RuleCard>
      </div>
    </section>
  );
}
