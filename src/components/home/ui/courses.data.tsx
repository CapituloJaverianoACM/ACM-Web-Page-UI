export type MaterialType = "pdf" | "ppt" | "link";

export interface CourseMaterialBase {
  nameKey: string | { raw: string };
  url: string;
  type: MaterialType;
}

export interface CourseBase {
  id: string;
  titleKey: string;
  descriptionKey: string;
  image: string;
  dates: string[];
  topicKeys: Array<string | { raw: string }>;
  materials: CourseMaterialBase[];
}

export const COURSES_BASE: CourseBase[] = [
  {
    id: "c1",
    titleKey: "items.python.title",
    descriptionKey: "items.python.description",
    image: "",
    dates: ["Agosto 2024", "Noviembre 2024"],
    topicKeys: [
      "topics.dataStructures",
      { raw: "Python" },
      "topics.programmingLogic",
    ],
    materials: [
      {
        nameKey: "items.python.materials.slides",
        url: "https://drive.google.com/file/d/1qPEWKgM_EKlcRyBNREXCbRR5y7VsqfNs/view?usp=drive_link",
        type: "pdf",
      },
      {
        nameKey: "items.python.materials.dataStructuresPython",
        url: "https://drive.google.com/file/d/1yGrrsWhHvIuGzJ2k-0PbDZ8vdwf8o8OA/view?usp=drive_link",
        type: "pdf",
      },
      {
        nameKey: "items.python.materials.oop",
        url: "https://drive.google.com/file/d/1MSraQi4tPEphHRFUTedcmJNe5-Tx6scL/view?usp=drive_link",
        type: "pdf",
      },
      {
        nameKey: "items.python.materials.introMl",
        url: "https://drive.google.com/file/d/1twscO3fHLvEfxNaiH-He9pvDMV1Jstlw/view?usp=drive_link",
        type: "pdf",
      },
      {
        nameKey: "items.python.materials.classificationModels",
        url: "https://drive.google.com/file/d/13b2zRi-9of_nxvQwl6mgiH0GQNewOLVh/view?usp=drive_link",
        type: "pdf",
      },
      {
        nameKey: "items.python.materials.geneticAlgorithms",
        url: "https://drive.google.com/file/d/1AmPdOQpTr749WxuHU7Mr22mW_ruItIFa/view?usp=drive_link",
        type: "pdf",
      },
    ],
  },
  {
    id: "c2",
    titleKey: "items.frontendAngular.title",
    descriptionKey: "items.frontendAngular.description",
    image: "",
    dates: ["Enero 2024", "Junio 2024"],
    topicKeys: [{ raw: "Angular" }, { raw: "UI/UX" }, "topics.webDevelopment"],
    materials: [
      {
        nameKey: { raw: "HTML" },
        url: "https://drive.google.com/file/d/1ZLE1RUrIsy22Q487X1JiC8vJwRfhwjVm/view?usp=drive_link",
        type: "pdf",
      },
      {
        nameKey: { raw: "CSS" },
        url: "https://drive.google.com/file/d/1ZLE1RUrIsy22Q487X1JiC8vJwRfhwjVm/view",
        type: "pdf",
      },
      {
        nameKey: "items.frontendAngular.materials.cssAnimations",
        url: "https://drive.google.com/file/d/1o3zMaXMI18I08034a5mZytrO5ZZmBHG6/view?usp=drive_link",
        type: "pdf",
      },
    ],
  },
  {
    id: "c3",
    titleKey: "items.schoolsIntroProgramming.title",
    descriptionKey: "items.schoolsIntroProgramming.description",
    image: "",
    dates: ["Enero 2024", "Junio 2024"],
    topicKeys: [
      "topics.algorithmicThinking",
      "topics.basicProgramming",
      "topics.webDevelopment",
    ],
    materials: [
      {
        nameKey: "items.schoolsIntroProgramming.materials.courseIntro",
        url: "https://drive.google.com/file/d/13y-0zba-PtH6Hrar4UucerTAaclX7nWA/view?usp=drive_link",
        type: "pdf",
      },
      {
        nameKey: "items.schoolsIntroProgramming.materials.basicConstructions",
        url: "https://drive.google.com/file/d/1cJINGmR4Zdvg1VDXHPMJvxtbsGfUuSyS/view?usp=drive_link",
        type: "pdf",
      },
      {
        nameKey: "items.schoolsIntroProgramming.materials.conditionals",
        url: "https://drive.google.com/file/d/1y9EBToN4Qwk5ZuHsByAVQm8xyHMl_sk5/view?usp=drive_link",
        type: "pdf",
      },
      {
        nameKey: "items.schoolsIntroProgramming.materials.iterativeSessions",
        url: "https://drive.google.com/file/d/1S-4RKwhRfdXyjk4bBCSRBk9dr9wDE6rX/view?usp=drive_link",
        type: "pdf",
      },
    ],
  },
];
