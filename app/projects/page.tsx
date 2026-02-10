"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaExternalLinkAlt, FaArrowRight } from "react-icons/fa";
import { gsapAnimations } from "@/lib/gsapAnimations";
import Image from "next/image";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface Project {
  id: number;
  number: string;
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  images: string[];
  technologies: string[];
  githubUrl?: string;
  liveUrl: string;
  year: string;
}

// ============================================================================
// PROJECT DATA
// ============================================================================

const PROJECTS: Project[] = [
  {
    id: 1,
    number: "01",
    title: "WonderLand Toy Store",
    category: "FULLSTACK",
    description: "Magical full-stack toy store",
    fullDescription:
      "A full-stack e-commerce platform built with Next.js 15 and Supabase, featuring a playful UI, secure user auth, and an admin dashboard for managing toys and orders.",
    images: [
      "WonderLandtoyPic1.png",
      "WonderLandtoyPic2.png",
      "WonderLandtoyPic3.png",
    ],
    technologies: [
      "Next.js 15 (App Router)",
      "TypeScript",
      "Tailwind CSS",
      "Supabase (PostgreSQL + Auth)",
      "React Icons",
    ],
    githubUrl: "https://github.com/Minhajjj/wonderland-toy-store",
    liveUrl: "#",
    year: "2025",
  },
  {
    id: 2,
    number: "02",
    title: "PitchNext",
    category: "FULLSTACK",
    description: "Startup pitch showcase platform",
    fullDescription:
      "A modern app for founders to create and showcase startup pitches, featuring secure GitHub login and dynamic user profiles.",
    images: [
      "PitchNextMainImage.png",
      "PitchNext1.png",
      "PitchNext2.png",
      "PitchNext3.png",
      "PitchNext4.png",
    ],
    technologies: [
      "Next.js 15 (App Router)",
      "TypeScript",
      "Tailwind CSS",
      "Auth.js (GitHub)",
      "Sanity",
    ],
    githubUrl: "https://github.com/Minhajjj/PitchNext-App",
    liveUrl: "#",
    year: "2025",
  },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const VerticalScrollPortfolio: React.FC = () => {
  // State
  const [activeProject, setActiveProject] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Refs
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileScrollRef = useRef<HTMLDivElement>(null);

  // ============================================================================
  // EFFECTS
  // ============================================================================

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Initial page load animation (desktop only)
  useEffect(() => {
    if (isMobile) return;

    const tl = gsapAnimations.initPageLoad(
      counterRef.current,
      scrollerRef.current,
      rightContentRef.current,
    );

    return () => {
      tl.kill();
    };
  }, [isMobile]);

  // Sync scroll position with active project (desktop)
  useEffect(() => {
    if (isMobile) return;

    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollCenter = container.scrollTop + container.clientHeight / 2;

      let closestProjectIndex = 0;
      let minDistance = Infinity;

      let globalImageIndex = 0;
      PROJECTS.forEach((project, pIndex) => {
        project.images.forEach(() => {
          const imgRef = imageRefs.current[globalImageIndex];
          if (imgRef) {
            const rect = imgRef.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            const centerDiff = Math.abs(
              rect.top -
                containerRect.top +
                rect.height / 2 -
                containerRect.height / 2,
            );

            if (centerDiff < minDistance) {
              minDistance = centerDiff;
              closestProjectIndex = pIndex;
            }
          }
          globalImageIndex++;
        });
      });

      if (closestProjectIndex !== activeProject) {
        setActiveProject(closestProjectIndex);
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [activeProject, isMobile]);

  // Mobile scroll handler
  useEffect(() => {
    if (!isMobile) return;

    const container = mobileScrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.offsetWidth;
      const newIndex = Math.round(scrollLeft / cardWidth);

      if (
        newIndex !== activeProject &&
        newIndex >= 0 &&
        newIndex < PROJECTS.length
      ) {
        setActiveProject(newIndex);
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [activeProject, isMobile]);

  // Animate content when active project changes (desktop)
  useEffect(() => {
    if (isMobile) return;
    gsapAnimations.animateContentChange(rightContentRef.current);
  }, [activeProject, isMobile]);

  // ============================================================================
  // HANDLERS
  // ============================================================================

  const scrollToProject = (index: number) => {
    if (isMobile) {
      const container = mobileScrollRef.current;
      if (container) {
        container.scrollTo({
          left: index * container.offsetWidth,
          behavior: "smooth",
        });
      }
      return;
    }

    let globalIndex = 0;
    for (let i = 0; i < index; i++) {
      globalIndex += PROJECTS[i].images.length;
    }

    const targetEl = imageRefs.current[globalIndex];
    if (targetEl && scrollContainerRef.current) {
      gsapAnimations.smoothScrollToElement(
        scrollContainerRef.current,
        targetEl,
      );
    }
  };

  // ============================================================================
  // MOBILE RENDER
  // ============================================================================

  if (isMobile) {
    return (
      <div className="bg-[#EAE9E4] min-h-screen w-full font-sans text-[#1a1a1a]">
        {/* Mobile Header */}
        <div className="fixed top-0 left-0 right-0 bg-[#EAE9E4]/95 backdrop-blur-sm border-b border-[#1a1a1a]/5 z-50 px-4 py-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold tracking-[0.2em] uppercase opacity-60">
              Portfolio 2024
            </span>
            <div className="flex gap-2">
              {PROJECTS.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => scrollToProject(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeProject === i ? "bg-[#1a1a1a] w-6" : "bg-[#1a1a1a]/20"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Scroll Container */}
        <div
          ref={mobileScrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar mt-16"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {PROJECTS.map((project, pIndex) => (
            <div
              key={project.id}
              className="min-w-full snap-center flex flex-col"
            >
              {/* Image Gallery */}
              <div className="px-4 py-6">
                <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-4">
                  {project.images.map((img, iIndex) => (
                    <div
                      key={iIndex}
                      className="min-w-[85vw] snap-center aspect-4/3 bg-white shadow-lg overflow-hidden rounded-lg"
                    >
                      <Image
                        src={`/${img}`}
                        alt={`${project.title} view ${iIndex + 1}`}
                        width={500}
                        height={300}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Project Details */}
              <div className="px-6 pb-8 flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-0.5 w-8 bg-[#1a1a1a]"></span>
                  <span className="text-xs font-bold tracking-[0.2em] uppercase opacity-60">
                    {project.category}
                  </span>
                </div>

                <h1 className="text-4xl font-black mb-4 text-[#1a1a1a] leading-tight">
                  {project.title}
                </h1>

                <div className="h-px w-full bg-[#1a1a1a]/10 my-4"></div>

                <p className="text-base leading-relaxed text-[#1a1a1a]/80 mb-6">
                  {project.fullDescription}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-[#1a1a1a]/5 text-[#1a1a1a] text-[10px] font-bold uppercase tracking-wider rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <a
                    href={project.liveUrl}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#1a1a1a] text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-[#1a1a1a]/90 transition-colors"
                  >
                    <span>View Project</span>
                    <FaArrowRight className="text-xs" />
                  </a>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      className="px-4 py-3 bg-white border border-[#1a1a1a]/10 rounded-lg hover:bg-[#1a1a1a]/5 transition-colors"
                    >
                      <FaExternalLinkAlt className="text-[#1a1a1a]" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Footer Indicator */}
        <div className="fixed bottom-4 left-0 right-0 flex justify-center pointer-events-none">
          <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
            <span className="text-xs font-bold">
              {activeProject + 1} / {PROJECTS.length}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================================
  // DESKTOP/TABLET RENDER (UNCHANGED)
  // ============================================================================

  return (
    <div className="bg-[#EAE9E4] h-screen w-full flex overflow-hidden fixed inset-0 font-sans text-[#1a1a1a]">
      {/* LEFT: Project Navigation / Counter */}
      <div
        ref={counterRef}
        className="w-24 md:w-32 lg:w-48 shrink-0 flex flex-col justify-between py-12 items-center border-r border-[#1a1a1a]/5 bg-[#EAE9E4] z-20 project-counter relative"
      >
        <div className="text-xs font-bold tracking-[0.2em] uppercase origin-bottom-left -rotate-90 translate-y-12 opacity-40">
          Portfolio 2024
        </div>

        <div className="flex flex-col gap-8">
          {PROJECTS.map((p, i) => (
            <button
              key={p.id}
              onClick={() => scrollToProject(i)}
              className={`text-sm font-bold transition-all duration-300 ${
                activeProject === i
                  ? "scale-150 text-[#1a1a1a]"
                  : "text-[#1a1a1a]/30 hover:text-[#1a1a1a]/60"
              }`}
            >
              {p.number}
            </button>
          ))}
        </div>

        <div className="h-12 w-px bg-[#1a1a1a]/20"></div>
      </div>

      {/* MID: Image Scroller */}
      <div
        ref={scrollerRef}
        className="w-full md:w-112.5 lg:w-150 shrink-0 border-r border-[#1a1a1a]/5 relative bg-[#E5E4DE] z-10 scroller-section"
      >
        <div
          ref={scrollContainerRef}
          className="h-full overflow-y-auto overflow-x-hidden no-scrollbar scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="py-[50vh] flex flex-col items-center gap-32 px-8">
            {PROJECTS.map((project, pIndex) => (
              <div key={project.id} className="flex flex-col gap-12 w-full">
                {project.images.map((img, iIndex) => {
                  let globalIndex = 0;
                  for (let i = 0; i < pIndex; i++)
                    globalIndex += PROJECTS[i].images.length;
                  globalIndex += iIndex;

                  return (
                    <div
                      key={iIndex}
                      ref={(el) => {
                        imageRefs.current[globalIndex] = el;
                      }}
                      className="group relative w-full aspect-4/3 bg-white shadow-lg overflow-hidden transition-transform duration-700 ease-out hover:scale-[1.02]"
                    >
                      <div className="absolute inset-0 bg-[#1a1a1a]/5 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>

                      <Image
                        src={`/${img}`}
                        alt={`${project.title} view ${iIndex + 1}`}
                        width={500}
                        height={300}
                        className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-1000"
                      />

                      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur text-[10px] font-bold px-3 py-1 uppercase tracking-widest text-[#1a1a1a] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                        {pIndex + 1}.{iIndex + 1}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none opacity-40">
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <div className="w-px h-8 bg-[#1a1a1a] animate-pulse"></div>
        </div>
      </div>

      {/* RIGHT: Project Details */}
      <div className="flex-1 hidden md:flex flex-col justify-center px-12 lg:px-24 bg-[#EAE9E4] details-section relative overflow-hidden">
        <div className="absolute right-[-5%] top-1/2 -translate-y-1/2 text-[40vh] font-black text-[#1a1a1a] opacity-[0.03] pointer-events-none select-none leading-none">
          {PROJECTS[activeProject].number}
        </div>

        <div
          ref={rightContentRef}
          className="max-w-2xl relative z-10 -ml-12.5"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="h-0.5 w-12 bg-[#1a1a1a]"></span>
            <span className="text-sm font-bold tracking-[0.2em] uppercase opacity-60">
              {PROJECTS[activeProject].category}
            </span>
          </div>

          <h1 className="text-7xl lg:text-8xl font-black mb-6 text-[#1a1a1a] leading-[0.9] tracking-tighter">
            {PROJECTS[activeProject].title}
          </h1>

          <div className="h-px w-full bg-[#1a1a1a]/10 my-8"></div>

          <p className="text-xl lg:text-2xl font-light leading-relaxed text-[#1a1a1a]/80 mb-10 max-w-lg">
            {PROJECTS[activeProject].fullDescription}
          </p>

          <div className="flex flex-wrap gap-2 mb-12">
            {PROJECTS[activeProject].technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-[#1a1a1a]/5 text-[#1a1a1a] text-xs font-bold uppercase tracking-wider rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>

          <a
            href={PROJECTS[activeProject].liveUrl}
            className="group inline-flex items-center gap-4 text-[#1a1a1a] text-sm font-black uppercase tracking-widest hover:opacity-70 transition-opacity"
          >
            <span className="border-b-2 border-[#1a1a1a] pb-1">
              View Project
            </span>
            <FaArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default VerticalScrollPortfolio;
