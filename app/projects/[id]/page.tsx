"use client";

import React from "react";
import { gsap } from "gsap";
import { useParams, useRouter } from "next/navigation";
import { ProjectsData, Project } from "../../types";
import Link from "next/link";
import Reusable3DModelCanvas from "../../components/3DModel";

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = React.useState<Project | null>(null);
  const [projectsData, setProjectsData] = React.useState<ProjectsData | null>(
    null
  );
  
  const titleRef = React.useRef(null);
  const categoryYearRef = React.useRef(null);
  const detailsTitlesContainerRef = React.useRef<HTMLDivElement | null>(null);
  const detailsValuesContainerRef = React.useRef<HTMLDivElement | null>(null);
  const mainImageRef = React.useRef(null);

  React.useEffect(() => {
    if (!project) return;

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
    });

    tl.fromTo(
      titleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 }
    )
      .fromTo(
        categoryYearRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.6"
      )
      // Tous les titres en même temps
      .fromTo(
        detailsTitlesContainerRef.current?.querySelectorAll('.detail-title') || [],
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.4"
      )
      // Les valeurs avec stagger
      .fromTo(
        detailsValuesContainerRef.current?.querySelectorAll('.detail-value') || [],
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.15 },
        "-=0.4"
      )
      .fromTo(
        mainImageRef.current,
        { y: "50%", scaleY: 0.6, scaleX: 0.8, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 1.2 },
        "-=1"
      );

    return () => {
      tl.kill();
    };
  }, [project]);

  React.useEffect(() => {
    const loadProject = async () => {
      try {
        const data = await import("../../data/projects.json");
        setProjectsData(data.default);

        const projectId = parseInt(params.id as string);

        if (data.default?.projects?.[projectId]) {
          setProject(data.default.projects[projectId]);
        } else {
          console.error("Project not found:", projectId);
          router.push("/projects");
        }
      } catch (e) {
        console.error("Failed to load project data:", e);
        router.push("/projects");
      }
    };

    if (params.id) {
      loadProject();
    }
  }, [params.id, router]);

  if (!project || !projectsData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Chargement…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black px-6 pt-24">
      <div className="max-w-6xl mx-auto md:mt-20 lg:mt-40">
        <div className="mb-16">
          {project.title?.trim() && (
            <h1
              ref={titleRef}
              style={{ opacity: 0 }}
              className="text-3xl md:text-4xl font-medium dark:text-white mb-4"
            >
              {project.title}
            </h1>
          )}
          {project.category?.trim() && String(project.year ?? "").trim() && (
            <p
              ref={categoryYearRef}
              style={{ opacity: 0 }}
              className="text-gray-600 dark:text-gray-400 mt-3 text-sm"
            >
              {project.category} — {project.year}
            </p>
          )}
        </div>

        <div className="mb-12" ref={detailsValuesContainerRef}>
          <div 
            ref={detailsTitlesContainerRef}
            className="flex flex-row justify-between w-full space-y-2 text-gray-700 dark:text-gray-300"
          >
            <div className="font-semibold text-gray-900 dark:text-white">
              {project.category?.trim() && (
                <>
                  <span className="uppercase text-sm detail-title" style={{ opacity: 0 }}>
                    Catégorie :
                  </span>{" "}
                  <br></br>{" "}
                  <span className="mt-2 text-sm detail-value" style={{ opacity: 0 }}>
                    {project.category}
                  </span>
                </>
              )}
            </div>
            <div className="font-semibold text-gray-900 dark:text-white">
              {String(project.year ?? "").trim() && (
                <>
                  <span className="uppercase text-sm detail-title" style={{ opacity: 0 }}>
                    Année :
                  </span>{" "}
                  <br></br>{" "}
                  <span className="mt-2 text-sm detail-value" style={{ opacity: 0 }}>
                    {project.year}
                  </span>
                </>
              )}
            </div>
            <div className="font-semibold text-gray-900 dark:text-white">
              {project.infos?.length > 0 && (
                <div>
                  <span className="uppercase text-sm detail-title" style={{ opacity: 0 }}>
                    Infos :
                  </span>
                  <ul className="mt-2 text-sm">
                    {project.infos.map((m: string, i: number) => (
                      <li key={i} className="detail-value" style={{ opacity: 0 }}>
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {project.assets.images?.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div
            className="md:col-span-2"
            ref={mainImageRef}
            style={{ opacity: 0 }}
          >
            <img
              src={`/assets/images/${project.assets.images[0]}`}
              alt={`${project.title} - Image principale`}
              className="w-full h-auto object-cover"
            />
          </div>
          {project.assets.images.map((image: string, i: number) =>
            i === 0 ? null : (
              <div key={i}>
                <img
                  src={`/assets/images/${image}`}
                  alt={`${project.title} – Image ${i + 1}`}
                  className="w-full h-auto object-cover"
                />
              </div>
            )
          )}
        </div>
      )}

      {project.description.trim() && (
        <div className="md:col-span-2 max-w-3xl mx-auto my-30">
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-line">
            {project.description}
          </p>
        </div>
      )}

      {project.Model3D?.trim() && (
        <Reusable3DModelCanvas file={`/assets/models${project.Model3D}`} />
      )}

      <div className="flex justify-between text-sm mt-20 py-6">
        <div className="max-w-6xl w-full mx-auto flex flex-row justify-between">
          <button
            disabled={parseInt(params.id as string) === 0}
            onClick={() => {
              const prev = parseInt(params.id as string) - 1;
              if (prev >= 0) router.push(`/projects/${prev}`);
            }}
            className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white disabled:opacity-0 hover:cursor-pointer disabled:cursor-default transition-colors"
          >
            ← Projet précédent
          </button>

          <Link
            href="/projects"
            className="text-gray-600 hover:text-black dark:hover:text-white hover:cursor-pointer transition-colors"
          >
            Voir tous les projets
          </Link>

          <button
            disabled={
              parseInt(params.id as string) === projectsData.projects.length - 1
            }
            onClick={() => {
              const next = parseInt(params.id as string) + 1;
              if (next < projectsData.projects.length)
                router.push(`/projects/${next}`);
            }}
            className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white disabled:opacity-0 hover:cursor-pointer disabled:cursor-default transition-colors"
          >
            Projet suivant →
          </button>
        </div>
      </div>
    </div>
  );
}