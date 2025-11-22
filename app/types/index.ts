export interface Project {
  title: string;
  category: string;
  year: number;
  assets: {
    images: string[];
  };
  materials: string[];
  description: string;
  Model3D?: string;
}

export interface ProjectsData {
  title?: string;
  projects: Project[];
}

export interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

export interface MaisonDeVinciData {
  title: string;
  paragraphs: string[];
}

export interface ContactLink {
  label: string;
  url: string;
}

export interface AboutData {
  title?: string;
  paragraphs: string[];
  contact: {
    email: string;
    links: ContactLink[];
  };
}

export interface ShopData {
  title?: string;
  message: string;
}

export type ContentType = 'projects' | 'maisonDeVinci' | 'about' | 'shop';


export interface FixedNameProps {
  firstName: string;
  lastName: string;
}