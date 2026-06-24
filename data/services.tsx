import { IoLayers, IoSearchSharp } from "react-icons/io5";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { MdRocketLaunch } from "react-icons/md";
import { HiMiniSparkles } from "react-icons/hi2";
import { LuRefreshCw } from "react-icons/lu";
import { FaBoxesPacking } from "react-icons/fa6";
import type { ReactNode } from "react";

export type ServiceItem = {
  title: string;
  description: string;
  highlight: string;
  highlightLabel: string;
  icon: ReactNode;
};

export const servicesData: ServiceItem[] = [
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
