"use client";
import React, { useState, useEffect } from "react";
import ImageCard from "@/components/ImageCard";
import ImageTrail from "@/components/imageTrail";

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
    <section className="py-12  mt-5 md:mt-10">
      {/* Hero Section Container */}
      <div className=" w-full h- bg-transparent">
        {/* ImageTrail Component */}
        <div className="relative   md:h-[300px]">
          <ImageTrail
            items={[
              "https://picsum.photos/id/287/300/300",
              "https://picsum.photos/id/1001/300/300",
              "https://picsum.photos/id/1025/300/300",
              "https://picsum.photos/id/1026/300/300",
              "https://picsum.photos/id/1027/300/300",
              "https://picsum.photos/id/1028/300/300",
              "https://picsum.photos/id/1029/300/300",
              "https://picsum.photos/id/1030/300/300",
            ]}
            variant={1}
          />

          {/* Hero Text */}
          <div className="mx-auto max-w-7xl px-4 text-center mb-8 relative z-[50]">
            <h1 className="mt-2 lg:text-6xl text-4xl font-bold glor-b capitalize">
              Photography Projects
            </h1>
            <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
              Explore my photography projects, capturing the essence of
              architecture and portraits with passion and precision.
            </p>
          </div>
        </div>

        <div>
          <ul className="flex flex-wrap justify-start gap-4 mb-8 text-sm capitalize">
            {categories.map((item, id) => (
              <li
                key={id}
                onClick={() => handleCategoryClick(item)}
                className={`cursor-pointer px-4 py-2  dark:bg-white/5 dark:hover:bg-white/10 bg-gray-100 text-black glor-l rounded-full hover:bg-gray-200 hover:text-black  dark:text-white hover:border-black transition-all   ${
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
