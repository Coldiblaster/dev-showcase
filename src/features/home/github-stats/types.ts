/**
 * Dados agregados do perfil e atividade do GitHub para exibição.
 */
export interface GitHubStats {
  publicRepos: number;
  followers: number;
  totalStars: number;
  topLanguages: { name: string; percentage: number }[];
  recentActivity: { repo: string; message: string; date: string }[];
  avatarUrl: string;
  bio: string;
}
