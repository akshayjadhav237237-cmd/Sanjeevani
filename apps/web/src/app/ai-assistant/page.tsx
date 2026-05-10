'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Brain, Send, Mic, Paperclip, Plus, MessageCircle, ChevronRight,
    AlertCircle, Star, MapPin, Check, Activity, Heart, Pill,
    Clock, ArrowLeft, Hospital
} from 'lucide-react'
import axios from 'axios'

const QUICK_PROMPTS = [
    { label: 'Check my symptoms', icon: Activity },
    { label: 'Estimate hospital cost', icon: Hospital },
    { label: 'Find best hospital', icon: MapPin },
    { label: 'Check drug interaction', icon: Pill },
    { label: 'How long will I be admitted?', icon: Clock },
    { label: 'AI health Q&A', icon: Brain },
]

const TOOLS = ['Symptom Checker', 'Cost Estimator', 'Hospital Finder', 'Stay Duration', 'Drug Checker', 'Health Q&A']

const SAMPLE_MESSAGES = [
    { role: 'ai', type: 'text', content: 'Hello Priya! 👋 I\'m your AI health companion. I can help you check symptoms, estimate costs, find hospitals, or answer any health question. What can I help you with today?' },
]

const SAMPLE_RESPONSES: Record<string, { content: string; type: string; data?: any }> = {
    default: { type: 'text', content: 'I understand you\'re concerned about your health. Based on your message, let me analyze this carefully. Could you tell me more about how long you\'ve had these symptoms and their severity?' },
    symptom: { type: 'symptom-card', content: '', data: { condition: 'Possible Hypertension', urgency: 'Moderate', specialty: 'Cardiologist', urgencyColor: '#F59E0B', actions: ['Find Cardiologist', 'Book Appointment', 'Check BP Guidance'] } },
    cost: { type: 'cost-card', content: '', data: { title: 'Estimated Treatment Cost', breakdown: [{ item: 'Consultation', cost: '₹800' }, { item: 'Room (per day)', cost: '₹4,500' }, { item: 'Medicines (est.)', cost: '₹2,200' }, { item: 'Lab Tests', cost: '₹3,800' }], total: '₹35,000–₹55,000', insurance: '₹28,000 covered by PM-JAY', selfPay: '₹7,000–₹27,000' } },
    hospital: { type: 'hospital-card', content: '', data: { name: 'Apollo Hospital', dist: '2.4 km', icu: 5, rating: 4.8, reason: 'Nearest hospital with cardiology ICU available and accepts your insurance.' } },
}

function TypingIndicator() {
    return (
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #1976D2, #00C853)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Brain size={14} color="white" />
            </div>
            <div className="chat-bubble-ai" style={{ display: 'flex', gap: '5px', alignItems: 'center', padding: '12px 16px' }}>
                {[0, 1, 2].map(i => (
                    <span key={i} className="typing-dot" style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#9CA3AF', display: 'block', animationDelay: `${i * 0.2}s` }} />
                ))}
            </div>
        </div>
    )
}

