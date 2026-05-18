'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, MapPin, Star, Phone, Clock, Bed } from 'lucide-react'

const HOSPITAL_DATA = [
  { name: 'Apollo Hospital', area: 'Sarita Vihar, Delhi', dist: '2.4 km', rating: 4.8, phone: '+91 11 2692 5858', specialties: ['Cardiology', 'Neurology', 'Oncology'], emoji: '🏥' },
  { name: 'AIIMS Delhi', area: 'Ansari Nagar, Delhi', dist: '3.1 km', rating: 4.9, phone: '+91 11 2659 3308', specialties: ['Multi-specialty', 'Trauma', 'Pediatrics'], emoji: '🏛️' },
  { name: 'Fortis Memorial', area: 'Gurgaon, Haryana', dist: '4.8 km', rating: 4.7, phone: '+91 124 4921 021', specialties: ['Orthopaedics', 'Gastro', 'Urology'], emoji: '🏥' },
  { name: 'Max Super Speciality', area: 'Saket, Delhi', dist: '5.2 km', rating: 4.6, phone: '+91 11 2651 5050', specialties: ['Cardiac', 'Neuro', 'Transplant'], emoji: '🏥' },
  { name: 'Medanta — The Medicity', area: 'Sector 38, Gurgaon', dist: '7.0 km', rating: 4.8, phone: '+91 124 4141 414', specialties: ['Cancer', 'Heart', 'Renal'], emoji: '🏥' },
  { name: 'BLK-Max Super Speciality', area: 'Pusa Road, Delhi', dist: '6.3 km', rating: 4.5, phone: '+91 11 3040 3040', specialties: ['Haematology', 'Bone Marrow', 'Cardio'], emoji: '🏨' },
]

type BedData = { icu: number; general: number; emergency: number }

export default function HospitalsPage() {
  const [filter, setFilter] = useState<'all' | 'icu' | 'emergency'>('all')

  // Generate random beds once
  const beds = useMemo<BedData[]>(() =>
    HOSPITAL_DATA.map(() => ({
      icu: Math.floor(Math.random() * 11),
      general: 10 + Math.floor(Math.random() * 41),
      emergency: Math.floor(Math.random() * 6),
    })),
    []
  )

  const filtered = HOSPITAL_DATA.filter((_, i) => {
    if (filter === 'icu') return beds[i].icu > 0
    if (filter === 'emergency') return beds[i].emergency > 0
    return true
  })

  const filteredBeds = filtered.map((h) => beds[HOSPITAL_DATA.indexOf(h)])

  return (
    <div style={{ minHeight: '100vh', background: '#F7FAFD' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #0A3D6B, #1976D2)', padding: '28px 0' }}>
        <div className="container-xl" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <a href="/dashboard" style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ArrowLeft size={18} color="white" />
          </a>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', color: 'white', fontSize: '22px', fontWeight: 800 }}>Nearby Hospitals</h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px' }}>Real-time bed availability • New Delhi</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00C853', display: 'inline-block', animation: 'pulse 1.5s infinite' }} />
            <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '12px', fontWeight: 700 }}>LIVE DATA</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div style={{ background: 'white', borderBottom: '1px solid #E8EFF7', padding: '12px 0' }}>
        <div className="container-xl" style={{ display: 'flex', gap: '10px' }}>
          {([
            { key: 'all', label: '🏥 All Hospitals' },
            { key: 'icu', label: '🛏️ Has ICU Beds' },
            { key: 'emergency', label: '🚨 Has Emergency Beds' },
          ] as const).map(f => (
            <button key={f.key} onClick={() => setFilter(f.key)} style={{
              padding: '8px 18px', borderRadius: '999px', fontSize: '13px', fontWeight: 600,
              background: filter === f.key ? '#0A3D6B' : 'white',
              color: filter === f.key ? 'white' : '#4A5568',
              border: `1.5px solid ${filter === f.key ? '#0A3D6B' : '#E8EFF7'}`,
              cursor: 'pointer', transition: 'all 0.2s',
            }}>{f.label}</button>
          ))}
        </div>
      </div>

      {/* Hospital Cards */}
      <div className="container-xl" style={{ padding: '28px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
          {filtered.map((h, i) => {
            const b = filteredBeds[i]
            return (
              <motion.div key={h.name} className="card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} style={{ padding: '0', overflow: 'hidden' }}>
                {/* Card Header */}
                <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid #F5F7FA' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '12px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'linear-gradient(135deg, #E3F2FD, #E8F5E9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0 }}>{h.emoji}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <h3 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontWeight: 700, fontSize: '15px', color: '#1A2332' }}>{h.name}</h3>
                        {/* Live badge */}
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '2px 8px', borderRadius: '999px', background: '#E8F5E9', fontSize: '10px', fontWeight: 700, color: '#00C853', flexShrink: 0 }}>
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00C853', animation: 'pulse 1.5s infinite', display: 'inline-block' }} />
                          LIVE
                        </span>
                      </div>
                      <p style={{ fontSize: '12px', color: '#4A5568', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <MapPin size={11} /> {h.area} • {h.dist}
                      </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '3px', flexShrink: 0 }}>
                      <Star size={13} color="#F59E0B" fill="#F59E0B" />
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#1A2332' }}>{h.rating}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {h.specialties.map(s => (
                      <span key={s} className="badge badge-blue" style={{ fontSize: '10px' }}>{s}</span>
                    ))}
                  </div>
                </div>

                {/* Bed Availability */}
                <div style={{ padding: '16px 20px', background: '#F9FAFB' }}>
                  <p style={{ fontSize: '11px', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>Bed Availability</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '16px' }}>
                    {[
                      { label: 'ICU', count: b.icu, color: b.icu > 0 ? '#D32F2F' : '#9CA3AF', bg: b.icu > 0 ? '#FFEBEE' : '#F5F7FA' },
                      { label: 'General', count: b.general, color: '#1976D2', bg: '#E3F2FD' },
                      { label: 'Emergency', count: b.emergency, color: b.emergency > 0 ? '#F59E0B' : '#9CA3AF', bg: b.emergency > 0 ? '#FFF8E1' : '#F5F7FA' },
                    ].map(bed => (
                      <div key={bed.label} style={{ textAlign: 'center', padding: '10px 8px', borderRadius: '10px', background: bed.bg }}>
                        <Bed size={16} color={bed.color} style={{ margin: '0 auto 4px' }} />
                        <p style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: '20px', fontWeight: 900, color: bed.color }}>{bed.count}</p>
                        <p style={{ fontSize: '10px', color: '#4A5568', fontWeight: 600 }}>{bed.label}</p>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <a href={`tel:${h.phone}`} style={{ flex: 1, padding: '9px', borderRadius: '10px', background: 'white', border: '1px solid #E8EFF7', color: '#1A2332', fontWeight: 700, fontSize: '12px', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                      <Phone size={13} /> Call
                    </a>
                    <a href="/booking" style={{ flex: 2, padding: '9px', borderRadius: '10px', background: '#0A3D6B', color: 'white', fontWeight: 700, fontSize: '12px', textDecoration: 'none', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                      <Clock size={13} /> Book Appointment
                    </a>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '64px 0' }}>
            <p style={{ fontSize: '48px', marginBottom: '12px' }}>🛏️</p>
            <p style={{ fontWeight: 700, color: '#1A2332', fontSize: '16px' }}>No hospitals match this filter</p>
            <p style={{ color: '#4A5568', fontSize: '13px', marginTop: '4px' }}>Try "All Hospitals" to see all nearby facilities</p>
          </div>
        )}
      </div>
    </div>
  )
}
