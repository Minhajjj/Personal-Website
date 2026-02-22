"use client";

import React, { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import {
  animateHeroPanel,
  revealPanel,
  typewriterEffect,
  animateProgressBars,
  floatBadge,
} from "@/lib/gsapAnimations";

// ─── Constants ─────────────────────────────────────────────────────────────────
const PANEL_COUNT = 6;
// Total scroll distance = (panels - 1) × 100vh
// The outer wrapper is PANEL_COUNT × 100vh tall

// ─── Terminal Block ─────────────────────────────────────────────────────────────
function TerminalBlock({ lines }: { lines: string[] }) {
  const preRef = useRef<HTMLPreElement>(null);
  useEffect(() => {
    if (preRef.current) typewriterEffect(preRef.current, lines, 0.5);
  }, [lines]);

  return (
    <div
      className="panel-visual rounded-2xl overflow-hidden shadow-md"
      style={{ border: "1px solid #b0ab9f" }}
    >
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{ background: "#b8b3a8", borderBottom: "1px solid #a8a39a" }}
      >
        <span
          className="w-2.5 h-2.5 rounded-full"
          style={{ background: "#c0392b" }}
        />
        <span
          className="w-2.5 h-2.5 rounded-full"
          style={{ background: "#d4a017" }}
        />
        <span
          className="w-2.5 h-2.5 rounded-full"
          style={{ background: "#27ae60" }}
        />
        <span className="ml-3 font-mono text-xs" style={{ color: "#6b6660" }}>
          terminal
        </span>
      </div>
      <pre
        ref={preRef}
        className="font-mono text-sm leading-relaxed whitespace-pre-wrap p-6 min-h-[130px]"
        style={{ background: "#1a1815", color: "#a8c080" }}
      />
    </div>
  );
}

