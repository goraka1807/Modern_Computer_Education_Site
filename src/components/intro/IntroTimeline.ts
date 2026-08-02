import gsap from "gsap";

/** Year the institute was founded. Update if needed. */
export const FOUNDING_YEAR = 2001;

export const YEARS: number[] = Array.from(
  { length: new Date().getFullYear() - FOUNDING_YEAR + 1 },
  (_, i) => FOUNDING_YEAR + i,
);

/** Normalised centreline of the custom "M" mark (0..1 box). */
export const M_POLYLINE: Array<[number, number]> = [
  [0.06, 1],
  [0.06, 0],
  [0.5, 0.62],
  [0.94, 0],
  [0.94, 1],
];

export const M_PATH = "M6 100 L6 0 L50 62 L94 0 L94 100";

/** Evenly distribute `count` points along the polyline. */
export function samplePolyline(count: number): Array<{ x: number; y: number }> {
  const segs: Array<{ a: [number, number]; b: [number, number]; len: number }> = [];
  let total = 0;
  for (let i = 0; i < M_POLYLINE.length - 1; i++) {
    const a = M_POLYLINE[i];
    const b = M_POLYLINE[i + 1];
    const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
    total += len;
    segs.push({ a, b, len });
  }
  const out: Array<{ x: number; y: number }> = [];
  for (let i = 0; i < count; i++) {
    let d = (i / (count - 1)) * total;
    for (const s of segs) {
      if (d <= s.len || s === segs[segs.length - 1]) {
        const t = Math.min(d / s.len, 1);
        out.push({
          x: s.a[0] + (s.b[0] - s.a[0]) * t,
          y: s.a[1] + (s.b[1] - s.a[1]) * t,
        });
        break;
      }
      d -= s.len;
    }
  }
  return out;
}

export interface IntroRefs {
  root: HTMLElement;
  years: HTMLElement[];
  targets: Array<{ x: number; y: number; scale: number }>;
  starts: Array<{ x: number; y: number; scale: number; opacity: number }>;
  mark: HTMLElement;
  navWhite: HTMLElement;
  navColored: HTMLElement;
  logoWrap: HTMLElement;
  ambient: HTMLElement;
  spotlight: HTMLElement;
  finalTransform: { x: number; y: number; scale: number };
  onReveal: () => void;
  onComplete: () => void;
}

export function buildIntroTimeline(refs: IntroRefs): gsap.core.Timeline {
  const {
    root,
    years,
    targets,
    starts,
    mark,
    navWhite,
    navColored,
    logoWrap,
    ambient,
    spotlight,
    finalTransform,
    onReveal,
    onComplete,
  } = refs;

  gsap.set(years, {
    x: (i: number) => starts[i].x,
    y: (i: number) => starts[i].y,
    scale: (i: number) => starts[i].scale,
    opacity: 0,
    force3D: true,
  });
  gsap.set(logoWrap, { opacity: 0, x: 0, y: 0, scale: 1, force3D: true });
  gsap.set(mark, { opacity: 0 });
  gsap.set([navWhite, navColored], { opacity: 0 });
  gsap.set([ambient, spotlight], { opacity: 0 });

  const tl = gsap.timeline({ onComplete });

  // Scene 1 — years drift in over black
  tl.to(years, {
    opacity: (i: number) => starts[i].opacity,
    duration: 1,
    ease: "power2.out",
    stagger: { each: 0.02, from: "random" },
  });

  // Scene 2 + 3 — magnetic travel into the shape of the M
  tl.to(
    years,
    {
      x: (i: number) => targets[i].x,
      y: (i: number) => targets[i].y,
      scale: (i: number) => targets[i].scale,
      opacity: 0.92,
      duration: 1.9,
      ease: "power3.inOut",
      stagger: { each: 0.012, from: "center" },
    },
    1.35,
  );

  // Cinematic lighting — distant nebula glow + studio spotlight from above
  tl.to(ambient, { opacity: 1, duration: 2.4, ease: "sine.inOut" }, 2.2);
  tl.to(spotlight, { opacity: 1, duration: 2.0, ease: "sine.inOut" }, 2.8);

  // Scene 4 — years dissolve as the white mark emerges out of the light
  tl.to(logoWrap, { opacity: 1, duration: 0.9, ease: "power2.inOut" }, 3.75);
  tl.fromTo(
    mark,
    { opacity: 0, filter: "blur(14px)", scale: 1.03 },
    {
      opacity: 1,
      filter: "blur(0px)",
      scale: 1,
      duration: 1.3,
      ease: "power2.out",
    },
    3.7,
  );
  tl.to(
    years,
    {
      opacity: 0,
      scale: (i: number) => targets[i].scale * 0.85,
      duration: 0.8,
      ease: "power2.inOut",
      stagger: { each: 0.006, from: "random" },
    },
    3.85,
  );

  // Scene 5 — mark settles into the navbar position, lockup takes over
  tl.to(
    logoWrap,
    {
      x: finalTransform.x,
      y: finalTransform.y,
      scale: finalTransform.scale,
      duration: 1.15,
      ease: "power3.inOut",
    },
    4.5,
  );
  tl.to(navWhite, { opacity: 1, duration: 0.7, ease: "power2.out" }, 5.05);
  tl.to(mark, { opacity: 0, duration: 0.7, ease: "power2.out" }, 5.05);

  // Scene 6 — homepage fades up underneath, then the overlay hands off
  tl.add(onReveal, 4.9);
  tl.to(root, { backgroundColor: "rgba(0,0,0,0)", duration: 1.1, ease: "power2.inOut" }, 4.9);
  tl.to([ambient, spotlight], { opacity: 0, duration: 1.1, ease: "sine.inOut" }, 4.9);
  // Lockup gives way to the colored navigation mark, which the real navbar
  // already holds underneath — so the handoff is a single continuous logo.
  tl.to(navWhite, { opacity: 0, duration: 0.5, ease: "power2.inOut" }, 5.6);
  tl.to(navColored, { opacity: 1, duration: 0.5, ease: "power2.inOut" }, 5.6);
  tl.to(logoWrap, { opacity: 0, duration: 0.5, ease: "power2.inOut" }, 6.1);

  return tl;
}

