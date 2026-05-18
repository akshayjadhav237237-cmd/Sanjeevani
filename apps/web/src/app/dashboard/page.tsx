'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Home, Hospital, Calendar, FileText, Pill, Brain, Clock,
    AlertCircle, Shield, Settings, Bell, Search, ChevronRight,
    Activity, Heart, Zap, ArrowRight, TrendingUp, TrendingDown,
    Ambulance, MapPin, Star, User, LogOut, Plus, Minus,
    Check, X, Stethoscope
} from 'lucide-react'
import { useAuthStore } from '@/store/useAuthStore'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/context/LanguageContext'

/* ── Health Score Ring ── */
function HealthScoreRing({ score = 0 }: { score?: number }) {
    const [current, setCurrent] = useState(0)
    const radius = 52
    const circ = 2 * Math.PI * radius

    useEffect(() => {
        if (score === 0) return
        let start: number | null = null
        const duration = 1200
        const animate = (ts: number) => {
            if (!start) start = ts
            const progress = Math.min((ts - start) / duration, 1)
            setCurrent(Math.round(progress * score))
            if (progress < 1) requestAnimationFrame(animate)
        }
        const frame = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(frame)
    }, [score])

    const color = current >= 71 ? '#00C853' : current >= 41 ? '#F59E0B' : '#D32F2F'
    const dash = circ - (current / 100) * circ

    return (
        <div style={{ position: 'relative', width: '128px', height: '128px', flexShrink: 0 }}>
            <svg width="128" height="128" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="64" cy="64" r={radius} fill="none" stroke="#E8EFF7" strokeWidth="10" />
                <circle cx="64" cy="64" r={radius} fill="none" stroke={color} strokeWidth="10"
                    strokeDasharray={circ} strokeDashoffset={dash} strokeLinecap="round"
                    style={{ transition: 'stroke-dashoffset 0.03s ease' }}
                />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '26px', fontWeight: 800, color, fontFamily: 'var(--font-jakarta, sans-serif)' }}>{current}</span>
                <span style={{ fontSize: '10px', color: '#4A5568', fontWeight: 600 }}>/ 100</span>
            </div>
        </div>
    )
}


/* ── Sidebar ── */
function Sidebar({ active }: { active: string }) {
    const { user, logout } = useAuthStore()
    const router = useRouter()
    const { t, lang, toggleLang } = useLanguage()
    const navItems = [
        { label: t('dashboard'), icon: Home, href: '/dashboard' },
        { label: t('findHospital'), icon: Hospital, href: '/hospitals' },
        { label: t('myBookings'), icon: Calendar, href: '/booking' },
        { label: t('healthRecords'), icon: FileText, href: '/records' },
        { label: t('medicines'), icon: Pill, href: '/medicines' },
        { label: t('aiAssistant'), icon: Brain, href: '/ai-assistant' },
        { label: t('appointments'), icon: Clock, href: '/appointments' },
        { label: t('emergency'), icon: AlertCircle, href: '/emergency' },
        { label: t('insurance'), icon: Shield, href: '/insurance' },
        { label: t('settings'), icon: Settings, href: '/profile' },
    ]

    const initials = user?.name
        ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
        : '?'

    const score = user?.healthScore || 0
    const scoreColor = score >= 80 ? '#00C853' : score >= 50 ? '#F59E0B' : '#D32F2F'

    const handleLogout = () => { logout(); router.push('/login') }


    return (
        <div style={{
            width: '240px', flexShrink: 0, background: 'white',
            borderRight: '1px solid #E8EFF7', display: 'flex', flexDirection: 'column',
            position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 100, overflow: 'hidden',
        }}>
            {/* Logo */}
            <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid #E8EFF7' }}>
                <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
                    <div style={{ width: '34px', height: '34px', borderRadius: '9px', background: 'linear-gradient(135deg, #0A3D6B, #1976D2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Heart size={16} color="white" fill="white" />
                    </div>
                    <span style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontWeight: 800, fontSize: '18px', color: '#0A3D6B' }}>Sanjeevni</span>
                </a>
            </div>

            {/* Patient info */}
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #E8EFF7' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #0A3D6B, #1976D2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px', fontSize: '18px', fontWeight: 800, color: 'white', fontFamily: 'var(--font-jakarta, sans-serif)' }}>
                    {user?.avatar
                        ? <img src={user.avatar} alt={user.name} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
                        : initials}
                </div>
                <p style={{ fontWeight: 700, fontSize: '14px', color: '#1A2332', fontFamily: 'var(--font-jakarta, sans-serif)' }}>
                    {user?.name || 'Complete Profile'}
                </p>
                <p style={{ fontSize: '12px', color: '#4A5568' }}>
                    {score > 0
                        ? <>Health Score: <span style={{ color: scoreColor, fontWeight: 700 }}>{score}/100</span></>
                        : user?.email || 'Set up your profile'}
                </p>
            </div>

            {/* Nav */}
            <nav style={{ flex: 1, overflowY: 'auto', padding: '12px 12px' }}>
                {navItems.map(item => (
                    <a key={item.label} href={item.href}
                        className={`sidebar-nav-item ${active === item.label ? 'active' : ''}`}>
                        <item.icon size={18} />
                        {item.label}
                    </a>
                ))}
            </nav>

            {/* Logout + SOS bottom */}
            <div style={{ padding: '16px', borderTop: '1px solid #E8EFF7', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', borderRadius: '10px', background: '#FFF5F5', color: '#D32F2F', fontWeight: 600, fontSize: '13px', border: 'none', cursor: 'pointer', width: '100%' }}>
                    <LogOut size={14} /> Sign Out
                </button>
                <a href="/emergency" style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    padding: '12px', borderRadius: '12px',
                    background: 'linear-gradient(135deg, #D32F2F, #FF5252)',
                    color: 'white', fontWeight: 700, fontSize: '14px',
                    textDecoration: 'none', boxShadow: '0 4px 14px rgba(211,47,47,0.35)',
                    fontFamily: 'var(--font-jakarta, sans-serif)',
                }}>
                    <AlertCircle size={16} /> Emergency SOS
                </a>
            </div>
        </div>
    )
}

