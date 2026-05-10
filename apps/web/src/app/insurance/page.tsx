'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Shield, AlertCircle, FileText, CheckCircle, Search, HelpCircle, Activity, CreditCard } from 'lucide-react'
import { useAuthStore } from '@/store/useAuthStore'

const TABS = ['My Insurance', 'Claims', 'Govt Schemes']

function CardDecoration() {
    return (
        <div style={{ position: 'absolute', right: '-40px', top: '-40px', width: '200px', height: '200px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', border: '40px solid rgba(255,255,255,0.05)' }} />
    )
}

export default function InsurancePage() {
    const [activeTab, setActiveTab] = useState(0)
    const [hospQuery, setHospQuery] = useState('')
    const { user } = useAuthStore()

    return (
        <div style={{ minHeight: '100vh', background: '#F7FAFD' }}>
            {/* Header */}
            <div style={{ background: 'linear-gradient(135deg, #0A3D6B, #1976D2)', padding: '28px 0' }}>
                <div className="container-xl" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <a href="/dashboard" style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ArrowLeft size={18} color="white" />
                    </a>
                    <div style={{ flex: 1 }}>
                        <h1 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', color: 'white', fontSize: '22px', fontWeight: 800 }}>Insurance & Finance</h1>
                        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '13px' }}>Manage policies, track claims, auto-check coverage</p>
                    </div>
                </div>
            </div>

            <div style={{ background: 'white', borderBottom: '1px solid #E8EFF7', position: 'sticky', top: 0, zIndex: 10 }}>
                <div className="container-xl" style={{ display: 'flex', gap: '0', overflowX: 'auto' }}>
                    {TABS.map((tab, i) => (
                        <button key={tab} onClick={() => setActiveTab(i)} style={{
                            padding: '16px 20px', fontWeight: 700, fontSize: '14px', whiteSpace: 'nowrap',
                            color: activeTab === i ? '#0A3D6B' : '#4A5568', background: 'none', border: 'none', cursor: 'pointer',
                            borderBottom: activeTab === i ? '2px solid #1976D2' : '2px solid transparent', transition: 'all 0.2s',
                        }}>{tab}</button>
                    ))}
                </div>
            </div>

            <div className="container-xl" style={{ padding: '32px 24px' }}>
                <AnimatePresence mode="wait">
                    {/* My Insurance */}
                    {activeTab === 0 && (
                        <motion.div key="my-insurance" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                            {/* Virtual Cards */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '40px' }}>
                                <div style={{ background: 'linear-gradient(135deg, #FF6F00, #F57F17)', borderRadius: '20px', padding: '28px', color: 'white', position: 'relative', overflow: 'hidden', boxShadow: '0 12px 24px rgba(245, 127, 23, 0.2)' }}>
                                    <CardDecoration />
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px', position: 'relative' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <Shield size={24} color="white" />
                                            <span style={{ fontSize: '18px', fontWeight: 800, fontFamily: 'var(--font-jakarta, sans-serif)' }}>PM-JAY</span>
                                        </div>
                                        <span style={{ padding: '4px 10px', background: 'rgba(255,255,255,0.2)', borderRadius: '8px', fontSize: '11px', fontWeight: 700 }}>Ayushman Bharat</span>
                                    </div>
                                    <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>ABHA ID</p>
                                    <p style={{ fontSize: '20px', fontFamily: 'var(--font-jetbrains, monospace)', fontWeight: 600, letterSpacing: '0.1em', marginBottom: '24px', textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>14-2394-0012-7X</p>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div>
                                            <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', marginBottom: '2px' }}>Patient Name</p>
                                            <p style={{ fontSize: '14px', fontWeight: 700 }}>{user?.name || 'Complete Profile'}</p>
                                        </div>
                                        <div>
                                            <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', marginBottom: '2px' }}>Coverage Limit</p>
                                            <p style={{ fontSize: '14px', fontWeight: 800 }}>₹5,00,000</p>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ background: 'linear-gradient(135deg, #1A2332, #4A5568)', borderRadius: '20px', padding: '28px', color: 'white', position: 'relative', overflow: 'hidden', boxShadow: '0 12px 24px rgba(26, 35, 50, 0.2)' }}>
                                    <CardDecoration />
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px', position: 'relative' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <span style={{ fontSize: '24px' }}>🏥</span>
                                            <span style={{ fontSize: '18px', fontWeight: 800, fontFamily: 'var(--font-jakarta, sans-serif)' }}>HDFC ERGO</span>
                                        </div>
                                        <span style={{ padding: '4px 10px', background: 'rgba(0,200,83,0.2)', borderRadius: '8px', fontSize: '11px', fontWeight: 700, color: '#00C853' }}>Active</span>
                                    </div>
                                    <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>Policy No.</p>
                                    <p style={{ fontSize: '20px', fontFamily: 'var(--font-jetbrains, monospace)', fontWeight: 600, letterSpacing: '0.1em', marginBottom: '24px', textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>HDF/23/00918</p>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div>
                                            <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', marginBottom: '2px' }}>Valid Thru</p>
                                            <p style={{ fontSize: '14px', fontWeight: 700 }}>04/26</p>
                                        </div>
                                        <div>
                                            <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', marginBottom: '2px' }}>Base Cover</p>
                                            <p style={{ fontSize: '14px', fontWeight: 800 }}>₹10,00,000</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Check hospital compatibility */}
                            <div className="card" style={{ marginBottom: '24px' }}>
                                <h3 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: '18px', fontWeight: 800, color: '#1A2332', marginBottom: '8px' }}>Check Hospital Compatibility</h3>
                                <p style={{ fontSize: '14px', color: '#4A5568', marginBottom: '16px' }}>See if your insurance is accepted at a specific hospital before booking.</p>
                                <div style={{ display: 'flex', gap: '12px', flexDirection: 'column' }}>
                                    <div style={{ position: 'relative' }}>
                                        <Search size={18} color="#9CA3AF" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                                        <input className="input-field" placeholder="e.g. Apollo Hospital, Fortis..." value={hospQuery} onChange={e => setHospQuery(e.target.value)} style={{ paddingLeft: '44px', height: '48px', fontSize: '15px' }} />
                                    </div>
                                    {hospQuery.length > 2 && (
                                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', background: '#E8F5E9', borderRadius: '12px', border: '1px solid #C8E6C9' }}>
                                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#00C853', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CheckCircle size={16} color="white" /></div>
                                            <div>
                                                <p style={{ fontWeight: 700, color: '#1B5E20', fontSize: '14px', marginBottom: '2px' }}>Yes, HDFC ERGO is accepted</p>
                                                <p style={{ fontSize: '12px', color: '#2E7D32' }}>Cashless treatment available at {hospQuery}</p>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            </div>

                            {/* Coverage details */}
                            <div className="card">
                                <h3 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: '18px', fontWeight: 800, color: '#1A2332', marginBottom: '16px' }}>Coverage Details (HDFC ERGO)</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                                    {[
                                        { label: 'Room Rent', val: 'No Sub-limit (Any Room)' },
                                        { label: 'OPD Consultations', val: 'Up to ₹5,000/year' },
                                        { label: 'Pre/Post Hospitalization', val: '60 Days / 180 Days' },
                                        { label: 'Maternity Cover', val: 'Waiting period: 2 years' },
                                    ].map(f => (
                                        <div key={f.label} style={{ padding: '16px', background: '#F9FAFB', borderRadius: '12px' }}>
                                            <p style={{ fontSize: '12px', color: '#4A5568', marginBottom: '4px' }}>{f.label}</p>
                                            <p style={{ fontSize: '14px', fontWeight: 700, color: '#1A2332' }}>{f.val}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Claims Tracker */}
                    {activeTab === 1 && (
                        <motion.div key="claims" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                                <h3 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: '18px', fontWeight: 800, color: '#1A2332' }}>Active Claims</h3>
                                <button className="btn-primary" style={{ padding: '8px 16px', fontSize: '13px' }}>+ File New Claim</button>
                            </div>

                            <div className="card" style={{ padding: '24px', borderLeft: '4px solid #F59E0B' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                                            <h4 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: '16px', fontWeight: 800, color: '#1A2332' }}>HDFC ERGO Cashless Request</h4>
                                            <span className="badge badge-amber" style={{ fontSize: '11px' }}>In Progress</span>
                                        </div>
                                        <p style={{ fontSize: '13px', color: '#4A5568' }}>Claim ID: CLM-2403-8891 • Max Super Speciality Hospital</p>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <p style={{ fontSize: '12px', color: '#4A5568', textTransform: 'uppercase', marginBottom: '2px' }}>Amount Claimed</p>
                                        <p style={{ fontSize: '18px', fontWeight: 800, color: '#1A2332', fontFamily: 'var(--font-jakarta, sans-serif)' }}>₹45,000</p>
                                    </div>
                                </div>

                                {/* Progress Tracker */}
                                <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                                    <div style={{ position: 'absolute', top: '12px', left: '16px', right: '16px', height: '2px', background: '#E8EFF7', zIndex: 0 }}>
                                        <div style={{ width: '50%', height: '100%', background: '#00C853' }} />
                                    </div>
                                    {[
                                        { label: 'Submitted', date: 'Mar 4', done: true },
                                        { label: 'Processing', date: 'Mar 5', done: true },
                                        { label: 'Docs Verification', date: 'Current', done: false, active: true },
                                        { label: 'Approved', date: '', done: false },
                                    ].map((s, i) => (
                                        <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1, width: '80px' }}>
                                            <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: s.done ? '#00C853' : s.active ? '#1976D2' : 'white', border: `2px solid ${s.done ? '#00C853' : s.active ? '#1976D2' : '#CBD5E1'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px', color: 'white' }}>
                                                {s.done && <CheckCircle size={12} />}
                                            </div>
                                            <p style={{ fontSize: '11px', fontWeight: s.active || s.done ? 700 : 500, color: s.active ? '#1976D2' : s.done ? '#1A2332' : '#9CA3AF', textAlign: 'center', lineHeight: 1.2, marginBottom: '2px' }}>{s.label}</p>
                                            <p style={{ fontSize: '10px', color: '#9CA3AF' }}>{s.date}</p>
                                        </div>
                                    ))}
                                </div>
                                <div style={{ background: '#FFF8E1', borderRadius: '10px', padding: '12px 16px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                                    <AlertCircle size={16} color="#F59E0B" style={{ flexShrink: 0, marginTop: '2px' }} />
                                    <p style={{ fontSize: '13px', color: '#B06D00', lineHeight: 1.5 }}>Insurer requires the final discharge summary. Hospital admin will upload it automatically upon discharge.</p>
                                </div>
                            </div>

                            <h3 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: '16px', fontWeight: 800, color: '#1A2332', marginTop: '32px', marginBottom: '16px' }}>Past Claims</h3>
                            <div className="card" style={{ padding: '16px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#E8F5E9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <CheckCircle size={20} color="#00C853" />
                                        </div>
                                        <div>
                                            <p style={{ fontWeight: 700, color: '#1A2332', fontSize: '15px', marginBottom: '2px' }}>Apollo Hospital OPD (Reimbursement)</p>
                                            <p style={{ fontSize: '12px', color: '#4A5568' }}>CLM-2311-094 • Settled on Nov 15, 2023</p>
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <p style={{ fontWeight: 800, color: '#00C853', fontSize: '16px', fontFamily: 'var(--font-jakarta, sans-serif)' }}>₹1,200</p>
                                        <button style={{ background: 'none', border: 'none', color: '#1976D2', fontWeight: 600, fontSize: '12px', cursor: 'pointer' }}>View Details</button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Govt Schemes */}
                    {activeTab === 2 && (
                        <motion.div key="schemes" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                            <div style={{ background: 'linear-gradient(135deg, #0A3D6B, #1565C0)', borderRadius: '20px', padding: '32px', color: 'white', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '24px' }}>
                                <div style={{ flex: 1 }}>
                                    <span className="badge" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.3)', marginBottom: '12px', display: 'inline-block' }}>✨ AI Benefit Finder</span>
                                    <h2 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: '24px', fontWeight: 800, marginBottom: '8px' }}>70% of eligible Indians miss out on free healthcare.</h2>
                                    <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', lineHeight: 1.6, marginBottom: '24px', maxWidth: '400px' }}>Our AI checked your profile (age, income bracket, location) and found 2 schemes you are eligible for.</p>
                                    <button className="btn-primary" style={{ background: 'white', color: '#0A3D6B', fontWeight: 800, padding: '12px 24px' }}>Apply in 1-Click</button>
                                </div>
                                <div style={{ width: '120px', height: '120px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '64px', border: '4px solid rgba(255,255,255,0.2)' }}>
                                    🇮🇳
                                </div>
                            </div>

                            <h3 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: '18px', fontWeight: 800, color: '#1A2332', marginBottom: '16px' }}>Your Eligible Schemes</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                                <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                                        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#FCE4EC', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>🤰</div>
                                        <span className="badge badge-green">Ready to Apply</span>
                                    </div>
                                    <h4 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: '16px', fontWeight: 800, color: '#1A2332', marginBottom: '6px' }}>Janani Suraksha Yojana (JSY)</h4>
                                    <p style={{ fontSize: '13px', color: '#4A5568', lineHeight: 1.5, marginBottom: '16px', flex: 1 }}>Cash assistance up to ₹1,400 for institutional delivery to reduce maternal mortality.</p>
                                    <p style={{ fontSize: '12px', fontWeight: 700, color: '#1976D2', marginBottom: '16px' }}>Reason: Matches your 'Maternity' query and Delhi residency</p>
                                    <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '10px' }}>Start Setup via Aadhaar</button>
                                </div>

                                <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                                        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#E8F5E9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>🛡️</div>
                                        <span className="badge" style={{ background: '#F0F4F8', color: '#4A5568' }}>Active</span>
                                    </div>
                                    <h4 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: '16px', fontWeight: 800, color: '#1A2332', marginBottom: '6px' }}>Ayushman Bharat (PM-JAY)</h4>
                                    <p style={{ fontSize: '13px', color: '#4A5568', lineHeight: 1.5, marginBottom: '16px', flex: 1 }}>Provides a health cover of ₹5 Lakhs per family per year for secondary and tertiary care hospitalization.</p>
                                    <p style={{ fontSize: '12px', fontWeight: 700, color: '#00C853', marginBottom: '16px' }}>Card linked to ABHA ID successfully.</p>
                                    <button className="btn-outline" style={{ width: '100%', justifyContent: 'center', padding: '10px' }}>View Coverage Card</button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

        </div>
    )
}
