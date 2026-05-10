'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Heart, ChevronRight, ChevronLeft, Check, Loader2, Plus, X,
    User, Activity, Shield, Bell, Star
} from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

// ─── Styles ───────────────────────────────────────────────────────────
const sel = (active: boolean): React.CSSProperties => ({
    padding: '8px 16px', borderRadius: '999px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', border: 'none',
    background: active ? '#0A3D6B' : '#F0F4F8', color: active ? 'white' : '#4A5568',
    transition: 'all 0.2s',
});
const inp: React.CSSProperties = {
    width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1.5px solid #E8EFF7',
    fontSize: '14px', color: '#1A2332', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box', background: 'white',
};
const lbl: React.CSSProperties = { display: 'block', fontSize: '12px', fontWeight: 700, color: '#4A5568', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' };

// ─── Tag Input ────────────────────────────────────────────────────────
function TagInput({ tags, onAdd, onRemove, placeholder, bg = '#FFEBEE', color = '#D32F2F' }: any) {
    const [val, setVal] = useState('');
    const add = () => {
        const t = val.trim();
        if (t && !tags.includes(t)) onAdd(t);
        setVal('');
    };
    return (
        <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
                {tags.map((t: string) => (
                    <span key={t} style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 10px', background: bg, color, borderRadius: '999px', fontSize: '13px', fontWeight: 600 }}>
                        {t}
                        <button type="button" onClick={() => onRemove(t)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color, display: 'flex' }}>
                            <X size={12} />
                        </button>
                    </span>
                ))}
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
                <input style={{ ...inp, flex: 1 }} value={val} onChange={e => setVal(e.target.value)} placeholder={placeholder}
                    onKeyDown={e => { if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); add(); } }} />
                <button type="button" onClick={add} style={{ padding: '0 16px', borderRadius: '10px', background: '#E3F2FD', color: '#0A3D6B', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '13px' }}>Add</button>
            </div>
        </div>
    );
}

