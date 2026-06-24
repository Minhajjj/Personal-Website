"use client";

import { useEffect, useRef } from "react";

interface AutoplayVideoProps {
  src: string;
  className?: string;
}

const AutoplayVideo = ({ src, className }: AutoplayVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("webkit-playsinline", "true");

    const tryPlay = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          /* Autoplay blocked — IntersectionObserver / interaction will retry */
        });
      }
    };

    tryPlay();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            tryPlay();
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.2 },
    );

    observer.observe(video);

    const onInteraction = () => tryPlay();
    document.addEventListener("touchstart", onInteraction, {
      passive: true,
      once: true,
    });
    document.addEventListener("scroll", onInteraction, {
      passive: true,
      once: true,
    });

    video.addEventListener("loadeddata", tryPlay);

    return () => {
      observer.disconnect();
      video.removeEventListener("loadeddata", tryPlay);
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      disablePictureInPicture
      className={className}
    />
  );
};

export default AutoplayVideo;
