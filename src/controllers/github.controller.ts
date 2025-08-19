
export interface GitHubContributor {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  type: string; 
}

type RepoRef = { owner: string; repo: string };

const DEFAULT_REPOS: RepoRef[] = [
  { owner: "CapituloJaverianoACM", repo: "ACM-Web-Page-UI" },
  { owner: "CapituloJaverianoACM", repo: "ACM-cli" },
  { owner: "CapituloJaverianoACM", repo: "ACM-api" },
];


async function fetchContributorsFromRepo(
  { owner, repo }: RepoRef,
  perRepoLimit: number = 6
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
    console.error(`Error GitHub API (${owner}/${repo}): ${response.status} ${response.statusText}`);
    return [];
  }

  const data = await response.json();
  if (!Array.isArray(data)) {
    console.error(`Respuesta inesperada en ${owner}/${repo} (no es un arreglo).`);
    return [];
  }

  // Filtra usuarios reales
  const contributors: GitHubContributor[] = data
    .filter(
      (c: any) =>
        c &&
        c.type === "User" &&
        typeof c.login === "string" &&
        !String(c.login).endsWith("[bot]")
    )
    .map((c: any) => ({
      id: c.id,
      login: c.login,
      avatar_url: c.avatar_url,
      html_url: c.html_url,
      type: c.type,
    }));

  console.log(`Contribuidores obtenidos en ${owner}/${repo}: ${contributors.length}`);
  return contributors;
}


export async function getGitHubContributors(
  owner: string = "CapituloJaverianoACM",
  repo: string = "ACM-Web-Page-UI",
  limit: number = 6
): Promise<GitHubContributor[]> {
  const list = await fetchContributorsFromRepo({ owner, repo }, limit);

  return list.slice(0, limit);
}


export async function getGitHubContributorsFromRepos(
  repos: RepoRef[] = DEFAULT_REPOS,
  perRepoLimit: number = 6,
  totalLimit: number = 12
): Promise<GitHubContributor[]> {
  const results = await Promise.all(
    repos.map((r) => fetchContributorsFromRepo(r, perRepoLimit))
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

