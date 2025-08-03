import Link from "next/link";
import { FC, useEffect, useRef, useState } from "react";
// import AOSInit from "@/components/AOSInit";
import { AspectRatio } from "./ui/aspect-ratio";
import { Skeleton } from "./ui/skeleton";
import { gsap } from "gsap";
import unbounded from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { IconChevronRight } from "@tabler/icons-react";
import { useMedia } from "react-use"; // Assuming you're using react-use for useMedia

interface ImageCardProps {
  src: string;
  title: string;
  category: string;
  subcategory: string;
  aspectRatio?: any;
  date?: any;
}

const ImageCard: FC<ImageCardProps> = ({
  aspectRatio = 3 / 4,
  src,
  title,
  category,
  subcategory,
  date,
}) => {
  const isMobile = useMedia("(max-width: 768px)", false); // Your mobile media query hook
  // Array of words to randomly select from
  const words = ["View", "Explore", "Discover", "See More", "Check Out"];
  // State to hold the current random word
  const [currentWord, setCurrentWord] = useState("View");
  // State to track image loading
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Remove spaces and lowercase
  const cleanTitle = title.replace(/\s+/g, "").toLowerCase();
  const cleanSubcategory = subcategory.replace(/\s+/g, "").toLowerCase();

  // Generate URL-friendly title
  const makeTitleAsUrl = cleanTitle;

  // Map subcategory to URL path
  let makesubcategoryasUrl = cleanSubcategory;
  if (cleanSubcategory === "3ddesign") {
    makesubcategoryasUrl = "design3d";
  } else if (cleanSubcategory === "2ddesign") {
    makesubcategoryasUrl = "design2d";
  }

  // Display name for subcategory
  let makesubcategoryAsName = "";
  switch (makesubcategoryasUrl) {
    case "design3d":
      makesubcategoryAsName = "3D Design";
      break;
    case "design2d":
      makesubcategoryAsName = "2D Design";
      break;
    case "portraits":
      makesubcategoryAsName = "Portraits";
      break;
    case "architecture":
      makesubcategoryAsName = "Architecture";
      break;
    default:
      makesubcategoryAsName =
        makesubcategoryasUrl.charAt(0).toUpperCase() +
        makesubcategoryasUrl.slice(1);
  }

  // Display-friendly title
  const makeTtitleAsTitle = title.trim();

  // Refs for GSAP
  const imageRef = useRef<HTMLDivElement>(null);
  const viewTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const image = imageRef.current;
    const viewText = viewTextRef.current;

    if (!image || !viewText || !imageLoaded || isMobile) return; // Skip GSAP if mobile

    // Set initial state of view text
    gsap.set(viewText, { opacity: 0, scale: 0.5 });

    const handleMouseEnter = () => {
      // Select a random word from the array
      const randomWord = words[Math.floor(Math.random() * words.length)];
      setCurrentWord(randomWord);

      gsap.to(viewText, {
        opacity: 1,
        scale: 1.2,
        duration: 0.3,
        ease: "elastic.out(1, 0.5)",
        onComplete: () => {
          gsap.to(viewText, {
            scale: 1,
            duration: 0.2,
            ease: "power2.out",
          });
        },
      });
    };

    const handleMouseLeave = () => {
      gsap.to(viewText, {
        opacity: 0,
        scale: 0.5,
        duration: 0.3,
        ease: "back.in(1.7)",
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = image.getBoundingClientRect();
      const x = e.clientX - rect.left - 40; // Adjust for text width
      const y = e.clientY - rect.top - 20; // Adjust for text height

      // Constrain within image bounds
      const constrainedX = Math.max(0, Math.min(x, rect.width - 80)); // 80 is text width
      const constrainedY = Math.max(0, Math.min(y, rect.height - 40)); // 40 is text height

      gsap.to(viewText, {
        x: constrainedX,
        y: constrainedY,
        duration: 0.1,
        ease: "power2.out",
      });
    };

    image.addEventListener("mouseenter", handleMouseEnter);
    image.addEventListener("mouseleave", handleMouseLeave);
    image.addEventListener("mousemove", handleMouseMove);

    return () => {
      image.removeEventListener("mouseenter", handleMouseEnter);
      image.removeEventListener("mouseleave", handleMouseLeave);
      image.removeEventListener("mousemove", handleMouseMove);
    };
  }, [imageLoaded, isMobile]); // Add isMobile to dependency array

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true); // Still show content even if image fails
  };

  return (
    <div>
      {/* <AOSInit /> */}
      <AspectRatio
        // data-aos-duration="1000"
        // data-aos="fade-up"
        ratio={aspectRatio}
      >
        <Link
          href={`/${category}/${makesubcategoryasUrl}/${makeTitleAsUrl}`}
          className="group willchange h-full flex flex-col"
          data-aos="fade-up"
        >
          <div className="overflow-hidden rounded-lg relative" ref={imageRef}>
            <AspectRatio ratio={aspectRatio}>
              {!imageLoaded && <Skeleton className="w-full h-full" />}
              <img
                loading="lazy"
                sizes="100vw"
                className={cn(
                  "w-full h-auto object-cover transition-all duration-500 ease-out group-hover:scale-105 h-full object-cover",
                  imageLoaded ? "opacity-100" : "opacity-0 absolute inset-0"
                )}
                src={src}
                alt={makeTtitleAsTitle}
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
              {imageError && imageLoaded && (
                <div className="w-full h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center rounded-lg">
                  <div className="text-gray-500 dark:text-gray-400 text-center">
                    <div className="w-12 h-12 mx-auto mb-2 bg-gray-300 dark:bg-gray-600 rounded"></div>
                    <span className="text-sm">Failed to load</span>
                  </div>
                </div>
              )}
            </AspectRatio>

            {imageLoaded &&
              !imageError &&
              !isMobile && ( // Hide view text on mobile
                <>
                  <div className="absolute inset-0 bg-black/10 transition-opacity duration-300 ease-out group-hover:opacity-0"></div>
                  <div
                    ref={viewTextRef}
                    className={cn(
                      "rounded-full absolute top-0 left-0 bg-black/20 text-white hidden display:block footer-up-button font-semibold px-4 py-2 text-lg pointer-events-none navbarmain md:flex items-center gap-x-2 willchange uppercase",
                      unbounded.className
                    )}
                  >
                    {currentWord} <IconChevronRight />
                  </div>
                </>
              )}
          </div>

          <div className="mt-4 flex flex-col flex-grow capitalize">
            {!imageLoaded ? (
              // Skeleton for text content
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-6 w-3/4" />
              </div>
            ) : (
              // Actual content
              <>
                <div className="flex flex-col-reverse md:flex-row  md:justify-between">
                  <div>
                    <span className="text-sm text-gray-300 glor-l">
                      {makesubcategoryAsName}
                    </span>
                    <h3
                      className={cn(
                        "text-2xl font-semibold ",
                        unbounded.className
                      )}
                    >
                      {makeTtitleAsTitle}
                    </h3>
                  </div>{" "}
                  <div>
                    <span className="text-md text-gray-500 glor-l">{date}</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </Link>
      </AspectRatio>
    </div>
  );
};

export default ImageCard;
