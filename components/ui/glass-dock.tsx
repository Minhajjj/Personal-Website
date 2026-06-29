'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

type DockIcon = React.ComponentType<{ className?: string }>;

export interface DockItem {
    title: string;
    icon: DockIcon | string;
    onClick?: () => void;
    href?: string;
}

export interface GlassDockProps extends React.HTMLAttributes<HTMLDivElement> {
    items: DockItem[];
    dockClassName?: string;
    /** Width of the dock - default "auto" */
    dockWidth?: string;
    /** Max width of the dock on mobile */
    mobileMaxWidth?: string;
    /** Padding of the dock */
    dockPadding?: string;
}

// Icon mapping with your website colors
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    home: ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
    ),
    projects: ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
    ),
    services: ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
        </svg>
    ),
    contact: ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
    ),
    deploy: ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
        </svg>
    ),
    github: ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
    ),
    linkedin: ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
    ),
    x: ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    ),
};

export const GlassDock = React.forwardRef<HTMLDivElement, GlassDockProps>(
    (
        {
            items,
            className,
            dockClassName,
            dockWidth = "auto",
            mobileMaxWidth = "95%",
            dockPadding,
            ...props
        },
        ref
    ) => {
        const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
        const [direction, setDirection] = useState(0);
        const [isVisible, setIsVisible] = useState(true);
        const lastScrollY = useRef(0);
        const dockRef = useRef<HTMLDivElement>(null);

        // Combine refs
        useEffect(() => {
            if (ref) {
                if (typeof ref === 'function') {
                    ref(dockRef.current);
                } else {
                    (ref as React.MutableRefObject<HTMLDivElement | null>).current = dockRef.current;
                }
            }
        }, [ref]);

        // Scroll behavior
        useEffect(() => {
            const handleScroll = () => {
                const currentScrollY = window.scrollY;

                if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                    setIsVisible(false);
                } else {
                    setIsVisible(true);
                }

                lastScrollY.current = currentScrollY;
            };

            window.addEventListener('scroll', handleScroll, { passive: true });
            return () => window.removeEventListener('scroll', handleScroll);
        }, []);

        const handleMouseEnter = (index: number) => {
            if (hoveredIndex !== null && index !== hoveredIndex) {
                setDirection(index > hoveredIndex ? 1 : -1);
            }
            setHoveredIndex(index);
        };

        const getTooltipPosition = (index: number) => index * 48 + 12;

        const resolveIcon = (icon: DockIcon | string): React.ComponentType<{ className?: string }> => {
            if (typeof icon === 'string') {
                return iconMap[icon] || iconMap.home;
            }
            return icon;
        };

        // Separate the motion props to avoid type conflicts
        const motionProps: HTMLMotionProps<"div"> = {
            initial: { y: 0, opacity: 1 },
            animate: {
                y: isVisible ? 0 : 100,
                opacity: isVisible ? 1 : 0,
            },
            transition: { duration: 0.3, ease: 'easeInOut' },
        };

        return (
            <div
                ref={dockRef}
                className={cn(
                    'fixed bottom-6 left-1/2 -translate-x-1/2 z-50',
                    className
                )}
                {...props}
            >
                <motion.div
                    {...motionProps}
                    className={cn(
                        // Base styles
                        "relative flex items-center rounded-2xl",
                        "justify-between sm:justify-center",
                        "backdrop-blur-xl",
                        // Width and padding - customizable
                        "gap-1 sm:gap-3",
                        dockPadding || "px-4 sm:px-6 py-3 sm:py-4",
                        // Your website colors using proper Tailwind syntax
                        "bg-(--color-card)/95",
                        "border border-(--color-bg-secondary)/10",
                        "shadow-lg shadow-(--color-bg-secondary)/10",
                        // Responsive width
                        "w-full sm:w-auto",
                        dockClassName
                    )}
                    style={{
                        maxWidth: mobileMaxWidth,
                        width: dockWidth !== "auto" ? dockWidth : undefined,
                    }}
                    onMouseLeave={() => {
                        setHoveredIndex(null);
                        setDirection(0);
                    }}
                >
                    <AnimatePresence>
                        {hoveredIndex !== null && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.92, y: 12 }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    y: -60,
                                    x: getTooltipPosition(hoveredIndex),
                                }}
                                exit={{ opacity: 0, scale: 0.92, y: 12 }}
                                transition={{ type: 'spring', stiffness: 120, damping: 18 }}
                                className="absolute top-0 left-0 pointer-events-none z-30 hidden md:block"
                            >
                                <div
                                    className={cn(
                                        'px-4 py-2 rounded-lg',
                                        'bg-(--color-bg-secondary)',
                                        'text-(--color-body)',
                                        'shadow-lg shadow-(--color-bg-secondary)/20',
                                        'border border-(--color-bg-secondary)',
                                        'min-w-25'
                                    )}
                                >
                                    <div className="relative h-4 flex items-center justify-center overflow-hidden w-full">
                                        <AnimatePresence mode="popLayout" custom={direction}>
                                            <motion.span
                                                key={items[hoveredIndex].title}
                                                custom={direction}
                                                initial={{
                                                    x: direction > 0 ? 35 : -35,
                                                    opacity: 0,
                                                    filter: 'blur(6px)',
                                                }}
                                                animate={{
                                                    x: 0,
                                                    opacity: 1,
                                                    filter: 'blur(0px)',
                                                }}
                                                exit={{
                                                    x: direction > 0 ? -35 : 35,
                                                    opacity: 0,
                                                    filter: 'blur(6px)',
                                                }}
                                                transition={{
                                                    duration: 0.3,
                                                    ease: 'easeOut',
                                                }}
                                                className="text-[13px] font-medium tracking-wide whitespace-nowrap"
                                            >
                                                {items[hoveredIndex].title}
                                            </motion.span>
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Mobile label */}
                    {hoveredIndex !== null && (
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 md:hidden">
                            <span className="text-xs font-medium text-(--color-bg-secondary) bg-(--color-card) px-3 py-1 rounded-full border border-(--color-bg-secondary)/10 whitespace-nowrap">
                                {items[hoveredIndex].title}
                            </span>
                        </div>
                    )}

                    {items.map((el, index) => {
                        const Icon = resolveIcon(el.icon);
                        const isHovered = hoveredIndex === index;

                        const handleClick = () => {
                            if (el.onClick) {
                                el.onClick();
                            } else if (el.href) {
                                window.location.href = el.href;
                            }
                        };

                        return (
                            <div
                                key={el.title}
                                onMouseEnter={() => handleMouseEnter(index)}
                                onClick={handleClick}
                                className="relative w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center cursor-pointer"
                                role="button"
                                tabIndex={0}
                                aria-label={el.title}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        handleClick();
                                    }
                                }}
                            >
                                <motion.div
                                    whileTap={{ scale: 0.95 }}
                                    animate={{
                                        scale: isHovered ? 1.1 : 1,
                                        y: isHovered ? -3 : 0,
                                    }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                                    className={cn(
                                        "flex items-center justify-center transition-colors duration-200",
                                        isHovered
                                            ? 'text-(--color-bg-secondary)'
                                            : 'text-(--color-text-light)'
                                    )}
                                >
                                    <Icon className="h-5.5 w-5.5 sm:h-6 sm:w-6" />
                                </motion.div>
                            </div>
                        );
                    })}
                </motion.div>
            </div>
        );
    }
);

GlassDock.displayName = 'GlassDock';
export default GlassDock;