import { forwardRef } from "react";

interface Props {
  items: Array<{ year: number; fontSize: number }>;
  register: (el: HTMLSpanElement | null, index: number) => void;
}

/** Absolutely positioned year labels, transformed by the GSAP timeline. */
export const YearsAnimation = forwardRef<HTMLDivElement, Props>(
  function YearsAnimation({ items, register }, ref) {
    return (
      <div
        ref={ref}
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {items.map((it, i) => (
          <span
            key={i}
            ref={(el) => register(el, i)}
            className="absolute top-0 left-0 font-display font-semibold tracking-tight text-white will-change-transform"
            style={{ fontSize: it.fontSize, lineHeight: 1 }}
          >
            {it.year}
          </span>
        ))}
      </div>
    );
  },
);
