import gsap from "gsap";
import { RefObject } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type MinhajRef = { text: HTMLElement | null };

let ctx: gsap.Context | null = null;

export const animateMinhaj = (ref: MinhajRef) => {
  if (!ref.text) return;

  gsap.fromTo(
    ref.text,
    { opacity: 1 }, // initial state (visible)
    {
      opacity: 0, // fade out
      scrollTrigger: {
        trigger: ref.text,
        start: "top", // when element reaches middle of screen
        end: "bottom top", // until it scrolls out
        scrub: true, // tie to scroll
      },
    },
  );
};

export const animateLines = (lines: (HTMLElement | null)[]) => {
  const validLines = lines.filter((el): el is HTMLElement => el !== null);
  if (validLines.length === 0) return;

  validLines.forEach((line) => {
    gsap.fromTo(
      line,
      { opacity: 1, y: 0 }, // initial state
      {
        opacity: 0,
        y: 130,
        duration: 14,
        ease: "none",
        scrollTrigger: {
          trigger: line,
          start: () => (window.innerWidth < 768 ? "20% 22%" : "20% 30%"),
          end: () => (window.innerWidth < 768 ? "20% top" : "bottom+=200 top"),
          scrub: true,
          markers: false,
          invalidateOnRefresh: true,
        },
      },
    );
  });
};

export const animateHeroDiv = (div: HTMLElement | null) => {
  if (!div) return;

  gsap.fromTo(
    div,
    { opacity: 1, y: 0 }, // initial state
    {
      opacity: 0,
      y: -150,
      duration: 8,
      ease: "none",
      scrollTrigger: {
        trigger: div,
        start: () => (window.innerWidth < 768 ? "20% 22%" : "10% 60%"),
        end: "bottom 50%",
        scrub: true,
        invalidateOnRefresh: true,
        markers: false,
      },
    },
  );
};

export const animateHeading = (heading: HTMLElement | null) => {
  if (!heading) return;

  const text = heading.querySelector("span span");
  if (!text) return;

  gsap.fromTo(
    text,
    { y: "120%", opacity: 0, rotateX: 45 },
    {
      y: "0%",
      opacity: 1,
      rotateX: 0,
      duration: 3, // slower
      ease: "power4.out",
      scrollTrigger: {
        trigger: heading,
        start: "top 75%",
        end: "top 25%",
        scrub: true, // tie animation to scroll
        toggleActions: "play reverse play reverse",
        markers: false,
      },
    },
  );
};

export const animateIcons = (icons: (HTMLElement | null)[]) => {
  icons.forEach((icon, index) => {
    if (!icon) return;

    gsap.fromTo(
      icon,
      {
        scale: 5, // keep lower than 15 for smoother scroll feel
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: icon,
          start: "top 80%", // when icon enters viewport
          end: "top 50%", // finishes midway
          scrub: true, // ties animation to scroll
          // markers: true,   // enable for debugging
        },
      },
    );
  });
};

export const animateCards = (cards: (HTMLElement | null)[]) => {
  cards.forEach((card, index) => {
    if (!card) return;

    gsap.fromTo(
      card,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: index * 0.2,
        ease: "power3.out",
        stagger: 0.2,
        scrub: true, // FIXED: was "srub"
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      },
    );
  });
};

export const animateRings = (rings: (HTMLElement | null)[]) => {
  rings.forEach((ring, index) => {
    if (!ring) return;
    gsap.to(ring, {
      rotation: index % 2 === 0 ? 360 : -360,
      duration: 20 + index * 5,
      repeat: -1,
      ease: "linear",
      transformOrigin: "50% 50%",
    });
  });
};

export const animateBtnEnter = (btn: HTMLElement | null) => {
  if (!btn) return;
  const bg = btn.querySelector("span") as HTMLElement;
  gsap.to(bg, {
    width: "100%",
    duration: 0.5,
    ease: "power2.out",
  });
};

export const animateBtnLeave = (btn: HTMLElement | null) => {
  if (!btn) return;
  const bg = btn.querySelector("span") as HTMLElement;
  gsap.to(bg, {
    width: "0%",
    duration: 0.5,
    ease: "power2.in",
  });
};

// Card slide animations
export const animateCardSlideIn = (
  defaultContent: HTMLElement | null,
  hoverContent: HTMLElement | null,
) => {
  if (!defaultContent || !hoverContent) return;

  // Create timeline for smooth sequence
  const tl = gsap.timeline();

  // Slide out default content to left
  tl.to(defaultContent, {
    x: "-100%",
    opacity: 0,
    duration: 0.4,
    ease: "power2.inOut",
  })
    // Slide in hover content from right
    .fromTo(
      hoverContent,
      {
        x: "100%",
        opacity: 0,
      },
      {
        x: "0%",
        opacity: 1,
        duration: 0.4,
        ease: "power2.inOut",
      },
      "-=0.2", // Start 0.2s before previous animation ends
    );
};

