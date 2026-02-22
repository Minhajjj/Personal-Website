"use client";

import { useState, useEffect, useRef } from "react";
import MinhajLoader from "@/components/MinhajLoader";
import LenisProvider from "@/components/LenisProvider";
import ScrollTriggerProvider from "@/components/ScrollTriggerProvider";
import Navbar from "@/components/Navbar";
import { gsap } from "gsap";

export default function LoaderWrapperCrossfade({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const loaderContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loading) {
      // Start showing content immediately when loading completes
      setShowContent(true);

      // Crossfade animation
      const ctx = gsap.context(() => {
        const tl = gsap.timeline();

        // Fade out loader (if container still exists)
        if (loaderContainerRef.current) {
          tl.to(
            loaderContainerRef.current,
            {
              opacity: 0,
              duration: 0.8,
              ease: "power2.inOut",
            },
            0,
          );
        }

        // Simultaneously fade in and scale up content
        tl.fromTo(
          contentRef.current,
          {
            opacity: 0,
            scale: 0.98,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power2.out",
          },
          0.2, // Slight delay for smoother crossfade
        );
      });

      return () => ctx.revert();
    }
  }, [loading]);

  return (
    <>
      {/* Loader with container for fade control */}
      {loading && (
        <div ref={loaderContainerRef}>
          <MinhajLoader
            onLoadingComplete={() => setLoading(false)}
            duration={3}
          />
        </div>
      )}

      {/* Content - hidden initially, fades in on load complete */}
      <div
        ref={contentRef}
        style={{
          opacity: showContent ? 0 : 0,
          visibility: showContent ? "visible" : "hidden",
          willChange: "transform, opacity",
        }}
      >
        <LenisProvider>
          <ScrollTriggerProvider>
            <Navbar />
            {children}
          </ScrollTriggerProvider>
        </LenisProvider>
      </div>
    </>
  );
}
