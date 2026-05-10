'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    User, Heart, Shield, Bell, Lock, LogOut, Camera, Edit, ChevronRight, ArrowLeft,
    Activity, Check, X, Phone, Mail, MapPin, Save, AlertCircle, Loader2
} from 'lucide-react'
import { useAuthStore } from '@/store/useAuthStore'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'
const PROFILE_TABS = ['Personal', 'Medical', 'Emergency', 'Privacy', 'Notifications', 'Account']

// ─── Helper Functions ─────────────────────────────────────────────────
const calculateAge = (dob?: string): string => {
    if (!dob) return '—'
    const today = new Date(), birth = new Date(dob)
    let age = today.getFullYear() - birth.getFullYear()
    const m = today.getMonth() - birth.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--
    return `${age} years`
}
const formatDate = (d?: string) => {
    if (!d) return '—'
    return new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}
const getBMICategory = (bmi?: number) => {
    if (!bmi) return ''
    if (bmi < 18.5) return 'Underweight'
    if (bmi < 25) return 'Normal ✓'
    if (bmi < 30) return 'Overweight'
    return 'Obese'
}
const getInitials = (name?: string) => {
    if (!name) return '?'
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}
const formatYear = (d?: string) => d ? new Date(d).getFullYear() : ''

// ─── Health Ring ──────────────────────────────────────────────────────
function HealthRing({ score = 0 }: { score?: number }) {
    const r = 44
    const circ = 2 * Math.PI * r
    const color = score >= 80 ? '#00C853' : score >= 50 ? '#F59E0B' : score > 0 ? '#D32F2F' : '#CBD5E1'
    return (
        <div style={{ position: 'relative', width: '104px', height: '104px' }}>
            <svg width="104" height="104" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="52" cy="52" r={r} fill="none" stroke="#E8EFF7" strokeWidth="8" />
                <circle cx="52" cy="52" r={r} fill="none" stroke={color} strokeWidth="8"
                    strokeDasharray={circ} strokeDashoffset={circ - (Math.min(score, 100) / 100) * circ} strokeLinecap="round" />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '22px', fontWeight: 800, color, fontFamily: 'var(--font-jakarta, sans-serif)' }}>{score || '—'}</span>
                <span style={{ fontSize: '9px', color: '#9CA3AF', fontWeight: 600 }}>HEALTH</span>
            </div>
        </div>
    )
}

