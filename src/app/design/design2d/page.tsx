"use client";
import React, { useState, useEffect } from "react";
import ImageCard from "@/components/ImageCard"; // Adjust the import path as needed
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { BackButton } from "@/components/BackButton";
import unbounded from "@/lib/fonts";

type Project = {
  name: string;
  cover: string;
  category: string;
  subcategory: string;
};

export default function Design2DProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(
          process.env.NEXT_PUBLIC_PROJECTS_CACHE_URL || "/cache/projects.json"
        );
        if (!res.ok) throw new Error("Failed to fetch projects");
        const data = await res.json();
        const design2DProjects = data.filter(
          (project: Project) =>
            project.category === "design" && project.subcategory === "design2d"
        );
        setProjects(design2DProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <MaxWidthWrapper>
      <div className="mt-2">
        <BackButton />
      </div>
      <section className="py-12 min-h-screen">
        <div className="mx-auto max-w-7xl-none px-4-none">
          <div className="text-center mb-8">
            <h1 className="mt-2 lg:text-6xl text-4xl font-bold  capitalize">
              <span className={`${unbounded.className}`}>
                {" "}
                2D Design Projects{" "}
              </span>
            </h1>
            <p className="mt-2 dark:text-gray-200 text-gray-800  max-w-2xl mx-auto">
              Explore my 2D design projects, crafted with creativity and
              precision to bring ideas to life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.map((project, index) => (
              <ImageCard
                aspectRatio={16 / 12}
                key={index}
                src={project.cover}
                title={project.name}
                category={project.category}
                subcategory={"2D Design"}
              />
            ))}
          </div>
        </div>
      </section>
    </MaxWidthWrapper>
  );
}
