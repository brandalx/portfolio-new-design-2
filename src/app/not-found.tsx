import FuzzyText from "@/components/fuzzyText";
import { Button } from "@/components/ui/button";
import { IconChevronLeft } from "@tabler/icons-react";
import { Square } from "lucide-react";
import Link from "next/link";
import RootLayout from "./layout";
import MaxWidthWrapper from "@/components/max-width-wrapper";

export default function NotFound() {
  return (
    <div>
      <div
        className="min-h-screen opacity-75 absolute w-full z-[-1] pointer-events-none"
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
      </div>{" "}
      <MaxWidthWrapper>
        <div className="h-screen flex flex-col text-black dark:text-white  items-center gap-2 justify-center glor-b">
          <div className=" text-2xl">
            <div className="hidden md:block">
              <FuzzyText
                className=""
                baseIntensity={0.2}
                hoverIntensity={0.5}
                enableHover={true}
              >
                404
              </FuzzyText>
            </div>{" "}
            <div className="md:hidden text-[60px]">404</div>
          </div>
          <div className="text-xs">
            <div className="hidden md:block">
              <FuzzyText
                className=""
                baseIntensity={0.2}
                hoverIntensity={0.5}
                enableHover={true}
              >
                Not Found
              </FuzzyText>
            </div>

            <div className="md:hidden text-[30px] leading-[10px]">
              Not Found
            </div>
          </div>
          <Link href="/" className=" ">
            <Button className="rounded-full mt-4 hover:cursor-pointer text-white hover:bg-gray-100 bg-black border-black hover:text-black ">
              <IconChevronLeft /> Back to Home Page
            </Button>
          </Link>
        </div>{" "}
      </MaxWidthWrapper>
    </div>
  );
}
