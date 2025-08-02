"use client";
import React from "react";
import Link from "next/link";
import UseAnimations from "react-useanimations";
import github from "react-useanimations/lib/github";
import facebook from "react-useanimations/lib/facebook";
import instagram from "react-useanimations/lib/instagram";
import linkedin from "react-useanimations/lib/linkedin";
import mail from "react-useanimations/lib/mail";
import home from "react-useanimations/lib/home";
import { useTheme } from "next-themes";
export default function SocialIcons() {
  const { theme, resolvedTheme } = useTheme(); // Get current theme
  const strokeColor = resolvedTheme === "dark" ? "white" : "black"; // Black in dark mode, white in light mode
  return (
    // className="mx-2 iconhover"
    <div className="flex align-items-center">
      <Link
        className="d-inline-block"
        href="https://github.com/brandalx"
        target="_blank"
      >
        <span style={{ cursor: "pointer" }}>
          <UseAnimations
            strokeColor={strokeColor}
            animation={github}
            size={35}
          />{" "}
        </span>
      </Link>
      <Link
        className="d-inline-block"
        href="https://www.linkedin.com/in/brandonolan"
        target="_blank"
      >
        <span style={{ cursor: "pointer" }}>
          <UseAnimations
            strokeColor={strokeColor}
            animation={linkedin}
            size={35}
          />{" "}
        </span>
      </Link>
      <Link
        className="d-inline-block"
        href="https://www.instagram.com/alxphm"
        target="_blank"
      >
        <span style={{ cursor: "pointer" }}>
          <UseAnimations
            strokeColor={strokeColor}
            animation={instagram}
            size={35}
          />{" "}
        </span>
      </Link>

      <Link
        className="d-inline-block"
        href="https://www.facebook.com/Brndalx"
        target="_blank"
      >
        <span style={{ cursor: "pointer" }}>
          <UseAnimations
            strokeColor={strokeColor}
            animation={facebook}
            size={35}
          />{" "}
        </span>
      </Link>

      <Link
        className="d-inline-block"
        href="mailto:brandon.nolan.wisap@gmail.com
        ?subject=Brandon Nolan"
        target="_self"
      >
        <span style={{ cursor: "pointer" }}>
          <UseAnimations
            strokeColor={strokeColor}
            animation={mail}
            size={35}
          />{" "}
        </span>
      </Link>
      <Link
        className="d-inline-block"
        href="https://design.brandnolandev.com"
        target="_blank"
      >
        <span style={{ cursor: "pointer" }}>
          <UseAnimations
            strokeColor={strokeColor}
            animation={home}
            size={35}
          />{" "}
        </span>
      </Link>
    </div>
  );
}
