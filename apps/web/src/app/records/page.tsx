'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, Search, Upload, Download, Share2, Eye, Plus, ArrowLeft, ChevronRight, Activity, Pill, Shield, Syringe } from 'lucide-react'

const TABS = ['Medical History', 'Lab Reports', 'Prescriptions', 'Vaccinations', 'Documents']

const HISTORY = [
    { date: 'Mar 2024', type: 'hospitalization', title: 'Cardiac Monitoring', hospital: 'Apollo Hospital', duration: '3 days', color: '#D32F2F', bg: '#FFEBEE', icon: '🫀' },
    { date: 'Jan 2024', type: 'consultation', title: 'Diabetes Follow-up', hospital: 'AIIMS Delhi', duration: '30 min', color: '#1976D2', bg: '#E3F2FD', icon: '🩺' },
    { date: 'Nov 2023', type: 'surgery', title: 'Appendectomy (Laparoscopic)', hospital: 'Fortis Hospital', duration: '4 days', color: '#7B1FA2', bg: '#F3E5F5', icon: '🏥' },
    { date: 'Aug 2023', type: 'consultation', title: 'Annual Health Checkup', hospital: 'Max Healthcare', duration: '1h', color: '#00897B', bg: '#E0F2F1', icon: '✅' },
]

const REPORTS = [
    { name: 'Complete Blood Count', type: 'Blood Test', lab: 'SRL Diagnostics', date: 'Mar 1, 2024', status: 'Normal', color: '#00C853', emoji: '🩸' },
    { name: 'HbA1c (Diabetes Test)', type: 'Blood Test', lab: 'Thyrocare', date: 'Feb 15, 2024', status: 'High', color: '#D32F2F', emoji: '🧪' },
    { name: 'Chest X-Ray', type: 'Radiology', lab: 'Apollo Diagnostics', date: 'Jan 28, 2024', status: 'Normal', color: '#00C853', emoji: '🫁' },
    { name: 'Echocardiogram', type: 'Cardiac', lab: 'Max Lab', date: 'Jan 15, 2024', status: 'Borderline', color: '#F59E0B', emoji: '🫀' },
    { name: 'Lipid Profile', type: 'Blood Test', lab: 'SRL Diagnostics', date: 'Dec 10, 2023', status: 'Normal', color: '#00C853', emoji: '💉' },
    { name: 'MRI Brain', type: 'Radiology', lab: 'Fortis Imaging', date: 'Nov 5, 2023', status: 'Normal', color: '#00C853', emoji: '🧠' },
]

const PRESCRIPTIONS = [
    { doctor: 'Dr. Arjun Mehta', specialty: 'Cardiologist', date: 'Mar 1, 2024', hospital: 'Apollo Hospital', medicines: ['Metformin 500mg BD', 'Atorvastatin 20mg OD', 'Aspirin 75mg OD'], active: true },
    { doctor: 'Dr. Priya Nair', specialty: 'Endocrinologist', date: 'Feb 15, 2024', hospital: 'AIIMS Delhi', medicines: ['Metformin 500mg BD', 'Glipizide 5mg OD'], active: false },
]

const VACCINATIONS = [
    { name: 'COVID-19 (Booster)', date: 'Dec 2023', due: null, status: 'done' },
    { name: 'Flu Shot', date: 'Oct 2023', due: 'Oct 2024', status: 'done' },
    { name: 'Hepatitis B', date: 'Mar 2020', due: null, status: 'done' },
    { name: 'Typhoid', date: 'Jun 2022', due: 'Jun 2025', status: 'done' },
    { name: 'Tetanus (Td)', date: null, due: 'Due Jul 2024', status: 'pending' },
]

