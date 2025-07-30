"use client";

import { IconArrowUp, IconArrowUpToArc } from "@tabler/icons-react";
import { useState, useEffect } from "react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Scroll to Top Function
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Handle scroll visibility for the "Back to Top" button
  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      aria-label="Scroll To Top Button"
      className={`fixed bottom-10 cursor-pointer hover:bg-slate-900 navbarmain transition-all right-10 bg-black/50 text-white rounded-full p-2 z-50 border-white/50 borderr border-2 ${
        isVisible ? "opacity-100" : "opacity-0"
      } transition-opacity`}
      onClick={scrollToTop}
    >
      <IconArrowUp className="h-6 w-6" />
    </button>
  );
};

export default ScrollToTopButton;