function AIMessage({ msg }: { msg: any }) {
    return (
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #1976D2, #00C853)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Brain size={14} color="white" className="animate-heartbeat" />
            </div>
            <div style={{ maxWidth: '75%' }}>
                {msg.type === 'text' && (
                    <div className="chat-bubble-ai">
                        <p style={{ fontSize: '14px', lineHeight: 1.65, color: '#1A2332' }}>{msg.content}</p>
                    </div>
                )}
                {msg.type === 'symptom-card' && (
                    <div style={{ background: 'white', borderRadius: '4px 16px 16px 16px', padding: '16px', boxShadow: 'var(--shadow-card)', border: `2px solid ${msg.data.urgencyColor}30` }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                            <AlertCircle size={18} color={msg.data.urgencyColor} />
                            <p style={{ fontWeight: 700, color: '#1A2332', fontSize: '14px' }}>Symptom Analysis</p>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <p style={{ fontSize: '16px', fontWeight: 800, color: '#1A2332', fontFamily: 'var(--font-jakarta, sans-serif)' }}>{msg.data.condition}</p>
                            <span style={{ fontSize: '12px', fontWeight: 700, padding: '3px 10px', borderRadius: '999px', background: `${msg.data.urgencyColor}20`, color: msg.data.urgencyColor }}>
                                {msg.data.urgency} Urgency
                            </span>
                        </div>
                        <p style={{ fontSize: '13px', color: '#4A5568', marginBottom: '14px' }}>Recommended specialist: <strong>{msg.data.specialty}</strong></p>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {msg.data.actions.map((a: string) => (
                                <button key={a} style={{ padding: '7px 14px', borderRadius: '8px', background: '#E3F2FD', color: '#0A3D6B', fontSize: '12px', fontWeight: 600, border: 'none', cursor: 'pointer' }}>{a}</button>
                            ))}
                        </div>
                    </div>
                )}
                {msg.type === 'cost-card' && (
                    <div style={{ background: 'white', borderRadius: '4px 16px 16px 16px', padding: '16px', boxShadow: 'var(--shadow-card)', minWidth: '280px' }}>
                        <p style={{ fontWeight: 700, color: '#1A2332', fontSize: '14px', marginBottom: '12px' }}>💰 {msg.data.title}</p>
                        {msg.data.breakdown.map((b: any) => (
                            <div key={b.item} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #F5F7FA', fontSize: '13px' }}>
                                <span style={{ color: '#4A5568' }}>{b.item}</span>
                                <span style={{ fontWeight: 600, color: '#1A2332' }}>{b.cost}</span>
                            </div>
                        ))}
                        <div style={{ marginTop: '12px', padding: '10px', background: '#E8F5E9', borderRadius: '8px' }}>
                            <p style={{ fontSize: '13px', color: '#1B5E20', fontWeight: 700 }}>Total: {msg.data.total}</p>
                            <p style={{ fontSize: '12px', color: '#00897B' }}>{msg.data.insurance}</p>
                            <p style={{ fontSize: '13px', color: '#0A3D6B', fontWeight: 700 }}>Your share: {msg.data.selfPay}</p>
                        </div>
                    </div>
                )}
                {msg.type === 'hospital-card' && (
                    <div style={{ background: 'white', borderRadius: '4px 16px 16px 16px', padding: '16px', boxShadow: 'var(--shadow-card)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#E3F2FD', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Hospital size={20} color="#1976D2" />
                            </div>
                            <div>
                                <p style={{ fontWeight: 700, color: '#1A2332', fontSize: '14px' }}>{msg.data.name}</p>
                                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                    <span style={{ fontSize: '12px', color: '#4A5568' }}>📍 {msg.data.dist}</span>
                                    <span style={{ fontSize: '12px', color: '#4A5568' }}>⭐ {msg.data.rating}</span>
                                </div>
                            </div>
                        </div>
                        <p style={{ fontSize: '12px', color: '#00897B', marginBottom: '10px' }}>✓ {msg.data.icu} ICU beds available</p>
                        <p style={{ fontSize: '13px', color: '#4A5568', marginBottom: '12px' }}>{msg.data.reason}</p>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <a href="/search" style={{ flex: 1, padding: '8px', borderRadius: '8px', background: '#0A3D6B', color: 'white', fontSize: '12px', fontWeight: 700, textDecoration: 'none', textAlign: 'center' }}>Book Now</a>
                            <a href="/compare" style={{ flex: 1, padding: '8px', borderRadius: '8px', background: '#E3F2FD', color: '#0A3D6B', fontSize: '12px', fontWeight: 700, textDecoration: 'none', textAlign: 'center' }}>Compare</a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default function AIAssistantPage() {
    const [messages, setMessages] = useState(SAMPLE_MESSAGES)
    const [input, setInput] = useState('')
    const [typing, setTyping] = useState(false)
    const [activeTool, setActiveTool] = useState('Health Q&A')
    const bottomRef = useRef<HTMLDivElement>(null)

    useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, typing])

    const sendMessage = async (text: string) => {
        if (!text.trim()) return
        const userMessage = { role: 'user' as const, type: 'text' as const, content: text }
        setMessages(prev => [...prev, userMessage])
        setInput('')
        setTyping(true)

        try {
            const res = await axios.post('http://localhost:5001/api/ai/chat', {
                message: text,
                history: messages.filter(m => m.type === 'text').map(m => ({
                    role: m.role === 'ai' ? 'assistant' : 'user',
                    content: m.content
                }))
            })
            setMessages(prev => [...prev, { role: 'ai', type: 'text', content: res.data.message }])
        } catch (err) {
            console.error('AI Chat Error:', err)
            setMessages(prev => [...prev, { 
                role: 'ai', 
                type: 'text', 
                content: "I'm sorry, I'm having trouble connecting to the Sanjeevani servers. Please check if the backend is running or try again later." 
            }])
        } finally {
            setTyping(false)
        }
    }

    return (
        <div style={{ display: 'flex', height: '100vh', background: '#F7FAFD', overflow: 'hidden' }}>
            {/* Left sidebar */}
            <div style={{ width: '280px', background: 'white', borderRight: '1px solid #E8EFF7', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
                <div style={{ padding: '20px', borderBottom: '1px solid #E8EFF7', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <a href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: '#4A5568' }}>
                        <ArrowLeft size={16} /> <span style={{ fontWeight: 700, color: '#0A3D6B', fontSize: '16px', fontFamily: 'var(--font-jakarta, sans-serif)' }}>AI Assistant</span>
                    </a>
                </div>

                <div style={{ padding: '16px' }}>
                    <button style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '11px 16px', borderRadius: '12px', background: 'linear-gradient(135deg, #0A3D6B, #1976D2)', color: 'white', fontWeight: 700, fontSize: '14px', border: 'none', cursor: 'pointer' }}>
                        <Plus size={16} /> New Conversation
                    </button>
                </div>

                {/* Quick prompts */}
                <div style={{ padding: '0 16px', flex: 1 }}>
                    <p style={{ fontSize: '11px', fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px' }}>Quick Prompts</p>
                    {QUICK_PROMPTS.map(p => (
                        <button key={p.label} onClick={() => sendMessage(p.label)}
                            style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '10px', background: 'none', border: '1px solid #E8EFF7', marginBottom: '8px', cursor: 'pointer', textAlign: 'left', color: '#4A5568', fontSize: '13px', transition: 'all 0.2s' }}
                            onMouseEnter={e => (e.currentTarget.style.background = '#F0F7FF')}
                            onMouseLeave={e => (e.currentTarget.style.background = 'none')}>
                            <p.icon size={15} color="#1976D2" /> {p.label}
                        </button>
                    ))}
                </div>

                {/* AI Capabilities */}
                <div style={{ padding: '16px', borderTop: '1px solid #E8EFF7' }}>
                    <p style={{ fontSize: '12px', fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px' }}>Capabilities</p>
                    {['Not a substitute for professional medical advice', 'Uses your health profile for personalized answers', 'Powered by GPT-4o'].map(c => (
                        <div key={c} style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                            <Check size={13} color="#00C853" style={{ flexShrink: 0, marginTop: '2px' }} />
                            <p style={{ fontSize: '12px', color: '#4A5568', lineHeight: 1.4 }}>{c}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main chat */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                {/* Header */}
                <div style={{ background: 'white', borderBottom: '1px solid #E8EFF7', padding: '16px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #0A3D6B, #1976D2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Brain size={20} color="white" />
                        </div>
                        <div>
                            <p style={{ fontWeight: 700, color: '#1A2332', fontSize: '15px', fontFamily: 'var(--font-jakarta, sans-serif)' }}>Sanjeevani AI</p>
                            <p style={{ fontSize: '12px', color: '#00C853', fontWeight: 600 }}>● Online • Powered by GPT-4o</p>
                        </div>
                    </div>

                    {/* Tool mode pills */}
                    <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '2px' }}>
                        {TOOLS.map(t => (
                            <button key={t} onClick={() => setActiveTool(t)}
                                style={{
                                    padding: '6px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 600,
                                    background: activeTool === t ? '#0A3D6B' : '#F0F4F8',
                                    color: activeTool === t ? 'white' : '#4A5568',
                                    border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s',
                                }}>{t}</button>
                        ))}
                    </div>
                </div>

                {/* Messages */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {messages.map((msg, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                            {msg.role === 'ai'
                                ? <AIMessage msg={msg} />
                                : (
                                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <div className="chat-bubble-user">
                                            <p style={{ fontSize: '14px', lineHeight: 1.65 }}>{msg.content}</p>
                                        </div>
                                    </div>
                                )
                            }
                        </motion.div>
                    ))}
                    {typing && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}><TypingIndicator /></motion.div>}
                    <div ref={bottomRef} />
                </div>

                {/* Input */}
                <div style={{ background: 'white', borderTop: '1px solid #E8EFF7', padding: '16px 24px' }}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
                        <button style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#F0F4F8', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <Paperclip size={17} color="#4A5568" />
                        </button>
                        <div style={{ flex: 1, background: '#F0F4F8', borderRadius: '14px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <textarea
                                value={input} onChange={e => setInput(e.target.value)}
                                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input) } }}
                                placeholder={`Ask about ${activeTool.toLowerCase()}...`}
                                style={{ flex: 1, background: 'none', border: 'none', outline: 'none', resize: 'none', fontSize: '14px', color: '#1A2332', maxHeight: '100px', lineHeight: 1.5, fontFamily: 'inherit' }}
                                rows={1}
                            />
                        </div>
                        <button style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#F0F4F8', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <Mic size={17} color="#4A5568" />
                        </button>
                        <button onClick={() => sendMessage(input)}
                            style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg, #0A3D6B, #1976D2)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <Send size={17} color="white" />
                        </button>
                    </div>
                    <p style={{ fontSize: '11px', color: '#9CA3AF', textAlign: 'center', marginTop: '10px' }}>
                        AI responses are for informational purposes only. Always consult a qualified medical professional.
                    </p>
                </div>
            </div>
        </div>
    )
}
