export const getNavLinks = (t: (key: string) => string) => [
  { key: "home", label: t("home"), href: "#home" },
  { key: "activities", label: t("activities"), href: "#activities" },
  { key: "members", label: t("members"), href: "#members" },
  { key: "league", label: t("league"), href: "/league" },
];
