import { useEffect, useRef, type PointerEvent } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

type Point3D = { x: number; y: number; z: number };
type ProjectedPoint = Point3D & { visible: boolean; scale: number };

const TAU = Math.PI * 2;
const GRID_STEP = Math.PI / 18;
const PARTICLES = Array.from({ length: 70 }, (_, index) => {
  const latitude = -Math.PI / 2 + (((index * 37) % 100) / 100) * Math.PI;
  const longitude = ((index * 1.61803398875) % 1) * TAU;
  const radius = 0.985 + ((index * 17) % 11) / 1000;
  return {
    x: Math.cos(latitude) * Math.cos(longitude) * radius,
    y: Math.sin(latitude) * radius,
    z: Math.cos(latitude) * Math.sin(longitude) * radius,
    phase: index * 0.61,
  };
});

function rotate(point: Point3D, yaw: number, pitch: number): Point3D {
  const cosYaw = Math.cos(yaw);
  const sinYaw = Math.sin(yaw);
  const x = point.x * cosYaw - point.z * sinYaw;
  const z = point.x * sinYaw + point.z * cosYaw;
  const cosPitch = Math.cos(pitch);
  const sinPitch = Math.sin(pitch);
  return {
    x,
    y: point.y * cosPitch - z * sinPitch,
    z: point.y * sinPitch + z * cosPitch,
  };
}

function project(point: Point3D, radius: number, centerX: number, centerY: number): ProjectedPoint {
  const depth = 1.25 + point.z * 0.22;
  return {
    ...point,
    x: centerX + (point.x / depth) * radius,
    y: centerY - (point.y / depth) * radius,
    visible: point.z > -0.08,
    scale: 1 / depth,
  };
}

