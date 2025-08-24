"use client";
import React, { useState, useEffect } from "react";
import unbounded from "@/lib/fonts";
import ImageCard from "../ImageCard";
import { ImageCard2 } from "../ImageCard2"; // Import the enhanced card
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";
import { IconChevronRight } from "@tabler/icons-react";
import { TextScrollDemo } from "../textscroll";
import Footer2 from "../footer2";
import { useMedia } from "react-use";
import MaxWidthWrapper from "../max-width-wrapper";
import StackingCards from "../StackingCard";
import { MODELS } from "../../../config";

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
  images?: { secure_url: string; public_id: string; asset_id: string }[];
};

export default function Portfolio({ className }: { className?: string }) {
  const [category, setCategory] = useState("All");
  const [subcategory, setSubcategory] = useState("All");
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const [interactiveModels, setInteractiveModels] = useState<any[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const cacheBust = new Date().getTime();
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_PROJECTS_CACHE_URL || "/cache/projects.json"}?v=${cacheBust}`,
          { cache: "no-cache" }
        );
        if (!res.ok) throw new Error("Failed to fetch projects");
        const allProjects: Project[] = await res.json();

        const uniqueCategories = new Set<string>();
        const uniqueSubcategories = new Set<string>();

        allProjects.forEach((project) => {
          uniqueCategories.add(project.category);
          uniqueSubcategories.add(`${project.category}/${project.subcategory}`);
        });

        // Set interactive models from MODELS config
        setInteractiveModels(MODELS);

        setProjects(allProjects);
        setCategories(["All", ...Array.from(uniqueCategories)]);
        setSubcategories(["All", ...Array.from(uniqueSubcategories)]);
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
    setSubcategory("All");
  };

  const handleSubcategoryClick = (item: string) => {
    setSubcategory(item);
  };

  const filteredProjects = projects.filter((project) => {
    if (category === "All" && subcategory === "All") return true;
    if (category !== "All" && subcategory === "All")
      return project.category === category;
    return `${project.category}/${project.subcategory}` === subcategory;
  });

  const designProjects = filteredProjects.filter(
    (p) => p.category.toLowerCase() === "design"
  );
  const photoProjects = filteredProjects.filter(
    (p) => p.category.toLowerCase() === "photography"
  );

  const isMobile = useMedia("(max-width: 768px)", false);

  // Show interactive models when "All" is selected or when no specific category filters are applied
  const shouldShowInteractiveModels =
    category === "All" && subcategory === "All";

  return (
    <section id="portfolio" className={`py-[120px] ${className}`}>
      <div className="mx-auto max-w-7xl-none px-4-none">
        <div className="text-center mb-8">
          <h2
            className={cn(
              unbounded.className,
              "lg:text-6xl text-4xl font-bold glor-b capitalize text-center "
            )}
          >
            {!isMobile ? <TextScrollDemo /> : <span> WORKS & PROJECTS</span>}
          </h2>
          <p className="mt-2 dark:text-gray-200 text-gray-800  max-w-2xl mx-auto">
            Check out some of my design projects, meticulously crafted with love
            and dedication, each one reflecting the passion and soul I poured
            into every detail.
          </p>
        </div>

        <div>
          <ul className="flex flex-wrap justify-start gap-4 mb-4 text-sm capitalize">
            {categories.map((item, id) => (
              <li
                key={id}
                onClick={() => handleCategoryClick(item)}
                className={`cursor-pointer px-4 py-2  dark:bg-white/5 dark:hover:bg-white/10 bg-gray-100 text-black glor-l rounded-full hover:bg-gray-200 hover:text-black  dark:text-white hover:border-black transition-all  ${
                  item === category ? " font-semibold underline" : ""
                }`}
              >
                {item}
              </li>
            ))}
          </ul>
          {category !== "All" && (
            <ul className="flex flex-wrap justify-start gap-4 mb-4 text-sm capitalize">
              {subcategories
                .filter(
                  (sub) => sub === "All" || sub.startsWith(`${category}/`)
                )
                .map((item, id) => (
                  <li
                    key={id}
                    onClick={() => handleSubcategoryClick(item)}
                    className={`cursor-pointer px-4 py-2  dark:bg-white/5 dark:hover:bg-white/10 bg-gray-100 text-black glor-l rounded-full hover:bg-gray-200 hover:text-black  dark:text-white hover:border-black transition-all  ${
                      item === subcategory ? " font-semibold underline" : ""
                    }`}
                  >
                    {item === "All" ? "All" : item.split("/")[1]}
                  </li>
                ))}
            </ul>
          )}
        </div>

        {/* DESIGN PROJECTS - Separated by subcategory */}
        {designProjects.length > 0 && (
          <>
            {/* 2D DESIGN SECTION - First */}
            {designProjects.filter(
              (p) =>
                p.subcategory === "design2d" || p.subcategory === "2ddesign"
            ).length > 0 && (
              <div className="mb-16">
                <h2
                  className={`text-3xl md:text-4xl font-bold mb-4  md:flex items-center justify-between gap-x-4`}
                >
                  <div className={`${unbounded.className}`}>
                    2D Design & Animation
                  </div>
                  <Link href="/design">
                    <Button
                      variant={"ghost"}
                      className="  border cursor-pointer   text-white transition-all  bg-black rounded-full "
                    >
                      See all 2D design <IconChevronRight />
                    </Button>
                  </Link>
                </h2>
                <p className="mb-6 text-gray-600 dark:text-gray-300 text-sm">
                  Creative 2D graphics, illustrations, and motion design.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                  {designProjects
                    .filter(
                      (p) =>
                        p.subcategory === "design2d" ||
                        p.subcategory === "2ddesign"
                    )
                    .map((project, index) => (
                      <ImageCard
                        key={index}
                        date={project.date}
                        category={project.category}
                        subcategory={project.subcategory}
                        src={project.cover}
                        title={project.name}
                        aspectRatio={16 / 12}
                      />
                    ))}
                </div>
              </div>
            )}

            {/* INTERACTIVE 3D MODELS - Second, alongside 3D design */}
            {(shouldShowInteractiveModels ||
              (category === "design" &&
                subcategory !== "design/design2d" &&
                subcategory !== "design/2ddesign") ||
              designProjects.filter(
                (p) =>
                  p.subcategory === "design3d" || p.subcategory === "3ddesign"
              ).length > 0) &&
              interactiveModels.length > 0 &&
              subcategory !== "design/design2d" &&
              subcategory !== "design/2ddesign" && (
                <div className="mb-16">
                  <h2
                    className={`text-3xl md:text-4xl font-bold mb-4  md:flex items-center justify-between gap-x-4`}
                  >
                    <div className={`${unbounded.className}`}>
                      Interactive 3D Models
                    </div>
                    <Link href="/design">
                      <Button
                        variant={"ghost"}
                        className="  border cursor-pointer   text-white transition-all  bg-black rounded-full "
                      >
                        Explore all models <IconChevronRight />
                      </Button>
                    </Link>
                  </h2>
                  <p className="mb-6 text-gray-600 dark:text-gray-300 text-sm">
                    Yes, you can interact with these! Drag, zoom, and explore in
                    real-time.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {interactiveModels.slice(0, 6).map((model, index) => (
                      <ImageCard2 key={model.title || index} model={model} />
                    ))}
                  </div>
                </div>
              )}

            {/* 3D DESIGN SECTION - Third, after interactive models */}
            {designProjects.filter(
              (p) =>
                p.subcategory === "design3d" || p.subcategory === "3ddesign"
            ).length > 0 && (
              <div className="mb-16">
                <h2
                  className={`text-3xl md:text-4xl font-bold mb-4  md:flex items-center justify-between gap-x-4`}
                >
                  <div className={`${unbounded.className}`}>
                    3D Design & Animation
                  </div>
                  <Link href="/design">
                    <Button
                      variant={"ghost"}
                      className="  border cursor-pointer   text-white transition-all  bg-black rounded-full "
                    >
                      See all 3D design <IconChevronRight />
                    </Button>
                  </Link>
                </h2>
                <p className="mb-6 text-gray-600 dark:text-gray-300 text-sm">
                  Immersive 3D designs, models, and animated experiences.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                  {designProjects
                    .filter(
                      (p) =>
                        p.subcategory === "design3d" ||
                        p.subcategory === "3ddesign"
                    )
                    .map((project, index) => (
                      <ImageCard
                        key={index}
                        date={project.date}
                        category={project.category}
                        subcategory={project.subcategory}
                        src={project.cover}
                        title={project.name}
                        aspectRatio={16 / 12}
                      />
                    ))}
                </div>
              </div>
            )}

            {/* OTHER DESIGN PROJECTS - For any other design subcategories */}
            {designProjects.filter(
              (p) =>
                p.subcategory !== "design2d" &&
                p.subcategory !== "2ddesign" &&
                p.subcategory !== "design3d" &&
                p.subcategory !== "3ddesign"
            ).length > 0 && (
              <div className="mb-16">
                <h2
                  className={`text-3xl md:text-4xl font-bold mb-4  md:flex items-center justify-between gap-x-4`}
                >
                  <div className={`${unbounded.className}`}>
                    Other Design Projects
                  </div>
                  <Link href="/design">
                    <Button
                      variant={"ghost"}
                      className="  border cursor-pointer   text-white transition-all  bg-black rounded-full "
                    >
                      See all design <IconChevronRight />
                    </Button>
                  </Link>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                  {designProjects
                    .filter(
                      (p) =>
                        p.subcategory !== "design2d" &&
                        p.subcategory !== "2ddesign" &&
                        p.subcategory !== "design3d" &&
                        p.subcategory !== "3ddesign"
                    )
                    .map((project, index) => (
                      <ImageCard
                        key={index}
                        date={project.date}
                        category={project.category}
                        subcategory={project.subcategory}
                        src={project.cover}
                        title={project.name}
                        aspectRatio={16 / 12}
                      />
                    ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* PHOTOGRAPHY PROJECTS */}
        {photoProjects.length > 0 && (
          <div className="mb-16">
            <h2
              className={`text-3xl md:text-4xl font-bold mb-4  md:flex items-center justify-between gap-x-4 `}
            >
              <span className={`${unbounded.className}`}> Photography</span>
              <Link href="/photography">
                <Button
                  variant={"ghost"}
                  className="  border cursor-pointer   text-white transition-all  bg-black rounded-full "
                >
                  See all photos <IconChevronRight />
                </Button>
              </Link>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
              {photoProjects.map((project, index) => (
                <ImageCard
                  key={index}
                  category={project.category}
                  subcategory={project.subcategory}
                  src={project.cover}
                  title={project.name}
                  aspectRatio={3 / 4}
                />
              ))}
            </div>
          </div>
        )}

        {/* Show message if no projects found */}
        {!shouldShowInteractiveModels && filteredProjects.length === 0 && (
          <div className="text-center py-12 mb-16">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No projects found in this category.
            </p>
          </div>
        )}
      </div>

      <div className="mt-20 mb-20">
        <div>
          <h2 className={`text-3xl md:text-4xl font-bold mb-4    gap-x-4 `}>
            <span className={`${unbounded.className}`}> Featured</span>
          </h2>
        </div>
        <StackingCards />
      </div>
      <div className="mt-20 pt-20">
        <Footer2 />
      </div>
    </section>
  );
}
