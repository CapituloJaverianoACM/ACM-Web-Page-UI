export interface GitHubContributor {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  type: string;
}

// Define the minimal shape we rely on from the GitHub API
interface RawGitHubContributor {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  type: unknown;
}

// Type guard to validate an unknown value matches RawGitHubContributor
function isRawGitHubContributor(value: unknown): value is RawGitHubContributor {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.id === "number" &&
    typeof v.login === "string" &&
    typeof v.avatar_url === "string" &&
    typeof v.html_url === "string" &&
    // type can be string but some APIs might return other values; we validate later
    (typeof v.type === "string" || typeof v.type === "undefined")
  );
}

type RepoRef = { owner: string; repo: string };

const DEFAULT_REPOS: RepoRef[] = [
  { owner: "CapituloJaverianoACM", repo: "ACM-Web-Page-UI" },
  { owner: "CapituloJaverianoACM", repo: "ACM-cli" },
  { owner: "CapituloJaverianoACM", repo: "ACM-api" },
];

async function fetchContributorsFromRepo(
  { owner, repo }: RepoRef,
  perRepoLimit: number = 6,
): Promise<GitHubContributor[]> {
  const url = `https://api.github.com/repos/${owner}/${repo}/contributors?per_page=${perRepoLimit}&anon=0`;

  console.log(`Obteniendo contribuidores de ${owner}/${repo}...`);
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "ACM-Contributors (no-auth)",
    },
    next: { revalidate: 300 }, // cache SSR/ISR: 5 min
  });

  if (!response.ok) {
    console.error(
      `Error GitHub API (${owner}/${repo}): ${response.status} ${response.statusText}`,
    );
    return [];
  }

  const data: unknown = await response.json();
  if (!Array.isArray(data)) {
    console.error(
      `Respuesta inesperada en ${owner}/${repo} (no es un arreglo).`,
    );
    return [];
  }

  // Filtra usuarios reales
  const contributors: GitHubContributor[] = data
    .filter(isRawGitHubContributor)
    .filter(
      (c) =>
        typeof c.type === "string" &&
        c.type === "User" &&
        !c.login.endsWith("[bot]"),
    )
    .map((c) => ({
      id: c.id,
      login: c.login,
      avatar_url: c.avatar_url,
      html_url: c.html_url,
      type: String(c.type),
    }));

  console.log(
    `Contribuidores obtenidos en ${owner}/${repo}: ${contributors.length}`,
  );
  return contributors;
}

export async function getGitHubContributors(
  owner: string = "CapituloJaverianoACM",
  repo: string = "ACM-Web-Page-UI",
  limit: number = 6,
): Promise<GitHubContributor[]> {
  const list = await fetchContributorsFromRepo({ owner, repo }, limit);

  return list.slice(0, limit);
}

export async function getGitHubContributorsFromRepos(
  repos: RepoRef[] = DEFAULT_REPOS,
  perRepoLimit: number = 6,
  totalLimit: number = 12,
): Promise<GitHubContributor[]> {
  const results = await Promise.all(
    repos.map((r) => fetchContributorsFromRepo(r, perRepoLimit)),
  );

  // Aplana
  const all = results.flat();

  // Deduplicar por id
  const seen = new Set<number>();
  const deduped: GitHubContributor[] = [];
  for (const c of all) {
    if (!seen.has(c.id)) {
      seen.add(c.id);
      deduped.push(c);
    }
  }

  deduped.sort((a, b) => a.login.localeCompare(b.login));

  console.log(`Total contribuidores únicos: ${deduped.length}`);
  return deduped.slice(0, totalLimit);
}
