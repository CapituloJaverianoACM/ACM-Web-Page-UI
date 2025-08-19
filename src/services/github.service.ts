// Servicio para obtener contribuidores del proyecto ACM-Web-Page-UI
export interface GitHubContributor {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  type: string;
}

export async function getGitHubContributors(
  owner: string = "CapituloJaverianoACM",
  repo: string = "ACM-Web-Page-UI",
  limit: number = 6
): Promise<GitHubContributor[]> {
  try {
    console.log(`Obteniendo contribuidores de ${owner}/${repo}...`);

        const url = `https://api.github.com/repos/${owner}/${repo}/contributors?per_page=${limit}&anon=0`;

    const response = await fetch(url, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "ACM-Web-Page-UI/Contributors (no-auth)",
      },
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      console.error(`Error GitHub API: ${response.status} ${response.statusText}`);
      return [];
    }

    const data = await response.json();

    const contributors: GitHubContributor[] = data
      .filter((c: any) => c && c.type === "User" && typeof c.login === "string" && !c.login.endsWith("[bot]"))
      .slice(0, limit)
      .map((c: any) => ({
        id: c.id,
        login: c.login,
        avatar_url: c.avatar_url,
        html_url: c.html_url,
        type: c.type,
      }));

    console.log(`Contribuidores obtenidos: ${contributors.length}`);
    return contributors;
  } catch (error) {
    console.error("Error obteniendo contribuidores:", error);
    return [];
  }
}