export const animateCardSlideOut = (
  defaultContent: HTMLElement | null,
  hoverContent: HTMLElement | null,
) => {
  if (!defaultContent || !hoverContent) return;

  // Create timeline for smooth sequence
  const tl = gsap.timeline();

  // Slide out hover content to right
  tl.to(hoverContent, {
    x: "100%",
    opacity: 0,
    duration: 0.4,
    ease: "power2.inOut",
  })
    // Slide in default content from left
    .fromTo(
      defaultContent,
      {
        x: "-100%",
        opacity: 0,
      },
      {
        x: "0%",
        opacity: 1,
        duration: 0.4,
        ease: "power2.inOut",
      },
      "-=0.2", // Start 0.2s before previous animation ends
    );
};

// Services Animation
export const animateServices = () => {
  // Animate services header
  gsap.fromTo(
    ".services-header",
    {
      opacity: 0,
      y: 50,
    },
    {
      opacity: 1,
      y: 0,
      duration: 2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".services-header",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    },
  );

  // Animate services items
  const serviceItems = document.querySelectorAll(".service-item");

  serviceItems.forEach((item, index) => {
    const isEven = index % 2 === 0;
    const isMobile = window.innerWidth < 768;

    // For mobile, all items come from bottom
    // For desktop, even items come from left, odd items come from right
    const fromDirection = isMobile
      ? { opacity: 0, y: 50 }
      : isEven
        ? { opacity: 0, x: -100, y: 20 }
        : { opacity: 0, x: 100, y: 20 };

    const toDirection = isMobile
      ? { opacity: 1, y: 0 }
      : { opacity: 1, x: 0, y: 0 };

    gsap.fromTo(item, fromDirection, {
      ...toDirection,
      duration: 0.8,
      ease: "power3.out",
      delay: index * 0.1, // Stagger animation
      scrollTrigger: {
        trigger: item,
        start: "top 85%",
        end: "bottom 15%",
        toggleActions: "play none none reverse",
      },
    });

    // Animate the line separator on mobile
    if (isMobile) {
      const line = item.querySelector(".service-line");
      if (line) {
        gsap.fromTo(
          line,
          {
            scaleX: 0,
            opacity: 0,
          },
          {
            scaleX: 1,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            delay: 0.3,
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }
    }

    // Animate desktop lines
    if (!isMobile) {
      const line = item.querySelector(".service-line");
      if (line) {
        gsap.fromTo(
          line,
          {
            scaleX: 0,
            transformOrigin: isEven ? "left center" : "right center",
          },
          {
            scaleX: 1,
            duration: 0.8,
            ease: "power2.out",
            delay: 0.2,
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }
    }
  });

  // Animate the quote section
  gsap.fromTo(
    ".services-quote",
    {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".services-quote",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    },
  );
};

// Call-to-Action Section Animation
export const animateCTASection = () => {
  // Animate CTA header
  gsap.fromTo(
    ".cta-header",
    {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".cta-header",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    },
  );

  // Animate CTA steps with stagger
  const ctaSteps = document.querySelectorAll(".cta-step");

  ctaSteps.forEach((step, index) => {
    gsap.fromTo(
      step,
      {
        opacity: 0,
        y: 60,
        scale: 0.9,
        rotationX: 10,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: index * 0.15, // Stagger each step
        scrollTrigger: {
          trigger: step,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse",
        },
      },
    );

    // Add hover animation for CTA steps
    step.addEventListener("mouseenter", () => {
      gsap.to(step, {
        scale: 1.02,
        y: -5,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    step.addEventListener("mouseleave", () => {
      gsap.to(step, {
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  });

  // Animate CTA button with special effects
  const ctaButton = document.querySelector(".cta-button");
  if (ctaButton) {
    gsap.fromTo(
      ctaButton,
      {
        opacity: 0,
        y: 40,
        scale: 0.8,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "back.out(1.7)",
        delay: 0.6,
        scrollTrigger: {
          trigger: ctaButton,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse",
        },
      },
    );

    // Button hover animation
    ctaButton.addEventListener("mouseenter", () => {
      gsap.to(ctaButton, {
        scale: 1.05,
        backgroundColor: "#2a2628",
        duration: 0.3,
        ease: "power2.out",
      });
    });

    ctaButton.addEventListener("mouseleave", () => {
      gsap.to(ctaButton, {
        scale: 1,
        backgroundColor: "#211E1F",
        duration: 0.3,
        ease: "power2.out",
      });
    });
  }
};

// Initialize all services animations
export const initializeServicesAnimations = () => {
  // Wait for DOM to be ready
  gsap.set(
    [
      ".service-item",
      ".services-header",
      ".services-quote",
      ".cta-header",
      ".cta-step",
      ".cta-button",
    ],
    {
      opacity: 0,
    },
  );

  // Run animations
  animateServices();
  animateCTASection();
};

// Cleanup function for when component unmounts
export const cleanupServicesAnimations = () => {
  ScrollTrigger.getAll().forEach((trigger: ScrollTrigger) => trigger.kill());
};

// Responsive animation refresh
export const refreshAnimationsOnResize = () => {
  let resizeTimer: NodeJS.Timeout;

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);
  });
};

// FOOTER ANIMATIONS - Shutter Reveal Effect
export const initializeFooterAnimations = () => {
  const footer = document.querySelector(".footer-animation");
  const aboveSection = document.querySelector(".above-section");

  console.log("Footer:", footer);
  console.log("Above section:", aboveSection);

  if (!footer || !aboveSection) {
    console.warn("Footer or above section not found");
    return;
  }

  // Create a GSAP context for better cleanup
  ctx = gsap.context(() => {
    // Main shutter reveal animation
    ScrollTrigger.create({
      trigger: footer as Element,
      start: "top bottom", // when footer starts entering viewport
      end: "top 20%", // animation completes when footer is 20% from top
      scrub: 1, // smooth scrubbing
      pin: false,
      markers: false, // Set to false for production
      onUpdate: (self: { progress: number }) => {
        // Shutter opening effect - the above section slides up like a shutter
        const progress = self.progress;
        const footerHeight = (footer as HTMLElement).offsetHeight;
        const aboveSectionHeight = (aboveSection as HTMLElement).offsetHeight;

        // More dramatic movement - move the entire height of above section
        const moveDistance =
          progress * Math.min(footerHeight, aboveSectionHeight * 0.6);

        gsap.set(aboveSection, {
          y: -moveDistance,
          transformOrigin: "center bottom",
          // Add subtle rotation for depth
          rotationX: progress * 1,
          // Subtle scale for more dramatic effect
          scaleY: 1 - progress * 0.01,
        });
      },
      onEnter: () => {
        console.log("Footer shutter animation started");
        // Add a dramatic shadow to the above section
        gsap.to(aboveSection, {
          boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
          duration: 0.8,
        });
      },
      onLeave: () => {
        console.log("Footer shutter animation ended");
      },
      onEnterBack: () => {
        // Remove shadow when scrolling back up
        gsap.to(aboveSection, {
          boxShadow: "0 0px 0px rgba(0,0,0,0)",
          duration: 0.5,
        });
      },
    });

    // Footer content reveal animation
    const footerChildren = Array.from(footer.children);

    footerChildren.forEach((child, index) => {
      gsap.fromTo(
        child,
        {
          opacity: 0,
          y: 80,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: footer as Element,
            start: "top 85%",
            end: "top 60%",
            scrub: 1,
          },
        },
      );
    });

    // Optional: Parallax effect for footer background
    gsap.to(footer, {
      backgroundPosition: "50% 30%",
      ease: "none",
      scrollTrigger: {
        trigger: footer as Element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });
};

export const cleanupFooterAnimations = () => {
  if (ctx) {
    ctx.revert(); // This will clean up all animations created in this context
  }
  ScrollTrigger.getAll().forEach((st: ScrollTrigger) => st.kill());
};

export const refreshAnimationsOnResizeFooter = () => {
  ScrollTrigger.refresh();
};

// Navbar Animations (using direct GSAP imports)
export const showNavbar = (element: HTMLElement): void => {
  gsap.to(element, {
    y: 0,
    opacity: 1,
    duration: 0.3,
    ease: "power2.out",
    overwrite: true, // cancel any in-progress hideNavbar tween
  });
};

export const hideNavbar = (element: HTMLElement): void => {
  gsap.to(element, {
    y: 100,
    opacity: 0,
    duration: 0.3,
    ease: "power2.out",
    overwrite: true, // cancel any in-progress showNavbar tween
  });
};

// Generic fade in animation
export const fadeIn = (element: HTMLElement, duration: number = 0.3): void => {
  gsap.to(element, {
    opacity: 1,
    duration,
    ease: "power2.out",
  });
};

// Generic fade out animation
export const fadeOut = (element: HTMLElement, duration: number = 0.3): void => {
  gsap.to(element, {
    opacity: 0,
    duration,
    ease: "power2.out",
  });
};

// Slide up animation
export const slideUp = (
  element: HTMLElement,
  distance: number = 50,
  duration: number = 0.3,
): void => {
  gsap.to(element, {
    y: -distance,
    duration,
    ease: "power2.out",
  });
};

// Slide down animation
export const slideDown = (
  element: HTMLElement,
  distance: number = 50,
  duration: number = 0.3,
): void => {
  gsap.to(element, {
    y: distance,
    duration,
    ease: "power2.out",
  });
};

// Scale animation
export const scale = (
  element: HTMLElement,
  scale: number = 1.1,
  duration: number = 0.2,
): void => {
  gsap.to(element, {
    scale,
    duration,
    ease: "power2.out",
  });
};

// Reset element to initial state
export const reset = (element: HTMLElement): void => {
  gsap.set(element, {
    y: 0,
    x: 0,
    opacity: 1,
    scale: 1,
    rotation: 0,
  });
};

// Contact Page Animations

interface ClientFormAnimationRefs {
  topBarRef: RefObject<HTMLDivElement | null>;
  heroTitleRef: RefObject<HTMLHeadingElement | null>;
  heroSubtitleRef: RefObject<HTMLDivElement | null>;
  socialLinksRef: RefObject<HTMLDivElement | null>;
  formRef: RefObject<HTMLDivElement | null>;
  formFieldsRef: RefObject<HTMLDivElement | null>;
  submitButtonRef: RefObject<HTMLButtonElement | null>;
}

export class ClientFormAnimations {
  private refs: ClientFormAnimationRefs;
  private cleanupFunctions: (() => void)[] = [];

  constructor(refs: ClientFormAnimationRefs) {
    this.refs = refs;
  }

  // Initial entrance animations
  initEntranceAnimations(): void {
    const tl = gsap.timeline();

    // Animate top bar
    if (this.refs.topBarRef.current?.children) {
      tl.fromTo(
        this.refs.topBarRef.current.children,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" },
      );
    }

    // Hero title with 3D effect
    if (this.refs.heroTitleRef.current) {
      tl.fromTo(
        this.refs.heroTitleRef.current,
        { y: 150, opacity: 0, rotationX: 45, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          scale: 1,
          duration: 1.5,
          ease: "power4.out",
        },
        "-=0.6",
      );
    }

    // Hero subtitle
    if (this.refs.heroSubtitleRef.current?.children) {
      tl.fromTo(
        this.refs.heroSubtitleRef.current.children,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" },
        "-=1",
      );
    }
  }

  // Social links animation
  initSocialLinksAnimation(): void {
    if (!this.refs.socialLinksRef.current?.children) return;

    const trigger = ScrollTrigger.create({
      trigger: this.refs.socialLinksRef.current,
      start: "top 90%",
      onEnter: () => {
        if (this.refs.socialLinksRef.current?.children) {
          gsap.fromTo(
            this.refs.socialLinksRef.current.children,
            {
              y: 150,
              opacity: 0,
              scale: 0.7,
              rotation: 180,
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              rotation: 0,
              duration: 1.3,
              ease: "back.out(2)",
            },
          );
        }
      },
    });

    this.cleanupFunctions.push(() => trigger.kill());
  }

  // Form container animation
  initFormContainerAnimation(): void {
    if (!this.refs.formRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: this.refs.formRef.current,
      start: "top 85%",
      onEnter: () => {
        if (this.refs.formRef.current) {
          gsap.fromTo(
            this.refs.formRef.current,
            {
              y: 80,
              opacity: 0,
              scale: 0.9,
              rotationY: 10,
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              rotationY: 0,
              duration: 1.2,
              ease: "power4.out",
              transformStyle: "preserve-3d",
            },
          );
        }
      },
    });

    this.cleanupFunctions.push(() => trigger.kill());
  }

  // Form fields staggered animation
  initFormFieldsAnimation(): void {
    if (!this.refs.formFieldsRef.current?.children) return;

    const trigger = ScrollTrigger.create({
      trigger: this.refs.formFieldsRef.current,
      start: "top 80%",
      onEnter: () => {
        if (this.refs.formFieldsRef.current?.children) {
          gsap.fromTo(
            this.refs.formFieldsRef.current.children,
            {
              x: -60,
              opacity: 0,
              scale: 0.95,
            },
            {
              x: 0,
              opacity: 1,
              scale: 1,
              duration: 0.8,
              stagger: 0.15,
              ease: "power3.out",
            },
          );
        }
      },
    });

    this.cleanupFunctions.push(() => trigger.kill());
  }

  // Submit button hover animations
  initSubmitButtonAnimation(): void {
    if (!this.refs.submitButtonRef.current) return;

    const button = this.refs.submitButtonRef.current;

    // Initial entrance
    const trigger = ScrollTrigger.create({
      trigger: button,
      start: "top 85%",
      onEnter: () => {
        gsap.fromTo(
          button,
          { y: 50, opacity: 0, scale: 0.8 },
          { y: 0, opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)" },
        );
      },
    });

    this.cleanupFunctions.push(() => trigger.kill());

    // Hover effects
    button.addEventListener("mouseenter", () => {
      gsap.to(button, {
        y: -5,
        scale: 1.05,
        boxShadow: "0 20px 40px rgba(196, 194, 183, 0.3)",
        duration: 0.3,
        ease: "power2.out",
      });
    });

    button.addEventListener("mouseleave", () => {
      gsap.to(button, {
        y: 0,
        scale: 1,
        boxShadow: "0 8px 25px rgba(196, 194, 183, 0.2)",
        duration: 0.3,
        ease: "power2.out",
      });
    });
  }

  // Input focus animations
  initInputFocusAnimations(): void {
    const inputs = document.querySelectorAll("input, textarea, select");

    inputs.forEach((input) => {
      input.addEventListener("focus", () => {
        gsap.to(input, {
          scale: 1.02,
          boxShadow: "0 0 0 3px rgba(196, 194, 183, 0.1)",
          duration: 0.2,
          ease: "power2.out",
        });
      });

      input.addEventListener("blur", () => {
        gsap.to(input, {
          scale: 1,
          boxShadow: "none",
          duration: 0.2,
          ease: "power2.out",
        });
      });
    });
  }

  // File upload area animation
  initFileUploadAnimation(): void {
    const uploadArea = document.querySelector("[data-upload-area]");
    if (!uploadArea) return;

    uploadArea.addEventListener("dragenter", () => {
      gsap.to(uploadArea, {
        scale: 1.02,
        backgroundColor: "rgba(196, 194, 183, 0.05)",
        duration: 0.2,
        ease: "power2.out",
      });
    });

    uploadArea.addEventListener("dragleave", () => {
      gsap.to(uploadArea, {
        scale: 1,
        backgroundColor: "transparent",
        duration: 0.2,
        ease: "power2.out",
      });
    });

    uploadArea.addEventListener("drop", () => {
      gsap.to(uploadArea, {
        scale: 1,
        backgroundColor: "transparent",
        duration: 0.2,
        ease: "power2.out",
      });
    });
  }

  // Mouse parallax effect - Updated to constrain hero title within its container
  initMouseParallax(): () => void {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      // Reduced movement range for hero title to keep it within bounds
      const moveX = (clientX - centerX) * 0.002; // Reduced from 0.005
      const moveY = (clientY - centerY) * 0.002; // Reduced from 0.005

      // Apply constrained parallax to hero title
      if (this.refs.heroTitleRef.current) {
        gsap.to(this.refs.heroTitleRef.current, {
          x: moveX * 50,
          y: moveY * 50,
          rotationY: moveX * 0.1, // Reduced rotation
          rotationX: -moveY * 0.1, // Reduced rotation
          duration: 1,
          ease: "power2.out",
        });
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }

  // Form submission animation
  animateFormSubmission(): Promise<void> {
    return new Promise((resolve) => {
      const tl = gsap.timeline();

      if (this.refs.submitButtonRef.current) {
        tl.to(this.refs.submitButtonRef.current, {
          scale: 0.95,
          duration: 0.1,
          ease: "power2.out",
        })
          .to(this.refs.submitButtonRef.current, {
            scale: 1.1,
            duration: 0.3,
            ease: "back.out(2)",
          })
          .to(this.refs.submitButtonRef.current, {
            scale: 1,
            duration: 0.2,
            ease: "power2.out",
            onComplete: resolve,
          });
      } else {
        resolve();
      }
    });
  }

  // Initialize all animations
  initAllAnimations(): () => void {
    this.initEntranceAnimations();
    this.initSocialLinksAnimation();
    this.initFormContainerAnimation();
    this.initFormFieldsAnimation();
    this.initSubmitButtonAnimation();
    this.initInputFocusAnimations();
    this.initFileUploadAnimation();
    // Removed initContinuousAnimations() - no more floating icons or form glow

    const mouseCleanup = this.initMouseParallax();
    this.cleanupFunctions.push(mouseCleanup);

    // Return cleanup function
    return () => {
      this.cleanupFunctions.forEach((cleanup) => cleanup());
      ScrollTrigger.getAll().forEach((trigger: ScrollTrigger) =>
        trigger.kill(),
      );
    };
  }
}

// Project Page Animations

export interface ProjectAnimationRefs {
  cardRef: React.RefObject<HTMLDivElement | null>;
  imageRef: React.RefObject<HTMLDivElement | null>;
  overlayRef: React.RefObject<HTMLDivElement | null>;
  badgeRef: React.RefObject<HTMLDivElement | null>;
  actionButtonsRef: React.RefObject<HTMLDivElement | null>;
  numberRef: React.RefObject<HTMLDivElement | null>;
  categoryBarRef: React.RefObject<HTMLDivElement | null>;
  titleRef: React.RefObject<HTMLDivElement | null>;
  techStackRef: React.RefObject<HTMLDivElement | null>;
  linksRef: React.RefObject<HTMLDivElement | null>;
  backgroundGradientRef: React.RefObject<HTMLDivElement | null>;
  cornerAccentRef: React.RefObject<HTMLDivElement | null>;
}

export class ProjectAnimations {
  private timeline: gsap.core.Timeline | null = null;
  private hoverTimeline: gsap.core.Timeline | null = null;
  private stackScrollTrigger: ScrollTrigger | null = null;
  private entranceScrollTrigger: ScrollTrigger | null = null;
  private techStackScrollTrigger: ScrollTrigger | null = null;

  /**
   * Initialize entrance animations - SIMPLE AND CLEAN
   */
  public initEntranceAnimations(
    refs: ProjectAnimationRefs,
    index: number,
  ): void {
    const {
      cardRef,
      imageRef,
      titleRef,
      categoryBarRef,
      techStackRef,
      linksRef,
      numberRef,
    } = refs;

    if (!cardRef.current) return;

    // Set initial states
    gsap.set([cardRef.current], {
      opacity: 0,
      y: 50,
      force3D: true,
    });

    gsap.set([titleRef.current, categoryBarRef.current], {
      opacity: 0,
      y: 30,
      force3D: true,
    });

    gsap.set(numberRef.current, {
      opacity: 0,
      scale: 0.8,
      force3D: true,
    });

    // Simple entrance animation
    this.timeline = gsap.timeline({ paused: true });

    this.timeline
      .to(cardRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        force3D: true,
      })
      .to(
        [titleRef.current, categoryBarRef.current],
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
          stagger: 0.1,
          force3D: true,
        },
        "-=0.3",
      )
      .to(
        numberRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: "back.out(1.2)",
          force3D: true,
        },
        "-=0.2",
      );

    // Trigger entrance animation
    this.entranceScrollTrigger = ScrollTrigger.create({
      trigger: cardRef.current,
      start: "top 85%",
      onEnter: () => this.timeline?.play(),
      onLeave: () => this.timeline?.reverse(),
      onEnterBack: () => this.timeline?.play(),
      onLeaveBack: () => this.timeline?.reverse(),
    });
  }

  /**
   * COMPLETELY REWRITTEN STACK ANIMATION - PROPER STACKING
   */
  public initStackAnimation(
    cardRef: React.RefObject<HTMLDivElement | null>,
    index: number,
    totalCards: number,
  ): void {
    if (!cardRef.current) return;

    const card = cardRef.current;

    // CORRECT Z-INDEX: Last card (highest index) should be on top
    gsap.set(card, {
      zIndex: totalCards - index,
      force3D: true,
    });

    // Stack animation: Cards stick to top and stack properly
    this.stackScrollTrigger = ScrollTrigger.create({
      trigger: card,
      start: "top top",
      end: "bottom top",
      pin: true,
      pinSpacing: false,
      scrub: 1,
      onUpdate: (self: { progress: number }) => {
        const progress = self.progress;

        // Only animate cards that are not the last one
        if (index < totalCards - 1) {
          const scale = 1 - progress * 0.05;
          const brightness = 1 - progress * 0.3;

          gsap.set(card, {
            scale: scale,
            filter: `brightness(${brightness})`,
            transformOrigin: "center top",
            force3D: true,
          });
        }
      },
    });
  }

  /**
   * Hover animations - OPTIMIZED
   */
  public initHoverAnimations(refs: ProjectAnimationRefs): void {
    const {
      cardRef,
      imageRef,
      overlayRef,
      badgeRef,
      actionButtonsRef,
      numberRef,
      categoryBarRef,
      titleRef,
      techStackRef,
      linksRef,
      backgroundGradientRef,
      cornerAccentRef,
    } = refs;

    if (!cardRef.current) return;

    this.hoverTimeline = gsap.timeline({
      paused: true,
      defaults: { force3D: true, ease: "power2.out" },
    });

    this.hoverTimeline
      .to(cardRef.current, {
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
        duration: 0.3,
      })
      .to(
        overlayRef.current,
        {
          opacity: 1,
          duration: 0.3,
        },
        0,
      )
      .to(
        backgroundGradientRef.current,
        {
          opacity: 1,
          duration: 0.4,
        },
        0.1,
      );

    if (badgeRef.current) {
      this.hoverTimeline.to(
        badgeRef.current,
        {
          scale: 1.1,
          duration: 0.3,
          ease: "back.out(1.7)",
        },
        0.1,
      );
    }

    if (actionButtonsRef.current) {
      this.hoverTimeline.to(
        actionButtonsRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.3,
        },
        0.2,
      );
    }

    if (titleRef.current) {
      this.hoverTimeline.to(
        titleRef.current,
        {
          color: "#ffffff",
          duration: 0.3,
        },
        0.1,
      );
    }

    if (imageRef.current) {
      const img = imageRef.current.querySelector("img");
      if (img) {
        this.hoverTimeline.to(
          img,
          {
            scale: 1.1,
            duration: 0.5,
          },
          0,
        );
      }
    }
  }

  /**
   * Tech stack animation - SIMPLE
   */
  public initTechStackAnimation(
    techStackRef: React.RefObject<HTMLDivElement | null>,
  ): void {
    if (!techStackRef.current) return;

    const badges = techStackRef.current.querySelectorAll("span");
    if (!badges.length) return;

    gsap.set(badges, {
      opacity: 0,
      y: 20,
      force3D: true,
    });

    this.techStackScrollTrigger = ScrollTrigger.create({
      trigger: techStackRef.current,
      start: "top 90%",
      onEnter: () => {
        gsap.to(badges, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: "power2.out",
          force3D: true,
        });
      },
    });
  }

  public playHoverAnimation(): void {
    this.hoverTimeline?.play();
  }

  public reverseHoverAnimation(): void {
    this.hoverTimeline?.reverse();
  }

  public animateButtonIcon(
    element: HTMLElement | SVGSVGElement | null,
    isHover: boolean,
  ): void {
    if (!element) return;
    gsap.to(element, {
      rotation: isHover ? 12 : 0,
      scale: isHover ? 1.1 : 1,
      duration: 0.3,
      ease: "power2.out",
      force3D: true,
    });
  }

  public animateArrow(
    element: HTMLElement | SVGSVGElement | null,
    isHover: boolean,
  ): void {
    if (!element) return;
    gsap.to(element, {
      x: isHover ? 4 : 0,
      duration: 0.3,
      ease: "power2.out",
      force3D: true,
    });
  }

  public initMobileCardAnimation(
    cardRef: React.RefObject<HTMLDivElement | null>,
    index: number,
  ): void {
    if (!cardRef.current) return;

    gsap.set(cardRef.current, {
      opacity: 0,
      y: 30,
      force3D: true,
    });

    ScrollTrigger.create({
      trigger: cardRef.current,
      start: "top 90%",
      onEnter: () => {
        gsap.to(cardRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: index * 0.1,
          ease: "power2.out",
          force3D: true,
        });
      },
    });
  }

  /**
   * CRITICAL - Proper cleanup
   */
  public cleanup(): void {
    this.timeline?.kill();
    this.hoverTimeline?.kill();
    this.stackScrollTrigger?.kill();
    this.entranceScrollTrigger?.kill();
    this.techStackScrollTrigger?.kill();

    this.timeline = null;
    this.hoverTimeline = null;
    this.stackScrollTrigger = null;
    this.entranceScrollTrigger = null;
    this.techStackScrollTrigger = null;
  }

  public refresh(): void {
    ScrollTrigger.refresh();
  }
}

/**
 * Centralized GSAP Animation Utilities
 * All animation logic for the portfolio in one place
 */

export const gsapAnimations = {
  /**
   * Initial page load animations
   * Animates counter, scroller, and details sections on mount
   */
  initPageLoad: (
    counterRef: HTMLDivElement | null,
    scrollerRef: HTMLDivElement | null,
    rightContentRef: HTMLDivElement | null,
  ) => {
    const tl = gsap.timeline();

    // Animate counter section
    if (counterRef) {
      tl.fromTo(
        counterRef,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power4.out", delay: 0.2 },
      );
    }

    // Animate scroller section
    if (scrollerRef) {
      tl.fromTo(
        scrollerRef,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power4.out" },
        "-=0.8",
      );
    }

    // Animate details section
    if (rightContentRef) {
      tl.fromTo(
        rightContentRef,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power4.out" },
        "-=0.8",
      );
    }

    return tl;
  },

  /**
   * Animate content change when switching projects
   * Staggered animation for child elements
   */
  animateContentChange: (rightContentRef: HTMLDivElement | null) => {
    if (!rightContentRef) return;

    const elements = rightContentRef.children;
    gsap.fromTo(
      elements,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" },
    );
  },

  /**
   * Animate counter scale effect
   */
  animateCounter: (counterRef: HTMLDivElement | null) => {
    if (!counterRef) return;

    gsap.fromTo(
      counterRef,
      { scale: 0.8, opacity: 0.5 },
      { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2)" },
    );
  },

  /**
   * Animate right content with stagger
   */
  animateRightContent: (rightContentRef: HTMLDivElement | null) => {
    if (!rightContentRef) return;

    const children = Array.from(rightContentRef.children);
    gsap.fromTo(
      children,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power2.out" },
    );
  },

  /**
   * Animate only image container (for partial updates)
   */
  animateImageOnly: (rightContentRef: HTMLDivElement | null) => {
    if (!rightContentRef) return;

    const imageContainer = rightContentRef.querySelector(".aspect-video");
    if (imageContainer) {
      gsap.fromTo(
        imageContainer,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" },
      );
    }
  },

  /**
   * Animate progress bar
   */
  animateProgressBar: (
    progressBarRef: HTMLDivElement | null,
    progress: number,
  ) => {
    if (!progressBarRef) return;

    gsap.to(progressBarRef, {
      scaleY: progress / 100,
      duration: 0.3,
      ease: "power2.out",
      transformOrigin: "top",
    });
  },

  /**
   * Image parallax effect based on scroll position
   * Prevents horizontal drift by forcing x: 0
   */
  animateImageParallax: (
    imageRef: HTMLDivElement,
    distance: number,
    viewportHeight: number,
    isActive: boolean = false,
  ) => {
    const scrollProgress = 1 - distance / (viewportHeight / 2);
    const clampedProgress = Math.max(0, Math.min(1, scrollProgress));

    if (clampedProgress > 0.1) {
      // Animate image scale
      const img = imageRef.querySelector("img");
      if (img) {
        gsap.to(img, {
          scale: 0.98 + clampedProgress * 0.02,
          duration: 0.5,
          ease: "power1.out",
          overwrite: "auto",
        });
      }

      // Animate container opacity, force x: 0 to prevent drift
      const targetOpacity = isActive ? 1 : 0.4 + clampedProgress * 0.6;
      gsap.to(imageRef, {
        opacity: targetOpacity,
        x: 0, // Hard reset to center
        duration: 0.5,
        ease: "power1.out",
        overwrite: "auto",
      });
    }
  },

  /**
   * Smooth scroll to specific element
   * Centers element in viewport
   */
  smoothScrollToElement: (
    container: HTMLDivElement,
    element: HTMLDivElement,
  ) => {
    const elementRect = element.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const scrollTarget =
      container.scrollTop +
      elementRect.top -
      containerRect.top -
      containerRect.height / 2 +
      elementRect.height / 2;

    gsap.to(container, {
      scrollTop: scrollTarget,
      duration: 1.2,
      ease: "power3.inOut",
    });
  },

  /**
   * Initial image entrance animation
   * Clears props after finishing to let CSS take over
   */
  animateImageEntrance: (imageRefs: (HTMLDivElement | null)[]) => {
    imageRefs.slice(0, 3).forEach((ref, index) => {
      if (ref) {
        gsap.from(ref, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: 0.5 + index * 0.1,
          ease: "power3.out",
          clearProps: "all", // Removes GSAP styles so CSS centering takes over
        });
      }
    });
  },
};

export default gsapAnimations;

// Add this at the bottom of gsapAnimations.ts

export const initializeScrollTrigger = () => {
  if (typeof window === "undefined") return;

  // Force ScrollTrigger to recalculate ALL positions
  ScrollTrigger.refresh(true);

  // Also refresh on window load (for images, fonts, etc.)
  window.addEventListener("load", () => {
    setTimeout(() => {
      ScrollTrigger.refresh(true);
    }, 100);
  });
};

//DEPLOYMENT PAGE ANIMATIONS
// ─── Hero Panel entrance ───────────────────────────────────────────────────────
export function animateHeroPanel(panel: HTMLElement): void {
  const tl = gsap.timeline({ delay: 0.3 });

  tl.fromTo(
    panel.querySelector(".hero-eyebrow"),
    { y: 24, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
  )
    .fromTo(
      panel.querySelector(".hero-title"),
      { y: 70, opacity: 0, skewY: 3 },
      { y: 0, opacity: 1, skewY: 0, duration: 1, ease: "power4.out" },
      "-=0.3",
    )
    .fromTo(
      panel.querySelector(".hero-sub"),
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
      "-=0.4",
    )
    .fromTo(
      panel.querySelector(".hero-hint"),
      { opacity: 0 },
      { opacity: 1, duration: 0.8 },
      "-=0.2",
    );

  // Pulsing arrow
  gsap.to(panel.querySelector(".hint-arrow"), {
    x: 10,
    repeat: -1,
    yoyo: true,
    duration: 0.75,
    ease: "sine.inOut",
  });
}

// ─── Panel content reveal — triggered by scroll progress ratio ─────────────────
// Called from the scroll handler when a panel becomes "active"
export function revealPanel(panel: HTMLElement): void {
  // Bail if already revealed
  if (panel.dataset.revealed === "true") return;
  panel.dataset.revealed = "true";

  const tl = gsap.timeline();

  const eyebrow = panel.querySelector(".panel-eyebrow");
  const title = panel.querySelector(".panel-title");
  const body = panel.querySelector(".panel-body");
  const visual = panel.querySelector(".panel-visual");
  const steps = panel.querySelectorAll(".step-item");
  const tags = panel.querySelectorAll(".tech-tag");
  const num = panel.querySelector(".bg-number");

  if (num)
    tl.fromTo(
      num,
      { opacity: 0, x: 40 },
      { opacity: 1, x: 0, duration: 0.7, ease: "power2.out" },
      0,
    );
  if (eyebrow)
    tl.fromTo(
      eyebrow,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
      0.1,
    );
  if (title)
    tl.fromTo(
      title,
      { opacity: 0, y: 50, skewY: 2 },
      { opacity: 1, y: 0, skewY: 0, duration: 0.8, ease: "power3.out" },
      0.2,
    );
  if (body)
    tl.fromTo(
      body,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      0.35,
    );
  if (visual)
    tl.fromTo(
      visual,
      { opacity: 0, x: 60, scale: 0.95 },
      { opacity: 1, x: 0, scale: 1, duration: 0.9, ease: "power3.out" },
      0.25,
    );
  if (steps.length)
    tl.fromTo(
      steps,
      { opacity: 0, x: 24 },
      { opacity: 1, x: 0, duration: 0.4, stagger: 0.08, ease: "power2.out" },
      0.4,
    );
  if (tags.length)
    tl.fromTo(
      tags,
      { opacity: 0, y: 10, scale: 0.88 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.35,
        stagger: 0.06,
        ease: "back.out(1.5)",
      },
      0.5,
    );
}

// ─── Terminal typewriter ───────────────────────────────────────────────────────
export function typewriterEffect(
  el: HTMLElement,
  lines: string[],
  delay = 0.6,
): void {
  const text = lines.join("\n");
  const chars = text.split("");
  let current = "";

  gsap.delayedCall(delay, () => {
    let i = 0;
    const id = setInterval(() => {
      current += chars[i];
      el.textContent = current + "▌";
      i++;
      if (i >= chars.length) {
        clearInterval(id);
        el.textContent = current;
      }
    }, 26);
  });
}

// ─── Animate progress bars (plain, no ScrollTrigger) ──────────────────────────
export function animateProgressBars(container: HTMLElement): void {
  container.querySelectorAll<HTMLElement>(".progress-fill").forEach((bar) => {
    gsap.fromTo(
      bar,
      { width: "0%" },
      {
        width: bar.dataset.width ?? "100%",
        duration: 1.1,
        ease: "power2.out",
        delay: parseFloat(bar.dataset.delay ?? "0"),
      },
    );
  });
}

// ─── Float badge ───────────────────────────────────────────────────────────────
export function floatBadge(el: HTMLElement): void {
  gsap.to(el, {
    y: -7,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });
}
