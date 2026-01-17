//interface for course data.
interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  dates: string[];
  topics: string[];
  materials: {
    name: string;
    url: string;
    type: "pdf" | "ppt" | "link";
  }[];
}
const courses: Course[] = [
  {
    id: "c1",
    title: "Curso X",
    description:
      "Descripción del curso X. Aquí puedes explicar brevemente de qué trata, a quién va dirigido y qué se aprende.",
    image: "/images/curso-x.jpg",
    dates: ["Marzo 2025", "Abril 2025"],
    topics: ["Tema 1", "Tema 2", "Tema 3"],
    materials: [{ name: "Slides del Curso", url: "#", type: "ppt" }],
  },
  {
    id: "c2",
    title: "Curso Y",
    description:
      "Descripción del curso Y. Puedes cambiar completamente el contenido manteniendo el mismo diseño.",
    image: "/images/curso-y.jpg",
    dates: ["Mayo 2025"],
    topics: ["Concepto A", "Concepto B"],
    materials: [{ name: "Repositorio", url: "#", type: "link" }],
  },
  {
    id: "c3",
    title: "Curso z",
    description:
      "Descripción del curso z. Puedes cambiar completamente el contenido manteniendo el mismo diseño.",
    image: "/images/curso-z.jpg",
    dates: ["Mayo 2025"],
    topics: ["Concepto A", "Concepto B"],
    materials: [{ name: "Repositorio", url: "#", type: "link" }],
  },
];
export function CoursesContent() {
  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-lg">
      <div className="space-y-8">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                {course.title}
              </h3>

              <div className="flex flex-wrap items-center gap-2">
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  📅 Duración:
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

            {/* Body */}
            <div className="p-6">
              {/* . */}
              {course.image && (
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover rounded-lg mb-6"
                />
              )}

              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                {course.description}
              </p>

              {/* Topics */}
              <div className="mb-6">
                <h4 className="text-lg text-gray-900 dark:text-white mb-3">
                  🎯 Temas
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

              {/* Materials */}
              <div>
                <h4 className="text-lg text-gray-900 dark:text-white mb-3">
                  📁 Material del Curso
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {course.materials.map((material, index) => (
                    <a
                      key={index}
                      href={material.url}
                      target="_blank"
                      className="flex items-center p-3 no-underline bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 group min-w-0"
                    >
                      {/* Icon */}
                      <div className="flex-shrink-0 mr-3">
                        {material.type === "pdf" && (
                          <svg
                            className="w-6 h-6 text-red-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}

                        {material.type === "ppt" && (
                          <svg
                            className="w-6 h-6 text-orange-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}

                        {material.type === "doc" && (
                          <svg
                            className="w-6 h-6 text-blue-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}

                        {material.type === "link" && (
                          <svg
                            className="w-6 h-6 text-green-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>

                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {material.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                          {material.type}
                        </p>
                      </div>

                      {/* Arrow */}
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
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
