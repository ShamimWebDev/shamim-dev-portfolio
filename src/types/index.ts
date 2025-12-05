export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  fullDescription?: string;
  features?: string[];
  challenges?: string[];
  improvements?: string[];
  architecture?: string[];
  dependencies?: Record<string, string>;
  gettingStarted?: string[];
}
