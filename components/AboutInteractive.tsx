"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { animateBtnEnter, animateBtnLeave } from "@/lib/gsapAnimations";

type AboutImageRotatorProps = {
  images: readonly string[];
};

export function AboutImageRotator({ images }: AboutImageRotatorProps) {
  const [currentImage, setCurrentImage] = useState(images[0]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const changeImage = () => {
    let nextImage: string;
    do {
      nextImage = images[Math.floor(Math.random() * images.length)];
    } while (nextImage === currentImage);
    setCurrentImage(nextImage);
  };

  return (
    <div
      className="rounded-lg shadow-lg relative overflow-hidden cursor-pointer h-[40vh] max-h-[400px] sm:h-[50vh] sm:max-h-[500px] md:h-[60vh] md:max-h-[700px]"
      onMouseEnter={() => {
        intervalRef.current = setInterval(changeImage, 500);
      }}
      onMouseLeave={() => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
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
  );
}

export function AboutProjectsButton() {
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <Link href="/projects">
      <button
        ref={btnRef}
        onMouseEnter={() => animateBtnEnter(btnRef.current)}
        onMouseLeave={() => animateBtnLeave(btnRef.current)}
        className="w-full relative overflow-hidden text-white hover:text-black px-6 py-3 rounded-full mt-6 flex items-center gap-2 justify-center cursor-pointer"
      >
        <span className="absolute left-0 top-0 h-full w-0 bg-[#f2f2ec] z-0" />
        <span className="relative z-10 flex items-center gap-2">
          View My Work <FaArrowRight />
        </span>
      </button>
    </Link>
  );
}

export function AboutDeployButton() {
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <button
      ref={btnRef}
      onMouseEnter={() => animateBtnEnter(btnRef.current)}
      onMouseLeave={() => animateBtnLeave(btnRef.current)}
      className="w-full relative overflow-hidden text-white hover:text-black px-6 py-3 rounded-full mt-6 flex items-center gap-2 justify-center cursor-pointer"
    >
      <span className="absolute left-0 top-0 h-full w-0 bg-[#f2f2ec] z-0" />
      <Link href="/deploy" className="inline-block">
        <span className="relative z-10 flex items-center gap-2 cursor-pointer hover:gap-4 transition-all">
          How I Deploy <FaArrowRight />
        </span>
      </Link>
    </button>
  );
}
