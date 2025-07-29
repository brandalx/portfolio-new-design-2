import { cn } from "@/lib/utils";
import MaksedDivDemo from "./maskedDivMain";
import NewTypewriter from "./NewTypewriter";

export function HeroNew() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[8fr_4fr] h-screen">
      <div className="h-full flex flex-col justify-center max-h-fit">
        <div className="max-w-lg mx-auto">
          <h1
            className={cn(
              "text-3xl font-extrabold md:text-5xl lg:text-6xl customFont uppercase"
            )}
          >
            Hi I&apos;m Brandon,
            <br />
            <NewTypewriter />
            <br />
            <p className="text-3xl md:text-5xl lg:text-6xl">creating design.</p>
          </h1>
          <p className="mt-5 text-muted-foreground sm:text-lg">
            A full stack developer based in Canada. I&apos;m passionate about
            building modern applications
          </p>
        </div>
      </div>
      <div className="marquee-hero z-[-1]">
        <div className="marquee-item">
          <MaksedDivDemo />
          <div className="mt-15">
            <MaksedDivDemo />
          </div>
          <div className="mt-15">
            <MaksedDivDemo />
          </div>
          <div className="mt-15">
            <MaksedDivDemo />
          </div>
        </div>
      </div>
    </div>
  );
}
