"use client";
import React from "react";
import MaskedDiv from "./ui/masked-div";
import { useMedia } from "react-use"; // Make sure react-use is installed

const MaksedDivDemo = () => {
  const isMobile = useMedia("(max-width: 768px)", false);

  if (!isMobile) {
    // Desktop: show videos
    return (
      <div className="items-between m-auto marquee-hero mb-10 flex max-w-5xl flex-wrap justify-between gap-5">
        <MaskedDiv maskType={"type-1"} size={0.45} className="my-4">
          <video
            className="pointer-events-none"
            autoPlay
            loop
            muted
            playsInline
            controls={false}
          >
            <source
              src="https://videos.pexels.com/video-files/7710243/7710243-uhd_2560_1440_30fps.mp4"
              type="video/mp4"
            />
          </video>
        </MaskedDiv>
        <MaskedDiv maskType="type-1" size={0.45} className="rotate-180">
          <video
            className="pointer-events-none"
            autoPlay
            loop
            muted
            playsInline
            controls={false}
          >
            <source
              src="https://videos.pexels.com/video-files/18069803/18069803-uhd_1440_2560_24fps.mp4"
              type="video/mp4"
            />
          </video>
        </MaskedDiv>
        <MaskedDiv maskType="type-3" className="my-4">
          <video
            className="pointer-events-none"
            autoPlay
            loop
            muted
            playsInline
            controls={false}
          >
            <source
              src="https://videos.pexels.com/video-files/18069166/18069166-uhd_2560_1440_24fps.mp4"
              type="video/mp4"
            />
          </video>
        </MaskedDiv>
        <MaskedDiv maskType="type-4" className="my-4">
          <video
            className="pointer-events-none"
            autoPlay
            loop
            muted
            playsInline
            controls={false}
          >
            <source
              src="https://videos.pexels.com/video-files/18069701/18069701-uhd_2560_1440_24fps.mp4"
              type="video/mp4"
            />
          </video>
        </MaskedDiv>
        <MaskedDiv maskType="type-2" className="my-4">
          <video
            className="pointer-events-none"
            autoPlay
            loop
            muted
            playsInline
            controls={false}
          >
            <source
              src="https://videos.pexels.com/video-files/18069232/18069232-uhd_2560_1440_24fps.mp4"
              type="video/mp4"
            />
          </video>
        </MaskedDiv>
      </div>
    );
  }

  // Mobile: show images from public/assets/1.webp - 5.webp
  return (
    <div className="items-between m-auto marquee-hero mb-10 flex max-w-5xl flex-wrap justify-between gap-5">
      <MaskedDiv maskType={"type-1"} size={0.45} className="my-4">
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
