"use client";

import { TextScroll } from "./ui/text-scroll";

export function TextScrollDemo() {
  return (
    <TextScroll
      className="font-display text-center text-4xl font-semibold tracking-tighter  text-black dark:text-white md:text-7xl md:leading-[5rem]"
      text="DESIGNS & PHOTOS"
      default_velocity={5}
    />
  );
}
