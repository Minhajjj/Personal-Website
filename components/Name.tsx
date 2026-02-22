"use client";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
  useCallback,
} from "react";

export type MinhajRef = {
  text: HTMLDivElement | null;
};

const Minhaj = forwardRef<MinhajRef>((props, ref) => {
  const textRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    text: textRef.current,
  }));

  const fitText = useCallback(() => {
    const el = textRef.current;
    if (!el) return;

    el.style.visibility = "hidden";
    el.style.position = "absolute";
    el.style.fontSize = "200px";
    el.style.whiteSpace = "nowrap";
    el.style.width = "auto";

    const naturalWidth = el.getBoundingClientRect().width;

    el.style.visibility = "";
    el.style.position = "";
    el.style.width = "";

    if (naturalWidth === 0) return;

    const targetWidth = document.documentElement.clientWidth;
    const newSize = (targetWidth / naturalWidth) * 200;
    el.style.fontSize = `${newSize}px`;
  }, []);

  useEffect(() => {
    fitText();
    document.fonts.ready.then(fitText);

    const observer = new ResizeObserver(fitText);
    observer.observe(document.documentElement);
    return () => observer.disconnect();
  }, [fitText]);

  return (
    // Outer wrapper clips the font's built-in ascender whitespace
    <div style={{ overflow: "hidden", lineHeight: 1 }}>
      <div
        ref={textRef}
        className="font-sans font-semibold uppercase whitespace-nowrap block"
        style={{
          fontSize: "200px",
          lineHeight: 0.85, // tighter than 1 pulls text up into the clip
          marginBottom: "-0.05em", // remove descender gap at the bottom too
        }}
      >
        MINHAJ
      </div>
    </div>
  );
});

Minhaj.displayName = "Minhaj";

export default Minhaj;
