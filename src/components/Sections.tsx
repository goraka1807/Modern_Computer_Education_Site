import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  BadgeCheck,
  Brain,
  Briefcase,
  Building2,
  Clock,
  Coins,
  Cpu,
  IndianRupee,
  Layers,
  Palette,
  PenTool,
  ServerCog,
  ShieldCheck,
  Target,
  Users,
  Wrench,
} from "lucide-react";
import { useRef } from "react";
import { COURSES, JOURNEY, TRACKS, WHY } from "@/data/klic";

const COURSE_IMAGES: Record<string, string> = {
  "advanced-excel": "/images/courses/klic-advanced-excel-2023.jpg",
  "klic-ai": "/images/courses/klic-ai-ml-2024.jpg",
  "ai-ml-basics": "/images/courses/klic-ai-ml-2024.jpg",
  autocad: "/images/courses/klic-autocad-2023.jpg",
  bfsi: "/images/courses/klic-bfsi-2023.jpg",
  "c-programming": "/images/courses/klic-c-programming-2023.jpg",
  "c-plusplus": "/images/courses/klic-cpp-programming-2023.jpg",
  "c-cpp-programming": "/images/courses/klic-c-cpp-programming-2024.jpg",
  "content-illustration": "/images/courses/klic-content-illustration-2023.jpg",
};
import {
  Counter,
  Reveal,
  Tilt,
  WordReveal,
  staggerChild,
  staggerParent,
} from "./motion-primitives";

function SectionHead({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <Reveal>
        <span className="glass rounded-full px-4 py-1.5 text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
          {eyebrow}
        </span>
      </Reveal>
      <h2 className="mt-6 font-display text-[clamp(2rem,4.4vw,3.2rem)] leading-[1.05] font-bold">
        <WordReveal text={title} />
      </h2>
      {body && (
        <Reveal delay={0.15}>
          <p className="mt-5 text-muted-foreground">{body}</p>
        </Reveal>
      )}
    </div>
  );
}

const WHY_ICONS = [Target, Building2, Wrench, Clock, Briefcase, BadgeCheck];

