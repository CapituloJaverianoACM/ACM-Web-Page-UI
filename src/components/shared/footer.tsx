"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import AnimatedTooltip from "./ui/tooltip";
import { IconBrandInstagram, IconBrandLinkedin } from "@tabler/icons-react";
import { getGitHubContributorsFromRepos } from "@/controllers/github.controller";
import { useQuery } from "@tanstack/react-query";

export default function Footer() {
  const t = useTranslations("Footer");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { data: contributors = [], isLoading } = useQuery({
    queryKey: ["github-contributors"],
    queryFn: async () => {
      return await getGitHubContributorsFromRepos(undefined, 6, 10);
    },
    enabled: isMounted,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });

  // Convertir contribuidores al formato del tooltip
  const contributorItems = contributors.map((contributor) => ({
    id: contributor.id,
    name: contributor.login,
    designation: t("contributor"),
    image: contributor.avatar_url,
    html_url: contributor.html_url,
    className: "border-gray-200 hover:border-blue-400",
  }));

  // Fallback al logo ACM si no hay contribuidores
  const acmLogo = [
    {
      id: 1,
      name: "ACM Javeriana",
      designation: t("universitaryChapter"),
      image: "/Logo_Oscuro.svg",
      imageDark: "/Logo_Claro.svg",
      className: "border-transparent",
    },
  ];

  const displayItems =
    !isMounted || isLoading || contributorItems.length === 0
      ? acmLogo
      : contributorItems;

  return (
    <footer className="w-full px-6 py-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg border-t border-gray-200/20 dark:border-gray-700/20 mt-auto">
      <div className="max-w-7xl mx-auto">
        {/*
          Responsive
        */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 md:gap-0 text-center md:text-left">
          {/* Información izquierda */}
          <div className="flex items-center justify-center md:justify-start whitespace-nowrap">
            <span className="font-montserrat text-lg md:text-lg text-[--azul-noche] dark:text-white">
              {t("chapter")}
            </span>
            <h1 className="ml-2 mb-0 md:text-xl font-bold text-[--azul-noche] dark:text-white">
              ACM
            </h1>
          </div>

          {/* Contribuidores del proyecto en el centro*/}
          <div className="flex justify-center relative z-0">
            <AnimatedTooltip
              items={displayItems}
              className="relative z-0"
              tooltipOffset="-translate-x-3/4"
            />
          </div>

          {/* Redes sociales a la derecha*/}
          <div className="flex items-center justify-center md:justify-end gap-3 md:gap-4">
            <a
              href="https://www.linkedin.com/company/capitulo-javeriano-acm/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex"
            >
              <IconBrandLinkedin className="w-7 h-7 md:w-8 md:h-8 text-[--azul-noche] dark:text-white hover:opacity-70 transition-opacity" />
            </a>

            <a
              href="https://www.instagram.com/acmjaveriana?igsh=N3VjZGw0OHE3eG1x"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="inline-flex"
            >
              <IconBrandInstagram className="w-7 h-7 md:w-8 md:h-8 text-[--azul-noche] dark:text-white hover:opacity-70 transition-opacity" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
