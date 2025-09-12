export interface Member {
  _id: string;
  name: string;
  title: string;
  role: string;
  email: string;
  bio: string;
  skills: string[];
  image?: string;
  active: boolean;
  linkedin?: string;
  github?: string;
  memberSince: string;
}
