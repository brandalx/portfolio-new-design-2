"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { RiArrowRightUpLine } from "@remixicon/react";

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

  return (
    <section id="portfolio" className={`py-12 ${className}`}>
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">Works & Projects</h2>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
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
                className={`cursor-pointer px-4 py-2 rounded hover:bg-gray-100 ${
                  item === category ? "bg-gray-200 font-semibold" : ""
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
                    className={`cursor-pointer px-4 py-2 rounded hover:bg-gray-100 ${
                      item === subcategory ? "bg-gray-200 font-semibold" : ""
                    }`}
                  >
                    {item === "All" ? "All" : item.split("/")[1]}
                  </li>
                ))}
            </ul>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <Card
              key={index}
              id={index}
              category={project.category}
              subcategory={project.subcategory}
              src={project.cover}
              title={project.name}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const Card = ({
  category,
  subcategory,
  title,
  src,
  id,
}: {
  category: string;
  subcategory: string;
  title: string;
  src: string;
  id: number;
}) => {
  return (
    <div className="relative">
      <div className="overflow-hidden rounded-lg">
        <img
          width={383}
          height={249}
          sizes="100vw"
          className="w-full h-auto object-cover"
          src={src}
          alt={title}
        />
        <Link
          href={`/${category}/${subcategory}/${title}`}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow hover:bg-gray-100"
        >
          <RiArrowRightUpLine className="w-6 h-6" />
        </Link>
      </div>
      <div className="mt-4">
        <span className="text-sm text-gray-500">{subcategory}</span>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
    </div>
  );
};
