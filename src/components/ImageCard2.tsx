//@ts-nocheck
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useMedia } from "react-use";
import unbounded from "@/lib/fonts";

export function ImageCard2({ model }) {
  const isMobile = useMedia("(max-width: 768px)", false);

  // Array of words to randomly select from
  const words = ["View", "Explore", "Discover", "See More", "Check Out"];
  // State to hold the current random word
  const [currentWord, setCurrentWord] = useState("View");
  // State to track image loading
  const [imageLoaded, setImageLoaded] = useState(false);

  // Refs for GSAP
  const imageRef = useRef(null);
  const viewTextRef = useRef(null);

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

    const handleMouseMove = (e) => {
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
  }, [imageLoaded, isMobile, words]); // Add words to dependency array

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className="group rounded-2xl overflow-hidden dark:shadow-md  bg-white/5 border border-gray-100 dark:border-gray-900  transition-all text-black dark:text-white">
      <Link href={model.href}>
        <div className="relative w-full h-48" ref={imageRef}>
          <Image
            src={model.image}
            alt={model.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            onLoad={handleImageLoad}
          />

          {/* GSAP Interactive Text - Only show on desktop when image is loaded */}
          {imageLoaded && !isMobile && (
            <>
              <div className="absolute inset-0 bg-black/10 transition-opacity duration-300 ease-out group-hover:opacity-0"></div>
              <div
                ref={viewTextRef}
                className="rounded-full absolute top-0 left-0 bg-black/20  hidden display:block footer-up-button font-semibold px-4 py-2 text-lg pointer-events-none navbarmain md:flex items-center gap-x-2 willchange uppercase glor-b"
                style={{ willChange: "transform, opacity" }}
              >
                {currentWord}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </div>
            </>
          )}
        </div>
        <div className="p-4 space-y-2">
          <h3 className={unbounded.className + " text-lg font-semibold "}>
            {model.title}
          </h3>
          <p className="text-sm  line-clamp-3">{model.description}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {model.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 rounded-md bg-white/10 "
              >
                {tag}
              </span>
            ))}
            {model.tags.length > 3 && (
              <span className="text-xs ">+{model.tags.length - 3}</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
