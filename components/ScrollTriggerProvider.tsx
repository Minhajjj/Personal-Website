"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollTriggerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // CRITICAL: Sync Lenis with ScrollTrigger
  const lenis = useLenis(ScrollTrigger.update);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Sync ScrollTrigger with Lenis smooth scrolling
    ScrollTrigger.refresh(true);

    // Refresh after fonts load
    document.fonts.ready.then(() => {
      setTimeout(() => {
        ScrollTrigger.refresh(true);
        console.log("✅ ScrollTrigger refreshed after fonts");
      }, 100);
    });

    // Refresh on window load
    const handleLoad = () => {
      setTimeout(() => {
        ScrollTrigger.refresh(true);
        console.log("✅ ScrollTrigger refreshed on load");
      }, 200);
    };

    window.addEventListener("load", handleLoad);

    // Debounced resize
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh(true);
        console.log("✅ ScrollTrigger refreshed on resize");
      }, 250);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("load", handleLoad);
      window.removeEventListener("resize", handleResize);
    };
  }, [lenis]);

  return <>{children}</>;
}
