"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { TextPlugin } from "gsap/TextPlugin";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText, TextPlugin);

const workTypes = [
  {
    name: "Product Design",
    image:
      "https://res.cloudinary.com/dzlatzgxe/image/upload/v1753591078/8_4_dknacs.png?f_auto,q_auto,w_1095,h_1072",
  },
  {
    name: "Modeling",
    image:
      "https://res.cloudinary.com/dzlatzgxe/image/upload/v1753591080/5_3_vgy5in.png?f_auto,q_auto,w_633,h_679",
  },
  {
    name: "3D Design",
    image:
      "https://res.cloudinary.com/dzlatzgxe/image/upload/v1753591078/8_4_dknacs.png?f_auto,q_auto,w_1095,h_1072",
  },
  {
    name: "Brand & Identity",
    image:
      "https://res.cloudinary.com/dzlatzgxe/image/upload/v1753591080/5_3_vgy5in.png?f_auto,q_auto,w_633,h_679",
  },
  {
    name: "Motion Design",
    image:
      "https://res.cloudinary.com/dzlatzgxe/image/upload/v1753591080/5_3_vgy5in.png?f_auto,q_auto,w_633,h_679",
  },
];

const WorkList = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  const bgImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !bgImageRef.current) return;

    // Create SplitText instances for each work type
    const splitTexts = sectionsRef.current.map((section) => {
      const text = section.querySelector("h2");
      return new SplitText(text, { type: "chars" });
    });

    // Set initial states
    gsap.set(bgImageRef.current, {
      opacity: 1,
      backgroundImage: `url(${workTypes[0].image})`,
    });

    // Create ScrollTrigger for each section
    sectionsRef.current.forEach((section, index) => {
      const chars = splitTexts[index].chars;

      // Set initial state: text gray and chars slightly offset
      gsap.set(chars, { color: "#999999", y: 20, opacity: 0 });

      ScrollTrigger.create({
        trigger: section,
        start: "top 60%",
        end: "bottom 40%",
        toggleActions: "play reverse play reverse",
        onEnter: () => {
          // Animate text reveal to black
          gsap.to(chars, {
            color: "#000000",
            y: 0,
            opacity: 1,
            stagger: 0.05,
            duration: 0.5,
            ease: "power2.out",
          });
          // Fade others to gray
          sectionsRef.current.forEach((otherSection, otherIndex) => {
            if (otherIndex !== index) {
              gsap.to(splitTexts[otherIndex].chars, {
                color: "#999999",
                y: 20,
                opacity: 0,
                stagger: 0.05,
                duration: 0.5,
                ease: "power2.out",
              });
            }
          });

          // Crossfade background image
          gsap.to(bgImageRef.current, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
              gsap.set(bgImageRef.current, {
                backgroundImage: `url(${workTypes[index].image})`,
              });
              gsap.to(bgImageRef.current, { opacity: 1, duration: 0.5 });
            },
          });
        },
        onEnterBack: () => {
          // Animate text reveal to black when scrolling up
          gsap.to(chars, {
            color: "#000000",
            y: 0,
            opacity: 1,
            stagger: 0.05,
            duration: 0.5,
            ease: "power2.out",
          });
          // Fade others to gray
          sectionsRef.current.forEach((otherSection, otherIndex) => {
            if (otherIndex !== index) {
              gsap.to(splitTexts[otherIndex].chars, {
                color: "#999999",
                y: 20,
                opacity: 0,
                stagger: 0.05,
                duration: 0.5,
                ease: "power2.out",
              });
            }
          });

          // Crossfade background image
          gsap.to(bgImageRef.current, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
              gsap.set(bgImageRef.current, {
                backgroundImage: `url(${workTypes[index].image})`,
              });
              gsap.to(bgImageRef.current, { opacity: 1, duration: 0.5 });
            },
          });
        },
        onLeave: () => {
          // Hide text when leaving
          gsap.to(chars, {
            color: "#999999",
            y: 20,
            opacity: 0,
            stagger: 0.05,
            duration: 0.5,
            ease: "power2.out",
          });
        },
        onLeaveBack: () => {
          // Hide text when leaving backward
          gsap.to(chars, {
            color: "#999999",
            y: 20,
            opacity: 0,
            stagger: 0.05,
            duration: 0.5,
            ease: "power2.out",
          });
        },
      });
    });

    // Cleanup on unmount
    return () => {
      splitTexts.forEach((split) => split.revert());
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-white">
      {/* Background Image Container */}
      <div
        ref={bgImageRef}
        className="absolute inset-0 bg-cover bg-center z-0 transition-opacity duration-500"
      ></div>

      {/* Content Container */}
      <div className="relative z-10">
        {workTypes.map((work, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) sectionsRef.current[index] = el;
            }}
            className="min-h-[60vh] flex items-center justify-center"
          >
            <h2 className="text-6xl md:text-8xl font-bold text-center">
              {work.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkList;
