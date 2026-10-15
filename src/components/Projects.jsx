import { useEffect, useRef, useState } from "react";
import { CATEGORIES, FEATURED } from "../data/projects";

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
  const hidden = from === "left" ? "-translate-x-8 opacity-0" : "translate-y-10 opacity-0";

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

/* ---------- small arrow ---------- */
function Arrow({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={`fill-none stroke-neon stroke-[1.5] ${className}`}>
      <path d="M3 12h17M14 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ---------- project image (fallback if image fails) ---------- */
function ProjectImage({ p }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative isolate aspect-[16/10] overflow-hidden rounded-xl bg-[#04152e] ring-1 ring-white/10 transition-all duration-500 group-hover:ring-neon/60 group-hover:shadow-[0_0_34px_rgba(30,144,255,0.35)]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(30,120,255,0.4),transparent_70%)]" />

      {failed || !p.img ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-4xl font-light uppercase tracking-widest text-neon drop-shadow-[0_0_14px_#1e90ff]">
            {p.title.slice(0, 2)}
          </span>
        </div>
      ) : (
        <img
          src={p.img}
          alt={p.title}
          loading="lazy"
          draggable="false"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover object-top opacity-90 transition-transform duration-700 ease-out group-hover:scale-110"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />

      {/* light sweep */}
      <span className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-full skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-[1100ms] ease-out group-hover:translate-x-[420%]" />

      {/* view chip */}
      <span className="absolute bottom-3 right-3 translate-y-3 rounded-full border border-neon/70 bg-ink/70 px-3 py-1 font-display text-[9px] uppercase tracking-[0.22em] text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
        View Project
      </span>
    </div>
  );
}

/* ---------- project card (used on page and inside popup) ---------- */
function ProjectCard({ p }) {
  return (
    <a
      href={p.link || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="group block transition-transform duration-500 hover:-translate-y-2"
    >
      <ProjectImage p={p} />
      <h3 className="mt-5 text-lg font-normal tracking-wide text-white transition-colors duration-300 group-hover:text-neon">
        {p.title}
      </h3>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-sm font-light text-slate-300/80">{p.type}</span>
        <Arrow className="h-5 w-5 transition-transform duration-500 group-hover:translate-x-3" />
      </div>
    </a>
  );
}

/* ---------- section ---------- */
export default function Projects() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef(null);
  const scrollRef = useRef(null);

  const total = CATEGORIES.reduce((n, c) => n + c.projects.length, 0);

  // esc to close, lock page scroll, focus close button
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    scrollRef.current?.scrollTo({ top: 0 });
    const t = setTimeout(() => closeRef.current?.focus(), 350);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      clearTimeout(t);
    };
  }, [open]);

  const jumpTo = (id) =>
    document.getElementById(`proj-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <section
      id="projects"
      className="relative w-full overflow-hidden bg-ink px-6 py-20 font-body text-white md:px-12 md:py-24 lg:px-[6vw] lg:py-28"
    >
      {/* ambient background */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 50% at 85% 40%, rgba(18,90,190,0.16) 0%, transparent 70%), radial-gradient(35% 40% at 5% 80%, rgba(18,60,140,0.2) 0%, transparent 70%)",
        }}
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon/50 to-transparent" />

      <div className="relative z-10 mx-auto grid max-w-[1500px] gap-14 lg:grid-cols-[minmax(240px,1fr)_3fr] lg:gap-10 xl:gap-16">
        {/* ===== intro ===== */}
        <div className="max-w-md">
          <Reveal from="left">
            <p className="font-display text-[10px] uppercase tracking-[0.4em] text-neon sm:text-[11px]">
              // Our Projects
            </p>
          </Reveal>

          <Reveal delay={120}>
            <h2 className="mt-5 font-display text-4xl font-light uppercase leading-tight tracking-[0.04em] sm:text-5xl lg:text-[clamp(2.2rem,3vw,3.4rem)]">
              Featured
              <span className="block animate-shimmer bg-gradient-to-r from-[#1e90ff] via-[#8fdcff] to-[#1e90ff] bg-[length:200%_100%] bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
          </Reveal>

          <Reveal delay={240}>
            <p className="mt-6 max-w-xs text-sm font-light leading-relaxed text-slate-300/85 md:text-base">
              Explore some of our recent work and see how we turn ideas into digital
              experiences.
            </p>
          </Reveal>

          <Reveal delay={360}>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="group mt-10 inline-flex items-center gap-4 font-display text-[10px] uppercase tracking-[0.28em] text-white sm:text-[11px]"
            >
              <span className="relative pb-2.5">
                View All Projects
                <span className="absolute bottom-0 left-0 h-px w-3/4 bg-neon shadow-[0_0_8px_#1e90ff] transition-all duration-500 group-hover:w-full" />
              </span>
              <Arrow className="h-5 w-5 -translate-y-1 transition-transform duration-500 group-hover:translate-x-2" />
            </button>
          </Reveal>
        </div>

        {/* ===== featured cards ===== */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 md:gap-6 xl:gap-10">
          {FEATURED.map((p, i) => (
            <Reveal
              key={p.id}
              delay={200 + i * 180}
              className={
                i === 2
                  ? "sm:col-span-2 sm:mx-auto sm:w-full sm:max-w-[50%] md:col-span-1 md:mx-0 md:max-w-none"
                  : ""
              }
            >
              <ProjectCard p={p} />
            </Reveal>
          ))}
        </div>
      </div>

      {/* =====================================================================
          POPUP WINDOW: all projects (blurred background)
          ===================================================================== */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="All projects"
        aria-hidden={!open}
        className={`fixed inset-0 z-[100] transition-all duration-500 ${
          open ? "visible opacity-100" : "pointer-events-none invisible opacity-0"
        }`}
      >
        {/* blurred backdrop */}
        <div
          onClick={() => setOpen(false)}
          className="absolute inset-0 cursor-pointer bg-ink/70 backdrop-blur-xl"
        />

        <div className="relative flex h-full items-center justify-center p-3 sm:p-6 lg:p-10">
          <div
            className={`relative flex max-h-full w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#031126]/90 shadow-[0_0_80px_rgba(30,144,255,0.18)] transition-all duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] ${
              open ? "translate-y-0 scale-100 opacity-100" : "translate-y-10 scale-[0.96] opacity-0"
            }`}
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon to-transparent" />

            {/* header */}
            <div className="shrink-0 border-b border-white/10 px-5 pb-4 pt-5 sm:px-8 sm:pt-7 lg:px-10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-display text-[10px] uppercase tracking-[0.4em] text-neon sm:text-[11px]">
                    // All Projects
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-light uppercase tracking-[0.06em] sm:text-4xl">
                    Our{" "}
                    <span className="animate-shimmer bg-gradient-to-r from-[#1e90ff] via-[#8fdcff] to-[#1e90ff] bg-[length:200%_100%] bg-clip-text text-transparent">
                      Work
                    </span>
                    <span className="ml-3 align-middle font-body text-xs font-light normal-case tracking-normal text-slate-400">
                      {total} projects
                    </span>
                  </h3>
                </div>

                <button
                  ref={closeRef}
                  type="button"
                  aria-label="Close"
                  onClick={() => setOpen(false)}
                  className="group relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 transition-all duration-300 hover:rotate-90 hover:border-neon hover:shadow-[0_0_20px_rgba(30,144,255,0.6)]"
                >
                  <span className="absolute h-px w-4 rotate-45 bg-white transition-colors group-hover:bg-neon" />
                  <span className="absolute h-px w-4 -rotate-45 bg-white transition-colors group-hover:bg-neon" />
                </button>
              </div>

              {/* quick jump tabs */}
              <div className="mt-5 flex flex-wrap gap-2">
                {CATEGORIES.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => jumpTo(c.id)}
                    className="rounded-full border border-white/15 px-4 py-1.5 font-display text-[10px] uppercase tracking-[0.18em] text-slate-300 transition-all duration-300 hover:border-neon hover:bg-neon/10 hover:text-white hover:shadow-[0_0_16px_rgba(30,144,255,0.35)]"
                  >
                    {c.title}
                  </button>
                ))}
              </div>
            </div>

            {/* scrollable body: 3 sections, line by line */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto overscroll-contain px-5 pb-10 sm:px-8 lg:px-10 [scrollbar-color:rgba(30,144,255,0.5)_transparent] [scrollbar-width:thin]"
            >
              {CATEGORIES.map((cat, ci) => (
                <section key={cat.id} id={`proj-${cat.id}`} className="pt-10">
                  <div
                    className={`flex items-end gap-4 transition-all duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] ${
                      open ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
                    }`}
                    style={{ transitionDelay: open ? `${250 + ci * 120}ms` : "0ms" }}
                  >
                    <span className="font-display text-sm tracking-[0.2em] text-neon">
                      0{ci + 1}
                    </span>
                    <div>
                      <h4 className="font-display text-lg uppercase tracking-[0.16em] sm:text-2xl">
                        {cat.title}
                      </h4>
                      <p className="mt-1 text-xs font-light text-slate-400 sm:text-sm">
                        {cat.tagline}
                      </p>
                    </div>
                    <span className="ml-auto hidden font-display text-[10px] uppercase tracking-[0.2em] text-slate-400 sm:block">
                      {cat.projects.length} {cat.projects.length === 1 ? "project" : "projects"}
                    </span>
                  </div>

                  {/* growing line */}
                  <div
                    className={`mt-4 h-px w-full origin-left bg-gradient-to-r from-neon/80 via-neon/20 to-transparent transition-transform duration-[1200ms] ease-out ${
                      open ? "scale-x-100" : "scale-x-0"
                    }`}
                    style={{ transitionDelay: open ? `${350 + ci * 120}ms` : "0ms" }}
                  />

                  {cat.projects.length === 0 ? (
                    <p className="mt-8 text-sm font-light text-slate-400">Coming soon...</p>
                  ) : (
                    <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
                      {cat.projects.map((p, i) => (
                        <div
                          key={p.id}
                          className={`transition-all duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] ${
                            open ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                          }`}
                          style={{
                            transitionDelay: open ? `${450 + ci * 150 + i * 90}ms` : "0ms",
                          }}
                        >
                          <ProjectCard p={p} />
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}