// ─── Toggle ───────────────────────────────────────────────────────────
function Toggle({ value, onChange }: { value: boolean; onChange: () => void }) {
    return (
        <button onClick={onChange} style={{ width: '48px', height: '26px', borderRadius: '999px', background: value ? '#1976D2' : '#CBD5E1', border: 'none', cursor: 'pointer', position: 'relative', transition: 'all 0.25s', flexShrink: 0 }}>
            <span style={{ position: 'absolute', top: '3px', left: value ? '25px' : '3px', width: '20px', height: '20px', borderRadius: '50%', background: 'white', transition: 'left 0.25s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />
        </button>
    )
}

// ─── Edit Profile Modal ───────────────────────────────────────────────
function EditModal({ onClose }: { onClose: () => void }) {
    const { user, token, updateUser } = useAuthStore()
    const [saving, setSaving] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')

    const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
    const languages = ['Hindi', 'English', 'Marathi', 'Tamil', 'Telugu', 'Bengali', 'Gujarati', 'Kannada', 'Malayalam']

    const [form, setForm] = useState({
        name: user?.name || '',
        phone: user?.phone || '',
        dateOfBirth: user?.dateOfBirth || '',
        gender: user?.gender || '',
        bloodGroup: user?.bloodGroup || '',
        height: user?.height?.toString() || '',
        weight: user?.weight?.toString() || '',
        language: user?.language || '',
        city: user?.city || '',
        abhaId: user?.abhaId || '',
    })

    const inp: React.CSSProperties = { width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E8EFF7', fontSize: '14px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }
    const lbl: React.CSSProperties = { display: 'block', fontSize: '12px', fontWeight: 700, color: '#4A5568', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }

    const handleSave = async () => {
        setSaving(true)
        setError('')
        try {
            const payload = {
                ...form,
                height: form.height ? parseFloat(form.height) : undefined,
                weight: form.weight ? parseFloat(form.weight) : undefined,
            }

            const res = await axios.put(`${API_BASE}/api/users/profile`, payload, {
                headers: { Authorization: `Bearer ${token}` },
            })

            if (res.data.success) {
                updateUser(res.data.user)
            } else {
                updateUser(payload)
            }
            setSuccess(true)
            setTimeout(onClose, 1200)
        } catch (err: any) {
            setError(err.response?.data?.message || err.message || 'Network error: Failed to connect to server. Is MongoDB running?')
        } finally {
            setSaving(false)
        }
    }

    return (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', backdropFilter: 'blur(4px)' }}
            onClick={e => { if (e.target === e.currentTarget) onClose() }}>
            <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
                style={{ background: 'white', borderRadius: '24px 24px 0 0', width: '100%', maxWidth: '680px', maxHeight: '90vh', overflow: 'auto', padding: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <div>
                        <h2 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: '20px', fontWeight: 800, color: '#1A2332' }}>Edit Profile</h2>
                        <p style={{ fontSize: '13px', color: '#4A5568' }}>Update your personal information</p>
                    </div>
                    <button onClick={onClose} style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#F0F4F8', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <X size={16} color="#4A5568" />
                    </button>
                </div>

                {success && (
                    <div style={{ padding: '12px 16px', background: '#E8F5E9', borderRadius: '10px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Check size={16} color="#00C853" />
                        <p style={{ fontSize: '13px', color: '#2E7D32', fontWeight: 600 }}>Profile updated successfully!</p>
                    </div>
                )}
                {error && (
                    <div style={{ padding: '12px 16px', background: '#FFEBEE', borderRadius: '10px', marginBottom: '16px' }}>
                        <p style={{ fontSize: '13px', color: '#D32F2F' }}>{error}</p>
                    </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div style={{ gridColumn: '1/-1' }}>
                        <label style={lbl}>Full Name *</label>
                        <input style={inp} value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Your full name" />
                    </div>
                    <div>
                        <label style={lbl}>Phone</label>
                        <input style={inp} value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} placeholder="+91 XXXXX XXXXX" />
                    </div>
                    <div>
                        <label style={lbl}>Date of Birth</label>
                        <input style={inp} type="date" value={form.dateOfBirth} onChange={e => setForm(p => ({ ...p, dateOfBirth: e.target.value }))} />
                    </div>
                    <div>
                        <label style={lbl}>Gender</label>
                        <div style={{ display: 'flex', gap: '6px' }}>
                            {['Male', 'Female', 'Other'].map(g => (
                                <button key={g} type="button" onClick={() => setForm(p => ({ ...p, gender: g }))}
                                    style={{ padding: '8px 14px', borderRadius: '999px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', border: 'none', background: form.gender === g ? '#0A3D6B' : '#F0F4F8', color: form.gender === g ? 'white' : '#4A5568' }}>
                                    {g}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label style={lbl}>Blood Group</label>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                            {bloodGroups.map(bg => (
                                <button key={bg} type="button" onClick={() => setForm(p => ({ ...p, bloodGroup: bg }))}
                                    style={{ padding: '6px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', border: 'none', background: form.bloodGroup === bg ? '#D32F2F' : '#F0F4F8', color: form.bloodGroup === bg ? 'white' : '#4A5568' }}>
                                    {bg}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label style={lbl}>Height (cm)</label>
                        <input style={inp} type="number" value={form.height} onChange={e => setForm(p => ({ ...p, height: e.target.value }))} placeholder="e.g. 165" />
                    </div>
                    <div>
                        <label style={lbl}>Weight (kg)</label>
                        <input style={inp} type="number" value={form.weight} onChange={e => setForm(p => ({ ...p, weight: e.target.value }))} placeholder="e.g. 60" />
                    </div>
                    <div>
                        <label style={lbl}>Preferred Language</label>
                        <select style={{ ...inp, appearance: 'auto' } as any} value={form.language} onChange={e => setForm(p => ({ ...p, language: e.target.value }))}>
                            <option value="">Select language</option>
                            {languages.map(l => <option key={l} value={l}>{l}</option>)}
                        </select>
                    </div>
                    <div>
                        <label style={lbl}>City</label>
                        <input style={inp} value={form.city} onChange={e => setForm(p => ({ ...p, city: e.target.value }))} placeholder="e.g. Mumbai" />
                    </div>
                    <div style={{ gridColumn: '1/-1' }}>
                        <label style={lbl}>ABHA Health ID</label>
                        <input style={inp} value={form.abhaId} onChange={e => setForm(p => ({ ...p, abhaId: e.target.value }))} placeholder="e.g. 12-3456-7890-1234" />
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '28px' }}>
                    <button onClick={onClose} style={{ flex: 1, padding: '13px', borderRadius: '12px', background: '#F0F4F8', color: '#4A5568', fontWeight: 700, border: 'none', cursor: 'pointer', fontSize: '14px' }}>
                        Cancel
                    </button>
                    <button onClick={handleSave} disabled={saving} style={{ flex: 2, padding: '13px', borderRadius: '12px', background: saving ? '#CBD5E1' : 'linear-gradient(135deg, #0A3D6B, #1976D2)', color: 'white', fontWeight: 800, fontFamily: 'var(--font-jakarta, sans-serif)', border: 'none', cursor: saving ? 'not-allowed' : 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                        {saving ? <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Saving...</> : <><Save size={16} /> Save Changes</>}
                    </button>
                </div>
            </motion.div>
        </div>
    )
}

// ─── Main Profile Page ────────────────────────────────────────────────
export default function ProfilePage() {
    const { user, token, logout, updateUser } = useAuthStore()
    const router = useRouter()
    const [activeTab, setActiveTab] = useState(0)
    const [isEditing, setIsEditing] = useState(false)
    const [notifications, setNotifications] = useState(user?.notifications || { medicines: true, appointments: true, lab: false, emergency: true, tips: false })
    const [privacy, setPrivacy] = useState({
        facialRecog: user?.facialRecognition || false,
        shareRecords: false, locationAccess: true, analyticsConsent: false
    })

    const toggleN = (key: string) => setNotifications((p: any) => ({ ...p, [key]: !p[key] }))
    const toggleP = (key: string) => setPrivacy((p: any) => ({ ...p, [key]: !p[key] }))

    const handleLogout = () => {
        logout()
        router.push('/login')
    }

    // Profile completeness
    const fields = [user?.name, user?.dateOfBirth, user?.gender, user?.bloodGroup, user?.height, user?.weight, user?.language, user?.city]
    const filled = fields.filter(Boolean).length
    const pct = Math.round((filled / fields.length) * 100)

    return (
        <div style={{ minHeight: '100vh', background: '#F7FAFD' }}>
            {/* Header */}
            <div style={{ background: 'linear-gradient(135deg, #0A3D6B, #1976D2)', padding: '28px 0 0' }}>
                <div className="container-xl" style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingBottom: '28px' }}>
                    <a href="/dashboard" style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ArrowLeft size={18} color="white" />
                    </a>
                    <h1 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', color: 'white', fontSize: '22px', fontWeight: 800 }}>My Profile</h1>
                </div>

                {/* Avatar + health score */}
                <div className="container-xl" style={{ paddingBottom: '0' }}>
                    <div style={{ background: 'white', borderRadius: '20px 20px 0 0', padding: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <div style={{ position: 'relative' }}>
                            {user?.avatar ? (
                                <img src={user.avatar} alt={user.name} style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }} />
                            ) : (
                                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #0A3D6B, #1976D2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', fontWeight: 800, color: 'white', fontFamily: 'var(--font-jakarta, sans-serif)' }}>
                                    {getInitials(user?.name)}
                                </div>
                            )}
                            <button style={{ position: 'absolute', bottom: '0px', right: '-4px', width: '28px', height: '28px', borderRadius: '50%', background: '#0A3D6B', border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                <Camera size={12} color="white" />
                            </button>
                        </div>
                        <div style={{ flex: 1 }}>
                            <h2 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: '20px', fontWeight: 800, color: '#1A2332', marginBottom: '2px' }}>
                                {user?.name || 'Complete your profile'}
                            </h2>
                            <p style={{ fontSize: '13px', color: '#4A5568', marginBottom: '8px' }}>
                                {user?.abhaId ? `ABHA ID: ${user.abhaId}` : user?.email || 'ABHA ID not linked'}
                            </p>
                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                {user?.bloodGroup && (
                                    <span className="badge badge-blue" style={{ fontSize: '11px' }}>{user.bloodGroup} Blood</span>
                                )}
                                {user?.insurance?.provider && (
                                    <span className="badge badge-green" style={{ fontSize: '11px' }}>{user.insurance.provider} Active</span>
                                )}
                                {user?.allergies?.medicine?.map(a => (
                                    <span key={a} className="badge badge-red" style={{ fontSize: '11px' }}>⚠ {a} Allergy</span>
                                ))}
                                {!user?.bloodGroup && !user?.insurance && (!user?.allergies?.medicine?.length) && (
                                    <span style={{ fontSize: '12px', color: '#9CA3AF', fontStyle: 'italic' }}>Complete profile to see health badges</span>
                                )}
                            </div>
                        </div>
                        <HealthRing score={user?.healthScore || 0} />
                    </div>
                </div>
            </div>

            {/* Incomplete profile banner */}
            {user && !user.profileComplete && (
                <div className="container-xl" style={{ padding: '12px 24px 0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', background: '#E3F2FD', borderRadius: '12px', border: '1px solid #BBDEFB' }}>
                        <AlertCircle size={18} color="#1976D2" style={{ flexShrink: 0 }} />
                        <div style={{ flex: 1 }}>
                            <p style={{ fontSize: '13px', fontWeight: 700, color: '#0A3D6B' }}>
                                Your profile is {pct}% complete
                            </p>
                            <div style={{ width: '100%', height: '4px', background: '#BBDEFB', borderRadius: '2px', marginTop: '4px' }}>
                                <div style={{ width: `${pct}%`, height: '100%', background: '#1976D2', borderRadius: '2px', transition: 'width 0.5s' }} />
                            </div>
                        </div>
                        <a href="/onboarding" style={{ padding: '7px 14px', borderRadius: '8px', background: '#0A3D6B', color: 'white', fontSize: '12px', fontWeight: 700, textDecoration: 'none', flexShrink: 0 }}>
                            Complete Profile
                        </a>
                    </div>
                </div>
            )}

            {/* Tab nav */}
            <div style={{ background: 'white', borderBottom: '1px solid #E8EFF7' }}>
                <div className="container-xl" style={{ display: 'flex', overflowX: 'auto' }}>
                    {PROFILE_TABS.map((tab, i) => (
                        <button key={tab} onClick={() => setActiveTab(i)} style={{
                            padding: '14px 18px', fontWeight: 600, fontSize: '13px', whiteSpace: 'nowrap',
                            cursor: 'pointer', color: activeTab === i ? '#0A3D6B' : '#4A5568',
                            background: 'none', border: 'none',
                            borderBottom: activeTab === i ? '2px solid #1976D2' : '2px solid transparent',
                            transition: 'all 0.2s',
                        }}>{tab}</button>
                    ))}
                </div>
            </div>

            <div className="container-xl" style={{ padding: '28px 24px', maxWidth: '720px' }}>
                <AnimatePresence mode="wait">
                    {/* ── Personal ── */}
                    {activeTab === 0 && (
                        <motion.div key="personal" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                            <div className="card" style={{ marginBottom: '16px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                    <h3 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontWeight: 700, fontSize: '16px', color: '#1A2332' }}>Personal Information</h3>
                                    <button onClick={() => setIsEditing(true)} style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '7px 14px', borderRadius: '8px', background: '#E3F2FD', color: '#0A3D6B', fontWeight: 700, fontSize: '13px', border: 'none', cursor: 'pointer' }}>
                                        <Edit size={13} /> Edit
                                    </button>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                    {[
                                        { label: 'Full Name', value: user?.name || '—' },
                                        { label: 'Date of Birth', value: formatDate(user?.dateOfBirth) },
                                        { label: 'Age', value: calculateAge(user?.dateOfBirth) },
                                        { label: 'Gender', value: user?.gender || '—' },
                                        { label: 'Blood Group', value: user?.bloodGroup || '—' },
                                        { label: 'Height / Weight', value: user?.height && user?.weight ? `${user.height} cm / ${user.weight} kg` : '—' },
                                        { label: 'BMI', value: user?.bmi ? `${user.bmi} — ${getBMICategory(user.bmi)}` : '—' },
                                        { label: 'Language', value: user?.language || '—' },
                                    ].map(f => (
                                        <div key={f.label} style={{ padding: '12px', background: '#F9FAFB', borderRadius: '10px' }}>
                                            <p style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>{f.label}</p>
                                            <p style={{ fontSize: '14px', fontWeight: 600, color: f.value === '—' ? '#9CA3AF' : '#1A2332', fontStyle: f.value === '—' ? 'italic' : 'normal' }}>{f.value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="card">
                                <h3 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontWeight: 700, fontSize: '16px', color: '#1A2332', marginBottom: '16px' }}>Contact Details</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {[
                                        { icon: Phone, label: user?.phone ? `+91 ${user.phone}` : '—', empty: !user?.phone },
                                        { icon: Mail, label: user?.email || '—', empty: !user?.email },
                                        { icon: MapPin, label: user?.city || '—', empty: !user?.city },
                                    ].map((c, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: '#F9FAFB', borderRadius: '10px' }}>
                                            <c.icon size={16} color={c.empty ? '#CBD5E1' : '#1976D2'} />
                                            <p style={{ fontSize: '14px', color: c.empty ? '#9CA3AF' : '#1A2332', fontStyle: c.empty ? 'italic' : 'normal' }}>{c.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* ── Medical ── */}
                    {activeTab === 1 && (
                        <motion.div key="medical" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                            <div className="card" style={{ marginBottom: '16px' }}>
                                <h3 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontWeight: 700, fontSize: '16px', color: '#1A2332', marginBottom: '16px' }}>Medical Profile</h3>
                                {(user?.chronicConditions?.length || 0) > 0 ? (
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                        {user?.chronicConditions?.map(c => (
                                            <span key={c} style={{ padding: '6px 14px', background: '#E3F2FD', color: '#0A3D6B', borderRadius: '999px', fontSize: '13px', fontWeight: 600 }}>{c}</span>
                                        ))}
                                    </div>
                                ) : (
                                    <div style={{ textAlign: 'center', padding: '24px', background: '#F9FAFB', borderRadius: '12px' }}>
                                        <Activity size={28} color="#CBD5E1" style={{ margin: '0 auto 8px' }} />
                                        <p style={{ fontSize: '14px', color: '#9CA3AF', fontStyle: 'italic' }}>No chronic conditions added</p>
                                        <a href="/onboarding" style={{ fontSize: '13px', color: '#1976D2', fontWeight: 700, textDecoration: 'none' }}>Add Medical History →</a>
                                    </div>
                                )}
                            </div>

                            <div className="card" style={{ marginBottom: '16px' }}>
                                <h3 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontWeight: 700, fontSize: '16px', color: '#1A2332', marginBottom: '16px' }}>⚠️ Allergies</h3>
                                {(() => {
                                    const all = [...(user?.allergies?.medicine || []).map(a => `${a} (medicine)`), ...(user?.allergies?.food || []).map(a => `${a} (food)`)]
                                    return all.length > 0 ? (
                                        all.map(a => (
                                            <div key={a} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', background: '#FFEBEE', borderRadius: '10px', marginBottom: '8px', border: '1px solid #FFCDD2' }}>
                                                <span style={{ fontSize: '16px' }}>⚠️</span>
                                                <span style={{ fontSize: '14px', fontWeight: 600, color: '#B71C1C' }}>{a}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <p style={{ fontSize: '14px', color: '#9CA3AF', fontStyle: 'italic', textAlign: 'center', padding: '16px' }}>No known allergies</p>
                                    )
                                })()}
                            </div>

                            <div className="card">
                                <h3 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontWeight: 700, fontSize: '16px', color: '#1A2332', marginBottom: '16px' }}>Active Medications</h3>
                                {(user?.medications?.length || 0) > 0 ? (
                                    user?.medications?.map((m, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', background: '#E0F2F1', borderRadius: '10px', marginBottom: '8px' }}>
                                            <span style={{ fontSize: '16px' }}>💊</span>
                                            <span style={{ fontSize: '14px', fontWeight: 500, color: '#1A2332' }}>{m.name} {m.dosage} — {m.frequency}</span>
                                        </div>
                                    ))
                                ) : (
                                    <p style={{ fontSize: '14px', color: '#9CA3AF', fontStyle: 'italic', textAlign: 'center', padding: '16px' }}>No active medications</p>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {/* ── Emergency ── */}
                    {activeTab === 2 && (
                        <motion.div key="emergency" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                            <div className="card">
                                <h3 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontWeight: 700, fontSize: '16px', color: '#1A2332', marginBottom: '16px' }}>Emergency Contacts</h3>
                                {(user?.emergencyContacts?.length || 0) > 0 ? (
                                    user?.emergencyContacts?.map((c, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px', background: '#F9FAFB', borderRadius: '12px', marginBottom: '10px' }}>
                                            <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'linear-gradient(135deg, #E3F2FD, #E8F5E9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#0A3D6B', fontSize: '16px', fontFamily: 'var(--font-jakarta, sans-serif)' }}>
                                                {getInitials(c.name)}
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <p style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontWeight: 700, fontSize: '14px', color: '#1A2332' }}>{c.name}</p>
                                                <p style={{ fontSize: '12px', color: '#4A5568' }}>{c.relation} • {c.phone}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div style={{ textAlign: 'center', padding: '32px', background: '#F9FAFB', borderRadius: '12px' }}>
                                        <Phone size={28} color="#CBD5E1" style={{ margin: '0 auto 8px' }} />
                                        <p style={{ fontSize: '14px', color: '#9CA3AF', fontStyle: 'italic' }}>No emergency contacts added</p>
                                        <a href="/onboarding" style={{ fontSize: '13px', color: '#1976D2', fontWeight: 700, textDecoration: 'none' }}>Add Emergency Contacts →</a>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {/* ── Privacy ── */}
                    {activeTab === 3 && (
                        <motion.div key="privacy" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                            <div className="card">
                                <h3 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontWeight: 700, fontSize: '16px', color: '#1A2332', marginBottom: '20px' }}>Privacy Controls</h3>
                                {[
                                    { label: '🤳 Facial Recognition (Emergency ID)', key: 'facialRecog', desc: 'Allow paramedics to scan your face in emergency' },
                                    { label: '📤 Share Records with Doctors', key: 'shareRecords', desc: 'Allow booked doctors to access your records' },
                                    { label: '📍 Location Access', key: 'locationAccess', desc: 'Used for hospital search and ambulance dispatch' },
                                    { label: '📊 Analytics & Improvement', key: 'analyticsConsent', desc: 'Help us improve with anonymized usage data' },
                                ].map(toggle => (
                                    <div key={toggle.key} style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', padding: '16px 0', borderBottom: '1px solid #F5F7FA' }}>
                                        <div style={{ flex: 1 }}>
                                            <p style={{ fontSize: '14px', fontWeight: 600, color: '#1A2332', marginBottom: '3px' }}>{toggle.label}</p>
                                            <p style={{ fontSize: '12px', color: '#4A5568' }}>{toggle.desc}</p>
                                        </div>
                                        <Toggle value={(privacy as any)[toggle.key]} onChange={() => toggleP(toggle.key)} />
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* ── Notifications ── */}
                    {activeTab === 4 && (
                        <motion.div key="notifications" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                            <div className="card">
                                <h3 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontWeight: 700, fontSize: '16px', color: '#1A2332', marginBottom: '20px' }}>Notification Settings</h3>
                                {[
                                    { label: '💊 Medicine Reminders', key: 'medicines', desc: 'Daily dose and refill alerts' },
                                    { label: '📅 Appointment Reminders', key: 'appointments', desc: '24h and 1h before appointments' },
                                    { label: '🧪 Lab Results Ready', key: 'lab', desc: 'When new lab reports are uploaded' },
                                    { label: '🚨 Emergency Alerts', key: 'emergency', desc: 'Critical health alerts from doctors' },
                                    { label: '💡 Health Tips', key: 'tips', desc: 'Personalized health insights' },
                                ].map(toggle => (
                                    <div key={toggle.key} style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', padding: '16px 0', borderBottom: '1px solid #F5F7FA' }}>
                                        <div style={{ flex: 1 }}>
                                            <p style={{ fontSize: '14px', fontWeight: 600, color: '#1A2332', marginBottom: '3px' }}>{toggle.label}</p>
                                            <p style={{ fontSize: '12px', color: '#4A5568' }}>{toggle.desc}</p>
                                        </div>
                                        <Toggle value={(notifications as any)[toggle.key]} onChange={() => toggleN(toggle.key)} />
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* ── Account ── */}
                    {activeTab === 5 && (
                        <motion.div key="account" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                            <div className="card" style={{ marginBottom: '16px' }}>
                                <h3 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontWeight: 700, fontSize: '16px', color: '#1A2332', marginBottom: '16px' }}>Account Security</h3>
                                {[
                                    { label: 'Change Password', icon: Lock, desc: 'Update your account password' },
                                    { label: 'Two-Factor Authentication', icon: Shield, desc: 'Enable via SMS OTP' },
                                    { label: 'Download My Data', icon: User, desc: 'Get a copy of all your data (DPDP)' },
                                ].map(item => (
                                    <button key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '14px 16px', borderRadius: '12px', background: '#F9FAFB', border: 'none', cursor: 'pointer', marginBottom: '8px' }}
                                        onMouseEnter={e => (e.currentTarget.style.background = '#F0F4F8')}
                                        onMouseLeave={e => (e.currentTarget.style.background = '#F9FAFB')}>
                                        <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#E3F2FD', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <item.icon size={17} color="#1976D2" />
                                        </div>
                                        <div style={{ flex: 1, textAlign: 'left' }}>
                                            <p style={{ fontSize: '14px', fontWeight: 700, color: '#1A2332' }}>{item.label}</p>
                                            <p style={{ fontSize: '12px', color: '#4A5568' }}>{item.desc}</p>
                                        </div>
                                        <ChevronRight size={16} color="#9CA3AF" />
                                    </button>
                                ))}
                            </div>

                            <div className="card" style={{ marginBottom: '16px' }}>
                                <h3 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontWeight: 700, fontSize: '16px', color: '#1A2332', marginBottom: '12px' }}>Membership</h3>
                                <div style={{ padding: '14px', background: '#F9FAFB', borderRadius: '12px' }}>
                                    <p style={{ fontSize: '13px', color: '#4A5568' }}>Member since</p>
                                    <p style={{ fontSize: '15px', fontWeight: 700, color: '#1A2332' }}>{user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }) : '—'}</p>
                                </div>
                            </div>

                            <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', padding: '14px', borderRadius: '12px', background: '#FFEBEE', color: '#D32F2F', fontWeight: 700, fontSize: '14px', border: 'none', cursor: 'pointer' }}>
                                <LogOut size={16} /> Sign Out
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Edit Modal */}
            <AnimatePresence>
                {isEditing && <EditModal onClose={() => setIsEditing(false)} />}
            </AnimatePresence>

            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    )
}
