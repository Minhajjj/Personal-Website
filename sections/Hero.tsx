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
import React, { useRef, useEffect, useState } from "react";

const Hero = () => {
  const minhajRef = useRef<MinhajRef>(null);
  const para1Ref = useRef<HTMLParagraphElement>(null);
  const para2Ref = useRef<HTMLParagraphElement>(null);
  const dref1 = useRef<HTMLDivElement>(null);
  const href1 = useRef<HTMLHeadingElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Ensure component is mounted before running animations
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || typeof window === "undefined") return;

    const timer = setTimeout(() => {
      if (minhajRef.current?.text) {
        animateMinhaj(minhajRef.current);
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted || typeof window === "undefined") return;

    const timer = setTimeout(() => {
      if (dref1.current) {
        animateHeroDiv(dref1.current);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted || typeof window === "undefined") return;

    const timer = setTimeout(() => {
      if (para1Ref.current && para2Ref.current) {
        animateLines([para1Ref.current, para2Ref.current]);
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted || typeof window === "undefined") return;

    const timer = setTimeout(() => {
      if (href1.current) {
        animateHeading(href1.current);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [isMounted]);

  return (
    <div className="min-h-screen flex flex-col justify-center mb-40 gap-50 px-4 sm:px-6 md:px-0">
      <section>
        <Minhaj ref={minhajRef} />
        <div className="font-mono font-semibold mt-4 flex flex-col gap-50 text-md md:flex-row md:items-start md:justify-between">
          <p ref={para1Ref} className="pl-3 md:pl-5 lg:pl-8">
            CREATIVE STUDIO
          </p>
          <p ref={para2Ref} className="pl-3 md:pl-5 lg:pl-8 lg:pr-13">
            HELPING FORWARD-THINKING BUSINESSES LEAVE A LASTING IMPRESSION
          </p>
        </div>

        <div
          ref={dref1}
          className="flex font-bold font-sans flex-col mt-60 gap-2 justify-center px-3 text-center text-[clamp(2rem,5vw,3rem)] leading-[1.1] md:px-0 md:items-center md:text-center py-20"
        >
          <p className="Line1">
            Crafting distinctive brands, websites, and content
          </p>
          <p className="Line2">that help forward-thinking companies thrive.</p>
        </div>
      </section>

      <section className="w-full mt-[-150px] overflow-hidden">
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
        <div className="mt-15 flex justify-center flex-col items-center gap-10 px-3 md:px-0 ">
          <p className="text-3xl font-semibold font-sans">
            Let's get you closer to your goals
          </p>
          <HeroCard />
        </div>
      </section>
    </div>
  );
};

export default Hero;
