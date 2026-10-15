import { useEffect, useRef, useState } from "react";

/* ---------- IMAGE: yahan apni image ka URL ya import lagayen ---------- */
const ABOUT_IMG =
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1400&q=70";

/* local image use karni ho to:
   import aboutImg from "../assets/about/team.webp";
   phir upar ABOUT_IMG ki jagah:  const ABOUT_IMG = aboutImg;  */

/* ---------- icons ---------- */
const ICONS = {
  bulb: (
    <>
      <path d="M9 18h6M10 21h4" />
      <path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3Z" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="0.8" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="13" r="8" />
      <path d="M12 9v4l2.5 2M9.5 2.5h5" />
    </>
  ),
  chip: (
    <>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <rect x="9.5" y="9.5" width="5" height="5" rx="0.8" />
      <path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" />
    </>
  ),
};

const FEATURES = [
  { icon: "bulb", l1: "Creative", l2: "Solutions" },
  { icon: "target", l1: "Client", l2: "Focused" },
  { icon: "clock", l1: "On-Time", l2: "Delivery" },
  { icon: "chip", l1: "Modern", l2: "Technology" },
];

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

/* ---------- feature item ---------- */
function Feature({ item }) {
  return (
    <div className="group flex cursor-default items-center gap-4 transition-transform duration-500 hover:translate-x-2">
      <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-neon/70 bg-neon/5 transition-all duration-500 group-hover:bg-neon/15 group-hover:shadow-[0_0_26px_rgba(30,144,255,0.6)] sm:h-14 sm:w-14">
        {/* rotating dashed ring */}
        <svg
          viewBox="0 0 56 56"
          className="absolute inset-[-5px] h-[calc(100%+10px)] w-[calc(100%+10px)] fill-none stroke-neon/40 transition-transform duration-[1400ms] ease-out group-hover:rotate-180"
        >
          <circle cx="28" cy="28" r="26" strokeDasharray="3 7" strokeWidth="1" />
        </svg>
        <svg
          viewBox="0 0 24 24"
          className="relative h-6 w-6 fill-none stroke-neon stroke-[1.4] transition-transform duration-500 group-hover:scale-110 sm:h-7 sm:w-7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {ICONS[item.icon]}
        </svg>
      </span>

      <p className="font-display text-[10px] uppercase leading-relaxed tracking-[0.22em] text-slate-300/90 transition-colors duration-300 group-hover:text-white sm:text-[11px]">
        {item.l1}
        <br />
        {item.l2}
      </p>
    </div>
  );
}

/* ---------- section ---------- */
export default function About() {
  const [failed, setFailed] = useState(false);

  return (
    <section
      id="about"
      className="relative w-full overflow-hidden bg-ink px-6 py-20 font-body text-white md:px-12 md:py-24 lg:px-[6vw] lg:py-28"
    >
      {/* ambient background */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 55% at 52% 50%, rgba(18,90,190,0.22) 0%, transparent 70%), radial-gradient(35% 40% at 5% 20%, rgba(18,60,140,0.18) 0%, transparent 70%)",
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

      <div className="relative z-10 mx-auto grid max-w-[1500px] items-center gap-12 lg:grid-cols-[minmax(260px,1fr)_1.25fr_minmax(190px,0.55fr)] lg:gap-8 xl:gap-12">
        {/* ===== text ===== */}
        <div className="max-w-md lg:max-w-none">
          <Reveal from="left">
            <p className="font-display text-[10px] uppercase tracking-[0.4em] text-neon sm:text-[11px]">
              // Features
            </p>
          </Reveal>

          <Reveal delay={120}>
            <h2 className="mt-5 font-display text-4xl font-light uppercase leading-tight tracking-[0.04em] sm:text-5xl lg:text-[clamp(2.2rem,3vw,3.4rem)]">
              We are{" "}
              <span className="animate-shimmer bg-gradient-to-r from-[#1e90ff] via-[#8fdcff] to-[#1e90ff] bg-[length:200%_100%] bg-clip-text text-transparent">
                Fusion
              </span>
            </h2>
          </Reveal>

          <Reveal delay={240}>
            <p className="mt-6 text-sm font-light leading-relaxed text-slate-300/85 md:text-base lg:max-w-[22rem]">
              Fusion Dev Studio is a modern software agency focused on creating
              innovative digital solutions. We are a team of passionate developers,
              designers and 3D artists who turn your ideas into powerful digital
              products.
            </p>
          </Reveal>

          <Reveal delay={360}>
            <a
              href="#contact"
              className="group mt-10 inline-flex items-center gap-4 font-display text-[10px] uppercase tracking-[0.28em] text-white sm:text-[11px]"
            >
              <span className="relative pb-2.5">
                Learn More
                <span className="absolute bottom-0 left-0 h-px w-3/4 bg-neon shadow-[0_0_8px_#1e90ff] transition-all duration-500 group-hover:w-full" />
              </span>
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 -translate-y-1 fill-none stroke-neon stroke-[1.5] transition-transform duration-500 group-hover:translate-x-2"
              >
                <path d="M3 12h17M14 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </Reveal>
        </div>

        {/* ===== image ===== */}
        <Reveal from="scale" delay={250}>
          <div className="group relative mx-auto w-full max-w-2xl">
            <div
              className="relative aspect-[16/11] overflow-hidden"
              style={{
                WebkitMaskImage:
                  "linear-gradient(90deg, transparent 0%, #000 18%, #000 82%, transparent 100%), linear-gradient(180deg, transparent 0%, #000 14%, #000 86%, transparent 100%)",
                WebkitMaskComposite: "source-in",
                maskImage:
                  "linear-gradient(90deg, transparent 0%, #000 18%, #000 82%, transparent 100%), linear-gradient(180deg, transparent 0%, #000 14%, #000 86%, transparent 100%)",
                maskComposite: "intersect",
              }}
            >
              {/* glow behind */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_55%,rgba(30,120,255,0.5),transparent_70%)]" />

              {failed ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-6xl font-light text-neon drop-shadow-[0_0_16px_#1e90ff]">
                    F
                  </span>
                </div>
              ) : (
                <img
                  src={ABOUT_IMG}
                  alt="Fusion Dev Studio team at work"
                  loading="lazy"
                  draggable="false"
                  onError={() => setFailed(true)}
                  className="h-full w-full object-cover opacity-75 mix-blend-luminosity transition-transform duration-[1500ms] ease-out group-hover:scale-110"
                />
              )}

              {/* blue tint so any photo matches the theme */}
              <div className="absolute inset-0 bg-[#0a3d8f]/30 mix-blend-color" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-ink/30" />

              {/* slow scan line */}
              <span className="pointer-events-none absolute inset-x-0 top-0 h-1/3 animate-scroll-line bg-gradient-to-b from-transparent via-neon/10 to-transparent" />
            </div>
          </div>
        </Reveal>

        {/* ===== features ===== */}
        <div className="grid grid-cols-1 gap-7 min-[480px]:grid-cols-2 lg:grid-cols-1 lg:gap-8 lg:pl-2">
          {FEATURES.map((f, i) => (
            <Reveal key={f.icon} from="right" delay={350 + i * 140}>
              <Feature item={f} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}