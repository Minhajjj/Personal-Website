"use client";

import HeroCard from "@/components/HeroCard";
import Minhaj, { MinhajRef } from "@/components/Name";
import Orbit from "@/components/Orbit";
import {
  animateHeading,
  animateHeroDiv,
  animateLines,
  animateMinhaj,
} from "@/lib/gsapAnimations";
import { useRef, useEffect, useLayoutEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TypewriterText = ({ 
  text, 
  delay = 50, 
  start = true, 
  onComplete 
}: { 
  text: string, 
  delay?: number, 
  start?: boolean, 
  onComplete?: () => void 
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, text, delay]);

  // Add a blinking cursor or minimal min-height if desired, but returning text is enough.
  return <span>{displayedText}</span>;
};

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
        // Only run GSAP scroll animations on these lines if not on mobile
        if (window.innerWidth >= 768) {
          animateLines([para1Ref.current, para2Ref.current]);
        }
      }
      if (href1.current) animateHeading(href1.current);

      setTimeout(() => {
        ScrollTrigger.refresh(true);
      }, 100);
    }, 50);

    return () => clearTimeout(timer);
  }, [isMounted]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleLoad = () => {
      setTimeout(() => ScrollTrigger.refresh(true), 200);
    };
    window.addEventListener("load", handleLoad);
    return () => window.removeEventListener("load", handleLoad);
  }, []);

  return (
    <div className="min-h-screen flex flex-col mb-20 md:mb-40 gap-8 md:gap-50">
      <section>
        <Minhaj ref={minhajRef} />

        <div className="font-mono font-semibold mt-4 flex flex-col gap-4 md:gap-50 text-sm md:text-md md:flex-row md:items-start md:justify-between px-4 sm:px-6 md:px-8">
          <p ref={para1Ref} className="min-h-[1.5rem]">
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
          <p ref={para2Ref} className="max-w-xl min-h-[3rem]">
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

        <div
          ref={dref1}
          className="flex font-bold font-sans flex-col mt-60 gap-2 justify-center px-3 text-center text-[clamp(2rem,5vw,3rem)] leading-[1.1] md:px-0 md:items-center md:text-center py-20"
        >
          <p className="Line1">
            Crafting distinctive brands, websites, content
          </p>
          <p className="Line2">that help forward-thinking companies thrive.</p>
        </div>
      </section>

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

      <section>
        <div className="mt-15 flex justify-center flex-col items-center gap-10 px-3 md:px-0">
          <p className="text-3xl font-semibold font-sans">
            Let&apos;s get you closer to your goals
          </p>
          <HeroCard />
        </div>
      </section>
    </div>
  );
}
