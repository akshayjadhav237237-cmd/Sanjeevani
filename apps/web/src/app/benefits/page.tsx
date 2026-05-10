'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Shield, CheckCircle, ArrowLeft, ChevronRight, Search, Zap,
    IndianRupee, User, Heart, FileText, Phone, Globe, AlertCircle,
    Star, Clock, HelpCircle, ArrowRight
} from 'lucide-react'

type Scheme = {
    id: string
    name: string
    fullName: string
    coverage: string
    eligible: boolean
    maxCover: string
    beneficiaries: string
    emoji: string
    color: string
    bg: string
    highlights: string[]
    autoApply: boolean
}

const allSchemes: Scheme[] = [
    {
        id: 'pmjay',
        name: 'PM-JAY',
        fullName: 'Pradhan Mantri Jan Arogya Yojana',
        coverage: '₹5 Lakhs/year',
        eligible: true,
        maxCover: '₹5,00,000',
        beneficiaries: '50 Cr+',
        emoji: '🇮🇳',
        color: '#FF4D4D',
        bg: '#FFF0F0',
        highlights: ['Cashless treatment', 'Pre & post hospitalization', '1,929 procedures covered'],
        autoApply: true,
    },
    {
        id: 'avvy',
        name: 'Ayushman Vay Vandana',
        fullName: 'Ayushman Vay Vandana Yojana (70+)',
        coverage: '₹5 Lakhs/year',
        eligible: false,
        maxCover: '₹5,00,000',
        beneficiaries: '6 Cr Seniors',
        emoji: '👴',
        color: '#F59E0B',
        bg: '#FFFBEB',
        highlights: ['For citizens 70+', 'Covers senior-specific care', 'No income limit'],
        autoApply: false,
    },
    {
        id: 'mjpjay',
        name: 'MJPJAY',
        fullName: 'Mahatma Jyotiba Phule Jan Arogya Yojana',
        coverage: '₹1.5 Lakhs/year',
        eligible: true,
        maxCover: '₹1,50,000',
        beneficiaries: '2.2 Cr Families',
        emoji: '🟠',
        color: '#F97316',
        bg: '#FFF7ED',
        highlights: ['Maharashtra residents', '996 procedures', 'Free medicines included'],
        autoApply: true,
    },
    {
        id: 'esic',
        name: 'ESIC',
        fullName: 'Employees State Insurance Corporation',
        coverage: '100% medical',
        eligible: false,
        maxCover: 'Unlimited',
        beneficiaries: 'Organized sector',
        emoji: '🏢',
        color: '#0F4C81',
        bg: '#EBF4FF',
        highlights: ['Salaried employees', 'Family coverage', 'Maternity benefits'],
        autoApply: false,
    },
    {
        id: 'cghs',
        name: 'CGHS',
        fullName: 'Central Government Health Scheme',
        coverage: 'Full cover',
        eligible: false,
        maxCover: 'Full',
        beneficiaries: 'Govt employees',
        emoji: '🏛️',
        color: '#7C3AED',
        bg: '#F3EEFF',
        highlights: ['Central Govt servants', 'Pensioners covered', 'OPD + IPD both'],
        autoApply: false,
    },
    {
        id: 'star',
        name: 'Star Health Insurance',
        fullName: 'Private Insurance (Auto-linked)',
        coverage: '₹10 Lakhs',
        eligible: true,
        maxCover: '₹10,00,000',
        beneficiaries: 'Policyholder',
        emoji: '⭐',
        color: '#2ECC71',
        bg: '#EDFAF4',
        highlights: ['Private policy detected', 'Direct billing enabled', 'Cashless at 500+ hospitals'],
        autoApply: true,
    },
]