// ─── Pipeline Visual ────────────────────────────────────────────────────────────
function PipelineVisual() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) animateProgressBars(ref.current);
  }, []);

  const steps = [
    { label: "lint + type-check", time: "8s", done: true, delay: 0 },
    { label: "unit tests", time: "23s", done: true, delay: 0.15 },
    { label: "build + bundle", time: "14s", done: true, delay: 0.3 },
    { label: "deploy preview", time: "—", done: false, delay: 0.45 },
  ];

  return (
    <div
      ref={ref}
      className="panel-visual flex flex-col gap-5 p-6 rounded-2xl"
      style={{ background: "#bfbab0", border: "1px solid #b0ab9f" }}
    >
      <p
        className="font-mono text-xs uppercase tracking-widest mb-1"
        style={{ color: "#8a8480" }}
      >
        workflow run #247 — main
      </p>
      {steps.map((s) => (
        <div key={s.label} className="flex items-center gap-4">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold flex-shrink-0"
            style={{
              background: s.done ? "#1a1815" : "transparent",
              color: s.done ? "#c8c3b8" : "#a8a39a",
              border: s.done ? "none" : "1.5px solid #b0ab9f",
            }}
          >
            {s.done ? "✓" : "○"}
          </div>
          <div className="flex-1">
            <div className="flex justify-between mb-1.5">
              <span
                className="font-mono text-xs uppercase tracking-widest"
                style={{ color: "#6b6660" }}
              >
                {s.label}
              </span>
              <span
                className="font-mono text-xs"
                style={{ color: s.done ? "#1a1815" : "#b0ab9f" }}
              >
                {s.time}
              </span>
            </div>
            <div
              className="h-1 rounded-full overflow-hidden"
              style={{ background: "#c8c3b8" }}
            >
              <div
                className="progress-fill h-full rounded-full"
                data-width={s.done ? "100%" : "0%"}
                data-delay={s.delay}
                style={{ background: "#1a1815", width: 0 }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Dockerfile Visual ──────────────────────────────────────────────────────────
function DockerVisual() {
  const lines = [
    { text: "FROM node:20-alpine", color: "#e0ddd8" },
    { text: "WORKDIR /app", color: "#a8c080" },
    { text: "COPY package*.json .", color: "#8a8480" },
    { text: "RUN npm ci --only=prod", color: "#a8c080" },
    { text: "COPY . .", color: "#8a8480" },
    { text: "RUN npm run build", color: "#a8c080" },
    { text: "EXPOSE 3000", color: "#e0ddd8" },
    { text: 'CMD ["node","server.js"]', color: "#80c8a0" },
  ];
  return (
    <div
      className="panel-visual rounded-2xl overflow-hidden shadow-md"
      style={{ border: "1px solid #b0ab9f" }}
    >
      <div
        className="px-4 py-3 font-mono text-xs"
        style={{
          background: "#b8b3a8",
          borderBottom: "1px solid #a8a39a",
          color: "#6b6660",
        }}
      >
        Dockerfile
      </div>
      <div className="p-5 space-y-2" style={{ background: "#1a1815" }}>
        {lines.map((l, i) => (
          <div
            key={i}
            className="step-item flex items-start gap-4 font-mono text-sm"
          >
            <span
              className="text-xs w-4 text-right flex-shrink-0"
              style={{ color: "#3d3832" }}
            >
              {i + 1}
            </span>
            <span style={{ color: l.color }}>{l.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Cloud Visual ───────────────────────────────────────────────────────────────
function CloudVisual() {
  const badgeRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (badgeRef.current) floatBadge(badgeRef.current);
  }, []);

  return (
    <div className="panel-visual relative">
      <div
        ref={badgeRef}
        className="absolute -top-5 -right-5 w-20 h-20 rounded-full flex flex-col items-center justify-center z-10 shadow-lg"
        style={{ background: "#1a1815", color: "#c8c3b8" }}
      >
        <span className="font-mono text-xs font-bold">LIVE</span>
        <span className="text-lg">✓</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[
          { name: "Vercel", role: "Frontend / Edge" },
          { name: "Railway", role: "Backend / API" },
          { name: "Cloudflare", role: "DNS + CDN" },
          { name: "Supabase", role: "Database" },
        ].map((s) => (
          <div
            key={s.name}
            className="step-item rounded-xl p-4"
            style={{ background: "#bfbab0", border: "1px solid #b0ab9f" }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "#27ae60" }}
              />
              <span
                className="font-mono text-[10px] uppercase tracking-widest"
                style={{ color: "#8a8480" }}
              >
                active
              </span>
            </div>
            <p
              className="font-mono text-sm font-bold"
              style={{ color: "#1a1815" }}
            >
              {s.name}
            </p>
            <p
              className="font-mono text-xs mt-0.5"
              style={{ color: "#6b6660" }}
            >
              {s.role}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Metrics Visual ─────────────────────────────────────────────────────────────
function MetricsVisual({
  metrics,
}: {
  metrics: { label: string; value: string; width: string }[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) animateProgressBars(ref.current);
  }, []);

  return (
    <div ref={ref} className="panel-visual space-y-7">
      {metrics.map((m, i) => (
        <div key={m.label}>
          <div className="flex justify-between mb-2">
            <span
              className="font-mono text-xs uppercase tracking-widest"
              style={{ color: "#6b6660" }}
            >
              {m.label}
            </span>
            <span
              className="font-mono text-sm font-bold"
              style={{ color: "#1a1815" }}
            >
              {m.value}
            </span>
          </div>
          <div
            className="h-1.5 rounded-full overflow-hidden"
            style={{ background: "#b8b3a8" }}
          >
            <div
              className="progress-fill h-full rounded-full"
              data-width={m.width}
              data-delay={i * 0.15}
              style={{ background: "#1a1815", width: 0 }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Tags row ────────────────────────────────────────────────────────────────────
function Tags({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((t) => (
        <span
          key={t}
          className="tech-tag font-mono text-xs px-3 py-1.5 rounded-full"
          style={{ border: "1px solid #a8a39a", color: "#6b6660" }}
        >
          {t}
        </span>
      ))}
    </div>
  );
}

// ─── Shared panel heading block ───────────────────────────────────────────────
function PanelLeft({
  eyebrow,
  title,
  body,
  tags,
}: {
  eyebrow: string;
  title: string;
  body: string;
  tags: string[];
}) {
  return (
    <div>
      <p
        className="panel-eyebrow font-mono text-xs tracking-[0.3em] mb-6"
        style={{ color: "#8a8480" }}
      >
        {eyebrow}
      </p>
      <h2
        className="panel-title font-sans leading-none mb-7"
        style={{
          fontSize: "clamp(2.4rem, 5vw, 5rem)",
          color: "#1a1815",
          fontWeight: 600,
          letterSpacing: "-0.03em",
        }}
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <p
        className="panel-body font-mono text-sm leading-relaxed mb-9"
        style={{ color: "#6b6660" }}
      >
        {body}
      </p>
      <Tags items={tags} />
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────────
export default function DeployPage() {
  // The outer scroll container — its height drives everything
  const outerRef = useRef<HTMLDivElement>(null);
  // The sticky inner that stays in viewport
  const stickyRef = useRef<HTMLDivElement>(null);
  // The horizontal track that slides
  const trackRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // Track which panels have been revealed
  const revealedRef = useRef<Set<number>>(new Set());

  const onScroll = useCallback(() => {
    const outer = outerRef.current;
    const track = trackRef.current;
    const bar = progressRef.current;
    if (!outer || !track) return;

    const outerRect = outer.getBoundingClientRect();
    const totalScrollable = outer.offsetHeight - window.innerHeight;

    // How far we've scrolled into this section (0 → 1)
    const scrolled = Math.max(0, Math.min(1, -outerRect.top / totalScrollable));

    // Translate track: 0 at start, -(totalWidth - vw) at end
    const maxTranslate = track.scrollWidth - window.innerWidth;
    const translateX = scrolled * maxTranslate;
    track.style.transform = `translateX(${-translateX}px)`;

    // Progress bar
    if (bar) bar.style.width = `${scrolled * 100}%`;

    // Reveal panels as they enter ~20% from right edge
    const panels = track.querySelectorAll<HTMLElement>(".deploy-panel");
    panels.forEach((panel, i) => {
      if (i === 0) return; // hero is handled separately
      const panelLeft = i * window.innerWidth - translateX;
      if (panelLeft < window.innerWidth * 0.8 && !revealedRef.current.has(i)) {
        revealedRef.current.add(i);
        revealPanel(panel);
      }
    });
  }, []);

  useEffect(() => {
    // Animate hero immediately
    if (heroRef.current) animateHeroPanel(heroRef.current);

    // Listen to scroll — works with Lenis because Lenis still fires native scroll events
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // run once on mount

    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  const panelStyle: React.CSSProperties = {
    width: "100vw",
    height: "100vh",
    flexShrink: 0,
    position: "relative",
    display: "flex",
    alignItems: "center",
    padding: "0 7vw",
    background: "#c8c3b8",
  };

  const divider = (
    <div
      className="absolute left-0 top-[10%] bottom-[10%] w-px pointer-events-none"
      style={{
        background:
          "linear-gradient(to bottom, transparent, #a8a39a 30%, #a8a39a 70%, transparent)",
      }}
    />
  );

  const bgNum = (n: string) => (
    <div
      className="bg-number absolute right-0 bottom-0 select-none pointer-events-none font-mono font-bold leading-none"
      style={{
        fontSize: "clamp(9rem,22vw,20rem)",
        color: "#bab5aa",
        lineHeight: 0.85,
        letterSpacing: "-0.05em",
      }}
    >
      {n}
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');
        .deploy-page { font-family: 'IBM Plex Mono', monospace; }
        .deploy-page h1, .deploy-page h2 { font-family: 'Syne', sans-serif; }
      `}</style>

      {/* Top progress bar — fixed, always visible */}
      <div
        className="fixed top-0 left-0 right-0 z-[999] h-px"
        style={{ background: "#b8b3a8" }}
      >
        <div
          ref={progressRef}
          style={{
            height: "100%",
            background: "#1a1815",
            width: "0%",
            transition: "width 0.05s linear",
          }}
        />
      </div>

      {/* 
        OUTER: tall enough to provide scroll distance.
        (PANEL_COUNT - 1) × 100vh of scroll = all panels slide through.
        We add +1 so the last panel fully settles.
      */}
      <div
        ref={outerRef}
        className="deploy-page"
        style={{ height: `${PANEL_COUNT * 100}vh`, background: "#c8c3b8" }}
      >
        {/*
          STICKY inner: stays pinned to viewport top.
          overflow:hidden clips the track as it slides.
        */}
        <div
          ref={stickyRef}
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            overflow: "hidden",
            width: "100%",
          }}
        >
          {/*
            TRACK: flex row, width = panels × 100vw.
            transform is driven by onScroll.
          */}
          <div
            ref={trackRef}
            style={{
              display: "flex",
              flexWrap: "nowrap",
              height: "100vh",
              width: `${PANEL_COUNT * 100}vw`,
              willChange: "transform",
            }}
          >
            {/* ══ PANEL 1 — HERO ══════════════════════════════════════════ */}
            <div
              id="panel-hero"
              ref={heroRef}
              className="deploy-panel"
              style={panelStyle}
            >
              {/* Ghost letters */}
              <div
                className="absolute bottom-0 right-0 select-none pointer-events-none overflow-hidden"
                style={{ lineHeight: 1 }}
              >
                <span
                  className="font-sans font-bold"
                  style={{
                    fontSize: "clamp(14rem,35vw,36rem)",
                    color: "#bab5aa",
                    letterSpacing: "-0.06em",
                    lineHeight: 0.82,
                    display: "block",
                  }}
                >
                  DEP
                </span>
              </div>

              <div className="relative z-10" style={{ maxWidth: 640 }}>
                <p
                  className="hero-eyebrow font-mono text-xs tracking-[0.3em] mb-8"
                  style={{ color: "#8a8480" }}
                >
                  MINHAJ CREATIVE STUDIO — PROCESS OVERVIEW
                </p>
                <h1
                  className="hero-title font-sans leading-none mb-8"
                  style={{
                    fontSize: "clamp(3.5rem, 8vw, 8.5rem)",
                    color: "#1a1815",
                    fontWeight: 600,
                    letterSpacing: "-0.03em",
                  }}
                >
                  How I deploy
                  <br />
                  <span style={{ color: "#7a7570" }}>things that</span>
                  <br />
                  actually work.
                </h1>
                <p
                  className="hero-sub font-mono text-sm leading-relaxed mb-10"
                  style={{ color: "#6b6660", maxWidth: 420 }}
                >
                  From first commit to live, monitored, production-grade product
                  — the full pipeline, no gaps.
                </p>
                <div
                  className="hero-hint flex items-center gap-5 font-mono text-xs"
                  style={{ color: "#8a8480" }}
                >
                  <span>SCROLL TO EXPLORE</span>
                  <span
                    className="hint-arrow inline-block"
                    style={{ color: "#1a1815" }}
                  >
                    ——→
                  </span>
                </div>
              </div>
            </div>

            {/* ══ PANEL 2 — GIT ═══════════════════════════════════════════ */}
            <div id="panel-git" className="deploy-panel" style={panelStyle}>
              {divider}
              {bgNum("01")}
              <div
                className="relative z-10 grid grid-cols-2 gap-16 items-center w-full"
                style={{ maxWidth: "88rem" }}
              >
                <PanelLeft
                  eyebrow="SOURCE CONTROL"
                  title="Code lives<br/>in Git."
                  body="Every project starts with a clean repo. Feature branches, conventional commits, and protected main keep history meaningful and deployments safe."
                  tags={[
                    "Git",
                    "GitHub",
                    "Conventional Commits",
                    "Branch Protection",
                  ]}
                />
                <div className="flex flex-col gap-5">
                  <TerminalBlock
                    lines={[
                      "git checkout -b feat/new-section\n",
                      "git add -A && git commit -m 'feat: add hero'\n",
                      "git push origin feat/new-section",
                    ]}
                  />
                  <div className="flex flex-col gap-2.5 pl-1">
                    {[
                      "Create feature branch",
                      "Semantic commit messages",
                      "Open pull request",
                      "Review → merge to main",
                    ].map((s, i) => (
                      <div
                        key={i}
                        className="step-item flex items-center gap-3 font-mono text-xs"
                        style={{ color: "#6b6660" }}
                      >
                        <span style={{ color: "#1a1815" }}>◆</span>
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ══ PANEL 3 — CI/CD ══════════════════════════════════════════ */}
            <div id="panel-ci" className="deploy-panel" style={panelStyle}>
              {divider}
              {bgNum("02")}
              <div
                className="relative z-10 grid grid-cols-2 gap-16 items-center w-full"
                style={{ maxWidth: "88rem" }}
              >
                <PanelLeft
                  eyebrow="CI / CD PIPELINE"
                  title="Push triggers<br/>everything."
                  body="GitHub Actions fires the moment code lands. Lint, type-check, test — all automatic. No manual steps, no skipped checks."
                  tags={[
                    "GitHub Actions",
                    "ESLint",
                    "TypeScript",
                    "Vitest",
                    "Playwright",
                  ]}
                />
                <PipelineVisual />
              </div>
            </div>

            {/* ══ PANEL 4 — DOCKER ══════════════════════════════════════════ */}
            <div id="panel-docker" className="deploy-panel" style={panelStyle}>
              {divider}
              {bgNum("03")}
              <div
                className="relative z-10 grid grid-cols-2 gap-16 items-center w-full"
                style={{ maxWidth: "88rem" }}
              >
                <PanelLeft
                  eyebrow="CONTAINERISATION"
                  title="Ship the<br/>environment."
                  body="Docker ensures what runs on my machine runs everywhere. Multi-stage builds keep images lean. Compose wires services together locally."
                  tags={[
                    "Docker",
                    "Docker Compose",
                    "Multi-stage builds",
                    "Alpine Linux",
                  ]}
                />
                <DockerVisual />
              </div>
            </div>

            {/* ══ PANEL 5 — CLOUD ═══════════════════════════════════════════ */}
            <div id="panel-cloud" className="deploy-panel" style={panelStyle}>
              {divider}
              {bgNum("04")}
              <div
                className="relative z-10 grid grid-cols-2 gap-16 items-center w-full"
                style={{ maxWidth: "88rem" }}
              >
                <PanelLeft
                  eyebrow="INFRASTRUCTURE"
                  title="Deploy to<br/>the edge."
                  body="Vercel for Next.js. Railway for backends. Cloudflare for DNS and edge caching. Infrastructure as code keeps everything reproducible."
                  tags={[
                    "Vercel",
                    "Railway",
                    "Fly.io",
                    "Cloudflare",
                    "Terraform",
                  ]}
                />
                <CloudVisual />
              </div>
            </div>

            {/* ══ PANEL 6 — MONITOR ══════════════════════════════════════════ */}
            <div id="panel-monitor" className="deploy-panel" style={panelStyle}>
              {divider}
              {bgNum("05")}
              <div
                className="relative z-10 grid grid-cols-2 gap-16 items-center w-full"
                style={{ maxWidth: "88rem" }}
              >
                <PanelLeft
                  eyebrow="OBSERVABILITY"
                  title="Watch it<br/>live."
                  body="Sentry catches errors before clients do. Analytics track vitals. Uptime monitors ping every minute. Sleep easy."
                  tags={[
                    "Sentry",
                    "Vercel Analytics",
                    "Better Uptime",
                    "LogDNA",
                  ]}
                />
                <MetricsVisual
                  metrics={[
                    { label: "Uptime", value: "99.9%", width: "99%" },
                    { label: "Build time", value: "< 45s", width: "75%" },
                    { label: "TTFB", value: "< 120ms", width: "88%" },
                    { label: "Lighthouse", value: "98 / 100", width: "98%" },
                  ]}
                />
              </div>
              <div
                className="absolute bottom-8 right-10 font-mono text-xs"
                style={{ color: "#a8a39a" }}
              >
                end of pipeline — that&apos;s how it ships.
              </div>
            </div>
          </div>
          {/* end track */}
        </div>
        {/* end sticky */}
      </div>
      {/* end outer */}
    </>
  );
}
