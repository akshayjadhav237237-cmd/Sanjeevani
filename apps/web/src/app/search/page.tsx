'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Search, MapPin, Filter, Star, Mic, ChevronDown, ArrowLeft, ArrowRight,
    Bed, AlertCircle, CheckCircle, Clock, Phone, Navigation, List, Map,
    Hospital, Ambulance, Brain, Shield, Check, X
} from 'lucide-react'

const HOSPITALS = [
    {
        id: 1, name: 'Apollo Hospital', address: 'Sarita Vihar, New Delhi', dist: '2.4 km', eta: '8 min',
        icu: 5, emergency: 3, general: 18, rating: 4.8, reviews: 2847,
        specialties: ['Cardiac', 'Neurology', 'Oncology'],
        cost: '₹8,000–₹25,000/day', costMin: 8000,
        insurance: ['Star Health', 'HDFC ERGO', 'PM-JAY'],
        verified: true, nabh: true, status: 'open',
        facilities: ['ICU', '24/7 Emergency', 'Blood Bank', 'Pharmacy', 'MRI', 'CT Scan'],
        photo: '#1976D2',
    },
    {
        id: 2, name: 'AIIMS Delhi', address: 'Ansari Nagar, New Delhi', dist: '3.1 km', eta: '11 min',
        icu: 12, emergency: 7, general: 45, rating: 4.9, reviews: 5124,
        specialties: ['Trauma', 'Oncology', 'Transplant'],
        cost: '₹2,000–₹8,000/day', costMin: 2000,
        insurance: ['CGHS', 'ESIC', 'PM-JAY'],
        verified: true, nabh: true, status: 'open',
        facilities: ['ICU', 'NICU', 'Burn Unit', 'Blood Bank', 'Research Center'],
        photo: '#0A3D6B',
    },
    {
        id: 3, name: 'Fortis Memorial Research Institute', address: 'Sector 44, Gurugram', dist: '4.8 km', eta: '16 min',
        icu: 1, emergency: 0, general: 8, rating: 4.5, reviews: 1903,
        specialties: ['Orthopedics', 'Spine', 'Joint Replacement'],
        cost: '₹10,000–₹30,000/day', costMin: 10000,
        insurance: ['Star Health', 'Religare', 'Aditya Birla'],
        verified: true, nabh: false, status: 'limited',
        facilities: ['ICU', 'Physiotherapy', 'Lab', 'Pharmacy'],
        photo: '#00897B',
    },
    {
        id: 4, name: 'Max Super Speciality', address: 'Saket, New Delhi', dist: '5.5 km', eta: '18 min',
        icu: 8, emergency: 4, general: 30, rating: 4.7, reviews: 3201,
        specialties: ['Cancer', 'Cardiac', 'Neuro', 'Gastro'],
        cost: '₹9,000–₹28,000/day', costMin: 9000,
        insurance: ['Star Health', 'HDFC ERGO', 'PM-JAY', 'Bajaj'],
        verified: true, nabh: true, status: 'open',
        facilities: ['ICU', 'NICU', 'Robotic Surgery', 'Blood Bank'],
        photo: '#7B1FA2',
    },
]

const SPECIALTIES = ['Cardiology', 'Neurology', 'Orthopedics', 'Oncology', 'Pediatrics', 'Gynecology', 'Emergency', 'Dermatology']

