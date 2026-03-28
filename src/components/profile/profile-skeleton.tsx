import React from "react";

export const ProfileSkeleton = () => {
  return (
    <section className="bg-(--white) dark:bg-gray-800 rounded-xl shadow-sm border border-(--azul-niebla) dark:border-gray-700">
      <div className="p-6 border-b border-(--azul-niebla) dark:border-gray-700">
        <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
      </div>
      <div className="p-6 flex flex-col md:flex-row gap-6">
        <div className="flex flex-col items-center md:w-1/3">
          <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
        </div>
        <div className="md:flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
            <div className="h-6 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
          <div>
            <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
            <div className="h-6 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
          <div className="sm:col-span-2">
            <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
            <div className="h-6 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
      <div className="px-6 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-xl border border-gray-200 dark:border-gray-700 p-4"
            >
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
              <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
