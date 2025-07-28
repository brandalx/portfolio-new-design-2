"use client";
import React, { useState, useEffect } from "react";
import ImageCard from "@/components/ImageCard"; // Adjust the import path as needed

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
            project.category === "design" && project.subcategory === "design3d"
        );
        setProjects(design2DProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className="py-12 min-h-screen">
      <div className="mx-auto max-w-7xl-none px-4-none">
        <div className="text-center mb-8">
          <h1 className="mt-2 lg:text-6xl text-4xl font-bold glor-b capitalize">
            3D Design Projects
          </h1>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
            Explore my 3D design projects, crafted with creativity and precision
            to bring ideas to life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <ImageCard
              key={index}
              src={project.cover}
              title={project.name}
              category={project.category}
              subcategory={"3D Design"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
