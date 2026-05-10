'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Heart, Eye, EyeOff, Phone, Mail, Lock, User, MapPin,
    CheckCircle, ChevronRight, ArrowLeft, Shield, Activity, Star
} from 'lucide-react'

const STEPS = ['Basic Health', 'Medical History', 'Allergies', 'Insurance', 'Preferences']

const CONDITIONS = ['Diabetes', 'Hypertension', 'Asthma', 'Heart Disease', 'Thyroid', 'Arthritis', 'Kidney Disease', 'Cancer (history)']
const MEDICINE_ALLERGIES = ['Penicillin', 'Aspirin', 'Ibuprofen', 'Sulfa drugs', 'Codeine', 'NSAIDs']

function Logo() {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '32px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Heart size={18} color="#0A3D6B" fill="#0A3D6B" />
            </div>
            <span style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontWeight: 800, fontSize: '20px', color: 'white' }}>Sanjeevani</span>
        </div>
    )
}

export default function AuthPage() {
    const [tab, setTab] = useState<'login' | 'signup'>('login')
    const [showPass, setShowPass] = useState(false)
    const [onboarding, setOnboarding] = useState(false)
    const [step, setStep] = useState(0)
    const [complete, setComplete] = useState(false)
    const [healthScore, setHealthScore] = useState(0)
    const [form, setForm] = useState({
        name: '', email: '', phone: '', password: '',
        age: '', gender: '', bloodGroup: '', height: '', weight: '',
        conditions: [] as string[], medications: '', surgeries: false,
        medAllergies: [] as string[], foodAllergies: '',
        insurance: '', policyNo: '', emergencyContact: '', emergencyPhone: '',
        language: 'English', notifications: true, facialRecog: false,
    })

    const handleSignup = () => setOnboarding(true)
    const nextStep = () => {
        if (step < STEPS.length - 1) setStep(s => s + 1)
        else {
            setComplete(true)
            let n = 0
            const t = setInterval(() => { n += 2; setHealthScore(Math.min(n, 87)); if (n >= 87) clearInterval(t) }, 30)
        }
    }

    if (complete) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #0A3D6B, #1976D2)' }}>
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', color: 'white', padding: '48px' }}>
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.3 }}
                        style={{ width: '96px', height: '96px', borderRadius: '50%', background: '#00C853', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px' }}>
                        <CheckCircle size={48} color="white" />
                    </motion.div>
                    <h1 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: '32px', fontWeight: 800, marginBottom: '8px' }}>Welcome to Sanjeevani, {form.name || 'Priya'}! 🎉</h1>
                    <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.75)', marginBottom: '32px' }}>Your health profile is ready.</p>
                    <div style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(20px)', borderRadius: '20px', padding: '28px', marginBottom: '32px' }}>
                        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px', marginBottom: '8px' }}>Your Health Score</p>
                        <p style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: '64px', fontWeight: 900, color: '#00C853' }}>{healthScore}</p>
                        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px' }}>/ 100 — Great!</p>
                    </div>
                    <a href="/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '16px 32px', borderRadius: '14px', background: 'white', color: '#0A3D6B', fontWeight: 800, fontSize: '16px', textDecoration: 'none', fontFamily: 'var(--font-jakarta, sans-serif)' }}>
                        Go to Dashboard <ChevronRight size={18} />
                    </a>
                </motion.div>
            </div>
        )
    }

    if (onboarding) {
        const progress = ((step + 1) / STEPS.length) * 100
        return (
            <div style={{ minHeight: '100vh', background: '#F7FAFD', display: 'flex', flexDirection: 'column' }}>
                {/* Progress bar */}
                <div style={{ height: '4px', background: '#E8EFF7' }}>
                    <motion.div animate={{ width: `${progress}%` }} style={{ height: '100%', background: 'linear-gradient(90deg, #0A3D6B, #1976D2)' }} />
                </div>
                <div style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px', borderBottom: '1px solid #E8EFF7', background: 'white' }}>
                    <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                        <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'linear-gradient(135deg, #0A3D6B, #1976D2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Heart size={14} color="white" fill="white" />
                        </div>
                    </a>
                    <div style={{ flex: 1 }}>
                        <p style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontWeight: 700, color: '#1A2332', fontSize: '15px' }}>
                            Step {step + 1} of {STEPS.length}: {STEPS[step]}
                        </p>
                        <p style={{ fontSize: '12px', color: '#4A5568' }}>{Math.round(progress)}% complete</p>
                    </div>
                    <div style={{ display: 'flex', gap: '4px' }}>
                        {STEPS.map((_, i) => (
                            <div key={i} style={{ width: '24px', height: '4px', borderRadius: '99px', background: i <= step ? '#1976D2' : '#E8EFF7', transition: 'all 0.3s' }} />
                        ))}
                    </div>
                </div>

                <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 24px' }}>
                    <AnimatePresence mode="wait">
                        <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
                            className="card" style={{ width: '100%', maxWidth: '560px' }}>
                            {/* Step 0 */}
                            {step === 0 && (
                                <div>
                                    <h2 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: '22px', fontWeight: 800, color: '#1A2332', marginBottom: '6px' }}>Basic Health Info</h2>
                                    <p style={{ color: '#4A5568', fontSize: '14px', marginBottom: '24px' }}>This helps us personalize your emergency care.</p>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                                        {[
                                            { label: 'Age', key: 'age', placeholder: 'e.g. 28' },
                                            { label: 'Height (cm)', key: 'height', placeholder: 'e.g. 165' },
                                            { label: 'Weight (kg)', key: 'weight', placeholder: 'e.g. 60' },
                                        ].map(f => (
                                            <div key={f.key} style={{ gridColumn: f.key === 'age' ? 'span 2' : undefined }}>
                                                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#4A5568', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{f.label}</label>
                                                <input className="input-field" placeholder={f.placeholder} value={(form as any)[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} />
                                            </div>
                                        ))}
                                        <div>
                                            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#4A5568', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Gender</label>
                                            <select className="input-field" value={form.gender} onChange={e => setForm(p => ({ ...p, gender: e.target.value }))}>
                                                <option value="">Select...</option>
                                                <option>Male</option><option>Female</option><option>Other</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#4A5568', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Blood Group</label>
                                            <select className="input-field" value={form.bloodGroup} onChange={e => setForm(p => ({ ...p, bloodGroup: e.target.value }))}>
                                                <option value="">Select...</option>
                                                {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(g => <option key={g}>{g}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 1 */}
                            {step === 1 && (
                                <div>
                                    <h2 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: '22px', fontWeight: 800, color: '#1A2332', marginBottom: '6px' }}>Medical History</h2>
                                    <p style={{ color: '#4A5568', fontSize: '14px', marginBottom: '24px' }}>Select all conditions that apply to you.</p>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
                                        {CONDITIONS.map(c => (
                                            <button key={c} onClick={() => setForm(p => ({ ...p, conditions: p.conditions.includes(c) ? p.conditions.filter(x => x !== c) : [...p.conditions, c] }))}
                                                style={{
                                                    padding: '8px 16px', borderRadius: '999px', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                                                    background: form.conditions.includes(c) ? '#1976D2' : '#F0F4F8',
                                                    color: form.conditions.includes(c) ? 'white' : '#4A5568',
                                                    border: 'none', transition: 'all 0.2s',
                                                }}>{c}</button>
                                        ))}
                                    </div>
                                    <div style={{ marginBottom: '16px' }}>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#4A5568', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Current Medications</label>
                                        <textarea className="input-field" placeholder="e.g. Metformin 500mg, Atorvastatin 20mg..." rows={3} value={form.medications} onChange={e => setForm(p => ({ ...p, medications: e.target.value }))} style={{ resize: 'none' }} />
                                    </div>
                                </div>
                            )}

                            {/* Step 2 */}
                            {step === 2 && (
                                <div>
                                    <h2 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: '22px', fontWeight: 800, color: '#1A2332', marginBottom: '6px' }}>Allergies</h2>
                                    <p style={{ color: '#4A5568', fontSize: '14px', marginBottom: '24px' }}>Critical for emergency treatment. Please be thorough.</p>
                                    <div style={{ marginBottom: '20px' }}>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#D32F2F', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>⚠️ Medicine Allergies</label>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                            {MEDICINE_ALLERGIES.map(a => (
                                                <button key={a} onClick={() => setForm(p => ({ ...p, medAllergies: p.medAllergies.includes(a) ? p.medAllergies.filter(x => x !== a) : [...p.medAllergies, a] }))}
                                                    style={{
                                                        padding: '7px 14px', borderRadius: '999px', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                                                        background: form.medAllergies.includes(a) ? '#FFEBEE' : '#F0F4F8',
                                                        color: form.medAllergies.includes(a) ? '#D32F2F' : '#4A5568',
                                                        border: form.medAllergies.includes(a) ? '1.5px solid #D32F2F' : '1.5px solid transparent',
                                                        transition: 'all 0.2s',
                                                    }}>{a}</button>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#4A5568', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Food Allergies</label>
                                        <input className="input-field" placeholder="e.g. Nuts, Shellfish, Dairy..." value={form.foodAllergies} onChange={e => setForm(p => ({ ...p, foodAllergies: e.target.value }))} />
                                    </div>
                                </div>
                            )}

                            {/* Step 3 */}
                            {step === 3 && (
                                <div>
                                    <h2 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: '22px', fontWeight: 800, color: '#1A2332', marginBottom: '6px' }}>Insurance & Emergency Contact</h2>
                                    <p style={{ color: '#4A5568', fontSize: '14px', marginBottom: '24px' }}>Used to claim benefits automatically during hospitalization.</p>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#4A5568', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Insurance Provider</label>
                                            <select className="input-field" value={form.insurance} onChange={e => setForm(p => ({ ...p, insurance: e.target.value }))}>
                                                <option value="">Select provider...</option>
                                                {['Star Health', 'HDFC ERGO', 'ICICI Lombard', 'Bajaj Allianz', 'PM-JAY / Ayushman', 'CGHS', 'ESIC', 'None'].map(i => <option key={i}>{i}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#4A5568', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Policy Number</label>
                                            <input className="input-field" placeholder="e.g. SH/2024/1234567" value={form.policyNo} onChange={e => setForm(p => ({ ...p, policyNo: e.target.value }))} />
                                        </div>
                                        <div style={{ height: '1px', background: '#E8EFF7', margin: '4px 0' }} />
                                        <div>
                                            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#D32F2F', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>🚨 Emergency Contact Name</label>
                                            <input className="input-field" placeholder="e.g. Rajiv Sharma (Father)" value={form.emergencyContact} onChange={e => setForm(p => ({ ...p, emergencyContact: e.target.value }))} />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#4A5568', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Emergency Contact Phone</label>
                                            <input className="input-field" type="tel" placeholder="+91 98XXX XXXXX" value={form.emergencyPhone} onChange={e => setForm(p => ({ ...p, emergencyPhone: e.target.value }))} />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 4 */}
                            {step === 4 && (
                                <div>
                                    <h2 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: '22px', fontWeight: 800, color: '#1A2332', marginBottom: '6px' }}>Preferences</h2>
                                    <p style={{ color: '#4A5568', fontSize: '14px', marginBottom: '24px' }}>Personalize your Sanjeevani experience.</p>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#4A5568', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Language</label>
                                            <select className="input-field" value={form.language} onChange={e => setForm(p => ({ ...p, language: e.target.value }))}>
                                                {['English', 'Hindi', 'Tamil', 'Telugu', 'Bengali', 'Marathi', 'Gujarati', 'Kannada'].map(l => <option key={l}>{l}</option>)}
                                            </select>
                                        </div>
                                        {[
                                            { label: '🔔 Medicine & appointment reminders', key: 'notifications', val: form.notifications },
                                            { label: '🤳 Enable facial recognition (ER access)', key: 'facialRecog', val: form.facialRecog },
                                        ].map(toggle => (
                                            <div key={toggle.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: '#F9FAFB', borderRadius: '12px' }}>
                                                <span style={{ fontSize: '14px', color: '#1A2332', fontWeight: 500 }}>{toggle.label}</span>
                                                <button onClick={() => setForm(p => ({ ...p, [toggle.key]: !toggle.val }))}
                                                    style={{ width: '48px', height: '26px', borderRadius: '999px', background: toggle.val ? '#1976D2' : '#CBD5E1', border: 'none', cursor: 'pointer', position: 'relative', transition: 'all 0.25s ease' }}>
                                                    <span style={{ position: 'absolute', top: '3px', left: toggle.val ? '25px' : '3px', width: '20px', height: '20px', borderRadius: '50%', background: 'white', transition: 'left 0.25s ease', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <button onClick={nextStep} className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '28px', fontSize: '15px', padding: '14px' }}>
                                {step === STEPS.length - 1 ? 'Complete Setup & See My Health Score 🎉' : `Continue: ${STEPS[step + 1]} →`}
                            </button>
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
        )
    }

    return (
        <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '420px 1fr' }}>
            {/* Left panel */}
            <div style={{ background: 'linear-gradient(135deg, #0A3D6B, #1565C0)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '40px 40px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, opacity: 0.06 }}>
                    {[...Array(4)].map((_, i) => <div key={i} style={{ position: 'absolute', width: 150 + i * 100, height: 150 + i * 100, borderRadius: '50%', border: '1px solid white', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />)}
                </div>
                <div style={{ position: 'relative' }}>
                    <Logo />
                    <div style={{ fontSize: '56px', marginBottom: '24px' }}>🏥</div>
                    <h2 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', color: 'white', fontSize: '28px', fontWeight: 800, marginBottom: '16px', lineHeight: 1.3 }}>
                        Your health,<br />protected & connected.
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', lineHeight: 1.65, marginBottom: '32px' }}>
                        Join 50,000+ patients who trust Sanjeevani for emergency care, hospital booking, and AI health guidance.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {['HIPAA & DPDP compliant data protection', 'AI-matched to government health schemes', 'One tap emergency dispatch, 2 min response'].map(badge => (
                            <div key={badge} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <CheckCircle size={16} color="#00C853" />
                                <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px' }}>{badge}</span>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Testimonial quote */}
                <div style={{ position: 'relative', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', borderRadius: '16px', padding: '20px', border: '1px solid rgba(255,255,255,0.2)' }}>
                    <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px', lineHeight: 1.65, fontStyle: 'italic', marginBottom: '12px' }}>
                        "Sanjeevani had my father's ICU bed booked and his profile sent to Apollo before the ambulance reached me. He survived. This app literally saved his life."
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>👩</div>
                        <div>
                            <p style={{ color: 'white', fontWeight: 700, fontSize: '13px' }}>Priya Sharma</p>
                            <div style={{ display: 'flex', gap: '2px' }}>
                                {[...Array(5)].map((_, i) => <Star key={i} size={10} color="#F59E0B" fill="#F59E0B" />)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right panel */}
            <div style={{ background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px' }}>
                <div style={{ width: '100%', maxWidth: '440px' }}>
                    {/* Tabs */}
                    <div style={{ display: 'flex', background: '#F0F4F8', borderRadius: '12px', padding: '4px', marginBottom: '32px' }}>
                        {(['login', 'signup'] as const).map(t => (
                            <button key={t} onClick={() => setTab(t)}
                                style={{
                                    flex: 1, padding: '10px', borderRadius: '9px', fontWeight: 700, fontSize: '14px',
                                    background: tab === t ? 'white' : 'transparent',
                                    color: tab === t ? '#0A3D6B' : '#4A5568',
                                    border: 'none', cursor: 'pointer', textTransform: 'capitalize',
                                    boxShadow: tab === t ? 'var(--shadow-card)' : 'none',
                                    transition: 'all 0.2s', fontFamily: 'var(--font-jakarta, sans-serif)',
                                }}>{t === 'login' ? 'Login' : 'Sign Up'}</button>
                        ))}
                    </div>

                    <AnimatePresence mode="wait">
                        {tab === 'login' ? (
                            <motion.div key="login" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                                <h2 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: '26px', fontWeight: 800, color: '#1A2332', marginBottom: '6px' }}>Welcome back</h2>
                                <p style={{ color: '#4A5568', fontSize: '14px', marginBottom: '28px' }}>Sign in to access your health dashboard</p>

                                {/* Google button */}
                                <button style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1.5px solid #E8EFF7', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontWeight: 600, fontSize: '14px', color: '#1A2332', cursor: 'pointer', marginBottom: '20px' }}>
                                    <span style={{ fontSize: '18px' }}>🟢</span> Continue with Google
                                </button>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                                    <div style={{ flex: 1, height: '1px', background: '#E8EFF7' }} />
                                    <span style={{ color: '#9CA3AF', fontSize: '12px', fontWeight: 600 }}>or</span>
                                    <div style={{ flex: 1, height: '1px', background: '#E8EFF7' }} />
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
                                    <div style={{ position: 'relative' }}>
                                        <Mail size={15} color="#9CA3AF" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                                        <input className="input-field" style={{ paddingLeft: '42px' }} type="email" placeholder="your@email.com" />
                                    </div>
                                    <div style={{ position: 'relative' }}>
                                        <Lock size={15} color="#9CA3AF" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                                        <input className="input-field" style={{ paddingLeft: '42px', paddingRight: '42px' }} type={showPass ? 'text' : 'password'} placeholder="Password" />
                                        <button onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}>
                                            {showPass ? <EyeOff size={16} color="#9CA3AF" /> : <Eye size={16} color="#9CA3AF" />}
                                        </button>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#4A5568', cursor: 'pointer' }}>
                                        <input type="checkbox" style={{ accentColor: '#0A3D6B' }} /> Remember me
                                    </label>
                                    <a href="#" style={{ fontSize: '13px', color: '#1976D2', fontWeight: 600, textDecoration: 'none' }}>Forgot password?</a>
                                </div>

                                <a href="/dashboard" className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '15px', padding: '14px' }}>
                                    Sign In to Sanjeevani
                                </a>
                            </motion.div>
                        ) : (
                            <motion.div key="signup" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                <h2 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: '26px', fontWeight: 800, color: '#1A2332', marginBottom: '6px' }}>Create your account</h2>
                                <p style={{ color: '#4A5568', fontSize: '14px', marginBottom: '28px' }}>Get your free health profile in 5 minutes</p>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
                                    <div style={{ position: 'relative' }}>
                                        <User size={15} color="#9CA3AF" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                                        <input className="input-field" style={{ paddingLeft: '42px' }} placeholder="Full name" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
                                    </div>
                                    <div style={{ position: 'relative' }}>
                                        <Mail size={15} color="#9CA3AF" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                                        <input className="input-field" style={{ paddingLeft: '42px' }} type="email" placeholder="Email address" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
                                    </div>
                                    <div style={{ position: 'relative' }}>
                                        <Phone size={15} color="#9CA3AF" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                                        <input className="input-field" style={{ paddingLeft: '42px' }} type="tel" placeholder="+91 Phone number" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} />
                                    </div>
                                    <div style={{ position: 'relative' }}>
                                        <Lock size={15} color="#9CA3AF" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                                        <input className="input-field" style={{ paddingLeft: '42px', paddingRight: '42px' }} type={showPass ? 'text' : 'password'} placeholder="Create password" value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} />
                                        <button onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}>
                                            {showPass ? <EyeOff size={16} color="#9CA3AF" /> : <Eye size={16} color="#9CA3AF" />}
                                        </button>
                                    </div>
                                </div>

                                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12px', color: '#4A5568', marginBottom: '20px', cursor: 'pointer' }}>
                                    <input type="checkbox" style={{ accentColor: '#0A3D6B', marginTop: '2px' }} />
                                    I agree to Sanjeevani's <a href="#" style={{ color: '#1976D2' }}>Terms of Service</a> and <a href="#" style={{ color: '#1976D2' }}>Privacy Policy</a>
                                </label>

                                <button onClick={handleSignup} className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '15px', padding: '14px' }}>
                                    Create Account & Build Health Profile →
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <style>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 420px"] {
            grid-template-columns: 1fr !important;
          }
          div[style*="flex-direction: column; justifyContent: space-between"] {
            display: none !important;
          }
        }
      `}</style>
        </div>
    )
}
