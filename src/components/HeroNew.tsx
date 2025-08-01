import { cn } from "@/lib/utils";
import MaksedDivDemo from "./maskedDivMain";
import NewTypewriter from "./NewTypewriter";
import ImageTrail from "./imageTrail";
import unbounded from "@/lib/fonts";
import Available from "./available";

export function HeroNew() {
  return (
    <div className="relative mt-20">
      <div className="grid mt-5 grid-cols-1    md:grid-cols-2    min-h-[600px] md:h-[85vh] gap-y-10  mb-10   text-4xl md:text-5xl lg:text-7xl  ">
        <div className="md:flex md:items-center md:justify-center ">
          <div>
            <div className="z-[9999]">
              <Available />
            </div>

            <div
              className={cn(
                " font-extrabold    uppercase",
                unbounded.className
              )}
            >
              Hi I&apos;m Brandon,
              <br /> <div className="z-[999]"></div>
              <NewTypewriter />
              <br />
              <p className="  ">creating stunning visuals.</p>
            </div>
          </div>
        </div>
        <div className=" z-[-1] relative overflow-auto md:overflow-visible min-h-[500px] md:min-h-auto rpunded-lg">
          <div className=" absolute willchange">
            <MaksedDivDemo />
          </div>
        </div>
      </div>

      <ImageTrail
        items={[
          "/assets/cursor/18.webp",
          "/assets/cursor/27.webp",
          "/assets/cursor/9.webp",
          "/assets/cursor/5.webp",
          "/assets/cursor/11.webp",
          "/assets/cursor/15.webp",
          "/assets/cursor/1.webp",
          "/assets/cursor/22.webp",
          "/assets/cursor/3.webp",
          "/assets/cursor/29.webp",
          "/assets/cursor/14.webp",
          "/assets/cursor/13.webp",
          "/assets/cursor/30.webp",
          "/assets/cursor/6.webp",
          "/assets/cursor/17.webp",
          "/assets/cursor/23.webp",
          "/assets/cursor/19.webp",
          "/assets/cursor/2.webp",
          "/assets/cursor/21.webp",
          "/assets/cursor/25.webp",
          "/assets/cursor/26.webp",
          "/assets/cursor/20.webp",
          "/assets/cursor/10.webp",
          "/assets/cursor/12.webp",
          "/assets/cursor/24.webp",
          "/assets/cursor/16.webp",
          "/assets/cursor/7.webp",
          "/assets/cursor/28.webp",
          "/assets/cursor/4.webp",
          "/assets/cursor/8.webp",
        ]}
        variant={1}
      />
    </div>
  );
}
