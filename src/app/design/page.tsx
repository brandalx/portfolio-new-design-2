"use client";
import React, { useState, useEffect } from "react";
import ImageCard from "@/components/ImageCard";

type Project = {
  name: string;
  cover: string;
  category: string;
  subcategory: string;
};

export default function DesignPage() {
  const [category, setCategory] = useState("All");
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(
          process.env.NEXT_PUBLIC_PROJECTS_CACHE_URL || "/cache/projects.json"
        );
        if (!res.ok) throw new Error("Failed to fetch projects");
        const allProjects: Project[] = await res.json();
        // Filter for design category
        const designProjects = allProjects.filter(
          (project) => project.category === "design"
        );

        // Extract unique subcategories
        const uniqueSubcategories = new Set<string>();
        designProjects.forEach((project) => {
          uniqueSubcategories.add(project.subcategory);
        });

        setProjects(designProjects);
        setCategories(["All", ...Array.from(uniqueSubcategories)]);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const handleCategoryClick = (item: string) => {
    setCategory(item);
  };

  // Map subcategory values to display names
  const getDisplayName = (subcategory: string) => {
    if (subcategory === "All") return "All Designs";
    if (subcategory === "design2d") return "2D Design";
    if (subcategory === "design3d") return "3D Design";
    return subcategory.charAt(0).toUpperCase() + subcategory.slice(1); // Capitalize first letter for others
  };

  const filteredProjects = projects.filter((project) => {
    if (category === "All") return true;
    return project.subcategory === category;
  });

  return (
    <section className="py-12 min-h-screen">
      <div className="mx-auto max-w-7xl-none px-4-none">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Design Projects</h1>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
            Discover my design projects, crafted with creativity and precision
            to bring ideas to life.
          </p>
        </div>

        <div>
          <ul className="flex flex-wrap justify-start gap-4 mb-8 text-sm capitalize">
            {categories.map((item, id) => (
              <li
                key={id}
                onClick={() => handleCategoryClick(item)}
                className={`cursor-pointer px-4 py-2 rounded dark:bg-black dark:hover:bg-white/10 bg-black hover:bg-white border hover:border-black ${
                  item === category ? "font-semibold underline" : ""
                }`}
              >
                {getDisplayName(item)}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <ImageCard
              key={index}
              src={project.cover}
              title={project.name}
              category={project.category}
              subcategory={getDisplayName(project.subcategory)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
