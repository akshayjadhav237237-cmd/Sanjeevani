'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Heart, Loader2, Mail, Lock } from 'lucide-react';
import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

export default function LoginPage() {
    const router = useRouter();
    const { setAuth } = useAuthStore();

    const [form, setForm] = useState({ email: '', password: '' });
    const [showPass, setShowPass] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const inp = (icon: boolean = true): React.CSSProperties => ({
        width: '100%',
        padding: `12px ${icon ? '40px' : '14px'} 12px 42px`,
        borderRadius: '12px',
        border: `1.5px solid ${error ? '#E8EFF7' : '#E8EFF7'}`,
        fontSize: '14px',
        color: '#1A2332',
        background: 'white',
        outline: 'none',
        fontFamily: 'inherit',
        boxSizing: 'border-box' as const,
        transition: 'border-color 0.2s',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.email || !form.password) {
            setError('Please enter your email and password');
            return;
        }
        setIsLoading(true);
        setError('');
        try {
            const response = await axios.post(`${API_BASE}/api/auth/login`, {
                email: form.email,
                password: form.password,
            });
            const { user, token } = response.data;
            setAuth(user, token);
            router.push(user?.onboarded ? '/dashboard' : '/onboarding');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Invalid email or password. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0A3D6B 0%, #1565C0 40%, #0288D1 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} style={{ width: '100%', maxWidth: '440px' }}>
                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', backdropFilter: 'blur(8px)' }}>
                        <Heart size={28} color="white" fill="white" />
                    </div>
                    <h1 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', color: 'white', fontSize: '28px', fontWeight: 800, margin: 0 }}>Sanjeevni</h1>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', marginTop: '4px' }}>When every second matters</p>
                </div>

                {/* Card */}
                <div style={{ background: 'white', borderRadius: '24px', padding: '36px', boxShadow: '0 24px 64px rgba(0,0,0,0.15)' }}>
                    <h2 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: '22px', fontWeight: 800, color: '#1A2332', marginBottom: '4px' }}>Welcome back!</h2>
                    <p style={{ fontSize: '13px', color: '#4A5568', marginBottom: '28px' }}>
                        New to Sanjeevni?{' '}
                        <Link href="/signup" style={{ color: '#1976D2', fontWeight: 700, textDecoration: 'none' }}>Create an account</Link>
                    </p>

                    {error && (
                        <div style={{ padding: '12px 16px', background: '#FFEBEE', borderRadius: '10px', marginBottom: '20px', border: '1px solid #FFCDD2' }}>
                            <p style={{ fontSize: '13px', color: '#D32F2F', fontWeight: 600 }}>⚠️ {error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        {/* Email */}
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#1A2332', marginBottom: '6px' }}>Email Address</label>
                            <div style={{ position: 'relative' }}>
                                <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}>
                                    <Mail size={16} color="#9CA3AF" />
                                </div>
                                <input
                                    type="email"
                                    style={inp()}
                                    placeholder="you@example.com"
                                    value={form.email}
                                    onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                                    autoComplete="email"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div style={{ marginBottom: '28px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                                <label style={{ fontSize: '13px', fontWeight: 700, color: '#1A2332' }}>Password</label>
                                <Link href="/forgot-password" style={{ fontSize: '12px', color: '#1976D2', textDecoration: 'none', fontWeight: 600 }}>Forgot password?</Link>
                            </div>
                            <div style={{ position: 'relative' }}>
                                <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}>
                                    <Lock size={16} color="#9CA3AF" />
                                </div>
                                <input
                                    type={showPass ? 'text' : 'password'}
                                    style={{ ...inp(), paddingRight: '44px' }}
                                    placeholder="••••••••"
                                    value={form.password}
                                    onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                                    autoComplete="current-password"
                                />
                                <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                                    {showPass ? <EyeOff size={16} color="#9CA3AF" /> : <Eye size={16} color="#9CA3AF" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            style={{
                                width: '100%', padding: '14px', borderRadius: '12px',
                                background: isLoading ? '#CBD5E1' : 'linear-gradient(135deg, #0A3D6B, #1976D2)',
                                color: 'white', fontWeight: 800, fontSize: '15px',
                                fontFamily: 'var(--font-jakarta, sans-serif)',
                                border: 'none', cursor: isLoading ? 'not-allowed' : 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                boxShadow: isLoading ? 'none' : '0 8px 24px rgba(25,118,210,0.35)',
                                transition: 'all 0.2s',
                            }}
                        >
                            {isLoading && <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />}
                            {isLoading ? 'Logging in...' : 'Login →'}
                        </button>
                    </form>

                    {/* Divider */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '20px 0' }}>
                        <div style={{ flex: 1, height: '1px', background: '#E8EFF7' }} />
                        <span style={{ fontSize: '12px', color: '#9CA3AF', fontWeight: 500 }}>OR</span>
                        <div style={{ flex: 1, height: '1px', background: '#E8EFF7' }} />
                    </div>

                    <p style={{ fontSize: '12px', color: '#9CA3AF', textAlign: 'center' }}>
                        🔒 Your health data is encrypted and secure
                    </p>
                </div>
            </motion.div>

            <style>{`
                @keyframes spin { to { transform: rotate(360deg); } }
                input:focus { outline: none; border-color: #1976D2 !important; box-shadow: 0 0 0 3px rgba(25,118,210,0.1); }
            `}</style>
        </div>
    );
}