export default function RecordsPage() {
    const [activeTab, setActiveTab] = useState(0)
    const [searching, setSearching] = useState('')

    return (
        <div style={{ minHeight: '100vh', background: '#F7FAFD' }}>
            {/* Header */}
            <div style={{ background: 'linear-gradient(135deg, #0A3D6B, #1976D2)', padding: '28px 0' }}>
                <div className="container-xl" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <a href="/dashboard" style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ArrowLeft size={18} color="white" />
                    </a>
                    <div style={{ flex: 1 }}>
                        <h1 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', color: 'white', fontSize: '22px', fontWeight: 800 }}>Health Records</h1>
                        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '13px' }}>Your complete medical history — secure & accessible</p>
                    </div>
                    <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px', borderRadius: '12px', background: 'rgba(255,255,255,0.15)', color: 'white', fontWeight: 700, fontSize: '13px', border: '1px solid rgba(255,255,255,0.3)', cursor: 'pointer', backdropFilter: 'blur(10px)' }}>
                        <Upload size={15} /> Upload Report
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div style={{ background: 'white', borderBottom: '1px solid #E8EFF7' }}>
                <div className="container-xl" style={{ display: 'flex', gap: '0', overflowX: 'auto' }}>
                    {TABS.map((tab, i) => (
                        <button key={tab} onClick={() => setActiveTab(i)} style={{
                            padding: '16px 20px', fontWeight: 600, fontSize: '14px', whiteSpace: 'nowrap',
                            color: activeTab === i ? '#0A3D6B' : '#4A5568',
                            background: 'none', border: 'none', cursor: 'pointer',
                            borderBottom: activeTab === i ? '2px solid #1976D2' : '2px solid transparent',
                            transition: 'all 0.2s',
                        }}>{tab}</button>
                    ))}
                </div>
            </div>

            <div className="container-xl" style={{ padding: '32px 24px' }}>
                <AnimatePresence mode="wait">
                    {/* Medical History */}
                    {activeTab === 0 && (
                        <motion.div key="history" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0', position: 'relative' }}>
                                <div style={{ position: 'absolute', left: '60px', top: '40px', bottom: '40px', width: '2px', background: 'linear-gradient(to bottom, #E8EFF7 0%, #E8EFF7 100%)', zIndex: 0 }} />
                                {HISTORY.map((item, i) => (
                                    <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                                        style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', paddingBottom: '24px', position: 'relative', zIndex: 1 }}>
                                        <div style={{ minWidth: '50px', textAlign: 'right' }}>
                                            <p style={{ fontSize: '12px', fontWeight: 700, color: '#9CA3AF' }}>{item.date}</p>
                                        </div>
                                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0, border: `2px solid ${item.color}30` }}>
                                            {item.icon}
                                        </div>
                                        <div className="card" style={{ flex: 1, padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div>
                                                <span className="badge" style={{ background: item.bg, color: item.color, fontSize: '10px', marginBottom: '6px', display: 'inline-flex' }}>{item.type}</span>
                                                <h3 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: '15px', fontWeight: 700, color: '#1A2332', marginBottom: '4px' }}>{item.title}</h3>
                                                <p style={{ fontSize: '13px', color: '#4A5568' }}>{item.hospital} • {item.duration}</p>
                                            </div>
                                            <ChevronRight size={18} color="#9CA3AF" />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Lab Reports */}
                    {activeTab === 1 && (
                        <motion.div key="reports" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                            <div style={{ marginBottom: '24px' }}>
                                <div style={{ position: 'relative', maxWidth: '400px' }}>
                                    <Search size={16} color="#9CA3AF" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                                    <input className="input-field" style={{ paddingLeft: '42px' }} placeholder="Search reports..." value={searching} onChange={e => setSearching(e.target.value)} />
                                </div>
                            </div>

                            {/* Upload zone */}
                            <div style={{ border: '2px dashed #CBD5E1', borderRadius: '16px', padding: '32px', textAlign: 'center', marginBottom: '28px', cursor: 'pointer', transition: 'all 0.2s', background: '#F9FAFB' }}
                                onMouseEnter={e => (e.currentTarget.style.borderColor = '#1976D2')}
                                onMouseLeave={e => (e.currentTarget.style.borderColor = '#CBD5E1')}>
                                <Upload size={32} color="#9CA3AF" style={{ margin: '0 auto 12px' }} />
                                <p style={{ fontWeight: 700, color: '#1A2332', fontSize: '15px', marginBottom: '4px' }}>Drop report here or click to upload</p>
                                <p style={{ fontSize: '13px', color: '#4A5568' }}>Supports PDF, JPEG, PNG • AI will auto-tag the report</p>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
                                {REPORTS.filter(r => !searching || r.name.toLowerCase().includes(searching.toLowerCase())).map((r, i) => (
                                    <motion.div key={r.name} className="card" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.07 }}
                                        style={{ padding: '18px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                                            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#F0F4F8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>{r.emoji}</div>
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <p style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontWeight: 700, fontSize: '14px', color: '#1A2332', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.name}</p>
                                                <p style={{ fontSize: '12px', color: '#4A5568' }}>{r.type} • {r.lab}</p>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                            <span style={{ fontSize: '12px', color: '#4A5568' }}>{r.date}</span>
                                            <span style={{ fontSize: '12px', fontWeight: 700, padding: '3px 10px', borderRadius: '999px', background: `${r.color}20`, color: r.color }}>{r.status}</span>
                                        </div>
                                        <div style={{ display: 'flex', gap: '6px' }}>
                                            {[{ icon: Eye, label: 'View' }, { icon: Download, label: 'Save' }, { icon: Share2, label: 'Share' }].map(a => (
                                                <button key={a.label} style={{ flex: 1, padding: '7px 0', borderRadius: '8px', background: '#F0F4F8', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontSize: '12px', color: '#4A5568', fontWeight: 600 }}>
                                                    <a.icon size={13} /> {a.label}
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Prescriptions */}
                    {activeTab === 2 && (
                        <motion.div key="prescriptions" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {PRESCRIPTIONS.map((rx, i) => (
                                    <div key={i} className="card" style={{ borderLeft: `4px solid ${rx.active ? '#1976D2' : '#CBD5E1'}` }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                                            <div>
                                                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px' }}>
                                                    <h3 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontWeight: 700, fontSize: '16px', color: '#1A2332' }}>{rx.doctor}</h3>
                                                    {rx.active && <span className="badge badge-blue" style={{ fontSize: '10px' }}>Active</span>}
                                                </div>
                                                <p style={{ fontSize: '13px', color: '#4A5568' }}>{rx.specialty} • {rx.hospital} • {rx.date}</p>
                                            </div>
                                            <a href="/medicines" style={{ padding: '7px 14px', borderRadius: '10px', background: '#E3F2FD', color: '#0A3D6B', fontSize: '12px', fontWeight: 700, textDecoration: 'none' }}>Order Medicines</a>
                                        </div>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                            {rx.medicines.map(m => (
                                                <div key={m} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', background: '#F9FAFB', borderRadius: '8px' }}>
                                                    <Pill size={12} color="#00897B" />
                                                    <span style={{ fontSize: '13px', color: '#1A2332', fontWeight: 500 }}>{m}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Vaccinations */}
                    {activeTab === 3 && (
                        <motion.div key="vaccinations" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                            <div className="card" style={{ marginBottom: '24px', padding: '18px', background: '#E8F5E9', border: '1px solid #C8E6C9' }}>
                                <p style={{ fontWeight: 700, color: '#1B5E20', fontSize: '14px', marginBottom: '4px' }}>✅ Your vaccination record is 4/5 complete</p>
                                <p style={{ fontSize: '13px', color: '#388E3C' }}>1 vaccine is due. Please check below.</p>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {VACCINATIONS.map((v, i) => (
                                    <div key={i} className="card" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: v.status === 'done' ? '#E8F5E9' : '#FFF8E1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Syringe size={20} color={v.status === 'done' ? '#00C853' : '#F59E0B'} />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <p style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontWeight: 700, color: '#1A2332', fontSize: '14px' }}>{v.name}</p>
                                            <p style={{ fontSize: '12px', color: '#4A5568' }}>{v.date ? `Received: ${v.date}` : v.due}</p>
                                        </div>
                                        <span className={`badge ${v.status === 'done' ? 'badge-green' : 'badge-amber'}`}>{v.status === 'done' ? '✓ Done' : '⚠ Due Soon'}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Documents */}
                    {activeTab === 4 && (
                        <motion.div key="documents" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
                                {[
                                    { folder: '📋 Reports', count: '12 files', color: '#E3F2FD' },
                                    { folder: '💊 Prescriptions', count: '8 files', color: '#E0F2F1' },
                                    { folder: '🛡️ Insurance', count: '4 files', color: '#E8F5E9' },
                                    { folder: '🏥 Discharge Summaries', count: '3 files', color: '#F3E5F5' },
                                    { folder: '🧪 Lab Tests', count: '24 files', color: '#FFF8E1' },
                                ].map(f => (
                                    <div key={f.folder} className="card" style={{ background: f.color, cursor: 'pointer', textAlign: 'center', padding: '24px 16px' }}>
                                        <p style={{ fontSize: '36px', marginBottom: '10px' }}>{f.folder.split(' ')[0]}</p>
                                        <p style={{ fontWeight: 700, color: '#1A2332', fontSize: '14px', marginBottom: '4px' }}>{f.folder.split(' ').slice(1).join(' ')}</p>
                                        <p style={{ fontSize: '12px', color: '#4A5568' }}>{f.count}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
