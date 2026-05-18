'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Navigation, Clock, Phone, AlertCircle } from 'lucide-react'

const GOOGLE_MAPS_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || ''

function ETATimer({ start = 480 }: { start?: number }) {
  const [seconds, setSeconds] = useState(start)
  useEffect(() => {
    const t = setInterval(() => setSeconds(s => Math.max(0, s - 1)), 1000)
    return () => clearInterval(t)
  }, [])
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  const isUrgent = seconds < 60
  return (
    <span style={{ color: isUrgent ? '#D32F2F' : '#00C853', fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: '32px', fontWeight: 900 }}>
      {mins}:{secs.toString().padStart(2, '0')}
    </span>
  )
}

export default function AmbulancePage() {
  const mapRef = useRef<HTMLDivElement>(null)
  const googleMapRef = useRef<google.maps.Map | null>(null)
  const ambulanceMarkerRef = useRef<google.maps.Marker | null>(null)
  const [userPos, setUserPos] = useState({ lat: 28.6315, lng: 77.2167 })
  const [ambPos, setAmbPos] = useState({ lat: 28.6315 + 0.012, lng: 77.2167 + 0.008 })
  const [mapLoaded, setMapLoaded] = useState(false)
  const [mapsError, setMapsError] = useState(false)

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const p = { lat: pos.coords.latitude, lng: pos.coords.longitude }
          setUserPos(p)
          setAmbPos({ lat: p.lat + 0.012, lng: p.lng + 0.008 })
        },
        () => {}
      )
    }
  }, [])

  // Load Google Maps script
  useEffect(() => {
    if (!GOOGLE_MAPS_KEY) { setMapsError(true); return }
    if (window.google?.maps) { setMapLoaded(true); return }
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_KEY}`
    script.onload = () => setMapLoaded(true)
    script.onerror = () => setMapsError(true)
    document.head.appendChild(script)
    return () => { document.head.removeChild(script) }
  }, [])

  // Init map
  useEffect(() => {
    if (!mapLoaded || !mapRef.current) return
    const map = new window.google.maps.Map(mapRef.current, {
      center: userPos,
      zoom: 14,
      styles: [{ featureType: 'poi', stylers: [{ visibility: 'off' }] }],
    })
    googleMapRef.current = map

    new window.google.maps.Marker({
      position: userPos,
      map,
      icon: { url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" fill="#1976D2" stroke="white" stroke-width="3"/><text x="16" y="21" text-anchor="middle" fill="white" font-size="16">👤</text></svg>'), scaledSize: new window.google.maps.Size(40, 40) },
      title: 'Your Location',
    })

    const ambMarker = new window.google.maps.Marker({
      position: ambPos,
      map,
      icon: { url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="#D32F2F" stroke="white" stroke-width="3"/><text x="20" y="26" text-anchor="middle" fill="white" font-size="20">🚑</text></svg>'), scaledSize: new window.google.maps.Size(48, 48) },
      title: 'Ambulance',
    })
    ambulanceMarkerRef.current = ambMarker
  }, [mapLoaded, userPos])

  // Animate ambulance 0.001 closer every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setAmbPos(prev => {
        const latDiff = userPos.lat - prev.lat
        const lngDiff = userPos.lng - prev.lng
        const dist = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff)
        if (dist < 0.001) return prev
        const newPos = {
          lat: prev.lat + (latDiff / dist) * 0.001,
          lng: prev.lng + (lngDiff / dist) * 0.001,
        }
        ambulanceMarkerRef.current?.setPosition(newPos)
        return newPos
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [userPos])

  return (
    <div style={{ minHeight: '100vh', background: '#F7FAFD' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #D32F2F, #FF5252)', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <a href="/emergency" style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
          <ArrowLeft size={18} color="white" />
        </a>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', color: 'white', fontSize: '20px', fontWeight: 800 }}>Live Ambulance Tracking</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '13px' }}>🚑 Ramu Singh • DL 5A 1234 • ⭐ 4.9</p>
        </div>
        <a href="tel:+919811234567" style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '10px', background: 'rgba(255,255,255,0.2)', color: 'white', fontWeight: 700, fontSize: '13px', textDecoration: 'none' }}>
          <Phone size={14} /> Call Driver
        </a>
      </div>

      {/* Map */}
      <div style={{ position: 'relative', height: '55vh', background: '#E3F2FD' }}>
        {mapsError || !GOOGLE_MAPS_KEY ? (
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #E3F2FD, #E8F5E9)', gap: '12px' }}>
            <div style={{ fontSize: '72px' }}>🗺️</div>
            <p style={{ fontWeight: 700, color: '#0A3D6B', fontSize: '16px' }}>Map Preview</p>
            <p style={{ color: '#4A5568', fontSize: '13px', textAlign: 'center', maxWidth: '280px' }}>Add NEXT_PUBLIC_GOOGLE_MAPS_KEY to .env.local to enable live map</p>
            <motion.div
              animate={{ x: [0, 20, 40, 60, 40, 20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              style={{ fontSize: '36px', marginTop: '8px' }}
            >
              🚑
            </motion.div>
          </div>
        ) : (
          <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
        )}
      </div>

      {/* Info Panel */}
      <div style={{ padding: '20px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {/* ETA */}
        <div className="card" style={{ textAlign: 'center', padding: '24px 16px' }}>
          <Clock size={24} color="#1976D2" style={{ margin: '0 auto 8px' }} />
          <p style={{ fontSize: '12px', color: '#4A5568', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>ETA</p>
          <ETATimer start={480} />
          <p style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '4px' }}>minutes remaining</p>
        </div>

        {/* Distance */}
        <div className="card" style={{ textAlign: 'center', padding: '24px 16px' }}>
          <Navigation size={24} color="#00C853" style={{ margin: '0 auto 8px' }} />
          <p style={{ fontSize: '12px', color: '#4A5568', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>Distance</p>
          <span style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: '32px', fontWeight: 900, color: '#1A2332' }}>1.4</span>
          <p style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '4px' }}>km away</p>
        </div>
      </div>

      {/* Status */}
      <div style={{ padding: '0 24px 24px' }}>
        <div className="card" style={{ padding: '20px', background: 'linear-gradient(135deg, #E8F5E9, #F1F8E9)', border: '1px solid #C8E6C9' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ fontSize: '24px' }}>🚑</motion.div>
            <div>
              <p style={{ fontWeight: 700, color: '#1B5E20', fontSize: '15px' }}>Ambulance is on the way!</p>
              <p style={{ fontSize: '13px', color: '#388E3C' }}>Moving towards your location</p>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00C853', display: 'inline-block', animation: 'pulse 1.5s infinite' }} />
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#00C853' }}>LIVE</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <a href="tel:112" style={{ flex: 1, padding: '10px', borderRadius: '10px', background: '#D32F2F', color: 'white', fontWeight: 700, fontSize: '13px', textDecoration: 'none', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <AlertCircle size={14} /> Call 112
            </a>
            <a href="/emergency" style={{ flex: 1, padding: '10px', borderRadius: '10px', background: '#0A3D6B', color: 'white', fontWeight: 700, fontSize: '13px', textDecoration: 'none', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              ← Back to SOS
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
