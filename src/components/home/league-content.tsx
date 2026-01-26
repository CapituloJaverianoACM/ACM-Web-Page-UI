"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { Trophy, Calendar, Medal, BookOpen, ArrowRight } from "lucide-react";

export const LeagueContent = () => {
  const tLeague = useTranslations("Activities.league");
  const tNav = useTranslations("Navigation");

  const leagueLinks = [
    {
      label: tNav("rules"),
      href: "/league#rules",
      icon: BookOpen,
      description: tLeague("links.rulesDesc"),
    },
    {
      label: tNav("upcomingEvents"),
      href: "/league#upcoming-events",
      icon: Calendar,
      description: tLeague("links.eventsDesc"),
    },
    {
      label: tNav("podium"),
      href: "/league#podium",
      icon: Trophy,
      description: tLeague("links.podiumDesc"),
    },
    {
      label: tNav("rank"),
      href: "/rank",
      icon: Medal,
      description: tLeague("links.rankDesc"),
    },
  ];

  return (
    <div className="space-y-6">
      <p className="dark:text-[--azul-niebla] text-base leading-relaxed">
        {tLeague("summary")}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
        {leagueLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className="group relative p-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/30 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
                  <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {link.label}
                    </h3>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {link.description}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="flex justify-start mt-6">
        <Link
          href="/league"
          className="btn btn--primary btn--small"
          aria-label={tLeague("links.exploreTitle")}
        >
          {tLeague("links.exploreTitle")}
        </Link>
      </div>
    </div>
  );
};
