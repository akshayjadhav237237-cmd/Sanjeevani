'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Activity, Bed, AlertCircle, CheckCircle, Clock, Ambulance, MapPin,
    ArrowLeft, RefreshCw, Phone, Brain, Wifi
} from 'lucide-react'

const wards = [
    {
        name: 'ICU', total: 20, available: 5, occupied: 14, maintenance: 1, color: '#FF4D4D', bg: '#FFF0F0',
        patients: [
            { name: 'Arjun Sharma', age: 52, condition: 'Post-cardiac event', bedNo: 'ICU-03', critical: true },
            { name: 'Sunita Devi', age: 67, condition: 'Respiratory failure', bedNo: 'ICU-07', critical: true },
        ]
    },
    {
        name: 'Emergency', total: 15, available: 3, occupied: 11, maintenance: 1, color: '#F59E0B', bg: '#FFFBEB',
        patients: [
            { name: 'Rahul Verma', age: 34, condition: 'Fracture — Road accident', bedNo: 'EM-02', critical: false },
        ]
    },
    { name: 'General', total: 80, available: 22, occupied: 56, maintenance: 2, color: '#2ECC71', bg: '#EDFAF4', patients: [] },
]

const incoming = [
    { name: 'Arjun Sharma', age: 52, bloodGroup: 'O+', condition: 'Suspected MI', eta: '6 min', ambulanceId: 'KA-01-AB-1234', allergies: ['Penicillin', 'Aspirin'], assignedBed: 'ICU-03', severity: 'critical' },
    { name: 'Meera Singh', age: 28, bloodGroup: 'A+', condition: 'Severe asthma attack', eta: '14 min', ambulanceId: 'DL-04-CD-5678', allergies: [], assignedBed: 'EM-04', severity: 'high' },
]

function BedGrid({ total, available, color }: { total: number; available: number; color: string }) {
    const show = Math.min(total, 40)
    return (
        <div className="flex flex-wrap gap-1 mt-2">
            {Array.from({ length: show }).map((_, i) => (
                <div key={i} className="w-3.5 h-3.5 rounded-sm"
                    style={{ backgroundColor: i < total - available ? 'rgba(0,0,0,0.08)' : color }} />
            ))}
            {total > 40 && <span className="text-[10px] text-[#6B7A90]">+{total - 40} more</span>}
        </div>
    )
}

