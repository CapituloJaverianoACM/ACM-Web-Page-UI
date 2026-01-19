"use client";
import { useTranslations } from "next-intl";

import Link from "next/link";
import { Map } from "lucide-react";
import { useState, useEffect } from "react";

export function RoadmapButton() {
  const t = useTranslations("League");
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCollapsed(true);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Link
      href="/roadmap"
      className={`fixed bottom-8 right-8 btn--info dark:text-white shadow-lg hover:shadow-xl z-40 flex items-center gap-2 group ${
        isCollapsed ? "w-14 h-14 justify-center px-0" : "px-6"
      }`}
      onMouseEnter={() => setIsCollapsed(false)}
      onMouseLeave={() => setIsCollapsed(true)}
    >
      <Map className="w-5 h-5 flex-shrink-0 ml-2" />
      <span
        className={`whitespace-nowrap text-bold transition-all duration-700 overflow-hidden ${
          isCollapsed ? "max-w-0 opacity-0" : "max-w-xs opacity-100"
        }`}
      >
        {t("roadmapButton")}
      </span>
    </Link>
  );
}
