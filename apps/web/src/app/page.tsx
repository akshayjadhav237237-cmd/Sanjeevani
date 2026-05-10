'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import {
  Heart, AlertCircle, Menu, X, ChevronRight, Star, Phone,
  MapPin, Clock, Bed, Brain, Ambulance, Pill, FileText, Bell,
  Shield, Navigation, Search, Activity, ArrowRight, Check,
  Hospital, Zap, Users, Award, Play, MoveRight
} from 'lucide-react'

/* ── Animated counter ── */
function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [displayed, setDisplayed] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting && !started) setStarted(true) }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    let frame = 0
    const total = 60
    const timer = setInterval(() => {
      frame++
      setDisplayed(Math.round((frame / total) * value))
      if (frame >= total) clearInterval(timer)
    }, 20)
    return () => clearInterval(timer)
  }, [started, value])

  return <span ref={ref}>{displayed.toLocaleString()}{suffix}</span>
}

/* ── Navbar ── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      transition: 'all 0.3s ease',
      background: scrolled ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.08)',
      backdropFilter: 'blur(20px)',
      borderBottom: scrolled ? '1px solid #E8EFF7' : '1px solid rgba(255,255,255,0.12)',
      boxShadow: scrolled ? '0 2px 20px rgba(10,61,107,0.1)' : 'none',
    }}>
      <div className="container-xl" style={{ display: 'flex', alignItems: 'center', height: '70px', gap: '32px' }}>
        {/* Logo */}
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', flexShrink: 0 }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '10px',
            background: 'linear-gradient(135deg, #0A3D6B, #1976D2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Heart size={18} color="white" fill="white" />
          </div>
          <span style={{
            fontFamily: 'var(--font-jakarta, sans-serif)',
            fontWeight: 800, fontSize: '20px',
            color: scrolled ? '#0A3D6B' : 'white',
          }}>Sanjeevani</span>
        </a>

        {/* Desktop links */}
        <div style={{ display: 'flex', gap: '8px', flex: 1, justifyContent: 'center' }} className="nav-links-desktop">
          {['Hospitals', 'AI Assistant', 'Medicines', 'About'].map(l => (
            <a key={l} href={`/${l.toLowerCase().replace(' ', '-')}`} style={{
              padding: '8px 14px', borderRadius: '8px', fontWeight: 500, fontSize: '14px',
              color: scrolled ? '#4A5568' : 'rgba(255,255,255,0.85)',
              textDecoration: 'none', transition: 'all 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.background = scrolled ? '#F0F7FF' : 'rgba(255,255,255,0.1)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >{l}</a>
          ))}
        </div>

        {/* Right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: 'auto', flexShrink: 0 }}>
          <a href="/auth" style={{
            padding: '8px 18px', borderRadius: '10px', fontWeight: 600, fontSize: '14px',
            border: `1.5px solid ${scrolled ? '#0A3D6B' : 'rgba(255,255,255,0.5)'}`,
            color: scrolled ? '#0A3D6B' : 'white',
            textDecoration: 'none', transition: 'all 0.2s',
          }}>Login</a>
          <a href="/auth?tab=signup" style={{
            padding: '8px 18px', borderRadius: '10px', fontWeight: 600, fontSize: '14px',
            background: '#0A3D6B', color: 'white',
            textDecoration: 'none',
          }}>Sign Up</a>
          <a href="/emergency" style={{
            padding: '8px 16px', borderRadius: '10px', fontWeight: 700, fontSize: '13px',
            background: 'linear-gradient(135deg, #D32F2F, #FF5252)',
            color: 'white', textDecoration: 'none',
            boxShadow: '0 4px 14px rgba(211,47,47,0.35)',
            display: 'flex', alignItems: 'center', gap: '6px',
            position: 'relative', overflow: 'hidden',
          }}>
            <span style={{ animation: 'pulse 2s infinite', display: 'flex' }}><AlertCircle size={14} /></span>
            SOS
          </a>
          {/* Mobile hamburger */}
          <button onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'none', color: scrolled ? '#0A3D6B' : 'white' }}
            className="mobile-menu-btn">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            style={{ background: 'white', borderTop: '1px solid #E8EFF7', overflow: 'hidden' }}>
            <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {['Hospitals', 'AI Assistant', 'Medicines', 'Dashboard', 'Records'].map(l => (
                <a key={l} href={`/${l.toLowerCase().replace(' ', '-')}`}
                  style={{ padding: '12px 16px', borderRadius: '10px', color: '#4A5568', textDecoration: 'none', fontWeight: 500 }}>
                  {l}
                </a>
              ))}
              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <a href="/auth" className="btn-outline" style={{ flex: 1, justifyContent: 'center', fontSize: '14px' }}>Login</a>
                <a href="/emergency" className="btn-emergency" style={{ flex: 1, justifyContent: 'center', fontSize: '14px' }}>🚨 SOS</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

