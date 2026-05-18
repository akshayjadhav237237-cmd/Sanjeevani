'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { HeartPulse, Menu, X, Phone, Download } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { lang, toggleLang } = useLanguage();
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

    useEffect(() => {
        const handler = (e: Event) => { e.preventDefault(); setDeferredPrompt(e) }
        window.addEventListener('beforeinstallprompt', handler)
        return () => window.removeEventListener('beforeinstallprompt', handler)
    }, [])

    const installApp = async () => {
        if (!deferredPrompt) return
        deferredPrompt.prompt()
        const { outcome } = await deferredPrompt.userChoice
        if (outcome === 'accepted') setDeferredPrompt(null)
    }

    return (
        <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <div className="bg-primary p-2 rounded-lg">
                        <HeartPulse className="text-white w-6 h-6" />
                    </div>
                    <span className="text-2xl font-bold text-primary tracking-tight">Sanjeevani</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-6">
                    <Link href="/search" className="text-sm font-medium hover:text-primary transition-colors">Find Hospitals</Link>
                    <Link href="/medicines" className="text-sm font-medium hover:text-primary transition-colors">Medicines</Link>
                    <Link href="/doctors" className="text-sm font-medium hover:text-primary transition-colors">Consult Doctor</Link>

                    {/* Language Toggle */}
                    <button onClick={toggleLang} style={{ padding: '6px 12px', borderRadius: '8px', fontWeight: 700, fontSize: '13px', background: '#E3F2FD', color: '#0A3D6B', border: '1px solid #1976D230', cursor: 'pointer' }}>
                        {lang === 'en' ? 'EN | हिं' : 'हिं | EN'}
                    </button>

                    {/* Install App */}
                    {deferredPrompt && (
                        <button onClick={installApp} style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '6px 12px', borderRadius: '8px', fontWeight: 700, fontSize: '12px', background: '#0A3D6B', color: 'white', border: 'none', cursor: 'pointer' }}>
                            <Download size={13} /> Install App
                        </button>
                    )}

                    <Button variant="destructive" className="flex items-center gap-2 animate-pulse">
                        <Phone className="w-4 h-4" />
                        Emergency SOS
                    </Button>
                    <Link href="/login">
                        <Button variant="outline">Login</Button>
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden bg-background border-b px-4 py-4 flex flex-col gap-4"
                    >
                        <Link href="/search" className="text-lg font-medium">Find Hospitals</Link>
                        <Link href="/medicines" className="text-lg font-medium">Medicines</Link>
                        <Link href="/doctors" className="text-lg font-medium">Consult Doctor</Link>
                        <button onClick={toggleLang} style={{ padding: '10px', borderRadius: '8px', fontWeight: 700, fontSize: '14px', background: '#E3F2FD', color: '#0A3D6B', border: '1px solid #1976D230', cursor: 'pointer', textAlign: 'left' }}>
                            🌐 {lang === 'en' ? 'Switch to हिंदी' : 'Switch to English'}
                        </button>
                        <Button variant="destructive" className="w-full flex items-center justify-center gap-2">
                            <Phone className="w-4 h-4" />
                            Emergency SOS
                        </Button>
                        <Link href="/login" className="w-full">
                            <Button variant="outline" className="w-full">Login</Button>
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
