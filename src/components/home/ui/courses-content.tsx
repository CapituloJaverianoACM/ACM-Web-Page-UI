"use client";

import React, { useMemo } from "react";
import { useTranslations } from "next-intl";
import { COURSES_BASE } from "./courses.data";
import { CourseCard, type CourseUI } from "./courses.components";

export function CoursesContent() {
  const t = useTranslations("Activities.courses");

  const labels = useMemo(
    () => ({
      duration: t("labels.duration"),
      topics: t("labels.topics"),
      materials: t("labels.materials"),
    }),
    [t],
  );

  const courses: CourseUI[] = useMemo(() => {
    return COURSES_BASE.map((c) => ({
      id: c.id,
      title: t(c.titleKey),
      description: t(c.descriptionKey),
      image: c.image,
      dates: c.dates,
      topics: c.topicKeys.map((k) => (typeof k === "string" ? t(k) : k.raw)),
      materials: c.materials.map((m) => ({
        name: typeof m.nameKey === "string" ? t(m.nameKey) : m.nameKey.raw,
        url: m.url,
        type: m.type,
      })),
    }));
  }, [t]);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-lg">
      <div className="space-y-8">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} labels={labels} />
        ))}
      </div>
    </div>
  );
}