function HospitalCard({ h, compact = false }: { h: typeof HOSPITALS[0]; compact?: boolean }) {
    const availColor = h.status === 'open' ? '#00C853' : h.status === 'limited' ? '#F59E0B' : '#D32F2F'

    return (
        <motion.div className="card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            style={{ padding: '0', overflow: 'hidden' }}>
            {/* Photo banner */}
            <div style={{ height: '120px', background: `linear-gradient(135deg, ${h.photo} 0%, ${h.photo}cc 100%)`, display: 'flex', alignItems: 'flex-end', padding: '12px 16px', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', gap: '6px' }}>
                    {h.nabh && <span className="badge" style={{ background: 'rgba(255,255,255,0.9)', color: '#0A3D6B', fontSize: '10px' }}>NABH</span>}
                    {h.verified && <span className="badge" style={{ background: 'rgba(0,200,83,0.9)', color: 'white', fontSize: '10px' }}>✓ Verified</span>}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: availColor, display: 'block' }} />
                    <span style={{ color: 'white', fontSize: '12px', fontWeight: 600 }}>{h.status === 'open' ? 'Open' : h.status === 'limited' ? 'Limited' : 'Full'}</span>
                </div>
            </div>

            <div style={{ padding: '18px' }}>
                {/* Name + distance */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <h3 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: '16px', fontWeight: 700, color: '#1A2332', flex: 1 }}>{h.name}</h3>
                    <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: '8px' }}>
                        <p style={{ fontSize: '13px', fontWeight: 700, color: '#0A3D6B' }}>{h.dist}</p>
                        <p style={{ fontSize: '11px', color: '#4A5568' }}>{h.eta}</p>
                    </div>
                </div>

                <p style={{ fontSize: '12px', color: '#4A5568', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={12} /> {h.address}
                </p>

                {/* Rating */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                    <div style={{ display: 'flex', gap: '2px' }}>
                        {[...Array(5)].map((_, i) => <Star key={i} size={12} color={i < Math.floor(h.rating) ? '#F59E0B' : '#E8EFF7'} fill={i < Math.floor(h.rating) ? '#F59E0B' : '#E8EFF7'} />)}
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#1A2332' }}>{h.rating}</span>
                    <span style={{ fontSize: '12px', color: '#9CA3AF' }}>({h.reviews.toLocaleString()})</span>
                </div>

                {/* Specialties */}
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '12px' }}>
                    {h.specialties.slice(0, 3).map(s => <span key={s} className="badge badge-blue" style={{ fontSize: '11px' }}>{s}</span>)}
                </div>

                {/* Bed availability */}
                <div style={{ display: 'flex', gap: '16px', marginBottom: '12px', padding: '10px 12px', background: '#F9FAFB', borderRadius: '10px' }}>
                    {[
                        { label: 'ICU', count: h.icu, color: h.icu > 3 ? '#00C853' : h.icu > 0 ? '#F59E0B' : '#D32F2F' },
                        { label: 'Emergency', count: h.emergency, color: h.emergency > 2 ? '#00C853' : h.emergency > 0 ? '#F59E0B' : '#D32F2F' },
                        { label: 'General', count: h.general, color: '#00C853' },
                    ].map(b => (
                        <div key={b.label} style={{ flex: 1, textAlign: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: b.color, display: 'block' }} />
                                <span style={{ fontSize: '14px', fontWeight: 800, color: '#1A2332', fontFamily: 'var(--font-jakarta, sans-serif)' }}>{b.count}</span>
                            </div>
                            <span style={{ fontSize: '10px', color: '#4A5568' }}>{b.label}</span>
                        </div>
                    ))}
                </div>

                <p style={{ fontSize: '13px', color: '#4A5568', marginBottom: '14px' }}>💰 {h.cost}</p>

                <div style={{ display: 'flex', gap: '8px' }}>
                    <a href={`/hospitals/${h.id}`} className="btn-outline" style={{ flex: 1, justifyContent: 'center', fontSize: '13px', padding: '10px 12px' }}>View Details</a>
                    <a href="/booking" className="btn-primary" style={{ flex: 1, justifyContent: 'center', fontSize: '13px', padding: '10px 12px' }}>Book Bed</a>
                </div>
            </div>
        </motion.div>
    )
}

