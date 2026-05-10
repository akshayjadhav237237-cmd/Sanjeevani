'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Calendar, Clock, Video, MapPin, ArrowLeft, ChevronRight,
    Plus, CheckCircle, Star, Filter, Stethoscope, Phone, MessageCircle
} from 'lucide-react'

type ViewMode = 'list' | 'book' | 'bookingStep'

const UPCOMING = [
    {
        id: 1, doctor: 'Dr. Arjun Mehta', specialty: 'Cardiologist', hospital: 'Apollo Hospital',
        date: 'Mon, Mar 10', time: '11:00 AM', type: 'in-person',
        reason: 'Cardiac Review — follow-up for palpitations', color: '#D32F2F', status: 'confirmed',
    },
    {
        id: 2, doctor: 'Dr. Priya Nair', specialty: 'Endocrinologist', hospital: 'Fortis Hospital',
        date: 'Sat, Mar 15', time: '3:00 PM', type: 'video',
        reason: 'Diabetes management checkup', color: '#1976D2', status: 'confirmed',
    },
]

const PAST = [
    { id: 3, doctor: 'Dr. Sunita Rao', specialty: 'Dermatologist', hospital: 'Max Healthcare', date: 'Feb 22, 2024', time: '10:00 AM', type: 'in-person', reason: 'Skin rash consultation', rating: 5 },
    { id: 4, doctor: 'Dr. Vinay Kumar', specialty: 'General Physician', hospital: 'AIIMS Delhi', date: 'Jan 18, 2024', time: '9:30 AM', type: 'in-person', reason: 'Annual health check', rating: 4 },
]

const DOCTORS = [
    { id: 1, name: 'Dr. Arjun Mehta', specialty: 'Cardiologist', hospital: 'Apollo Hospital', rating: 4.9, experience: '18 yrs', fee: 1200, available: ['Mon', 'Wed', 'Fri'], emoji: '👨‍⚕️' },
    { id: 2, name: 'Dr. Priya Nair', specialty: 'Endocrinologist', hospital: 'Fortis', rating: 4.7, experience: '12 yrs', fee: 800, available: ['Tue', 'Thu', 'Sat'], emoji: '👩‍⚕️' },
    { id: 3, name: 'Dr. Rajesh Kumar', specialty: 'Neurologist', hospital: 'AIIMS', rating: 4.8, experience: '20 yrs', fee: 1500, available: ['Mon', 'Thu'], emoji: '👨‍⚕️' },
    { id: 4, name: 'Dr. Meera Singh', specialty: 'Gynecologist', hospital: 'Max Healthcare', rating: 4.6, experience: '15 yrs', fee: 900, available: ['Tue', 'Fri', 'Sat'], emoji: '👩‍⚕️' },
]

const DAYS = ['Mon\nMar 4', 'Tue\nMar 5', 'Wed\nMar 6', 'Thu\nMar 7', 'Fri\nMar 8', 'Sat\nMar 9']
const TIMES = ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '2:00 PM', '2:30 PM', '3:00 PM', '4:00 PM']
const BOOKED = ['9:00 AM', '10:00 AM', '2:30 PM']

