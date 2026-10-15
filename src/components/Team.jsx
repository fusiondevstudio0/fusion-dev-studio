import { useEffect, useRef, useState } from "react";
import { TEAM } from "../data/team";

/* ---------- social icons ---------- */
const ICONS = {
  instagram: {
    label: "Instagram",
    node: (
      <>
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="0.7" fill="currentColor" stroke="none" />
      </>
    ),
  },
  facebook: {
    label: "Facebook",
    node: (
      <path
        fill="currentColor"
        stroke="none"
        d="M13.5 21v-8h2.7l.4-3.2h-3.1V7.8c0-.9.3-1.5 1.6-1.5h1.7V3.4c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2v2.3H7.6V13h2.7v8h3.2Z"
      />
    ),
  },
  github: {
    label: "GitHub",
    node: (
      <path
        fill="currentColor"
        stroke="none"
        d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.4-5.27 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"
      />
    ),
  },
  portfolio: {
    label: "Portfolio",
    node: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
        <path d="M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z" />
      </>
    ),
  },
};

const ORDER = ["instagram", "facebook", "github", "portfolio"];

/* ---------- reveal on scroll ---------- */
function useInView(threshold = 0.15) {
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
      : from === "scale"
      ? "scale-95 opacity-0"
      : "translate-y-10 opacity-0";

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-[1000ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] ${
        inView ? "translate-x-0 translate-y-0 scale-100 opacity-100" : hidden
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* ---------- social button ---------- */
function Social({ type, href }) {
  const icon = ICONS[type];
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={icon.label}
      className="group/s relative flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-neon transition-all duration-300 hover:-translate-y-1.5 hover:border-neon hover:bg-neon hover:text-ink hover:shadow-[0_0_20px_rgba(30,144,255,0.7)]"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-[18px] w-[18px] fill-none stroke-current stroke-[1.6] transition-transform duration-300 group-hover/s:scale-110"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {icon.node}
      </svg>
      {/* tooltip */}
      <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-md border border-neon/40 bg-ink/90 px-2 py-0.5 font-display text-[9px] uppercase tracking-[0.18em] text-white opacity-0 transition-all duration-300 group-hover/s:translate-y-0 group-hover/s:opacity-100">
        {icon.label}
      </span>
    </a>
  );
}

/* ---------- person photo (fallback silhouette if no image) ---------- */
function Photo({ person }) {
  const [failed, setFailed] = useState(false);
  const showImg = person.img && !failed;

  return (
    <div className="relative isolate aspect-[16/10] overflow-hidden rounded-lg bg-[#04152e] ring-1 ring-white/10 transition-all duration-500 group-hover:ring-neon/60 group-hover:shadow-[0_0_34px_rgba(30,144,255,0.35)]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(30,120,255,0.45),transparent_70%)]" />

      {showImg ? (
        <img
          src={person.img}
          alt={person.name}
          loading="lazy"
          draggable="false"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover object-[50%_20%] opacity-90 saturate-[0.85] transition-all duration-700 ease-out group-hover:scale-110 group-hover:opacity-100 group-hover:saturate-100"
        />
      ) : (
        <div className="absolute inset-0 flex items-end justify-center">
          <svg viewBox="0 0 100 100" className="h-[85%] w-auto fill-neon/25 drop-shadow-[0_0_14px_rgba(30,144,255,0.6)]">
            <circle cx="50" cy="34" r="16" />
            <path d="M16 100c0-22 14-36 34-36s34 14 34 36Z" />
          </svg>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />

      {/* light sweep */}
      <span className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-full skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-[1100ms] ease-out group-hover:translate-x-[420%]" />

      {/* bottom neon line grows on hover */}
      <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-neon shadow-[0_0_10px_#1e90ff] transition-all duration-700 group-hover:w-full" />
    </div>
  );
}

/* ---------- section ---------- */
export default function Team() {
  return (
    <section
      id="team"
      className="relative w-full overflow-hidden bg-ink px-6 py-20 font-body text-white md:px-12 md:py-24 lg:px-[6vw] lg:py-28"
    >
      {/* ambient background */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 55% at 50% 45%, rgba(18,90,190,0.2) 0%, transparent 70%), radial-gradient(35% 40% at 95% 70%, rgba(18,60,140,0.18) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(120,180,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(120,180,255,1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          WebkitMaskImage: "radial-gradient(ellipse at center, #000 30%, transparent 80%)",
          maskImage: "radial-gradient(ellipse at center, #000 30%, transparent 80%)",
        }}
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon/50 to-transparent" />

      <div className="relative z-10 mx-auto grid max-w-[1500px] items-center gap-14 lg:grid-cols-[minmax(220px,1fr)_2.4fr_minmax(150px,0.75fr)] lg:gap-10 xl:gap-16">
        {/* ===== intro ===== */}
        <div className="max-w-md">
          <Reveal from="left">
            <p className="font-display text-[10px] uppercase tracking-[0.4em] text-neon sm:text-[11px]">
              // Our Team
            </p>
          </Reveal>

          <Reveal delay={120}>
            <h2 className="mt-5 font-display text-4xl font-light uppercase leading-tight tracking-[0.04em] sm:text-5xl lg:text-[clamp(2.2rem,3vw,3.4rem)]">
              Meet our{" "}
              <span className="animate-shimmer bg-gradient-to-r from-[#1e90ff] via-[#8fdcff] to-[#1e90ff] bg-[length:200%_100%] bg-clip-text text-transparent">
                Team
              </span>
            </h2>
          </Reveal>

          <Reveal delay={240}>
            <p className="mt-6 max-w-xs text-sm font-light leading-relaxed text-slate-300/85 md:text-base">
              Two partners. One vision. Building the future together.
            </p>
          </Reveal>
        </div>

        {/* ===== people ===== */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-6 xl:gap-10">
          {TEAM.map((person, i) => (
            <Reveal key={person.id} delay={250 + i * 200}>
              <article className="group transition-transform duration-500 hover:-translate-y-2">
                <Photo person={person} />

                <h3 className="mt-5 text-base font-normal tracking-wide text-white transition-colors duration-300 group-hover:text-neon sm:text-[17px]">
                  {person.name}
                </h3>
                <p className="mt-1.5 text-sm font-light text-slate-300/75">{person.role}</p>

                <div className="mt-5 flex flex-wrap gap-3">
                  {ORDER.filter((k) => person.links?.[k]).map((k, n) => (
                    <div
                      key={k}
                      className="translate-y-0 transition-all duration-500"
                      style={{ transitionDelay: `${n * 60}ms` }}
                    >
                      <Social type={k} href={person.links[k]} />
                    </div>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* ===== quote ===== */}
        <Reveal from="right" delay={500}>
          <div className="group w-fit cursor-default">
            <span className="block h-px w-8 bg-neon shadow-[0_0_8px_#1e90ff] transition-all duration-700 group-hover:w-20" />
            <p className="my-5 font-display text-lg font-light uppercase leading-[1.55] tracking-[0.2em] text-slate-200/90 sm:text-xl">
              Great
              <br />
              Things
              <br />
              Happen
              <br />
              <span className="animate-shimmer bg-gradient-to-r from-[#1e90ff] via-[#8fdcff] to-[#1e90ff] bg-[length:200%_100%] bg-clip-text text-transparent">
                Together
              </span>
            </p>
            <span className="block h-px w-8 bg-neon shadow-[0_0_8px_#1e90ff] transition-all duration-700 group-hover:w-20" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}