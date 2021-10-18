export interface Person {
  avatar_url?: string,
  name?: string,
  login?: string,
  fallowers?: number,
  language?: string,
  owner?: Person,
  repos_url: string,
}