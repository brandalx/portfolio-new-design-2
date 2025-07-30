"use client";
import React from "react";
import MaskedDiv from "./ui/masked-div";
import { useMedia } from "react-use";
import dynamic from "next/dynamic";

// Dynamically import the video component, disabling SSR
const VideoComponent = dynamic(() => import("./VideoComponent"), {
  ssr: false,
});

const MaksedDivDemo = () => {
  const isMobile = useMedia("(max-width: 768px)", false);

  if (!isMobile) {
    return (
      <div className="items-between m-auto marquee-hero mb-10 flex max-w-5xl flex-wrap justify-between gap-5">
        <VideoComponent />
      </div>
    );
  }

  // Mobile: show images
  return (
    <div className="items-between m-auto marquee-hero mb-10 flex max-w-5xl flex-wrap justify-between gap-5">
      <MaskedDiv maskType="type-1" size={0.45} className="my-4">
        <img src="/assets/1.webp" alt="Mobile image 1" />
      </MaskedDiv>
      <MaskedDiv maskType="type-1" size={0.45} className="rotate-180">
        <img src="/assets/2.webp" alt="Mobile image 2" />
      </MaskedDiv>
      <MaskedDiv maskType="type-3" className="my-4">
        <img src="/assets/3.webp" alt="Mobile image 3" />
      </MaskedDiv>
      <MaskedDiv maskType="type-4" className="my-4">
        <img src="/assets/4.webp" alt="Mobile image 4" />
      </MaskedDiv>
      <MaskedDiv maskType="type-2" className="my-4">
        <img src="/assets/5.webp" alt="Mobile image 5" />
      </MaskedDiv>
    </div>
  );
};

export default MaksedDivDemo;
