"use client";
import React, { useRef, useEffect, useState } from "react";
import { showNavbar, hideNavbar } from "@/lib/gsapAnimations";
import { gsap } from "gsap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiHome,
  HiViewGrid,
  HiCog,
  HiMail,
  HiCloudUpload,
} from "react-icons/hi";

const NAV_LINKS = [
  { href: "/", label: "Home", shortLabel: "Home", Icon: HiHome },
  { href: "/projects", label: "Projects", shortLabel: "Work", Icon: HiViewGrid },
  { href: "/#services", label: "Services", shortLabel: "Services", Icon: HiCog },
  { href: "/contact", label: "Contact", shortLabel: "Contact", Icon: HiMail },
  { href: "/deploy", label: "Deploy", shortLabel: "Deploy", Icon: HiCloudUpload },
] as const;

const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);
  const isHidden = useRef(false);
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!navRef.current) return;

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

  const isActive = (href: string) => {
    if (!mounted) return false;
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <nav
      ref={navRef}
      className="fixed inset-x-0 bottom-0 z-[9999] pointer-events-none"
      style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
      aria-label="Main navigation"
    >
      {/* Mobile + tablet: icon bottom bar */}
      <div className="xl:hidden pointer-events-auto mx-2 mb-1 sm:mx-4">
        <div className="flex items-stretch justify-between gap-0.5 font-mono text-[#F8F6F4] bg-[#766c6fe6] rounded-2xl px-1 py-1.5 shadow-lg backdrop-blur-md border border-white/10">
          {NAV_LINKS.map(({ href, shortLabel, Icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex flex-1 min-w-0 flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-2 transition-colors duration-200 ${
                  active
                    ? "bg-black/30 text-white"
                    : "text-[#F8F6F4]/85 hover:bg-black/20 hover:text-white"
                }`}
                aria-current={active ? "page" : undefined}
              >
                <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                <span className="text-[9px] sm:text-[10px] leading-none truncate max-w-full">
                  {shortLabel}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Desktop: centered pill */}
      <div className="hidden xl:flex pointer-events-auto justify-center px-4">
        <div className="flex items-center flex-row gap-0.5 font-mono text-[#F8F6F4] bg-[#766c6fb3] rounded-full px-6 py-1 shadow-lg backdrop-blur-sm">
          {NAV_LINKS.map(({ href, label }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                className={`px-4 py-2 rounded-full transition-all duration-300 hover:bg-black/30 whitespace-nowrap text-sm ${
                  active ? "bg-black/30" : ""
                }`}
                aria-current={active ? "page" : undefined}
              >
                {label.toUpperCase()}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
