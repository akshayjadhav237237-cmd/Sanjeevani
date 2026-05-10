'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Heart, Check, Loader2, Phone, Mail, Lock, User } from 'lucide-react';
import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

function PasswordStrengthBar({ password }: { password: string }) {
    const getStrength = () => {
        let score = 0;
        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;
        return score;
    };
    const strength = getStrength();
    const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
    const colors = ['', '#D32F2F', '#F59E0B', '#1976D2', '#00C853'];

    if (!password) return null;

    return (
        <div style={{ marginTop: '6px' }}>
            <div style={{ display: 'flex', gap: '4px', marginBottom: '4px' }}>
                {[1, 2, 3, 4].map(i => (
                    <div key={i} style={{
                        flex: 1, height: '3px', borderRadius: '999px',
                        background: i <= strength ? colors[strength] : '#E8EFF7',
                        transition: 'all 0.3s'
                    }} />
                ))}
            </div>
            {strength > 0 && (
                <p style={{ fontSize: '11px', color: colors[strength], fontWeight: 600 }}>
                    {labels[strength]} password
                </p>
            )}
        </div>
    );
}

interface FieldProps {
    label: string;
    error?: string;
    valid?: boolean;
    children: React.ReactNode;
}

function Field({ label, error, valid, children }: FieldProps) {
    return (
        <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#1A2332', marginBottom: '6px' }}>
                {label}
            </label>
            <div style={{ position: 'relative' }}>
                {children}
                {valid && (
                    <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', width: '20px', height: '20px', borderRadius: '50%', background: '#00C853', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Check size={12} color="white" strokeWidth={3} />
                    </div>
                )}
            </div>
            {error && <p style={{ fontSize: '12px', color: '#D32F2F', marginTop: '4px', fontWeight: 500 }}>{error}</p>}
        </div>
    );
}

const inputStyle = (hasError?: boolean, valid?: boolean): React.CSSProperties => ({
    width: '100%',
    padding: '12px 40px 12px 42px',
    borderRadius: '12px',
    border: `1.5px solid ${hasError ? '#D32F2F' : valid ? '#00C853' : '#E8EFF7'}`,
    fontSize: '14px',
    color: '#1A2332',
    background: 'white',
    outline: 'none',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
});