export default function HospitalDashboardPage() {
    const [tab, setTab] = useState<'beds' | 'incoming' | 'alerts'>('beds')
    const [alertSeen, setAlertSeen] = useState(false)

    return (
        <div className="min-h-screen bg-[#F5F9FC]">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#0F4C81] to-[#1a6bb5] px-4 pt-12 pb-6">
                <div className="flex items-center gap-3 mb-4">
                    <a href="/" className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                        <ArrowLeft className="w-4 h-4 text-white" />
                    </a>
                    <div>
                        <h1 className="text-white font-bold text-lg">Hospital Dashboard</h1>
                        <p className="text-white/60 text-xs">Apollo Hospital, Sarita Vihar</p>
                    </div>
                    <div className="ml-auto flex items-center gap-1 bg-[#2ECC71]/20 px-2 py-1 rounded-full">
                        <Wifi className="w-3 h-3 text-[#2ECC71]" />
                        <span className="text-[#2ECC71] text-[10px] font-bold">Live</span>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                    {[
                        { label: 'Total Beds', value: '115', icon: Bed },
                        { label: 'Available', value: '30', icon: CheckCircle, color: '#2ECC71' },
                        { label: 'Incoming', value: '2', icon: Ambulance, color: '#FF4D4D' },
                    ].map(s => (
                        <div key={s.label} className="bg-white/10 rounded-xl p-3 border border-white/10">
                            <s.icon className="w-3.5 h-3.5 text-white/70 mb-1" />
                            <p className="font-extrabold text-xl text-white" style={s.color ? { color: s.color } : {}}>{s.value}</p>
                            <p className="text-white/50 text-[10px]">{s.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Alert Banner */}
            {!alertSeen && (
                <motion.div className="mx-4 mt-3 bg-red-50 border border-red-200 rounded-2xl p-3 flex items-center gap-3"
                    initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="w-8 h-8 rounded-xl bg-[#FF4D4D] flex items-center justify-center shrink-0 animate-pulse">
                        <Ambulance className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                        <p className="font-bold text-[#FF4D4D] text-xs">🚨 Incoming: Arjun Sharma — MI</p>
                        <p className="text-[#6B7A90] text-[10px]">ICU-03 pre-assigned • ETA 6 min • Allergic to Penicillin</p>
                    </div>
                    <button onClick={() => setAlertSeen(true)} className="text-[#FF4D4D] text-xs font-bold shrink-0">Ack</button>
                </motion.div>
            )}

            {/* Tabs */}
            <div className="px-4 mt-3">
                <div className="flex bg-white rounded-2xl p-1 shadow border border-gray-100 mb-4">
                    {(['beds', 'incoming', 'alerts'] as const).map(t => (
                        <button key={t} onClick={() => setTab(t)}
                            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all relative ${tab === t ? 'bg-[#0F4C81] text-white' : 'text-[#6B7A90]'}`}>
                            {t === 'beds' ? '🛏️ Bed Board' : t === 'incoming' ? '🚑 Incoming' : '🔔 Alerts'}
                            {t === 'incoming' && <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#FF4D4D] text-white text-[8px] font-bold flex items-center justify-center">2</span>}
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {tab === 'beds' && (
                        <motion.div key="beds" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-3 pb-16">
                            {wards.map(ward => (
                                <div key={ward.name} className="bg-white rounded-2xl p-4 shadow border border-gray-100">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: ward.bg }}>
                                                <Bed className="w-4 h-4" style={{ color: ward.color }} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-[#1F2D3D] text-sm">{ward.name}</h4>
                                                <p className="text-[10px] text-[#6B7A90]">{ward.total} total</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-2xl font-extrabold" style={{ color: ward.color }}>{ward.available}</span>
                                            <p className="text-[10px] text-[#6B7A90]">available</p>
                                        </div>
                                    </div>
                                    <BedGrid total={ward.total} available={ward.available} color={ward.color} />
                                    <div className="flex gap-3 mt-2 text-[10px] text-[#6B7A90]">
                                        <span style={{ color: ward.color }}>● {ward.available} Free</span>
                                        <span className="opacity-50">● {ward.occupied} Occupied</span>
                                    </div>
                                    {ward.patients.length > 0 && (
                                        <div className="mt-3 pt-3 border-t border-gray-100 space-y-1.5">
                                            {ward.patients.map(p => (
                                                <div key={p.name} className={`flex items-center gap-2 py-2 px-3 rounded-xl ${p.critical ? 'bg-red-50 border border-red-100' : 'bg-gray-50'}`}>
                                                    <span className="text-sm">👤</span>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-bold text-xs text-[#1F2D3D]">{p.name}, {p.age}</p>
                                                        <p className="text-[10px] text-[#6B7A90] truncate">{p.condition}</p>
                                                    </div>
                                                    <span className="text-[10px] font-bold text-[#0F4C81]">{p.bedNo}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </motion.div>
                    )}

                    {tab === 'incoming' && (
                        <motion.div key="incoming" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-3 pb-16">
                            {incoming.map((p, i) => (
                                <motion.div key={p.name} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                                    className={`bg-white rounded-2xl p-4 shadow border ${p.severity === 'critical' ? 'border-red-200' : 'border-orange-200'}`}>
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full animate-pulse ${p.severity === 'critical' ? 'bg-[#FF4D4D]' : 'bg-orange-500'}`} />
                                            <span className={`text-[10px] font-extrabold uppercase ${p.severity === 'critical' ? 'text-[#FF4D4D]' : 'text-orange-600'}`}>
                                                {p.severity} • ETA {p.eta}
                                            </span>
                                        </div>
                                        <span className="text-[10px] text-[#6B7A90] font-mono">{p.ambulanceId}</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="text-3xl">🚑</div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-[#1F2D3D]">{p.name}, {p.age}</h4>
                                            <p className="text-[#6B7A90] text-xs">{p.condition}</p>
                                            <div className="flex gap-3 mt-1 text-xs">
                                                <span className="font-bold text-[#FF4D4D]">Blood: {p.bloodGroup}</span>
                                                <span className="font-bold text-[#0F4C81]">Bed: {p.assignedBed}</span>
                                            </div>
                                            {p.allergies.length > 0 && (
                                                <div className="flex flex-wrap gap-1 mt-2">
                                                    {p.allergies.map(a => <span key={a} className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded-full">⚠️ {a}</span>)}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex gap-2 mt-3">
                                        <button className="flex-1 py-2 rounded-xl bg-[#0F4C81] text-white text-xs font-bold">Prepare Team</button>
                                        <button className="flex-1 py-2 rounded-xl border border-gray-200 text-xs font-bold text-[#0F4C81]">View Profile</button>
                                        <a href="tel:112" className="px-3 py-2 rounded-xl bg-red-50 text-[#FF4D4D] flex items-center justify-center"><Phone className="w-4 h-4" /></a>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}

                    {tab === 'alerts' && (
                        <motion.div key="alerts" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-3 pb-16">
                            {[
                                { time: '2 min ago', title: 'ICU-03 Ready', desc: 'Bed assigned to Arjun Sharma (incoming)', severity: 'critical', icon: Bed },
                                { time: '8 min ago', title: 'Face Scan Match', desc: 'Profile received from ambulance KA-01-AB-1234', severity: 'info', icon: Brain },
                                { time: '15 min ago', title: 'O+ Stock Low', desc: 'Blood supply below 20% — contact blood bank', severity: 'warning', icon: Activity },
                                { time: '32 min ago', title: 'Meera Singh — ETA 14 min', desc: 'Asthma, EM-04 pre-assigned', severity: 'high', icon: Ambulance },
                            ].map((a, i) => (
                                <motion.div key={a.title} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                                    className="bg-white rounded-2xl p-4 shadow border border-gray-100 flex items-start gap-3">
                                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${a.severity === 'critical' ? 'bg-red-100' : a.severity === 'warning' ? 'bg-yellow-100' : a.severity === 'high' ? 'bg-orange-100' : 'bg-blue-100'}`}>
                                        <a.icon className={`w-4 h-4 ${a.severity === 'critical' ? 'text-[#FF4D4D]' : a.severity === 'warning' ? 'text-yellow-600' : a.severity === 'high' ? 'text-orange-600' : 'text-[#0F4C81]'}`} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <p className="font-bold text-[#1F2D3D] text-sm">{a.title}</p>
                                            <span className="text-[10px] text-[#6B7A90]">{a.time}</span>
                                        </div>
                                        <p className="text-xs text-[#6B7A90] mt-0.5">{a.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
