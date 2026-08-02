import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { YearsAnimation } from "./YearsAnimation";
import { LogoReveal } from "./LogoReveal";
import { YEARS, buildIntroTimeline, samplePolyline } from "./IntroTimeline";

const POINT_COUNT = 66;
const INTRO_LOGO_ASPECT_RATIO = 713 / 561;

interface Props {
  onReveal: () => void;
  onFinish: () => void;
  replayKey?: number;
}

export function Intro({ onReveal, onFinish, replayKey = 0 }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const yearEls = useRef<HTMLSpanElement[]>([]);
  const logoWrapRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLImageElement | null>(null);
  const navWhiteRef = useRef<HTMLImageElement | null>(null);
  const navColoredRef = useRef<HTMLImageElement | null>(null);
  const ambientRef = useRef<HTMLDivElement | null>(null);
  const spotRef = useRef<HTMLDivElement | null>(null);

  const [logoSize, setLogoSize] = useState(0);
  const startedRef = useRef(false);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const items = useMemo(
    () =>
      Array.from({ length: POINT_COUNT }, (_, i) => ({
        year: YEARS[i % YEARS.length],
        fontSize: 11 + ((i * 7) % 5) * 2.5,
      })),
    [],
  );

  useLayoutEffect(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const maxWidth = Math.min(vw * 0.56, 420);
    const maxHeight = Math.min(vh * 0.42, 320);
    const logoHeight = Math.max(140, Math.min(maxHeight, 320));
    const logoWidth = Math.min(logoHeight * INTRO_LOGO_ASPECT_RATIO, maxWidth);
    const safeLogoHeight = Math.max(140, Math.min(logoHeight, logoWidth / INTRO_LOGO_ASPECT_RATIO));

    setLogoSize(safeLogoHeight);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    startedRef.current = false;
    tlRef.current?.kill();
    tlRef.current = null;
  }, [replayKey]);

  useEffect(() => {
    if (!logoSize || !rootRef.current || !logoWrapRef.current) return;
    if (startedRef.current) return;
    startedRef.current = true;
    {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const logoHeight = logoSize;
      const logoWidth = logoHeight * INTRO_LOGO_ASPECT_RATIO;
      const boxX = vw / 2 - logoWidth / 2;
      const boxY = vh / 2 - logoHeight / 2;

      const wrap = logoWrapRef.current!;
      wrap.style.left = `${boxX}px`;
      wrap.style.top = `${boxY}px`;

      const els = yearEls.current.filter(Boolean);
      const pts = samplePolyline(els.length);

      const targets = pts.map((p, i) => {
        const el = els[i];
        const jitterX = ((i * 37) % 11) - 5;
        const jitterY = ((i * 53) % 11) - 5;
        return {
          x: boxX + p.x * logoWidth - el.offsetWidth / 2 + jitterX,
          y: boxY + p.y * logoHeight - el.offsetHeight / 2 + jitterY,
          scale: 0.72 + ((i * 13) % 5) * 0.06,
        };
      });

      const starts = els.map((el, i) => {
        const r = (n: number) => ((Math.sin(i * n) + 1) / 2);
        return {
          x: r(12.9898) * (vw - el.offsetWidth),
          y: r(78.233) * (vh - el.offsetHeight),
          scale: 0.6 + r(43.7) * 1.1,
          opacity: 0.18 + r(19.3) * 0.55,
        };
      });

      // Gentle float, independent of the main transform timeline.
      els.forEach((el, i) => {
        gsap.to(el, {
          yPercent: i % 2 ? 6 : -6,
          duration: 3 + (i % 5) * 0.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // Final position = the real navbar logo slot.
      const navImg = document.querySelector<HTMLElement>('header img[alt="KLiC logo"]');
      const rect = navImg?.getBoundingClientRect();
      const navX = rect?.left ?? Math.max(20, (vw - 1280) / 2 + 20);
      const navY = rect ? rect.top + rect.height / 2 : 46;
      const navSize = rect?.width ?? 36;

      const tl = buildIntroTimeline({
        root: rootRef.current!,
        years: els,
        targets,
        starts,
        mark: markRef.current!,
        navWhite: navWhiteRef.current!,
        navColored: navColoredRef.current!,
        logoWrap: wrap,
        ambient: ambientRef.current!,
        spotlight: spotRef.current!,
        finalTransform: {
          x: navX - boxX,
          y: navY - (boxY + logoHeight / 2),
          scale: navSize / logoHeight,
        },
        onReveal,
        onComplete: onFinish,
      });
      tlRef.current = tl;
    }
    // The timeline plays through once; it is killed only on unmount.
    return () => {
      if (!document.body.contains(rootRef.current)) tlRef.current?.kill();
    };
  }, [logoSize, onReveal, onFinish, replayKey]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] overflow-hidden"
      style={{ backgroundColor: "rgb(0,0,0)", pointerEvents: "none" }}
    >
      {/* Distant nebula — very soft purple ambient light around the logo */}
      <div
        ref={ambientRef}
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmax] w-[70vmax] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.20) 0%, rgba(79,70,229,0.10) 35%, rgba(0,0,0,0) 70%)",
          filter: "blur(60px)",
        }}
      />
      {/* Studio spotlight falling from above */}
      <div
        ref={spotRef}
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-30vh] h-[110vh] w-[120vw] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 28%, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.05) 45%, rgba(255,255,255,0) 75%)",
          filter: "blur(30px)",
        }}
      />
      <YearsAnimation
        items={items}
        register={(el, i) => {
          if (el) yearEls.current[i] = el;
        }}
      />
      {logoSize > 0 && (
        <LogoReveal
          ref={logoWrapRef}
          size={logoSize}
          registerMark={(el) => (markRef.current = el)}
          registerNavWhite={(el) => (navWhiteRef.current = el)}
          registerNavColored={(el) => (navColoredRef.current = el)}
        />
      )}

    </div>
  );
}
