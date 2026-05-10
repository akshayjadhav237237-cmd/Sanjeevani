'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    MapPin, Star, Phone, Globe, Navigation, Clock, Shield,
    Bed, Users, Activity, ChevronRight, CheckCircle, Info, Heart
} from 'lucide-react'

const TABS = ['Overview', 'Beds', 'Doctors', 'Cost', 'Reviews']

const BEDS = [
    { type: 'ICU Beds', total: 20, available: 8, color: '#00C853', price: '₹12,000/day' },
    { type: 'NICU Beds', total: 10, available: 2, color: '#D32F2F', price: '₹15,000/day' },
    { type: 'Emergency Beds', total: 15, available: 5, color: '#F59E0B', price: '₹8,000/day' },
    { type: 'General Ward', total: 80, available: 45, color: '#00C853', price: '₹3,000/day' },
    { type: 'Private Room', total: 25, available: 12, color: '#00C853', price: '₹7,000/day' },
    { type: 'Premium Suite', total: 8, available: 3, color: '#F59E0B', price: '₹18,000/day' },
]

export default function HospitalDetailPage({ params }: { params: { id: string } }) {
    const [activeTab, setActiveTab] = useState(0)
    const [bookingStep, setBookingStep] = useState(0)
    const [selectedBed, setSelectedBed] = useState('')

    return (
        <div style={{ minHeight: '100vh', background: '#F7FAFD' }}>
            {/* Hero Banner */}
            <div style={{ height: '320px', background: 'linear-gradient(to bottom, transparent, rgba(10,61,107,0.9)), url("https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2000&auto=format&fit=crop")', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative', display: 'flex', alignItems: 'flex-end', paddingBottom: '32px' }}>
                <a href="/search" style={{ position: 'absolute', top: '24px', left: '24px', width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', textDecoration: 'none' }}>
                    <ChevronRight size={24} color="white" style={{ transform: 'rotate(180deg)' }} />
                </a>
                <div className="container-xl" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                            <span className="badge" style={{ background: '#00C853', color: 'white' }}>✓ Verified</span>
                            <span className="badge" style={{ background: 'white', color: '#0A3D6B' }}>NABH Accredited</span>
                        </div>
                        <h1 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', color: 'white', fontSize: '36px', fontWeight: 800, marginBottom: '8px' }}>Apollo Hospital</h1>
                        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <MapPin size={15} /> Sarita Vihar, New Delhi • 2.4 km away
                        </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px', justifyContent: 'flex-end' }}>
                            <Star size={20} color="#F59E0B" fill="#F59E0B" />
                            <span style={{ color: 'white', fontSize: '24px', fontWeight: 800, fontFamily: 'var(--font-jakarta, sans-serif)' }}>4.8</span>
                        </div>
                        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px' }}>2,847 Reviews</p>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div style={{ background: 'white', borderBottom: '1px solid #E8EFF7', position: 'sticky', top: 0, zIndex: 10 }}>
                <div className="container-xl" style={{ display: 'flex', gap: '0', overflowX: 'auto' }}>
                    {TABS.map((tab, i) => (
                        <button key={tab} onClick={() => setActiveTab(i)} style={{
                            padding: '16px 24px', fontWeight: 700, fontSize: '14px', whiteSpace: 'nowrap',
                            color: activeTab === i ? '#0A3D6B' : '#4A5568', background: 'none', border: 'none', cursor: 'pointer',
                            borderBottom: activeTab === i ? '2px solid #1976D2' : '2px solid transparent', transition: 'all 0.2s',
                        }}>{tab}</button>
                    ))}
                </div>
            </div>

            <div className="container-xl" style={{ padding: '32px 24px', display: 'grid', gridTemplateColumns: '1fr 320px', gap: '32px' }}>
                {/* Main Content */}
                <div>
                    <AnimatePresence mode="wait">
                        {/* Overview */}
                        {activeTab === 0 && (
                            <motion.div key="overview" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                                <h3 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: '20px', fontWeight: 700, color: '#1A2332', marginBottom: '16px' }}>About Hospital</h3>
                                <p style={{ color: '#4A5568', fontSize: '15px', lineHeight: 1.7, marginBottom: '24px' }}>
                                    Indraprastha Apollo Hospitals, New Delhi is a multi-specialty acute care facility with over 710 beds and one of the most sought after destinations in Asia for healthcare. A state-of-the art modern facility in the heart of the capital.
                                </p>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
                                    {[{ icon: Activity, label: 'Emergency 24/7' }, { icon: Shield, label: 'JCI Accredited' }, { icon: Users, label: '500+ Doctors' }, { icon: Heart, label: 'Organ Transplant' }].map(f => (
                                        <div key={f.label} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', background: 'white', borderRadius: '12px', border: '1px solid #E8EFF7' }}>
                                            <f.icon size={20} color="#1976D2" />
                                            <span style={{ fontWeight: 600, color: '#1A2332' }}>{f.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Beds */}
                        {activeTab === 1 && (
                            <motion.div key="beds" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                                <h3 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: '20px', fontWeight: 700, color: '#1A2332', marginBottom: '8px' }}>Live Bed Board</h3>
                                <p style={{ color: '#4A5568', fontSize: '14px', marginBottom: '24px' }}>Real-time availability updated 2 minutes ago</p>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    {BEDS.map((bed, i) => (
                                        <div key={i} onClick={() => { setSelectedBed(bed.type); setBookingStep(1) }} className="card" style={{ padding: '20px', cursor: 'pointer', border: selectedBed === bed.type ? '2px solid #1976D2' : 'none' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                                                <div>
                                                    <h4 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: '16px', fontWeight: 700, color: '#1A2332', marginBottom: '4px' }}>{bed.type}</h4>
                                                    <p style={{ fontSize: '13px', color: '#4A5568' }}>{bed.price}</p>
                                                </div>
                                                <div style={{ textAlign: 'right' }}>
                                                    <span style={{ fontSize: '20px', fontWeight: 800, color: bed.color, fontFamily: 'var(--font-jakarta, sans-serif)' }}>{bed.available}</span>
                                                    <span style={{ fontSize: '14px', fontWeight: 600, color: '#9CA3AF' }}> / {bed.total}</span>
                                                </div>
                                            </div>
                                            {/* Progress bar */}
                                            <div style={{ height: '8px', background: '#F0F4F8', borderRadius: '4px', overflow: 'hidden' }}>
                                                <div style={{ height: '100%', background: bed.color, width: `${(bed.available / bed.total) * 100}%` }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Cost Estimator */}
                        {activeTab === 3 && (
                            <motion.div key="cost" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                                <div style={{ background: 'linear-gradient(135deg, #0A3D6B, #1565C0)', borderRadius: '20px', padding: '32px', color: 'white', marginBottom: '24px' }}>
                                    <h3 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: '22px', fontWeight: 800, marginBottom: '8px' }}>AI Cost Estimator</h3>
                                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', marginBottom: '24px' }}>Get a detailed breakdown based on the procedure and your insurance profile.</p>
                                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.8)', marginBottom: '8px', textTransform: 'uppercase' }}>Select Condition / Procedure</label>
                                    <select className="input-field" style={{ background: 'white', color: '#1A2332', height: '48px', marginBottom: '24px' }}>
                                        <option>Heart Bypass Surgery (CABG)</option>
                                        <option>Angioplasty</option>
                                        <option>Knee Replacement</option>
                                        <option>Maternity (Normal Delivery)</option>
                                    </select>

                                    <div style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', borderRadius: '16px', padding: '20px' }}>
                                        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', fontWeight: 600, marginBottom: '16px', textTransform: 'uppercase' }}>Estimated Breakdown</p>
                                        {[
                                            { label: 'Procedure & Surgeon Fee', val: '₹1,50,000' },
                                            { label: 'Room Charge (5 Days, General)', val: '₹15,000' },
                                            { label: 'OT & Anesthesia', val: '₹45,000' },
                                            { label: 'Medicines & Consumables', val: '₹25,000' },
                                        ].map(item => (
                                            <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                                <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>{item.label}</span>
                                                <span style={{ fontSize: '14px', fontWeight: 700 }}>{item.val}</span>
                                            </div>
                                        ))}
                                        <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.2)', margin: '16px 0' }} />
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ fontSize: '16px', fontWeight: 700 }}>Total Estimate</span>
                                            <span style={{ fontSize: '24px', fontWeight: 800, fontFamily: 'var(--font-jakarta, sans-serif)', color: '#00C853' }}>₹2,35,000</span>
                                        </div>
                                        <div style={{ marginTop: '16px', padding: '10px', background: 'rgba(0, 200, 83, 0.2)', borderRadius: '8px', color: '#00C853', fontSize: '13px', fontWeight: 600 }}>
                                            ✓ Your HDFC ERGO policy covers approx ₹2,00,000
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Other tabs placeholder */}
                        {(activeTab === 2 || activeTab === 4) && (
                            <motion.div key="placeholder" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <p style={{ color: '#4A5568' }}>Content for this section is loading...</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Sidebar */}
                <div>
                    {activeTab === 1 && bookingStep > 0 ? (
                        <div className="card" style={{ padding: '24px', position: 'sticky', top: '90px' }}>
                            <h3 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: '18px', fontWeight: 800, color: '#1A2332', marginBottom: '16px' }}>Book {selectedBed}</h3>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#4A5568', marginBottom: '6px' }}>Date of Admission</label>
                                <input type="date" className="input-field" />
                            </div>
                            <div style={{ marginBottom: '24px' }}>
                                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#4A5568', marginBottom: '6px' }}>Estimated Days</label>
                                <input type="number" className="input-field" placeholder="e.g. 3" defaultValue={1} />
                            </div>
                            <div style={{ background: '#F9FAFB', borderRadius: '10px', padding: '16px', marginBottom: '24px' }}>
                                <p style={{ fontSize: '12px', color: '#4A5568', marginBottom: '4px' }}>Estimated Total</p>
                                <p style={{ fontSize: '24px', fontWeight: 800, color: '#0A3D6B', fontFamily: 'var(--font-jakarta, sans-serif)' }}>₹{selectedBed === 'ICU Beds' ? '12,000' : '3,000'}</p>
                            </div>
                            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '15px', padding: '14px' }}>Confirm Booking Request</button>
                        </div>
                    ) : (
                        <div className="card" style={{ padding: '24px', position: 'sticky', top: '90px' }}>
                            <button onClick={() => setActiveTab(1)} className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '15px', padding: '14px', marginBottom: '12px' }}>Book a Bed</button>
                            <button onClick={() => setActiveTab(2)} className="btn-outline" style={{ width: '100%', justifyContent: 'center', fontSize: '15px', padding: '14px', marginBottom: '24px' }}>Book Appointment</button>

                            <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', marginBottom: '12px' }}>Contact Details</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                                <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#1A2332', textDecoration: 'none', fontSize: '14px' }}>
                                    <Phone size={16} color="#1976D2" /> +91 11 2692 5858
                                </a>
                                <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#1A2332', textDecoration: 'none', fontSize: '14px' }}>
                                    <Navigation size={16} color="#1976D2" /> Get Directions
                                </a>
                            </div>

                            <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', marginBottom: '12px' }}>Insurance Accepted</h4>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {['Star Health', 'HDFC ERGO', 'Ayushman Bharat', 'CGHS'].map(i => <span key={i} className="badge" style={{ background: '#E8F5E9', color: '#1B5E20' }}>{i}</span>)}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
