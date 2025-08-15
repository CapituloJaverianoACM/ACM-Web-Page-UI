import { Contributor, GitHubContributor } from "@/models/contributor.model";

const repositories = [
    { owner: "CapituloJaverianoACM", repo: "ACM-Web-Page-UI" },
    { owner: "CapituloJaverianoACM", repo: "ACM-cli" },
    { owner: "CapituloJaverianoACM", repo: "ACM-api" }
];

function mapRepositoriesToUrls(repos: { owner: string; repo: string }[]): string[] {
    return repos.map(repo => `https://api.github.com/repos/${repo.owner}/${repo.repo}/contributors`);
}

async function fetchAndTransformContributors(apiUrl: string): Promise<Contributor[]> {
    const res = await fetch(apiUrl);
    
    if (!res.ok) {
        console.error(`Error al obtener contribuyentes de ${apiUrl}`);
        return []; 
    }

    const githubContributors: GitHubContributor[] = await res.json();
    return githubContributors.map((contributor) => ({
        _id: contributor.id,
        name: contributor.login,
        image: contributor.avatar_url,
        github: contributor.html_url,
    }));
}

export async function getContributors(): Promise<Contributor[]> {
    const reposUrls = mapRepositoriesToUrls(repositories);
    
    const promises = reposUrls.map(url => fetchAndTransformContributors(url));
    const allContributorsArrays = await Promise.all(promises);
    
    const uniqueContributorsMap = new Map<number, Contributor>();
    
    allContributorsArrays.flat().forEach(contributor => {
        if (!uniqueContributorsMap.has(contributor._id)) {
            uniqueContributorsMap.set(contributor._id, contributor);
        }
    });
    
    return Array.from(uniqueContributorsMap.values());
}