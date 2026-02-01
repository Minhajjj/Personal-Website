"use client";
import {
  cleanupFooterAnimations,
  initializeFooterAnimations,
  refreshAnimationsOnResizeFooter,
} from "@/lib/gsapAnimations";
import React, { useEffect, useState } from "react";

const Footer: React.FC = () => {
  const name: string = "MINHAJ";
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    // Set current year only on client side to avoid hydration mismatch
    setCurrentYear(new Date().getFullYear());

    // Initialize animations when component mounts
    const timer = setTimeout(() => {
      initializeFooterAnimations();
    }, 100);

    // Handle window resize
    const handleResize = () => {
      refreshAnimationsOnResizeFooter();
    };

    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
      cleanupFooterAnimations();
    };
  }, []);

  return (
    <footer className="bg-[#211E1F] min-h-screen font-sans flex flex-col text-white footer-animation relative z-0">
      {/* Big Brand Name - Aligned to top */}
      <h1 className="gradient-text bg-clip-text text-transparent text-[clamp(5rem,25vw,16rem)] sm:text-[clamp(10.5rem,19vw,16rem)] md:text-[clamp(8rem,25vw,18rem)] lg:text-[clamp(10rem,25vw,24rem)] font-semibold mb-20 tracking-wide leading-[0.9] m-0 p-0 block overflow-hidden">
        {name}
      </h1>

      {/* Navigation Links */}
      <div className="mt-auto mb-20 px-4">
        <p className="text-sm text-[#C4C2B7] mb-6 tracking-widest">SITEMAP</p>
        <nav className="flex flex-col text-left text-xl md:text-2xl font-medium space-y-3">
          <a
            href="#about"
            className="hover:text-[#D9D7AF] transition-colors duration-300"
            aria-label="Navigate to About section"
          >
            About
          </a>
          <a
            href="#services"
            className="hover:text-[#D9D7AF] transition-colors duration-300"
            aria-label="Navigate to Services section"
          >
            Services
          </a>
          <a
            href="#projects"
            className="hover:text-[#D9D7AF] transition-colors duration-300"
            aria-label="Navigate to Projects section"
          >
            Projects
          </a>
          <a
            href="#contact"
            className="hover:text-[#D9D7AF] transition-colors duration-300"
            aria-label="Navigate to Contact section"
          >
            Contact
          </a>
        </nav>
      </div>

      {/* Copyright - Fixed hydration issue */}
      <p className="text-sm text-[#C4C2B7] mb-6 px-4 self-end">
        © {currentYear || "2024"} {name}. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