export default function AppointmentsPage() {
    const [view, setView] = useState<ViewMode>('list')
    const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming')
    const [selectedDoctor, setSelectedDoctor] = useState<typeof DOCTORS[0] | null>(null)
    const [bStep, setBStep] = useState(0)
    const [selectedDay, setSelectedDay] = useState(0)
    const [selectedTime, setSelectedTime] = useState('')
    const [bookType, setBookType] = useState<'in-person' | 'video'>('in-person')
    const [confirmed, setConfirmed] = useState(false)

    const startBooking = (doc: typeof DOCTORS[0]) => {
        setSelectedDoctor(doc)
        setView('bookingStep')
        setBStep(0)
    }

    if (confirmed) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F7FAFD' }}>
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', maxWidth: '400px', padding: '48px 24px' }}>
                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #1976D2, #00C853)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                        <CheckCircle size={40} color="white" />
                    </div>
                    <h2 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: '26px', fontWeight: 800, color: '#1A2332', marginBottom: '8px' }}>Appointment Booked!</h2>
                    <p style={{ color: '#4A5568', fontSize: '15px', lineHeight: 1.6, marginBottom: '28px' }}>
                        Your appointment with <strong>{selectedDoctor?.name}</strong> has been confirmed.
                    </p>
                    <div className="card" style={{ marginBottom: '24px', textAlign: 'left' }}>
                        {[
                            { label: 'Date', value: DAYS[selectedDay].replace('\n', ' ') },
                            { label: 'Time', value: selectedTime },
                            { label: 'Type', value: bookType === 'video' ? '📹 Video Consultation' : '🏥 In-Person' },
                            { label: 'Hospital', value: selectedDoctor?.hospital ?? '' },
                        ].map(r => (
                            <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <span style={{ color: '#4A5568', fontSize: '14px' }}>{r.label}</span>
                                <span style={{ fontWeight: 700, color: '#1A2332', fontSize: '14px' }}>{r.value}</span>
                            </div>
                        ))}
                    </div>
                    <a href="/appointments" onClick={() => { setConfirmed(false); setView('list') }} className="btn-primary" style={{ justifyContent: 'center', padding: '14px 32px', fontSize: '15px' }}>
                        View All Appointments
                    </a>
                </motion.div>
            </div>
        )
    }

    return (
        <div style={{ minHeight: '100vh', background: '#F7FAFD' }}>
            {/* Header */}
            <div style={{ background: 'linear-gradient(135deg, #0A3D6B, #1976D2)', padding: '28px 0' }}>
                <div className="container-xl" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <a href="/dashboard" style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ArrowLeft size={18} color="white" />
                    </a>
                    <div style={{ flex: 1 }}>
                        <h1 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', color: 'white', fontSize: '22px', fontWeight: 800 }}>Appointments</h1>
                        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '13px' }}>Manage your doctor visits</p>
                    </div>
                    {view === 'list' && (
                        <button onClick={() => setView('book')} className="btn-primary" style={{ background: 'rgba(255,255,255,0.2)', fontSize: '13px', padding: '9px 18px' }}>
                            <Plus size={15} /> Book New
                        </button>
                    )}
                    {view !== 'list' && (
                        <button onClick={() => { setView('list'); setBStep(0) }} style={{ padding: '8px 14px', borderRadius: '10px', background: 'rgba(255,255,255,0.15)', color: 'white', fontWeight: 600, fontSize: '13px', border: 'none', cursor: 'pointer' }}>
                            ← Back
                        </button>
                    )}
                </div>
            </div>

            {/* LIST VIEW */}
            {view === 'list' && (
                <div className="container-xl" style={{ padding: '28px 24px' }}>
                    {/* Tabs */}
                    <div style={{ display: 'flex', gap: '0', background: 'white', borderRadius: '12px', padding: '4px', marginBottom: '24px', maxWidth: '300px', boxShadow: 'var(--shadow-card)' }}>
                        {(['upcoming', 'past'] as const).map(t => (
                            <button key={t} onClick={() => setTab(t)} style={{
                                flex: 1, padding: '10px', borderRadius: '9px', fontWeight: 700, fontSize: '14px', textTransform: 'capitalize',
                                background: tab === t ? '#0A3D6B' : 'transparent', color: tab === t ? 'white' : '#4A5568',
                                border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                            }}>{t}</button>
                        ))}
                    </div>

                    {tab === 'upcoming' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {UPCOMING.map((appt, i) => (
                                <motion.div key={appt.id} className="card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                                    style={{ borderLeft: `4px solid ${appt.color}`, padding: '20px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                                        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                                            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: `${appt.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>👨‍⚕️</div>
                                            <div>
                                                <h3 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontWeight: 700, fontSize: '16px', color: '#1A2332', marginBottom: '2px' }}>{appt.doctor}</h3>
                                                <p style={{ fontSize: '13px', color: '#4A5568' }}>{appt.specialty} • {appt.hospital}</p>
                                            </div>
                                        </div>
                                        <span className={appt.type === 'video' ? 'badge badge-blue' : 'badge badge-green'} style={{ fontSize: '11px' }}>
                                            {appt.type === 'video' ? '📹 Video' : '🏥 In-Person'}
                                        </span>
                                    </div>
                                    <div style={{ display: 'flex', gap: '16px', marginBottom: '14px', fontSize: '13px', color: '#4A5568' }}>
                                        <span><Calendar size={13} style={{ display: 'inline', marginRight: '4px' }} />{appt.date}</span>
                                        <span><Clock size={13} style={{ display: 'inline', marginRight: '4px' }} />{appt.time}</span>
                                    </div>
                                    <p style={{ fontSize: '13px', color: '#4A5568', marginBottom: '16px', padding: '10px 14px', background: '#F9FAFB', borderRadius: '8px' }}>
                                        📝 {appt.reason}
                                    </p>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button style={{ flex: 1, padding: '9px', borderRadius: '10px', background: '#FFEBEE', color: '#D32F2F', fontWeight: 600, fontSize: '13px', border: 'none', cursor: 'pointer' }}>Cancel</button>
                                        <button style={{ flex: 1, padding: '9px', borderRadius: '10px', background: '#E3F2FD', color: '#0A3D6B', fontWeight: 600, fontSize: '13px', border: 'none', cursor: 'pointer' }}>Reschedule</button>
                                        {appt.type === 'video' && (
                                            <button style={{ flex: 1, padding: '9px', borderRadius: '10px', background: '#0A3D6B', color: 'white', fontWeight: 700, fontSize: '13px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                                                <Video size={14} /> Join Call
                                            </button>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {tab === 'past' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {PAST.map((appt, i) => (
                                <div key={appt.id} className="card" style={{ padding: '20px', opacity: 0.85 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                                        <div>
                                            <p style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontWeight: 700, fontSize: '15px', color: '#1A2332', marginBottom: '2px' }}>{appt.doctor}</p>
                                            <p style={{ fontSize: '12px', color: '#4A5568' }}>{appt.specialty} • {appt.date}</p>
                                        </div>
                                        <div style={{ display: 'flex', gap: '2px' }}>
                                            {[...Array(5)].map((_, j) => <Star key={j} size={13} color={j < (appt.rating ?? 0) ? '#F59E0B' : '#E8EFF7'} fill={j < (appt.rating ?? 0) ? '#F59E0B' : '#E8EFF7'} />)}
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button style={{ padding: '8px 14px', borderRadius: '9px', background: '#F0F4F8', color: '#4A5568', fontWeight: 600, fontSize: '13px', border: 'none', cursor: 'pointer' }}>View Summary</button>
                                        <button onClick={() => { setSelectedDoctor(DOCTORS[0]); setView('bookingStep'); setBStep(0) }} style={{ padding: '8px 14px', borderRadius: '9px', background: '#E3F2FD', color: '#0A3D6B', fontWeight: 600, fontSize: '13px', border: 'none', cursor: 'pointer' }}>Book Again</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* BOOK VIEW — Doctor search */}
            {view === 'book' && (
                <div className="container-xl" style={{ padding: '28px 24px' }}>
                    <h2 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: '20px', fontWeight: 800, color: '#1A2332', marginBottom: '20px' }}>Find a Doctor</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
                        {DOCTORS.map((doc, i) => (
                            <motion.div key={doc.id} className="card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '14px' }}>
                                    <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'linear-gradient(135deg, #E3F2FD, #E8F5E9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px' }}>{doc.emoji}</div>
                                    <div style={{ flex: 1 }}>
                                        <p style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontWeight: 700, fontSize: '15px', color: '#1A2332', marginBottom: '2px' }}>{doc.name}</p>
                                        <p style={{ fontSize: '12px', color: '#4A5568' }}>{doc.specialty} • {doc.experience} exp</p>
                                        <p style={{ fontSize: '12px', color: '#4A5568' }}>{doc.hospital}</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                                    <Star size={14} color="#F59E0B" fill="#F59E0B" />
                                    <span style={{ fontWeight: 700, color: '#1A2332' }}>{doc.rating}</span>
                                    <span style={{ color: '#4A5568', fontSize: '13px', marginLeft: 'auto' }}>Consult fee: <strong style={{ color: '#0A3D6B' }}>₹{doc.fee}</strong></span>
                                </div>
                                <div style={{ display: 'flex', gap: '4px', marginBottom: '14px', flexWrap: 'wrap' }}>
                                    {doc.available.map(d => <span key={d} className="badge badge-green" style={{ fontSize: '10px' }}>{d}</span>)}
                                </div>
                                <button onClick={() => startBooking(doc)} className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '14px', padding: '10px' }}>
                                    Book Appointment
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}

            {/* BOOKING STEPS */}
            {view === 'bookingStep' && selectedDoctor && (
                <div className="container-xl" style={{ padding: '28px 24px', maxWidth: '660px' }}>
                    {/* Step progress */}
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '28px' }}>
                        {['Select Date', 'Select Time', 'Visit Type', 'Confirm'].map((label, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: i < 3 ? 1 : 'none' }}>
                                <div style={{
                                    width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    background: bStep > i ? '#00C853' : bStep === i ? '#0A3D6B' : '#E8EFF7',
                                    color: bStep >= i ? 'white' : '#9CA3AF', fontWeight: 800, fontSize: '12px', flexShrink: 0,
                                }}>
                                    {bStep > i ? <CheckCircle size={14} /> : i + 1}
                                </div>
                                {i < 3 && <div style={{ height: '2px', flex: 1, background: bStep > i ? '#00C853' : '#E8EFF7' }} />}
                            </div>
                        ))}
                    </div>

                    <div className="card">
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid #E8EFF7' }}>
                            <div style={{ fontSize: '32px' }}>{selectedDoctor.emoji}</div>
                            <div>
                                <p style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontWeight: 700, fontSize: '16px', color: '#1A2332' }}>{selectedDoctor.name}</p>
                                <p style={{ fontSize: '13px', color: '#4A5568' }}>{selectedDoctor.specialty} • ₹{selectedDoctor.fee}</p>
                            </div>
                        </div>

                        {/* Step 0 — Date */}
                        {bStep === 0 && (
                            <div>
                                <p style={{ fontWeight: 700, color: '#1A2332', marginBottom: '16px' }}>Select a Date</p>
                                <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '4px' }}>
                                    {DAYS.map((d, i) => (
                                        <button key={i} onClick={() => setSelectedDay(i)} style={{
                                            minWidth: '70px', padding: '12px 8px', borderRadius: '12px', textAlign: 'center', cursor: 'pointer',
                                            background: selectedDay === i ? '#0A3D6B' : '#F0F4F8',
                                            color: selectedDay === i ? 'white' : '#4A5568',
                                            border: 'none', fontWeight: 600, fontSize: '12px', lineHeight: 1.4, whiteSpace: 'pre',
                                        }}>{d}</button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Step 1 — Time */}
                        {bStep === 1 && (
                            <div>
                                <p style={{ fontWeight: 700, color: '#1A2332', marginBottom: '16px' }}>Select a Time Slot</p>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                                    {TIMES.map(t => (
                                        <button key={t} onClick={() => !BOOKED.includes(t) && setSelectedTime(t)} disabled={BOOKED.includes(t)} style={{
                                            padding: '10px', borderRadius: '10px', fontWeight: 600, fontSize: '13px', cursor: BOOKED.includes(t) ? 'not-allowed' : 'pointer',
                                            background: selectedTime === t ? '#0A3D6B' : BOOKED.includes(t) ? '#F5F7FA' : '#F0F4F8',
                                            color: selectedTime === t ? 'white' : BOOKED.includes(t) ? '#CBD5E1' : '#4A5568',
                                            border: 'none', transition: 'all 0.2s',
                                            textDecoration: BOOKED.includes(t) ? 'line-through' : 'none',
                                        }}>{t}</button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Step 2 — Visit Type */}
                        {bStep === 2 && (
                            <div>
                                <p style={{ fontWeight: 700, color: '#1A2332', marginBottom: '16px' }}>Select Visit Type</p>
                                <div style={{ display: 'flex', gap: '12px' }}>
                                    {([['in-person', '🏥', 'In-Person Visit'], ['video', '📹', 'Video Consultation']] as const).map(([type, icon, label]) => (
                                        <button key={type} onClick={() => setBookType(type as any)} style={{
                                            flex: 1, padding: '20px', borderRadius: '14px', border: `2px solid ${bookType === type ? '#1976D2' : '#E8EFF7'}`,
                                            background: bookType === type ? '#E3F2FD' : 'white', cursor: 'pointer', textAlign: 'center',
                                        }}>
                                            <p style={{ fontSize: '32px', marginBottom: '8px' }}>{icon}</p>
                                            <p style={{ fontWeight: 700, color: bookType === type ? '#0A3D6B' : '#1A2332', fontSize: '14px' }}>{label}</p>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Step 3 — Confirm */}
                        {bStep === 3 && (
                            <div>
                                <p style={{ fontWeight: 700, color: '#1A2332', marginBottom: '16px' }}>Confirm Your Appointment</p>
                                <div style={{ background: '#F9FAFB', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
                                    {[
                                        { label: 'Date', value: DAYS[selectedDay].replace('\n', ' ') },
                                        { label: 'Time', value: selectedTime || '11:00 AM' },
                                        { label: 'Type', value: bookType === 'video' ? '📹 Video' : '🏥 In-Person' },
                                        { label: 'Fee', value: `₹${selectedDoctor.fee}` },
                                    ].map(item => (
                                        <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                            <span style={{ color: '#4A5568', fontSize: '14px' }}>{item.label}</span>
                                            <span style={{ fontWeight: 700, color: '#1A2332', fontSize: '14px' }}>{item.value}</span>
                                        </div>
                                    ))}
                                </div>
                                <div style={{ background: '#E8F5E9', borderRadius: '10px', padding: '12px 14px', marginBottom: '16px' }}>
                                    <p style={{ color: '#1B5E20', fontSize: '13px', fontWeight: 600 }}>✓ Insurance may cover part of this consultation fee</p>
                                </div>
                            </div>
                        )}

                        <div style={{ display: 'flex', gap: '10px', marginTop: '24px' }}>
                            {bStep > 0 && (
                                <button onClick={() => setBStep(s => s - 1)} style={{ padding: '12px 20px', borderRadius: '12px', background: '#F0F4F8', color: '#4A5568', fontWeight: 700, fontSize: '14px', border: 'none', cursor: 'pointer' }}>
                                    Back
                                </button>
                            )}
                            <button onClick={() => bStep < 3 ? setBStep(s => s + 1) : setConfirmed(true)}
                                disabled={bStep === 1 && !selectedTime}
                                className="btn-primary" style={{ flex: 1, justifyContent: 'center', fontSize: '15px', padding: '13px', opacity: bStep === 1 && !selectedTime ? 0.5 : 1 }}>
                                {bStep === 3 ? 'Confirm & Pay ₹' + selectedDoctor.fee : 'Continue →'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
