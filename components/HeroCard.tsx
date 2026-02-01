import React, { useEffect, useRef } from "react";
import { GoGoal } from "react-icons/go";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { FaRankingStar } from "react-icons/fa6";
import { FaRegHandshake } from "react-icons/fa";
import { animateCards } from "@/lib/gsapAnimations";

const HeroCard = () => {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const cards = [
    {
      logo: <GoGoal size={30} />,
      title: "Goal-Oriented Design",
      text: "Your website should move you closer to your business goals. I design and develop with strategy in mind — not just looks.",
    },
    {
      logo: <IoChatbubbleEllipsesOutline size={30} />,
      title: "Clear Communication",
      text: "Every brand needs a story that clicks. I make sure your audience quickly understands who you are, and why you’re the right choice.",
    },
    {
      logo: <FaRankingStar size={30} />,
      title: "Stand Out in the Crowd",
      text: "Generic templates don’t cut it. I craft unique, tailored experiences that set you apart from your competitors.",
    },
    {
      logo: <FaRegHandshake size={30} />,
      title: "Collaboration First",
      text: "I listen, adapt, and co-create. You bring the vision, I bring the skills — together we make it happen.",
    },
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;
    const validCards = cardRefs.current.filter(
      (el): el is HTMLDivElement => el !== null
    );
    animateCards(validCards);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
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
          className="group relative bg-[#E1E0D7] shadow-md rounded-xl p-6 transition-all duration-300 hover:bg-[#d6d5cd] cursor-pointer overflow-hidden"
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

export default HeroCard;
