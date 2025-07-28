"use client";
import React, { useState, useEffect } from "react";
import ImageCard from "@/components/ImageCard";

type Project = {
  name: string;
  cover: string;
  category: string;
  subcategory: string;
};

export default function PhotographyPage() {
  const [category, setCategory] = useState("All");
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<string[]>([
    "All",
    "architecture",
    "portraits",
  ]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(
          process.env.NEXT_PUBLIC_PROJECTS_CACHE_URL || "/cache/projects.json"
        );
        if (!res.ok) throw new Error("Failed to fetch projects");
        const allProjects: Project[] = await res.json();
        // Filter for photography category
        const photographyProjects = allProjects.filter(
          (project) => project.category === "photography"
        );
        setProjects(photographyProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const handleCategoryClick = (item: string) => {
    setCategory(item);
  };

  const filteredProjects = projects.filter((project) => {
    if (category === "All") return true;
    return project.subcategory === category;
  });

  return (
    <section className="py-12 min-h-screen">
      <div className="mx-auto max-w-7xl-none px-4-none">
        <div className="text-center mb-8">
          <h1 className="mt-2 lg:text-6xl text-4xl font-bold glor-b capitalize">
            Photography Projects
          </h1>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
            Explore my photography projects, capturing the essence of
            architecture and portraits with passion and precision.
          </p>
        </div>

        <div>
          <ul className="flex flex-wrap justify-start gap-4 mb-8 text-sm capitalize">
            {categories.map((item, id) => (
              <li
                key={id}
                onClick={() => handleCategoryClick(item)}
                className={`cursor-pointer px-4 py-2  dark:bg-black dark:hover:bg-white/10 bg-black glor-l rounded-full hover:bg-white border hover:border-black ${
                  item === category ? "font-semibold underline" : ""
                }`}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProjects.map((project, index) => (
            <ImageCard
              key={index}
              src={project.cover}
              title={project.name}
              category={project.category}
              subcategory={project.subcategory}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
