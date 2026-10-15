import { useEffect, useRef, useState } from "react";

/* ---------- images (change URLs here if you want different pictures) ---------- */
const SERVICES = [
  {
    id: "01",
    title: "Custom Websites",
    desc: "Fast, responsive and scalable websites built from scratch.",
    img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=900&q=70",
    fallback: "</>",
  },
  {
    id: "02",
    title: "WordPress Development",
    desc: "Powerful WordPress websites with custom themes and plugins.",
    img: "https://upload.wikimedia.org/wikipedia/commons/9/98/WordPress_blue_logo.svg",
    logo: true,
    fallback: "W",
  },
  {
    id: "03",
    title: "3D Models",
    desc: "High-quality 3D models for games, products, branding and more.",
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=70",
    fallback: "3D",
  },
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

/* ---------- card image (with fallback if the URL fails) ---------- */
function ServiceImage({ item }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative isolate aspect-[16/10] overflow-hidden rounded-sm bg-[#03142b] ring-1 ring-white/5 transition-all duration-500 group-hover:ring-neon/60 group-hover:shadow-[0_0_32px_rgba(30,144,255,0.35)]">
      {/* blue glow behind image */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_55%,rgba(30,120,255,0.45),transparent_70%)] transition-opacity duration-700 group-hover:opacity-100" />

      {failed ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-5xl font-light text-neon drop-shadow-[0_0_14px_#1e90ff]">
            {item.fallback}
          </span>
        </div>
      ) : item.logo ? (
        <img
          src={item.img}
          alt={item.title}
          loading="lazy"
          draggable="false"
          onError={() => setFailed(true)}
          className="absolute inset-0 m-auto h-[62%] w-auto object-contain drop-shadow-[0_0_18px_rgba(30,144,255,0.85)] transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-[4deg]"
        />
      ) : (
        <img
          src={item.img}
          alt={item.title}
          loading="lazy"
          draggable="false"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover opacity-70 mix-blend-luminosity transition-all duration-700 ease-out group-hover:scale-110 group-hover:opacity-95"
        />
      )}

      {/* edge fade so image melts into the page */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,#020a16_100%)]" />

      {/* light sweep on hover */}
      <span className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-full skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-[1100ms] ease-out group-hover:translate-x-[420%]" />
    </div>
  );
}

/* ---------- section ---------- */
export default function Services() {
  return (
    <section
      id="services"
      className="relative w-full overflow-hidden bg-ink px-6 py-20 font-body text-white md:px-12 md:py-24 lg:px-[6vw] lg:py-28"
    >
      {/* ambient background */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 50% at 85% 60%, rgba(18,90,190,0.18) 0%, transparent 70%), radial-gradient(35% 40% at 5% 20%, rgba(18,60,140,0.2) 0%, transparent 70%)",
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
      {/* top divider glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon/50 to-transparent" />

      <div className="relative z-10 mx-auto grid max-w-[1500px] gap-14 lg:grid-cols-[minmax(240px,1fr)_3fr] lg:gap-10 xl:gap-16">
        {/* ===== intro ===== */}
        <div className="max-w-md">
          <Reveal from="left">
            <p className="font-display text-[10px] uppercase tracking-[0.4em] text-neon sm:text-[11px]">
              // Our Services
            </p>
          </Reveal>

          <Reveal delay={120}>
            <h2 className="mt-5 font-display text-4xl font-light uppercase leading-tight tracking-[0.04em] sm:text-5xl lg:text-[clamp(2.2rem,3vw,3.4rem)]">
              What we{" "}
              <span className="animate-shimmer bg-gradient-to-r from-[#1e90ff] via-[#8fdcff] to-[#1e90ff] bg-[length:200%_100%] bg-clip-text text-transparent">
                do
              </span>
            </h2>
          </Reveal>

          <Reveal delay={240}>
            <p className="mt-6 max-w-xs text-sm font-light leading-relaxed text-slate-300/85 md:text-base">
              We offer modern and creative digital solutions tailored to your business
              needs.
            </p>
          </Reveal>

          <Reveal delay={360}>
            <a
              href="#projects"
              className="group mt-10 inline-flex items-center gap-4 font-display text-[10px] uppercase tracking-[0.28em] text-white sm:text-[11px]"
            >
              <span className="relative pb-2.5">
                View All Services
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

        {/* ===== cards ===== */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 md:gap-6 xl:gap-10">
          {SERVICES.map((item, i) => (
            <Reveal
              key={item.id}
              delay={200 + i * 180}
              className={i === 2 ? "sm:col-span-2 sm:mx-auto sm:w-full sm:max-w-[50%] md:col-span-1 md:mx-0 md:max-w-none" : ""}
            >
              <a
                href="#projects"
                className="group block transition-transform duration-500 hover:-translate-y-2"
              >
                <span className="font-display text-[11px] tracking-[0.2em] text-slate-400 transition-colors duration-300 group-hover:text-neon">
                  {item.id}
                </span>

                <div className="mt-3">
                  <ServiceImage item={item} />
                </div>

                <h3 className="mt-6 font-display text-base uppercase leading-snug tracking-[0.14em] text-white transition-colors duration-300 group-hover:text-neon sm:text-[17px]">
                  {item.title}
                </h3>

                <p className="mt-3 max-w-[16rem] text-sm font-light leading-relaxed text-slate-300/80">
                  {item.desc}
                </p>

                <svg
                  viewBox="0 0 24 24"
                  className="mt-5 h-5 w-5 fill-none stroke-neon stroke-[1.5] transition-transform duration-500 group-hover:translate-x-3"
                >
                  <path d="M3 12h17M14 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}