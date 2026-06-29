"use client";

import HeroCard from "@/components/HeroCard";
import Minhaj, { MinhajRef } from "@/components/Name";
import Image from "next/image";
import Orbit from "@/components/Orbit";
import {
  animateHeading,
  animateHeroDiv,
  animateLines,
  animateMinhaj,
} from "@/lib/gsapAnimations";
import { useRef, useEffect, useLayoutEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MorphText } from "./ui/morph-text";

// ─────────────────────────────────────────────────────────────────────────────
// TypewriterText
// Used on MOBILE ONLY for the two sub-label lines ("CREATIVE STUDIO" / tagline).
// On desktop, GSAP's animateLines handles them instead.
// ADJUSTABLE: `delay` controls typing speed in ms per character.
// ─────────────────────────────────────────────────────────────────────────────
const TypewriterText = ({
  text,
  delay = 50,
  start = true,
  onComplete,
}: {
  text: string;
  delay?: number;
  start?: boolean;
  onComplete?: () => void;
}) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!start) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayedText(text.substring(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, delay);
    return () => clearInterval(interval);
  }, [start, text, delay]);

  return <span>{displayedText}</span>;
};

// ─────────────────────────────────────────────────────────────────────────────
// HeroContent
// ─────────────────────────────────────────────────────────────────────────────
export default function HeroContent() {
  const minhajRef = useRef<MinhajRef>(null);
  const para1Ref = useRef<HTMLParagraphElement>(null);
  const para2Ref = useRef<HTMLParagraphElement>(null);
  const dref1 = useRef<HTMLDivElement>(null);
  const href1 = useRef<HTMLHeadingElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [line1Done, setLine1Done] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useLayoutEffect(() => {
    if (!isMounted || typeof window === "undefined") return;

    const timer = setTimeout(() => {
      if (minhajRef.current?.text) animateMinhaj(minhajRef.current);
      if (dref1.current) animateHeroDiv(dref1.current);
      if (para1Ref.current && para2Ref.current) {
        if (window.innerWidth >= 768) {
          animateLines([para1Ref.current, para2Ref.current]);
        }
      }
      if (href1.current) animateHeading(href1.current);
      setTimeout(() => ScrollTrigger.refresh(true), 100);
    }, 50);

    return () => clearTimeout(timer);
  }, [isMounted]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleLoad = () => setTimeout(() => ScrollTrigger.refresh(true), 200);
    window.addEventListener("load", handleLoad);
    return () => window.removeEventListener("load", handleLoad);
  }, []);

  return (
    // ── OUTER PAGE WRAPPER ───────────────────────────────────────────────────
    // No horizontal padding here — the hero section is intentionally full-bleed.
    // ADJUSTABLE: `mb-20 md:mb-40` = bottom margin before footer/next section.
    <div className="flex flex-col mb-20 md:mb-40 w-full">

      {/* ═══════════════════════════════════════════════════════════════════════
          HERO SECTION
          ───────────────────────────────────────────────────────────────────────
          Desktop layout: LEFT column (text, 55% wide) | RIGHT image (45% wide, absolute).
          Mobile layout:  stacked — text on top, image below.

          `h-screen` locks the section to exactly one viewport height on desktop.
          `relative` is required so the absolute image is scoped to this section.
          `overflow-hidden` prevents the image from causing a horizontal scrollbar.
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full flex flex-col md:flex-row h-auto md:h-screen overflow-hidden">

        {/* ──────────────────────────────────────────────────────────────────
            LEFT COLUMN — all text content
            ──────────────────────────────────────────────────────────────────
            ADJUSTABLE:
            • `md:w-[55%]` — share of the viewport given to text.
              Must complement the image width below (currently 45%).
            • `pl-6 md:pl-16 lg:pl-24` — left padding / text inset from edge.
              Increase for a more generous margin, decrease to go edge-closer.
            • `gap-8` — vertical space between the name block and the sub-labels.
        */}
        <div
          className="
            relative z-10
            w-full md:w-[55%]
            flex flex-col justify-center
            pl-6 pr-6 md:pl-16 md:pr-8 lg:pl-24
            py-16 md:py-0
            gap-8
          "
        >

          {/* ── STACKED TYPOGRAPHY BLOCK ─────────────────────────────────── */}
          <div className="w-full flex flex-col gap-1 md:gap-2">

            {/* 1. TOP LINE: Static Name */}
            {/* ADJUSTABLE: Changed font size to a significantly larger tier.
                • clamp(4rem, 10vw, 11rem) means minimum size 4rem on mobile, fluids scales up to 11rem max on large layouts.
                • Change font-extrabold or leading-none to refine text weights. */}
            <h1
              style={{ fontSize: "clamp(4rem, 10vw, 11rem)" }}
              className="font-sans font-extrabold text-[#211E1F] leading-none text-left tracking-tight"
            >
              MINHAJ
            </h1>

            {/* 2. BOTTOM LINE: Morphing Words */}
            {/* ADJUSTABLE: Removed staticPrefix to isolate this to its own row.
                • Size matches standard header viewport constraints. */}
            <MorphText
              words={["CREATE", "DESIGN", "DEPLOY"]}
              fontSize="clamp(2.5rem, 6vw, 5.5rem)"
              className="!py-0"
              textClassName="text-[#211E1F] justify-start"
            />
          </div>

          {/* ── SUB-LABELS BLOCK ──────────────────────────────────────────
              Design pattern: vertical rule on the left, both lines stacked
              under it — editorial / minimal. Avoids the generic two-column split.

              ADJUSTABLE:
              • `border-l-2 border-[#211E1F]` — rule thickness and color.
              • `pl-4` — gap between rule and text.
              • `gap-2` — vertical gap between line 1 and line 2.
              • `text-sm` / `md:text-xs lg:text-sm` — label text size.
              • `max-w-xs` on para2 — caps tagline width to force a natural wrap.
                Remove if you want it on one line.
          */}
          <div
            className="
              border-l-2 border-[#211E1F]
              pl-4
              flex flex-col gap-2
              font-mono font-semibold
              text-sm md:text-xs lg:text-sm
              text-[#211E1F]
            "
          >
            {/* Line 1: Studio role */}
            {/* ADJUSTABLE: `tracking-widest` — reduce to `tracking-wider` for tighter kerning */}
            <p ref={para1Ref} className="uppercase tracking-widest">
              {isMobile && isMounted ? (
                <TypewriterText
                  text="CREATIVE STUDIO"
                  delay={50}
                  onComplete={() => setLine1Done(true)}
                />
              ) : (
                "CREATIVE STUDIO"
              )}
            </p>

            {/* Line 2: Value proposition / tagline */}
            {/* ADJUSTABLE: `max-w-xs` (~320px). Change to `max-w-sm` / `max-w-md` for wider. */}
            <p ref={para2Ref} className="uppercase tracking-widest max-w-xs leading-relaxed">
              {isMobile && isMounted ? (
                <TypewriterText
                  text="HELPING FORWARD-THINKING BUSINESSES LEAVE A LASTING IMPRESSION"
                  delay={40}
                  start={line1Done}
                />
              ) : (
                "HELPING FORWARD-THINKING BUSINESSES LEAVE A LASTING IMPRESSION"
              )}
            </p>
          </div>

        </div>
        {/* ── END LEFT COLUMN ────────────────────────────────────────────── */}


        {/* ──────────────────────────────────────────────────────────────────
            RIGHT COLUMN — full-bleed portrait image

            DESKTOP STRATEGY (absolute positioning):
            The image wrapper is `absolute top-0 right-0 bottom-0` so it
            literally touches the top edge, right edge, and bottom edge of the
            viewport with ZERO gap, padding, or border-radius.
            `w-[45%]` matches the space NOT taken by the left column.

            MOBILE STRATEGY (normal flow):
            Falls back to a block `60vh` tall. Full width. Zero rounding.

            ADJUSTABLE:
            • `w-[45%]` on the desktop div — must = 100% minus left column %.
            • `h-[60vh]` on the mobile div — ADJUSTABLE to make it taller/shorter.
            • `object-top` — anchors photo from top (good for portrait/headshot).
              Change to `object-center` to vertically center, or
              `object-[top_15%]` to nudge face position down slightly.
        */}

        {/* MOBILE image — normal document flow, full width */}
        <div className="block md:hidden w-full h-[60vh] overflow-hidden">
          {/* ADJUSTABLE: swap object-top → object-center if face is being cropped on mobile */}
          <Image
            src="/minhajpic.png"
            alt="Minhaj"
            width={800}
            height={1000}
            priority
            quality={90}
            className="h-full w-full object-cover object-top"
          />
        </div>

        {/* DESKTOP image — absolute, zero-padding, edge-to-edge on the right */}
        {/*
          ADJUSTABLE:
          • `w-[45%]` — change this together with left column's `md:w-[55%]`.
            They must add up to 100%. Example: 60/40, 50/50, 65/35.
          • `top-0 right-0 bottom-0` — do NOT add padding here; that would
            create a gap between the image and the viewport edge.
        */}
        <div
          className="
            hidden md:block
            absolute top-0 right-0 bottom-0
            w-[45%]
            overflow-hidden
          "
        >
          {/* Next.js `fill` prop makes the image fill its positioned parent completely. */}
          {/* ADJUSTABLE: `object-top` keeps the face visible. Fine-tune with object-[top_X%]. */}
          <Image
            src="/minhajpic.png"
            alt="Minhaj"
            fill
            priority
            quality={90}
            sizes="45vw"
            className="object-cover object-top"
          />
        </div>

      </section>
      {/* ═══════════════════════════════════ END HERO SECTION ══════════════ */}


      {/* ═══════════════════════════════════════════════════════════════════════
          CENTRAL STATEMENT SECTION
          ADJUSTABLE: `mt-20 md:mt-40` — breathing room between hero and statement.
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="w-full flex flex-col items-center justify-center mt-20 md:mt-40">
        <div
          ref={dref1}
          className="
            flex font-bold font-sans flex-col
            gap-2 justify-center
            px-3 md:px-0
            text-center
            text-[clamp(2rem,5vw,3rem)]
            leading-[1.1]
            md:items-center
            py-20 w-full
          "
        >
          <p className="Line1">Crafting distinctive brands, websites, content</p>
          <p className="Line2">that help forward-thinking companies thrive.</p>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════════════
          ORBIT UNIVERSE SECTION
          ADJUSTABLE: `-mt-37.5` — pulls orbit up to close gap with statement.
          Change to `-mt-20` or `mt-0` if you want more separation.
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="w-full -mt-37.5 overflow-hidden">
        <h2
          ref={href1}
          className="font-sans text-center text-4xl py-25 font-semibold"
        >
          <span className="inline-block overflow-hidden">
            <span className="inline-block">My Universe of Tools</span>
          </span>
        </h2>
        <div className="w-full flex justify-center">
          <Orbit />
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════════════
          CTA GOALS SECTION
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="w-full">
        <div className="mt-15 flex justify-center flex-col items-center gap-10 px-3 md:px-0">
          <p className="text-3xl font-semibold font-sans text-center">
            Let&apos;s get you closer to your goals
          </p>
          <HeroCard />
        </div>
      </section>

    </div>
  );
}