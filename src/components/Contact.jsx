import { useEffect, useRef, useState } from "react";
import contactImg from "../assets/contactus_img/Neon Circuitry Cyborg Portrait.webp";

const EMAIL = "fusiondevstudio2007@gmail.com";
const LOCATION = "Karachi, Pakistan";

const PHONE = "+92 335 3977433, +92 333 3081106"; // <-- dikhne wala number
const PHONE_LINK = "+92 333 3081106"; // <-- bina space ke (click par call khulega)

const EMAILJS = {
  serviceId: "service_k9mqqrn",
  templateId: "template_c1koeie",
  publicKey: "PvyEkDMFYbZUKXT_q",
};

const SUBJECTS = [
  "Custom Website",
  "WordPress Development",
  "3D Models",
  "Other",
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
      { threshold },
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
        : "translate-y-10 opacity-0";

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

/* ---------- contact info item ---------- */
const INFO_ICONS = {
  mail: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="2" />
      <path d="m3 7 9 6.5L21 7" />
    </>
  ),
  phone: (
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
  ),
  pin: (
    <>
      <path d="M12 21.5s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12Z" />
      <circle cx="12" cy="9.5" r="2.6" />
    </>
  ),
};

function InfoItem({ icon, label, value, href }) {
  const Tag = href ? "a" : "div";
  return (
    <Tag
      {...(href ? { href } : {})}
      className="group flex items-center gap-5 transition-transform duration-500 hover:translate-x-2"
    >
      <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-neon/0 transition-all duration-500 group-hover:border-neon/60 group-hover:bg-neon/10 group-hover:shadow-[0_0_24px_rgba(30,144,255,0.55)]">
        <svg
          viewBox="0 0 24 24"
          className="h-7 w-7 fill-none stroke-neon stroke-[1.4] transition-transform duration-500 group-hover:scale-110"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {INFO_ICONS[icon]}
        </svg>
      </span>
      <div>
        <p className="text-xs font-light text-slate-400">{label}</p>
        <p className="mt-0.5 text-sm font-normal text-white transition-colors duration-300 group-hover:text-neon sm:text-[15px]">
          {value}
        </p>
      </div>
    </Tag>
  );
}
/* ---------- shared field style ---------- */
const FIELD =
  "w-full rounded-md border border-neon/25 bg-[#04152e]/70 px-4 py-3 text-sm font-light text-white outline-none transition-all duration-300 placeholder:text-slate-400 hover:border-neon/50 focus:border-neon focus:bg-[#05193a]/90 focus:shadow-[0_0_22px_rgba(30,144,255,0.35)]";

const EMPTY = { name: "", email: "", subject: "", message: "" };

