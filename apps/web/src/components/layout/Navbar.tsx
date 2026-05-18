'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { HeartPulse, Menu, X, Phone } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <div className="bg-primary p-2 rounded-lg">
                        <HeartPulse className="text-white w-6 h-6" />
                    </div>
                    <span className="text-2xl font-bold text-primary tracking-tight">Sanjeevni</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    <Link href="/search" className="text-sm font-medium hover:text-primary transition-colors">Find Hospitals</Link>
                    <Link href="/medicines" className="text-sm font-medium hover:text-primary transition-colors">Medicines</Link>
                    <Link href="/doctors" className="text-sm font-medium hover:text-primary transition-colors">Consult Doctor</Link>
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
