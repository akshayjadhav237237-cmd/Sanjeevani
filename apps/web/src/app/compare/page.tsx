'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, X, Star, ArrowLeft, Plus } from 'lucide-react'

const HOSPITALS = [
    {
        id: 1, name: 'Apollo Hospital', address: 'Sarita Vihar, ND', rating: 4.8, dist: '2.4 km',
        icu: 8, cost: '₹12,000/day',
        insurance: ['Star Health', 'HDFC ERGO', 'PM-JAY'],
        features: {
            emergency: true, ambulance: true,
            teleconsult: true, organTransplant: true,
            robotics: true
        }
    },
    {
        id: 2, name: 'Max Super Speciality', address: 'Saket, ND', rating: 4.7, dist: '5.5 km',
        icu: 4, cost: '₹15,000/day',
        insurance: ['Star Health', 'HDFC ERGO', 'Bajaj'],
        features: {
            emergency: true, ambulance: true,
            teleconsult: true, organTransplant: false,
            robotics: true
        }
    },
    {
        id: 3, name: 'Fortis Escorts', address: 'Okhla, ND', rating: 4.5, dist: '3.1 km',
        icu: 0, cost: '₹10,000/day',
        insurance: ['Religare', 'Aditya Birla'],
        features: {
            emergency: false, ambulance: true,
            teleconsult: false, organTransplant: true,
            robotics: false
        }
    }
]

