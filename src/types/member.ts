export interface Member {
    id: string;
    name: string;
    career: string;
    rol: string;
    email: string;
    bio: string;
    skills: string[];
    image?: string;
    active: boolean;
    linkedin?: string;
    memberSince?: string; // AÑO-SEMESTRE (e.g., "2023-1")
}