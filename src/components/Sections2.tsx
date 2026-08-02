import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Building2,
  ChevronDown,
  GraduationCap,
  MapPin,
  Phone,
  Search,
  TrendingUp,
} from "lucide-react";
const klicLogo = { url: "/images/logos/klic-logo.png" };
import { CONTACT, FAQS, TRACKS } from "@/data/klic";
import { Magnetic, Reveal, WordReveal, easeSoft } from "./motion-primitives";

export function Certification() {
  return (
    <section id="certification" className="relative py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2">
        <div>
          <Reveal>
            <span className="glass rounded-full px-4 py-1.5 text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
              Certification
            </span>
          </Reveal>
          <h2 className="mt-6 font-display text-[clamp(2rem,4.2vw,3rem)] leading-[1.05] font-bold">
            <WordReveal text="Recognised and certified by YCMOU" />
          </h2>
          <Reveal delay={0.12}>
            <p className="mt-6 text-muted-foreground">
              KLiC Courses of 120 Hours are Recognized and Certified by
              Yashwantrao Chavan Maharashtra Open University (YCMOU) — adding
              university recognition to skills built for the services sector.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: GraduationCap,
                title: "YCMOU Recognition",
                body: "120-hour KLiC Courses carry recognition from Yashwantrao Chavan Maharashtra Open University.",
              },
              {
                icon: Award,
                title: "MKCL Certification",
                body: "Every KLiC Certificate Course is delivered and certified under the MKCL KLiC brand.",
              },
              {
                icon: Building2,
                title: "Industry Value",
                body: "Knowledge-based, tool-driven skills mapped to real roles in the services sector.",
              },
              {
                icon: TrendingUp,
                title: "Career Benefits",
                body: "A structured bridge from college to career with improved employability.",
              },
            ].map((c, i) => (
              <Reveal key={c.title} delay={i * 0.08}>
                <div className="glass edge-glow h-full rounded-2xl p-5">
                  <c.icon className="h-5 w-5 text-secondary" />
                  <p className="mt-4 font-display text-sm font-semibold">
                    {c.title}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {c.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.15}>
          <motion.div
            animate={{ y: [0, -14, 0], rotate: [-1.5, 1.5, -1.5] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="glass edge-glow relative mx-auto w-full max-w-md rounded-[2rem] p-9 shadow-[var(--shadow-float)]"
          >
            <div
              className="absolute -inset-6 -z-10 rounded-[3rem] opacity-40 blur-3xl"
              style={{ background: "var(--gradient-brand)" }}
            />
            <p className="text-[11px] tracking-[0.3em] text-muted-foreground uppercase">
              Certificate of Completion
            </p>
            <p className="mt-6 font-display text-2xl font-bold text-gradient">
              KLiC Certificate Course
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              120 Hours · Knowledge Lit Career
            </p>
            <div className="mt-8 h-px w-full bg-border" />
            <div className="mt-6 flex items-end justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Certified by</p>
                <p className="mt-1 font-display text-sm font-semibold">
                  Yashwantrao Chavan Maharashtra Open University
                </p>
              </div>
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full brand-gradient">
                <Award className="h-5 w-5" />
              </span>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

const VOICES = [
  {
    name: "Sneha P.",
    course: "KLiC Advanced Excel",
    quote:
      "The Excel track changed how I handle reporting at work — data cleaning and dashboards became routine for me.",
  },
  {
    name: "Rahul K.",
    course: "KLiC C & C++ Programming",
    quote:
      "Starting with C and moving to C++ gave me the foundation I needed before applying for developer roles.",
  },
  {
    name: "Aarti D.",
    course: "KLiC BFSI",
    quote:
      "The BFSI course explained banking operations and digital services in a way that made interviews easy.",
  },
  {
    name: "Imran S.",
    course: "KLiC AI",
    quote:
      "Hands-on demos of AI tools plus cyber safety made this the most practical 30 hours I have spent.",
  },
  {
    name: "Pooja M.",
    course: "KLiC AutoCAD",
    quote:
      "Drawing real floor plans during the course meant my portfolio was ready before certification.",
  },
  {
    name: "Nikhil J.",
    course: "KLiC Content Illustration",
    quote:
      "Illustration skills opened up freelance work for me alongside my regular studies.",
  },
];

export function Testimonials() {
  const row = [...VOICES, ...VOICES];
  return (
    <section className="relative overflow-hidden py-28">
      <div className="mx-auto max-w-3xl px-5 text-center">
        <Reveal>
          <span className="glass rounded-full px-4 py-1.5 text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
            Learner Voices
          </span>
        </Reveal>
        <h2 className="mt-6 font-display text-[clamp(2rem,4.2vw,3rem)] font-bold">
          <WordReveal text="Skills that show up at work" />
        </h2>
      </div>

      <div className="group relative mt-16 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
        <div className="marquee-track flex w-max gap-6 group-hover:[animation-play-state:paused]">
          {row.map((v, i) => (
            <figure
              key={`${v.name}-${i}`}
              className="glass edge-glow w-[340px] shrink-0 rounded-3xl p-7"
            >
              <blockquote className="text-sm leading-relaxed text-muted-foreground">
                “{v.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full brand-gradient font-display text-sm font-bold">
                  {v.name.charAt(0)}
                </span>
                <span>
                  <span className="block text-sm font-medium">{v.name}</span>
                  <span className="block text-xs text-muted-foreground">
                    {v.course}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
      <p className="mt-8 text-center text-xs text-muted-foreground">
        Representative learner experiences across KLiC tracks.
      </p>
    </section>
  );
}

export function Faq() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<number | null>(0);
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return FAQS;
    return FAQS.filter(
      (f) => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <section id="faq" className="relative py-28">
      <div className="mx-auto max-w-3xl px-5">
        <div className="text-center">
          <Reveal>
            <span className="glass rounded-full px-4 py-1.5 text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
              FAQ
            </span>
          </Reveal>
          <h2 className="mt-6 font-display text-[clamp(2rem,4.2vw,3rem)] font-bold">
            <WordReveal text="Questions, answered" />
          </h2>
        </div>

        <Reveal delay={0.1}>
          <div className="glass mt-10 flex items-center gap-3 rounded-full px-5 py-3.5">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search FAQs — certification, duration, languages…"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              aria-label="Search frequently asked questions"
            />
          </div>
        </Reveal>

        <div className="mt-6 space-y-3">
          {results.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.03}>
                <div className="glass edge-glow overflow-hidden rounded-2xl">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center gap-4 px-6 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="flex-1 font-display text-sm font-semibold sm:text-base">
                      {f.q}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-secondary transition-transform duration-400 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: easeSoft }}
                      >
                        <p className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground">
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
          {results.length === 0 && (
            <p className="py-10 text-center text-sm text-muted-foreground">
              No FAQs match “{query}”.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section id="contact" className="relative py-24">
      <div className="mx-auto max-w-7xl px-5">
        <div className="glass edge-glow noise relative overflow-hidden rounded-[2.5rem] px-8 py-20 text-center">
          <div
            className="absolute -top-40 left-1/2 h-96 w-[70%] -translate-x-1/2 rounded-full opacity-45 blur-[110px]"
            style={{ background: "var(--gradient-brand)" }}
          />
          <h2 className="relative font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.05] font-bold">
            <WordReveal text="Start Your Career Journey Today" />
          </h2>
          <Reveal delay={0.12}>
            <p className="relative mx-auto mt-6 max-w-xl text-muted-foreground">
              Learn at {CONTACT.name}, {CONTACT.address}. Call us to check batch
              timings and admissions.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="relative mt-10 flex flex-wrap justify-center gap-4">
              {CONTACT.phones.map((p, i) => (
                <Magnetic key={p}>
                  <a
                    href={`tel:+91${p}`}
                    className={
                      i === 0
                        ? "shine inline-flex items-center gap-2 rounded-full brand-gradient px-8 py-4 text-sm font-medium text-primary-foreground"
                        : "glass inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-medium hover:tint-strong"
                    }
                  >
                    <Phone className="h-4 w-4" /> {p}
                  </a>
                </Magnetic>
              ))}
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative mt-10 border-t border-border">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <img
              src={klicLogo.url}
              alt="KLiC logo"
              width={36}
              height={36}
              className="h-9 w-9 rounded-xl object-cover"
            />
            <span className="font-display text-lg font-bold">
              {CONTACT.name}
            </span>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            {CONTACT.tagline} — {CONTACT.address}
          </p>
          <div className="mt-6 space-y-2 text-sm">
            {CONTACT.phones.map((p) => (
              <div key={p} className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-secondary" />
                <a href={`tel:+91${p}`}>{p}</a>
              </div>
            ))}
          </div>
        </div>


        <div>
          <p className="font-display text-sm font-semibold">Quick Links</p>
          <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
            {[
              ["Why KLiC", "#why"],
              ["Career Tracks", "#tracks"],
              ["Featured Courses", "#courses"],
              ["Learning Journey", "#journey"],
              ["Certification", "#certification"],
              ["FAQ", "#faq"],
            ].map(([label, href]) => (
              <li key={href}>
                <a className="transition-colors hover:text-foreground" href={href}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-display text-sm font-semibold">Career Tracks</p>
          <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
            {TRACKS.slice(0, 6).map((t) => (
              <li key={t.slug}>
                <a
                  className="transition-colors hover:text-foreground"
                  href={`https://klic.mkcl.org/klic-courses?track=${t.slug}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-display text-sm font-semibold">Stay in the loop</p>
          <p className="mt-5 text-sm text-muted-foreground">
            Get course and batch updates from Modern Computer Education.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="glass mt-5 flex items-center gap-2 rounded-full p-1.5"
          >
            <input
              type="email"
              required
              placeholder="you@email.com"
              aria-label="Email address"
              className="w-full bg-transparent px-4 text-sm outline-none placeholder:text-muted-foreground"
            />
            <button className="grid h-9 w-9 shrink-0 place-items-center rounded-full brand-gradient">
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
          <div className="mt-6 flex flex-col gap-2 text-sm text-muted-foreground">
            {CONTACT.phones.map((p) => (
              <a
                key={p}
                className="inline-flex items-center gap-1.5 hover:text-foreground"
                href={`tel:+91${p}`}
              >
                <Phone className="h-3.5 w-3.5" /> {p}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {CONTACT.name}, Baramati. {CONTACT.tagline}.
      </div>
    </footer>
  );
}
