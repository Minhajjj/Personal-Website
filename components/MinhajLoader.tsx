"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface LoaderProps {
  onLoadingComplete?: () => void;
  duration?: number;
}

const MinhajLoader: React.FC<LoaderProps> = ({
  onLoadingComplete,
  duration = 3,
}) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const mLetterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Smooth exit animation - scale up and fade
          gsap.to(loaderRef.current, {
            scale: 1.2,
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: () => {
              if (onLoadingComplete) {
                onLoadingComplete();
              }
            },
          });
        },
      });

      // Stage 1: Geometric M builds itself (0-1s)
      tl.fromTo(
        mLetterRef.current,
        {
          scale: 0,
          rotation: -180,
          opacity: 0,
        },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 1,
          ease: "back.out(1.7)",
        }
      );

      // Stage 2: M pulses and letters appear (1-2s)
      tl.to(
        mLetterRef.current,
        {
          scale: 1.1,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut",
        },
        "+=0.2"
      );

      // Letters slide in one by one
      letterRefs.current.forEach((letter, index) => {
        if (letter) {
          tl.fromTo(
            letter,
            {
              x: -50,
              opacity: 0,
              rotationY: -90,
            },
            {
              x: 0,
              opacity: 1,
              rotationY: 0,
              duration: 0.3,
              ease: "power3.out",
            },
            index === 0 ? "-=0.5" : "-=0.2"
          );
        }
      });

      // Stage 3: Circle expands (2-2.5s)
      tl.fromTo(
        circleRef.current,
        {
          scale: 0,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.3"
      );

      // Stage 4: Progress bar fills (throughout)
      tl.fromTo(
        progressBarRef.current,
        {
          scaleX: 0,
        },
        {
          scaleX: 1,
          duration: duration - 0.8, // Leave time for exit animation
          ease: "power1.inOut",
        },
        0
      );

      // Rotate circle continuously
      gsap.to(circleRef.current, {
        rotation: 360,
        duration: 2,
        repeat: -1,
        ease: "linear",
      });
    });

    return () => ctx.revert();
  }, [duration, onLoadingComplete]);

  const letters = ["M", "I", "N", "H", "A", "J"];

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#D9D7CB]"
      style={{
        willChange: "transform, opacity",
      }}
    >
      {/* Main content */}
      <div className="relative flex flex-col items-center gap-12">
        {/* Rotating decorative circle */}
        <div
          ref={circleRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-[#1a1a1a]/10 rounded-full opacity-0"
        />

        {/* Name container */}
        <div className="flex items-center gap-4 perspective-1000">
          {/* Large M */}
          <div
            ref={mLetterRef}
            className="relative text-[8rem] font-black text-[#1a1a1a] leading-none opacity-0"
          >
            M
            {/* Decorative dots */}
            <div className="absolute -top-2 -right-2 w-3 h-3 bg-[#1a1a1a] rounded-full" />
            <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-[#1a1a1a] rounded-full" />
          </div>

          {/* Rest of the letters */}
          <div className="flex gap-1">
            {letters.slice(1).map((letter, index) => (
              <span
                key={index}
                ref={(el) => {
                  letterRefs.current[index] = el;
                }}
                className="text-5xl font-black text-[#1a1a1a] opacity-0"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {letter}
              </span>
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-64 h-1 bg-[#1a1a1a]/10 rounded-full overflow-hidden">
          <div
            ref={progressBarRef}
            className="h-full bg-[#1a1a1a] origin-left rounded-full"
            style={{ transform: "scaleX(0)" }}
          />
        </div>

        {/* Loading text */}
        <div className="text-xs font-bold tracking-[0.3em] uppercase text-[#1a1a1a]/40">
          Loading Experience
        </div>
      </div>

      {/* Corner accents */}
      <div className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-[#1a1a1a]/10" />
      <div className="absolute top-8 right-8 w-12 h-12 border-r-2 border-t-2 border-[#1a1a1a]/10" />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-l-2 border-b-2 border-[#1a1a1a]/10" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-[#1a1a1a]/10" />
    </div>
  );
};

export default MinhajLoader;