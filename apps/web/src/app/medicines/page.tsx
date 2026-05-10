'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ShoppingCart, Upload, Plus, Minus, X, ArrowLeft, Pill, Star, ChevronRight, Package, Truck, CheckCircle } from 'lucide-react'

const CATEGORIES = [
    { name: 'All', icon: '💊' }, { name: 'Diabetes', icon: '🩸' }, { name: 'Heart', icon: '🫀' },
    { name: 'Antibiotics', icon: '🧬' }, { name: 'Vitamins', icon: '🌿' },
    { name: 'Pain Relief', icon: '💆' }, { name: 'Allergy', icon: '🤧' }
]

const MEDICINES = [
    { id: 1, name: 'Metformin 500mg', generic: 'Metformin HCl', brand: 'Glucophage', price: 45, genericPrice: 18, pack: '30 tablets', category: 'Diabetes', rating: 4.7, rx: true, stock: 'In Stock', emoji: '💊' },
    { id: 2, name: 'Atorvastatin 20mg', generic: 'Atorvastatin Calcium', brand: 'Lipitor', price: 120, genericPrice: 38, pack: '15 tablets', category: 'Heart', rating: 4.5, rx: true, stock: 'In Stock', emoji: '❤️' },
    { id: 3, name: 'Aspirin 75mg', generic: 'Acetylsalicylic Acid', brand: 'Disprin', price: 25, genericPrice: 8, pack: '30 tablets', category: 'Heart', rating: 4.8, rx: false, stock: 'In Stock', emoji: '💊' },
    { id: 4, name: 'Amoxicillin 500mg', generic: 'Amoxicillin Trihydrate', brand: 'Mox', price: 85, genericPrice: 40, pack: '10 capsules', category: 'Antibiotics', rating: 4.6, rx: true, stock: 'In Stock', emoji: '🧬' },
    { id: 5, name: 'Vitamin D3 1000IU', generic: 'Cholecalciferol', brand: 'Calcirol', price: 150, genericPrice: 60, pack: '60 capsules', category: 'Vitamins', rating: 4.9, rx: false, stock: 'In Stock', emoji: '🌟' },
    { id: 6, name: 'Cetirizine 10mg', generic: 'Cetirizine HCl', brand: 'Alerid', price: 35, genericPrice: 12, pack: '10 tablets', category: 'Allergy', rating: 4.4, rx: false, stock: 'Limited', emoji: '🤧' },
]

type CartItem = { med: typeof MEDICINES[0]; qty: number }

