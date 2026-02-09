import { animateIcons, animateRings } from "@/lib/gsapAnimations";
import React, { JSX, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { FaReact } from "react-icons/fa";
import {
  SiNextdotjs,
  SiCplusplus,
  SiTailwindcss,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiGit,
  SiGithub,
  SiFigma,
  SiNodedotjs,
  SiVercel,
  SiMongodb,
  SiGreensock,
  SiBootstrap,
  SiSanity,
} from "react-icons/si";

type Tool = {
  name: string;
  icon: JSX.Element;
};

// Shuffle function
function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

const Orbit: React.FC = () => {
  const center = "M";
  const iconRef = useRef<(HTMLElement | null)[]>([]);
  const ringRef = useRef<(HTMLElement | null)[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const tools: Tool[] = [
    { name: "React", icon: <FaReact /> },
    { name: "Next.js", icon: <SiNextdotjs /> },
    { name: "C++", icon: <SiCplusplus /> },
    { name: "Tailwind", icon: <SiTailwindcss /> },
    { name: "TypeScript", icon: <SiTypescript /> },
    { name: "JavaScript", icon: <SiJavascript /> },
    { name: "HTML", icon: <SiHtml5 /> },
    { name: "Bootstrap", icon: <SiBootstrap /> },
    { name: "CSS", icon: <SiCss3 /> },
    { name: "Git", icon: <SiGit /> },
    { name: "GitHub", icon: <SiGithub /> },
    { name: "Figma", icon: <SiFigma /> },
    { name: "Node.js", icon: <SiNodedotjs /> },
    { name: "Vercel", icon: <SiVercel /> },
    { name: "MongoDB", icon: <SiMongodb /> },
    { name: "GSAP", icon: <SiGreensock /> },
    { name: "Sanity", icon: <SiSanity /> },
  ];

  // Ensure component is mounted before animations
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded || typeof window === "undefined") return;

    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        if (iconRef.current.length > 0) {
          animateIcons(iconRef.current);
        }
      });
      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timer);
  }, [isLoaded]);

  useEffect(() => {
    if (!isLoaded || typeof window === "undefined") return;

    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        if (ringRef.current.length > 0) {
          animateRings(ringRef.current);
        }
      });
      return () => ctx.revert();
    }, 150);

    return () => clearTimeout(timer);
  }, [isLoaded]);

  const shuffled = shuffleArray(tools);

  // Distribute into 3 rings
  const ring1 = shuffled.slice(0, 5);
  const ring2 = shuffled.slice(5, 13);
  const ring3 = shuffled.slice(13);

  const getRadii = () => {
    return [80, 140, 200];
  };

  const radii = getRadii();

  // Orbit renderer
  const renderRing = (ring: Tool[], radius: number, ringIndex: number) => {
    return ring.map((tool, i) => {
      const angle = (i / ring.length) * 2 * Math.PI;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);

      const globalIndex =
        ringIndex === 0
          ? i
          : ringIndex === 1
            ? i + ring1.length
            : i + ring1.length + ring2.length;

      return (
        <div
          ref={(el) => {
            iconRef.current![globalIndex] = el;
          }}
          key={tool.name}
          className="orbit-item"
          style={{
            left: `calc(50% + ${x}px)`,
            top: `calc(50% + ${y}px)`,
          }}
          title={tool.name}
        >
          {tool.icon}
        </div>
      );
    });
  };

  if (!isLoaded) {
    return (
      <div className="orbit-container">
        <div className="center">{center}</div>
      </div>
    );
  }

  return (
    <div className="orbit-container">
      {/* Center */}
      <div className="center">{center}</div>

      {/* Orbit rings */}
      {radii.map((radius, i) => (
        <div
          key={i}
          ref={(el) => {
            ringRef.current[i] = el;
          }}
          className="orbit"
          style={{
            width: `${2 * radius}px`,
            height: `${2 * radius}px`,
          }}
        >
          {/* Render icons for this ring */}
          {i === 0 && renderRing(ring1, radius, 0)}
          {i === 1 && renderRing(ring2, radius, 1)}
          {i === 2 && renderRing(ring3, radius, 2)}
        </div>
      ))}
    </div>
  );
};

export default Orbit;
