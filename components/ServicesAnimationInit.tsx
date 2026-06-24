"use client";

import { useEffect } from "react";
import {
  cleanupServicesAnimations,
  initializeServicesAnimations,
  refreshAnimationsOnResize,
} from "@/lib/gsapAnimations";

export default function ServicesAnimationInit() {
  useEffect(() => {
    initializeServicesAnimations();
    refreshAnimationsOnResize();

    return () => {
      cleanupServicesAnimations();
    };
  }, []);

  return null;
}
