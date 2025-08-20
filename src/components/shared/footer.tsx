"use client";
import { useEffect, useState } from "react";
import AnimatedTooltip from "./ui/tooltip";
import { IconBrandInstagram, IconBrandLinkedin } from "@tabler/icons-react";
import { getGitHubContributorsFromRepos, GitHubContributor } from "@/controllers/github.controller";

export default function Footer() {
  const [contributors, setContributors] = useState<GitHubContributor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
        
    const fetchContributors = async () => {
      try {
        setIsLoading(true);
                
        // Obtener contribuidores 
        console.log('Cargando contribuidores del proyecto...');
        const contributorsData = await getGitHubContributorsFromRepos(
          undefined, 
          6, 
          10
        );
        setContributors(contributorsData);
      } catch (error) {
        console.error('Error loading contributors:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContributors();
  }, [isMounted]);

  // Convertir contribuidores al formato del tooltip
  const contributorItems = contributors.map((contributor) => ({
    id: contributor.id,
    name: contributor.login,
    designation: "ACM Member",
    image: contributor.avatar_url,
    className: "border-gray-200 hover:border-blue-400",
  }));

  // Fallback al logo ACM si no hay contribuidores
  const acmLogo = [
    {
      id: 1,
      name: "ACM Javeriana",
      designation: "Capítulo Universitario",
      image: "/Logo_Oscuro.svg",
      imageDark: "/Logo_Claro.svg",
      className: "border-transparent",
    },
  ];

  
  const displayItems = !isMounted || isLoading || contributorItems.length === 0 
    ? acmLogo 
    : contributorItems;

  return (
    <footer className="w-full px-6 py-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg border-t border-gray-200/20 dark:border-gray-700/20 mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-3 items-center">
          {/* Información izquierda */}
          <div className="flex flex-col justify-self-start">
            <h3 className="text-sm text-center text-[--azul-noche] dark:text-white">
              Capítulo Javeriano ACM
            </h3>
          </div>

          {/* Contribuidores del proyecto en el centro*/}
          <div className="flex justify-center relative z-0">
            <AnimatedTooltip
              items={displayItems}
              className="relative z-0"
              tooltipOffset="-translate-x-3/4"
            />
          </div>

          {/* Redes sociales derecha */}
          <div className="flex flex-col items-end gap-2 justify-self-end">
            <a
              href="https://www.linkedin.com/company/capitulo-javeriano-acm/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconBrandLinkedin className="w-5 h-5 text-[--azul-noche] dark:text-white hover:opacity-70 transition-opacity" />
            </a>
            <a
              href="https://www.instagram.com/acmjaveriana"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconBrandInstagram className="w-5 h-5 text-[--azul-noche] dark:text-white hover:opacity-70 transition-opacity" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}