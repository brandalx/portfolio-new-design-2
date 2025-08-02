"use client";

import { useScroll, useTransform, motion } from "motion/react";
import { useRef } from "react";
import { ReactNode } from "react";

interface HeroscrollProps {
  components: {
    component: ReactNode;
    backgroundClass?: string;
    scaleRange?: [number, number];
    rotateRange?: [number, number];
  }[];
}

export default function Heroscroll({ components }: HeroscrollProps) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  if (components.length < 2) {
    console.warn("Heroscroll requires at least two components");
    return null;
  }

  return (
    <div ref={container} className="">
      {components.map(
        ({ component, backgroundClass, scaleRange, rotateRange }, index) => {
          // Calculate the scroll range for this specific section
          const sectionCount = components.length;
          const sectionStart = index / sectionCount;
          const sectionEnd = (index + 1) / sectionCount;

          return (
            <Section
              key={index}
              scrollYProgress={scrollYProgress}
              component={component}
              backgroundClass={backgroundClass}
              scaleRange={scaleRange || (index % 2 === 0 ? [1, 0.8] : [0.8, 1])}
              rotateRange={rotateRange || (index % 2 === 0 ? [0, -5] : [5, 0])}
              sectionStart={sectionStart}
              sectionEnd={sectionEnd}
            />
          );
        }
      )}
    </div>
  );
}

interface SectionProps {
  scrollYProgress: any;
  component: ReactNode;
  backgroundClass?: string;
  scaleRange: [number, number];
  rotateRange: [number, number];
  sectionStart: number;
  sectionEnd: number;
}

const Section = ({
  scrollYProgress,
  component,
  backgroundClass,
  scaleRange,
  rotateRange,
  sectionStart,
  sectionEnd,
}: SectionProps) => {
  // Map the section's portion of the scroll to the animation range
  const scale = useTransform(
    scrollYProgress,
    [sectionStart, sectionEnd],
    scaleRange
  );
  const rotate = useTransform(
    scrollYProgress,
    [sectionStart, sectionEnd],
    rotateRange
  );

  return (
    <motion.section
      style={{ scale, rotate }}
      className={`relative h-screen ${backgroundClass || ""}`}
    >
      {component}
    </motion.section>
  );
};
// <Heroscroll
//           components={[
//             {
//               component: (
//                 <div className="relative ">
//                   <HeroNew />
//                 </div>
//               ),
//               backgroundClass: "",
//               scaleRange: [1, 0.8],
//               rotateRange: [0, -5],
//             },
//             {
//               component: <Portfolio />,
//               backgroundClass: "bg-background z-[2]",
//               scaleRange: [0.8, 1],
//               rotateRange: [5, 0],
//             },
//           ]}
//         />
