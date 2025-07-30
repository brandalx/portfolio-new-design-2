import { cn } from "@/lib/utils";
import MaksedDivDemo from "./maskedDivMain";
import NewTypewriter from "./NewTypewriter";
import ImageTrail from "./imageTrail";
import unbounded from "@/lib/fonts";
import Available from "./available";

export function HeroNew() {
  return (
    <div className="relative mt-20">
      <div className="grid mt-5 grid-cols-1    md:grid-cols-2    min-h-[600px] md:h-[85vh] gap-y-10  mb-10   text-5xl md:text-5xl lg:text-7xl  ">
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
              <p className="  ">creating design.</p>
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
          "https://picsum.photos/id/287/300/300",
          "https://picsum.photos/id/1001/300/300",
          "https://picsum.photos/id/1025/300/300",
          "https://picsum.photos/id/1026/300/300",
          "https://picsum.photos/id/1027/300/300",
          "https://picsum.photos/id/1028/300/300",
          "https://picsum.photos/id/1029/300/300",
          "https://picsum.photos/id/1030/300/300",
        ]}
        variant={1}
      />
    </div>
  );
}
