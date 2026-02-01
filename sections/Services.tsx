"use client";
import React, { useEffect } from "react";
import { IoLayers } from "react-icons/io5";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { MdRocketLaunch } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";
import { HiMiniSparkles } from "react-icons/hi2";
import { LuRefreshCw } from "react-icons/lu";
import { FaBoxesPacking } from "react-icons/fa6";
import {
  initializeServicesAnimations,
  cleanupServicesAnimations,
  refreshAnimationsOnResize,
} from "@/lib/gsapAnimations";

const servicesdata = [
  {
    title: "Fullstack Development",
    description:
      "End-to-end web solutions built for scalability and performance — from intuitive frontends to reliable backends and robust databases.",
    highlight: "React, Next.js, Node.js, MongoDB, PostgreSQL, Prisma",
    highlightLabel: "Tech Stack:",
    icon: <IoLayers size={40} />,
  },
  {
    title: "UI/UX Design",
    description:
      "User-centered design that blends clarity, creativity, and functionality to create seamless experiences.",
    highlight: "Figma, Tailwind CSS, Framer Motion, ShadCN UI, GSAP",
    highlightLabel: "Tools:",
    icon: <TbLayoutDashboardFilled size={40} />,
  },
  {
    title: "Deployment & Optimization",
    description:
      "Production-ready systems delivered with CI/CD pipelines, monitoring, and performance tuning for speed, reliability, and cost efficiency.",
    highlight: "Vercel, Netlify, Docker, GitHub Actions",
    highlightLabel: "Tech Stack:",
    icon: <MdRocketLaunch size={40} />,
  },
  {
    title: "SEO Optimization",
    description:
      "Data-driven SEO strategies that improve visibility, boost rankings, and drive consistent organic growth.",
    highlight: "Core Web Vitals, Metadata, Page Speed, Analytics",
    highlightLabel: "Focus Areas:",
    icon: <IoSearchSharp size={40} />,
  },
  {
    title: "Branding & Identity",
    description:
      "Cohesive brand systems that strengthen recognition and trust through visuals, tone, and design guidelines.",
    highlight: "Logo Design, Brand Guidelines, Typography, Color Systems",
    highlightLabel: "Deliverables:",
    icon: <HiMiniSparkles size={40} />,
  },
  {
    title: "Website Redesigns",
    description:
      "Outdated websites reimagined into modern, responsive, and high-performing platforms.",
    highlight:
      "Responsive UI, Accessibility, Performance Tuning, Code Refactoring",
    highlightLabel: "Approach:",
    icon: <LuRefreshCw size={40} />,
  },
  {
    title: "Custom Solutions (CMS, POS, Web Apps)",
    description:
      "Tailored web applications that align with business goals — from CMS platforms to point-of-sale systems.",
    highlight: "Next.js, TypeScript, Prisma, Supabase",
    highlightLabel: "Tech Stack:",
    icon: <FaBoxesPacking size={40} />,
  },
];

