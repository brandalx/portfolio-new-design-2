"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Pause, Play } from "lucide-react";

export default function MusicControls() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playButtonRef = useRef<HTMLButtonElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);

  // Simulate click on play button when component mounts
  useEffect(() => {
    if (audioRef.current && playButtonRef.current) {
      audioRef.current.volume = volume;

      // Small delay to ensure everything is loaded
      const timer = setTimeout(() => {
        if (playButtonRef.current) {
          playButtonRef.current.click();
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  return (
    <div className="absolute top-4 right-4  bg-black/60 rounded-xl p-3 flex items-center gap-3">
      <audio ref={audioRef} src="/music/delorra.mp3" loop preload="auto" />
      <Button
        ref={playButtonRef}
        variant="secondary"
        size="icon"
        onClick={togglePlay}
        className="rounded-full backdrop-blur-2xl"
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? (
          <div title="Pause Music">
            {" "}
            <Pause className="w-4 h-4" />
          </div>
        ) : (
          <div title="Play Music">
            {" "}
            <Play className="w-4 h-4" />
          </div>
        )}
      </Button>
      <Slider
        defaultValue={[volume * 100]}
        max={100}
        step={1}
        className="w-24"
        onValueChange={(v) => setVolume(v[0] / 100)}
      />
    </div>
  );
}
