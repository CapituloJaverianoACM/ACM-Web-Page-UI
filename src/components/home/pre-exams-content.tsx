interface PreExam {
  id: string;
  title: string;
  description: string;
  dates: string[];
  images: string[];
  materials: {
    name: string;
    url: string;
    type: 'pdf' | 'ppt' | 'doc' | 'link';
  }[];
  topics: string[];
}

const preExams: PreExam[] = [
  {
    id: "1",
    title: "Taller: Introducción a la Programación",
    description: "Taller básico para principiantes. Conceptos fundamentales de programación y lógica computacional.",
    dates: ["15 de Marzo, 2024", "22 de Marzo, 2024", "5 de Abril, 2024"],
    images: [
      "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    materials: [
      {
        name: "Presentación del Taller",
        url: "#",
        type: "ppt"
      },
      {
        name: "Ejercicios Prácticos",
        url: "#",
        type: "pdf"
      }
    ],
    topics: ["Variables", "Estructuras de control", "Funciones", "Arrays"]
  },
  {
    id: "2",
    title: "Taller: Programación Avanzada",
    description: "Técnicas avanzadas de programación y mejores prácticas para desarrollo eficiente.",
    dates: ["22 de Marzo, 2024", "29 de Marzo, 2024", "12 de Abril, 2024"],
    images: [
      "https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    materials: [
      {
        name: "Guía de Programación Avanzada",
        url: "#",
        type: "pdf"
      },
      {
        name: "Código de Ejemplos",
        url: "#",
        type: "link"
      }
    ],
    topics: ["POO", "Recursión", "Manejo de errores", "Optimización"]
  },
  {
    id: "3",
    title: "Taller: Estructuras de Datos",
    description: "Implementación y uso de estructuras de datos fundamentales para resolver problemas complejos.",
    dates: ["29 de Marzo, 2024", "5 de Abril, 2024", "19 de Abril, 2024"],
    images: [
      "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    materials: [
      {
        name: "Estructuras de Datos - Teoría",
        url: "#",
        type: "pdf"
      },
      {
        name: "Implementaciones",
        url: "#",
        type: "link"
      }
    ],
    topics: ["Listas", "Pilas y colas", "Árboles", "Grafos"]
  },
  {
    id: "4",
    title: "Taller: Análisis de Algoritmos",
    description: "Análisis de complejidad temporal y espacial. Técnicas para optimizar algoritmos.",
    dates: ["5 de Abril, 2024", "12 de Abril, 2024", "26 de Abril, 2024"],
    images: [
      "https://images.pexels.com/photos/1181678/pexels-photo-1181678.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    materials: [
      {
        name: "Análisis de Algoritmos",
        url: "#",
        type: "pdf"
      },
      {
        name: "Problemas de Práctica",
        url: "#",
        type: "pdf"
      }
    ],
    topics: ["Complejidad", "Ordenamiento", "Búsqueda", "Optimización"]
  }
];

export function PreExamsContent() {
  return (
    <div className="max-w-7xl mx-auto my-12 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-lg">


      <div className="space-y-8">
        {preExams.map((preExam) => (
          <div key={preExam.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                {preExam.title}
              </h3>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-gray-600 dark:text-gray-400 text-sm">📅 Fechas:</span>
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
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
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

              {/* Images */}
              {preExam.images.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                    📸 Galería
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {preExam.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Imagen ${index + 1} del preparcial`}
                          className="w-full h-32 object-cover rounded-lg shadow-sm group-hover:shadow-md transition-shadow duration-200"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-lg flex items-center justify-center">
                          <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                          </svg>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Materials */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                  📁 Material Utilizado
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {preExam.materials.map((material, index) => (
                    <a
                      key={index}
                      href={material.url}
                      className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 group"
                    >
                      <div className="flex-shrink-0 mr-3">
                        {material.type === 'pdf' && (
                          <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                          </svg>
                        )}
                        {material.type === 'ppt' && (
                          <svg className="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                          </svg>
                        )}
                        {material.type === 'doc' && (
                          <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                          </svg>
                        )}
                        {material.type === 'link' && (
                          <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5a2 2 0 112.828 2.828l-1.5 1.5a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l1.5-1.5a4 4 0 00-5.656-5.656l-3 3a4 4 0 00-.586 5.414z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate">
                          {material.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                          {material.type}
                        </p>
                      </div>
                      <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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
        <button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
          📝 Inscribirse en Próximos Talleres
        </button>
      </div>
    </div>
  );
}