const Services = () => {
  useEffect(() => {
    // Initialize animations when component mounts
    initializeServicesAnimations();
    refreshAnimationsOnResize();

    // Cleanup on unmount
    return () => {
      cleanupServicesAnimations();
    };
  }, []);

  return (
    <>
      {/* Services Section - This will be the "above-section" that slides up */}
      <div id="services" className="above-section relative z-20">
        <div className="bg-[#211E1F] min-h-screen w-full flex flex-col pt-14 px-4 md:px-8 lg:px-12">
          {/* Services Header */}
          <div className="mt-10 relative mb-16 services-header">
            <h1 className="text-[#F8F6F4] text-5xl md:text-6xl lg:text-7xl font-bold text-left md:text-center font-sans">
              Services
            </h1>
          </div>

          {/* Services List */}
          <div className="max-w-7xl mx-auto w-full">
            {servicesdata.map((service, index) => (
              <div key={index} className="mb-12 md:mb-16 service-item">
                {/* Mobile Layout - Stacked */}
                <div className="md:hidden">
                  <div className="text-[#D9D7AF] mb-4">{service.icon}</div>
                  <h2 className="text-[#F8F6F4] text-2xl font-bold font-sans mb-3">
                    {service.title}
                  </h2>
                  <p className="text-[#C4C2B7] text-base font-sans leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <p className="text-[#C4C2B7] text-sm font-sans leading-relaxed mb-6">
                    <span className="font-semibold text-[#D9D7AF]">
                      {service.highlightLabel}
                    </span>{" "}
                    <span className="text-[#F8F6F4]">{service.highlight}</span>
                  </p>
                  {/* Line after description on mobile */}
                  {index < servicesdata.length - 1 && (
                    <div className="h-px bg-[#D9D7AF] mx-2 service-line" />
                  )}
                </div>

                {/* Desktop Layout - Alternating */}
                <div className="hidden md:block relative">
                  {index % 2 === 0 ? (
                    /* Even index - Left aligned with line on top */
                    <div className="grid grid-cols-2 gap-12 items-start">
                      <div className="relative">
                        {/* Line above title extending to the right */}
                        <div className="h-px bg-[#D9D7AF] mb-6 mr-[-3rem] service-line" />
                        <div className="text-[#D9D7AF] mb-4">
                          {service.icon}
                        </div>
                        <h2 className="text-[#F8F6F4] text-2xl lg:text-3xl font-bold font-sans mb-4">
                          {service.title}
                        </h2>
                        <p className="text-[#C4C2B7] text-base lg:text-lg font-sans leading-relaxed mb-4">
                          {service.description}
                        </p>
                        <p className="text-[#C4C2B7] text-sm lg:text-base font-sans leading-relaxed">
                          <span className="font-semibold text-[#D9D7AF]">
                            {service.highlightLabel}
                          </span>{" "}
                          <span className="text-[#F8F6F4]">
                            {service.highlight}
                          </span>
                        </p>
                      </div>
                      <div></div>
                    </div>
                  ) : (
                    /* Odd index - Right aligned with line on top */
                    <div className="grid grid-cols-2 gap-12 items-start">
                      <div></div>
                      <div className="relative">
                        {/* Line above title extending to the left */}
                        <div className="h-px bg-[#D9D7AF] mb-6 ml-[-3rem] service-line" />
                        <div className="text-[#D9D7AF] mb-4 flex justify-end">
                          {service.icon}
                        </div>
                        <h2 className="text-[#F8F6F4] text-2xl lg:text-3xl font-bold font-sans mb-4 text-right">
                          {service.title}
                        </h2>
                        <p className="text-[#C4C2B7] text-base lg:text-lg font-sans leading-relaxed text-right mb-4">
                          {service.description}
                        </p>
                        <p className="text-[#C4C2B7] text-sm lg:text-base font-sans leading-relaxed text-right">
                          <span className="font-semibold text-[#D9D7AF]">
                            {service.highlightLabel}
                          </span>{" "}
                          <span className="text-[#F8F6F4]">
                            {service.highlight}
                          </span>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 mb-12 text-center services-quote">
            <p className="text-[#F8F6F4] text-lg md:text-xl font-sans mb-8 max-w-2xl mx-auto">
              "I help brands and teams turn ideas into scalable digital products
              — blending strategy, creativity, and technology."
            </p>
          </div>
        </div>

        {/* CTA Section - Also part of the above-section */}
        <div className="min-h-screen bg-[#D9D7CB] flex flex-col items-start md:items-center justify-start md:justify-center px-4 sm:px-6 md:px-0 py-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-[#211E1F] font-sans cta-header">
            Let's Get Started
          </h2>

          <div className="max-w-2xl text-[#3a3738] text-left space-y-6">
            <div className="font-sans text-[#C4C2B7] bg-[#3a3738] p-4 rounded-3xl shadow cta-step">
              <h4 className="text-xl font-semibold text-[#D9D7CB] mb-15">
                1. Quick Call
              </h4>
              <p>
                A short introductory call to understand your goals and determine
                if we're the right fit.
              </p>
            </div>

            <div className="font-sans text-[#C4C2B7] text-lg bg-[#3a3738] p-4 rounded-3xl shadow cta-step">
              <h4 className="text-xl font-semibold text-[#D9D7CB] mb-15">
                2. Assessment
              </h4>
              <p>
                A transparent evaluation of your needs, outlining where we can
                deliver the most impact.
              </p>
            </div>

            <div className="font-sans text-[#C4C2B7] text-lg bg-[#3a3738] p-4 rounded-3xl shadow cta-step">
              <h4 className="text-xl font-semibold text-[#D9D7CB] mb-15">
                3. Proposal
              </h4>
              <p>
                If aligned, you'll receive a tailored proposal — with a clear
                scope, timeline, and fixed investment.
              </p>
            </div>
          </div>

          <div className="mt-10 w-full flex md:justify-center">
            <div className="w-full max-w-2xl">
              <button className="bg-[#211E1F] text-[#D9D7CB] px-6 py-3 font-sans rounded-md text-lg font-semibold w-full cta-button">
                Let's Talk
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;