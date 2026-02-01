import React, { useState, useRef } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { FiActivity } from "react-icons/fi";
import { animateCardSlideIn, animateCardSlideOut } from "@/lib/gsapAnimations";

interface SectionTwoCardsInfoProps {
  title: string;
  description: string;
  points?: { point1: string; point2: string };
  link?: string; // Added link property
}

const SectionTwoCards: React.FC<SectionTwoCardsInfoProps> = ({
  title,
  description,
  points,
  link, // Accept link prop
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const defaultContentRef = useRef<HTMLDivElement>(null);
  const hoverContentRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (isHovered) return;
    setIsHovered(true);
    animateCardSlideIn(defaultContentRef.current, hoverContentRef.current);
  };

  const handleMouseLeave = () => {
    if (!isHovered) return;
    setIsHovered(false);
    animateCardSlideOut(defaultContentRef.current, hoverContentRef.current);
  };

  return (
    <div
      ref={cardRef}
      className="bg-[#C4C2B7] p-4 rounded-lg font-sans cursor-pointer relative overflow-hidden h-[180px] sm:h-[200px] md:h-[160px] lg:h-[180px] w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Default view - Title and Description */}
      <div
        ref={defaultContentRef}
        className="absolute inset-4 flex flex-col"
      >
        <h3 className="text-lg sm:text-xl font-bold text-black mb-2">{title}</h3>
        <p className="text-sm sm:text-base text-black leading-relaxed">{description}</p>
      </div>

      {/* Hover view - Points with icons */}
      <div
        ref={hoverContentRef}
        className="absolute inset-4 flex flex-col justify-center space-y-4 opacity-0 translate-x-full"
      >
        {points && (
          <>
            <div className="flex items-center gap-3">
              <FaRegCheckCircle className="text-green-700 text-lg flex-shrink-0" />
              <p className="text-sm sm:text-base text-black font-medium leading-relaxed">{points.point1}</p>
            </div>
            <div className="flex items-center gap-3">
              <FiActivity className="text-blue-700 text-lg flex-shrink-0" />
              <p className="text-sm sm:text-base text-black font-medium leading-relaxed">{points.point2}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SectionTwoCards;