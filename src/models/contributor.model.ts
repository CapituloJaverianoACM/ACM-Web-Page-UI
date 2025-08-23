export interface GitHubContributor {
    id: number;
    login: string;
    avatar_url: string;
    html_url: string;
}

export interface Contributor {
    _id: number;
    name: string;
    image: string;
    github: string;
}