export default function BenefitsPage() {
    const [answers, setAnswers] = useState({ age: '', state: '', sector: '' })
    const [checked, setChecked] = useState(false)
    const [expanded, setExpanded] = useState<string | null>(null)
    const [applied, setApplied] = useState<string[]>([])

    const eligible = allSchemes.filter(s => s.eligible)
    const notEligible = allSchemes.filter(s => !s.eligible)
    const totalCoverage = eligible.reduce((acc, s) => acc + (s.id === 'star' ? 1000000 : s.id === 'pmjay' ? 500000 : s.id === 'mjpjay' ? 150000 : 0), 0)

    const handleApply = (id: string) => {
        if (!applied.includes(id)) setApplied(prev => [...prev, id])
    }

    return (
        <div className="min-h-screen bg-[#F5F9FC]">
            {/* Header */}
            <div className="bg-gradient-to-br from-[#0F4C81] to-[#2ECC71] px-4 pt-12 pb-8 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="absolute rounded-full border border-white" style={{ width: 100 + i * 80, height: 100 + i * 80, right: -10, bottom: -10 }} />
                    ))}
                </div>
                <div className="relative flex items-center gap-3 mb-5">
                    <a href="/" className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                        <ArrowLeft className="w-4 h-4 text-white" />
                    </a>
                    <div>
                        <h1 className="text-white font-bold text-lg">Free Benefits Finder</h1>
                        <p className="text-white/60 text-xs">Govt schemes auto-matched to your profile</p>
                    </div>
                    <div className="ml-auto text-2xl">🇮🇳</div>
                </div>

                {checked && (
                    <motion.div className="relative grid grid-cols-3 gap-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="bg-white/15 rounded-xl p-3 text-center backdrop-blur-sm border border-white/20">
                            <p className="text-white font-extrabold text-xl">{eligible.length}</p>
                            <p className="text-white/70 text-[10px]">Schemes Found</p>
                        </div>
                        <div className="bg-white/15 rounded-xl p-3 text-center backdrop-blur-sm border border-white/20">
                            <p className="text-white font-extrabold text-lg">₹{(totalCoverage / 100000).toFixed(1)}L</p>
                            <p className="text-white/70 text-[10px]">Total Coverage</p>
                        </div>
                        <div className="bg-white/15 rounded-xl p-3 text-center backdrop-blur-sm border border-white/20">
                            <p className="text-[#2ECC71] font-extrabold text-xl">{eligible.filter(s => s.autoApply).length}</p>
                            <p className="text-white/70 text-[10px]">Auto-Apply</p>
                        </div>
                    </motion.div>
                )}
            </div>

            <div className="px-4 max-w-2xl mx-auto">
                {/* Check eligibility form */}
                {!checked && (
                    <motion.div className="bg-white rounded-2xl shadow border border-gray-100 p-5 mt-4"
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <h3 className="font-bold text-[#1F2D3D] mb-4 flex items-center gap-2">
                            <Zap className="w-5 h-5 text-[#2ECC71]" /> Check Your Eligibility (30 sec)
                        </h3>
                        <div className="flex flex-col gap-3">
                            <div>
                                <label className="text-xs font-semibold text-[#6B7A90] uppercase">Your Age</label>
                                <input className="w-full mt-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#0F4C81] bg-gray-50"
                                    placeholder="e.g. 24" value={answers.age} onChange={e => setAnswers({ ...answers, age: e.target.value })} />
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-[#6B7A90] uppercase">State</label>
                                <select className="w-full mt-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#0F4C81] bg-gray-50"
                                    value={answers.state} onChange={e => setAnswers({ ...answers, state: e.target.value })}>
                                    <option value="">Select state…</option>
                                    <option>Maharashtra</option><option>Delhi</option><option>Uttar Pradesh</option>
                                    <option>Karnataka</option><option>Tamil Nadu</option><option>West Bengal</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-[#6B7A90] uppercase">Employment Sector</label>
                                <select className="w-full mt-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#0F4C81] bg-gray-50"
                                    value={answers.sector} onChange={e => setAnswers({ ...answers, sector: e.target.value })}>
                                    <option value="">Select…</option>
                                    <option>Self-employed / Unorganized</option>
                                    <option>Private sector (Organized)</option>
                                    <option>Central Govt Employee</option>
                                    <option>State Govt Employee</option>
                                    <option>Student / Unemployed</option>
                                </select>
                            </div>
                            <motion.button
                                onClick={() => setChecked(true)}
                                className="mt-1 w-full py-3.5 rounded-xl bg-gradient-to-r from-[#0F4C81] to-[#1a6bb5] text-white font-bold shadow-lg hover:shadow-xl transition-all"
                                whileTap={{ scale: 0.97 }}>
                                Check My Benefits →
                            </motion.button>
                        </div>
                    </motion.div>
                )}

                {/* Results */}
                {checked && (
                    <div className="mt-4 flex flex-col gap-3 pb-24">
                        {/* Banner */}
                        <motion.div className="bg-gradient-to-r from-[#2ECC71]/20 to-[#0F4C81]/10 border border-[#2ECC71]/30 rounded-2xl p-4 flex items-center gap-3"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <div className="w-10 h-10 rounded-xl bg-[#2ECC71]/20 flex items-center justify-center">
                                <CheckCircle className="w-6 h-6 text-[#2ECC71]" />
                            </div>
                            <div>
                                <p className="font-bold text-[#1F2D3D] text-sm">You qualify for {eligible.length} schemes!</p>
                                <p className="text-xs text-[#6B7A90]">Total coverage: ₹{(totalCoverage / 100000).toFixed(1)} Lakhs. {eligible.filter(s => s.autoApply).length} can be auto-applied at checkout.</p>
                            </div>
                        </motion.div>

                        {/* Eligible schemes */}
                        <h3 className="font-bold text-[#1F2D3D] text-sm flex items-center gap-2 mt-2">
                            <CheckCircle className="w-4 h-4 text-[#2ECC71]" /> Eligible For You
                        </h3>
                        {eligible.map((scheme, i) => (
                            <motion.div key={scheme.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                                className={`bg-white rounded-2xl shadow border overflow-hidden cursor-pointer ${expanded === scheme.id ? 'border-[#0F4C81]/40' : 'border-gray-100 hover:border-[#0F4C81]/20'}`}
                                onClick={() => setExpanded(expanded === scheme.id ? null : scheme.id)}>

                                <div className="p-4 flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-xl" style={{ backgroundColor: scheme.bg }}>
                                        {scheme.emoji}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <h4 className="font-bold text-[#1F2D3D] text-sm">{scheme.name}</h4>
                                            {scheme.autoApply && <span className="text-[9px] font-extrabold bg-[#2ECC71]/20 text-[#2ECC71] px-2 py-0.5 rounded-full uppercase">Auto-Apply</span>}
                                        </div>
                                        <p className="text-[10px] text-[#6B7A90] mt-0.5 truncate">{scheme.fullName}</p>
                                        <div className="flex items-center gap-2 mt-1.5">
                                            <span className="text-sm font-extrabold" style={{ color: scheme.color }}>{scheme.coverage}</span>
                                            <span className="text-[10px] text-[#6B7A90]">• {scheme.beneficiaries} beneficiaries</span>
                                        </div>
                                    </div>
                                    <ChevronRight className={`w-4 h-4 text-[#6B7A90] transition-transform shrink-0 ${expanded === scheme.id ? 'rotate-90' : ''}`} />
                                </div>

                                <AnimatePresence>
                                    {expanded === scheme.id && (
                                        <motion.div className="px-4 pb-4 border-t border-gray-100"
                                            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                                            <div className="pt-3 flex flex-col gap-2">
                                                {scheme.highlights.map(h => (
                                                    <div key={h} className="flex items-center gap-2">
                                                        <CheckCircle className="w-3.5 h-3.5 shrink-0" style={{ color: scheme.color }} />
                                                        <span className="text-xs text-[#6B7A90]">{h}</span>
                                                    </div>
                                                ))}
                                                <div className="flex gap-2 mt-2">
                                                    {applied.includes(scheme.id) ? (
                                                        <div className="flex-1 py-2.5 rounded-xl bg-[#2ECC71]/15 border border-[#2ECC71]/30 text-center text-xs font-bold text-[#2ECC71]">
                                                            ✓ Applied at Checkout
                                                        </div>
                                                    ) : (
                                                        <button onClick={() => handleApply(scheme.id)}
                                                            className="flex-1 py-2.5 rounded-xl text-white text-xs font-bold shadow-md"
                                                            style={{ background: `linear-gradient(135deg, ${scheme.color}, ${scheme.color}cc)` }}>
                                                            Apply This Scheme
                                                        </button>
                                                    )}
                                                    <button className="px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-[#0F4C81]">
                                                        Learn More
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}

                        {/* Auto-apply summary */}
                        {applied.length > 0 && (
                            <motion.div className="bg-[#0F4C81] rounded-2xl p-5 text-white mt-2"
                                initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}>
                                <h4 className="font-bold mb-2 flex items-center gap-2"><Shield className="w-4 h-4 text-[#2ECC71]" /> Checkout Summary</h4>
                                <div className="space-y-1.5 mb-3">
                                    {applied.map(id => {
                                        const s = allSchemes.find(s => s.id === id)!
                                        return <div key={id} className="flex items-center justify-between text-sm">
                                            <span className="text-white/80">{s.name}</span>
                                            <span className="font-bold text-[#2ECC71]">-{s.coverage}</span>
                                        </div>
                                    })}
                                </div>
                                <div className="border-t border-white/20 pt-3">
                                    <p className="text-white/60 text-xs">Estimated patient share:</p>
                                    <p className="text-2xl font-extrabold text-[#2ECC71] mt-0.5">₹0 – ₹500</p>
                                    <p className="text-white/50 text-xs mt-0.5">after all schemes applied</p>
                                </div>
                            </motion.div>
                        )}

                        {/* Not eligible */}
                        <h3 className="font-bold text-[#1F2D3D] text-sm flex items-center gap-2 mt-2">
                            <HelpCircle className="w-4 h-4 text-[#6B7A90]" /> Not Currently Eligible
                        </h3>
                        {notEligible.map(scheme => (
                            <div key={scheme.id} className="bg-white rounded-2xl p-4 shadow border border-gray-100 opacity-60 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-xl bg-gray-100">
                                    {scheme.emoji}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-[#1F2D3D] text-sm">{scheme.name}</h4>
                                    <p className="text-[10px] text-[#6B7A90]">{scheme.fullName}</p>
                                </div>
                                <ChevronRight className="w-4 h-4 text-gray-300 shrink-0" />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
