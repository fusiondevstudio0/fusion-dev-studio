import { useEffect, useRef, useState } from 'react'
import logo from '../assets/logo/f-logo.webp'
import heroVideo from '../assets/video/statue-orbit.mp4'
import { CATEGORIES, PROJECTS } from '../data/projects'
import customImg from '../assets/projects_card_imgs/custom.webp'
import wordpressImg from '../assets/projects_card_imgs/wordpress.webp'
import threeDImg from '../assets/projects_card_imgs/3d.webp'

/* ================= EDIT HERE ================= */
const CARD_IMAGES = [customImg, wordpressImg, threeDImg] // same order as the cards: 01, 02, 03
const STOP_TIMES = [0, 4.5, Infinity] // [Hero, Services, Ideas] video seconds
const MAX_SPEED = 1.8
const WHEEL_STEP = 170 // window ke andar kitna scroll karne par agla section khule (2-3 wheel ticks)
const WHEEL_WINDOW = 600 // ms: itne time ke andar ke ticks jud jate hain (pehle 220 tha, slow scroll par fail hota tha)
const DEBUG_WHEEL = false // true karo -> console me wheel info dikhega (sirf debugging ke liye)
const PANELS = 3 // 0 = Projects, 1 = Contact, 2 = Footer

const CONTACT_EMAIL = 'fusiondevstudio2007@gmail.com'
const CONTACTS = [
  { type: 'phone', label: 'Phone 1', value: '+92 335 3977433', href: 'tel:+923353977433' },
  { type: 'phone', label: 'Phone 2', value: '+92 333 3081106', href: 'tel:+923333081106' },
  { type: 'mail', label: 'Email', value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
]
const ABOUT_TEXT =
  'Fusion Dev Studio is a software agency building custom websites, WordPress solutions and 3D models in Blender. We turn ideas into fast, polished digital products, with honest communication from the first call to launch and beyond.'
const TRUST = [
  { title: 'Fast response', text: 'We reply to every enquiry within 24 hours.' },
  { title: 'Clean, scalable code', text: 'Built to perform today and grow with you tomorrow.' },
  { title: 'Clear communication', text: 'Honest timelines and regular updates, no surprises.' },
  { title: 'Support after launch', text: 'We stay with you once your project goes live.' },
]
const FOOTER_TAGLINE = 'Custom web development, WordPress and 3D models in Blender, crafted to look sharp and perform fast.'
/* ============================================= */

const YEAR = new Date().getFullYear()

const NAV = [
  { label: 'Home', stage: 0 },
  { label: 'Services', stage: 1 },
  { label: 'About', stage: 2 },
  { label: 'Work', action: 'work' },
  { label: 'Contact', action: 'contact' },
]

const SERVICES = [
  { n: '01', title: 'Custom Web Development', tags: 'Frontend · Backend · Full-Stack', text: 'Fast, scalable websites and web apps built from scratch, from pixel-perfect interfaces to secure APIs.' },
  { n: '02', title: 'WordPress Development', tags: 'Themes · Plugins · WooCommerce', text: 'Custom WordPress sites and stores that look unique and are easy for you to manage.' },
  { n: '03', title: '3D Models in Blender', tags: 'Products · Characters · Animation', text: 'Realistic 3D models, renders and animations for brands, websites and product launches.' },
]

const EASE = 'ease-[cubic-bezier(.16,1,.3,1)]'

const Line = ({ children, delay = 0 }) => (
  <span className="block overflow-hidden py-[0.04em]">
    <span className="a-rise block" style={{ animationDelay: `${delay}s` }}>{children}</span>
  </span>
)

const show = (on) =>
  `transition-all duration-1000 ${EASE} ${
    on ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-10 blur-sm pointer-events-none'
  }`

/* staggered entrance helper */
const rise = (on, i, extra = '') => ({
  className: `${extra} transition-all duration-[900ms] ${EASE} ${on ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`,
  style: { transitionDelay: on ? `${450 + i * 110}ms` : '0ms' },
})

const spot = (e) => {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`)
}

/* true agar inner scroll area abhi us direction me scroll kar sakta hai */
const canScroll = (target, dir) => {
  const sc = target?.closest?.('[data-scroll]')
  if (!sc || sc.scrollHeight <= sc.clientHeight + 2) return false
  return dir > 0 ? sc.scrollTop + sc.clientHeight < sc.scrollHeight - 2 : sc.scrollTop > 0
}

const Icon = ({ type }) =>
  type === 'phone' ? (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.4-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  )

/* Project cover with graceful fallback if image is missing */
function Cover({ src, alt, label }) {
  const [ok, setOk] = useState(true)
  if (!src || !ok) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-white/[0.12] via-white/[0.03] to-accent/25">
        <span className="font-display text-6xl text-white/25">{label?.[0]}</span>
      </div>
    )
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setOk(false)}
      className={`h-full w-full object-cover transition-transform duration-[900ms] ${EASE} group-hover:scale-[1.06]`}
    />
  )
}

/* ================= CONTACT FORM ================= */
const inputCls =
  'w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-[13px] text-white placeholder:text-white/30 outline-none transition-all duration-300 hover:border-white/20 focus:border-accent/70 focus:bg-white/[0.09] focus:shadow-[0_0_0_4px_rgba(59,75,255,.15)]'

const Field = ({ label, children }) => (
  <label className="block">
    <span className="mb-2 block text-[9px] font-medium uppercase tracking-[0.25em] text-white/50">{label}</span>
    {children}
  </label>
)

function ContactForm() {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const onSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))
    if (data._honey) return
    setStatus('sending')
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...data, _subject: `New project enquiry from ${data.name}`, _template: 'table' }),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok || json.success === 'false' || json.success === false) throw new Error('failed')
      form.reset()
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="a-up flex min-h-[320px] flex-col items-center justify-center text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full border border-accent/60 bg-accent/15 text-2xl text-white shadow-[0_0_40px_rgba(59,75,255,.35)]">✓</span>
        <h3 className="mt-6 font-display text-3xl text-white">Message sent</h3>
        <p className="mt-2 max-w-xs text-xs leading-relaxed text-white/60">
          Thank you for reaching out. Our team will get back to you within 24 hours.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-8 border-b border-white/30 pb-1 text-[10px] uppercase tracking-[0.25em] text-white/70 transition-all hover:border-white hover:text-white"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name">
          <input required name="name" type="text" placeholder="John Carter" className={inputCls} />
        </Field>
        <Field label="Email address">
          <input required name="email" type="email" placeholder="you@company.com" className={inputCls} />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Phone (optional)">
          <input name="phone" type="tel" placeholder="+92 300 0000000" className={inputCls} />
        </Field>
        <Field label="Service">
          <div className="relative">
            <select name="service" defaultValue="Custom Web Development" className={`${inputCls} appearance-none pr-10`}>
              {['Custom Web Development', 'WordPress Development', '3D Models in Blender', 'Something else'].map((o) => (
                <option key={o} value={o} className="bg-[#0d0f16] text-white">{o}</option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-white/50">▾</span>
          </div>
        </Field>
      </div>

      <Field label="Project details">
        <textarea required name="message" rows={4} placeholder="Tell us about your project, goals and timeline..." className={`${inputCls} resize-none`} />
      </Field>

      {status === 'error' && (
        <p className="text-[11px] leading-relaxed text-red-300/90">
          Something went wrong. Please email us directly at{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="underline">{CONTACT_EMAIL}</a>.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl border border-white/30 bg-white/[0.06] py-4 text-[10px] font-medium uppercase tracking-[0.3em] text-white transition-colors duration-500 hover:border-white disabled:opacity-70"
      >
        <span className={`absolute inset-0 translate-y-full bg-white transition-transform duration-500 ${EASE} group-hover:translate-y-0`} />
        <span className="relative flex items-center gap-3 transition-colors duration-500 group-hover:text-black">
          {status === 'sending' ? (
            <>
              <span className="h-3 w-3 animate-spin rounded-full border border-current border-t-transparent" />
              Sending
            </>
          ) : (
            <>
              Send message
              <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
            </>
          )}
        </span>
      </button>
    </form>
  )
}

const CloseBtn = ({ onClick }) => (
  <button
    onClick={onClick}
    aria-label="Close"
    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 text-white/80 transition-all duration-500 hover:rotate-90 hover:border-white hover:bg-white hover:text-black"
  >
    ✕
  </button>
)

export default function Hero() {
  const videoRef = useRef(null)
  const parallaxRef = useRef(null)
  const stageRef = useRef(0)
  const targetRef = useRef(0)
  const busyRef = useRef(false)
  const cooldownRef = useRef(0)
  const durationRef = useRef(0)
  const resetRef = useRef(null)
  const uiRef = useRef({ menu: false, hub: false, proj: false, panel: 0 })

  const [stage, setStageState] = useState(0)
  const [menu, setMenu] = useState(false)
  const [hub, setHub] = useState(false)
  const [proj, setProj] = useState(false)
  const [panel, setPanel] = useState(0)
  const [cat, setCat] = useState('custom')

  const timeFor = (i) => {
    const end = Math.max(durationRef.current - 0.05, 0)
    return Math.min(STOP_TIMES[i], end)
  }

  const setStage = (i) => {
    stageRef.current = i
    setStageState(i)
    targetRef.current = timeFor(i)
    busyRef.current = true
  }

  const openHub = (p = 0) => {
    clearTimeout(resetRef.current)
    cooldownRef.current = performance.now() + 900
    setPanel(p)
    setHub(true)
  }
  const closeHub = () => {
    cooldownRef.current = performance.now() + 700
    setProj(false)
    setHub(false)
    resetRef.current = setTimeout(() => setPanel(0), 900)
  }
  const gotoPanel = (p) => {
    cooldownRef.current = performance.now() + 1000
    setPanel(p)
  }
  const openProj = (id) => { setCat(id); setProj(true) }
  const closeProj = () => setProj(false)

  const goStage = (i) => {
    setProj(false)
    setHub(false)
    setStage(i)
  }

  const goNav = (item) => {
    setMenu(false)
    if (item.action === 'work') { setProj(false); setStage(2); openHub(0); return }
    if (item.action === 'contact') { setProj(false); setStage(2); openHub(1); return }
    goStage(item.stage)
  }

  useEffect(() => {
    uiRef.current = { menu, hub, proj, panel }
    document.body.style.overflow = menu || hub || proj ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menu, hub, proj, panel])

  /* ---------- Video auto-play between stops ---------- */
  useEffect(() => {
    const v = videoRef.current
    let raf, last = performance.now(), cur = 0, vel = 0

    const onMeta = () => {
      durationRef.current = v.duration || 0
      targetRef.current = timeFor(stageRef.current)
    }
    v.addEventListener('loadedmetadata', onMeta)
    if (v.readyState >= 1) onMeta()

    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      const diff = targetRef.current - cur

      if (Math.abs(diff) > 0.015) {
        const desired = Math.min(MAX_SPEED, Math.abs(diff) * 2.2 + 0.12)
        vel += (desired - vel) * 0.14
        cur += Math.sign(diff) * Math.min(Math.abs(diff), vel * dt)
        if (!v.seeking) v.currentTime = cur
      } else {
        vel = 0
        if (!v.seeking && Math.abs(v.currentTime - targetRef.current) > 0.01) {
          cur = targetRef.current
          v.currentTime = cur
        }
        if (busyRef.current) {
          busyRef.current = false
          cooldownRef.current = performance.now() + 500
        }
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      v.removeEventListener('loadedmetadata', onMeta)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* ---------- Wheel / touch / keyboard ---------- */
  useEffect(() => {
    const go = (dir) => {
      if (busyRef.current || performance.now() < cooldownRef.current) return true
      const next = stageRef.current + dir
      if (next < 0) return false
      if (next > 2) { openHub(0); return true }
      setStage(next)
      return true
    }

    // Hub window ke andar: projects <-> contact <-> footer
    const hubStep = (dir) => {
      const p = uiRef.current.panel
      if (dir > 0) { if (p < PANELS - 1) gotoPanel(p + 1) }
      else if (p > 0) gotoPanel(p - 1)
      else closeHub()
    }

    let acc = 0, accTimer
    const onWheel = (e) => {
      const ui = uiRef.current
      if (ui.menu || ui.proj) return
      if (Math.abs(e.deltaY) < 4 || Math.abs(e.deltaY) < Math.abs(e.deltaX)) return
      const dir = e.deltaY > 0 ? 1 : -1

      if (ui.hub) {
        const inner = canScroll(e.target, dir)
        if (DEBUG_WHEEL) {
          console.log('[wheel hub]', {
            panel: ui.panel,
            deltaY: e.deltaY,
            innerScroll: inner,
            cooldownLeftMs: Math.round(cooldownRef.current - performance.now()),
            acc,
            target: e.target?.tagName,
          })
        }
        if (inner) return
        if (performance.now() < cooldownRef.current) return
        acc += e.deltaY
        clearTimeout(accTimer)
        accTimer = setTimeout(() => { acc = 0 }, WHEEL_WINDOW)
        if (Math.abs(acc) >= WHEEL_STEP) {
          acc = 0
          hubStep(dir)
        }
        return
      }
      if (go(dir)) e.preventDefault()
    }

    let y0 = null
    const onTouchStart = (e) => { y0 = e.touches[0].clientY }
    const onTouchMove = (e) => {
      const ui = uiRef.current
      if (ui.menu || ui.proj || y0 === null) return
      const dy = y0 - e.touches[0].clientY
      const dir = dy > 0 ? 1 : -1
      if (ui.hub) {
        if (Math.abs(dy) > 60 && !canScroll(e.target, dir)) {
          if (performance.now() >= cooldownRef.current) hubStep(dir)
          y0 = null
        }
        return
      }
      if (Math.abs(dy) > 4) e.preventDefault()
      if (Math.abs(dy) > 40) {
        go(dir)
        y0 = null
      }
    }

    const onKey = (e) => {
      const ui = uiRef.current
      if (e.key === 'Escape') {
        if (ui.proj) setProj(false)
        else if (ui.hub) closeHub()
        else if (ui.menu) setMenu(false)
        return
      }
      if (ui.menu || ui.proj) return
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return
      let dir = 0
      if (['ArrowDown', 'PageDown'].includes(e.key) || (e.key === ' ' && !e.shiftKey)) dir = 1
      if (['ArrowUp', 'PageUp'].includes(e.key) || (e.key === ' ' && e.shiftKey)) dir = -1
      if (!dir) return
      if (ui.hub) {
        if (dir > 0 && ui.panel < PANELS - 1) gotoPanel(ui.panel + 1)
        if (dir < 0 && ui.panel > 0) gotoPanel(ui.panel - 1)
        e.preventDefault()
        return
      }
      if (go(dir)) e.preventDefault()
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('keydown', onKey)
      clearTimeout(accTimer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* ---------- Mouse parallax ---------- */
  useEffect(() => {
    const el = parallaxRef.current
    const move = (e) => {
      const x = e.clientX / window.innerWidth - 0.5
      const y = e.clientY / window.innerHeight - 0.5
      el.style.transform = `translate3d(${x * -18}px, ${y * -12}px, 0) scale(1.04)`
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  const activeLabel = hub || proj ? (panel >= 1 && !proj ? 'Contact' : 'Work') : NAV[stage].label
  const current = CATEGORIES.find((c) => c.id === cat) ?? CATEGORIES[0]
  const list = PROJECTS[current.id] ?? []
  const on0 = hub && panel === 0 && !proj
  const on1 = hub && panel === 1 && !proj
  const on2 = hub && panel === 2 && !proj

  const hubState = !hub
    ? 'pointer-events-none translate-y-12 scale-[.97] opacity-0'
    : proj
      ? 'pointer-events-none scale-[.96] opacity-40 blur-[1px]'
      : 'translate-y-0 scale-100 opacity-100'

  return (
    <>
      {/* ================= HEADER ================= */}
      <header className="fixed inset-x-0 top-0 z-50 flex items-center px-6 py-7 lg:px-[5.5vw] lg:py-[2.6vw]">
        <button onClick={() => goStage(0)} className="a-down group flex items-center gap-3" style={{ animationDelay: '.2s' }}>
          <img
            src={logo}
            alt="Fusion Dev Studio logo"
            className="h-7 w-7 object-contain transition-transform duration-700 group-hover:rotate-[360deg] group-hover:scale-110"
          />
          <span className="font-display text-[15px] font-semibold uppercase tracking-[0.18em] text-white">
            Fusion Dev Studio
          </span>
        </button>

        <nav className="ml-[5vw] hidden items-center gap-[3.6vw] lg:flex">
          {NAV.map((item, i) => {
            const isActive = activeLabel === item.label
            return (
              <button
                key={item.label}
                onClick={() => goNav(item)}
                className={`a-down group relative py-2 text-[10px] font-medium uppercase tracking-[0.2em] transition-colors hover:text-white ${
                  isActive ? 'text-white' : 'text-white/70'
                }`}
                style={{ animationDelay: `${0.35 + i * 0.08}s` }}
              >
                {item.label}
                <span
                  className={`absolute bottom-0 left-0 h-px w-full origin-left bg-accent transition-transform duration-500 ${EASE} ${
                    isActive ? 'scale-x-[.4]' : 'scale-x-0'
                  } group-hover:scale-x-100`}
                />
              </button>
            )
          })}
        </nav>

        <button
          onClick={() => setMenu((m) => !m)}
          aria-label="Menu"
          className="a-down group ml-auto flex h-8 w-8 items-center justify-center"
          style={{ animationDelay: '.7s' }}
        >
          {menu ? (
            <span className="text-lg leading-none text-white transition-transform duration-500 group-hover:rotate-90">✕</span>
          ) : (
            <span className="flex h-4 items-center gap-[3px]">
              {[0, 1, 2].map((b) => (
                <i
                  key={b}
                  className={`block w-px bg-white transition-all duration-500 ${EASE} ${
                    b === 1 ? 'h-4 group-hover:h-2' : 'h-2.5 group-hover:h-4'
                  }`}
                />
              ))}
            </span>
          )}
        </button>
      </header>

      {/* ================= MENU OVERLAY ================= */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 bg-[#06070b]/95 backdrop-blur-md transition-all duration-700 ${EASE} ${
          menu ? 'opacity-100 [clip-path:circle(150%_at_100%_0)]' : 'pointer-events-none opacity-0 [clip-path:circle(0%_at_100%_0)]'
        }`}
      >
        {NAV.map((item, i) => (
          <button
            key={item.label}
            onClick={() => goNav(item)}
            className={`menu-link font-display text-5xl text-white transition-all duration-700 ${EASE} ${
              menu ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: menu ? `${150 + i * 80}ms` : '0ms' }}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* ================= HERO ================= */}
      <section id="home" className="relative h-screen w-full overflow-hidden bg-[#06070b]">
        <div
          ref={parallaxRef}
          className={`absolute inset-0 transition-transform duration-[900ms] ${EASE} will-change-transform`}
          style={{ transform: 'scale(1.04)' }}
        >
          <video ref={videoRef} src={heroVideo} muted playsInline preload="auto" className="a-video h-full w-full object-cover" />
        </div>

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(6,7,11,.75)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#06070b]/70 to-transparent" />

        {/* Watermark cover (top-left corner) */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-[9vh] w-[16vw] min-h-[44px] min-w-[120px] bg-[radial-gradient(ellipse_at_top_left,#06070b_55%,transparent_78%)]" />

        {['20%', '39%', '60%', '80%'].map((left, i) => (
          <span
            key={left}
            className="a-grow pointer-events-none absolute top-0 h-full w-px bg-white/[0.07] max-lg:hidden"
            style={{ left, animationDelay: `${0.3 + i * 0.15}s` }}
          />
        ))}

        {/* Stage indicator */}
        <div className="a-up absolute left-6 top-[44%] z-30 flex flex-col gap-2 lg:left-[5.5vw] max-sm:hidden" style={{ animationDelay: '1.1s' }}>
          {[0, 1, 2].map((i) => (
            <button key={i} onClick={() => goStage(i)} aria-label={`Go to section ${i + 1}`} className="group flex h-5 items-center gap-3">
              <span
                className={`block h-px transition-all duration-500 ${EASE} ${
                  stage === i ? 'w-8 bg-accent' : 'w-1.5 bg-white/40 group-hover:w-5 group-hover:bg-white'
                }`}
              />
              <span className={`text-[10px] tracking-[0.2em] text-accent transition-all duration-500 ${stage === i ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'}`}>
                0{i + 1}
              </span>
            </button>
          ))}
        </div>

        {/* ---------- STAGE 0 ---------- */}
        <div className={`absolute inset-0 z-20 ${show(stage === 0)}`}>
          <h1 className="absolute bottom-[22vh] right-6 text-right font-display text-[clamp(2.6rem,4.9vw,5.8rem)] font-medium leading-[1.04] text-white lg:bottom-[11vh] lg:right-[40vw]">
            <Line delay={0.7}>Crafting</Line>
            <Line delay={0.85}>Digital</Line>
            <Line delay={1}>Masterpieces</Line>
          </h1>

          <p
            className="a-up absolute bottom-[9vh] left-6 right-6 text-[11px] leading-relaxed text-white/70 lg:bottom-[13vh] lg:left-[63.5vw] lg:right-auto lg:w-[15vw] lg:min-w-[190px]"
            style={{ animationDelay: '1.4s' }}
          >
            Fusion Dev Studio builds custom websites, WordPress solutions and 3D models in Blender,
            designed to look sharp and perform fast.
          </p>

          <button
            onClick={() => goStage(1)}
            className="a-up group absolute bottom-6 left-6 flex items-center gap-3 lg:bottom-[5vh] lg:left-[5.5vw]"
            style={{ animationDelay: '1.7s' }}
          >
            <span className="relative block h-10 w-px overflow-hidden bg-white/20">
              <span className="a-scroll absolute inset-0 bg-white" />
            </span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-white/60 transition-colors group-hover:text-white">Scroll</span>
          </button>
        </div>

        {/* ---------- STAGE 1 : Services ---------- */}
        <div className={`absolute inset-0 z-20 ${stage === 1 ? '' : 'pointer-events-none'}`}>
          <div
            className={`pointer-events-none absolute inset-y-0 left-0 w-full bg-gradient-to-r from-[#06070b]/85 via-[#06070b]/55 to-transparent transition-opacity duration-1000 lg:w-[52vw] ${
              stage === 1 ? 'opacity-100' : 'opacity-0'
            }`}
          />

          <div className="absolute left-6 top-[17vh] w-[min(88vw,450px)] space-y-2 lg:left-[calc(16vw-1rem)] lg:top-1/2 lg:-translate-y-1/2">
            <p className={`pb-2 pl-4 text-[10px] font-medium uppercase tracking-[0.3em] text-accent ${show(stage === 1)}`}>
              Our Services
            </p>

            {SERVICES.map((s, i) => (
              <div key={s.title} className={show(stage === 1)} style={{ transitionDelay: stage === 1 ? `${(i + 1) * 140}ms` : '0ms' }}>
                <div className="group cursor-default rounded-2xl border border-transparent p-4 transition-all duration-500 hover:border-white/15 hover:bg-[#0d0f16]/70 hover:shadow-[0_10px_50px_rgba(0,0,0,.55)] hover:backdrop-blur-xl">
                  <div className="flex items-baseline gap-4">
                    <span className="text-[10px] tracking-[0.2em] text-white/50 transition-colors duration-500 group-hover:text-accent">{s.n}</span>
                    <h3 className="font-display text-[clamp(1.4rem,1.9vw,2.2rem)] leading-tight text-white [text-shadow:0_2px_14px_rgba(0,0,0,.7)] transition-transform duration-500 group-hover:translate-x-2">
                      {s.title}
                    </h3>
                  </div>
                  <p className="mt-1 pl-8 text-[10px] uppercase tracking-[0.18em] text-white/70 [text-shadow:0_2px_10px_rgba(0,0,0,.7)]">{s.tags}</p>
                  <p className="mt-2 max-w-[22rem] pl-8 text-[10px] leading-relaxed text-white/75 [text-shadow:0_2px_10px_rgba(0,0,0,.7)] lg:text-[11px]">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ---------- STAGE 2 : Ideas Engineered ---------- */}
        <div className={`absolute inset-0 z-20 ${show(stage === 2 && !hub)}`}>
          <h2 className="absolute bottom-[26vh] left-6 font-display text-[clamp(2.4rem,4.6vw,5.4rem)] font-medium leading-[1.06] text-white lg:bottom-[9vh] lg:left-[7vw]">
            Ideas Engineered<br />into Scalable<br />Products
          </h2>

          <div className="absolute bottom-[8vh] left-6 right-6 flex flex-col gap-5 lg:left-auto lg:right-[6vw] lg:w-[32vw]">
            <div className="grid grid-cols-2 gap-5 text-[10px] leading-relaxed text-white/60 lg:text-[11px]">
              <p>We design, build and launch products with clean code, sharp UI and a process you can trust.</p>
              <p>Web development, WordPress and 3D, all under one roof, from the first sketch to launch.</p>
            </div>

            <button
              onClick={() => openHub(1)}
              className="group relative inline-flex w-fit items-center gap-3 overflow-hidden border border-white/30 px-7 py-3 text-[10px] font-medium uppercase tracking-[0.25em] text-white transition-colors duration-500 hover:border-white"
            >
              <span className={`absolute inset-0 translate-y-full bg-white transition-transform duration-500 ${EASE} group-hover:translate-y-0`} />
              <span className="relative transition-colors duration-500 group-hover:text-black">Start a Project</span>
              <span className="relative transition-all duration-500 group-hover:translate-x-1 group-hover:text-black">→</span>
            </button>
          </div>

          <div className="absolute right-5 top-1/2 -translate-y-1/2 max-sm:hidden lg:right-[3vw]">
            <button onClick={() => openHub(0)} className="a-up group flex flex-col items-center gap-3" style={{ animationDelay: '1.4s' }}>
              <span className="relative block h-12 w-px overflow-hidden bg-white/20">
                <span className="a-scroll absolute inset-0 bg-white" />
              </span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-white/60 transition-colors group-hover:text-white [writing-mode:vertical-rl]">
                Scroll to view our work
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* ================= WINDOW 1 : PROJECTS + CONTACT + FOOTER ================= */}
      <div
        onClick={closeHub}
        className={`fixed inset-0 z-[45] bg-black/30 backdrop-blur-[3px] transition-opacity duration-700 ${hub ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      />
      <div
        role="dialog"
        aria-label="Our work, contact and footer"
        aria-hidden={!hub}
        className={`fixed inset-x-4 bottom-4 top-[92px] z-[46] overflow-hidden rounded-[2rem] border border-white/15 bg-white/[0.06] shadow-[0_30px_120px_rgba(0,0,0,.6)] backdrop-blur-md transition-all duration-700 ${EASE} lg:inset-x-[5.5vw] lg:bottom-[4vh] lg:top-[110px] ${hubState}`}
      >
        <div className="pointer-events-none absolute inset-0 z-10 rounded-[2rem] bg-gradient-to-b from-white/[0.07] to-transparent" />

        {/* Panel dots */}
        <div className="absolute right-3 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-3 max-sm:hidden">
          {[0, 1, 2].map((i) => (
            <button
              key={i}
              onClick={() => gotoPanel(i)}
              aria-label={['Projects', 'Contact', 'Footer'][i]}
              className={`w-1.5 rounded-full transition-all duration-500 ${EASE} ${panel === i ? 'h-7 bg-accent' : 'h-1.5 bg-white/30 hover:bg-white'}`}
            />
          ))}
        </div>

        {/* Sliding track (3 panels) */}
        <div
          className={`absolute inset-x-0 top-0 h-[300%] transition-transform duration-[1100ms] ${EASE}`}
          style={{ transform: `translateY(-${panel * (100 / PANELS)}%)` }}
        >
          {/* ---------- PANEL 0 : OUR WORK ---------- */}
          <div className="relative flex h-1/3 flex-col">
            <div className="relative flex items-start justify-between gap-6 px-6 pt-7 lg:px-12 lg:pt-10">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-accent">Our Work</p>
                <h2 className="mt-3 font-display text-[clamp(2rem,3.4vw,3.8rem)] leading-[1.05] text-white">
                  Choose a service to explore
                </h2>
                <p className="mt-3 max-w-md text-[11px] leading-relaxed text-white/60 lg:text-xs">
                  A selection of projects we have designed, built and shipped for clients around the world.
                </p>
              </div>
              <CloseBtn onClick={closeHub} />
            </div>

                        <div data-scroll className="thin-scroll relative mt-6 grid min-h-0 flex-1 content-start gap-4 overflow-y-auto overscroll-contain px-6 pb-16 md:grid-cols-3 lg:mt-8 lg:gap-6 lg:px-12 lg:pb-20">
              {CATEGORIES.map((c, i) => {
                const items = PROJECTS[c.id] ?? []
                return (
                  <div
                    key={c.id}
                    className={`transition-all duration-700 ${EASE} ${on0 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                    style={{ transitionDelay: on0 ? `${250 + i * 110}ms` : '0ms' }}
                  >
                    <button
                      onClick={() => openProj(c.id)}
                      className="group flex h-full w-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] p-6 text-left transition-colors duration-500 hover:border-white/25 hover:bg-white/[0.08] lg:p-8"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[clamp(10px,.75vw,13px)] tracking-[0.25em] text-white/50">{c.number}</span>
                        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-sm text-white/80 transition-all duration-500 group-hover:-rotate-45 group-hover:border-white group-hover:bg-white group-hover:text-black">
                          →
                        </span>
                      </div>

                      <div className="mt-8 lg:mt-10">
                        <h3 className="font-display text-[clamp(1.7rem,2.4vw,3rem)] leading-[1.08] text-white">{c.title}</h3>
                        <p className="mt-4 text-[clamp(9px,.7vw,12px)] uppercase tracking-[0.18em] text-white/55">{c.tags}</p>
                        <p className="mt-3 max-w-[24rem] text-[clamp(11px,.85vw,15px)] leading-[1.7] text-white/65">{c.description}</p>
                      </div>

                      <div className="mt-8 flex flex-1 items-end justify-between gap-4 lg:mt-10">
                        {CARD_IMAGES[i] && (
                          <div className="relative aspect-[9/16] h-[clamp(11rem,28vh,26rem)] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
                            <img
                              src={CARD_IMAGES[i]}
                              alt={`${c.title} preview`}
                              loading="lazy"
                              className={`h-full w-full object-cover transition-transform duration-[900ms] ${EASE} group-hover:scale-[1.03]`}
                            />
                          </div>
                        )}
                        <span className="flex items-center gap-3 pb-1 text-[clamp(9px,.7vw,12px)] uppercase tracking-[0.25em] text-white/75">
                          <span className="block h-px w-6 bg-white/40" />
                          {items.length} {items.length === 1 ? 'Project' : 'Projects'}
                        </span>
                      </div>
                    </button>
                  </div>
                )
              })}
            </div>

            <button
              onClick={() => gotoPanel(1)}
              className="group absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1 lg:bottom-6"
            >
              <span className="text-[9px] uppercase tracking-[0.3em] text-white/60 transition-colors group-hover:text-white">
                Scroll to contact us
              </span>
              <span className="animate-bounce text-xs text-white/60 group-hover:text-accent">↓</span>
            </button>
          </div>

          {/* ---------- PANEL 1 : CONTACT (centered) ---------- */}
          <div className="relative flex h-1/3 flex-col">
            <button
              onClick={() => gotoPanel(0)}
              className="group absolute left-6 top-6 z-20 flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-white/60 transition-colors hover:text-white lg:left-12 lg:top-10"
            >
              <span className="transition-transform duration-500 group-hover:-translate-y-1">↑</span> Projects
            </button>
            <div className="absolute right-6 top-6 z-20 lg:right-12 lg:top-9">
              <CloseBtn onClick={closeHub} />
            </div>

            <div data-scroll className="thin-scroll relative flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-6 pb-16 pt-20 lg:px-12 lg:pb-20 lg:pt-14">
              {/* Heading + form ek group, window ke beech me */}
              <div className="my-auto flex flex-col gap-8 lg:gap-10">
                <div {...rise(on1, 0, 'text-center')}>
                  <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-accent">Contact Us</p>
                  <h2 className="mt-3 font-display text-[clamp(1.9rem,3vw,3.4rem)] leading-[1.05] text-white">
                    Let&apos;s talk about your project
                  </h2>
                </div>

                <div className="grid gap-6 lg:grid-cols-[1fr_1.5fr_1fr] lg:items-center lg:gap-8">
                  {/* LEFT : contact details + about */}
                  <div {...rise(on1, 2, 'order-2 flex flex-col gap-7 lg:order-1')}>
                    <div className="space-y-3">
                      {CONTACTS.map((c) => (
                        <a
                          key={c.label}
                          href={c.href}
                          className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-4 transition-all duration-500 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.1]"
                        >
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/80 transition-all duration-500 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                            <Icon type={c.type} />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-[9px] uppercase tracking-[0.25em] text-white/45">{c.label}</span>
                            <span className="mt-1 block break-all text-[13px] text-white">{c.value}</span>
                          </span>
                        </a>
                      ))}
                    </div>

                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-accent">About us</p>
                      <p className="mt-3 text-[11px] leading-[1.8] text-white/60 lg:text-xs">{ABOUT_TEXT}</p>
                    </div>
                  </div>

                  {/* CENTER : glass form */}
                  <div {...rise(on1, 1, 'order-1 lg:order-2')}>
                    <div
                      onMouseMove={spot}
                      className="group relative overflow-hidden rounded-[1.75rem] border border-white/15 bg-white/[0.07] p-6 shadow-[0_20px_80px_rgba(0,0,0,.45)] backdrop-blur-md lg:p-8"
                    >
                      <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 [background:radial-gradient(420px_circle_at_var(--x,50%)_var(--y,0%),rgba(255,255,255,.09),transparent_60%)]" />
                      <span className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                      <div className="relative">
                        <ContactForm />
                      </div>
                    </div>
                  </div>

                  {/* RIGHT : trust lines */}
                  <div {...rise(on1, 3, 'order-3 flex flex-col justify-center')}>
                    <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-accent">Why clients trust us</p>
                    <ul className="mt-5 space-y-5">
                      {TRUST.map((t) => (
                        <li key={t.title} className="group flex gap-4">
                          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/20 text-[10px] text-white/70 transition-all duration-500 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                            ✓
                          </span>
                          <span>
                            <span className="block text-[13px] text-white transition-transform duration-500 group-hover:translate-x-1">{t.title}</span>
                            <span className="mt-1 block text-[11px] leading-relaxed text-white/55">{t.text}</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => gotoPanel(2)}
              className="group absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1 lg:bottom-6"
            >
              <span className="text-[clamp(9px,.7vw,13px)] uppercase tracking-[0.3em] text-white/60 transition-colors group-hover:text-white">
                Scroll to footer
              </span>
              <span className="animate-bounce text-xs text-white/60 group-hover:text-accent">↓</span>
            </button>
          </div>

          {/* ---------- PANEL 2 : FOOTER ---------- */}
          <div className="relative flex h-1/3 flex-col">
            <div className="relative flex items-center justify-between gap-6 px-6 pt-6 lg:px-12 lg:pt-9">
              <button
                onClick={() => gotoPanel(1)}
                className="group flex items-center gap-2 text-[clamp(10px,.75vw,14px)] uppercase tracking-[0.25em] text-white/60 transition-colors hover:text-white"
              >
                <span className="transition-transform duration-500 group-hover:-translate-y-1">↑</span> Contact
              </button>
              <CloseBtn onClick={closeHub} />
            </div>

            <div data-scroll className="thin-scroll relative flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-6 lg:px-12">
              <div className="my-auto flex flex-col gap-10 py-8 lg:gap-[5vh]">
                {/* Big call to action */}
                <div {...rise(on2, 0, 'flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end')}>
                  <h2 className="font-display text-[clamp(2rem,min(4.6vw,8vh),6rem)] font-medium leading-[1.05] text-white">
                    Have an idea?<br />Let&apos;s build it together.
                  </h2>
                  <button
                    onClick={() => gotoPanel(1)}
                    className="group relative inline-flex w-fit shrink-0 items-center gap-3 overflow-hidden border border-white/30 px-[clamp(1.75rem,2vw,3rem)] py-[clamp(.8rem,1vw,1.4rem)] text-[clamp(10px,.8vw,15px)] font-medium uppercase tracking-[0.25em] text-white transition-colors duration-500 hover:border-white"
                  >
                    <span className={`absolute inset-0 translate-y-full bg-white transition-transform duration-500 ${EASE} group-hover:translate-y-0`} />
                    <span className="relative transition-colors duration-500 group-hover:text-black">Start a Project</span>
                    <span className="relative transition-all duration-500 group-hover:translate-x-1 group-hover:text-black">→</span>
                  </button>
                </div>

                {/* Columns */}
                <div className="grid gap-10 border-t border-white/10 pt-[clamp(1.5rem,4vh,3rem)] md:grid-cols-[1.5fr_1fr_1.3fr] lg:gap-[4vw]">
                  {/* Brand */}
                  <div {...rise(on2, 1)}>
                    <div className="flex items-center gap-3">
                      <img src={logo} alt="" className="h-[clamp(2rem,2.2vw,3.2rem)] w-[clamp(2rem,2.2vw,3.2rem)] object-contain" />
                      <span className="font-display text-[clamp(1.25rem,1.7vw,2.6rem)] font-semibold uppercase tracking-[0.16em] text-white">Fusion Dev Studio</span>
                    </div>
                    <p className="mt-5 max-w-[28em] text-[clamp(13px,1vw,20px)] leading-[1.8] text-white/60">{FOOTER_TAGLINE}</p>
                  </div>

                  {/* Quick links */}
                  <div {...rise(on2, 2)}>
                    <p className="text-[clamp(10px,.75vw,14px)] font-medium uppercase tracking-[0.3em] text-accent">Quick links</p>
                    <ul className="mt-5 space-y-3 lg:space-y-4">
                      {NAV.map((item) => (
                        <li key={item.label}>
                          <button
                            onClick={() => goNav(item)}
                            className="group relative flex items-center gap-2 text-[clamp(14px,1.1vw,22px)] text-white/70 transition-all duration-500 hover:translate-x-1.5 hover:text-white"
                          >
                            <span className="block h-px w-0 bg-accent transition-all duration-500 group-hover:w-4" />
                            {item.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Contact */}
                  <div {...rise(on2, 3)}>
                    <p className="text-[clamp(10px,.75vw,14px)] font-medium uppercase tracking-[0.3em] text-accent">Get in touch</p>
                    <ul className="mt-5 space-y-3 lg:space-y-4">
                      {CONTACTS.map((c) => (
                        <li key={c.label}>
                          <a
                            href={c.href}
                            className="group flex items-center gap-3 text-[clamp(14px,1.1vw,22px)] text-white/70 transition-all duration-500 hover:translate-x-1.5 hover:text-white"
                          >
                            <span className="text-white/40 transition-colors duration-500 group-hover:text-accent">
                              <Icon type={c.type} />
                            </span>
                            <span className="break-all">{c.value}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative flex flex-col items-center justify-between gap-3 border-t border-white/10 px-6 py-5 text-[clamp(10px,.75vw,14px)] uppercase tracking-[0.2em] text-white/45 sm:flex-row lg:px-12">
              <span>© {YEAR} Fusion Dev Studio. All rights reserved.</span>
              <button
                onClick={() => goStage(0)}
                className="group flex items-center gap-2 transition-colors duration-500 hover:text-white"
              >
                Back to top
                <span className="transition-transform duration-500 group-hover:-translate-y-1">↑</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= WINDOW 2 : PROJECTS OF ONE CATEGORY ================= */}
      <div
        onClick={closeProj}
        className={`fixed inset-0 z-[47] bg-black/25 transition-opacity duration-700 ${proj ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      />
      <div
        role="dialog"
        aria-label={`${current.title} projects`}
        aria-hidden={!proj}
        className={`fixed inset-x-3 bottom-3 top-[104px] z-[48] flex flex-col overflow-hidden rounded-[2rem] border border-white/15 bg-[#0d0f16]/55 shadow-[0_30px_120px_rgba(0,0,0,.65)] backdrop-blur-xl transition-all duration-700 ${EASE} lg:inset-x-[9vw] lg:bottom-[6vh] lg:top-[128px] ${
          proj ? 'translate-y-0 scale-100 opacity-100' : 'pointer-events-none translate-y-16 scale-[.96] opacity-0'
        }`}
      >
        <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-gradient-to-b from-white/[0.07] to-transparent" />

        <div className="relative flex items-start justify-between gap-6 px-6 pt-6 lg:px-10 lg:pt-9">
          <div>
            <button
              onClick={closeProj}
              className="group mb-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-white/60 transition-colors hover:text-white"
            >
              <span className="transition-transform duration-500 group-hover:-translate-x-1">←</span> Back
            </button>
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-accent">
              {current.number} · {current.tags}
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.9rem,3vw,3.4rem)] leading-[1.06] text-white">{current.title}</h2>
          </div>
          <CloseBtn onClick={closeHub} />
        </div>

        <div data-scroll className="thin-scroll relative mt-6 min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 pb-8 lg:mt-8 lg:px-10 lg:pb-12">
          {list.length === 0 ? (
            <p className="py-20 text-center text-sm text-white/50">Projects coming soon.</p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 lg:gap-6">
              {list.map((p, i) => {
                const linkProps = p.link ? { href: p.link, target: '_blank', rel: 'noreferrer' } : {}
                const Tag = p.link ? 'a' : 'div'
                return (
                  <div
                    key={`${current.id}-${p.title}`}
                    className={`transition-all duration-700 ${EASE} ${proj ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                    style={{ transitionDelay: proj ? `${300 + i * 90}ms` : '0ms' }}
                  >
                    <Tag
                      {...linkProps}
                      className={`group block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] transition-all duration-500 ${EASE} hover:-translate-y-1.5 hover:border-white/30 hover:bg-white/[0.09] hover:shadow-[0_20px_60px_rgba(0,0,0,.45)]`}
                    >
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Cover src={p.image} alt={p.title} label={p.title} />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0d0f16]/70 to-transparent" />
                      </div>

                      <div className="p-5 lg:p-6">
                        <h3 className="font-display text-[clamp(1.4rem,1.8vw,2rem)] leading-tight text-white">{p.title}</h3>
                        <p className="mt-2 text-[11px] leading-relaxed text-white/60">{p.description}</p>

                        <div className="mt-4 flex flex-wrap gap-2">
                          {p.tags?.map((t) => (
                            <span key={t} className="rounded-full border border-white/15 px-2.5 py-1 text-[9px] uppercase tracking-[0.15em] text-white/70">
                              {t}
                            </span>
                          ))}
                        </div>

                        {p.link && (
                          <div className="mt-5 flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-white/80 transition-colors group-hover:text-accent">
                            View project
                            <span className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-1">↗</span>
                          </div>
                        )}
                      </div>
                    </Tag>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </>
  )
}