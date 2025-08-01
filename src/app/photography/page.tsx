"use client";
import React, { useState, useEffect } from "react";
import ImageCard from "@/components/ImageCard";
import ImageTrail from "@/components/imageTrail";
import MaxWidthWrapper from "@/components/max-width-wrapper";

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
      <div
        className="min-h-screen opacity-75 absolute w-full z-[-1] pointer-events-none"
        style={{
          backgroundColor: "var(--bg-base)",
          WebkitMaskImage: `
      linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)
    `,
          maskImage: `
      linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)
    `,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskSize: "100% 100%",
          maskSize: "100% 100%",
        }}
      >
        {/* Sphere Grid Background with fade top and bottom */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "var(--bg-base)",
            backgroundImage: `
        linear-gradient(to right, var(--grid-line) 1px, transparent 1px),
        linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px),
        radial-gradient(circle at 50% 50%, var(--glow) 0%, transparent 70%)
      `,
            backgroundSize: "32px 32px, 32px 32px, 100% 100%",
            WebkitMaskImage: `
        linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)
      `,
            maskImage: `
        linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)
      `,
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskSize: "100% 100%",
            maskSize: "100% 100%",
          }}
        />
      </div>{" "}
      <MaxWidthWrapper>
        {/* Hero Section Container */}
        <div className=" w-full h- bg-transparent">
          {/* ImageTrail Component */}
          <div className="relative   md:h-[300px]">
            <ImageTrail
              items={[
                "/assets/cursor/18.webp",
                "/assets/cursor/27.webp",
                "/assets/cursor/9.webp",
                "/assets/cursor/5.webp",
                "/assets/cursor/11.webp",
                "/assets/cursor/15.webp",
                "/assets/cursor/1.webp",
                "/assets/cursor/22.webp",
                "/assets/cursor/3.webp",
                "/assets/cursor/29.webp",
                "/assets/cursor/14.webp",
                "/assets/cursor/13.webp",
                "/assets/cursor/30.webp",
                "/assets/cursor/6.webp",
                "/assets/cursor/17.webp",
                "/assets/cursor/23.webp",
                "/assets/cursor/19.webp",
                "/assets/cursor/2.webp",
                "/assets/cursor/21.webp",
                "/assets/cursor/25.webp",
                "/assets/cursor/26.webp",
                "/assets/cursor/20.webp",
                "/assets/cursor/10.webp",
                "/assets/cursor/12.webp",
                "/assets/cursor/24.webp",
                "/assets/cursor/16.webp",
                "/assets/cursor/7.webp",
                "/assets/cursor/28.webp",
                "/assets/cursor/4.webp",
                "/assets/cursor/8.webp",
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
      </MaxWidthWrapper>
    </section>
  );
}