export function WhyKlic() {
  return (
    <section id="why" className="relative py-28">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHead
          eyebrow="Why KLiC"
          title="A bridge from college to careers"
          body="KLiC stands for Knowledge Lit Career. MKCL offers employability skills development modules as KLiC Certificate Courses, focused on knowledge-based skills for the services sector."
        />
        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {WHY.map((item, i) => {
            const Icon = WHY_ICONS[i];
            return (
              <motion.div key={item.title} variants={staggerChild}>
                <Tilt className="h-full">
                  <div className="glass edge-glow group h-full rounded-3xl p-7 transition-transform duration-500 hover:-translate-y-1.5">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl brand-gradient">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-6 font-display text-lg font-semibold">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {item.body}
                    </p>
                  </div>
                </Tilt>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

const TRACK_ICONS = [
  Layers,
  Brain,
  Palette,
  PenTool,
  Users,
  IndianRupee,
  Briefcase,
  ShieldCheck,
  Cpu,
  ServerCog,
  Coins,
];

export function CareerTracks() {
  return (
    <section id="tracks" className="relative py-28">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHead
          eyebrow="Career Tracks"
          title="11 sectors. One employability ecosystem."
          body="KLiC Courses are available under 11 sectors spanning office operations, data, design, finance, technology and emerging new-collar roles."
        />
        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {TRACKS.map((t, i) => {
            const Icon = TRACK_ICONS[i % TRACK_ICONS.length];
            return (
              <motion.div key={t.slug} variants={staggerChild}>
                <Tilt strength={7} className="h-full">
                  <a
                    href={`https://klic.mkcl.org/klic-courses?track=${t.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="glass edge-glow group flex h-full flex-col rounded-3xl p-7 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[var(--shadow-float)]"
                  >
                    <span className="grid h-14 w-14 place-items-center rounded-2xl tint transition-colors duration-500 group-hover:brand-gradient">
                      <Icon className="h-6 w-6 text-secondary transition-colors group-hover:text-primary-foreground" />
                    </span>
                    <h3 className="mt-6 font-display text-lg font-semibold">
                      {t.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {t.description}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-1.5 text-sm text-secondary">
                      View courses
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </span>
                  </a>
                </Tilt>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export function FeaturedCourses() {
  const scroller = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const nudge = (dir: number) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" });
  };
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].screenX;
  };
  const onTouchEnd = () => {
    const start = touchStartX.current;
    const end = touchEndX.current;
    if (start == null || end == null) return;
    const delta = start - end;
    const threshold = 50;
    if (delta > threshold) nudge(1);
    else if (delta < -threshold) nudge(-1);
    touchStartX.current = null;
    touchEndX.current = null;
  };
  return (
    <section id="courses" className="relative py-28">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHead
          eyebrow="Featured Courses"
          title="Real KLiC courses, real outcomes"
          body="269 courses across durations of 30, 60, 90 and 120 hours — in English, Marathi and Hindi."
        />
      </div>
      <Reveal delay={0.1}>
        <div className="relative mt-12 px-14 sm:px-16 lg:px-20">
          <button
            type="button"
            aria-label="Previous courses"
            onClick={() => nudge(-1)}
            className="glass edge-glow absolute top-1/2 left-2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full transition-transform hover:scale-105 sm:h-11 sm:w-11 lg:left-5"
          >
            <ArrowUpRight className="h-4 w-4 -rotate-[135deg]" />
          </button>
          <button
            type="button"
            aria-label="Next courses"
            onClick={() => nudge(1)}
            className="glass edge-glow absolute top-1/2 right-2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full transition-transform hover:scale-105 sm:h-11 sm:w-11 lg:right-5"
          >
            <ArrowUpRight className="h-4 w-4 rotate-45" />
          </button>
          <div
            ref={scroller}
            data-lenis-prevent
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-contain px-1 pb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {COURSES.map((c) => (
              <article
                key={c.slug}
                className="glass edge-glow group flex w-[78vw] shrink-0 snap-start flex-col overflow-hidden rounded-3xl transition-transform duration-500 hover:-translate-y-2 sm:w-[390px]"
              >
                <div className="relative aspect-[2/1] w-full overflow-hidden rounded-t-3xl tint">
                  <img
                    src={COURSE_IMAGES[c.slug]}
                    alt={`${c.name} KLiC course banner`}
                    loading="lazy"
                    decoding="async"
                    width={640}
                    height={320}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-2 text-[11px] tracking-wide uppercase">
                    <span className="rounded-full tint-strong px-3 py-1 text-muted-foreground">
                      {c.hours}
                    </span>
                    <span className="rounded-full tint-strong px-3 py-1 text-secondary">
                      {c.level}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-xl font-bold">{c.name}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                    {c.description}
                  </p>
                  <dl className="mt-4 mb-5 space-y-1.5 border-t border-border pt-4 text-sm">
                    <div className="flex gap-2">
                      <dt className="text-muted-foreground">Certification</dt>
                      <dd className="ml-auto text-right">
                        {c.hours === "120 hours" ? "YCMOU Certified" : "MKCL Certificate"}
                      </dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="shrink-0 text-muted-foreground">Careers</dt>
                      <dd className="ml-auto text-right text-xs">{c.careers}</dd>
                    </div>
                  </dl>
                  <a
                    href={`https://klic.mkcl.org/klic-courses/${c.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="shine mt-auto inline-flex w-full items-center justify-center gap-2 rounded-full tint px-6 py-2.5 text-sm font-medium transition-colors group-hover:brand-gradient"
                  >
                    Course details <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function LearningJourney() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="journey" className="relative py-28">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHead
          eyebrow="Learning Journey"
          title="Seven steps from enrolment to employability"
        />
        <div ref={ref} className="relative mx-auto mt-20 max-w-3xl">
          <div className="absolute top-0 left-[15px] h-full w-px bg-border md:left-1/2" />
          <motion.div
            style={{ height }}
            className="absolute top-0 left-[15px] w-px brand-gradient md:left-1/2"
          />
          <div className="space-y-12">
            {JOURNEY.map((s, i) => (
              <Reveal key={s.step} delay={i * 0.04}>
                <div
                  className={`relative pl-12 md:w-1/2 ${
                    i % 2
                      ? "md:ml-auto md:pl-16"
                      : "md:mr-auto md:pr-16 md:pl-0 md:text-right"
                  }`}
                >
                  <span
                    className={`absolute top-2 left-[9px] h-3 w-3 rounded-full brand-gradient ring-4 ring-background ${
                      i % 2 ? "md:left-[-6px]" : "md:right-[-6px] md:left-auto"
                    }`}
                  />
                  <p className="font-display text-xs tracking-[0.25em] text-secondary uppercase">
                    Step {i + 1}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-semibold">
                    {s.step}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
                </div>
              </Reveal>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
}

const BIG_STATS = [
  { to: 269, suffix: "+", label: "KLiC Courses" },
  { to: 11, suffix: "+", label: "Career Tracks" },
  { to: 4, suffix: "", label: "Course Durations", note: "30 / 60 / 90 / 120 hrs" },
  { to: 3, suffix: "", label: "Languages", note: "English · Marathi · Hindi" },
];

export function Stats() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-5">
        <div className="glass edge-glow grid gap-10 rounded-[2.5rem] px-8 py-14 sm:grid-cols-2 lg:grid-cols-4">
          {BIG_STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="text-center">
              <p className="font-display text-[clamp(2.4rem,5vw,3.6rem)] leading-none font-bold text-gradient">
                <Counter to={s.to} suffix={s.suffix} />
              </p>
              <p className="mt-3 text-sm font-medium">{s.label}</p>
              {s.note && (
                <p className="mt-1 text-xs text-muted-foreground">{s.note}</p>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
