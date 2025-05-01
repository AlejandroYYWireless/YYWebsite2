"use client";

import { Button } from "@/components/ui/button";
import { Pause, Play } from "lucide-react";
import { useState, useEffect } from "react";

export const HeroVideoControls = ({ videoId }: { videoId: string }) => {
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const videoElement = document.getElementById(videoId) as HTMLVideoElement;
    if (!videoElement) return;

    if (isPlaying) {
      videoElement.play().catch((error) => {
        console.error("Error playing video:", error);
      });
    } else {
      videoElement.pause();
    }
  }, [isPlaying, videoId]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <Button
      className="absolute cursor-pointer bottom-8 right-8 rounded-full bg-black/40 backdrop-blur-md"
      size={"icon"}
      onClick={togglePlayPause}
      aria-label={isPlaying ? "Pause video" : "Play video"}
    >
      {isPlaying ? <Pause /> : <Play />}
    </Button>
  );
};
