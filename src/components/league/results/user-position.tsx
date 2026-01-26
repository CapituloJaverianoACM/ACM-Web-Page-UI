"use client";

import { useTranslations } from "next-intl";

interface UserPositionProps {
  position?: number;
}

export const UserPosition = ({ position }: UserPositionProps) => {
  const t = useTranslations("Results");
  if (position === undefined) return null;

  return (
    <div className="w-full max-w-2xl">
      <div className="p-6 rounded-md bg-white/20 backdrop-blur-lg border border-white shadow-lg">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-4 dark:text-white">
          {t("userPosition")}
        </h2>
        <div className="flex items-center justify-center">
          <span
            className={`text-6xl md:text-8xl font-bold ${
              position === 1
                ? "text-yellow-500"
                : position === 2
                  ? "text-neutral-500"
                  : position === 3
                    ? "text-orange-500"
                    : "text-black dark:text-white"
            }`}
          >
            {position}
          </span>
        </div>
      </div>
    </div>
  );
};
