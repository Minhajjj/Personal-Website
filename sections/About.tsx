"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import { useRef } from "react";
import { animateBtnEnter, animateBtnLeave } from "@/lib/gsapAnimations";
import SectionTwoCards from "@/components/SectionTwoCards";
import AboutCards from "@/components/AboutCards";
import Link from "next/link";

const About = () => {
  const images = ["/pic1.jpg", "/pic2.jpg", "/pic3.jpg", "/pic4.jpg"];
  const [currentImage, setCurrentImage] = useState(images[0]);
  const btnRef1 = useRef<HTMLButtonElement>(null);
  const btnRef2 = useRef<HTMLButtonElement>(null);

  // SectionTwoCards data with video links
  const sectionTwoCardsInfo = [
    {
      title: "Fullstack Development",
      description:
        "Building end-to-end digital experiences with modern tech stacks and seamless user interactions.",
      points: {
        point1: "Robust API architecture with comprehensive testing",
        point2: "Scalable code with real-time monitoring & analytics",
      },
      link: "/Gif2.mp4", // Add your video path here
    },
    {
      title: "Deployment & Optimization",
      description:
        "Delivering lightning-fast applications with automated pipelines and performance-first approach.",
      points: {
        point1: "Sub-second load times with intelligent caching",
        point2: "Bulletproof deployments with zero-downtime releases",
      },
      link: "/Gif1.mp4", // Add your video path here
    },
  ];

  // Function to change image randomly
  const changeImage = () => {
    let nextImage;
    do {
      nextImage = images[Math.floor(Math.random() * images.length)];
    } while (nextImage === currentImage); // avoid same image
    setCurrentImage(nextImage);
  };

  return (
    <>
      <div className="above-section">
        <div className="bg-[#211E1F] min-h-screen w-full flex flex-col pt-14">
          {/* Row of tags */}
          <div className="flex flex-row gap-3 ml-4 mt-10 w-full justify-start sm:justify-start md:justify-center lg:justify-center">
            <div className="text-[#C4C2B7] text-[14px] font-mono border font-extrabold border-[#C4C2B7] p-2 rounded-md">
              BRAND IDENTITY
            </div>
            <div className="text-[#C4C2B7] text-[14px] font-mono border font-extrabold border-[#C4C2B7] p-2 rounded-md">
              WEBSITE
            </div>
            <div className="text-[#C4C2B7] text-[14px] font-mono border font-extrabold border-[#C4C2B7] p-2 rounded-md">
              OPTIMIZE
            </div>
          </div>

          {/* Headline */}
          <section className="w-full mt-10 flex flex-col ml-4 justify-start sm:justify-start md:items-center lg:items-center">
            <p className="text-[#F8F6F4] text-[24px] font-sans font-bold mb-4">
              Crafting Modern Web Solutions
            </p>
            <p className="text-[#c4c2b7] text-[16px] font-sans max-w-2xl text-justify sm:text-justify md:text-center lg:text-center ">
              I build fullstack applications that combine performance,
              scalability, and user experience. Every project is designed to
              solve real-world problems while keeping interfaces intuitive and
              engaging.
            </p>

            {/* Image + Button wrapper */}
            <div className="mt-10 w-[80vw] max-w-[500px] mx-auto">
              {/* Image container */}
              <div
                className="rounded-lg shadow-lg relative overflow-hidden cursor-pointer h-[60vh] max-h-[700px]"
                onMouseEnter={(event: React.MouseEvent<HTMLDivElement>) => {
                  const interval = setInterval(changeImage, 500);
                  (event.currentTarget as any).intervalId = interval;
                }}
                onMouseLeave={(event: React.MouseEvent<HTMLDivElement>) => {
                  const intervalId = (event.currentTarget as any).intervalId;
                  if (intervalId) clearInterval(intervalId);
                }}
              >
                <Image
                  src={currentImage}
                  alt="About Image"
                  fill
                  style={{ objectFit: "cover" }}
                  className="transition-all duration-500"
                />
              </div>

              {/* Button */}
              <Link href="/projects" passHref>
                <button
                  ref={btnRef1}
                  onMouseEnter={() => animateBtnEnter(btnRef1.current)}
                  onMouseLeave={() => animateBtnLeave(btnRef1.current)}
                  className="w-full relative overflow-hidden text-white hover:text-black px-6 py-3 rounded-full mt-6 flex items-center gap-2 justify-center cursor-pointer"
                >
                  {/* Animated background span */}
                  <span className="absolute left-0 top-0 h-full w-0 bg-[#f2f2ec] z-0"></span>

                  {/* Button text (on top) */}
                  <span className="relative z-10 flex items-center gap-2">
                    View My Work <FaArrowRight />
                  </span>
                </button>
              </Link>
            </div>
          </section>

          {/* Row of tags */}
          <div className="flex flex-wrap gap-3 mt-8 w-full justify-start px-4 md:justify-center">
            <div className="text-[#C4C2B7] text-[14px] font-mono border font-extrabold border-[#C4C2B7] px-2 py-2 rounded-md">
              FULLSTACK DEVELOPMENT
            </div>
            <div className="text-[#C4C2B7] text-[14px] font-mono border font-extrabold border-[#C4C2B7] px-2 py-2 rounded-md">
              DEPLOYMENT & OPTIMIZATION
            </div>
            <div className="text-[#C4C2B7] text-[14px] font-mono border font-extrabold border-[#C4C2B7] px-2 py-2 rounded-md">
              PERFORMANCE & SCALABILITY
            </div>
          </div>

          {/* Timeline Section - Made Responsive */}
          <section className="relative w-full py-10 mb-10 mt-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Vertical line - Hidden on mobile */}
            <div className="absolute left-1/2 top-0 bottom-24 w-px bg-[#C4C2B7] hidden md:block" />

            {/* Timeline items */}
            <div className="flex flex-col gap-12">
              {/* Item 1 - Desktop: Right text, Left video | Mobile: Stacked */}
              <div className="flex flex-col md:flex-row md:justify-start items-center gap-6">
                {/* Text Section */}
                <div className="w-full md:w-1/2 md:pr-8 text-left md:text-right">
                  <SectionTwoCards
                    title={sectionTwoCardsInfo[0].title}
                    description={sectionTwoCardsInfo[0].description}
                    points={sectionTwoCardsInfo[0].points}
                    link={sectionTwoCardsInfo[0].link}
                  />
                </div>
                {/* Video Section */}
                <div className="w-full md:w-1/2 md:pl-8">
                  <div className="bg-[#2A2A2A] rounded-lg overflow-hidden shadow-lg">
                    <video
                      src={sectionTwoCardsInfo[0].link}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-[200px] sm:h-[250px] md:h-[200px] object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Item 2 - Desktop: Left video, Right text | Mobile: Stacked */}
              <div className="flex flex-col md:flex-row md:justify-end items-center gap-6">
                {/* Video Section - Order change for desktop */}
                <div className="w-full md:w-1/2 md:pr-8 md:order-1">
                  <div className="bg-[#2A2A2A] rounded-lg overflow-hidden shadow-lg">
                    <video
                      src={sectionTwoCardsInfo[1].link}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-[200px] sm:h-[250px] md:h-[200px] object-cover"
                    />
                  </div>
                </div>
                {/* Text Section */}
                <div className="w-full md:w-1/2 md:pl-8 text-left md:order-2">
                  <SectionTwoCards
                    title={sectionTwoCardsInfo[1].title}
                    description={sectionTwoCardsInfo[1].description}
                    points={sectionTwoCardsInfo[1].points}
                    link={sectionTwoCardsInfo[1].link}
                  />
                </div>
              </div>
            </div>
            <button
              ref={btnRef2}
              onMouseEnter={() => animateBtnEnter(btnRef2.current)}
              onMouseLeave={() => animateBtnLeave(btnRef2.current)}
              className="w-full relative overflow-hidden text-white hover:text-black px-6 py-3 rounded-full mt-6 flex items-center gap-2 justify-center cursor-pointer"
            >
              {/* Animated background span */}
              <span className="absolute left-0 top-0 h-full w-0 bg-[#f2f2ec] z-0"></span>

              {/* Button text (on top) */}
              <Link href="/deploy" className="inline-block">
                <span className="relative z-10 flex items-center gap-2 cursor-pointer hover:gap-4 transition-all">
                  How I Deploy <FaArrowRight />
                </span>
              </Link>
            </button>
          </section>
        </div>

        <section className="w-full min-h-screen mb-10 sm:px-6 lg:px-8 max-w-6xl mx-auto bg-[#D9D7CB] rounded-lg py-10">
          <div className="mt-15 flex flex-col items-start md:items-center gap-10 px-3 md:px-0">
            <p className="text-4xl font-sans font-semibold text-left md:text-center">
              Looks Good. Works Better
            </p>
            <p className="text-2xl font-sans font-semibold text-left md:text-center">
              I focus on building products that balance design and functionality
              — clean interfaces backed by solid engineering.
            </p>
            <AboutCards />
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
