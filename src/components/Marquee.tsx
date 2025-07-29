"use client";
import Marquee from "react-fast-marquee";

import { useMedia } from "react-use";
import MaksedDivDemo from "./maskedDivMain";

export function MarqueeDemo() {
  const isMobile = useMedia("(max-width: 1600px)", false);
  return (
    <Marquee pauseOnHover direction="down" speed={40} gradient={!isMobile}>
      {/* <MaksedDivDemo /> */}
    </Marquee>
  );
}
