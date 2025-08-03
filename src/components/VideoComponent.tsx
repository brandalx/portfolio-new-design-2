import React from "react";
import MaskedDiv from "./ui/masked-div";

const VideoComponent = () => (
  <>
    <MaskedDiv maskType="type-1" size={0.45} className="my-4">
      <video
        className="pointer-events-none"
        autoPlay
        loop
        muted
        playsInline
        controls={false}
      >
        <source
          src="/assets/video/7710243-uhd_2560_1440_30fps.mp4"
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
          src="/assets/video/18069803-uhd_1440_2560_24fps.mp4"
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
          src="/assets/video/18069166-uhd_2560_1440_24fps.mp4"
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
          src="/assets/video/18069701-uhd_2560_1440_24fps.mp4"
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
          src="/assets/video/18069232-uhd_2560_1440_24fps.mp4"
          type="video/mp4"
        />
      </video>
    </MaskedDiv>
  </>
);

export default VideoComponent;
