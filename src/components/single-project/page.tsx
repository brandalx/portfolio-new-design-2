"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter, useParams, usePathname } from "next/navigation";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Share from "yet-another-react-lightbox/plugins/share";
import unbounded from "@/lib/fonts";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import TextPressure from "../textPressure";
import MaxWidthWrapper from "../max-width-wrapper";
import { v4 as uuidv4 } from "uuid";
import Masonry from "react-masonry-css";
import { BackButton } from "../BackButton";

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

// Individual image component with loading state - simplified for performance
const MasonryImage = React.memo(
  ({
    img,
    index,
    onImageClick,
  }: {
    img: ProjectImage;
    index: number;
    onImageClick: (index: number) => void;
  }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    const handleImageLoad = () => {
      setImageLoaded(true);
    };

    const handleImageError = () => {
      setImageError(true);
      setImageLoaded(true);
    };

    const handleClick = () => {
      if (imageLoaded && !imageError) {
        onImageClick(index);
      }
    };

    return (
      <div className="cursor-pointer relative">
        {!imageLoaded && <Skeleton className="w-full h-[300px] rounded-lg" />}

        <img
          loading="lazy"
          src={img.secure_url}
          alt={img.public_id}
          className={cn(
            "w-full h-full object-cover rounded-lg transition-opacity duration-300",
            imageLoaded ? "opacity-100" : "opacity-0 absolute inset-0"
          )}
          sizes="(max-width: 768px) 100vw, 33vw"
          width={400}
          height={300}
          onLoad={handleImageLoad}
          onError={handleImageError}
          onClick={handleClick}
        />

        {imageError && imageLoaded && (
          <div className="w-full h-[300px] bg-gray-100 dark:bg-gray-800 flex items-center justify-center rounded-lg">
            <div className="text-gray-500 dark:text-gray-400 text-center">
              <div className="w-12 h-12 mx-auto mb-2 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <span className="text-sm">Failed to load image</span>
            </div>
          </div>
        )}
      </div>
    );
  }
);

MasonryImage.displayName = "MasonryImage";

// Cover image component with loading state
const CoverImage = React.memo(
  ({
    src,
    alt,
    className,
  }: {
    src: string;
    alt: string;
    className?: string;
  }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    const handleImageLoad = useCallback(() => {
      setImageLoaded(true);
    }, []);

    const handleImageError = useCallback(() => {
      setImageError(true);
      setImageLoaded(true);
    }, []);

    return (
      <div className="relative">
        {!imageLoaded && (
          <Skeleton className="w-full h-[500px] md:h-[600px] lg:h-[700px] rounded-lg" />
        )}

        <img
          loading="eager"
          src={src}
          alt={alt}
          className={cn(
            "w-full h-auto rounded-lg transition-opacity duration-300",
            imageLoaded ? "opacity-100" : "opacity-0 absolute inset-0",
            className
          )}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />

        {imageError && imageLoaded && (
          <div className="w-full h-[500px] md:h-[600px] lg:h-[700px] bg-gray-100 dark:bg-gray-800 flex items-center justify-center rounded-lg">
            <div className="text-gray-500 dark:text-gray-400 text-center">
              <div className="w-16 h-16 mx-auto mb-2 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <span className="text-sm">Failed to load cover image</span>
            </div>
          </div>
        )}
      </div>
    );
  }
);

CoverImage.displayName = "CoverImage";

const SingleProject = () => {
  const router = useRouter();
  const { project } = useParams() as { project: string };
  const pathname = usePathname();
  const [projectData, setProjectData] = useState<Project | null>(null);
  const [images, setImages] = useState<ProjectImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Memoize photos array to prevent recreation on every render
  const photos = useMemo(
    () =>
      images.map((img) => ({
        src: img.secure_url,
        alt: img.public_id,
      })),
    [images]
  );

  // Memoize image click handler
  const handleImageClick = useCallback((index: number) => {
    setSelectedIndex(index + 1);
    setLightboxOpen(true);
  }, []);

  // Memoize lightbox close handler
  const handleLightboxClose = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  // Memoize masonry images to prevent re-rendering
  const masonryImages = useMemo(
    () =>
      images.slice(1).map((img, index) => (
        <MasonryImage
          key={img.asset_id || img.public_id || uuidv4()} // Use stable key
          img={img}
          index={index}
          onImageClick={handleImageClick}
        />
      )),
    [images, handleImageClick]
  );

  useEffect(() => {
    // Reset state on navigation
    setImages([]);
    setError(null);
    setIsLoading(true);

    const fetchProject = async () => {
      if (!project || !pathname) {
        setError("Missing project or pathname");
        setIsLoading(false);
        return;
      }

      try {
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
        if (!projectInfo) {
          router.replace("/404");
          return;
        }

        setProjectData(projectInfo);
        setImages(projectInfo.images || []);
      } catch (err) {
        console.error("Error fetching project:", (err as Error).message);
        setError("Failed to load project data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [project, pathname, router]);

  if (isLoading || error || !projectData) {
    return (
      <MaxWidthWrapper>
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[...Array(6)].map((_, index) => (
                <Skeleton
                  key={index}
                  className="w-full h-[300px] md:h-[400px] lg:h-[500px]"
                />
              ))}
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    );
  }

  const category = pathname?.split("/")[1]?.toUpperCase() || "CATEGORY";

  return (
    <MaxWidthWrapper>
      <div>
        <div className="mt-2">
          {" "}
          <BackButton />
        </div>
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
              text={
                projectData.description ||
                projectData.name ||
                "Untitled Project"
              }
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
            <CoverImage src={projectData.cover} alt={projectData.name} />
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
                    <h3 className="text-lg font-semibold">
                      {projectData.date}
                    </h3>
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
                    <h3 className="text-lg font-semibold">
                      {projectData.type}
                    </h3>
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
            {projectData.title && (
              <div className="flex-1 min-w-[200px]">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Description</h2>
                    <p className="text-gray-700">
                      {projectData.title || "No description available."}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mx-auto w-full">
            <Masonry
              breakpointCols={{
                default: 2,
                768: 1,
                1024: 2,
              }}
              className="my-masonry-grid gap-6"
              columnClassName="my-masonry-grid_column gap-6"
            >
              {masonryImages}
            </Masonry>
          </div>

          <Lightbox
            plugins={[Zoom, Share]}
            open={lightboxOpen}
            close={handleLightboxClose}
            slides={photos}
            index={selectedIndex}
            zoom={{
              maxZoomPixelRatio: 3,
              zoomInMultiplier: 2,
              doubleTapDelay: 300,
              doubleClickDelay: 300,
              doubleClickMaxStops: 2,
            }}
          />
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default SingleProject;
