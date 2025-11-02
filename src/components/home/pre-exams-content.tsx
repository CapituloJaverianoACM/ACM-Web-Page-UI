interface PreExam {
  id: string;
  title: string;
  description: string;
  dates: string[];
  materials: {
    name: string;
    url: string;
    type: "pdf" | "ppt" | "doc" | "link";
  }[];
  topics: string[];
}

const preExams: PreExam[] = [
  {
    id: "1",
    title: "Taller: Introducción a la Programación",
    description:
      "Conceptos fundamentales de programación y lógica computacional.",
    dates: [
      "23 de Agosto, 2023",
      "8 de Noviembre, 2023",
      "4 de Marzo, 2025",
      "7 de Abril, 2025",
      "19 de Mayo, 2025",
    ],
    materials: [
      {
        name: "Slides - Parcial No. 1",
        url: "https://drive.google.com/file/d/1gWnlsfQTYN-qMi2M9cEa5l2Qz2W6dsdv/view?usp=drive_link",
        type: "ppt",
      },
      {
        name: "Simulacro - Parcial No. 2",
        url: "https://drive.google.com/file/d/150yucdufPKI1WpLxzlGUFbTf4tMgzDcX/view?usp=drive_link",
        type: "pdf",
      },
      {
        name: "Simulacro - Parcial No. 3",
        url: "https://drive.google.com/file/d/1euu3OwXiu4OtuOYg4N4A9fZDv-IAkui2/view?usp=drive_link",
        type: "pdf",
      },
    ],
    topics: [
      "Variables",
      "Estructuras de control",
      "Funciones",
      "Arrays",
      "C++",
    ],
  },
  {
    id: "2",
    title: "Taller: Programación Avanzada",
    description:
      "Técnicas avanzadas de programación e introducción al paradigma orientado a objetos.",
    dates: ["8 de Noviembre, 2023", "20 de Marzo, 2025", "19 de Mayo, 2025"],
    materials: [
      {
        name: "Simulacro - Parcial No. 1",
        url: "https://drive.google.com/file/d/1sHX0NrQoqPfqF0VriHFbTZArsQ84DGYz/view?usp=drive_link",
        type: "pdf",
      },
      {
        name: "Slides - Parcial No. 2",
        url: "https://drive.google.com/file/d/1tkwQnNmzPcSGHb58dqekBJBxaq_7sLm3/view?usp=drive_link",
        type: "ppt",
      },
      {
        name: "Simulacro - Parcial No. 2",
        url: "https://drive.google.com/file/d/1oywoalikehnSqVLAYtni-kxqndmZFktM/view?usp=drive_link",
        type: "pdf",
      },
      {
        name: "Slides - Parcial No. 3",
        url: "https://drive.google.com/file/d/1fdLJsQBw3hNAATq3Z65aj6MM_R7vg0QY/view?usp=drive_link",
        type: "ppt",
      },
    ],
    topics: ["POO", "Apuntadores", "Manejo de errores", "Java", "C++"],
  },
  {
    id: "3",
    title: "Taller: Estructuras de Datos",
    description:
      "Implementación y uso de estructuras de datos fundamentales para resolver problemas complejos.",
    dates: ["29 de Febrero, 2025", "9 de Abril, 2025", "29 de Mayo, 2025"],
    materials: [
      {
        name: "Simulacro - Parcial No. 2",
        url: "https://drive.google.com/file/d/1p9_xnDmhrYLXkz-1jybUHx_rgb-dnOMo/view?usp=drive_link",
        type: "pdf",
      },
      {
        name: "Solución Simulacro - Parcial No. 2",
        url: "https://drive.google.com/file/d/1Bs1gWolsEWe0zTA4Ecpf3bnHYhfiyUB2/view?usp=drive_link",
        type: "pdf",
      },
      {
        name: "Simulacro (presencial) - Parcial No. 3",
        url: "https://drive.google.com/file/d/1gqrUUhCenLDZxbGtxcQ7iheBy5I4BaIg/view?usp=drive_linkk",
        type: "pdf",
      },
      {
        name: "Simulacro (virtual) - Parcial No. 3",
        url: "https://drive.google.com/file/d/1H3fIQTNZgWYw0DVlFCs-2gOzXJ5yDYdn/view?usp=drive_link",
        type: "pdf",
      },
    ],
    topics: ["STL", "Árboles", "Grafos", "C++"],
  },
];

export function PreExamsContent() {
  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-lg">
      <div className="space-y-8">
        {preExams.map((preExam) => (
          <div
            key={preExam.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                {preExam.title}
              </h3>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  📅 Fechas:
                </span>
                {preExam.dates.map((date, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs rounded-md"
                  >
                    {date}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="p-6">
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                {preExam.description}
              </p>

              {/* Topics */}
              <div className="mb-6">
                <h4 className="text-lg text-gray-900 dark:text-white mb-3">
                  🎯 Temas Cubiertos
                </h4>
                <div className="flex flex-wrap gap-2">
                  {preExam.topics.map((topic, index) => (
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
                  📁 Material Utilizado
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {preExam.materials.map((material, index) => (
                    <a
                      key={index}
                      href={material.url}
                      target="_blank"
                      className="flex items-center p-3 no-underline bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 group min-w-0"
                    >
                      <div className="flex-shrink-0 mr-3">
                        {material.type === "pdf" && (
                          <svg
                            className="w-6 h-6 text-red-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
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
                              d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
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
                              d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
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
                              d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5a2 2 0 112.828 2.828l-1.5 1.5a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l1.5-1.5a4 4 0 00-5.656-5.656l-3 3a4 4 0 00-.586 5.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1 min-w-0 overflow-hidden">
                        <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate">
                          {material.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 capitalize truncate">
                          {material.type}
                        </p>
                      </div>
                      <svg
                        className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300"
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

      {/* Call to Action */}
      <div className="mt-8 text-center">
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          ¿Te interesa participar en nuestros próximos preparciales?
        </p>
        <a
          href="https://www.instagram.com/acmjaveriana"
          target="_blank"
          className="no-underline bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white hover:text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
        >
          📝 Inscribirse en Próximos Talleres
        </a>
      </div>
    </div>
  );
}
