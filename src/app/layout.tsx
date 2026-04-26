import type { Metadata } from 'next'
import './globals.css'
import ScrollToTop from './ScrollToTop' 

export const metadata: Metadata = {
  title: 'Alok Munshi — Growth Strategist & Builder',
  description:
    'Senior Growth Analyst at Eternal (Zomato). Scaled new users 1.4M → 2.5M. $32M incremental revenue. IIT Kharagpur. Building AI-powered growth infrastructure from scratch — solo.',
  keywords: ['Alok Munshi','Growth Strategy','Product Growth','Marketing Analytics','IIT Kharagpur','Zomato','American Express','WhatsApp Automation','Builder','Performance Marketing'],
  authors: [{ name: 'Alok Munshi', url: 'https://linkedin.com/in/munshialok' }],
  openGraph: {
    type: 'website',
    title: 'Alok Munshi — Growth Strategist & Builder',
    description: 'Scaled 1.4M → 2.5M users. $32M revenue. Building AI infrastructure solo. IIT Kharagpur.',
    siteName: 'Alok Munshi',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alok Munshi — Growth Strategist & Builder',
    description: 'Scaled 1.4M → 2.5M users. $32M revenue. IIT Kharagpur.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body>
        <ScrollToTop />
        {children}
      </body>
    </html>
  )
}
