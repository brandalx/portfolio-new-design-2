"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import useScrollDown from "@/hooks/useScrollDown";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { v4 as uuidv4 } from "uuid";
import AOSInit from "@/components/AOSInit";
import { Skeleton } from "@/components/ui/skeleton";

type ProjectImage = {
  secure_url: string;
  public_id: string;
  asset_id: string;
};

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
  images?: ProjectImage[];
};

const SingleProject = () => {
  const { project } = useParams() as { project: string };
  const pathname = usePathname();
  const [projectData, setProjectData] = useState<Project | null>(null);
  const [images, setImages] = useState<ProjectImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const imagesPerPage = 12;

  const photos = images.map((img) => ({
    src: `${img.secure_url}?f_auto,q_auto,w_1200,h_1200`,
    alt: img.public_id,
    width: 1200,
    height: 1200,
  }));

  useEffect(() => {
    const fetchProject = async () => {
      if (!project || !pathname) {
        setError("Missing project or pathname");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const res = await fetch(
          process.env.NEXT_PUBLIC_PROJECTS_CACHE_URL || "/cache/projects.json",
          { cache: "no-store" }
        );
        if (!res.ok)
          throw new Error(`Failed to fetch cached projects: ${res.status}`);
        const data: Project[] = await res.json();
        const projectInfo = data.find(
          (p) =>
            p.name === project &&
            p.category === pathname.split("/")[1] &&
            p.subcategory === pathname.split("/")[2]
        );
        if (!projectInfo) throw new Error("Project not found");
        setProjectData(projectInfo);
        setImages(projectInfo.images?.slice(0, imagesPerPage) || []);
      } catch (err) {
        //@ts-expect-error - no error
        console.error("Error fetching project:", err.message);
        setError("Failed to load project data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [project, pathname]);

  useScrollDown(
    () => {
      if (projectData && images.length < projectData.images!.length) {
        const nextImages = projectData.images!.slice(
          images.length,
          images.length + imagesPerPage
        );
        setImages((prev) => [...prev, ...nextImages]);
        setCurrentPage((prev) => prev + 1);
      }
    },
    isLoading,
    projectData ? images.length < projectData.images!.length : false
  );

  if (isLoading || error || !projectData) {
    return (
      <div>
        <AOSInit />
        <div className="mx-auto max-w-7xl-none px-4-none py-8 text-center">
          <Skeleton className="h-6 w-32 mx-auto mb-2" />
          <Skeleton className="h-10 w-64 mx-auto" />
        </div>

        <div className="mx-auto max-w-7xl-none px-4-none">
          <Skeleton className="w-full h-[500px] md:h-[600px] lg:h-[700px]" />
        </div>

        <div className="mx-auto max-w-7xl-none px-4-none py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
              {[...Array(5)].map((_, index) => (
                <div key={index}>
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-6 w-40" />
                </div>
              ))}
            </div>

            <div className="lg:col-span-2">
              <Skeleton className="h-8 w-48 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            {[...Array(6)].map((_, index) => (
              <Skeleton
                key={index}
                className="w-full h-[300px] md:h-[400px] lg:h-[500px]"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const category = pathname?.split("/")[1]?.toUpperCase() || "CATEGORY";

  return (
    <div>
      <div className="mx-auto max-w-7xl-none px-4-none py-8 text-center">
        <p className="text-sm text-gray-500">{category}</p>
        <h1 className="mt-2 text-4xl font-bold">
          {projectData.title || projectData.name || "Untitled Project"}
        </h1>
      </div>

      {projectData.cover && (
        <div className="mx-auto max-w-7xl-none px-4-none">
          <img
            src={`${projectData.cover}?f_auto,q_auto,w_1095,h_1072`}
            alt={projectData.name}
            className="w-full h-auto"
          />
        </div>
      )}

      <div className="mx-auto max-w-7xl-none px-4-none py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-500">Client</p>
                <h3 className="text-lg font-semibold">
                  {projectData.client || "Not specified"}
                </h3>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <h3 className="text-lg font-semibold">
                  {projectData.date || "Not specified"}
                </h3>
              </div>
              <div>
                <p className="text-sm text-gray-500">Software</p>
                <h3 className="text-lg font-semibold">
                  {projectData.software || "Not specified"}
                </h3>
              </div>
              <div>
                <p className="text-sm text-gray-500">Type</p>
                <h3 className="text-lg font-semibold">
                  {projectData.type || "Not specified"}
                </h3>
              </div>
              {projectData.link && (
                <div>
                  <p className="text-sm text-gray-500">Link</p>
                  <h3 className="text-lg font-semibold">
                    <a
                      href={projectData.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {projectData.link}
                    </a>
                  </h3>
                </div>
              )}
              <div>
                <p className="text-sm text-gray-500">Detail 1</p>
                <h3 className="text-lg font-semibold">
                  {projectData.description2 || "Not specified"}
                </h3>
              </div>
              <div>
                <p className="text-sm text-gray-500">Detail 2</p>
                <h3 className="text-lg font-semibold">
                  {projectData.description3 || "Not specified"}
                </h3>
              </div>
              <div>
                <p className="text-sm text-gray-500">Detail 3</p>
                <h3 className="text-lg font-semibold">
                  {projectData.description4 || "Not specified"}
                </h3>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Description</h2>
            <p className="text-gray-700">
              {projectData.description || "No description available."}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          {images.slice(1).map((img, index) => (
            <div
              key={uuidv4()}
              onClick={() => {
                setSelectedIndex(index + 1);
                setLightboxOpen(true);
              }}
              className="cursor-pointer"
            >
              <img
                src={`${img.secure_url}?f_auto,q_auto,w_633,h_679`}
                alt={img.public_id}
                width={633}
                height={679}
                className="w-full h-auto"
                sizes="(max-width: 992px) 100vw, 50vw"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={photos}
          index={selectedIndex}
          render={{
            slide: ({ slide }) => (
              <img
                src={slide.src}
                alt={slide.alt}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
            ),
          }}
        />

        {isLoading && (
          <div className="text-center mt-8">
            <Skeleton className="h-6 w-32 mx-auto" />
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleProject;
