import Link from "next/link";
import { FC, useEffect, useRef, useState } from "react";
import AOSInit from "@/components/AOSInit";
import { AspectRatio } from "./ui/aspect-ratio";
import { gsap } from "gsap";
import unbounded from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { IconChevronRight } from "@tabler/icons-react";

interface ImageCardProps {
  src: string;
  title: string;
  category: string;
  subcategory: string;
}

const ImageCard: FC<ImageCardProps> = ({
  src,
  title,
  category,
  subcategory,
}) => {
  // Array of words to randomly select from
  const words = ["View", "Explore", "Discover", "See More", "Check Out"];
  // State to hold the current random word
  const [currentWord, setCurrentWord] = useState("View");

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

    if (!image || !viewText) return;

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
  }, []);

  return (
    <AspectRatio ratio={9 / 12}>
      <Link
        href={`/${category}/${makesubcategoryasUrl}/${makeTitleAsUrl}`}
        className="group willchange max-h-[700px] h-full flex flex-col"
        data-aos="fade-up"
      >
        <div className="overflow-hidden rounded-lg relative" ref={imageRef}>
          <AspectRatio ratio={9 / 16}>
            <img
              sizes="100vw"
              className="w-full h-auto object-cover transition-transform duration-300 ease-out group-hover:scale-105 h-full object-cover"
              src={src}
              alt={makeTtitleAsTitle}
            />
          </AspectRatio>
          <div className="absolute inset-0 bg-black/10 transition-opacity duration-300 ease-out group-hover:opacity-0"></div>
          <div
            ref={viewTextRef}
            className={cn(
              "rounded-full absolute top-0 left-0 bg-black/20 text-white hidden display:block footer-up-button font-semibold px-4 py-2 text-lg pointer-events-none navbarmain md:flex items-center gap-x-2 willchange",
              unbounded.className
            )}
          >
            {currentWord} <IconChevronRight />
          </div>
        </div>

        <div className="mt-4 flex flex-col flex-grow capitalize">
          <span className="text-sm text-gray-500 glor-l">
            {makesubcategoryAsName}
          </span>
          <h3 className="text-2xl font-semibold glor-b">{makeTtitleAsTitle}</h3>
        </div>
      </Link>
    </AspectRatio>
  );
};

export default ImageCard;
