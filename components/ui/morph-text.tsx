"use client";

import React, { useId } from "react";
import { cn } from "../../lib/utils";

export interface MorphTextProps {
  // ─── ADJUSTABLE ───────────────────────────────────────────────────────────
  // `staticPrefix` — text that NEVER morphs, always shown left of the cycling words.
  // Default is "MINHAJ". Set to "" to remove it entirely.
  staticPrefix?: string;

  // `words` — the words that cycle with the morph/blur animation.
  // ADJUSTABLE: change or reorder these at any time.
  words?: string[];

  // `interval` — milliseconds each word stays visible before morphing to the next.
  // ADJUSTABLE: increase for slower transitions, decrease for faster.
  interval?: number;

  // `fontSize` — CSS clamp() string controlling the display size of ALL text
  // (both the static prefix and the morphing words use this same size).
  // ADJUSTABLE: change the clamp values to resize; all three params are:
  //   clamp(MIN, PREFERRED, MAX)
  fontSize?: string;

  className?: string;       // wrapper div classes
  textClassName?: string;   // applied to both the static prefix AND the morph rotator
}

export function MorphText({
  // ─── DEFAULTS ─────────────────────────────────────────────────────────────
  words = ["CREATE", "DESIGN", "DEPLOY"], // ADJUSTABLE: morphing words
  interval = 3500,                       // ADJUSTABLE: ms per word
  fontSize = "clamp(3rem, 12vw, 12rem)", // ADJUSTABLE: display size
  className,
  textClassName,
}: MorphTextProps) {
  const uid = useId().replace(/:/g, "");
  const filterId = `morph-threshold-${uid}`;

  // Total animation loop duration = one slot per word × number of words
  const totalDuration = (interval / 1000) * words.length;
  const wordDuration = interval / 1000;

  // Each word occupies 1/N of the 100% keyframe timeline
  const f = 100 / words.length;

  return (
    // ── ROOT WRAPPER ─────────────────────────────────────────────────────────
    // ADJUSTABLE: `items-start` = left-aligned. Change to `items-center` for centered.
    <div
      className={cn(
        "morph-text-root relative flex flex-col items-start justify-center w-full overflow-visible",
        className
      )}
    >

      {/* ── SVG GOO FILTER — do not touch unless tweaking the blur effect ──── */}
      {/*
        The feColorMatrix `values` control the threshold of the goo morph.
        • 4th-last value (35) = sharpness of the edge. Higher = harder edge.
        • Last value (-12)    = how much alpha is clipped. More negative = tighter.
        ADJUSTABLE: try `28 -10` for a softer blend, `45 -18` for a harder snap.
      */}
      <svg
        aria-hidden="true"
        focusable="false"
        style={{ position: "absolute", width: 0, height: 0, pointerEvents: "none" }}
      >
        <defs>
          <filter id={filterId}>
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -12"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* ── MAIN TEXT ROW ────────────────────────────────────────────────────
          Layout: [STATIC PREFIX] [MORPHING WORD]
          They sit side-by-side on the same baseline, same font, same size.
          The goo filter wraps BOTH so the morph blends between them.
          ──────────────────────────────────────────────────────────────────── */}
      <div
        className={cn(
          // ADJUSTABLE: `justify-start` = left-aligned row. Change to `justify-center` for centered.
          "morph-text-container relative select-none font-bebas tracking-wide text-foreground w-full flex flex-row items-center justify-start gap-[0.15em]",
          textClassName
        )}
        style={{
          fontSize,
          // The goo filter is applied to the whole row so static + morphing word blur together
          filter: `url(#${filterId})`,
        }}
      >




        {/* ── MORPHING WORD ROTATOR ─────────────────────────────────────────
            Fixed-width container so the layout doesn't shift as words change.
            ADJUSTABLE:
            • `height: "1.2em"` — increase if tall letters like Å get clipped.
            • The `width` is intentionally `auto` / full — the absolute children
              span their natural width. If you want a fixed column, set a px width.
        */}
        <div
          className="morph-word-rotator relative flex items-center"
          style={{ height: "1.2em", flex: "1 1 auto" }}
        >
          {words.map((word, i) => (
            <span
              key={`${word}-${i}`}
              className="morph-word absolute left-0 font-black"
              style={{
                opacity: 0,
                whiteSpace: "nowrap",
                display: "inline-block",
                // ── ANIMATION CONFIG ──────────────────────────────────────
                // Each word uses the SAME keyframe, just staggered by `animationDelay`.
                // ADJUSTABLE:
                // • animationDelay: `i * wordDuration` — staggers each word's start.
                // • animationDuration: `totalDuration` — full loop length.
                // • animationTimingFunction: try "linear" for a mechanical feel.
                animationName: "morph-word-smooth",
                animationTimingFunction: "ease-in-out",
                animationIterationCount: "infinite",
                animationFillMode: "both",
                animationDelay: `${i * wordDuration}s`,
                animationDuration: `${totalDuration}s`,
              }}
            >
              {word}
            </span>
          ))}
        </div>

      </div>
      {/* ── END MAIN TEXT ROW ──────────────────────────────────────────────── */}

      {/* ── KEYFRAME STYLES ──────────────────────────────────────────────────
          The overlap trick: word fades OUT at `f * 1.25` — 25% into the NEXT
          word's slot — so they blur into each other via the goo filter.

          ADJUSTABLE:
          • `f * 0.15` — how quickly the word fades IN. Smaller = snappier.
          • `f * 0.8`  — when it starts fading OUT. Larger = longer hold.
          • `f * 1.25` — how far into the next word's time it bleeds. More = more overlap.
          • blur(25px) — strength of the blur at transition. Lower = subtler.
          • translateY(10px) / scale(0.95) — entry transform. Remove for no movement.
      */}
      <style>{`
        @keyframes morph-word-smooth {
          0% {
            opacity: 0;
            filter: blur(25px);
            transform: translateY(10px) scale(0.95);
          }
          ${f * 0.15}% {
            opacity: 1;
            filter: blur(0px);
            transform: translateY(0px) scale(1);
          }
          ${f * 0.8}% {
            opacity: 1;
            filter: blur(0px);
            transform: translateY(0px) scale(1);
          }
          /* Bleeds into next word's time window for the goo overlap effect */
          ${f * 1.25}% {
            opacity: 0;
            filter: blur(25px);
            transform: translateY(-10px) scale(1.05);
          }
          100% {
            opacity: 0;
            filter: blur(25px);
          }
        }
      `}</style>

    </div>
  );
}

export default MorphText;