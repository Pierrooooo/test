"use client";

import React from "react";
import { Project } from "../types";

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack }) => {
  return (
    <div className="project-detail">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors group"
        >
          <svg
            className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Retour aux projets
        </button>
      </div>

      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 dark:text-white">
          {project.title}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 italic">
          {project.category}
        </p>
        <p className="text-gray-500 dark:text-gray-500 mt-2">
          Année: {project.year}
        </p>
      </div>

      {project.assets.images && project.assets.images.length > 0 && (
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.assets.images.map((image, index) => (
              <div
                key={index}
                className={`relative overflow-hidden rounded-lg ${
                  index === 0 ? "md:col-span-2" : ""
                }`}
              >
                <img
                  src={`/images/${image}`}
                  alt={`${project.title} - Image ${index + 1}`}
                  className="w-full h-auto object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h3 className="text-2xl font-semibold mb-4 dark:text-white">
            Description
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
            {project.description}
          </p>
        </div>

        <div className="space-y-6">
          {project.infos && project.infos.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold mb-3 dark:text-white">
                Infos
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.infos.map((material, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 px-3 py-2 rounded-full text-sm font-medium border border-gray-200 dark:border-gray-700"
                  >
                    {material}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
