import { useEffect, useRef, useState } from "react";
import logoImg from "../assets/logo/f-logo.webp";

/* =====================================================================
   YAHAN SE EDIT KAREIN
   ---------------------------------------------------------------------
   Social links: apna URL likhein. Jis ka icon nahi chahiye uska url "" kar dein.
   ===================================================================== */
const SOCIALS = [
  { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/fusion-developer-studio-3a15bb441/?isSelfProfile=true" },
  { id: "github", label: "GitHub", href: "https://github.com/fusiondevstudio0" },
  { id: "x", label: "X", href: "https://x.com/your-username" },
  { id: "instagram", label: "Instagram", href: "https://www.instagram.com/fusion_dev_studio/#" },
];

const NAV_LINKS = ["Home", "Services", "Projects", "About", "Team", "Contact"];
const TAGLINE = "Transforming Ideas Into Digital Excellence.";
const COMPANY = "Fusion Dev Studio";

/* ---------- icons ---------- */
const ICONS = {
  linkedin: (
    <path
      fill="currentColor"
      stroke="none"
      d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.75 0h3.8v1.6h.06c.53-1 1.82-2.05 3.75-2.05 4 0 4.74 2.63 4.74 6.05V21h-4v-5.1c0-1.22-.02-2.78-1.7-2.78-1.7 0-1.96 1.33-1.96 2.7V21h-4V9.75Z"
    />
  ),
  github: (
    <path
      fill="currentColor"
      stroke="none"
      d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.4-5.27 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"
    />
  ),
  x: (
    <path
      fill="currentColor"
      stroke="none"
      d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117Z"
    />
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.7" fill="currentColor" stroke="none" />
    </>
  ),
};

/* ---------- reveal on scroll ---------- */
function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, inView];
}

function Reveal({ children, delay = 0, from = "up", className = "" }) {
  const [ref, inView] = useInView();
  const hidden =
    from === "left"
      ? "-translate-x-8 opacity-0"
      : from === "right"
      ? "translate-x-8 opacity-0"
      : "translate-y-8 opacity-0";

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-[1000ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] ${
        inView ? "translate-x-0 translate-y-0 opacity-100" : hidden
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* ---------- logo ---------- */
function FooterLogo() {
  return (
    <a href="#home" className="group flex w-fit items-center gap-3">
      <img
        src={logoImg}
        alt="Fusion Dev Studio logo"
        draggable="false"
        className="h-9 w-auto object-contain transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-110 group-hover:drop-shadow-[0_0_12px_rgba(30,144,255,0.9)] sm:h-10"
      />
      <div className="font-display leading-none">
        <p className="text-xl font-light tracking-[0.3em] text-white sm:text-[22px]">FUSION</p>
        <p className="mt-1 text-[7px] font-light tracking-[0.45em] text-slate-400 sm:text-[8px]">
          DEV STUDIO
        </p>
      </div>
    </a>
  );
}

/* ---------- footer ---------- */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative w-full overflow-hidden bg-ink px-6 pb-8 pt-10 font-body text-white md:px-12 lg:px-[6vw]">
      {/* ambient background */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(40% 80% at 50% 0%, rgba(18,90,190,0.16) 0%, transparent 70%)",
        }}
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon/50 to-transparent" />

      <div className="relative z-10 mx-auto max-w-[1500px]">
        {/* ===== row 1: logo | nav | socials ===== */}
        <div className="flex flex-col items-center gap-8 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-6">
          <Reveal from="left" className="lg:justify-self-start">
            <FooterLogo />
          </Reveal>

          <Reveal delay={150}>
            <nav className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 xl:gap-x-9">
              {NAV_LINKS.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="group relative py-1 font-display text-[10px] uppercase tracking-[0.2em] text-slate-300/80 transition-colors duration-300 hover:text-white xl:text-[11px]"
                >
                  {link}
                  <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-neon shadow-[0_0_8px_#1e90ff] transition-transform duration-500 group-hover:scale-x-100" />
                </a>
              ))}
            </nav>
          </Reveal>

          <Reveal from="right" delay={300} className="lg:justify-self-end">
            <div className="flex items-center gap-3">
              {SOCIALS.filter((s) => s.href).map((s, i) => (
                <a
                  key={s.id}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{ transitionDelay: `${i * 40}ms` }}
                  className="group/s relative flex h-9 w-9 items-center justify-center rounded-full border border-transparent text-slate-300 transition-all duration-300 hover:-translate-y-1.5 hover:border-neon hover:bg-neon/10 hover:text-neon hover:shadow-[0_0_20px_rgba(30,144,255,0.6)]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-[18px] w-[18px] fill-none stroke-current stroke-[1.6] transition-transform duration-300 group-hover/s:scale-110"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {ICONS[s.id]}
                  </svg>
                  <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-md border border-neon/40 bg-ink/90 px-2 py-0.5 font-display text-[9px] uppercase tracking-[0.18em] text-white opacity-0 transition-all duration-300 group-hover/s:translate-y-0 group-hover/s:opacity-100">
                    {s.label}
                  </span>
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        {/* ===== divider (grows from left on entry) ===== */}
        <DividerLine />

        {/* ===== row 2: tagline | copyright ===== */}
        <div className="mt-6 flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left">
          <Reveal from="left" delay={200}>
            <p className="text-xs font-light text-slate-300/80 transition-colors duration-300 hover:text-white">
              {TAGLINE}
            </p>
          </Reveal>
          <Reveal from="right" delay={300}>
            <p className="text-xs font-light text-slate-400">
              &copy; {year} {COMPANY}. All rights reserved.
            </p>
          </Reveal>
        </div>
      </div>
    </footer>
  );
}

/* ---------- animated divider ---------- */
function DividerLine() {
  const [ref, inView] = useInView(0.5);
  return (
    <div
      ref={ref}
      className={`mt-8 h-px w-full origin-left bg-gradient-to-r from-neon/60 via-white/10 to-transparent transition-transform duration-[1600ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] ${
        inView ? "scale-x-100" : "scale-x-0"
      }`}
    />
  );
}