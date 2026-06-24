"use client";

import { useEffect } from "react";
import {
  cleanupFooterAnimations,
  initializeFooterAnimations,
  refreshAnimationsOnResizeFooter,
} from "@/lib/gsapAnimations";

export default function FooterAnimationInit() {
  useEffect(() => {
    const timer = setTimeout(() => {
      initializeFooterAnimations();
    }, 100);

    const handleResize = () => {
      refreshAnimationsOnResizeFooter();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
      cleanupFooterAnimations();
    };
  }, []);

  return null;
}