export default function MedicinesPage() {
    const [category, setCategory] = useState('All')
    const [query, setQuery] = useState('')
    const [cart, setCart] = useState<CartItem[]>([])
    const [cartOpen, setCartOpen] = useState(false)
    const [showGeneric, setShowGeneric] = useState(false)
    const [ordered, setOrdered] = useState(false)

    const addToCart = (med: typeof MEDICINES[0]) => {
        setCart(prev => {
            const existing = prev.find(i => i.med.id === med.id)
            if (existing) return prev.map(i => i.med.id === med.id ? { ...i, qty: i.qty + 1 } : i)
            return [...prev, { med, qty: 1 }]
        })
    }

    const updateQty = (id: number, delta: number) => {
        setCart(prev => prev.map(i => i.med.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i).filter(i => i.qty > 0))
    }

    const cartTotal = cart.reduce((sum, i) => sum + (showGeneric ? i.med.genericPrice : i.med.price) * i.qty, 0)
    const cartCount = cart.reduce((sum, i) => sum + i.qty, 0)

    const filtered = MEDICINES.filter(m =>
        (category === 'All' || m.category === category) &&
        (query === '' || m.name.toLowerCase().includes(query.toLowerCase()))
    )

    if (ordered) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F7FAFD' }}>
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', maxWidth: '400px', padding: '48px 24px' }}>
                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #00C853, #1B5E20)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                        <CheckCircle size={40} color="white" />
                    </div>
                    <h2 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: '26px', fontWeight: 800, color: '#1A2332', marginBottom: '8px' }}>Order Confirmed! 🎉</h2>
                    <p style={{ color: '#4A5568', fontSize: '15px', lineHeight: 1.6, marginBottom: '28px' }}>Your medicines will be delivered in <strong>3–6 hours.</strong><br />Track your order in My Profile.</p>
                    <div style={{ background: 'white', borderRadius: '16px', padding: '20px', boxShadow: 'var(--shadow-card)', marginBottom: '24px' }}>
                        {[{ icon: Package, label: 'Packed', done: true }, { icon: Truck, label: 'On the way', done: false }, { icon: CheckCircle, label: 'Delivered', done: false }].map((s, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: i < 2 ? '12px' : '0' }}>
                                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: s.done ? '#00C853' : '#E8EFF7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <s.icon size={16} color={s.done ? 'white' : '#9CA3AF'} />
                                </div>
                                <p style={{ fontSize: '14px', color: s.done ? '#00C853' : '#9CA3AF', fontWeight: s.done ? 700 : 400 }}>{s.label}</p>
                            </div>
                        ))}
                    </div>
                    <a href="/dashboard" className="btn-primary" style={{ justifyContent: 'center', padding: '14px 32px', fontSize: '15px' }}>Back to Dashboard</a>
                </motion.div>
            </div>
        )
    }

    return (
        <div style={{ minHeight: '100vh', background: '#F7FAFD' }}>
            {/* Header */}
            <div style={{ background: 'linear-gradient(135deg, #00897B, #26C6DA)', padding: '28px 0' }}>
                <div className="container-xl" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <a href="/dashboard" style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ArrowLeft size={18} color="white" />
                    </a>
                    <div style={{ flex: 1 }}>
                        <h1 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', color: 'white', fontSize: '22px', fontWeight: 800 }}>Order Medicines</h1>
                        <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '13px' }}>Delivered in 3–6 hours</p>
                    </div>
                    <button onClick={() => setShowGeneric(!showGeneric)} style={{ padding: '8px 16px', borderRadius: '10px', background: showGeneric ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.2)', color: showGeneric ? '#00897B' : 'white', fontWeight: 700, fontSize: '13px', border: 'none', cursor: 'pointer' }}>
                        {showGeneric ? '✓ Generic Mode ON' : 'Show Generic'}
                    </button>
                    <button onClick={() => setCartOpen(true)} style={{ position: 'relative', width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(255,255,255,0.2)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ShoppingCart size={20} color="white" />
                        {cartCount > 0 && <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '20px', height: '20px', borderRadius: '50%', background: '#D32F2F', color: 'white', fontSize: '11px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{cartCount}</span>}
                    </button>
                </div>

                {/* Search */}
                <div className="container-xl" style={{ paddingTop: '20px' }}>
                    <div style={{ position: 'relative' }}>
                        <Search size={16} color="#9CA3AF" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                        <input className="input-field" style={{ paddingLeft: '42px', borderRadius: '12px', height: '46px' }} placeholder="Search medicines, generics..." value={query} onChange={e => setQuery(e.target.value)} />
                    </div>
                </div>
            </div>

            <div className="container-xl" style={{ padding: '24px' }}>
                {/* Upload prescription */}
                <div style={{ background: 'linear-gradient(135deg, #E3F2FD, #E0F7FA)', borderRadius: '16px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px', border: '1.5px dashed #1976D2' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#1976D2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Upload size={20} color="white" />
                    </div>
                    <div style={{ flex: 1 }}>
                        <p style={{ fontWeight: 700, color: '#0A3D6B', fontSize: '14px' }}>Upload Prescription</p>
                        <p style={{ fontSize: '12px', color: '#4A5568' }}>We'll auto-fill your medicine list from the prescription image</p>
                    </div>
                    <button className="btn-primary" style={{ fontSize: '13px', padding: '9px 16px' }}>Upload</button>
                </div>

                {/* Category horizontal scroll */}
                <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '4px', marginBottom: '24px' }}>
                    {CATEGORIES.map(c => (
                        <button key={c.name} onClick={() => setCategory(c.name)} style={{
                            display: 'flex', alignItems: 'center', gap: '7px', padding: '9px 16px', borderRadius: '999px', whiteSpace: 'nowrap', fontSize: '13px', fontWeight: 600,
                            background: category === c.name ? '#0A3D6B' : 'white',
                            color: category === c.name ? 'white' : '#4A5568',
                            border: `1.5px solid ${category === c.name ? '#0A3D6B' : '#E8EFF7'}`,
                            cursor: 'pointer', transition: 'all 0.2s',
                        }}>{c.icon} {c.name}</button>
                    ))}
                </div>

                {/* Medicine grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
                    {filtered.map((med, i) => {
                        const inCart = cart.find(c => c.med.id === med.id)
                        const price = showGeneric ? med.genericPrice : med.price
                        return (
                            <motion.div key={med.id} className="card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                                style={{ padding: '18px' }}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
                                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#E0F2F1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0 }}>{med.emoji}</div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <h3 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontWeight: 700, fontSize: '14px', color: '#1A2332', marginBottom: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{showGeneric ? med.generic : med.name}</h3>
                                        <p style={{ fontSize: '11px', color: '#4A5568' }}>{showGeneric ? med.name : med.brand} • {med.pack}</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                                    {med.rx && <span className="badge badge-red" style={{ fontSize: '10px' }}>Rx</span>}
                                    <span className="badge badge-green" style={{ fontSize: '10px' }}>✓ {med.stock}</span>
                                    <div style={{ display: 'flex', gap: '2px', marginLeft: 'auto' }}>
                                        <Star size={11} color="#F59E0B" fill="#F59E0B" />
                                        <span style={{ fontSize: '11px', color: '#4A5568' }}>{med.rating}</span>
                                    </div>
                                </div>
                                {showGeneric && (
                                    <div style={{ fontSize: '11px', color: '#2E7D32', background: '#E8F5E9', padding: '4px 10px', borderRadius: '6px', marginBottom: '10px', fontWeight: 600 }}>
                                        Saves ₹{med.price - med.genericPrice} vs brand name
                                    </div>
                                )}
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <p style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: '18px', fontWeight: 800, color: '#0A3D6B' }}>₹{price}</p>
                                    {inCart ? (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <button onClick={() => updateQty(med.id, -1)} style={{ width: '30px', height: '30px', borderRadius: '8px', background: '#F0F4F8', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Minus size={14} /></button>
                                            <span style={{ fontWeight: 800, color: '#1A2332', fontSize: '16px' }}>{inCart.qty}</span>
                                            <button onClick={() => updateQty(med.id, 1)} style={{ width: '30px', height: '30px', borderRadius: '8px', background: '#0A3D6B', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}><Plus size={14} /></button>
                                        </div>
                                    ) : (
                                        <button onClick={() => addToCart(med)} className="btn-primary" style={{ fontSize: '13px', padding: '8px 16px' }}>Add</button>
                                    )}
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>

            {/* Cart Sidebar */}
            <AnimatePresence>
                {cartOpen && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }} onClick={() => setCartOpen(false)}
                            style={{ position: 'fixed', inset: 0, background: 'black', zIndex: 200 }} />
                        <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25 }}
                            style={{ position: 'fixed', right: 0, top: 0, bottom: 0, width: '380px', background: 'white', zIndex: 300, display: 'flex', flexDirection: 'column' }}>
                            <div style={{ padding: '20px 24px', borderBottom: '1px solid #E8EFF7', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h2 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontWeight: 800, fontSize: '18px', color: '#1A2332' }}>Your Cart ({cartCount})</h2>
                                <button onClick={() => setCartOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={22} color="#4A5568" /></button>
                            </div>
                            <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px' }}>
                                {cart.length === 0 ? (
                                    <div style={{ textAlign: 'center', padding: '48px 0' }}>
                                        <p style={{ fontSize: '40px', marginBottom: '12px' }}>🛒</p>
                                        <p style={{ color: '#4A5568', fontSize: '14px' }}>Cart is empty. Add some medicines!</p>
                                    </div>
                                ) : cart.map(item => (
                                    <div key={item.med.id} style={{ display: 'flex', gap: '12px', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid #F5F7FA', marginBottom: '16px' }}>
                                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#E0F2F1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>{item.med.emoji}</div>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <p style={{ fontWeight: 700, fontSize: '13px', color: '#1A2332', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.med.name}</p>
                                            <p style={{ fontSize: '11px', color: '#4A5568' }}>₹{showGeneric ? item.med.genericPrice : item.med.price} each</p>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <button onClick={() => updateQty(item.med.id, -1)} style={{ width: '24px', height: '24px', borderRadius: '6px', background: '#F0F4F8', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Minus size={12} /></button>
                                            <span style={{ fontWeight: 700, fontSize: '14px' }}>{item.qty}</span>
                                            <button onClick={() => updateQty(item.med.id, 1)} style={{ width: '24px', height: '24px', borderRadius: '6px', background: '#0A3D6B', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}><Plus size={12} /></button>
                                        </div>
                                        <p style={{ fontWeight: 800, color: '#0A3D6B', fontSize: '14px', width: '52px', textAlign: 'right' }}>₹{(showGeneric ? item.med.genericPrice : item.med.price) * item.qty}</p>
                                    </div>
                                ))}
                            </div>
                            <div style={{ padding: '20px 24px', borderTop: '1px solid #E8EFF7' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                                    <span style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontWeight: 700, fontSize: '16px' }}>Total</span>
                                    <span style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontWeight: 800, fontSize: '20px', color: '#0A3D6B' }}>₹{cartTotal}</span>
                                </div>
                                <button onClick={() => { setCartOpen(false); setOrdered(true) }} className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '15px', padding: '14px' }}>
                                    Place Order → Deliver in 3-6h
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}
