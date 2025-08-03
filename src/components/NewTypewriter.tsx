"use client";
import React from "react";
import { Typewriter } from "react-simple-typewriter";

const NewTypewriter = () => {
  return (
    <span className="text-transparent   text-3xl md:text-4xl xl:text-6xl  bg-clip-text bg-gradient-to-r customFont from-rose-600 to-pink-500 ">
      <Typewriter
        words={[
          "Digital Illustrator",
          "Digital Illustrator",
          "Digital Illustrator",
          "Digital Illustrator",
          "Digital Illustrator",
          "Digital Illustrator",
          "Digital Illustrator",

          "Digital Illustrator",
        ]}
        cursor
        loop
        cursorStyle="|"
        typeSpeed={120}
        deleteSpeed={50}
        delaySpeed={1000}
      />
    </span>
  );
};

export default NewTypewriter;
