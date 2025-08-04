"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import unbounded from "@/lib/fonts";
import { MoveUpRight } from "lucide-react";
import Link from "next/link";
import React, { useState, useRef, useCallback, useEffect } from "react";

interface ImageData {
  id: number;
  src: string;
  alt: string;
  link: string;
}

const images: ImageData[] = [
  {
    id: 1,
    src: "/assets/cursor/21.webp",
    link: "/design/design3d",
    alt: "3D Design",
  },
  {
    id: 2,
    src: "/assets/cursor/4.webp",
    link: "/design/design2d",
    alt: "2D Design",
  },
  {
    id: 3,
    src: "/assets/cursor/40.webp",
    link: "/photography/architecture",
    alt: "Architecture",
  },
  {
    id: 4,
    src: "/assets/cursor2/5.webp",
    link: "/photography/portraits",
    alt: "Portraits",
  },
  {
    id: 5,
    src: "/assets/image.jpg",
    link: "/about",
    alt: "About",
  },

  {
    id: 7,
    src: "/assets/devport.png",
    link: "https://brandnolandev.com/",
    alt: "Dev Portfolio",
  },
];

const ImageReveal2: React.FC = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [activeImage, setActiveImage] = useState<ImageData | null>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [scale, setScale] = useState(0.5);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const requestRef = useRef<number | null>(null);
  const prevCursorPosition = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const { clientX, clientY } = e;
    const dx = clientX - prevCursorPosition.current.x;
    const dy = clientY - prevCursorPosition.current.y;

    // Apply easing to the cursor movement
    const easeAmount = 0.2;
    const newX = prevCursorPosition.current.x + dx * easeAmount;
    const newY = prevCursorPosition.current.y + dy * easeAmount;

    setCursorPosition({ x: newX, y: newY });
    prevCursorPosition.current = { x: newX, y: newY };
  }, []);

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      if (requestRef.current) return;
      requestRef.current = requestAnimationFrame(() => {
        handleMouseMove(e);
        requestRef.current = null;
      });
    };

    window.addEventListener("mousemove", updateCursorPosition);
    return () => {
      window.removeEventListener("mousemove", updateCursorPosition);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [handleMouseMove]);

  const handleImageHover = useCallback(
    (image: ImageData) => {
      if (activeImage !== image) {
        setActiveImage(image);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          setOpacity(1);
          setScale(1);
        }, 50);
      } else {
        setOpacity(1);
        setScale(1);
      }
    },
    [activeImage]
  );

  const handleMouseLeave = useCallback(() => {
    setOpacity(0);
    setScale(0.5);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveImage(null);
    }, 300);
  }, []);

  return (
    <div
      className="relative w-full min-h-fit dark:bg-gradient-to-b from-black from-10% to-gray-950 to-100% bg-gray-100  "
      onMouseLeave={handleMouseLeave}
    >
      {images.map((image) => (
        <Link
          href={image.link}
          key={image.id}
          className={`p-4 cursor-pointer relative sm:flex items-center justify-between capitalize ${unbounded.className}`}
          onMouseEnter={() => handleImageHover(image)}
        >
          {!isDesktop && (
            <img
              src={image?.src}
              className="sm:w-32 sm:h-20 w-full h-52 object-cover rounded-md"
              alt="mobileImg"
            />
          )}
          <h2
            className={` dark:text-gray-300 uppercase md:text-5xl sm:text-2xl text-xl  sm:py-6 py-2 leading-[100%] relative mt-1 ${
              activeImage?.id === image?.id
                ? "mix-blend-difference z-20 text-gray-300"
                : "text-gray-700"
            }`}
          >
            {image.alt}
          </h2>
          <button
            className={`sm:block hidden p-4 rounded-full transition-all duration-300 ease-out ${
              activeImage?.id === image?.id
                ? "mix-blend-difference z-20 bg-white text-black"
                : ""
            }`}
          >
            <MoveUpRight className="w-8 h-8" />
          </button>
          <div
            className={`h-[2px] dark:bg-white bg-black absolute bottom-0 left-0 transition-all duration-300 ease-linear ${
              activeImage?.id === image?.id ? "w-full" : "w-0"
            }`}
          />
        </Link>
      ))}
      {isDesktop && activeImage && (
        <img
          src={activeImage.src}
          alt={activeImage.alt}
          className={`fixed dark:bg-gray-950 bg-white object-cover pointer-events-none z-10 w-[300px] h-[400px] rounded-lg`}
          style={{
            left: `${cursorPosition.x}px`,
            top: `${cursorPosition.y}px`,
            transform: `translate(-50%, -50%) scale(${scale})`,
            opacity: opacity,
          }}
        />
      )}
    </div>
  );
};

export default ImageReveal2;