export default function ComparePage() {
    const [selected, setSelected] = useState([1, 2, 3])

    const hospitalsToCompare = selected.map(id => HOSPITALS.find(h => h.id === id)!).filter(Boolean)

    return (
        <div style={{ minHeight: '100vh', background: '#F7FAFD' }}>
            <div style={{ background: 'linear-gradient(135deg, #0A3D6B, #1976D2)', padding: '28px 0' }}>
                <div className="container-xl" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <a href="/search" style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ArrowLeft size={18} color="white" />
                    </a>
                    <div>
                        <h1 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', color: 'white', fontSize: '22px', fontWeight: 800 }}>Compare Hospitals</h1>
                        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '13px' }}>Side-by-side comparison for informed decisions</p>
                    </div>
                </div>
            </div>

            <div className="container-xl" style={{ padding: '32px 24px', overflowX: 'auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: `minmax(200px, 1fr) repeat(${hospitalsToCompare.length}, minmax(300px, 1fr))`, gap: '1px', background: '#E8EFF7', border: '1px solid #E8EFF7', borderRadius: '16px', overflow: 'hidden' }}>

                    {/* Header Row */}
                    <div style={{ background: '#F9FAFB', padding: '24px' }}>
                        <p style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontWeight: 800, fontSize: '18px', color: '#1A2332' }}>Hospital</p>
                    </div>
                    {hospitalsToCompare.map(h => (
                        <div key={h.id} style={{ background: 'white', padding: '24px', textAlign: 'center', position: 'relative' }}>
                            <button onClick={() => setSelected(s => s.filter(id => id !== h.id))} style={{ position: 'absolute', top: '12px', right: '12px', background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF' }}><X size={18} /></button>
                            <h3 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: '18px', fontWeight: 800, color: '#1A2332', marginBottom: '4px' }}>{h.name}</h3>
                            <p style={{ fontSize: '13px', color: '#4A5568', marginBottom: '16px' }}>{h.address}</p>
                            <a href={`/hospitals/${h.id}`} className="btn-primary" style={{ fontSize: '12px', padding: '8px 16px', borderRadius: '8px', display: 'inline-flex', justifyContent: 'center' }}>View Details</a>
                        </div>
                    ))}
                    {hospitalsToCompare.length < 3 && (
                        <div style={{ background: '#F9FAFB', padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <button style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: 'pointer', color: '#1976D2' }}>
                                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#E3F2FD', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Plus size={24} />
                                </div>
                                <span style={{ fontWeight: 700, fontSize: '14px' }}>Add Hospital</span>
                            </button>
                        </div>
                    )}

                    {/* Stats Rows */}
                    {[
                        { label: 'Distance', key: 'dist' },
                        { label: 'Rating', key: 'rating', isStars: true },
                        { label: 'Cost/Day (est.)', key: 'cost', isBold: true },
                        { label: 'ICU Beds', key: 'icu' },
                    ].map(row => (
                        <div key={row.label} style={{ display: 'contents' }}>
                            <div style={{ background: '#F9FAFB', padding: '16px 24px', alignContent: 'center' }}>
                                <p style={{ fontWeight: 700, fontSize: '13px', color: '#4A5568' }}>{row.label}</p>
                            </div>
                            {hospitalsToCompare.map(h => (
                                <div key={h.id} style={{ background: 'white', padding: '16px 24px', textAlign: 'center', alignContent: 'center' }}>
                                    {row.isStars ? (
                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '4px' }}>
                                            <Star size={14} color="#F59E0B" fill="#F59E0B" />
                                            <span style={{ fontWeight: 700, fontSize: '14px', color: '#1A2332' }}>{(h as any)[row.key]}</span>
                                        </div>
                                    ) : (
                                        <span style={{ fontWeight: row.isBold ? 800 : 500, fontSize: '14px', color: row.isBold ? '#1976D2' : '#1A2332' }}>
                                            {row.key === 'icu' ? ((h as any)[row.key] > 0 ? <span style={{ color: '#00C853', fontWeight: 700 }}>{(h as any)[row.key]} Available</span> : <span style={{ color: '#D32F2F', fontWeight: 700 }}>Full</span>) : (h as any)[row.key]}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}

                    {/* Insurance Row */}
                    <div style={{ display: 'contents' }}>
                        <div style={{ background: '#F9FAFB', padding: '16px 24px', alignContent: 'center' }}>
                            <p style={{ fontWeight: 700, fontSize: '13px', color: '#4A5568' }}>Insurance Accepted</p>
                        </div>
                        {hospitalsToCompare.map(h => (
                            <div key={h.id} style={{ background: 'white', padding: '16px 24px', textAlign: 'center' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center' }}>
                                    {h.insurance.map(ins => (
                                        <span key={ins} className="badge" style={{ background: '#E8F5E9', color: '#1B5E20', fontSize: '11px', whiteSpace: 'nowrap' }}>{ins}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Features Rows */}
                    {[
                        { label: '24/7 Emergency', key: 'emergency' },
                        { label: 'Ambulance', key: 'ambulance' },
                        { label: 'Teleconsultation', key: 'teleconsult' },
                        { label: 'Organ Transplant', key: 'organTransplant' },
                        { label: 'Robotic Surgery', key: 'robotics' },
                    ].map(row => (
                        <div key={row.label} style={{ display: 'contents' }}>
                            <div style={{ background: '#F9FAFB', padding: '16px 24px', alignContent: 'center' }}>
                                <p style={{ fontWeight: 700, fontSize: '13px', color: '#4A5568' }}>{row.label}</p>
                            </div>
                            {hospitalsToCompare.map(h => (
                                <div key={h.id} style={{ background: 'white', padding: '16px 24px', textAlign: 'center', alignContent: 'center' }}>
                                    {(h.features as any)[row.key] ? <Check size={18} color="#00C853" /> : <span style={{ color: '#D32F2F', fontSize: '12px', fontWeight: 600 }}>No</span>}
                                </div>
                            ))}
                        </div>
                    ))}

                </div>

                {/* AI Recommendation Banner */}
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ background: 'linear-gradient(135deg, #0A3D6B, #1565C0)', borderRadius: '16px', padding: '24px', marginTop: '32px', color: 'white', display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px' }}>🧠</div>
                    <div>
                        <h3 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: '18px', fontWeight: 800, marginBottom: '6px' }}>AI Recommendation: Apollo Hospital</h3>
                        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>Based on your <strong style={{ color: 'white' }}>cardiac history</strong>, Apollo provides the best specialized care, accepts your insurance, and has 8 ICU beds available right now.</p>
                    </div>
                    <a href="/hospitals/1" className="btn-primary" style={{ background: 'white', color: '#0A3D6B', marginLeft: 'auto', flexShrink: 0, fontSize: '14px', padding: '10px 20px' }}>Book Admission</a>
                </motion.div>
            </div>

        </div>
    )
}
