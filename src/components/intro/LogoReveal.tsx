import { forwardRef } from "react";

const INTRO_LOGO_ASPECT_RATIO = 713 / 561;

interface Props {
  size: number;
  registerMark: (el: HTMLImageElement | null) => void;
  registerNavWhite: (el: HTMLImageElement | null) => void;
  registerNavColored: (el: HTMLImageElement | null) => void;
}

/**
 * Official brand assets:
 *  - logo-white.svg      → the intro mark
 *  - logo-nav-white.svg  → the navigation lockup (mark + wordmark)
 * The two are stacked and crossfaded; the mark boxes are aligned so the
 * transition reads as one continuous logo.
 */
export const LogoReveal = forwardRef<HTMLDivElement, Props>(function LogoReveal(
  { size, registerMark, registerNavWhite, registerNavColored },
  ref,
) {
  const frameWidth = size * INTRO_LOGO_ASPECT_RATIO;
  const frameHeight = size;

  return (
    <div
      ref={ref}
      aria-hidden
      className="absolute top-0 left-0 will-change-transform"
      style={{ width: frameWidth, height: frameHeight, transformOrigin: "left center" }}
    >
      <img
        ref={registerMark}
        src="/images/logos/logo-white.svg"
        alt=""
        className="absolute inset-0 h-full w-full object-contain"
        draggable={false}
      />
      <img
        ref={registerNavWhite}
        src="/images/logos/logo-nav-white.svg"
        alt=""
        className="absolute max-w-none object-contain"
        style={{
          left: frameWidth * 0.084,
          top: frameHeight * 0.07,
          height: frameHeight * 1.08,
          opacity: 0,
        }}
        draggable={false}
      />
      <img
        ref={registerNavColored}
        src="/images/logos/logo-nav-colored.svg"
        alt=""
        className="absolute inset-0 h-full w-full object-contain"
        style={{ opacity: 0 }}
        draggable={false}
      />
    </div>
  );
});
