import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
const klicLogo = { url: "/images/logos/logo-nav-colored.svg" };
import { TRACKS } from "@/data/klic";
import { Magnetic } from "./motion-primitives";
import { ThemeToggle } from "./ThemeToggle";


const LINKS = [
  { label: "Why KLiC", href: "#why" },
  { label: "Courses", href: "#courses" },
  { label: "Journey", href: "#journey" },
  { label: "Certification", href: "#certification" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        className="h-px origin-left brand-gradient"
        style={{ scaleX: progress }}
      />
      <div
        className={`transition-all duration-500 ${
          scrolled
            ? "glass mx-3 rounded-[2rem] py-2 shadow-[0_18px_60px_-40px_black]"
            : "py-5"
        }`}
        onMouseLeave={() => setMega(false)}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5">
          <a href="#top" className="flex items-center gap-3">
            <img
              src={klicLogo.url}
              alt="KLiC logo"
              width={36}
              height={36}
              className="h-9 w-9 rounded-xl object-contain"
            />
            <span className="font-display text-base font-bold tracking-tight sm:text-lg">
              Modern Computer
              <span className="text-muted-foreground"> Education</span>
            </span>
          </a>


          <nav className="hidden items-center gap-8 lg:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onMouseEnter={() => setMega(l.label === "Courses")}
                className="group relative py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 brand-gradient transition-transform duration-500 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Magnetic className="hidden sm:inline-block">

              <a
                href="https://klic.mkcl.org/klic-courses"
                target="_blank"
                rel="noreferrer"
                className="shine inline-flex items-center gap-1.5 rounded-full brand-gradient px-5 py-2.5 text-sm font-medium text-primary-foreground"
              >
                Explore Courses <ArrowUpRight className="h-4 w-4" />
              </a>
            </Magnetic>
            <button
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="glass grid h-10 w-10 place-items-center rounded-xl lg:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mega && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto mt-3 hidden max-w-7xl px-5 lg:block"
            >
              <div className="glass grid grid-cols-3 gap-1 rounded-3xl p-4">
                {TRACKS.map((t) => (
                  <a
                    key={t.slug}
                    href={`https://klic.mkcl.org/klic-courses?track=${t.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-2xl px-4 py-3 transition-colors hover:tint"
                  >
                    <p className="font-display text-sm font-semibold">{t.title}</p>
                    <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                      {t.description}
                    </p>
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass overflow-hidden lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-5">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-sm text-muted-foreground hover:tint hover:text-foreground"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="https://klic.mkcl.org/klic-courses"
                target="_blank"
                rel="noreferrer"
                className="mt-2 rounded-full brand-gradient px-5 py-3 text-center text-sm font-medium"
              >
                Explore Courses
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
