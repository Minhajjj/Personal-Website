import React, { useEffect, useRef } from "react";
import { LiaCompass } from "react-icons/lia";
import { IoMdColorPalette } from "react-icons/io";
import { CiGlobe } from "react-icons/ci";
import { MdHandshake } from "react-icons/md";
import { animateCards } from "@/lib/gsapAnimations";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const AboutCards = () => {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const cards = [
    {
      logo: <LiaCompass size={30} />,
      title: "Grounded in Strategy",
      text: "Every project begins with structure. From choosing the right stack to planning workflows, strategy ensures the end result is reliable and future-proof.",
    },
    {
      logo: <IoMdColorPalette size={30} />,
      title: "Creative with Purpose",
      text: "Creativity isn’t decoration. I design and code with intent — making sure every feature, animation, and detail adds real value.",
    },
    {
      logo: <CiGlobe size={30} />,
      title: "Digital-First, Future-Ready",
      text: "I build with today’s platforms in mind, but with room to grow. Optimized for speed, accessibility, and scalability from day one.",
    },
    {
      logo: <MdHandshake size={30} />,
      title: "A Partner You Can Rely On",
      text: "I don’t just hand over code — I leave you with systems that are maintainable, documented, and ready to evolve as your business does.",
    },
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;
    const validCards = cardRefs.current.filter(
      (el): el is HTMLDivElement => el !== null
    );
    animateCards(validCards);

    return () => {
      // Check if ScrollTrigger is available before using it
      if (typeof ScrollTrigger !== "undefined" && ScrollTrigger.getAll) {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      }
    };
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 font-sans gap-6 w-full max-w-4xl">
      {cards.map((card, idx) => (
        <div
          ref={(el) => {
            cardRefs.current[idx] = el;
          }}
          key={idx}
          className="group relative overflow-hidden bg-[#E1E0D7] shadow-md rounded-xl p-6 text-center"
        >
          <div className="mb-20 text-left flex text-[#333333]">{card.logo}</div>
          <h5 className="font-semibold text-xl mb-5 text-left">{card.title}</h5>

          {/* Hidden text appears on hover, absolutely positioned */}
          <p className="absolute inset-0 flex items-center justify-center p-4 text-gray-700 bg-[#E1E0D7] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            {card.text}
          </p>
        </div>
      ))}
    </div>
  );
};

export default AboutCards;
