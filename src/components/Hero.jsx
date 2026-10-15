import { useEffect, useRef, useState } from "react";
import heroImg from "../assets/hero_img/Platinum Cyborg with Holographic Device.webp";
import logoImg from "../assets/logo/f-logo.webp";

const NAV_LINKS = ["Home", "Services", "Projects", "About", "Team", "Contact"];
const SERVICES = ["Modern Websites", "WordPress Solutions", "3D Models"];

/* ---------- floating neon particles ---------- */
function Particles() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let raf;
    let w = 0;
    let h = 0;

    const dots = Array.from({ length: 40 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.3 + 0.4,
      s: Math.random() * 0.00025 + 0.00008,
      a: Math.random() * 0.5 + 0.2,
    }));

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        d.y -= d.s * 16;
        if (d.y < 0) {
          d.y = 1;
          d.x = Math.random();
        }
        ctx.beginPath();
        ctx.arc(d.x * w, d.y * h, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(90,175,255,${d.a})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#1e90ff";
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
    />
  );
}

/* ---------- logo ---------- */
function Logo() {
  return (
    <a href="#home" className="group flex items-center gap-2.5 sm:gap-3">
      <img
        src={logoImg}
        alt="Fusion Dev Studio logo"
        draggable="false"
        className="h-8 w-auto animate-pulse-glow object-contain transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-110 sm:h-10"
      />
      <div className="font-display leading-none">
        <p className="text-lg font-light tracking-[0.3em] text-white sm:text-[22px]">
          FUSION
        </p>
        <p className="mt-1 text-[7px] font-light tracking-[0.45em] text-slate-400 sm:text-[8px]">
          DEV STUDIO
        </p>
      </div>
    </a>
  );
}