/* ---------- section ---------- */
export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [imgRef, imgIn] = useInView(0.1);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    try {
      const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: EMAILJS.serviceId,
          template_id: EMAILJS.templateId,
          user_id: EMAILJS.publicKey,
          template_params: {
            name: form.name,
            email: form.email,
            title: form.subject,
            message: form.message,
            time: new Date().toLocaleString("en-GB", {
              timeZone: "Asia/Karachi",
            }),
          },
        }),
      });

      if (res.ok) {
        setStatus("success");
        setForm(EMPTY);
        setTimeout(() => setStatus("idle"), 7000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden bg-ink px-6 py-20 font-body text-white md:px-12 md:py-24 lg:px-[6vw] lg:py-28"
    >
      {/* ambient background */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 55% at 45% 50%, rgba(18,90,190,0.18) 0%, transparent 70%), radial-gradient(35% 40% at 5% 20%, rgba(18,60,140,0.18) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(120,180,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(120,180,255,1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, #000 30%, transparent 80%)",
          maskImage:
            "radial-gradient(ellipse at center, #000 30%, transparent 80%)",
        }}
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon/50 to-transparent" />

      {/* ===== content ===== */}
      <div className="relative z-10 mx-auto grid max-w-[1500px] gap-14 lg:grid-cols-[minmax(240px,1fr)_1.8fr] lg:gap-10 lg:pr-[24vw] xl:gap-16">
        {/* ----- left: intro + info ----- */}
        <div className="max-w-md">
          <Reveal from="left">
            <p className="font-display text-[10px] uppercase tracking-[0.4em] text-neon sm:text-[11px]">
              // Get in Touch
            </p>
          </Reveal>

          <Reveal delay={120}>
            <h2 className="mt-5 font-display text-4xl font-light uppercase leading-tight tracking-[0.04em] sm:text-5xl lg:text-[clamp(2.2rem,3vw,3.4rem)]">
              Contact{" "}
              <span className="animate-shimmer bg-gradient-to-r from-[#1e90ff] via-[#8fdcff] to-[#1e90ff] bg-[length:200%_100%] bg-clip-text text-transparent">
                Us
              </span>
            </h2>
          </Reveal>

          <Reveal delay={240}>
            <p className="mt-6 max-w-xs text-sm font-light leading-relaxed text-slate-300/85 md:text-base">
              Have a project in mind? Let&apos;s talk about it. We&apos;d love
              to hear from you.
            </p>
          </Reveal>

          <div className="mt-9 space-y-7">
            <Reveal delay={360} from="left">
              <InfoItem
                icon="mail"
                label="Email"
                value={EMAIL}
                href={`mailto:${EMAIL}`}
              />
            </Reveal>
            <Reveal delay={480} from="left">
              <InfoItem
                icon="phone"
                label="Phone"
                value={PHONE}
                href={`tel:${PHONE_LINK}`}
              />
            </Reveal>
            <Reveal delay={600} from="left">
              <InfoItem icon="pin" label="Location" value={LOCATION} />
            </Reveal>
          </div>
        </div>

        {/* ----- middle: form ----- */}
        <form onSubmit={onSubmit} className="w-full">
          <div className="grid gap-4 sm:grid-cols-2">
            <Reveal delay={200}>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={onChange}
                placeholder="Your Name"
                required
                autoComplete="name"
                className={FIELD}
              />
            </Reveal>
            <Reveal delay={280}>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={onChange}
                placeholder="Your Email"
                required
                autoComplete="email"
                className={FIELD}
              />
            </Reveal>
          </div>

          <Reveal delay={360} className="mt-4">
            <div className="relative">
              <select
                name="subject"
                value={form.subject}
                onChange={onChange}
                required
                className={`${FIELD} cursor-pointer appearance-none pr-10 ${
                  form.subject ? "text-white" : "text-slate-400"
                }`}
              >
                <option value="" disabled className="bg-[#04152e]">
                  Subject
                </option>
                {SUBJECTS.map((s) => (
                  <option key={s} value={s} className="bg-[#04152e] text-white">
                    {s}
                  </option>
                ))}
              </select>
              <svg
                viewBox="0 0 24 24"
                className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 fill-none stroke-slate-300 stroke-2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
          </Reveal>

          <Reveal delay={440} className="mt-4">
            <textarea
              name="message"
              value={form.message}
              onChange={onChange}
              placeholder="Message"
              required
              rows={5}
              className={`${FIELD} resize-none`}
            />
          </Reveal>

          <Reveal delay={520} className="mt-6">
            <div className="flex flex-wrap items-center gap-5">
              <button
                type="submit"
                disabled={status === "sending"}
                className="group relative inline-flex items-center gap-4 overflow-hidden rounded-full border border-neon/80 px-7 py-3 font-display text-[10px] uppercase tracking-[0.25em] text-white shadow-[0_0_18px_rgba(30,144,255,0.25)] transition-shadow duration-500 hover:shadow-[0_0_30px_rgba(30,144,255,0.7)] disabled:cursor-wait disabled:opacity-70 sm:text-[11px]"
              >
                <span className="absolute inset-0 -translate-x-full bg-neon transition-transform duration-500 ease-out group-hover:translate-x-0" />
                <span className="relative z-10">
                  {status === "sending" ? "Sending..." : "Send Message"}
                </span>
                {status === "sending" ? (
                  <span className="relative z-10 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    className="relative z-10 h-5 w-5 fill-none stroke-current stroke-[1.5] transition-transform duration-500 group-hover:translate-x-2"
                  >
                    <path
                      d="M3 12h17M14 6l6 6-6 6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>

              {status === "success" && (
                <p className="animate-fade-up text-sm font-light text-emerald-300">
                  Message sent! We will reply soon.
                </p>
              )}
              {status === "error" && (
                <p className="animate-fade-up text-sm font-light text-rose-300">
                  Something went wrong. Please try again or email us directly.
                </p>
              )}
            </div>
          </Reveal>
        </form>
      </div>

      {/* ===== right: image + tagline =====
          mobile/tablet: block below the form (full width)
          laptop: pinned to the right edge of the section */}
      <div
        ref={imgRef}
        className={`relative z-[5] -mx-6 -mb-20 mt-14 h-[360px] overflow-hidden transition-all duration-[1400ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] sm:h-[420px] md:-mx-12 md:-mb-24 lg:absolute lg:inset-y-0 lg:right-0 lg:mx-0 lg:mb-0 lg:mt-0 lg:h-auto lg:w-[30vw] ${
          imgIn ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
        }`}
      >
        <img
          src={contactImg}
          alt="Neon circuitry cyborg portrait"
          draggable="false"
          loading="lazy"
          className="h-full w-full scale-105 object-cover object-[75%_center] transition-transform duration-[1800ms] ease-out hover:scale-110"
        />

        {/* fades so the image melts into the page */}
        <div className="absolute inset-y-0 left-0 w-3/4 bg-gradient-to-r from-ink via-ink/60 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ink to-transparent lg:h-16" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-ink to-transparent" />

        {/* tagline */}
        <div className="group absolute left-6 top-1/2 z-10 -translate-y-1/2 cursor-default md:left-12 lg:left-[2.5vw]">
          <p className="font-display uppercase leading-[1.4] tracking-[0.18em]">
            <span className="block text-[11px] text-slate-200/90 sm:text-xs">
              Let&apos;s build
            </span>
            <span className="block text-[11px] text-slate-200/90 sm:text-xs">
              Something
            </span>
            <span className="block text-sm text-slate-100 sm:text-base">
              Amazing
            </span>
            <span className="block animate-shimmer bg-gradient-to-r from-[#1e90ff] via-[#8fdcff] to-[#1e90ff] bg-[length:200%_100%] bg-clip-text text-base font-medium text-transparent sm:text-lg">
              Together
            </span>
          </p>
          <span className="mt-4 block h-px w-6 bg-neon shadow-[0_0_8px_#1e90ff] transition-all duration-700 group-hover:w-16" />
        </div>
      </div>
    </section>
  );
}
