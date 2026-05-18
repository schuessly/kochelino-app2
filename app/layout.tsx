import type { Metadata, Viewport } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'
import { AppShell } from '@/components/layout/AppShell'

const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'Kochelino – Aus deiner Küche. Mit Liebe gekocht.',
  description: 'Dein freundlicher Küchenhelfer: Gib ein, was du hast, und erhalte leckere Rezeptideen.',
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  themeColor: '#1C4A2E',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${nunito.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-[#F8F7F2]">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
