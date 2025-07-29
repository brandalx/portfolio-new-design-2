import { cn } from "@/lib/utils";
import MaksedDivDemo from "./maskedDivMain";
import NewTypewriter from "./NewTypewriter";
import ImageTrail from "./imageTrail";
import unbounded from "@/lib/fonts";
import Available from "./available";
export function HeroNew() {
  return (
    <div className="grid mt-5 grid-cols-1 md:grid-cols-2    min-h-[600px] md:h-screen mb-10   text-5xl md:text-5xl lg:text-7xl  ">
      <div className="md:flex md:items-center md:justify-center ">
        <div>
          <div>
            <Available />
          </div>
          <div
            className={cn(" font-extrabold    uppercase", unbounded.className)}
          >
            Hi I&apos;m Brandon,
            <br /> <div className="z-[999]"></div>
            <NewTypewriter />
            <br />
            <p className="  ">creating design.</p>
          </div>
        </div>
      </div>

      <div className=" z-[-1] relative overflow-auto md:overflow-visible min-h-[500px] md:min-h-auto">
        <div className=" absolute">
          <MaksedDivDemo />
        </div>
      </div>
    </div>
  );
}
