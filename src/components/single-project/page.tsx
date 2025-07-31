"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { useParams, usePathname } from "next/navigation";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Share from "yet-another-react-lightbox/plugins/share";
import unbounded from "@/lib/fonts";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import TextPressure from "../textPressure";

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

// Updated useScrollDown hook using IntersectionObserver
const useScrollDown = (
  callback: () => void,
  isLoading: boolean,
  hasMore: boolean
) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && !isLoading && hasMore) {
        callback();
      }
    },
    [callback, isLoading, hasMore]
  );

  useEffect(() => {
    observerRef.current = new IntersectionObserver(handleObserver, {
      root: null, // Use viewport as root
      rootMargin: "600px", // Trigger when 600px from the sentinel
      threshold: 0, // Trigger as soon as sentinel is visible
    });

    if (sentinelRef.current) {
      observerRef.current.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current && observerRef.current) {
        observerRef.current.unobserve(sentinelRef.current);
      }
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleObserver]);

  return sentinelRef; // Return ref to attach to the sentinel element
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
  const imagesPerPage = 8;

  const photos = images.map((img) => ({
    src: img.secure_url, // Use raw URL without transformations
    alt: img.public_id,
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
        console.error("Error fetching project:", (err as Error).message);
        setError("Failed to load project data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [project, pathname]);

  const sentinelRef = useScrollDown(
    () => {
      if (projectData && images.length < (projectData.images?.length || 0)) {
        const nextImages = projectData.images!.slice(
          images.length,
          images.length + imagesPerPage
        );
        setImages((prev) => [...prev, ...nextImages]);
        setCurrentPage((prev) => prev + 1);
      }
    },
    isLoading,
    projectData ? images.length < (projectData.images?.length || 0) : false
  );

  if (isLoading || error || !projectData) {
    return (
      <div>
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

  console.log(projectData);

  return (
    <div>
      <div className="mx-auto max-w-7xl-none px-4-none py-8 text-center">
        <p className="text-sm text-gray-500">{category}</p>
        <h1
          className={cn(
            unbounded.className,
            "mt-2 lg:text-6xl text-4xl font-bold uppercase w-fit mx-auto cursor-pointer"
          )}
        >
          <TextPressure
            className="text-4xl w-fit md:text-5xl lg:text-[120px]"
            text={projectData.title || projectData.name || "Untitled Project"}
            flex={true}
            alpha={false}
            stroke={false}
            width={true}
            weight={true}
            fontUrl="https://res.cloudinary.com/dzlatzgxe/raw/upload/v1753861493/Unbounded-VariableFont_wght_lzvbjo.ttf"
            italic={true}
            fontFamily="Unbounded"
            strokeColor="#ff0000"
            minFontSize={36}
          />
        </h1>
      </div>

      {projectData.cover && category !== "PHOTOGRAPHY" && (
        <div className="mx-auto max-w-7xl-none px-4-none">
          <img
            loading="eager"
            src={projectData.cover} // Use raw URL without transformations
            alt={projectData.name}
            className="w-full h-auto rounded-lg"
          />
        </div>
      )}

      <div className="mx-auto max-w-7xl-none px-4-none py-8">
        <div className="flex flex-wrap gap-8">
          {projectData.client && (
            <div className="flex-1 min-w-[200px]">
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-gray-500">Client</p>
                  <h3 className="text-lg font-semibold">
                    {projectData.client}
                  </h3>
                </div>
              </div>
            </div>
          )}
          {projectData.date && (
            <div className="flex-1 min-w-[200px]">
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <h3 className="text-lg font-semibold">{projectData.date}</h3>
                </div>
              </div>
            </div>
          )}
          {projectData.software && (
            <div className="flex-1 min-w-[200px]">
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-gray-500">Software</p>
                  <h3 className="text-lg font-semibold">
                    {projectData.software}
                  </h3>
                </div>
              </div>
            </div>
          )}
          {projectData.type && (
            <div className="flex-1 min-w-[200px]">
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-gray-500">Type</p>
                  <h3 className="text-lg font-semibold">{projectData.type}</h3>
                </div>
              </div>
            </div>
          )}
          {projectData.link && (
            <div className="flex-1 min-w-[200px]">
              <div className="space-y-6">
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
              </div>
            </div>
          )}
          {projectData.description2 && (
            <div className="flex-1 min-w-[200px]">
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-gray-500">Detail 1</p>
                  <h3 className="text-lg font-semibold">
                    {projectData.description2}
                  </h3>
                </div>
              </div>
            </div>
          )}
          {projectData.description3 && (
            <div className="flex-1 min-w-[200px]">
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-gray-500">Detail 2</p>
                  <h3 className="text-lg font-semibold">
                    {projectData.description3}
                  </h3>
                </div>
              </div>
            </div>
          )}
          {projectData.description4 && (
            <div className="flex-1 min-w-[200px]">
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-gray-500">Detail 3</p>
                  <h3 className="text-lg font-semibold">
                    {projectData.description4}
                  </h3>
                </div>
              </div>
            </div>
          )}
          {projectData.description && (
            <div className="flex-1 min-w-[200px]">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Description</h2>
                  <p className="text-gray-700">
                    {projectData.description || "No description available."}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          {images.slice(1).map((img, index) => (
            <div
              key={img.public_id} // Use public_id as key for stability
              onClick={() => {
                setSelectedIndex(index + 1);
                setLightboxOpen(true);
              }}
              className="cursor-pointer"
            >
              <img
                src={img.secure_url} // Use raw URL without transformations
                alt={img.public_id}
                className="w-full h-auto rounded-lg"
                sizes="(max-width: 992px) 100vw, 50vw"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        <div ref={sentinelRef} className="h-1" />

        <Lightbox
          plugins={[Zoom, Share]}
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={photos}
          index={selectedIndex}
          zoom={{
            maxZoomPixelRatio: 3, // Limit maximum zoom level
            zoomInMultiplier: 2, // Zoom increment
            doubleTapDelay: 300, // Delay for double-tap zoom
            doubleClickDelay: 300, // Delay for double-click zoom
            doubleClickMaxStops: 2, // Max zoom stops for double-click
          }}
          render={{
            slide: ({ slide }) => (
              <img
                src={slide.src}
                alt={slide.alt}
                width={slide.width}
                height={slide.height}
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