export function HolographicGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const yawRef = useRef(0);
  const pitchRef = useRef(-0.08);
  const velocityRef = useRef({ yaw: 0, pitch: 0 });
  const draggingRef = useRef(false);
  const lastPointerRef = useRef({ x: 0, y: 0, time: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let frame = 0;
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let lastTime = performance.now();

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const drawArc = (
      points: ProjectedPoint[],
      color: string,
      lineWidth: number,
      frontOnly = true,
    ) => {
      context.beginPath();
      let drawing = false;
      for (const point of points) {
        if (!frontOnly || point.visible) {
          if (!drawing) {
            context.moveTo(point.x, point.y);
            drawing = true;
          } else {
            context.lineTo(point.x, point.y);
          }
        } else {
          drawing = false;
        }
      }
      context.strokeStyle = color;
      context.lineWidth = lineWidth;
      context.stroke();
    };

    const draw = (now: number) => {
      const elapsed = Math.min(40, now - lastTime);
      lastTime = now;
      const delta = elapsed / 16.67;
      const velocity = velocityRef.current;

      if (!draggingRef.current) {
        yawRef.current += (0.0008 + velocity.yaw) * delta;
        pitchRef.current += velocity.pitch * delta;
        velocity.yaw *= Math.pow(0.91, delta);
        velocity.pitch *= Math.pow(0.91, delta);
      }
      pitchRef.current = Math.max(-0.95, Math.min(0.95, pitchRef.current));

      context.clearRect(0, 0, width, height);
      const centerX = width * 0.5;
      const centerY = height * 0.5;
      const radius = Math.min(width, height) * 0.355;
      const pulse = 1 + Math.sin(now * 0.0012) * 0.018;
      const glowRadius = radius * (1.32 + Math.sin(now * 0.001) * 0.04);

      const atmosphere = context.createRadialGradient(
        centerX,
        centerY,
        radius * 0.52,
        centerX,
        centerY,
        glowRadius,
      );
      atmosphere.addColorStop(0, "rgba(80, 220, 255, 0.17)");
      atmosphere.addColorStop(0.5, "rgba(104, 79, 255, 0.08)");
      atmosphere.addColorStop(1, "rgba(77, 140, 255, 0)");
      context.fillStyle = atmosphere;
      context.beginPath();
      context.arc(centerX, centerY, glowRadius, 0, TAU);
      context.fill();

      const surface = context.createRadialGradient(
        centerX - radius * 0.32,
        centerY - radius * 0.4,
        radius * 0.08,
        centerX,
        centerY,
        radius * 1.08,
      );
      surface.addColorStop(0, "rgba(151, 246, 255, 0.13)");
      surface.addColorStop(0.48, "rgba(48, 65, 167, 0.07)");
      surface.addColorStop(1, "rgba(20, 20, 80, 0.02)");
      context.fillStyle = surface;
      context.beginPath();
      context.arc(centerX, centerY, radius * pulse, 0, TAU);
      context.fill();

      const logoText = "MCE";
      const logoSize = Math.max(28, radius * 0.56);
      const logoOffsets = [-0.52, 0, 0.52];
      for (let index = 0; index < logoText.length; index += 1) {
        const surfaceX = logoOffsets[index];
        const surfaceZ = Math.sqrt(1 - surfaceX * surfaceX) * 0.985;
        const logoPoint = project(
          rotate({ x: surfaceX, y: 0.03, z: surfaceZ }, yawRef.current, pitchRef.current),
          radius,
          centerX,
          centerY,
        );
        if (!logoPoint.visible) continue;

        context.save();
        context.translate(logoPoint.x, logoPoint.y);
        context.scale(1, 0.88 + logoPoint.z * 0.12);
        context.globalCompositeOperation = "lighter";
        context.globalAlpha = (0.6 + Math.sin(now * 0.0015) * 0.06) * logoPoint.scale;
        context.shadowColor = "rgba(113, 235, 255, 1)";
        context.shadowBlur = 20;
        context.fillStyle = "rgba(220, 254, 255, 0.88)";
        context.font = `600 ${logoSize * logoPoint.scale}px Space Grotesk, sans-serif`;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(logoText[index], 0, 0);
        context.restore();
      }

      for (let latitude = -Math.PI / 2 + GRID_STEP; latitude < Math.PI / 2; latitude += GRID_STEP) {
        const points = Array.from({ length: 73 }, (_, index) => {
          const longitude = (index / 72) * TAU;
          return project(
            rotate(
              {
                x: Math.cos(latitude) * Math.cos(longitude),
                y: Math.sin(latitude),
                z: Math.cos(latitude) * Math.sin(longitude),
              },
              yawRef.current,
              pitchRef.current,
            ),
            radius,
            centerX,
            centerY,
          );
        });
        const opacity = 0.14 + Math.cos(latitude) * 0.09;
        drawArc(points, "rgba(111, 225, 255, 0.055)", 0.5, false);
        drawArc(points, `rgba(111, 225, 255, ${opacity})`, 0.65);
      }

      for (let longitude = 0; longitude < TAU; longitude += GRID_STEP) {
        const points = Array.from({ length: 73 }, (_, index) => {
          const latitude = -Math.PI / 2 + (index / 72) * Math.PI;
          return project(
            rotate(
              {
                x: Math.cos(latitude) * Math.cos(longitude),
                y: Math.sin(latitude),
                z: Math.cos(latitude) * Math.sin(longitude),
              },
              yawRef.current,
              pitchRef.current,
            ),
            radius,
            centerX,
            centerY,
          );
        });
        drawArc(points, "rgba(169, 127, 255, 0.07)", 0.55, false);
        drawArc(points, "rgba(169, 127, 255, 0.2)", 0.7);
      }

      const equator = Array.from({ length: 97 }, (_, index) => {
        const longitude = (index / 96) * TAU;
        return project(
          rotate(
            { x: Math.cos(longitude), y: 0, z: Math.sin(longitude) },
            yawRef.current,
            pitchRef.current,
          ),
          radius,
          centerX,
          centerY,
        );
      });
      drawArc(equator, "rgba(126, 242, 255, 0.12)", 0.7, false);
      drawArc(equator, "rgba(126, 242, 255, 0.56)", 1.15);

      for (const particle of PARTICLES) {
        const point = project(
          rotate(particle, yawRef.current, pitchRef.current),
          radius,
          centerX,
          centerY,
        );
        if (!point.visible) continue;
        const alpha = 0.12 + (Math.sin(now * 0.0014 + particle.phase) + 1) * 0.12;
        context.fillStyle = `rgba(154, 240, 255, ${alpha})`;
        context.beginPath();
        context.arc(point.x, point.y, Math.max(0.6, point.scale * 1.25), 0, TAU);
        context.fill();
      }

      frame = requestAnimationFrame(draw);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();
    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
    };
  }, []);

  const rotateBy = (amount: number) => {
    pitchRef.current = Math.max(-0.95, Math.min(0.95, pitchRef.current + amount));
    velocityRef.current.pitch = amount * 0.06;
  };

  const handlePointerDown = (event: PointerEvent<HTMLCanvasElement>) => {
    draggingRef.current = true;
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      // Synthetic pointer events do not always have an active pointer to capture.
    }
    lastPointerRef.current = { x: event.clientX, y: event.clientY, time: performance.now() };
    velocityRef.current = { yaw: 0, pitch: 0 };
  };

  const handlePointerMove = (event: PointerEvent<HTMLCanvasElement>) => {
    if (!draggingRef.current) return;
    const last = lastPointerRef.current;
    const now = performance.now();
    const deltaX = event.clientX - last.x;
    const deltaY = event.clientY - last.y;
    const elapsed = Math.max(8, now - last.time);
    yawRef.current += deltaX * 0.009;
    pitchRef.current = Math.max(-0.95, Math.min(0.95, pitchRef.current - deltaY * 0.007));
    velocityRef.current = {
      yaw: (deltaX / elapsed) * 0.018,
      pitch: (-deltaY / elapsed) * 0.014,
    };
    lastPointerRef.current = { x: event.clientX, y: event.clientY, time: now };
  };

  const releasePointer = (event: PointerEvent<HTMLCanvasElement>) => {
    draggingRef.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <div className="relative mx-auto flex aspect-square w-full max-w-[38rem] select-none items-center justify-center">
      <div className="pointer-events-none absolute inset-[12%] rounded-full bg-[radial-gradient(circle,rgba(83,210,255,0.16),rgba(79,56,205,0.1)_46%,transparent_72%)] blur-2xl" />
      <button
        type="button"
        aria-label="Tilt globe upward"
        onClick={() => rotateBy(-0.2)}
        className="absolute top-0 z-10 grid h-10 w-10 place-items-center text-cyan-200/65 transition hover:text-cyan-100"
      >
        <ChevronUp
          className="h-5 w-5 animate-[globe-arrow_4s_ease-in-out_infinite]"
          strokeWidth={1}
        />
      </button>
      <canvas
        ref={canvasRef}
        aria-label="Interactive holographic MCE globe"
        role="img"
        className="relative z-[1] h-full w-full cursor-grab touch-none active:cursor-grabbing"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={releasePointer}
        onPointerCancel={releasePointer}
      />
      <button
        type="button"
        aria-label="Tilt globe downward"
        onClick={() => rotateBy(0.2)}
        className="absolute bottom-0 z-10 grid h-10 w-10 place-items-center text-cyan-200/65 transition hover:text-cyan-100"
      >
        <ChevronDown
          className="h-5 w-5 animate-[globe-arrow_4s_ease-in-out_infinite_reverse]"
          strokeWidth={1}
        />
      </button>
    </div>
  );
}