/* ── ECG Heartbeat SVG ── */
function EcgLine() {
  return (
    <div style={{ position: 'absolute', bottom: '60px', left: 0, right: 0, overflow: 'hidden', opacity: 0.15, pointerEvents: 'none' }}>
      <motion.svg viewBox="0 0 1440 80" style={{ width: '200%', height: '80px' }}
        animate={{ x: [0, '-50%'] }} transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}>
        <path
          d="M0,40 L100,40 L130,40 L140,5 L155,75 L170,40 L200,40 L300,40 L330,40 L340,5 L355,75 L370,40 L400,40 L500,40 L530,40 L540,5 L555,75 L570,40 L600,40 L700,40 L730,40 L740,5 L755,75 L770,40 L800,40 L900,40 L930,40 L940,5 L955,75 L970,40 L1000,40 L1100,40 L1130,40 L1140,5 L1155,75 L1170,40 L1200,40 L1300,40 L1330,40 L1340,5 L1355,75 L1370,40 L1440,40"
          fill="none" stroke="white" strokeWidth="2.5"
        />
      </motion.svg>
    </div>
  )
}

/* ── Floating Dashboard Card ── */
function HeroDashCard() {
  return (
    <motion.div
      animate={{ y: [0, -12, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        width: '100%', maxWidth: '420px',
        perspective: '1000px',
      }}>
      <div style={{
        background: 'rgba(255,255,255,0.10)',
        backdropFilter: 'blur(24px)',
        border: '1px solid rgba(255,255,255,0.22)',
        borderRadius: '24px',
        padding: '24px',
        transform: 'rotateY(-4deg) rotateX(4deg)',
        boxShadow: '0 40px 80px rgba(0,0,0,0.3)',
      }}>
        {/* header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Activity size={16} color="white" />
          </div>
          <div>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Live Dashboard</p>
            <p style={{ color: 'white', fontSize: '13px', fontWeight: 700 }}>Apollo Hospital • ICU</p>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#00C853', animation: 'pulse 2s infinite', display: 'block' }} />
            <span style={{ color: '#00C853', fontSize: '11px', fontWeight: 600 }}>LIVE</span>
          </div>
        </div>

        {/* Bed bars */}
        {[
          { label: 'ICU Beds', avail: 5, total: 20, color: '#00C853' },
          { label: 'Emergency', avail: 3, total: 15, color: '#F59E0B' },
          { label: 'General Ward', avail: 22, total: 80, color: '#1976D2' },
        ].map(b => (
          <div key={b.label} style={{ marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '12px' }}>{b.label}</span>
              <span style={{ color: 'white', fontSize: '12px', fontWeight: 700 }}>{b.avail}/{b.total}</span>
            </div>
            <div style={{ height: '5px', background: 'rgba(255,255,255,0.15)', borderRadius: '99px' }}>
              <div style={{ height: '100%', borderRadius: '99px', background: b.color, width: `${(b.avail / b.total) * 100}%` }} />
            </div>
          </div>
        ))}

        {/* Ambulance ETA */}
        <div style={{
          background: 'rgba(211,47,47,0.2)', border: '1px solid rgba(211,47,47,0.35)',
          borderRadius: '12px', padding: '12px 14px',
          display: 'flex', alignItems: 'center', gap: '10px', marginTop: '8px'
        }}>
          <Ambulance size={18} color="#FF5252" />
          <div>
            <p style={{ color: 'white', fontSize: '12px', fontWeight: 600 }}>Ambulance dispatched</p>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px' }}>ETA: 8 minutes</p>
          </div>
          <span style={{ marginLeft: 'auto', background: '#FF5252', color: 'white', fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px' }}>LIVE</span>
        </div>

        {/* AI chat snippet */}
        <div style={{ marginTop: '14px', background: 'rgba(255,255,255,0.07)', borderRadius: '12px', padding: '12px' }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
            <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'linear-gradient(135deg, #0A3D6B, #1976D2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Brain size={12} color="white" />
            </div>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px', lineHeight: '1.5' }}>Based on symptoms, I recommend Apollo Hospital — nearest with ICU available. <span style={{ color: '#00C853' }}>Book now →</span></p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ── Features data ── */
const features = [
  { icon: Bed, color: '#1976D2', bg: '#E3F2FD', title: 'Real-Time Bed Booking', desc: 'Find and book ICU, emergency, or general beds at any hospital instantly with live availability.' },
  { icon: Brain, color: '#7B1FA2', bg: '#F3E5F5', title: 'AI Health Assistant', desc: 'Symptom checker, drug interactions, hospital recommendations — all powered by GPT-4o.' },
  { icon: Ambulance, color: '#D32F2F', bg: '#FFEBEE', title: 'SOS Emergency', desc: 'One tap dispatches the nearest ambulance and pre-alerts the hospital with your profile.' },
  { icon: Pill, color: '#00897B', bg: '#E0F2F1', title: 'Medicine Ordering', desc: 'Order medicines with prescription upload. Generic alternatives shown with price comparison.' },
  { icon: FileText, color: '#00838F', bg: '#E0F7FA', title: 'Digital Health Records', desc: 'All your reports, prescriptions, and medical history — secure, accessible, shareable.' },
  { icon: Bell, color: '#F59E0B', bg: '#FFF8E1', title: 'Smart Reminders', desc: 'Medication alarms, appointment nudges, insurance renewal alerts — never miss a thing.' },
]

/* ── Testimonials ── */
const testimonials = [
  { name: 'Priya Sharma', city: 'New Delhi', stars: 5, quote: 'Sanjeevani dispatched an ambulance in 4 minutes when my father had a cardiac event. The hospital already had his profile. He\'s alive because of this app.', avatar: '👩' },
  { name: 'Rahul Mehta', city: 'Mumbai', stars: 5, quote: 'Found ICU bed at Apollo at 2am when every other hospital was full. The AI assistant guided me through the entire emergency. Incredible platform.', avatar: '👨' },
  { name: 'Dr. Sunita Rao', city: 'Bengaluru', stars: 5, quote: 'As a doctor, receiving a patient\'s complete health profile before they arrive has transformed how I prepare. Sanjeevani is the future of emergency care.', avatar: '👩‍⚕️' },
  { name: 'Ankit Verma', city: 'Chennai', stars: 5, quote: 'PM-JAY auto-applied at checkout. I paid only ₹200 for treatment that cost ₹45,000. This app literally saved my family from debt.', avatar: '👨‍💼' },
]

export default function LandingPage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(p => (p + 1) % testimonials.length), 4000)
    return () => clearInterval(t)
  }, [])

  return (
    <div style={{ background: '#F7FAFD', overflowX: 'hidden' }}>
      <Navbar />

      {/* ── HERO ── */}
      <section style={{
        minHeight: '100vh', background: 'linear-gradient(135deg, #0A3D6B 0%, #1565C0 55%, #1B5E20 100%)',
        display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', paddingTop: '70px',
      }}>
        {/* Background pattern */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.06 }}>
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{
              position: 'absolute', borderRadius: '50%',
              border: '1px solid white',
              width: 200 + i * 160, height: 200 + i * 160,
              top: '50%', left: '60%',
              transform: 'translate(-50%, -50%)',
            }} />
          ))}
        </div>

        <EcgLine />

        <div className="container-xl" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center', padding: '80px 24px' }}>
          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease: 'easeOut' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '999px', padding: '6px 16px', marginBottom: '28px' }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#00C853', animation: 'pulse 2s infinite', display: 'block' }} />
              <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '13px', fontWeight: 600 }}>AI-Powered Healthcare Platform</span>
            </div>

            <h1 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 800, lineHeight: 1.12, color: 'white', marginBottom: '24px' }}>
              Emergency Care,<br />
              <span style={{ background: 'linear-gradient(135deg, #93C5FD, #86EFAC)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                One Tap Away.
              </span>
            </h1>

            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '18px', lineHeight: 1.65, maxWidth: '500px', marginBottom: '36px' }}>
              Sanjeevani connects you to real-time hospital beds, ambulances, AI health insights, and digital records — instantly, when it matters most.
            </p>

            {/* CTA row */}
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '48px' }}>
              <a href="/search" className="btn-primary" style={{ background: 'white', color: '#0A3D6B', fontSize: '15px', padding: '14px 28px' }}>
                <Hospital size={17} /> Find Hospitals
              </a>
              <a href="/emergency" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '14px 28px', borderRadius: '12px', fontWeight: 700, fontSize: '15px',
                background: 'linear-gradient(135deg, #D32F2F, #FF5252)',
                color: 'white', textDecoration: 'none',
                boxShadow: '0 8px 24px rgba(211,47,47,0.45)',
                position: 'relative', overflow: 'hidden',
              }}>
                <AlertCircle size={17} /> Emergency SOS
              </a>
              <a href="/ai-assistant" className="btn-outline-white" style={{ fontSize: '15px', padding: '14px 28px' }}>
                <Brain size={17} /> Try AI Assistant
              </a>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
              {[
                { n: 500, s: '+', label: 'Hospitals' },
                { n: 50000, s: '+', label: 'Patients' },
                { n: 2, s: ' min', label: 'Avg Response' },
                { n: 98, s: '%', label: 'Satisfaction' },
              ].map(stat => (
                <div key={stat.label}>
                  <p style={{ color: 'white', fontSize: '28px', fontWeight: 800, fontFamily: 'var(--font-jakarta, sans-serif)' }}>
                    <AnimatedNumber value={stat.n} suffix={stat.s} />
                  </p>
                  <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '13px', fontWeight: 500 }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — floating card */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            style={{ display: 'flex', justifyContent: 'center' }}>
            <HeroDashCard />
          </motion.div>
        </div>
      </section>

      {/* ── EMERGENCY BANNER ── */}
      <section style={{ background: 'linear-gradient(135deg, #B71C1C 0%, #D32F2F 50%, #FF5252 100%)', padding: '56px 24px' }}>
        <div className="container-xl" style={{ display: 'flex', alignItems: 'center', gap: '48px', flexWrap: 'wrap' }}>
          <div style={{ fontSize: '64px', flexShrink: 0 }}>🚑</div>
          <div style={{ flex: 1, minWidth: '240px' }}>
            <h2 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', color: 'white', fontSize: '28px', fontWeight: 800, marginBottom: '8px' }}>Medical Emergency? Don't Panic.</h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '17px', lineHeight: 1.6 }}>One tap sends your location and dispatches the nearest ambulance. Your medical profile is automatically shared with the hospital.</p>
          </div>
          <a href="/emergency" style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px', flexShrink: 0,
            padding: '16px 32px', borderRadius: '14px', fontWeight: 800, fontSize: '16px',
            background: 'white', color: '#D32F2F', textDecoration: 'none',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            fontFamily: 'var(--font-jakarta, sans-serif)',
          }}>
            <AlertCircle size={20} /> Activate Emergency SOS
          </a>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="section-pad" style={{ background: 'white' }}>
        <div className="container-xl">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div className="badge badge-blue" style={{ marginBottom: '16px', display: 'inline-flex' }}>All-in-One Platform</div>
            <h2 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: 800, color: '#0A3D6B', marginBottom: '16px' }}>
              Everything You Need,<br />In One Platform
            </h2>
            <p style={{ color: '#4A5568', fontSize: '17px', maxWidth: '520px', margin: '0 auto', lineHeight: 1.6 }}>
              From emergency response to routine healthcare — Sanjeevani handles every step of your health journey.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {features.map((f, i) => (
              <motion.div key={f.title} className="card"
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }} viewport={{ once: true }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: f.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
                  <f.icon size={24} color={f.color} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: '18px', fontWeight: 700, color: '#1A2332', marginBottom: '10px' }}>{f.title}</h3>
                <p style={{ color: '#4A5568', fontSize: '14px', lineHeight: 1.65, marginBottom: '16px' }}>{f.desc}</p>
                <a href="#" style={{ color: f.color, fontWeight: 600, fontSize: '14px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  Learn more <ChevronRight size={14} />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="section-pad" style={{ background: 'var(--surface)' }}>
        <div className="container-xl">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div className="badge badge-green" style={{ marginBottom: '16px', display: 'inline-flex' }}>Simple Steps</div>
            <h2 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: 800, color: '#0A3D6B' }}>How Sanjeevani Works</h2>
          </div>

          <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
            {/* Dashed connector */}
            <div style={{ position: 'absolute', top: '48px', left: '20%', right: '20%', height: '2px', background: 'repeating-linear-gradient(90deg, #1976D2 0, #1976D2 8px, transparent 8px, transparent 16px)', zIndex: 0 }} />

            {[
              { n: '01', icon: Users, color: '#1976D2', title: 'Create Your Health Profile', desc: 'AI builds your complete health identity — blood group, medications, allergies, insurance — in 5 minutes.' },
              { n: '02', icon: Search, color: '#00C853', title: 'Search & Book Instantly', desc: 'Find hospitals, beds, doctors, and medicines in seconds with real-time availability data.' },
              { n: '03', icon: Heart, color: '#D32F2F', title: 'Get Treated Faster', desc: 'Doctors receive your complete profile before you arrive. Treatment starts the second you walk in.' },
            ].map((step, i) => (
              <motion.div key={step.n} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.15 }} viewport={{ once: true }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative', zIndex: 1 }}>
                <div style={{
                  width: '96px', height: '96px', borderRadius: '50%', background: 'white',
                  border: `3px solid ${step.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: `0 8px 32px rgba(0,0,0,0.08)`, marginBottom: '24px', position: 'relative',
                }}>
                  <step.icon size={36} color={step.color} />
                  <span style={{
                    position: 'absolute', top: '-12px', right: '-12px',
                    background: step.color, color: 'white', borderRadius: '8px',
                    padding: '3px 9px', fontSize: '12px', fontWeight: 800, fontFamily: 'var(--font-jakarta, sans-serif)'
                  }}>{step.n}</span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: '18px', fontWeight: 700, color: '#1A2332', marginBottom: '10px' }}>{step.title}</h3>
                <p style={{ color: '#4A5568', fontSize: '14px', lineHeight: 1.65 }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI FEATURES ── */}
      <section className="section-pad" style={{ background: 'linear-gradient(135deg, #0A3D6B 0%, #1565C0 100%)' }}>
        <div className="container-xl" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
          {/* Chat mockup */}
          <motion.div initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <div style={{ background: 'rgba(255,255,255,0.09)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '24px', padding: '24px', maxWidth: '400px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #1976D2, #00C853)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Brain size={18} color="white" />
                </div>
                <div>
                  <p style={{ color: 'white', fontWeight: 700, fontSize: '14px' }}>Sanjeevani AI</p>
                  <p style={{ color: '#00C853', fontSize: '11px', fontWeight: 600 }}>● Online</p>
                </div>
              </div>

              {[
                { role: 'user', msg: 'I have chest pain and shortness of breath' },
                { role: 'ai', msg: '⚠️ These symptoms may indicate a cardiac event. I recommend immediate medical attention. Shall I find the nearest hospital with cardiology available?' },
                { role: 'user', msg: 'Yes, please find it' },
                { role: 'ai', msg: '✓ Apollo Hospital — 2.4km, ICU: 5 beds available, ETA 8 min. Shall I book and alert them with your profile?' },
              ].map((m, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2 }} viewport={{ once: true }}
                  style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start', marginBottom: '12px' }}>
                  <div style={{
                    maxWidth: '80%', padding: '10px 14px', borderRadius: m.role === 'user' ? '16px 4px 16px 16px' : '4px 16px 16px 16px',
                    background: m.role === 'user' ? 'rgba(25,118,210,0.8)' : 'rgba(255,255,255,0.12)',
                    color: 'white', fontSize: '13px', lineHeight: 1.5,
                    backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.12)',
                  }}>{m.msg}</div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              <div style={{ display: 'flex', gap: '5px', padding: '8px 14px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px 16px 16px 16px', width: 'fit-content', marginTop: '4px' }}>
                {[0, 1, 2].map(i => (
                  <span key={i} className="typing-dot" style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'rgba(255,255,255,0.6)', display: 'block', animationDelay: `${i * 0.2}s` }} />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right text */}
          <motion.div initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <div className="badge" style={{ background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.9)', marginBottom: '24px', display: 'inline-flex' }}>Powered by GPT-4o</div>
            <h2 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: 'clamp(28px, 4vw, 38px)', fontWeight: 800, color: 'white', marginBottom: '24px', lineHeight: 1.25 }}>
              Your AI<br />Health Companion
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '36px' }}>
              {['Symptom Checker', 'Cost Estimator', 'Hospital Stay Predictor', 'Drug Interaction Detector', 'Smart Hospital Recommender'].map(f => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(0,200,83,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Check size={13} color="#00C853" />
                  </div>
                  <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '16px' }}>{f}</span>
                </div>
              ))}
            </div>
            <a href="/ai-assistant" className="btn-primary" style={{ background: 'white', color: '#0A3D6B', fontSize: '15px', padding: '14px 28px' }}>
              Try AI Assistant Free <ArrowRight size={16} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── HOSPITAL SEARCH PREVIEW ── */}
      <section className="section-pad" style={{ background: 'white' }}>
        <div className="container-xl">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: 800, color: '#0A3D6B', marginBottom: '12px' }}>
              Find the Right Hospital, Fast
            </h2>
            <p style={{ color: '#4A5568', fontSize: '16px' }}>Search by location, specialty, or symptoms — with real-time bed data.</p>
          </div>

          {/* Search bar */}
          <div style={{ background: '#F0F7FF', borderRadius: '16px', padding: '20px 24px', display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '40px', boxShadow: 'var(--shadow-card)' }}>
            <Search size={20} color="#1976D2" style={{ flexShrink: 0 }} />
            <input className="input-field" style={{ background: 'transparent', flex: 1 }} placeholder="Search hospitals, symptoms, or specialties..." />
            <button style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={16} color="#1976D2" /></button>
            <a href="/search" className="btn-primary" style={{ flexShrink: 0, fontSize: '14px', padding: '10px 22px' }}>Search</a>
          </div>

          {/* Sample cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '40px' }}>
            {[
              { name: 'Apollo Hospital', dist: '2.4 km', icu: 5, rating: 4.8, specialty: ['Cardiac', 'Neuro'], cost: '₹8,000–₹25,000/day', status: 'open' },
              { name: 'AIIMS Delhi', dist: '3.1 km', icu: 12, rating: 4.9, specialty: ['Trauma', 'Oncology'], cost: '₹2,000–₹8,000/day', status: 'open' },
              { name: 'Fortis Memorial', dist: '4.8 km', icu: 1, rating: 4.5, specialty: ['Orthopedic'], cost: '₹10,000–₹30,000/day', status: 'limited' },
            ].map((h, i) => (
              <motion.div key={h.name} className="card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                style={{ padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <h4 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontWeight: 700, fontSize: '16px', color: '#1A2332' }}>{h.name}</h4>
                  <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '999px', background: h.status === 'open' ? '#E8F5E9' : '#FFF8E1', color: h.status === 'open' ? '#1B5E20' : '#B45309' }}>
                    ● {h.status === 'open' ? 'Open' : 'Limited'}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '12px', color: '#4A5568', fontSize: '13px', marginBottom: '12px' }}>
                  <span><MapPin size={12} style={{ display: 'inline', marginRight: '3px' }} />{h.dist}</span>
                  <span><Star size={12} style={{ display: 'inline', marginRight: '3px' }} fill="#F59E0B" color="#F59E0B" />{h.rating}</span>
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '12px' }}>
                  {h.specialty.map(s => <span key={s} className="badge badge-blue" style={{ fontSize: '11px' }}>{s}</span>)}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <span className="bed-dot-available" />
                  <span style={{ fontSize: '13px', color: '#1B5E20', fontWeight: 600 }}>{h.icu} ICU beds available</span>
                </div>
                <p style={{ fontSize: '12px', color: '#4A5568', marginBottom: '16px' }}>{h.cost}</p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <a href={`/hospitals/1`} className="btn-outline" style={{ flex: 1, justifyContent: 'center', fontSize: '13px', padding: '9px 12px' }}>View Details</a>
                  <a href={`/booking`} className="btn-primary" style={{ flex: 1, justifyContent: 'center', fontSize: '13px', padding: '9px 12px' }}>Book Bed</a>
                </div>
              </motion.div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <a href="/search" style={{ color: '#1976D2', fontWeight: 700, fontSize: '15px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              View All Hospitals <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section-pad" style={{ background: '#F0F7FF' }}>
        <div className="container-xl">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: 800, color: '#0A3D6B', marginBottom: '12px' }}>
              Lives Changed by Sanjeevani
            </h2>
          </div>

          <div style={{ position: 'relative', maxWidth: '700px', margin: '0 auto' }}>
            <AnimatePresence mode="wait">
              <motion.div key={activeTestimonial}
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }}
                className="card" style={{ textAlign: 'center', padding: '40px 48px' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>{testimonials[activeTestimonial].avatar}</div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '20px' }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} color="#F59E0B" fill="#F59E0B" />)}
                </div>
                <p style={{ color: '#1A2332', fontSize: '17px', lineHeight: 1.7, marginBottom: '24px', fontStyle: 'italic' }}>
                  "{testimonials[activeTestimonial].quote}"
                </p>
                <p style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontWeight: 700, color: '#0A3D6B', fontSize: '16px' }}>{testimonials[activeTestimonial].name}</p>
                <p style={{ color: '#4A5568', fontSize: '13px' }}>{testimonials[activeTestimonial].city}</p>
              </motion.div>
            </AnimatePresence>

            {/* Dots */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '24px' }}>
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setActiveTestimonial(i)} style={{
                  width: i === activeTestimonial ? '24px' : '8px', height: '8px', borderRadius: '999px',
                  background: i === activeTestimonial ? '#1976D2' : '#CBD5E1',
                  border: 'none', cursor: 'pointer', transition: 'all 0.3s ease',
                }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS DARK SECTION ── */}
      <section className="section-pad" style={{ background: '#0A1628' }}>
        <div className="container-xl">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px', textAlign: 'center' }}>
            {[
              { n: 500, s: '+', label: 'Hospitals Onboarded', icon: Hospital },
              { n: 2, s: ' min', label: 'Avg Emergency Response', icon: Clock },
              { n: 1000000, s: '+', label: 'Health Records Secured', icon: Shield },
              { n: 98, s: '%', label: 'Patient Satisfaction', icon: Star },
            ].map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.12 }} viewport={{ once: true }}>
                <stat.icon size={32} color="#1976D2" style={{ margin: '0 auto 16px' }} />
                <p style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: '42px', fontWeight: 800, color: 'white', marginBottom: '8px' }}>
                  <AnimatedNumber value={stat.n} suffix={stat.s} />
                </p>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#0A1628', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '64px', paddingBottom: '32px' }}>
        <div className="container-xl">
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: '48px', marginBottom: '48px' }}>
            {/* Brand */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #1976D2, #00C853)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Heart size={18} color="white" fill="white" />
                </div>
                <span style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontWeight: 800, fontSize: '18px', color: 'white' }}>Sanjeevani</span>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '14px', lineHeight: 1.7, maxWidth: '260px' }}>
                When Every Second Matters. AI-powered emergency healthcare connecting you to hospitals, ambulances, and doctors — instantly.
              </p>
            </div>

            {/* Links */}
            {[
              { title: 'Platform', links: ['Find Hospitals', 'AI Assistant', 'Order Medicines', 'Health Records'] },
              { title: 'Emergency', links: ['SOS Services', 'Ambulance Track', 'Emergency Contacts', 'First Aid Guide'] },
              { title: 'Company', links: ['About Us', 'Blog', 'Careers', 'Press'] },
              { title: 'Legal', links: ['Privacy Policy', 'Terms of Use', 'Data Security', 'HIPAA Compliance'] },
            ].map(col => (
              <div key={col.title}>
                <p style={{ color: 'white', fontWeight: 700, fontSize: '14px', marginBottom: '16px', fontFamily: 'var(--font-jakarta, sans-serif)' }}>{col.title}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {col.links.map(l => (
                    <a key={l} href="#" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px', textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'white')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}>
                      {l}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '13px' }}>© 2026 Sanjeevani Health Technologies Pvt. Ltd. All rights reserved.</p>
            <div style={{ display: 'flex', gap: '16px' }}>
              {['🐦', '📘', '📸', '💼'].map((icon, i) => (
                <button key={i} style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(255,255,255,0.08)', border: 'none', cursor: 'pointer', fontSize: '14px' }}>
                  {icon}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile responsive inline styles */}
      <style>{`
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          section > div { grid-template-columns: 1fr !important; gap: 40px !important; }
          section:nth-child(1) > div { padding: 48px 20px 40px !important; }
        }
        @media (max-width: 600px) {
          footer > div > div:first-child { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  )
}
