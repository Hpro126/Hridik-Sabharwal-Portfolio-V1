
export type PageView = 'home' | 'about' | 'projects' | 'animations' | 'edits' | 'blog' | 'contact';

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  category: 'tech' | 'robotics' | 'iot' | 'ai';
  featured: boolean;
  date: string;
  link?: string;
  // New fields for detail page
  fullDescription: string;
  fullDescriptionImage?: string;
  journey: string;
  journeyImage?: string;
  challenges: string;
  challengesImage?: string;
  techStackDetails: string[];
  githubLink?: string;
  demoLink?: string;
}

export interface Animation {
  id: string;
  title: string;
  description: string;
  videoUrl: string; 
  imageUrl: string;
  featured: boolean;
  date: string;
  software: string[];
}

export interface Edit {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  imageUrl: string;
  featured: boolean;
  date: string;
  software: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  imageUrl: string;
  featured: boolean;
  tags: string[];
  // New fields for detail page
  content: string[]; // Array of paragraphs
  author: string;
}

export type ToggleOption = 'featured' | 'recent';
