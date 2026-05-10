'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Camera, CheckCircle, AlertCircle, Loader2, User, Droplets, Pill, Zap,
    ArrowLeft, Activity, Phone, MapPin, Clock, Send, Shield, Hospital,
    ChevronRight, Brain
} from 'lucide-react'

type ScanPhase = 'idle' | 'scanning' | 'matched' | 'error'

const matchedPatient = {
    name: 'Arjun Sharma',
    age: 52,
    photo: '👨',
    bloodGroup: 'O+',
    allergies: ['Penicillin', 'Aspirin'],
    medications: ['Warfarin 5mg', 'Atenolol 25mg', 'Metoprolol'],
    conditions: ['Coronary Artery Disease', 'Atrial Fibrillation'],
    emergencyContact: 'Meena Sharma +91-98765-12345',
    abhaId: 'ABHA-4521-8890-3312',
    confidence: 97.4,
}

const nearestHospital = {
    name: 'Apollo Hospital, Sarita Vihar',
    dist: '3.2 km',
    eta: '9 min',
    icuBeds: 3,
    alertStatus: 'sent'
}

export default function FaceScanPage() {
    const [phase, setPhase] = useState<ScanPhase>('idle')
    const [alertSent, setAlertSent] = useState(false)

    const startScan = () => {
        setPhase('scanning')
        setTimeout(() => setPhase('matched'), 3000)
    }

    const sendAlert = () => setAlertSent(true)

    return (
        <div className="min-h-screen bg-[#0D1F3C] text-white">
            {/* Header */}
            <div className="px-4 pt-12 pb-4 flex items-center gap-3">
                <a href="/" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <ArrowLeft className="w-4 h-4" />
                </a>
                <div>
                    <h1 className="font-bold text-lg">Face Scan ID</h1>
                    <p className="text-white/50 text-xs">Ambulance Staff • Emergency Use</p>
                </div>
                <div className="ml-auto flex items-center gap-1 bg-red-500/20 border border-red-500/30 px-2 py-1 rounded-full">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                    <span className="text-red-300 text-[10px] font-bold">EMERGENCY MODE</span>
                </div>
            </div>

            {/* Camera viewfinder */}
            <div className="px-4">
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-black/60 border border-white/10 shadow-2xl">
                    {/* Simulated camera background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />

                    {phase === 'idle' && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                            <div className="w-40 h-40 rounded-full border-2 border-dashed border-white/30 flex items-center justify-center">
                                <User className="w-16 h-16 text-white/30" />
                            </div>
                            <p className="text-white/50 text-sm">Position patient's face in frame</p>
                        </div>
                    )}

                    {phase === 'scanning' && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                            {/* Animated scan line */}
                            <div className="relative w-40 h-40">
                                <div className="w-40 h-40 rounded-full border-2 border-[#2ECC71] flex items-center justify-center text-7xl">
                                    👨
                                </div>
                                <motion.div
                                    className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#2ECC71] to-transparent"
                                    animate={{ top: ['10%', '90%', '10%'] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                                />
                                {/* Corner brackets */}
                                {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((pos, i) => (
                                    <div key={i} className={`absolute w-5 h-5 border-[#2ECC71] ${pos} ${i < 2 ? 'border-t-2' : 'border-b-2'} ${i % 2 === 0 ? 'border-l-2' : 'border-r-2'}`} />
                                ))}
                            </div>
                            <div className="flex items-center gap-2 text-[#2ECC71]">
                                <Brain className="w-4 h-4 animate-pulse" />
                                <span className="text-sm font-semibold">Matching face to ABHA database…</span>
                            </div>
                        </div>
                    )}

                    {phase === 'matched' && (
                        <motion.div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <div className="relative">
                                <div className="w-24 h-24 rounded-full border-4 border-[#2ECC71] flex items-center justify-center text-5xl bg-[#2ECC71]/10">
                                    {matchedPatient.photo}
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#2ECC71] flex items-center justify-center">
                                    <CheckCircle className="w-5 h-5 text-white" />
                                </div>
                            </div>
                            <div className="text-center">
                                <p className="font-extrabold text-xl text-[#2ECC71]">Match Found!</p>
                                <p className="text-white/60 text-xs">{matchedPatient.confidence}% confidence</p>
                            </div>
                        </motion.div>
                    )}

                    {phase === 'error' && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                            <AlertCircle className="w-12 h-12 text-[#FF4D4D]" />
                            <p className="text-[#FF4D4D] font-bold">No match found</p>
                            <p className="text-white/50 text-xs">Patient may not be registered</p>
                        </div>
                    )}

                    {/* Overlay corner brackets (always visible) */}
                    {phase === 'idle' && (
                        <>
                            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-white/40 rounded-tl-lg" />
                            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/40 rounded-tr-lg" />
                            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-white/40 rounded-bl-lg" />
                            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-white/40 rounded-br-lg" />
                        </>
                    )}
                </div>

                {/* Scan button */}
                {phase === 'idle' && (
                    <motion.button onClick={startScan}
                        className="mt-4 w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-gradient-to-r from-[#2ECC71] to-[#27ae60] text-white font-bold text-base shadow-xl shadow-green-500/30"
                        whileTap={{ scale: 0.97 }}>
                        <Camera className="w-6 h-6" /> Scan Patient Face
                    </motion.button>
                )}

                {phase === 'scanning' && (
                    <div className="mt-4 w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-white/10">
                        <Loader2 className="w-5 h-5 animate-spin text-[#2ECC71]" />
                        <span className="text-[#2ECC71] font-semibold">Scanning…</span>
                    </div>
                )}
            </div>

            {/* Patient Profile — shown after match */}
            <AnimatePresence>
                {phase === 'matched' && (
                    <motion.div className="px-4 mt-4 pb-8 flex flex-col gap-3"
                        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>

                        {/* Identity */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="font-bold text-white">Patient Identity</h3>
                                <span className="text-[10px] bg-[#2ECC71]/20 text-[#2ECC71] font-bold px-2 py-0.5 rounded-full">✓ ABHA Verified</span>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { label: 'Name', value: matchedPatient.name },
                                    { label: 'Age', value: `${matchedPatient.age} years` },
                                    { label: 'Blood Group', value: matchedPatient.bloodGroup },
                                    { label: 'ABHA ID', value: matchedPatient.abhaId.substring(0, 14) + '…' },
                                ].map(f => (
                                    <div key={f.label}>
                                        <p className="text-white/40 text-[10px] uppercase font-semibold">{f.label}</p>
                                        <p className="text-white font-bold text-sm">{f.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Critical Info */}
                        <div className="bg-red-500/15 border border-red-500/30 rounded-2xl p-4">
                            <h3 className="font-bold text-red-300 mb-3 flex items-center gap-2">
                                <AlertCircle className="w-4 h-4" /> Critical Info for Doctors
                            </h3>
                            <div className="space-y-2">
                                <div><p className="text-[10px] text-white/50 uppercase font-semibold">Allergies</p>
                                    <div className="flex flex-wrap gap-1 mt-1">{matchedPatient.allergies.map(a => <span key={a} className="bg-red-500/30 text-red-200 text-xs font-semibold px-2 py-0.5 rounded-full">⚠️ {a}</span>)}</div>
                                </div>
                                <div><p className="text-[10px] text-white/50 uppercase font-semibold mt-2">Current Medications</p>
                                    <div className="flex flex-wrap gap-1 mt-1">{matchedPatient.medications.map(m => <span key={m} className="bg-purple-500/30 text-purple-200 text-xs font-semibold px-2 py-0.5 rounded-full">{m}</span>)}</div>
                                </div>
                                <div><p className="text-[10px] text-white/50 uppercase font-semibold mt-2">Conditions</p>
                                    <div className="flex flex-wrap gap-1 mt-1">{matchedPatient.conditions.map(c => <span key={c} className="bg-orange-500/30 text-orange-200 text-xs font-semibold px-2 py-0.5 rounded-full">{c}</span>)}</div>
                                </div>
                            </div>
                        </div>

                        {/* Nearest hospital */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                            <h3 className="font-bold text-white mb-3 flex items-center gap-2"><Hospital className="w-4 h-4 text-[#2ECC71]" /> Nearest Hospital</h3>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-bold text-white text-sm">{nearestHospital.name}</p>
                                    <div className="flex gap-3 mt-1 text-xs text-white/60">
                                        <span><MapPin className="w-3 h-3 inline" /> {nearestHospital.dist}</span>
                                        <span><Clock className="w-3 h-3 inline" /> {nearestHospital.eta}</span>
                                        <span className="text-[#2ECC71] font-semibold">ICU: {nearestHospital.icuBeds} available</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Send Alert */}
                        {!alertSent ? (
                            <motion.button onClick={sendAlert}
                                className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-gradient-to-r from-[#0F4C81] to-[#1a6bb5] text-white font-bold shadow-xl"
                                whileTap={{ scale: 0.97 }}>
                                <Send className="w-5 h-5" /> Send Patient Profile to Hospital
                            </motion.button>
                        ) : (
                            <div className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-[#2ECC71]/20 border border-[#2ECC71]/40">
                                <CheckCircle className="w-5 h-5 text-[#2ECC71]" />
                                <span className="text-[#2ECC71] font-bold">Profile sent to Apollo Hospital ✓</span>
                            </div>
                        )}

                        <button onClick={() => { setPhase('idle'); setAlertSent(false) }}
                            className="w-full py-3 rounded-2xl border border-white/20 text-white/60 text-sm font-semibold hover:bg-white/5">
                            Scan Another Patient
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
