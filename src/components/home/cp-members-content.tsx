"use client";
import { useTranslations } from "next-intl";
import { FocusCards } from "./focus-cards";
import { useCodeforcesData } from "@/hooks/use-codeforces-data";
import AnimatedTooltip from "../shared/ui/tooltip";

const CP_MEMBERS: string[] = [
  "adrianrrruiz",
  "TalkySafe143",
  "achalogy",
  "Avila_Sa",
  "Cojuan",
  "Lorenzo_lrc",
  "harry3008",
  "sandoval95",
  "Pyotr_",
  "johan-smc",
  "a_santamaria",
  "Julianasolanx",
];

const CONTESTS: { title: string; src: string; icon: string }[] = [
  {
    title: "ICPC (2025)",
    src: "https://drive.google.com/uc?export=view&id=1a8dbWnSSFwPnR77IJPEJoYB0U4cJxuJN",
    icon: "/icpc.svg",
  },
  {
    title: "BUHOS INTERNA (2025)",
    src: "https://drive.google.com/uc?export=view&id=1MptlEaenvDrRRdAKYHWfxxT4ImQNkv8v",
    icon: "/Buhos.svg",
  },
  {
    title: "ECICIENCIA (2025)",
    src: "https://drive.google.com/uc?export=view&id=19b_jK2XTfC7YxuzbGukJRg_E9WEtCPzR",
    icon: "/eciciencia.svg",
  },
  {
    title: "ICPC (2024)",
    src: "https://drive.google.com/uc?export=view&id=1EQ9XTZtkO-JMewDzqfBqUl3UUe3GpauS",
    icon: "/icpc.svg",
  },
  {
    title: "ECICIENCIA (2024)",
    src: "https://drive.google.com/uc?export=view&id=1URu88UvYTYdr_gnHZo9kFRErZMJZY-PA",
    icon: "/eciciencia.svg",
  },
  {
    title: "ICPC (2023)",
    src: "https://drive.google.com/uc?export=view&id=1_wmQo9AJYp60SpNc-XwZiz7uhSrtGBdd",
    icon: "/icpc.svg",
  },
  {
    title: "ECICIENCIA (2023)",
    src: "https://drive.google.com/uc?export=view&id=11v5zOU6sXeikOgXhf9YxYdvxsiTPzCZ_",
    icon: "/eciciencia.svg",
  },
  {
    title: "ICPC (2022)",
    src: "https://drive.google.com/uc?export=view&id=1mEeOwdGvE66pQjgf_6WP8IRlwNha2z8L",
    icon: "/icpc.svg",
  },
];

export const CPMembersContent = () => {
  const t = useTranslations("Activities.cpMembers");
  const { members, loading } = useCodeforcesData(CP_MEMBERS);

  const membersItems = members.map((member, index) => ({
    id: index,
    name: member.title,
    designation: "CP Member",
    image: member.src,
    html_url: `https://codeforces.com/profile/${member.handle}`,
    className: "border-gray-200 hover:border-blue-400",
  }));

  if (loading) return <p>{t("loading")}</p>;

  return (
    <>
      <p className="dark:text-(--azul-niebla)">{t("description")}</p>
      <br />
      <FocusCards cards={CONTESTS} />
      <p className="text-3xl text-center my-10 font-semibold dark:text-(--azul-niebla)">
        {t("membersTitle")}
      </p>
      {/* Contribuidores del proyecto en el centro*/}
      <div className="flex justify-center relative z-0">
        <AnimatedTooltip
          items={membersItems}
          className="relative z-0"
          tooltipOffset="-translate-x-3/4"
        />
      </div>
    </>
  );
};
