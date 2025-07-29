"use client";
import React from "react";
import { Typewriter } from "react-simple-typewriter";

const NewTypewriter = () => {
  return (
    <span className="text-transparent  bg-clip-text bg-gradient-to-r customFont from-rose-700 to-pink-600">
      <Typewriter
        words={[
          " <Full-Stack Engineer/>",
          " <Front-end developer/>",
          " <Back-end developer/>",
          " <Mobile developer/>",
          " <DevOps Engineer/>",
          " <Graphic Designer/>",
          " <UX-UI designer/>",
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
