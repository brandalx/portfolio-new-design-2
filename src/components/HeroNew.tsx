import { cn } from "@/lib/utils";
import MaksedDivDemo from "./maskedDivMain";
import NewTypewriter from "./NewTypewriter";
import ImageTrail from "./imageTrail";
import styles from "../app/MyComponent.module.css";
import unbounded from "@/lib/fonts"; // Import to ensure font is loaded
export function HeroNew() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2    h-svw md:h-screen  justify-center text-5xl md:text-5xl lg:text-7xl  ">
      <div className="flex items-center justify-center ">
        <h1 className={cn(" font-extrabold    uppercase", styles.customFont)}>
          Hi I&apos;m Brandon,
          <br /> <div className="z-[999]"></div>
          <NewTypewriter />
          <br />
          <p className="  ">creating design.</p>
        </h1>
      </div>

      <div className=" z-[-1] relative overflow-auto md:overflow-visible">
        <div className=" absolute">
          <MaksedDivDemo />
        </div>
      </div>
    </div>
  );
}
