"use client";

import React from "react";
import Link from "next/link";
import { ProjectsData } from "../types";
import Image from "next/image";

export default function ProjectsPage() {
  const [projectsData, setProjectsData] = React.useState<ProjectsData | null>(
    null
  );
  const [selectedYear, setSelectedYear] = React.useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(
    null
  );

  React.useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await import("../data/projects.json");
        setProjectsData(data.default);
      } catch (error) {
        console.error("Error loading projects:", error);
      }
    };
    loadProjects();
  }, []);

  const years = React.useMemo(() => {
    if (!projectsData) return [];
    const allYears = projectsData.projects.map((project) => project.year);
    return Array.from(new Set(allYears)).sort((a, b) => b - a);
  }, [projectsData]);

  const categories = React.useMemo(() => {
    if (!projectsData) return [];
    const allCategories = projectsData.projects.map(
      (project) => project.category
    );
    return Array.from(new Set(allCategories)).sort();
  }, [projectsData]);

  const filteredProjects = React.useMemo(() => {
    if (!projectsData) return [];

    return projectsData.projects.filter((project) => {
      const yearMatch = selectedYear === null || project.year === selectedYear;
      const categoryMatch =
        selectedCategory === null || project.category === selectedCategory;
      return yearMatch && categoryMatch;
    });
  }, [projectsData, selectedYear, selectedCategory]);

  const handleYearClick = (year: number) => {
    setSelectedYear(selectedYear === year ? null : year);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  const clearFilters = () => {
    setSelectedYear(null);
    setSelectedCategory(null);
  };

  if (!projectsData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Chargement...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black py-12 px-4 sm:pt-24">
      <div className="max-w-6xl mx-auto md:mt-20 lg:mt-40">
        <div className="my-8">
          <div className="flex flex-wrap gap-x-4 mb-4">
            <button
              onClick={clearFilters}
              className={`${
                selectedYear === null && selectedCategory === null
                  ? "text-black dark:text-white"
                  : "text-gray-500 dark:text-gray-400"
              } cursor-pointer hover:text-black dark:hover:text-white transition-colors`}
            >
              <h1>Projets</h1>
            </button>
            {years.map((year) => (
              <button
                key={year}
                onClick={() => handleYearClick(year)}
                className={`py-1 rounded-full border-none cursor-pointer transition-colors ${
                  selectedYear === year
                    ? "text-black dark:text-white"
                    : "text-gray-600 hover:text-black dark:hover:text-white"
                }`}
              >
                {year}
              </button>
            ))}

            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`py-1 rounded-full border-none cursor-pointer transition-colors ${
                  selectedCategory === category
                    ? "text-black dark:text-white"
                    : "text-gray-600 hover:text-black dark:hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-4 mt-10">
          {filteredProjects.map((project, index) => (
            <Link
              key={index}
              href={`/projects/${index}`}
              className="group block"
            >
              <div className="relative w-full h-64 overflow-hidden border border-black dark:border-white">
                {project.assets.images && project.assets.images.length > 0 ? (
                  <Image
                    src={`/assets/images/${project.assets.images[0]}`}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <span className="text-gray-400 text-xs">No Image</span>
                  </div>
                )}
              </div>

              <h2 className="mt-1 text-sm font-medium dark:text-white">
                {project.title}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
