"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import FixedName from "./components/FixedName";

const HOMEPAGE_PROJECTS = [
  "Villa Lumina",
  "Musée des Arts Numériques",
  "Bureau Évolutif",
];

interface Project {
  title: string;
  category: string;
  year: number;
  assets: {
    images: string[];
  };
  materials: string[];
  description: string;
}

interface ProjectsData {
  title: string;
  projects: Project[];
}

export default function Home() {
  const [projectsData, setProjectsData] = React.useState<ProjectsData | null>(
    null
  );
  const [homepageProjects, setHomepageProjects] = React.useState<Project[]>([]);

  React.useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await import("./data/projects.json");
        setProjectsData(data.default);
      } catch (error) {
        console.error("Error loading projects:", error);
      }
    };
    loadProjects();
  }, []);

  React.useEffect(() => {
    if (projectsData) {
      const filtered = projectsData.projects.filter((project) =>
        HOMEPAGE_PROJECTS.includes(project.title)
      );
      setHomepageProjects(filtered);
    }
  }, [projectsData]);

  if (!projectsData) {
    return (
      <div className="flex flex-1 items-center justify-center py-32 px-4 sm:pt-24 dark:bg-black">
        <div className="text-center text-gray-500 dark:text-gray-400">
          Chargement...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen dark:bg-black py-16 px-8 pt-24">
      <FixedName firstName="Maxime" lastName="Becker"/>
      <div className="max-w-8xl w-full mx-auto md:mt-20 lg:mt-40">
        <div className="flex flex-col gap-16">
          {homepageProjects.map((project, index) => (
            <div key={index} className="flex">
              <div className="flex-1">
                <p>
                  <span>Project : </span>
                  <span>{project.title}</span>
                </p>
                <p>
                  <span>Year : </span>
                  <span>{project.year}</span>
                </p>
              </div>
              <Link
                href={`/projects/${projectsData.projects.findIndex(
                  (p) => p.title === project.title
                )}`}
                className="group block w-2/3"
              >
                <div className="w-full border border-black dark:border-white overflow-hidden mb-4">
                  <div className="relative w-full aspect-4/3">
                    {project.assets.images &&
                    project.assets.images.length > 0 ? (
                      <Image
                        src={`/assets/images/${project.assets.images[0]}`}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                        sizes="100vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                        <span className="text-gray-400 text-sm">No Image</span>
                      </div>
                    )}
                  </div>
                </div>

                <p className="max-w-4xl mx-auto text-black dark:text-white tracking-wide mb-24">
                  {project.title}
                </p>
              </Link>
            </div>
          ))}
        </div>
        {homepageProjects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Aucun projet sélectionné pour la page d'accueil
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
              Vérifiez la configuration HOMEPAGE_PROJECTS
            </p>
          </div>
        )}
        <div className="text-center mt-16">
          <Link
            href="/projects"
            className="inline-block border border-black dark:border-white px-6 py-3 text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-200"
          >
            Voir tous les projets
          </Link>
        </div>
      </div>
    </div>
  );
}
