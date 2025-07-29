import Portfolio from "../components/portfolio/portfolio";

import { HeroNew } from "@/components/HeroNew";

export default function Home() {
  return (
    <div>
      <div className="">
        <HeroNew />
      </div>

      <div className="z-[2]  bg-background">
        <Portfolio />
      </div>
    </div>
  );
}
