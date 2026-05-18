import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, DM_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
})
const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-dm',
  display: 'swap',
})
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Sanjeevani | When Every Second Matters',
  description: 'AI-powered emergency healthcare platform connecting patients to hospitals, ambulances, and doctors in real time.',
  keywords: 'healthcare, emergency, hospital, ambulance, AI health, India, Ayushman',
  openGraph: {
    title: 'Sanjeevani — When Every Second Matters',
    description: 'Emergency healthcare, one tap away.',
    type: 'website',
  },
}

import AuthInitializer from '@/components/AuthInitializer'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${dmSans.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            try {
              var pref = localStorage.getItem('theme');
              if (pref === 'dark') {
                document.documentElement.classList.add('dark-mode');
              } else if (pref === 'light') {
                document.documentElement.classList.add('light-mode');
              }
            } catch (e) {}
          })();
        `}} />
      </head>
      <body style={{ fontFamily: "var(--font-dm, 'DM Sans', sans-serif)" }}>
        <AuthInitializer>
          {children}
        </AuthInitializer>
        {/* Floating SOS — visible on all pages */}
        <a href="/emergency" id="global-sos"
          style={{
            position: 'fixed', bottom: '28px', right: '28px',
            zIndex: 9999, width: '64px', height: '64px',
            borderRadius: '50%', display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            background: 'linear-gradient(135deg, #D32F2F 0%, #FF5252 100%)',
            color: 'white', fontWeight: 800, fontSize: '11px',
            textDecoration: 'none', letterSpacing: '0.05em',
            boxShadow: '0 8px 32px rgba(211,47,47,0.5)',
          }}>
          <span style={{ fontSize: '20px', lineHeight: 1 }}>🚨</span>
          <span>SOS</span>
          {/* Pulse ring */}
          <span style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            background: 'rgba(211,47,47,0.35)',
            animation: 'sos-ring 2s ease-out infinite',
          }} />
          <span style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            background: 'rgba(211,47,47,0.2)',
            animation: 'sos-ring 2s ease-out infinite',
            animationDelay: '0.7s',
          }} />
        </a>
      </body>
    </html>
  )
}
 
// End of RootLayout
