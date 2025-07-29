"use client";
import React from "react";
import { Typewriter } from "react-simple-typewriter";

const NewTypewriter = () => {
  return (
    <span className="text-transparent  bg-clip-text bg-gradient-to-r customFont from-rose-600 to-pink-500">
      <Typewriter
        words={[
          "Graphic Designer",
          "Web Developer",
          "Motion Designer",
          "3D Artist",
          "UX/UI Designer",
          "Visual Storyteller",
          "Digital Illustrator",

          "Multimedia Artist",
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
