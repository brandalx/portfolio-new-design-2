// Loader.tsx
"use client";

import { Html, useProgress } from "@react-three/drei";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState, useRef } from "react";

export default function Loader() {
  const { progress, loaded, total, item } = useProgress();
  const [displayProgress, setDisplayProgress] = useState(0);
  const progressRef = useRef(progress);

  useEffect(() => {
    progressRef.current = progress;
    const timer = setTimeout(() => {
      setDisplayProgress(Math.min(progressRef.current, 100));
    }, 100); // Increased delay to ensure render cycle completes
    return () => clearTimeout(timer);
  }, [progress]);

  console.log({ progress, loaded, total, item });

  return (
    <Html center>
      <Card className="bg-black border-none text-white w-64">
        <CardContent className="flex flex-col items-center gap-4 p-4 border-none">
          <div className="p-3 animate-spin drop-shadow-2xl bg-gradient-to-bl from-pink-400 via-purple-400 to-indigo-600 md:w-48 md:h-48 h-32 w-32 aspect-square rounded-full">
            <div className="rounded-full h-full w-full bg-black dark:bg-zinc-900 background-blur-md" />
          </div>
          <Progress value={displayProgress} className="w-full mt-4" />
          <span className="text-sm">{displayProgress.toFixed(0)}%</span>
          <span className="text-xs">Loading: {item || "unknown"}</span>
        </CardContent>
      </Card>
    </Html>
  );
}
