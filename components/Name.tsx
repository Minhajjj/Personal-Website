import React, { forwardRef, useImperativeHandle, useRef } from "react";

export type MinhajRef = {
  text: HTMLDivElement | null;
};

const Minhaj = forwardRef<MinhajRef>((props, ref) => {
  const textRef = useRef<HTMLDivElement>(null);

  // Expose the textRef to the parent via ref
  useImperativeHandle(ref, () => ({
    text: textRef.current,
  }));

  const name = "MINHAJ";

  return (
    <div
      ref={textRef}
      className="font-sans font-semibold w-full uppercase tracking-wide leading-[0.9] Minhaj m-0 p-0 text-[clamp(8rem,25vw,25rem)] block overflow-hidden align-top"
    >
      {name.split("").map((letter, index) => (
        <span key={index} className="inline-block overflow-hidden">
          {letter}
        </span>
      ))}
    </div>
  );
});

Minhaj.displayName = "Minhaj";

export default Minhaj;
