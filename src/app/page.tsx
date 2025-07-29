import Available from "@/components/available";
import Portfolio from "../components/portfolio/portfolio";

import Link from "next/link";
import { HeroNew } from "@/components/HeroNew";

export default function Home() {
  return (
    <div>
      {" "}
      <div className="h-screen">
        <div>
          <HeroNew />
        </div>
      </div>
      <div className="z-[2] bg-background">
        <Available />
      </div>{" "}
      <div className="z-[2]  bg-background">
        <Portfolio />
      </div>
    </div>
  );
}
