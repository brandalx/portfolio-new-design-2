import ImageTrail from "@/components/imageTrail";
import Portfolio from "../components/portfolio/portfolio";

import { HeroNew } from "@/components/HeroNew";

export default function Home() {
  return (
    <div>
      <div className="mt-10">
        {/* <ImageTrail
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
        /> */}
        <HeroNew />
      </div>

      <div className="z-[2]  bg-background">
        <Portfolio />
      </div>
    </div>
  );
}
