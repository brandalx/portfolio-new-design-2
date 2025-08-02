import MaxWidthWrapper from "@/components/max-width-wrapper";
import Portfolio from "../components/portfolio/portfolio";

import { HeroNew } from "@/components/HeroNew";
import Heroscroll from "@/components/heroscroll";

export default function Home() {
  return (
    <div>
      <div
        className="min-h-screen opacity-75 absolute w-full z-[-100] pointer-events-none "
        style={{
          backgroundColor: "var(--bg-base)",
          WebkitMaskImage: `
      linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)
    `,
          maskImage: `
      linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)
    `,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskSize: "100% 100%",
          maskSize: "100% 100%",
        }}
      >
        {/* Sphere Grid Background with fade top and bottom */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "var(--bg-base)",
            backgroundImage: `
        linear-gradient(to right, var(--grid-line) 1px, transparent 1px),
        linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px),
        radial-gradient(circle at 50% 50%, var(--glow) 0%, transparent 70%)
      `,
            backgroundSize: "32px 32px, 32px 32px, 100% 100%",
            WebkitMaskImage: `
        linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)
      `,
            maskImage: `
        linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)
      `,
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskSize: "100% 100%",
            maskSize: "100% 100%",
          }}
        />
      </div>
      <MaxWidthWrapper>
        {/* <div className=" ">
          <HeroNew />
        </div> */}
        <div>{/* <WorkList /> */}</div>
        {/* <div className="z-[2]  bg-background">
          <Portfolio />
        </div> */}
        <Heroscroll
          components={[
            {
              component: (
                <div className=" ">
                  <HeroNew />
                </div>
              ),
              backgroundClass: "",
              scaleRange: [1, 0.8],
              rotateRange: [0, -5],
            },
            {
              component: <Portfolio />,
              backgroundClass: "bg-background z-[2]",
              scaleRange: [0.8, 1],
              rotateRange: [5, 0],
            },
          ]}
        />
      </MaxWidthWrapper>
    </div>
  );
}
