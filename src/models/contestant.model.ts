export type Contestant = {
  id: number;
  name: string;
  ready?: boolean;
  victories: number;
  avatar_url: string | null;
  codeforces_handle: string;
  matches_count: number;
};
