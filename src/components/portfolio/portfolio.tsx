"use client";
import React, { useState, useEffect } from "react";
import unbounded from "@/lib/fonts";
import ImageCard from "../ImageCard";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";
import { IconChevronRight } from "@tabler/icons-react";
import { TextScrollDemo } from "../textscroll";
import Footer2 from "../footer2";
import { useMedia } from "react-use";
import MaxWidthWrapper from "../max-width-wrapper";

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

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_PROJECTS_CACHE_URL!);
        if (!res.ok) throw new Error("Failed to fetch projects");
        const allProjects: Project[] = await res.json();

        const uniqueCategories = new Set<string>();
        const uniqueSubcategories = new Set<string>();

        allProjects.forEach((project) => {
          uniqueCategories.add(project.category);
          uniqueSubcategories.add(`${project.category}/${project.subcategory}`);
        });

        setProjects(allProjects);
        setCategories(["All", ...Array.from(uniqueCategories)]);
        setSubcategories(["All", ...Array.from(uniqueSubcategories)]);
      } catch (error) {
        console.error("Error fetching projects:", error);
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
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
            Check out some of my design projects, meticulously crafted with love
            and dedication, each one reflecting the passion and soul I poured
            into every detail.
          </p>
        </div>
        <MaxWidthWrapper>
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
        </MaxWidthWrapper>
        <MaxWidthWrapper>
          {/* DESIGN PROJECTS */}
          {designProjects.length > 0 && (
            <div className="mb-16">
              <h2
                className={`text-3xl md:text-4xl font-bold mb-4  flex items-center justify-between gap-x-4`}
              >
                <span className={`${unbounded.className}`}>Design</span>
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
                {designProjects.map((project, index) => (
                  <ImageCard
                    key={index}
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

          {/* PHOTOGRAPHY PROJECTS */}
          {photoProjects.length > 0 && (
            <div>
              <h2
                className={`text-3xl md:text-4xl font-bold mb-4  flex items-center justify-between gap-x-4 `}
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
        </MaxWidthWrapper>
      </div>

      <div className="mt-20">
        <Footer2 />
      </div>
    </section>
  );
}