export default function SignupPage() {
    const router = useRouter();
    const { setAuth } = useAuthStore();

    const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '', agreed: false });
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [showPass, setShowPass] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const touch = (field: string) => setTouched(p => ({ ...p, [field]: true }));

    const validate = () => {
        const errs: Record<string, string> = {};
        if (!form.name.trim() || form.name.trim().length < 2) errs.name = 'Please enter your full name (min 2 characters)';
        else if (!/^[a-zA-Z\s]+$/.test(form.name.trim())) errs.name = 'Name can only contain letters and spaces';
        if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Please enter a valid email address';
        if (!form.phone || !/^[6-9]\d{9}$/.test(form.phone)) errs.phone = 'Enter a valid 10-digit Indian phone number';
        if (!form.password || form.password.length < 8) errs.password = 'Password must be at least 8 characters';
        else if (!/[A-Z]/.test(form.password) || !/[0-9]/.test(form.password)) errs.password = 'Must have at least 1 uppercase letter and 1 number';
        if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match';
        if (!form.agreed) errs.agreed = 'Please agree to the terms to continue';
        return errs;
    };

    const errors: Record<string, string> = {};
    const allErrors = validate();
    for (const key of Object.keys(touched)) {
        if (allErrors[key]) errors[key] = allErrors[key];
    }

    const valid: Record<string, boolean> = {};
    if (touched.name && !allErrors.name) valid.name = true;
    if (touched.email && !allErrors.email) valid.email = true;
    if (touched.phone && !allErrors.phone) valid.phone = true;
    if (touched.password && !allErrors.password) valid.password = true;
    if (touched.confirmPassword && !allErrors.confirmPassword && form.confirmPassword) valid.confirmPassword = true;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setTouched({ name: true, email: true, phone: true, password: true, confirmPassword: true, agreed: true });
        const finalErrors = validate();
        if (Object.keys(finalErrors).length > 0) return;

        setIsLoading(true);
        setError('');
        try {
            const response = await axios.post(`${API_BASE}/api/auth/register`, {
                name: form.name.trim(),
                email: form.email,
                phone: form.phone,
                password: form.password,
            });
            const { user, token } = response.data;
            setAuth(user, token);
            router.push('/onboarding');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0A3D6B 0%, #1565C0 40%, #0288D1 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} style={{ width: '100%', maxWidth: '480px' }}>
                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', backdropFilter: 'blur(8px)' }}>
                        <Heart size={28} color="white" fill="white" />
                    </div>
                    <h1 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', color: 'white', fontSize: '28px', fontWeight: 800, margin: 0 }}>Sanjeevni</h1>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', marginTop: '4px' }}>Create your health account</p>
                </div>

                {/* Card */}
                <div style={{ background: 'white', borderRadius: '24px', padding: '36px', boxShadow: '0 24px 64px rgba(0,0,0,0.15)' }}>
                    <h2 style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: '20px', fontWeight: 800, color: '#1A2332', marginBottom: '4px' }}>Sign Up</h2>
                    <p style={{ fontSize: '13px', color: '#4A5568', marginBottom: '28px' }}>
                        Already have an account? <Link href="/login" style={{ color: '#1976D2', fontWeight: 700, textDecoration: 'none' }}>Log in</Link>
                    </p>

                    {error && (
                        <div style={{ padding: '12px 16px', background: '#FFEBEE', borderRadius: '10px', marginBottom: '20px', border: '1px solid #FFCDD2' }}>
                            <p style={{ fontSize: '13px', color: '#D32F2F', fontWeight: 600 }}>⚠️ {error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        {/* Full Name */}
                        <Field label="Full Name *" error={errors.name} valid={valid.name}>
                            <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}>
                                <User size={16} color="#9CA3AF" />
                            </div>
                            <input
                                style={inputStyle(!!errors.name, valid.name)}
                                placeholder="e.g. Rahul Kumar Verma"
                                value={form.name}
                                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                                onBlur={() => touch('name')}
                            />
                        </Field>

                        {/* Email */}
                        <Field label="Email Address *" error={errors.email} valid={valid.email}>
                            <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}>
                                <Mail size={16} color="#9CA3AF" />
                            </div>
                            <input
                                type="email"
                                style={inputStyle(!!errors.email, valid.email)}
                                placeholder="you@example.com"
                                value={form.email}
                                onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                                onBlur={() => touch('email')}
                            />
                        </Field>

                        {/* Phone */}
                        <Field label="Phone Number *" error={errors.phone} valid={valid.phone}>
                            <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}>
                                <Phone size={16} color="#9CA3AF" />
                            </div>
                            <div style={{ position: 'absolute', left: '38px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF', fontSize: '14px', pointerEvents: 'none' }}>+91</div>
                            <input
                                type="tel"
                                maxLength={10}
                                style={{ ...inputStyle(!!errors.phone, valid.phone), paddingLeft: '70px' }}
                                placeholder="9876543210"
                                value={form.phone}
                                onChange={e => setForm(p => ({ ...p, phone: e.target.value.replace(/\D/g, '') }))}
                                onBlur={() => touch('phone')}
                            />
                        </Field>

                        {/* Password */}
                        <Field label="Password *" error={errors.password} valid={valid.password}>
                            <div style={{ position: 'absolute', left: '14px', top: '14px' }}>
                                <Lock size={16} color="#9CA3AF" />
                            </div>
                            <input
                                type={showPass ? 'text' : 'password'}
                                style={{ ...inputStyle(!!errors.password, valid.password), paddingRight: '44px' }}
                                placeholder="Min 8 chars, 1 uppercase, 1 number"
                                value={form.password}
                                onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                                onBlur={() => touch('password')}
                            />
                            <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: '12px', top: '14px', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                                {showPass ? <EyeOff size={16} color="#9CA3AF" /> : <Eye size={16} color="#9CA3AF" />}
                            </button>
                            <PasswordStrengthBar password={form.password} />
                        </Field>

                        {/* Confirm Password */}
                        <Field label="Confirm Password *" error={errors.confirmPassword} valid={valid.confirmPassword}>
                            <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}>
                                <Lock size={16} color="#9CA3AF" />
                            </div>
                            <input
                                type={showConfirm ? 'text' : 'password'}
                                style={{ ...inputStyle(!!errors.confirmPassword, valid.confirmPassword), paddingRight: '44px' }}
                                placeholder="Re-enter your password"
                                value={form.confirmPassword}
                                onChange={e => setForm(p => ({ ...p, confirmPassword: e.target.value }))}
                                onBlur={() => touch('confirmPassword')}
                            />
                            <button type="button" onClick={() => setShowConfirm(!showConfirm)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                                {showConfirm ? <EyeOff size={16} color="#9CA3AF" /> : <Eye size={16} color="#9CA3AF" />}
                            </button>
                        </Field>

                        {/* Terms */}
                        <div style={{ marginBottom: '24px' }}>
                            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    checked={form.agreed}
                                    onChange={e => { setForm(p => ({ ...p, agreed: e.target.checked })); touch('agreed'); }}
                                    style={{ marginTop: '2px', accentColor: '#1976D2', width: '16px', height: '16px', flexShrink: 0 }}
                                />
                                <span style={{ fontSize: '13px', color: '#4A5568', lineHeight: 1.5 }}>
                                    I agree to Sanjeevni's{' '}
                                    <Link href="/terms" style={{ color: '#1976D2', fontWeight: 700 }}>Terms of Service</Link>{' '}
                                    and{' '}
                                    <Link href="/privacy" style={{ color: '#1976D2', fontWeight: 700 }}>Privacy Policy</Link>
                                </span>
                            </label>
                            {errors.agreed && <p style={{ fontSize: '12px', color: '#D32F2F', marginTop: '4px', marginLeft: '26px' }}>{errors.agreed}</p>}
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
                            {isLoading ? 'Creating Account...' : 'Create Account →'}
                        </button>
                    </form>
                </div>
            </motion.div>

            <style>{`
                @keyframes spin { to { transform: rotate(360deg); } }
                input:focus { outline: none; border-color: #1976D2 !important; box-shadow: 0 0 0 3px rgba(25,118,210,0.1); }
            `}</style>
        </div>
    );
}
