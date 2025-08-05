"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import unbounded from "@/lib/fonts";

type ProjectImage = {
  secure_url: string;
  public_id: string;
  asset_id: string;
};

type Project = {
  name: string;
  cover: string;
  category: string;
  subcategory: string;
  title?: string;
  description?: string;
  link?: string;
  description2?: string;
  description3?: string;
  description4?: string;
  client?: string;
  date?: string;
  software?: string;
  type?: string;
  images?: ProjectImage[];
};

interface FeaturedProjectsProps {
  currentCategory: string;
  currentProject: string;
  maxItems?: number;
}

const ProjectCard = React.memo(({ project }: { project: Project }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => setImageLoaded(true);
  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  return (
    <Link
      href={`/${project.category}/${project.subcategory}/${project.name}`}
      className="group block"
    >
      <div className="relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
        {!imageLoaded && (
          <Skeleton className="w-full h-64 md:h-80 rounded-lg" />
        )}

        {!imageError ? (
          <img
            src={project.cover}
            alt={project.description || project.name}
            className={cn(
              "w-full h-64 md:h-80 object-cover transition-all duration-300 group-hover:scale-105",
              imageLoaded ? "opacity-100" : "opacity-0 absolute inset-0"
            )}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-64 md:h-80 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <div className="text-gray-500 dark:text-gray-400 text-center">
              <div className="w-12 h-12 mx-auto mb-2 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <span className="text-sm">Failed to load image</span>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 space-y-2">
        <p className="text-sm text-gray-500 uppercase tracking-wide">
          {project.subcategory}
        </p>
        <h3
          className={cn(
            unbounded.className,
            "text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200"
          )}
        >
          {project.description || project.name}
        </h3>
        {project.client && (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {project.client}
          </p>
        )}
      </div>
    </Link>
  );
});

ProjectCard.displayName = "ProjectCard";

const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({
  currentCategory,
  currentProject,
  maxItems = 4,
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const featuredProjects = useMemo(() => {
    // Filter projects from the same category, excluding the current project
    const filteredProjects = projects.filter(
      (project) =>
        project.category.toLowerCase() === currentCategory.toLowerCase() &&
        project.name !== currentProject
    );

    // Shuffle the array and take the first maxItems
    const shuffled = [...filteredProjects].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, maxItems);
  }, [projects, currentCategory, currentProject, maxItems]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const cacheBust = new Date().getTime();
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_PROJECTS_CACHE_URL || "/cache/projects.json"}?v=${cacheBust}`,
          { cache: "no-cache" }
        );

        if (!res.ok) {
          throw new Error(`Failed to fetch projects: ${res.status}`);
        }

        const data: Project[] = await res.json();
        setProjects(data);
      } catch (err) {
        console.error("Error fetching featured projects:", err);
        setError("Failed to load featured projects");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (isLoading) {
    return (
      <div className="mt-20 border-t pt-16">
        <div className="text-center mb-12">
          <Skeleton className="h-8 w-64 mx-auto mb-2" />
          <Skeleton className="h-4 w-96 mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Array.from({ length: maxItems }).map((_, index) => (
            <div key={index} className="space-y-4">
              <Skeleton className="w-full h-64 md:h-80 rounded-lg" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || featuredProjects.length === 0) {
    return null; // Don't show anything if there's an error or no featured projects
  }

  return (
    <div className="mt-20 border-t pt-16">
      <div className="text-center mb-12">
        <h2
          className={cn(
            unbounded.className,
            "text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4"
          )}
        >
          More in {currentCategory}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Explore other projects from the {currentCategory.toLowerCase()}{" "}
          category
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {featuredProjects.map((project, index) => (
          <ProjectCard
            key={`${project.category}-${project.subcategory}-${project.name}-${index}`}
            project={project}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProjects;