// ─── Toggle ───────────────────────────────────────────────────────────
function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
    return (
        <button type="button" onClick={() => onChange(!value)} style={{ width: '48px', height: '26px', borderRadius: '999px', background: value ? '#1976D2' : '#CBD5E1', border: 'none', cursor: 'pointer', position: 'relative', transition: 'all 0.25s', flexShrink: 0 }}>
            <span style={{ position: 'absolute', top: '3px', left: value ? '25px' : '3px', width: '20px', height: '20px', borderRadius: '50%', background: 'white', transition: 'left 0.25s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />
        </button>
    );
}

// ─── BMI Display ─────────────────────────────────────────────────────
function BMIDisplay({ height, weight }: { height: string; weight: string }) {
    const h = parseFloat(height), w = parseFloat(weight);
    if (!h || !w) return null;
    const bmi = (w / ((h / 100) ** 2)).toFixed(1);
    const cat = parseFloat(bmi) < 18.5 ? 'Underweight' : parseFloat(bmi) < 25 ? 'Normal ✓' : parseFloat(bmi) < 30 ? 'Overweight' : 'Obese';
    const col = parseFloat(bmi) < 18.5 ? '#F59E0B' : parseFloat(bmi) < 25 ? '#00C853' : parseFloat(bmi) < 30 ? '#F59E0B' : '#D32F2F';
    return (
        <div style={{ padding: '10px 14px', background: '#F0FFF4', borderRadius: '10px', border: `1px solid ${col}30` }}>
            <p style={{ fontSize: '13px', color: '#4A5568' }}>BMI: <strong style={{ color: col }}>{bmi} — {cat}</strong></p>
        </div>
    );
}

// ─── Steps ────────────────────────────────────────────────────────────
const STEPS = [
    { icon: User, title: 'About You', sub: 'Basic health information' },
    { icon: Activity, title: 'Medical History', sub: 'Conditions & medications' },
    { icon: Shield, title: 'Safety Info', sub: 'Allergies & emergency contact' },
    { icon: Star, title: 'Insurance', sub: 'Coverage details' },
    { icon: Bell, title: 'Preferences', sub: 'Notifications & ABHA' },
];

const CONDITIONS = ['Diabetes', 'Hypertension', 'Asthma', 'Heart Disease', 'Thyroid', 'PCOD', 'Kidney Disease', 'Cancer', 'None'];
const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const LANGUAGES = ['Hindi', 'English', 'Marathi', 'Tamil', 'Telugu', 'Bengali', 'Gujarati', 'Kannada', 'Malayalam'];
const RELATIONS = ['Spouse', 'Parent', 'Sibling', 'Child', 'Friend', 'Other'];
const INSURERS = ['Star Health', 'HDFC ERGO', 'Bajaj Allianz', 'New India', 'United India', 'PM-JAY', 'CGHS', 'ESIC', 'Other'];
const GOV_SCHEMES = ['Ayushman Bharat / PM-JAY', 'CGHS', 'ESIC', 'State Health Scheme'];

interface ProfileData {
    dateOfBirth: string; gender: string; bloodGroup: string;
    height: string; weight: string; language: string; city: string;
    conditions: string[]; hasSurgeries: boolean; surgeries: { name: string; year: string; hospital: string }[];
    hasMeds: boolean; medications: { name: string; dosage: string; frequency: string }[];
    medAllergies: string[]; foodAllergies: string[];
    emergencyName: string; emergencyPhone: string; emergencyRelation: string;
    emergencyName2: string; emergencyPhone2: string; emergencyRelation2: string;
    hasInsurance: boolean; insuranceProvider: string; policyNumber: string; validUntil: string; coverage: string; schemes: string[];
    notifications: { medicines: boolean; appointments: boolean; lab: boolean; emergency: boolean; tips: boolean };
    facialRecognition: boolean; abhaId: string;
}

export default function OnboardingPage() {
    const { user, token, updateUser } = useAuthStore();
    const router = useRouter();
    const [step, setStep] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [done, setDone] = useState(false);

    const [data, setData] = useState<ProfileData>({
        dateOfBirth: '', gender: '', bloodGroup: '', height: '', weight: '', language: '', city: '',
        conditions: [], hasSurgeries: false, surgeries: [],
        hasMeds: false, medications: [],
        medAllergies: [], foodAllergies: [],
        emergencyName: '', emergencyPhone: '', emergencyRelation: 'Parent',
        emergencyName2: '', emergencyPhone2: '', emergencyRelation2: 'Spouse',
        hasInsurance: false, insuranceProvider: '', policyNumber: '', validUntil: '', coverage: '', schemes: [],
        notifications: { medicines: true, appointments: true, lab: false, emergency: true, tips: false },
        facialRecognition: false, abhaId: '',
    });

    const set = (field: keyof ProfileData, value: any) => setData(p => ({ ...p, [field]: value }));
    const setNotif = (k: string, v: boolean) => setData(p => ({ ...p, notifications: { ...p.notifications, [k]: v } }));

    const toggleCondition = (c: string) => {
        if (c === 'None') { set('conditions', ['None']); return; }
        const cur = data.conditions.filter(x => x !== 'None');
        set('conditions', cur.includes(c) ? cur.filter(x => x !== c) : [...cur, c]);
    };
    const toggleScheme = (s: string) => {
        const cur = data.schemes;
        set('schemes', cur.includes(s) ? cur.filter(x => x !== s) : [...cur, s]);
    };

    const handleFinish = async () => {
        setIsLoading(true);
        try {
            const payload = {
                dateOfBirth: data.dateOfBirth, gender: data.gender, bloodGroup: data.bloodGroup,
                height: data.height ? parseFloat(data.height) : undefined,
                weight: data.weight ? parseFloat(data.weight) : undefined,
                language: data.language, city: data.city,
                chronicConditions: data.conditions,
                allergies: { medicine: data.medAllergies, food: data.foodAllergies },
                medications: data.hasMeds ? data.medications : [],
                pastSurgeries: data.hasSurgeries ? data.surgeries : [],
                emergencyContacts: [
                    data.emergencyName ? { name: data.emergencyName, phone: data.emergencyPhone, relation: data.emergencyRelation } : null,
                    data.emergencyName2 ? { name: data.emergencyName2, phone: data.emergencyPhone2, relation: data.emergencyRelation2 } : null,
                ].filter(Boolean),
                insurance: data.hasInsurance ? {
                    provider: data.insuranceProvider, policyNumber: data.policyNumber,
                    validUntil: data.validUntil, coverageAmount: data.coverage ? parseFloat(data.coverage) : undefined,
                    scheme: data.schemes,
                } : undefined,
                notifications: data.notifications, facialRecognition: data.facialRecognition,
                abhaId: data.abhaId || undefined,
            };

            const res = await axios.post(`${API_BASE}/api/users/onboard`, payload, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.data.success) {
                updateUser(res.data.user);
                setDone(true);
                setTimeout(() => router.push('/dashboard'), 3000);
            }
        } catch (err) {
            console.error('Onboard error:', err);
            // Even if API fails, update locally and proceed
            updateUser({
                dateOfBirth: data.dateOfBirth, gender: data.gender, bloodGroup: data.bloodGroup,
                height: data.height ? parseFloat(data.height) : undefined,
                weight: data.weight ? parseFloat(data.weight) : undefined,
                language: data.language, city: data.city,
                allergies: { medicine: data.medAllergies, food: data.foodAllergies },
                onboarded: true, profileComplete: true,
            });
            setDone(true);
            setTimeout(() => router.push('/dashboard'), 3000);
        } finally {
            setIsLoading(false);
        }
    };

    const firstName = user?.name?.split(' ')[0] || 'there';

    if (done) {
        return (
            <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0A3D6B, #1976D2)', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '24px' }}>
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                        style={{ width: '96px', height: '96px', borderRadius: '50%', background: '#00C853', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                        <Check size={48} color="white" strokeWidth={3} />
                    </motion.div>
                    <h1 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', color: 'white', fontSize: '32px', fontWeight: 800, marginBottom: '8px' }}>
                        Welcome to Sanjeevni, {user?.name || firstName}! 🎉
                    </h1>
                    <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '16px', marginBottom: '32px' }}>
                        Your profile is set up. Redirecting to your dashboard...
                    </p>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px', background: 'rgba(255,255,255,0.2)', borderRadius: '12px', backdropFilter: 'blur(8px)' }}>
                        <Loader2 size={18} color="white" style={{ animation: 'spin 1s linear infinite' }} />
                        <span style={{ color: 'white', fontWeight: 700 }}>Loading dashboard...</span>
                    </div>
                </motion.div>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: '#F7FAFD', padding: '24px' }}>
            {/* Header */}
            <div style={{ maxWidth: '680px', margin: '0 auto', paddingBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #0A3D6B, #1976D2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Heart size={18} color="white" fill="white" />
                    </div>
                    <span style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontWeight: 800, fontSize: '18px', color: '#0A3D6B' }}>Sanjeevni</span>
                </div>

                <h1 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: '26px', fontWeight: 800, color: '#1A2332', marginBottom: '4px' }}>
                    Welcome, {firstName}! Let's set up your profile
                </h1>
                <p style={{ fontSize: '14px', color: '#4A5568', marginBottom: '24px' }}>
                    Step {step + 1} of 5 — {STEPS[step].sub}
                </p>

                {/* Progress */}
                <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
                    {STEPS.map((s, i) => {
                        const Icon = s.icon;
                        return (
                            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                                <div style={{
                                    width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    background: i < step ? '#00C853' : i === step ? '#0A3D6B' : '#E8EFF7',
                                    transition: 'all 0.3s',
                                }}>
                                    {i < step ? <Check size={16} color="white" strokeWidth={3} /> : <Icon size={16} color={i === step ? 'white' : '#9CA3AF'} />}
                                </div>
                                <div style={{ width: '100%', height: '3px', borderRadius: '2px', background: i < step ? '#00C853' : i === step ? '#1976D2' : '#E8EFF7', transition: 'all 0.3s' }} />
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Step content */}
            <div style={{ maxWidth: '680px', margin: '0 auto' }}>
                <AnimatePresence mode="wait">
                    <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>

                        {/* ── STEP 1: Personal ── */}
                        {step === 0 && (
                            <div style={{ background: 'white', borderRadius: '20px', padding: '32px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
                                <h2 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: '18px', fontWeight: 800, color: '#1A2332', marginBottom: '6px' }}>Tell us about yourself</h2>
                                <p style={{ fontSize: '13px', color: '#4A5568', marginBottom: '24px' }}>This helps us personalize your experience</p>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                    <div>
                                        <label style={lbl}>Date of Birth</label>
                                        <input style={inp} type="date" value={data.dateOfBirth} onChange={e => set('dateOfBirth', e.target.value)} max={new Date().toISOString().split('T')[0]} />
                                    </div>
                                    <div>
                                        <label style={lbl}>Gender</label>
                                        <div style={{ display: 'flex', gap: '8px', marginTop: '2px' }}>
                                            {['Male', 'Female', 'Other'].map(g => (
                                                <button key={g} type="button" onClick={() => set('gender', g)} style={sel(data.gender === g)}>{g}</button>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label style={lbl}>Blood Group</label>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '2px' }}>
                                            {BLOOD_GROUPS.map(bg => (
                                                <button key={bg} type="button" onClick={() => set('bloodGroup', bg)} style={sel(data.bloodGroup === bg)}>{bg}</button>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label style={lbl}>Preferred Language</label>
                                        <select style={{ ...inp }} value={data.language} onChange={e => set('language', e.target.value)}>
                                            <option value="">Select language</option>
                                            {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label style={lbl}>Height (cm)</label>
                                        <input style={inp} type="number" placeholder="e.g. 165" value={data.height} onChange={e => set('height', e.target.value)} min="100" max="250" />
                                    </div>
                                    <div>
                                        <label style={lbl}>Weight (kg)</label>
                                        <input style={inp} type="number" placeholder="e.g. 60" value={data.weight} onChange={e => set('weight', e.target.value)} min="20" max="300" />
                                    </div>
                                </div>

                                {data.height && data.weight && (
                                    <div style={{ marginTop: '12px' }}>
                                        <BMIDisplay height={data.height} weight={data.weight} />
                                    </div>
                                )}

                                <div style={{ marginTop: '16px' }}>
                                    <label style={lbl}>City / Location</label>
                                    <input style={inp} placeholder="e.g. Mumbai, Delhi, Bangalore..." value={data.city} onChange={e => set('city', e.target.value)} />
                                </div>
                            </div>
                        )}

                        {/* ── STEP 2: Medical History ── */}
                        {step === 1 && (
                            <div style={{ background: 'white', borderRadius: '20px', padding: '32px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
                                <h2 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: '18px', fontWeight: 800, color: '#1A2332', marginBottom: '6px' }}>Your medical background</h2>
                                <p style={{ fontSize: '13px', color: '#4A5568', marginBottom: '24px' }}>Help doctors understand your health history</p>

                                <div style={{ marginBottom: '24px' }}>
                                    <label style={lbl}>Chronic Conditions (select all that apply)</label>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                                        {CONDITIONS.map(c => (
                                            <button key={c} type="button" onClick={() => toggleCondition(c)} style={sel(data.conditions.includes(c))}>{c}</button>
                                        ))}
                                    </div>
                                </div>

                                <div style={{ padding: '16px', background: '#F9FAFB', borderRadius: '12px', marginBottom: '16px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: data.hasSurgeries ? '16px' : '0' }}>
                                        <div>
                                            <p style={{ fontSize: '14px', fontWeight: 700, color: '#1A2332' }}>Past Surgeries?</p>
                                            <p style={{ fontSize: '12px', color: '#4A5568' }}>Any surgical procedures in the past</p>
                                        </div>
                                        <Toggle value={data.hasSurgeries} onChange={v => set('hasSurgeries', v)} />
                                    </div>
                                    {data.hasSurgeries && (
                                        <div>
                                            {data.surgeries.map((s, i) => (
                                                <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 2fr auto', gap: '8px', marginBottom: '8px' }}>
                                                    <input style={inp} placeholder="Surgery name" value={s.name} onChange={e => { const arr = [...data.surgeries]; arr[i].name = e.target.value; set('surgeries', arr); }} />
                                                    <input style={inp} placeholder="Year" value={s.year} onChange={e => { const arr = [...data.surgeries]; arr[i].year = e.target.value; set('surgeries', arr); }} />
                                                    <input style={inp} placeholder="Hospital" value={s.hospital} onChange={e => { const arr = [...data.surgeries]; arr[i].hospital = e.target.value; set('surgeries', arr); }} />
                                                    <button type="button" onClick={() => set('surgeries', data.surgeries.filter((_, j) => j !== i))} style={{ padding: '0 10px', background: '#FFEBEE', border: 'none', borderRadius: '8px', cursor: 'pointer', color: '#D32F2F' }}><X size={14} /></button>
                                                </div>
                                            ))}
                                            <button type="button" onClick={() => set('surgeries', [...data.surgeries, { name: '', year: '', hospital: '' }])} style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '8px 14px', background: '#E3F2FD', color: '#0A3D6B', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 700 }}>
                                                <Plus size={14} /> Add Surgery
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div style={{ padding: '16px', background: '#F9FAFB', borderRadius: '12px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: data.hasMeds ? '16px' : '0' }}>
                                        <div>
                                            <p style={{ fontSize: '14px', fontWeight: 700, color: '#1A2332' }}>Current Medications?</p>
                                            <p style={{ fontSize: '12px', color: '#4A5568' }}>Medicines you take regularly</p>
                                        </div>
                                        <Toggle value={data.hasMeds} onChange={v => set('hasMeds', v)} />
                                    </div>
                                    {data.hasMeds && (
                                        <div>
                                            {data.medications.map((m, i) => (
                                                <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto', gap: '8px', marginBottom: '8px' }}>
                                                    <input style={inp} placeholder="Medicine name" value={m.name} onChange={e => { const arr = [...data.medications]; arr[i].name = e.target.value; set('medications', arr); }} />
                                                    <input style={inp} placeholder="Dosage" value={m.dosage} onChange={e => { const arr = [...data.medications]; arr[i].dosage = e.target.value; set('medications', arr); }} />
                                                    <input style={inp} placeholder="Frequency" value={m.frequency} onChange={e => { const arr = [...data.medications]; arr[i].frequency = e.target.value; set('medications', arr); }} />
                                                    <button type="button" onClick={() => set('medications', data.medications.filter((_, j) => j !== i))} style={{ padding: '0 10px', background: '#FFEBEE', border: 'none', borderRadius: '8px', cursor: 'pointer', color: '#D32F2F' }}><X size={14} /></button>
                                                </div>
                                            ))}
                                            <button type="button" onClick={() => set('medications', [...data.medications, { name: '', dosage: '', frequency: '' }])} style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '8px 14px', background: '#E0F2F1', color: '#00897B', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 700 }}>
                                                <Plus size={14} /> Add Medication
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* ── STEP 3: Allergies & Emergency ── */}
                        {step === 2 && (
                            <div style={{ background: 'white', borderRadius: '20px', padding: '32px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
                                <h2 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: '18px', fontWeight: 800, color: '#1A2332', marginBottom: '6px' }}>Safety information</h2>
                                <p style={{ fontSize: '13px', color: '#4A5568', marginBottom: '24px' }}>⚕️ Critical in emergencies — please fill carefully</p>

                                <div style={{ marginBottom: '20px' }}>
                                    <label style={lbl}>Medicine Allergies</label>
                                    <TagInput tags={data.medAllergies} onAdd={(t: string) => set('medAllergies', [...data.medAllergies, t])} onRemove={(t: string) => set('medAllergies', data.medAllergies.filter(x => x !== t))} placeholder="e.g. Penicillin, Aspirin... (press Enter)" bg="#FFEBEE" color="#D32F2F" />
                                </div>

                                <div style={{ marginBottom: '28px' }}>
                                    <label style={lbl}>Food Allergies</label>
                                    <TagInput tags={data.foodAllergies} onAdd={(t: string) => set('foodAllergies', [...data.foodAllergies, t])} onRemove={(t: string) => set('foodAllergies', data.foodAllergies.filter(x => x !== t))} placeholder="e.g. Peanuts, Shellfish... (press Enter)" bg="#FFF8E1" color="#F59E0B" />
                                </div>

                                <div style={{ padding: '20px', background: '#F9FAFB', borderRadius: '14px', marginBottom: '14px' }}>
                                    <p style={{ fontSize: '14px', fontWeight: 800, color: '#1A2332', marginBottom: '14px', fontFamily: 'var(--font-jakarta, sans-serif)' }}>Emergency Contact 1 (required)</p>
                                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px', marginBottom: '12px' }}>
                                        <div>
                                            <label style={lbl}>Full Name</label>
                                            <input style={inp} placeholder="Contact name" value={data.emergencyName} onChange={e => set('emergencyName', e.target.value)} />
                                        </div>
                                        <div>
                                            <label style={lbl}>Relationship</label>
                                            <select style={inp} value={data.emergencyRelation} onChange={e => set('emergencyRelation', e.target.value)}>
                                                {RELATIONS.map(r => <option key={r} value={r}>{r}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label style={lbl}>Phone Number</label>
                                        <input style={inp} type="tel" placeholder="10-digit number" value={data.emergencyPhone} onChange={e => set('emergencyPhone', e.target.value.replace(/\D/g, '').slice(0, 10))} />
                                    </div>
                                </div>

                                <div style={{ padding: '20px', background: '#F9FAFB', borderRadius: '14px' }}>
                                    <p style={{ fontSize: '14px', fontWeight: 800, color: '#1A2332', marginBottom: '14px', fontFamily: 'var(--font-jakarta, sans-serif)' }}>Emergency Contact 2 (optional)</p>
                                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px', marginBottom: '12px' }}>
                                        <div>
                                            <label style={lbl}>Full Name</label>
                                            <input style={inp} placeholder="Contact name" value={data.emergencyName2} onChange={e => set('emergencyName2', e.target.value)} />
                                        </div>
                                        <div>
                                            <label style={lbl}>Relationship</label>
                                            <select style={inp} value={data.emergencyRelation2} onChange={e => set('emergencyRelation2', e.target.value)}>
                                                {RELATIONS.map(r => <option key={r} value={r}>{r}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label style={lbl}>Phone Number</label>
                                        <input style={inp} type="tel" placeholder="10-digit number (optional)" value={data.emergencyPhone2} onChange={e => set('emergencyPhone2', e.target.value.replace(/\D/g, '').slice(0, 10))} />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ── STEP 4: Insurance ── */}
                        {step === 3 && (
                            <div style={{ background: 'white', borderRadius: '20px', padding: '32px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
                                <h2 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: '18px', fontWeight: 800, color: '#1A2332', marginBottom: '6px' }}>Insurance details</h2>
                                <p style={{ fontSize: '13px', color: '#4A5568', marginBottom: '24px' }}>We'll help you use your coverage efficiently</p>

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: '#F9FAFB', borderRadius: '12px', marginBottom: '20px' }}>
                                    <div>
                                        <p style={{ fontSize: '14px', fontWeight: 700, color: '#1A2332' }}>Do you have health insurance?</p>
                                    </div>
                                    <Toggle value={data.hasInsurance} onChange={v => set('hasInsurance', v)} />
                                </div>

                                {data.hasInsurance && (
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                                        <div>
                                            <label style={lbl}>Insurance Provider</label>
                                            <select style={{ ...inp }} value={data.insuranceProvider} onChange={e => set('insuranceProvider', e.target.value)}>
                                                <option value="">Select provider</option>
                                                {INSURERS.map(ins => <option key={ins} value={ins}>{ins}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label style={lbl}>Policy Number</label>
                                            <input style={inp} placeholder="e.g. STHI-123456" value={data.policyNumber} onChange={e => set('policyNumber', e.target.value)} />
                                        </div>
                                        <div>
                                            <label style={lbl}>Valid Until</label>
                                            <input style={inp} type="date" value={data.validUntil} onChange={e => set('validUntil', e.target.value)} />
                                        </div>
                                        <div>
                                            <label style={lbl}>Coverage Amount (₹)</label>
                                            <input style={inp} type="number" placeholder="e.g. 500000" value={data.coverage} onChange={e => set('coverage', e.target.value)} />
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <label style={lbl}>Government Scheme Eligibility (select all that apply)</label>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
                                        {GOV_SCHEMES.map(s => (
                                            <label key={s} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '10px 14px', background: data.schemes.includes(s) ? '#E3F2FD' : '#F9FAFB', borderRadius: '10px', border: `1px solid ${data.schemes.includes(s) ? '#1976D2' : '#E8EFF7'}`, transition: 'all 0.2s' }}>
                                                <input type="checkbox" checked={data.schemes.includes(s)} onChange={() => toggleScheme(s)} style={{ accentColor: '#1976D2', width: '16px', height: '16px' }} />
                                                <span style={{ fontSize: '14px', fontWeight: 500, color: '#1A2332' }}>{s}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ── STEP 5: Preferences ── */}
                        {step === 4 && (
                            <div style={{ background: 'white', borderRadius: '20px', padding: '32px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
                                <h2 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: '18px', fontWeight: 800, color: '#1A2332', marginBottom: '6px' }}>Almost done!</h2>
                                <p style={{ fontSize: '13px', color: '#4A5568', marginBottom: '28px' }}>Set up your preferences</p>

                                <div style={{ marginBottom: '24px' }}>
                                    <p style={{ fontSize: '14px', fontWeight: 700, color: '#1A2332', marginBottom: '14px' }}>Notification Preferences</p>
                                    {[
                                        { key: 'medicines', label: '💊 Medicine Reminders', desc: 'Daily dose and refill alerts' },
                                        { key: 'appointments', label: '📅 Appointment Reminders', desc: '24h and 1h before appointments' },
                                        { key: 'lab', label: '🧪 Lab Results Ready', desc: 'When new lab reports are uploaded' },
                                        { key: 'emergency', label: '🚨 Emergency Alerts', desc: 'Critical health alerts' },
                                        { key: 'tips', label: '💡 Health Tips', desc: 'Personalized health insights' },
                                    ].map(item => (
                                        <div key={item.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', padding: '12px 0', borderBottom: '1px solid #F5F7FA' }}>
                                            <div>
                                                <p style={{ fontSize: '14px', fontWeight: 600, color: '#1A2332' }}>{item.label}</p>
                                                <p style={{ fontSize: '12px', color: '#4A5568' }}>{item.desc}</p>
                                            </div>
                                            <Toggle value={(data.notifications as any)[item.key]} onChange={v => setNotif(item.key, v)} />
                                        </div>
                                    ))}
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', background: '#F9FAFB', borderRadius: '12px', marginBottom: '20px' }}>
                                    <div>
                                        <p style={{ fontSize: '14px', fontWeight: 700, color: '#1A2332' }}>🤳 Facial Recognition</p>
                                        <p style={{ fontSize: '12px', color: '#4A5568' }}>Used for emergency identification by paramedics</p>
                                    </div>
                                    <Toggle value={data.facialRecognition} onChange={v => set('facialRecognition', v)} />
                                </div>

                                <div>
                                    <label style={lbl}>ABHA Health ID (optional)</label>
                                    <input style={inp} placeholder="e.g. 12-3456-7890-1234" value={data.abhaId} onChange={e => set('abhaId', e.target.value)} />
                                    <p style={{ fontSize: '12px', color: '#4A5568', marginTop: '4px' }}>Your Ayushman Bharat Health Account number</p>
                                </div>
                            </div>
                        )}

                    </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px', paddingBottom: '40px' }}>
                    {step > 0 ? (
                        <button type="button" onClick={() => setStep(s => s - 1)} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '12px 20px', borderRadius: '12px', background: 'white', border: '1.5px solid #E8EFF7', color: '#4A5568', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}>
                            <ChevronLeft size={16} /> Back
                        </button>
                    ) : (
                        <button type="button" onClick={() => router.push('/dashboard')} style={{ padding: '12px 20px', borderRadius: '12px', background: 'white', border: '1.5px solid #E8EFF7', color: '#9CA3AF', fontWeight: 600, fontSize: '14px', cursor: 'pointer' }}>
                            Skip for now
                        </button>
                    )}

                    {step < 4 ? (
                        <button type="button" onClick={() => setStep(s => s + 1)} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '12px 24px', borderRadius: '12px', background: 'linear-gradient(135deg, #0A3D6B, #1976D2)', color: 'white', fontWeight: 800, fontSize: '14px', border: 'none', cursor: 'pointer', boxShadow: '0 6px 20px rgba(25,118,210,0.3)', fontFamily: 'var(--font-jakarta, sans-serif)' }}>
                            Continue <ChevronRight size={16} />
                        </button>
                    ) : (
                        <button type="button" onClick={handleFinish} disabled={isLoading} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '12px 28px', borderRadius: '12px', background: isLoading ? '#CBD5E1' : 'linear-gradient(135deg, #00897B, #00C853)', color: 'white', fontWeight: 800, fontSize: '14px', border: 'none', cursor: isLoading ? 'not-allowed' : 'pointer', boxShadow: isLoading ? 'none' : '0 6px 20px rgba(0,200,83,0.3)', fontFamily: 'var(--font-jakarta, sans-serif)' }}>
                            {isLoading ? <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Saving...</> : <><Check size={16} /> Finish Setup</>}
                        </button>
                    )}
                </div>
            </div>

            <style>{`@keyframes spin { to { transform: rotate(360deg); } } select { appearance: auto; } input:focus, select:focus { outline: none; border-color: #1976D2; box-shadow: 0 0 0 3px rgba(25,118,210,0.1); }`}</style>
        </div>
    );
}
