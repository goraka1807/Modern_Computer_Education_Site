import { useEffect, useRef } from "react";

export function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.7 + 0.4,
      vx: (Math.random() - 0.5) * 0.00016,
      vy: -(Math.random() * 0.00022 + 0.00004),
      a: Math.random() * 0.5 + 0.15,
    }));

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -0.05) {
          p.y = 1.05;
          p.x = Math.random();
        }
        if (p.x < -0.05) p.x = 1.05;
        if (p.x > 1.05) p.x = -0.05;
        ctx.beginPath();
        ctx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(167,190,255,${p.a})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden noise">
      <div className="absolute inset-0 bg-background" />
      <div
        className="absolute inset-0"
        style={{ opacity: "var(--aurora-opacity)" }}
      >
        <div
          className="blob h-[38rem] w-[38rem] -top-40 -left-32 opacity-45"
          style={{ background: "oklch(0.53 0.23 277)" }}
        />
        <div
          className="blob h-[34rem] w-[34rem] top-[18%] right-[-10%] opacity-35"
          style={{ background: "oklch(0.72 0.14 208)", animationDelay: "-7s" }}
        />
        <div
          className="blob h-[42rem] w-[42rem] bottom-[-18%] left-[22%] opacity-30"
          style={{ background: "oklch(0.62 0.2 295)", animationDelay: "-13s" }}
        />
        <canvas ref={canvasRef} className="absolute inset-0" />
        {/* Soft cinematic ambience — fixed, no cursor-tracking beam */}
        <div
          ref={glowRef}
          className="absolute left-1/2 top-[-20%] h-[70rem] w-[70rem] -translate-x-1/2 rounded-full opacity-[0.14] blur-[140px]"
          style={{
            background:
              "radial-gradient(circle, oklch(0.62 0.2 295) 0%, transparent 68%)",
          }}
        />
      </div>
    </div>
  );
}

