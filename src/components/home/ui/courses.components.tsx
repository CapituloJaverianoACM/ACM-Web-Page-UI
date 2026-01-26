import React from "react";
import type { MaterialType } from "./courses.data";

export interface CourseMaterialUI {
  name: string;
  url: string;
  type: MaterialType;
}

export interface CourseUI {
  id: string;
  title: string;
  description: string;
  image: string;
  dates: string[];
  topics: string[];
  materials: CourseMaterialUI[];
}

export function CourseCard({
  course,
  labels,
}: {
  course: CourseUI;
  labels: { duration: string; topics: string; materials: string };
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          {course.title}
        </h3>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-gray-600 dark:text-gray-400 text-sm">
            📅 {labels.duration}:
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
            🎯 {labels.topics}
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

        <MaterialsGrid
          materials={course.materials}
          title={`📁 ${labels.materials}`}
        />
      </div>
    </div>
  );
}

function MaterialsGrid({
  materials,
  title,
}: {
  materials: CourseMaterialUI[];
  title: string;
}) {
  return (
    <div>
      <h4 className="text-lg text-gray-900 dark:text-white mb-3">{title}</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {materials.map((material, index) => (
          <MaterialItem key={index} material={material} />
        ))}
      </div>
    </div>
  );
}

function MaterialItem({ material }: { material: CourseMaterialUI }) {
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
