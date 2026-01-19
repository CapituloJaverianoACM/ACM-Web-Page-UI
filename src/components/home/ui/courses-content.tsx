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
    title: "Curso De Python",
    description:
      "Curso dirigido a estudiantes interesados en aprender Python desde cero y aplicar programación, análisis de datos y fundamentos de machine learning en un proyecto práctico.",
    image: "",
    dates: ["Agosto 2024", "Noviembre 2024"],
    topics: ["Estructuras de datos", "Python", "Logica de programación"],
    materials: [
      {
        name: "Slides del Curso",
        url: "https://drive.google.com/file/d/1qPEWKgM_EKlcRyBNREXCbRR5y7VsqfNs/view?usp=drive_link",
        type: "pdf",
      },
      {
        name: "Estructuras de datos en Python",
        url: "https://drive.google.com/file/d/1yGrrsWhHvIuGzJ2k-0PbDZ8vdwf8o8OA/view?usp=drive_link",
        type: "pdf",
      },
      {
        name: "Programación orientada a objetos",
        url: "https://www.canva.com/design/DAGMiKy41SA/fhM5NlKTiyu7fBRG973xkg/edit",
        type: "link",
      },
      {
        name: "Introducción al machine learning",
        url: "https://www.canva.com/design/DAGMiJv4HQQ/7iRBH2RgnwGBPkozjWo1qw/edit",
        type: "link",
      },
      {
        name: "Modelos de clasificación",
        url: "https://www.canva.com/design/DAGMiJuNh-I/mMI_h4yrsGhi7c2iODg1bg/edit",
        type: "link",
      },
      {
        name: "Algoritmos genéticos",
        url: "https://www.canva.com/design/DAGMjlgpawI/wE5YFShwxaOJvb0NlqkHRA/edit",
        type: "link",
      },
    ],
  },
  {
    id: "c2",
    title: "Curso Front-End (Angular)",
    description:
      "Curso dirigido a estudiantes interesados en el desarrollo frontend, que introduce desde los fundamentos de HTML y CSS hasta la creación de aplicaciones web modernas utilizando Angular 17.",
    image: "",
    dates: ["Enero 2024", "Junio 2024"],
    topics: ["Angular", "UI/UX", "Desarrollo Web"],
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
        name: "Animaciones CSS",
        url: "https://drive.google.com/file/d/1o3zMaXMI18I08034a5mZytrO5ZZmBHG6/view?usp=drive_link",
        type: "pdf",
      },
    ],
  },
  {
    id: "c3",
    title: "Curso de colegios - Introducción a la programación",
    description:
      "Curso introductorio dirigido a estudiantes de colegio sin experiencia previa, orientado a desarrollar el pensamiento lógico y algorítmico mediante la resolución de problemas y la implementación de conceptos básicos de programación y desarrollo web.",
    image: "",
    dates: ["Enero 2024", "Junio 2024"],
    topics: [
      "Pensamiento algoritmico",
      "Programación básica",
      "Desarrollo web",
    ],
    materials: [
      {
        name: "Introducción al curso",
        url: "https://drive.google.com/file/d/13y-0zba-PtH6Hrar4UucerTAaclX7nWA/view?usp=drive_link",
        type: "link",
      },
      {
        name: "Construcciones basicas de programación",
        url: "https://drive.google.com/file/d/1cJINGmR4Zdvg1VDXHPMJvxtbsGfUuSyS/view?usp=drive_link",
        type: "pdf",
      },
      {
        name: "Condicionales y operadores lógicos",
        url: "https://drive.google.com/file/d/1y9EBToN4Qwk5ZuHsByAVQm8xyHMl_sk5/view?usp=drive_link",
        type: "pdf",
      },
      {
        name: "Sesiones iterativas",
        url: "https://drive.google.com/file/d/1S-4RKwhRfdXyjk4bBCSRBk9dr9wDE6rX/view?usp=drive_link",
        type: "pdf",
      },
    ],
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
