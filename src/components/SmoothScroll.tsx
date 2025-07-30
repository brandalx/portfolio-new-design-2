//@ts-nocheck
// SmoothScroll.jsx
"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function SmoothScroll({ children }) {
  const container = useRef();

  useGSAP(
    () => {
      ScrollSmoother.create({
        smooth: 1,
        effects: true,
        normalizeScroll: true,
        smoothTouch: false,
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
      });
    },
    { scope: container }
  );

  return (
    <div ref={container} id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