export default function SearchPage() {
    const [query, setQuery] = useState('')
    const [sortBy, setSortBy] = useState('Best Match')
    const [filterSpecialties, setFilterSpecialties] = useState<string[]>([])

    const filtered = HOSPITALS.filter(h =>
        query === '' ||
        h.name.toLowerCase().includes(query.toLowerCase()) ||
        h.specialties.some(s => s.toLowerCase().includes(query.toLowerCase()))
    )

    return (
        <div style={{ minHeight: '100vh', background: '#F7FAFD' }}>
            {/* Search header */}
            <div style={{ background: 'linear-gradient(135deg, #0A3D6B, #1976D2)', padding: '32px 0 0' }}>
                <div className="container-xl" style={{ paddingBottom: '0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                        <a href="/dashboard" style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <ArrowLeft size={18} color="white" />
                        </a>
                        <div>
                            <h1 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', color: 'white', fontSize: '24px', fontWeight: 800 }}>Find Hospitals</h1>
                            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px' }}>New Delhi, India • Real-time availability</p>
                        </div>
                    </div>

                    {/* Search bar */}
                    <div style={{ background: 'white', borderRadius: '16px 16px 0 0', padding: '20px 24px', display: 'flex', gap: '12px', alignItems: 'center', boxShadow: '0 -4px 20px rgba(0,0,0,0.1)' }}>
                        <Search size={20} color="#1976D2" style={{ flexShrink: 0 }} />
                        <input className="input-field" style={{ flex: 1, background: 'transparent', height: '42px' }}
                            placeholder="Search hospitals, symptoms, or specialties..."
                            value={query} onChange={e => setQuery(e.target.value)} />
                        <button style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#F0F4F8', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Mic size={18} color="#4A5568" />
                        </button>
                        <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 16px', borderRadius: '10px', background: '#F0F4F8', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '13px', color: '#4A5568' }}>
                            <MapPin size={14} /> Use My Location
                        </button>
                    </div>
                </div>
            </div>

            <div className="container-xl" style={{ padding: '0 24px 48px' }}>
                <div style={{ background: 'white', borderRadius: '0 0 16px 16px', padding: '0 0 16px', marginBottom: '24px', boxShadow: 'var(--shadow-card)' }}>
                    {/* Filter pills */}
                    <div style={{ padding: '14px 24px', borderBottom: '1px solid #E8EFF7', display: 'flex', gap: '8px', overflowX: 'auto' }}>
                        {['All', 'Distance', 'Budget', 'Rating', 'Insurance', 'ICU', 'Emergency', '24/7'].map(f => (
                            <button key={f} style={{
                                padding: '6px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 600, whiteSpace: 'nowrap',
                                background: f === 'All' ? '#0A3D6B' : '#F0F4F8',
                                color: f === 'All' ? 'white' : '#4A5568',
                                border: 'none', cursor: 'pointer',
                            }}>{f}</button>
                        ))}
                    </div>

                    {/* Sort tabs */}
                    <div style={{ padding: '10px 24px', display: 'flex', gap: '4px', overflowX: 'auto' }}>
                        <span style={{ fontSize: '12px', color: '#4A5568', fontWeight: 600, marginRight: '8px', whiteSpace: 'nowrap', paddingTop: '6px' }}>Sort:</span>
                        {['Best Match', 'Nearest', 'Top Rated', 'Most Affordable', 'Fastest Appointment'].map(s => (
                            <button key={s} onClick={() => setSortBy(s)} style={{
                                padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, whiteSpace: 'nowrap',
                                background: sortBy === s ? '#E3F2FD' : 'transparent',
                                color: sortBy === s ? '#0A3D6B' : '#4A5568',
                                border: 'none', cursor: 'pointer',
                            }}>{s}</button>
                        ))}
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '24px' }}>
                    {/* Sidebar filters */}
                    <div>
                        <div className="card" style={{ position: 'sticky', top: '20px' }}>
                            <h3 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: '15px', fontWeight: 700, color: '#1A2332', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid #E8EFF7' }}>
                                Filters
                            </h3>

                            <div style={{ marginBottom: '20px' }}>
                                <p style={{ fontSize: '12px', fontWeight: 700, color: '#4A5568', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Specialty</p>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    {SPECIALTIES.map(s => (
                                        <label key={s} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '13px', color: '#1A2332' }}>
                                            <input type="checkbox" checked={filterSpecialties.includes(s)} onChange={() => setFilterSpecialties(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])}
                                                style={{ accentColor: '#0A3D6B', width: '16px', height: '16px' }} />
                                            {s}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <p style={{ fontSize: '12px', fontWeight: 700, color: '#4A5568', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Distance</p>
                                <input type="range" min="1" max="20" defaultValue="10" style={{ width: '100%', accentColor: '#0A3D6B' }} />
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#4A5568', marginTop: '4px' }}>
                                    <span>1 km</span><span>10 km</span><span>20 km</span>
                                </div>
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <p style={{ fontSize: '12px', fontWeight: 700, color: '#4A5568', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Insurance</p>
                                {['PM-JAY', 'Star Health', 'HDFC ERGO', 'CGHS', 'ESIC'].map(ins => (
                                    <label key={ins} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '13px', color: '#1A2332', marginBottom: '8px' }}>
                                        <input type="checkbox" style={{ accentColor: '#0A3D6B', width: '16px', height: '16px' }} />
                                        {ins}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Results */}
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <p style={{ fontSize: '14px', color: '#4A5568', fontWeight: 500 }}>
                                <strong style={{ color: '#1A2332' }}>{filtered.length} hospitals</strong> found near you
                            </p>
                            <a href="/compare" style={{ padding: '8px 16px', borderRadius: '10px', background: '#E3F2FD', color: '#0A3D6B', fontSize: '13px', fontWeight: 700, textDecoration: 'none' }}>
                                Compare Hospitals
                            </a>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                            {filtered.map(h => <HospitalCard key={h.id} h={h} />)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
