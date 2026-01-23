"use client";

import React from "react";
import { useTranslations } from "next-intl";

type MaterialType = "pdf" | "ppt" | "link";

interface CourseMaterial {
  name: string;
  url: string;
  type: MaterialType;
}

interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  dates: string[];
  topics: string[];
  materials: CourseMaterial[];
}

export function CoursesContent() {
  const t = useTranslations("Activities.courses");

  const courses: Course[] = [
    {
      id: "c1",
      title: t("items.python.title"),
      description: t("items.python.description"),
      image: "",
      dates: ["Agosto 2024", "Noviembre 2024"],
      topics: [
        t("topics.dataStructures"),
        "Python",
        t("topics.programmingLogic"),
      ],
      materials: [
        {
          name: t("items.python.materials.slides"),
          url: "https://drive.google.com/file/d/1qPEWKgM_EKlcRyBNREXCbRR5y7VsqfNs/view?usp=drive_link",
          type: "pdf",
        },
        {
          name: t("items.python.materials.dataStructuresPython"),
          url: "https://drive.google.com/file/d/1yGrrsWhHvIuGzJ2k-0PbDZ8vdwf8o8OA/view?usp=drive_link",
          type: "pdf",
        },
        {
          name: t("items.python.materials.oop"),
          url: "https://drive.google.com/file/d/1MSraQi4tPEphHRFUTedcmJNe5-Tx6scL/view?usp=drive_link",
          type: "pdf",
        },
        {
          name: t("items.python.materials.introMl"),
          url: "https://drive.google.com/file/d/1twscO3fHLvEfxNaiH-He9pvDMV1Jstlw/view?usp=drive_link",
          type: "pdf",
        },
        {
          name: t("items.python.materials.classificationModels"),
          url: "https://drive.google.com/file/d/13b2zRi-9of_nxvQwl6mgiH0GQNewOLVh/view?usp=drive_link",
          type: "pdf",
        },
        {
          name: t("items.python.materials.geneticAlgorithms"),
          url: "https://drive.google.com/file/d/1AmPdOQpTr749WxuHU7Mr22mW_ruItIFa/view?usp=drive_link",
          type: "pdf",
        },
      ],
    },
    {
      id: "c2",
      title: t("items.frontendAngular.title"),
      description: t("items.frontendAngular.description"),
      image: "",
      dates: ["Enero 2024", "Junio 2024"],
      topics: ["Angular", "UI/UX", t("topics.webDevelopment")],
      materials: [
        {
          name: "HTML",
          url: "https://drive.google.com/file/d/1ZLE1RUrIsy22Q487X1JiC8vJwRfhwjVm/view?usp=drive_link",
          type: "pdf",
        },
        {
          name: "CSS",
          url: "https://drive.google.com/file/d/1ZLE1RUrIsy22Q487X1JiC8vJwRfhwjVm/view",
          type: "pdf",
        },
        {
          name: t("items.frontendAngular.materials.cssAnimations"),
          url: "https://drive.google.com/file/d/1o3zMaXMI18I08034a5mZytrO5ZZmBHG6/view?usp=drive_link",
          type: "pdf",
        },
      ],
    },
    {
      id: "c3",
      title: t("items.schoolsIntroProgramming.title"),
      description: t("items.schoolsIntroProgramming.description"),
      image: "",
      dates: ["Enero 2024", "Junio 2024"],
      topics: [
        t("topics.algorithmicThinking"),
        t("topics.basicProgramming"),
        t("topics.webDevelopment"),
      ],
      materials: [
        {
          name: t("items.schoolsIntroProgramming.materials.courseIntro"),
          url: "https://drive.google.com/file/d/13y-0zba-PtH6Hrar4UucerTAaclX7nWA/view?usp=drive_link",
          type: "pdf",
        },
        {
          name: t("items.schoolsIntroProgramming.materials.basicConstructions"),
          url: "https://drive.google.com/file/d/1cJINGmR4Zdvg1VDXHPMJvxtbsGfUuSyS/view?usp=drive_link",
          type: "pdf",
        },
        {
          name: t("items.schoolsIntroProgramming.materials.conditionals"),
          url: "https://drive.google.com/file/d/1y9EBToN4Qwk5ZuHsByAVQm8xyHMl_sk5/view?usp=drive_link",
          type: "pdf",
        },
        {
          name: t("items.schoolsIntroProgramming.materials.iterativeSessions"),
          url: "https://drive.google.com/file/d/1S-4RKwhRfdXyjk4bBCSRBk9dr9wDE6rX/view?usp=drive_link",
          type: "pdf",
        },
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-lg">
      <div className="space-y-8">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}

function CourseCard({ course }: { course: Course }) {
  const t = useTranslations("Activities.courses");

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          {course.title}
        </h3>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-gray-600 dark:text-gray-400 text-sm">
            📅 {t("labels.duration")}:
          </span>
          {course.dates.map((date, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs rounded-md"
            >
              {date}
            </span>
          ))}
        </div>
      </div>

      <div className="p-6">
        {course.image && (
          <img
            src={course.image}
            alt={course.title}
            referrerPolicy="no-referrer"
            className="w-full h-48 object-cover rounded-lg mb-6"
          />
        )}

        <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
          {course.description}
        </p>

        <div className="mb-6">
          <h4 className="text-lg text-gray-900 dark:text-white mb-3">
            🎯 {t("labels.topics")}
          </h4>
          <div className="flex flex-wrap gap-2">
            {course.topics.map((topic, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>

        <MaterialsGrid materials={course.materials} />
      </div>
    </div>
  );
}

function MaterialsGrid({ materials }: { materials: CourseMaterial[] }) {
  const t = useTranslations("Activities.courses");

  return (
    <div>
      <h4 className="text-lg text-gray-900 dark:text-white mb-3">
        📁 {t("labels.materials")}
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {materials.map((material, index) => (
          <MaterialItem key={index} material={material} />
        ))}
      </div>
    </div>
  );
}

function MaterialItem({ material }: { material: CourseMaterial }) {
  return (
    <a
      href={material.url}
      target="_blank"
      rel="noreferrer"
      className="flex items-center p-3 no-underline bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 group min-w-0"
    >
      <div className="flex-shrink-0 mr-3">
        <MaterialIcon type={material.type} />
      </div>

      <div className="flex-1 min-w-0 overflow-hidden">
        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
          {material.name}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
          {material.type}
        </p>
      </div>

      <svg
        className="w-4 h-4 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </a>
  );
}

function MaterialIcon({ type }: { type: MaterialType }) {
  if (type === "pdf") {
    return (
      <svg
        className="w-6 h-6 text-red-500"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M4 4h12v12H4z" />
      </svg>
    );
  }

  if (type === "ppt") {
    return (
      <svg
        className="w-6 h-6 text-orange-500"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M4 4h12v12H4z" />
      </svg>
    );
  }

  return (
    <svg
      className="w-6 h-6 text-green-500"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M12 4l4 4-4 4M8 8l-4 4 4 4" />
    </svg>
  );
}
