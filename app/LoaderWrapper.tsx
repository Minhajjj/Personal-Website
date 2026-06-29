"use client";

import { useState, useEffect, useRef } from "react";
import MinhajLoader from "@/components/MinhajLoader";
import LenisProvider from "@/components/LenisProvider";
import ScrollTriggerProvider from "@/components/ScrollTriggerProvider";
import Navbar from "@/components/Navbar";
import { GlassDock } from "@/components/ui/glass-dock";
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
      setShowContent(true);

      const tl = gsap.timeline();

      if (loaderContainerRef.current) {
        tl.to(
          loaderContainerRef.current,
          { opacity: 0, duration: 0.8, ease: "power2.inOut" },
          0,
        );
      }

      if (contentRef.current) {
        tl.fromTo(
          contentRef.current,
          { opacity: 0, scale: 0.98 },
          { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" },
          0.2,
        );
      }

      // No ctx.revert() — we want the final state to persist
    }
  }, [loading]);

  return (
    <>
      {/* Navbar lives outside everything — never affected by any opacity/visibility */}
      {/* {!loading && <Navbar />} */}

      {!loading && (
        <GlassDock
          items={[
            { title: "Home", icon: "home", href: "/" },
            { title: "Projects", icon: "projects", href: "/projects" },
            { title: "Services", icon: "services", href: "/#services" },
            { title: "Contact", icon: "contact", href: "/contact" },
            { title: "Deploy", icon: "deploy", href: "/deploy" },
          ]}
          // Customize these props to adjust the navbar size
          mobileMaxWidth="92%" // Width on mobile (default: "95%")
          dockPadding="px-5 sm:px-8 py-3 sm:py-4" // Custom padding
          dockWidth="400px"
        />
      )}

      {loading && (
        <div ref={loaderContainerRef}>
          <MinhajLoader
            onLoadingComplete={() => setLoading(false)}
            duration={2}
          />
        </div>
      )}

      <div
        ref={contentRef}
        style={{
          opacity: 0,
          visibility: showContent ? "visible" : "hidden",
          willChange: "transform, opacity",
        }}
      >
        <LenisProvider>
          <ScrollTriggerProvider>{children}</ScrollTriggerProvider>
        </LenisProvider>
      </div>
    </>
  );
}