/* ── Top Bar ── */
function TopBar() {
    const [notifOpen, setNotifOpen] = useState(false)
    const { user } = useAuthStore()
    const initials = user?.name ? user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) : '?'

    return (
        <div style={{ height: '64px', background: 'white', borderBottom: '1px solid #E8EFF7', display: 'flex', alignItems: 'center', gap: '16px', padding: '0 28px', position: 'sticky', top: 0, zIndex: 90 }}>
            <div style={{ flex: 1, maxWidth: '400px', position: 'relative' }}>
                <Search size={16} color="#9CA3AF" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                <input className="input-field" style={{ paddingLeft: '40px', background: '#F5F7FA', height: '40px' }} placeholder="Search hospitals, records, medicines..." />
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
                {/* Notifications */}
                <div style={{ position: 'relative' }}>
                    <button onClick={() => setNotifOpen(!notifOpen)} style={{
                        width: '40px', height: '40px', borderRadius: '10px', background: '#F5F7FA',
                        border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative'
                    }}>
                        <Bell size={18} color="#4A5568" />
                        <span style={{ position: 'absolute', top: '8px', right: '8px', width: '8px', height: '8px', borderRadius: '50%', background: '#D32F2F', border: '2px solid white' }} />
                    </button>
                    <AnimatePresence>
                        {notifOpen && (
                            <motion.div initial={{ opacity: 0, y: 8, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.96 }}
                                className="card" style={{ position: 'absolute', right: 0, top: '48px', width: '320px', padding: '0', overflow: 'hidden', zIndex: 200 }}>
                                <div style={{ padding: '16px 20px', borderBottom: '1px solid #E8EFF7', display: 'flex', justifyContent: 'space-between' }}>
                                    <p style={{ fontWeight: 700, fontSize: '14px', fontFamily: 'var(--font-jakarta, sans-serif)', color: '#1A2332' }}>Notifications</p>
                                    <button style={{ fontSize: '12px', color: '#1976D2', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Mark all read</button>
                                </div>
                                {[
                                    { icon: '💊', msg: 'Take your medicine at scheduled time', time: '2 min ago' },
                                    { icon: '🏥', msg: 'Hospital appointment confirmed', time: '1h ago' },
                                    { icon: '📋', msg: 'Lab report is ready to view', time: '3h ago' },
                                ].map((n, i) => (
                                    <div key={i} style={{ padding: '14px 20px', borderBottom: '1px solid #F5F7FA', display: 'flex', gap: '12px', cursor: 'pointer' }}
                                        onMouseEnter={e => (e.currentTarget.style.background = '#F9FAFB')}
                                        onMouseLeave={e => (e.currentTarget.style.background = 'white')}>
                                        <span style={{ fontSize: '20px' }}>{n.icon}</span>
                                        <div style={{ flex: 1 }}>
                                            <p style={{ fontSize: '13px', color: '#1A2332', fontWeight: 500 }}>{n.msg}</p>
                                            <p style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '2px' }}>{n.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* SOS */}
                <a href="/emergency" style={{
                    padding: '8px 16px', borderRadius: '10px', fontWeight: 700, fontSize: '13px',
                    background: 'linear-gradient(135deg, #D32F2F, #FF5252)', color: 'white',
                    textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px',
                    boxShadow: '0 4px 12px rgba(211,47,47,0.3)',
                }}>
                    <AlertCircle size={14} /> SOS
                </a>

                {/* Avatar with real initials */}
                <a href="/profile" style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #0A3D6B, #1976D2)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', fontSize: '14px', fontWeight: 800, color: 'white', fontFamily: 'var(--font-jakarta, sans-serif)' }}>
                    {initials}
                </a>
            </div>
        </div>
    )
}


export default function DashboardPage() {
    const { user } = useAuthStore()
    const { t } = useLanguage()
    const now = new Date()
    const hour = now.getHours()
    const greeting = hour < 12 ? t('goodMorning') : hour < 17 ? t('goodAfternoon') : t('goodEvening')
    const firstName = user?.name?.split(' ')[0] || 'there'

    // Formula-based health score
    let healthScore = 0
    if (user?.name && user?.dateOfBirth && user?.bloodGroup) healthScore += 30  // profile complete
    if ((user as any)?.appointments?.length > 0) healthScore += 20              // has appointments
    if ((user as any)?.records?.length > 0) healthScore += 20                   // has records
    if (user?.medications && user.medications.length > 0) healthScore += 15     // has medications
    if (user?.dateOfBirth) {
        const age = now.getFullYear() - new Date(user.dateOfBirth).getFullYear()
        if (age < 40) healthScore += 15                                          // age bonus
    }
    // fallback: use stored score if available
    if (healthScore === 0 && user?.healthScore) healthScore = user.healthScore


    // Use user's medications if available, otherwise show placeholder
    const medications = (user?.medications?.length || 0) > 0
        ? user!.medications!.map(m => ({ name: `${m.name} ${m.dosage}`, frequency: m.frequency, nextDose: 'As prescribed', daysLeft: 30 }))
        : [
            { name: 'Metformin 500mg', frequency: 'Twice daily', nextDose: '11:30 AM', daysLeft: 14 },
            { name: 'Atorvastatin 20mg', frequency: 'Once nightly', nextDose: '10 PM', daysLeft: 7 },
        ]

    const appointments = [
        { doctor: 'Dr. Arjun Mehta', specialty: 'Cardiologist', hospital: 'Apollo Hospital', date: 'Mar 10', time: '11:00 AM', type: 'in-person' },
        { doctor: 'Dr. Priya Nair', specialty: 'Dermatologist', hospital: 'Fortis Hospital', date: 'Mar 15', time: '3:00 PM', type: 'video' },
    ]

    const activity = [
        { icon: '🏥', text: 'Welcome to Sanjeevni! Profile created.', time: 'Just now', color: '#1976D2' },
        { icon: '💊', text: 'Set up medication reminders in your profile', time: '2 min ago', color: '#00C853' },
        { icon: '📋', text: 'Complete your health profile for better recommendations', time: '5 min ago', color: '#00838F' },
    ]

    const scoreLabel = healthScore >= 80 ? 'Great!' : healthScore >= 50 ? 'Good' : healthScore > 0 ? 'Needs attention' : ''
    const scoreColor = healthScore >= 80 ? '#00C853' : healthScore >= 50 ? '#F59E0B' : '#D32F2F'

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'linear-gradient(180deg, #F0F7FF 0%, #F7FAFD 100%)' }}>
            <Sidebar active="Dashboard" />

            {/* Main content */}
            <div style={{ marginLeft: '240px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <TopBar />

                <main style={{ flex: 1, padding: '28px', maxWidth: '1200px' }}>
                    {/* Welcome card */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card"
                        style={{ background: 'linear-gradient(135deg, #0A3D6B 0%, #1976D2 100%)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '28px' }}>
                        <div style={{ flex: 1 }}>
                            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px', marginBottom: '4px' }}>
                                {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
                            </p>
                            <h2 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', color: 'white', fontSize: '24px', fontWeight: 800, marginBottom: '6px' }}>
                                {greeting}, {firstName} 👋
                            </h2>
                            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '15px' }}>
                                {healthScore > 0
                                    ? <>Your health score is <strong style={{ color: scoreColor }}>{healthScore} — {scoreLabel}</strong> Keep it up!</>
                                    : <>Complete your profile to get your personalized <strong style={{ color: '#00C853' }}>Health Score</strong>!</>}
                            </p>
                        </div>
                        <HealthScoreRing score={healthScore} />
                    </motion.div>

                    {/* Quick action cards */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
                        {[
                            { label: 'Find Hospital', icon: Hospital, href: '/search', bg: 'linear-gradient(135deg, #0A3D6B, #1976D2)' },
                            { label: 'Emergency SOS', icon: AlertCircle, href: '/emergency', bg: 'linear-gradient(135deg, #D32F2F, #FF5252)', pulse: true },
                            { label: 'Book Appointment', icon: Calendar, href: '/appointments', bg: 'linear-gradient(135deg, #00897B, #00C853)' },
                            { label: 'Order Medicines', icon: Pill, href: '/medicines', bg: 'linear-gradient(135deg, #00838F, #26C6DA)' },
                        ].map((card, i) => (
                            <motion.a key={card.label} href={card.href} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.07 }}
                                style={{
                                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                    gap: '10px', padding: '24px 16px', borderRadius: '16px',
                                    background: card.bg, color: 'white', textDecoration: 'none',
                                    fontWeight: 700, fontSize: '14px', fontFamily: 'var(--font-jakarta, sans-serif)',
                                    boxShadow: card.pulse ? '0 8px 24px rgba(211,47,47,0.35)' : 'var(--shadow-card)',
                                    transition: 'all 0.25s ease', cursor: 'pointer', position: 'relative',
                                }}
                                onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-4px)')}
                                onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}>
                                {card.pulse && <span style={{ position: 'absolute', inset: 0, borderRadius: '16px', background: 'rgba(255,255,255,0.15)', animation: 'pulse 2s infinite' }} />}
                                <card.icon size={28} />
                                {card.label}
                            </motion.a>
                        ))}
                    </div>

                    {/* Middle row: Appointments + Medications */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                        {/* Appointments */}
                        <motion.div className="card" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                <h3 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: '16px', fontWeight: 700, color: '#1A2332' }}>Upcoming Appointments</h3>
                                <a href="/appointments" style={{ color: '#1976D2', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>View All</a>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {appointments.slice(0, 3).map((appt, i) => (
                                    <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '12px', background: '#F9FAFB', borderRadius: '12px' }}>
                                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg, #E3F2FD, #E8F5E9)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                            {appt.type === 'video' ? <Activity size={18} color="#1976D2" /> : <Stethoscope size={18} color="#0A3D6B" />}
                                        </div>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <p style={{ fontWeight: 700, fontSize: '13px', color: '#1A2332', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{appt.doctor}</p>
                                            <p style={{ fontSize: '12px', color: '#4A5568' }}>{appt.specialty} • {appt.hospital}</p>
                                        </div>
                                        <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                            <p style={{ fontSize: '12px', fontWeight: 700, color: '#0A3D6B' }}>{appt.date}</p>
                                            <p style={{ fontSize: '11px', color: '#4A5568' }}>{appt.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Medications */}
                        <motion.div className="card" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                <h3 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: '16px', fontWeight: 700, color: '#1A2332' }}>Active Medications</h3>
                                <a href="/medicines" style={{ color: '#1976D2', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>Refill All</a>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {medications.map((med, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: '#F9FAFB', borderRadius: '12px' }}>
                                        <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#E0F2F1', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                            <Pill size={16} color="#00897B" />
                                        </div>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <p style={{ fontSize: '13px', fontWeight: 700, color: '#1A2332', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{med.name}</p>
                                            <p style={{ fontSize: '11px', color: '#4A5568' }}>Next: {med.nextDose}</p>
                                        </div>
                                        <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                            <p style={{ fontSize: '11px', color: med.daysLeft <= 7 ? '#D32F2F' : '#4A5568', fontWeight: med.daysLeft <= 7 ? 700 : 400 }}>{med.daysLeft}d left</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Health metrics */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
                        {[
                            { label: 'Blood Pressure', value: '118/78', unit: 'mmHg', trend: 'down', icon: Activity, color: '#1976D2', status: 'Normal', bg: '#E3F2FD' },
                            { label: 'Blood Sugar', value: '102', unit: 'mg/dL', trend: 'up', icon: Heart, color: '#F59E0B', status: 'Slightly High', bg: '#FFF8E1' },
                            { label: 'Next Checkup', value: 'Mar 18', unit: '', trend: null, icon: Calendar, color: '#00897B', status: '12 days away', bg: '#E0F2F1' },
                        ].map((metric, i) => (
                            <motion.div key={metric.label} className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.1 }}
                                style={{ padding: '20px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: metric.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <metric.icon size={18} color={metric.color} />
                                    </div>
                                    <p style={{ fontSize: '13px', color: '#4A5568', fontWeight: 500 }}>{metric.label}</p>
                                    {metric.trend && (
                                        <div style={{ marginLeft: 'auto' }}>
                                            {metric.trend === 'up' ? <TrendingUp size={16} color="#F59E0B" /> : <TrendingDown size={16} color="#00C853" />}
                                        </div>
                                    )}
                                </div>
                                <p style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '24px', fontWeight: 700, color: '#1A2332', marginBottom: '4px' }}>
                                    {metric.value} <span style={{ fontSize: '13px', fontWeight: 400, color: '#4A5568' }}>{metric.unit}</span>
                                </p>
                                <span style={{ fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '999px', background: metric.bg, color: metric.color }}>{metric.status}</span>
                            </motion.div>
                        ))}
                    </div>

                    {/* Bottom row: Activity + Hospitals */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                        {/* Activity */}
                        <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                            <h3 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: '16px', fontWeight: 700, color: '#1A2332', marginBottom: '20px' }}>Recent Activity</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                                {activity.map((item, i) => (
                                    <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', paddingBottom: i < activity.length - 1 ? '16px' : '0', marginBottom: i < activity.length - 1 ? '0' : '0', position: 'relative' }}>
                                        {i < activity.length - 1 && <div style={{ position: 'absolute', left: '19px', top: '36px', bottom: '0', width: '2px', background: '#F0F4F8', zIndex: 0 }} />}
                                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#F0F4F8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0, zIndex: 1 }}>
                                            {item.icon}
                                        </div>
                                        <div style={{ flex: 1, paddingTop: '4px' }}>
                                            <p style={{ fontSize: '13px', color: '#1A2332', fontWeight: 500 }}>{item.text}</p>
                                            <p style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '2px' }}>{item.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Nearby hospitals */}
                        <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                <h3 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: '16px', fontWeight: 700, color: '#1A2332' }}>Nearby Hospitals</h3>
                                <a href="/search" style={{ color: '#1976D2', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>View Map</a>
                            </div>

                            {/* Map placeholder */}
                            <div style={{ height: '100px', background: 'linear-gradient(135deg, #E3F2FD, #E8F5E9)', borderRadius: '12px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                                <div style={{ position: 'absolute', width: '200%', height: '200%', backgroundImage: 'radial-gradient(circle, #1976D2 1px, transparent 1px)', backgroundSize: '20px 20px', opacity: 0.15 }} />
                                <MapPin size={28} color="#1976D2" />
                                <span style={{ color: '#1976D2', fontWeight: 600, fontSize: '13px', marginLeft: '8px' }}>New Delhi, India</span>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {[
                                    { name: 'Apollo Hospital', dist: '2.4 km', icu: 5, avail: true },
                                    { name: 'AIIMS Delhi', dist: '3.1 km', icu: 12, avail: true },
                                    { name: 'Fortis Memorial', dist: '4.8 km', icu: 1, avail: false },
                                ].map((h, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', background: '#F9FAFB', borderRadius: '10px' }}>
                                        <div className={h.avail ? 'bed-dot-available' : 'bed-dot-limited'} />
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <p style={{ fontSize: '13px', fontWeight: 600, color: '#1A2332', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{h.name}</p>
                                            <p style={{ fontSize: '11px', color: '#4A5568' }}>{h.dist} • ICU: {h.icu} available</p>
                                        </div>
                                        <a href="/booking" style={{ padding: '5px 12px', borderRadius: '8px', background: '#0A3D6B', color: 'white', fontSize: '11px', fontWeight: 700, textDecoration: 'none', flexShrink: 0 }}>
                                            Book
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </main>
            </div>
        </div>
    )
}
