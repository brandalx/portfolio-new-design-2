"use client";
import React, { useState, useEffect } from "react";
import ImageCard from "@/components/ImageCard"; // Adjust the import path as needed
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { BackButton } from "@/components/BackButton";
import unbounded from "@/lib/fonts";
import dynamic from "next/dynamic";
import { MODELS } from "../../../config";
import { ImageCard2 } from "@/components/ImageCard2";

type Project = {
  name: string;
  cover: string;
  category: string;
  subcategory: string;
};

type CombinedProject = Project & {
  isInteractive?: boolean;
  date?: string;
};

export default function DesignPage() {
  const [category, setCategory] = useState("All");
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [interactiveModels, setInteractiveModels] = useState<any[]>([]);
  const [design3DProjects, setDesign3DProjects] = useState<CombinedProject[]>(
    []
  );
  const [design2DProjects, setDesign2DProjects] = useState<CombinedProject[]>(
    []
  );

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

        // Extract unique subcategories from projects
        const uniqueSubcategories = new Set<string>();
        designProjects.forEach((project) => {
          uniqueSubcategories.add(project.subcategory);
        });

        // Set interactive models (from MODELS config)
        setInteractiveModels(MODELS);

        // Separate 3D and 2D projects
        const design3D = designProjects.filter(
          (project) =>
            project.subcategory === "design3d" ||
            project.subcategory === "3ddesign"
        );

        const design2D = designProjects.filter(
          (project) =>
            project.subcategory === "design2d" ||
            project.subcategory === "2ddesign"
        );

        setProjects(designProjects);
        setDesign3DProjects(design3D);
        setDesign2DProjects(design2D);
        setCategories(["All", ...Array.from(uniqueSubcategories)]);
      } catch (error) {
        console.error("Error fetching projects:", error);
        // Fallback: still set interactive models even if fetch fails
        setInteractiveModels(MODELS);
      }
    };

    fetchProjects();
  }, []);

  const handleCategoryClick = (item: string) => {
    setCategory(item);
  };

  // Map subcategory values to display names for UI
  const getDisplayName = (subcategory: string) => {
    if (subcategory === "All") return "All Designs";
    if (subcategory === "design2d" || subcategory === "2ddesign")
      return "2D Design";
    if (subcategory === "design3d" || subcategory === "3ddesign")
      return "3D Design";
    return subcategory.charAt(0).toUpperCase() + subcategory.slice(1);
  };

  const filteredProjects = projects.filter((project) => {
    if (category === "All") return true;
    return project.subcategory === category;
  });

  // Helper function to determine if we should show a section
  const shouldShowSection = (sectionCategory: string) => {
    return category === "All" || category === sectionCategory;
  };

  return (
    <MaxWidthWrapper>
      <div className="mt-2">
        <BackButton />
      </div>
      <section className="py-12 min-h-screen">
        <div className="mx-auto max-w-7xl-none px-4-none">
          <div className="text-center mb-8">
            <h1
              className={
                unbounded.className +
                " mt-2 lg:text-6xl text-4xl font-bold capitalize"
              }
            >
              Design Projects
            </h1>
            <p className="mt-2 dark:text-gray-200 text-gray-800 max-w-2xl mx-auto">
              Discover my design projects, crafted with creativity and precision
              to bring ideas to life.
            </p>
          </div>

          <div>
            <ul className="flex flex-wrap justify-start gap-4 mb-8 text-sm">
              {categories.map((item, id) => (
                <li
                  key={id}
                  onClick={() => handleCategoryClick(item)}
                  className={`cursor-pointer px-4 py-2 dark:bg-white/5 dark:hover:bg-white/10 bg-gray-100 text-black rounded-full hover:bg-gray-200 hover:text-black dark:text-white hover:border-black transition-all ${unbounded.className} ${
                    item === category ? "font-semibold underline" : ""
                  }`}
                >
                  {getDisplayName(item)}
                </li>
              ))}
            </ul>
          </div>

          {/* Interactive 3D Models Section - shows with 3D Design category */}
          {(category === "All" ||
            category === "design3d" ||
            category === "3ddesign") &&
            interactiveModels.length > 0 && (
              <div className="mb-16">
                <h2
                  className={`text-3xl md:text-4xl font-bold mb-1 md:flex items-center justify-between gap-x-4`}
                >
                  <div className={`${unbounded.className}`}>
                    Interactive 3D Models
                  </div>
                </h2>
                <p className="mb-6 text-gray-600 dark:text-gray-300">
                  Yes, you can interact with these! Drag, zoom, and explore.
                </p>
                <div className="grid mt-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {interactiveModels.map((model, index) => (
                    <ImageCard2 key={model.title || index} model={model} />
                  ))}
                </div>
              </div>
            )}

          {/* 3D Design and Animation Section - only show when relevant */}
          {(shouldShowSection("design3d") || shouldShowSection("3ddesign")) &&
            design3DProjects.length > 0 && (
              <div className="mb-16">
                <h2
                  className={`text-3xl md:text-4xl font-bold mb-1 md:flex items-center justify-between gap-x-4`}
                >
                  <div className={`${unbounded.className}`}>
                    3D Design and Animation
                  </div>
                </h2>
                <p className="mb-6 text-gray-600 dark:text-gray-300">
                  Immersive 3D designs, models, and animated experiences.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {design3DProjects.map((project, index) => (
                    <ImageCard
                      aspectRatio={16 / 12}
                      key={index}
                      src={project.cover}
                      title={project.name}
                      category={project.category}
                      subcategory={project.subcategory}
                      date={project.date}
                    />
                  ))}
                </div>
              </div>
            )}

          {/* 2D Design and Animation Section - only show when relevant */}
          {(shouldShowSection("design2d") || shouldShowSection("2ddesign")) &&
            design2DProjects.length > 0 && (
              <div className="mb-16">
                <h2
                  className={`text-3xl md:text-4xl font-bold mb-1 md:flex items-center justify-between gap-x-4`}
                >
                  <div className={`${unbounded.className}`}>
                    2D Design and Animation
                  </div>
                </h2>
                <p className="mb-6 text-gray-600 dark:text-gray-300">
                  Creative 2D graphics, illustrations, and motion design.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {design2DProjects.map((project, index) => (
                    <ImageCard
                      aspectRatio={16 / 12}
                      key={index}
                      src={project.cover}
                      title={project.name}
                      category={project.category}
                      subcategory={project.subcategory}
                      date={project.date}
                    />
                  ))}
                </div>
              </div>
            )}

          {/* Show message if no projects found */}
          {category !== "All" &&
            filteredProjects.length === 0 &&
            !(
              (category === "design3d" || category === "3ddesign") &&
              interactiveModels.length > 0
            ) &&
            !(
              category === "design2d" ||
              (category === "2ddesign" && design2DProjects.length > 0)
            ) && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  No projects found in this category.
                </p>
              </div>
            )}
        </div>
      </section>
    </MaxWidthWrapper>
  );
}
