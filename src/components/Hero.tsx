import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Phone, Sparkles } from "lucide-react";
import { useRef } from "react";
import { Counter, Magnetic, WordReveal, easeSoft } from "./motion-primitives";
import { HolographicGlobe } from "./HolographicGlobe";

const STATS = [
  { value: 269, suffix: "+", label: "Courses" },
  { value: 11, suffix: "+", label: "Career Tracks" },
  { value: null, text: "30/60/90/120", label: "Hours · YCMOU Certified" },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yArt = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const yCopy = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-screen items-center pt-36 pb-20"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-5 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div style={{ y: yCopy, opacity: fade }}>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeSoft }}
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-muted-foreground"
          >
            <Sparkles className="h-3.5 w-3.5 text-secondary" />
            Modern Computer Education · Canal Road, Besides Vision Computer, Baramati

          </motion.div>

          <h1 className="mt-7 font-display text-[clamp(2.6rem,6.2vw,4.6rem)] leading-[0.98] font-bold">
            <WordReveal text="Build Career-Ready" className="block" />
            <span className="text-gradient block">
              <WordReveal text="Skills with KLiC Courses" delay={0.15} />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: easeSoft }}
            className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            A modern learning ecosystem offering industry-ready courses,
            certifications, and practical training designed to improve
            employability.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.65, ease: easeSoft }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <a
                href="#courses"
                className="shine inline-flex items-center gap-2 rounded-full brand-gradient px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-[var(--shadow-float)]"
              >
                Explore Courses <ArrowRight className="h-4 w-4" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="tel:+919823147011"
                className="glass edge-glow inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium transition-colors hover:tint-strong"
              >
                <Phone className="h-4 w-4 text-secondary" /> 9823147011
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="tel:+919823815231"
                className="glass edge-glow inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium transition-colors hover:tint-strong"
              >
                <Phone className="h-4 w-4 text-secondary" /> 9823815231
              </a>
            </Magnetic>
          </motion.div>

          <div className="mt-14 grid max-w-xl grid-cols-3 gap-4">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.85 + i * 0.12, ease: easeSoft }}
                className="glass edge-glow rounded-2xl px-4 py-4"
              >
                <p className="font-display text-xl font-bold sm:text-2xl">
                  {s.value !== null ? (
                    <Counter to={s.value} suffix={s.suffix} />
                  ) : (
                    <span className="text-gradient">{s.text}</span>
                  )}
                </p>
                <p className="mt-1 text-[11px] tracking-wide text-muted-foreground uppercase">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          style={{ y: yArt }}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: easeSoft }}
          className="relative"
        >
          <HolographicGlobe />
        </motion.div>
      </div>
    </section>
  );
}