/* ---------- hero ---------- */
export default function Hero() {
  const [active, setActive] = useState("Home");
  const [open, setOpen] = useState(false);
  const bgRef = useRef(null);

  // parallax only on laptop / desktop (real mouse)
  const handleMove = (e) => {
    if (!bgRef.current || window.innerWidth < 1024) return;
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;
    bgRef.current.style.transform = `translate3d(${-x * 16}px, ${-y * 10}px, 0)`;
  };

  const resetMove = () => {
    if (bgRef.current) bgRef.current.style.transform = "translate3d(0,0,0)";
  };

  return (
    <section
      id="home"
      onMouseMove={handleMove}
      onMouseLeave={resetMove}
      className="hero-section relative w-full overflow-hidden bg-ink font-body text-white"
    >
      {/* ===== ambient background (fills the empty space) ===== */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 55% at 68% 50%, rgba(18,90,190,0.28) 0%, transparent 70%), radial-gradient(40% 40% at 10% 90%, rgba(18,60,140,0.22) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(120,180,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(120,180,255,1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, #000 30%, transparent 75%)",
          maskImage: "radial-gradient(ellipse at center, #000 30%, transparent 75%)",
        }}
      />

      <Particles />

      {/* ===== stage: image + content + services list ===== */}
      <div className="hero-stage">
        {/* background image
            mobile/tablet: image on top, text below
            laptop+: image at its natural ratio, centered, with faded top/bottom edges */}
        <div className="hero-img-mask absolute inset-x-0 top-0 h-[58svh] animate-bg-in md:h-[62svh] lg:h-full">
          <img
            ref={bgRef}
            src={heroImg}
            alt="Platinum cyborg holding a holographic device"
            className="h-full w-full scale-[1.03] object-cover object-[64%_center] transition-transform duration-700 ease-out will-change-transform lg:object-center"
            draggable="false"
          />
          {/* mobile/tablet: fade into page color */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/40 lg:hidden" />
          {/* laptop: soft left shade so text stays readable */}
          <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(2,10,22,0.65)_0%,rgba(2,10,22,0.2)_40%,transparent_65%)] lg:block" />
        </div>

        {/* left content */}
        <div className="relative z-10 flex min-h-[100svh] items-end px-6 pb-12 pt-28 md:px-12 md:pb-16 lg:absolute lg:inset-0 lg:min-h-0 lg:items-center lg:px-[6vw] lg:pb-0 lg:pt-10">
          <div className="w-full max-w-xl lg:max-w-[42vw]">
            <p
              className="animate-fade-up font-display text-[10px] uppercase tracking-[0.45em] text-neon sm:text-[11px]"
              style={{ animationDelay: "500ms" }}
            >
              Software Agency
            </p>

            <h1 className="mt-4 font-display text-[2.25rem] font-light uppercase leading-[1.12] tracking-[0.04em] sm:text-5xl md:text-6xl lg:mt-5 lg:text-[clamp(2.4rem,3.4vw,4.2rem)]">
              <span className="block overflow-hidden pb-1">
                <span className="block animate-slide-up" style={{ animationDelay: "650ms" }}>
                  Turning Ideas
                </span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="block animate-slide-up" style={{ animationDelay: "800ms" }}>
                  Into Digital
                </span>
              </span>
              <span className="block overflow-hidden pb-2">
                <span className="block animate-slide-up" style={{ animationDelay: "950ms" }}>
                  <span className="animate-shimmer cursor-default bg-gradient-to-r from-[#1e90ff] via-[#8fdcff] to-[#1e90ff] bg-[length:200%_100%] bg-clip-text text-transparent transition-[filter] duration-500 hover:drop-shadow-[0_0_18px_rgba(30,144,255,0.8)]">
                    Solutions
                  </span>
                </span>
              </span>
            </h1>

            <p
              className="mt-5 max-w-sm animate-fade-up text-sm font-light leading-relaxed text-slate-300/85 md:max-w-md md:text-base lg:mt-6 lg:max-w-[26vw] lg:text-[clamp(0.8rem,1.05vw,1rem)]"
              style={{ animationDelay: "1150ms" }}
            >
              We build modern websites, WordPress solutions and 3D experiences that help
              your brand grow in the digital world.
            </p>

            {/* services as small tags on mobile/tablet */}
            <ul
              className="mt-5 flex animate-fade-up flex-wrap gap-x-5 gap-y-2 lg:hidden"
              style={{ animationDelay: "1250ms" }}
            >
              {SERVICES.map((s) => (
                <li
                  key={s}
                  className="font-display text-[10px] uppercase tracking-[0.2em] text-neon/90"
                >
                  {s}
                </li>
              ))}
            </ul>

            <div className="mt-8 animate-fade-up lg:mt-9" style={{ animationDelay: "1350ms" }}>
              <a
                href="#projects"
                className="group inline-flex items-center gap-4 font-display text-[10px] uppercase tracking-[0.28em] text-white sm:text-[11px]"
              >
                <span className="relative pb-2.5">
                  Explore Our Work
                  <span className="absolute bottom-0 left-0 h-px w-3/4 bg-neon shadow-[0_0_8px_#1e90ff] transition-all duration-500 group-hover:w-full" />
                </span>
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 -translate-y-1 fill-none stroke-neon stroke-[1.5] transition-transform duration-500 group-hover:translate-x-2"
                >
                  <path d="M3 12h17M14 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* right services list (laptop+) */}
        <ul className="absolute right-[6vw] top-[30%] z-10 hidden lg:block">
          <span
            className="absolute left-0 top-0 h-full w-px origin-top animate-grow-y bg-neon/70 shadow-[0_0_8px_#1e90ff]"
            style={{ animationDelay: "1200ms" }}
          />
          {SERVICES.map((item, i) => (
            <li
              key={item}
              className="animate-fade-left"
              style={{ animationDelay: `${1400 + i * 150}ms` }}
            >
              <span className="group flex cursor-pointer items-center py-[6px] pl-5 font-display text-[10px] uppercase tracking-[0.25em] text-slate-300/90 transition-all duration-300 hover:translate-x-1.5 hover:text-white xl:text-[11px]">
                <span className="mr-0 h-1.5 w-0 rounded-full bg-neon opacity-0 shadow-[0_0_10px_#1e90ff] transition-all duration-300 group-hover:mr-3 group-hover:w-1.5 group-hover:opacity-100" />
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* ===== navbar ===== */}
      <header className="absolute inset-x-0 top-0 z-30 animate-fade-down">
        <div className="flex items-center justify-between bg-gradient-to-b from-ink/70 to-transparent px-6 py-5 md:px-12 lg:px-[6vw] lg:py-6">
          <Logo />

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 lg:flex xl:gap-10">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setActive(link)}
                className={`group relative py-2 font-display text-[10px] uppercase tracking-[0.2em] transition-colors duration-300 hover:text-white xl:text-[11px] ${
                  active === link ? "text-white" : "text-slate-300/80"
                }`}
              >
                {link}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px w-full origin-left bg-neon shadow-[0_0_8px_#1e90ff] transition-transform duration-500 ${
                    active === link ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4 sm:gap-6">
            <a
              href="#contact"
              className="group relative hidden overflow-hidden rounded-full border border-neon/80 px-5 py-2 font-display text-[10px] uppercase tracking-[0.2em] text-white shadow-[0_0_18px_rgba(30,144,255,0.25)] transition-shadow duration-500 hover:shadow-[0_0_28px_rgba(30,144,255,0.7)] sm:inline-flex xl:px-6 xl:py-2.5 xl:text-[11px]"
            >
              <span className="absolute inset-0 -translate-x-full bg-neon transition-transform duration-500 ease-out group-hover:translate-x-0" />
              <span className="relative z-10">Contact Us</span>
            </a>

            <button
              aria-label="Toggle menu"
              onClick={() => setOpen((o) => !o)}
              className="group flex h-8 w-8 flex-col items-end justify-center gap-[6px]"
            >
              <span
                className={`h-px bg-white transition-all duration-300 ${
                  open ? "w-7 translate-y-[7px] rotate-45" : "w-7"
                }`}
              />
              <span
                className={`h-px bg-white transition-all duration-300 ${
                  open ? "w-7 opacity-0" : "w-5 group-hover:w-7"
                }`}
              />
              <span
                className={`h-px bg-white transition-all duration-300 ${
                  open ? "w-7 -translate-y-[7px] -rotate-45" : "w-7"
                }`}
              />
            </button>
          </div>
        </div>

        {/* dropdown menu */}
        <div
          className={`absolute inset-x-0 top-full border-t border-white/10 bg-[#030d1c]/95 backdrop-blur-xl transition-all duration-500 ${
            open
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-4 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-1 px-6 py-6 md:px-12 lg:px-[6vw]">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => {
                  setActive(link);
                  setOpen(false);
                }}
                className="py-3 font-display text-sm uppercase tracking-[0.25em] text-slate-300 transition-all duration-300 hover:translate-x-2 hover:text-neon"
              >
                {link}
              </a>
            ))}
            <a
              href="#contact"
              className="mt-4 inline-flex w-fit rounded-full border border-neon px-6 py-2.5 font-display text-[11px] uppercase tracking-[0.2em] sm:hidden"
            >
              Get Free Trial
            </a>
          </div>
        </div>
      </header>

      {/* ===== scroll indicator (tablet+) ===== */}
      <button
        onClick={() => window.scrollBy({ top: window.innerHeight, behavior: "smooth" })}
        aria-label="Scroll down"
        className="group absolute bottom-6 right-8 z-10 hidden animate-fade-up flex-col items-center gap-2 md:flex lg:right-[4vw]"
        style={{ animationDelay: "1800ms" }}
      >
        <span className="relative flex h-6 w-4 justify-center rounded-full border border-slate-300/70 pt-1.5 transition-colors duration-300 group-hover:border-neon">
          <span className="h-1 w-px animate-scroll-dot rounded-full bg-neon" />
        </span>
        <span className="font-display text-[9px] uppercase tracking-[0.25em] text-slate-300/80 transition-colors group-hover:text-white">
          Scroll
        </span>
        <span className="relative h-12 w-px overflow-hidden bg-white/15">
          <span className="absolute inset-0 animate-scroll-line bg-gradient-to-b from-transparent via-neon to-transparent" />
        </span>
      </button>
    </section>
  );
}