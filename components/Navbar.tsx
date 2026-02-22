"use client";
import React, { useRef, useEffect } from "react";
import { showNavbar, hideNavbar } from "@/lib/gsapAnimations";
import { gsap } from "gsap";
import Link from "next/link";

const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);
  const isHidden = useRef(false);

  useEffect(() => {
    if (!navRef.current) return;

    // Set known starting state
    gsap.set(navRef.current, { y: 0, opacity: 1 });

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        if (!isHidden.current && navRef.current) {
          hideNavbar(navRef.current);
          isHidden.current = true;
        }
      } else if (currentScrollY < lastScrollY.current) {
        if (isHidden.current && navRef.current) {
          showNavbar(navRef.current);
          isHidden.current = false;
        }
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav ref={navRef} className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex justify-center items-center flex-row gap-1 font-mono text-[#F8F6F4] bg-[#766c6fb3] rounded-full px-6 py-1 shadow-lg backdrop-blur-sm">
        <Link
          href="/"
          className="px-4 py-2 rounded-full transition-all duration-300 hover:bg-black/30"
        >
          HOME
        </Link>
        <Link
          href="/projects"
          className="px-4 py-2 rounded-full transition-all duration-300 hover:bg-black/30"
        >
          PROJECTS
        </Link>
        <Link
          href="/#services"
          className="px-4 py-2 rounded-full transition-all duration-300 hover:bg-black/30"
        >
          SERVICES
        </Link>
        <Link
          href="/contact"
          className="px-4 py-2 rounded-full transition-all duration-300 hover:bg-black/30"
        >
          CONTACT
        </Link>
        <Link
          href="/deploy"
          className="px-4 py-2 rounded-full transition-all duration-300 hover:bg-black/30"
        >
          DEPLOY
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
