"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  animate,
  useAnimationFrame,
  type Variants,
} from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Palette ──────────────────────────────────────────────────────────────────
const C = {
  body: "#d9d7cb",
  card: "#E1E0D7",   // light card bg — unchanged
  dark: "#211e1f",   // dark card bg — unchanged
  muted: "#766c6f",
  hover: "#eae9e3",
} as const;

// ─── Shared entrance variant ──────────────────────────────────────────────────
const rise: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: (d: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: d },
  }),
};

// ─── Card shell ───────────────────────────────────────────────────────────────
function Card({
  className, children, delay = 0, dark = false,
}: {
  className?: string; children: React.ReactNode; delay?: number; dark?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      variants={rise}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={delay}
      className={cn(
        "relative overflow-hidden rounded-2xl p-5",
        dark ? `bg-[${C.dark}]` : `bg-[${C.card}]`,
        className,
      )}
      style={{ backgroundColor: dark ? C.dark : C.card }}
    >
      {children}
    </motion.div>
  );
}

// ─── Mono label ───────────────────────────────────────────────────────────────
function Label({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.14em]"
      style={{ color: light ? "rgba(217,215,203,0.38)" : "rgba(118,108,111,0.65)" }}>
      {children}
    </p>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  CARD 1 — IDENTITY  (dark, tall)
//  Animation: slow-rotating orbital ring + floating monogram
// ═══════════════════════════════════════════════════════════════════════════════
function IdentityCard() {
  const angle = useMotionValue(0);
  useAnimationFrame((t) => { angle.set((t / 12000) * 360); });

  return (
    <Card dark delay={0} className="col-span-2 row-span-2 flex flex-col min-h-65">
      {/* Rotating orbital ring — purely decorative */}
      <motion.div
        className="pointer-events-none absolute"
        style={{
          width: 200, height: 200,
          top: "50%", left: "50%",
          x: "-50%", y: "-50%",
          rotate: angle,
          border: `1px dashed rgba(217,215,203,0.07)`,
          borderRadius: "50%",
        }}
      />
      <motion.div
        className="pointer-events-none absolute"
        style={{
          width: 310, height: 310,
          top: "50%", left: "50%",
          x: "-50%", y: "-50%",
          rotate: angle,
          border: `1px dashed rgba(217,215,203,0.04)`,
          borderRadius: "50%",
        }}
      />

      <div className="relative z-10 flex h-full flex-col">
        {/* Floating monogram */}
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="mb-6 flex h-10 w-10 items-center justify-center rounded-full font-mono text-base font-semibold"
          style={{
            border: "1px solid rgba(217,215,203,0.12)",
            background: "rgba(217,215,203,0.06)",
            color: "rgba(217,215,203,0.7)",
          }}
        >
          M
        </motion.div>

        <h2 className="text-[28px] font-semibold leading-[1.1] tracking-tight"
          style={{ color: "rgba(217,215,203,0.95)" }}>
          Minhaj
        </h2>
        <p className="mt-2 text-[13px] leading-relaxed"
          style={{ color: "rgba(217,215,203,0.42)" }}>
          I design and build digital products — brands, websites, and web
          apps that are fast, focused, and built to grow.
        </p>

        <div className="mt-auto border-t pt-4"
          style={{ borderColor: "rgba(217,215,203,0.07)" }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em]"
            style={{ color: "rgba(217,215,203,0.22)" }}>
            Creative Studio · Pakistan
          </p>
        </div>
      </div>
    </Card>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  CARD 2 — AVAILABILITY
//  Animation: heartbeat ripple behind the status dot + text shimmer on hover
// ═══════════════════════════════════════════════════════════════════════════════
function AvailabilityCard() {
  return (
    <Card delay={0.06} className="col-span-2 group">
      <Label>Status</Label>

      {/* Ripple rings */}
      <div className="relative mb-3 flex items-center gap-3">
        <span className="relative flex h-3 w-3 shrink-0">
          {[0, 0.5, 1].map((d) => (
            <motion.span
              key={d}
              className="absolute inset-0 rounded-full"
              style={{ background: C.dark, opacity: 0.15 }}
              animate={{ scale: [1, 2.4], opacity: [0.18, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: d, ease: "easeOut" }}
            />
          ))}
          <span className="relative inline-flex h-3 w-3 rounded-full"
            style={{ background: C.dark }} />
        </span>
        <span className="text-sm font-semibold" style={{ color: C.dark }}>
          Open to new projects
        </span>
      </div>

      <p className="text-[13px] leading-relaxed" style={{ color: C.muted }}>
        Available for freelance &amp; contract — branding, web, or product.
      </p>

      {/* Hover reveal bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 rounded-full"
        style={{ background: C.dark, originX: 0 }}
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      />
    </Card>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  CARD 3 — CLOCK / LOCATION
//  Animation: seconds hand SVG + digit flip
// ═══════════════════════════════════════════════════════════════════════════════
function LocationCard() {
  const [time, setTime] = useState({ h: "--", m: "--", s: 0, period: "" });

  useEffect(() => {
    const tick = () => {
      const pkt = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Karachi" }));
      const h = pkt.getHours();
      setTime({
        h: (h % 12 || 12).toString().padStart(2, "0"),
        m: pkt.getMinutes().toString().padStart(2, "0"),
        s: pkt.getSeconds(),
        period: h >= 12 ? "PM" : "AM",
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const deg = time.s * 6;

  return (
    <Card delay={0.1} className="col-span-2">
      <div className="flex items-start justify-between">
        <Label>Local time</Label>
        <span className="flex items-center gap-1 font-mono text-[10px]"
          style={{ color: `${C.muted}90` }}>
          <MapPin size={9} /> PKT · UTC+5
        </span>
      </div>

      <div className="flex items-end gap-3 mt-1">
        <div className="flex items-baseline gap-1">
          <span className="font-mono text-[34px] font-semibold leading-none tracking-tight"
            style={{ color: C.dark }}>
            {time.h}:{time.m}
          </span>
          <span className="font-mono text-xs" style={{ color: C.muted }}>{time.period}</span>
        </div>

        {/* Minimal clock face */}
        <svg width="30" height="30" viewBox="0 0 30 30" className="mb-0.5 shrink-0">
          <circle cx="15" cy="15" r="13"
            fill="none" stroke={`${C.dark}18`} strokeWidth="1" />
          {/* tick marks */}
          {[0, 1, 2, 3].map((i) => (
            <line key={i}
              x1="15" y1="3" x2="15" y2="5.5"
              stroke={`${C.dark}30`} strokeWidth="1"
              transform={`rotate(${i * 90} 15 15)`} />
          ))}
          {/* seconds hand */}
          <motion.line
            x1="15" y1="15" x2="15" y2="4"
            stroke={C.dark} strokeWidth="1" strokeLinecap="round"
            animate={{ rotate: deg }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{ originX: "15px", originY: "15px" }}
          />
          <circle cx="15" cy="15" r="1.5" fill={C.dark} />
        </svg>
      </div>

      <p className="mt-1 font-mono text-[11px]" style={{ color: `${C.muted}70` }}>
        Pakistan
      </p>
    </Card>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  CARD 4 — APPROACH (reusable, with staggered line reveal)
// ═══════════════════════════════════════════════════════════════════════════════
function ApproachCard({
  index, title, body, delay,
}: { index: string; title: string; body: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <Card delay={delay} className="col-span-2 group">
      <div ref={ref}>
        <span className="mb-3 block font-mono text-[10px]"
          style={{ color: `${C.muted}55` }}>
          {index}
        </span>

        <motion.p
          className="text-sm font-semibold overflow-hidden"
          style={{ color: C.dark }}
          initial={{ opacity: 0, x: -8 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: delay + 0.1 }}
        >
          {title}
        </motion.p>

        <motion.p
          className="mt-1 text-[13px] leading-relaxed"
          style={{ color: C.muted }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: delay + 0.25 }}
        >
          {body}
        </motion.p>

        {/* Animated underline on hover */}
        <div className="mt-3 h-px overflow-hidden rounded-full"
          style={{ background: `${C.dark}12` }}>
          <motion.div
            className="h-full origin-left rounded-full"
            style={{ background: C.dark }}
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>
    </Card>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  CARD 5 — STATS  (dark)
//  Animation: count-up numbers on enter
// ═══════════════════════════════════════════════════════════════════════════════
function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(0, to, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return ctrl.stop;
  }, [inView, to]);

  return <span ref={ref}>{val}{suffix}</span>;
}

function StatsCard() {
  const stats = [
    { display: <><CountUp to={3} />+</>, label: "Years" },
    { display: <><CountUp to={12} />+</>, label: "Projects" },
    { display: <CountUp to={7} />, label: "Services" },
    { display: "∞", label: "Curiosity" },
  ];

  return (
    <Card dark delay={0.18} className="col-span-4">
      <div className="flex divide-x" style={{ borderColor: "rgba(217,215,203,0.07)" }}>
        {stats.map(({ display, label }) => (
          <div key={label} className="flex flex-1 flex-col items-center gap-0.5 py-1 group cursor-default">
            <motion.span
              className="font-mono text-[26px] font-semibold leading-none tracking-tight"
              style={{ color: "rgba(217,215,203,0.9)" }}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              {display}
            </motion.span>
            <span className="font-mono text-[10px] uppercase tracking-widest"
              style={{ color: "rgba(217,215,203,0.28)" }}>
              {label}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  CARD 6 — CTA
//  Animation: magnetic arrow + bg flood on hover
// ═══════════════════════════════════════════════════════════════════════════════
function CtaCard() {
  const arrowX = useSpring(0, { stiffness: 300, damping: 20 });
  const arrowY = useSpring(0, { stiffness: 300, damping: 20 });
  const [hovered, setHovered] = useState(false);

  const handleMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    arrowX.set((e.clientX - cx) * 0.25);
    arrowY.set((e.clientY - cy) * 0.25);
  }, [arrowX, arrowY]);

  const handleLeave = useCallback(() => {
    arrowX.set(0); arrowY.set(0); setHovered(false);
  }, [arrowX, arrowY]);

  return (
    <Card delay={0.22} className="col-span-2 cursor-pointer p-0 overflow-hidden">
      <motion.a
        href="/contact"
        aria-label="Start a project"
        className="flex h-full flex-col justify-between p-5"
        onMouseMove={handleMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleLeave}
        style={{ minHeight: 110 }}
      >
        {/* Flood fill */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{ background: C.dark, originY: 1 }}
          animate={{ scaleY: hovered ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />

        <Label light={hovered}>Work together</Label>

        <div className="relative z-10 flex items-end justify-between">
          <motion.span
            className="text-[22px] font-semibold leading-[1.2] tracking-tight"
            animate={{ color: hovered ? "rgba(217,215,203,0.95)" : C.dark }}
            transition={{ duration: 0.25 }}
          >
            Start a<br />project
          </motion.span>

          <motion.span
            className="flex h-9 w-9 items-center justify-center rounded-full"
            style={{
              border: hovered
                ? "1px solid rgba(217,215,203,0.2)"
                : `1px solid ${C.dark}22`,
              background: hovered ? "rgba(217,215,203,0.08)" : `${C.dark}0a`,
              x: arrowX,
              y: arrowY,
            }}
          >
            <motion.div
              animate={{ rotate: hovered ? 0 : 0 }}
              style={{ x: arrowX, y: arrowY }}
            >
              <ArrowUpRight
                size={16}
                style={{ color: hovered ? "rgba(217,215,203,0.7)" : C.muted }}
              />
            </motion.div>
          </motion.span>
        </div>
      </motion.a>
    </Card>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  CARD 7 — QUOTE  (light)
//  Animation: word-by-word stagger reveal
// ═══════════════════════════════════════════════════════════════════════════════
const QUOTE = "Strategy first, aesthetics second — every pixel should move the business forward, not just look good doing it.";

function QuoteCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const words = QUOTE.split(" ");

  return (
    <Card delay={0.14} className="col-span-4">
      <div ref={ref} className="flex items-start gap-4">
        <motion.span
          className="shrink-0 font-serif text-5xl leading-none select-none"
          style={{ color: `${C.muted}22` }}
          animate={inView ? { opacity: [0, 1], scale: [0.6, 1] } : {}}
          transition={{ duration: 0.5 }}
        >
          &ldquo;
        </motion.span>
        <p className="text-[13px] italic leading-relaxed" style={{ color: C.muted }}>
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.35, delay: 0.15 + i * 0.04, ease: "easeOut" }}
              className="inline-block mr-[0.28em]"
            >
              {word}
            </motion.span>
          ))}
        </p>
      </div>
    </Card>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  CARD 8 — PROCESS  (light)
//  Animation: bars fill left→right sequentially, step labels fade in
// ═══════════════════════════════════════════════════════════════════════════════
const STEPS = [
  { label: "Discovery", w: 92 },
  { label: "Strategy", w: 76 },
  { label: "Build", w: 60 },
  { label: "Ship", w: 44 },
];

function ProcessCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <Card delay={0.26} className="col-span-2">
      <Label>Process</Label>
      <div ref={ref} className="mt-1 space-y-3">
        {STEPS.map(({ label, w }, i) => (
          <div key={label} className="flex items-center gap-2.5">
            <span className="w-4 shrink-0 font-mono text-[10px]"
              style={{ color: `${C.muted}45` }}>
              {String(i + 1).padStart(2, "0")}
            </span>

            <div className="relative h-0.75 flex-1 rounded-full overflow-hidden"
              style={{ background: `${C.dark}10` }}>
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{ background: C.dark, originX: 0 }}
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.9, delay: 0.2 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              />
              {/* shimmer */}
              {inView && (
                <motion.div
                  className="absolute inset-y-0 w-8 rounded-full"
                  style={{ background: `linear-gradient(90deg, transparent, rgba(217,215,203,0.5), transparent)` }}
                  initial={{ x: "-100%", opacity: 0 }}
                  animate={{ x: `${w * 4}%`, opacity: [0, 1, 0] }}
                  transition={{ duration: 0.6, delay: 1.0 + i * 0.15, ease: "easeOut" }}
                />
              )}
            </div>

            <motion.span
              className="shrink-0 font-mono text-[11px]"
              style={{ color: `${C.muted}75` }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.15 }}
            >
              {label}
            </motion.span>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  CARD 9 — CURRENTLY THINKING  (light, new)
//  Animation: typewriter cycling through topics
// ═══════════════════════════════════════════════════════════════════════════════
const THOUGHTS = [
  "Web performance optimisation",
  "Micro-interaction patterns",
  "Minimal design systems",
  "Next.js 15 edge rendering",
  "Typography as personality",
];

function ThinkingCard() {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const target = THOUGHTS[idx];
    let i = typing ? 0 : target.length;

    const id = setInterval(() => {
      if (typing) {
        i++;
        setDisplayed(target.slice(0, i));
        if (i === target.length) { clearInterval(id); setTimeout(() => setTyping(false), 1600); }
      } else {
        i--;
        setDisplayed(target.slice(0, i));
        if (i === 0) {
          clearInterval(id);
          setIdx((prev) => (prev + 1) % THOUGHTS.length);
          setTyping(true);
        }
      }
    }, typing ? 45 : 28);

    return () => clearInterval(id);
  }, [idx, typing]);

  return (
    <Card delay={0.3} className="col-span-2">
      <Label>Currently thinking about</Label>
      <p className="mt-1 min-h-[2.8rem] text-sm font-medium leading-snug" style={{ color: C.dark }}>
        {displayed}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
          className="ml-0.5 inline-block w-0.5 h-[1em] align-middle rounded-sm"
          style={{ background: C.dark, verticalAlign: "text-bottom" }}
        />
      </p>
    </Card>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  ROOT
// ═══════════════════════════════════════════════════════════════════════════════
export function BentoGrid() {
  return (
    <section className="w-full px-4 py-16 sm:px-6">
      <div
        className="mx-auto grid w-full max-w-4xl gap-3"
        style={{
          gridTemplateColumns: "repeat(6, 1fr)",
          gridAutoRows: "minmax(110px, auto)",
        }}
      >
        {/*
         *  6-col layout:
         *  Row 1–2 │ Identity(2×2) │ Availability(2)  │ Location(2)     │
         *  Row 2   │               │ Approach 01(2)   │ Approach 02(2)  │
         *  Row 3   │ Stats(4)                          │ CTA(2)          │
         *  Row 4   │ Quote(4)                          │ Process(2)      │
         *  Row 5   │ Thinking(2)   │ (gap)             │ (gap)           │
         */}

        {/* Row 1-2 */}
        <IdentityCard />        {/* col 1-2 row 1-2 */}
        <AvailabilityCard />    {/* col 3-4 */}
        <LocationCard />        {/* col 5-6 */}
        <ApproachCard index="01" title="Goal-oriented design"
          body="Every decision traces back to a measurable outcome — aesthetics serve the strategy."
          delay={0.12} />
        <ApproachCard index="02" title="Ship, then sharpen"
          body="Fast delivery without cutting corners. Built to iterate, not to guess."
          delay={0.16} />

        {/* Row 3 */}
        <StatsCard />           {/* col 1-4 */}
        <CtaCard />             {/* col 5-6 */}

        {/* Row 4 */}
        <QuoteCard />           {/* col 1-4 */}
        <ProcessCard />         {/* col 5-6 */}

        {/* Row 5 */}
        <ThinkingCard />        {/* col 1-2 */}
      </div>
    </section>
  );
}

export default BentoGrid;