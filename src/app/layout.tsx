import type { Metadata } from 'next'
import './globals.css'
import ScrollToTop from './ScrollToTop'

const BASE_URL = 'https://alok-munshi-portfolio.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: 'Alok Munshi — Senior Growth Strategist & Builder | Gurugram',
  description:
    'Alok Munshi — Senior Growth Strategist at Eternal (Zomato), Gurugram. Scaled new user acquisition 1.4M → 2.5M. Generated $32M incremental revenue at American Express across 4 global markets. IIT Kharagpur \'22. Builds growth infrastructure solo.',
  keywords: [
    'Alok Munshi',
    'Growth Strategist',
    'Senior Growth Manager',
    'Product Growth',
    'Performance Marketing',
    'Growth Marketing Gurugram',
    'Marketing Analyst India',
    'IIT Kharagpur',
    'Zomato',
    'Eternal',
    'American Express',
    'WhatsApp Automation',
    'Builder',
    'Cohort Analytics',
    'LTV Modelling',
    'A/B Testing',
    'User Acquisition',
    'Gurugram',
  ],
  authors: [{ name: 'Alok Munshi', url: 'https://linkedin.com/in/munshialok' }],
  creator: 'Alok Munshi',
  openGraph: {
    type: 'website',
    url: BASE_URL,
    title: 'Alok Munshi — Senior Growth Strategist & Builder',
    description: 'Scaled 1.4M → 2.5M users. $32M revenue. Building AI growth infrastructure solo. IIT Kharagpur \'22. Based in Gurugram.',
    siteName: 'Alok Munshi',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Alok Munshi — Growth Strategist & Builder',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alok Munshi — Growth Strategist & Builder',
    description: 'Scaled 1.4M → 2.5M users. $32M revenue. IIT Kharagpur. Gurugram.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: BASE_URL,
  },
  robots: { index: true, follow: true },
}

// JSON-LD structured data — helps Google surface you in Person knowledge panels
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Alok Munshi',
  jobTitle: 'Senior Marketing Analyst — Growth & Retention',
  worksFor: {
    '@type': 'Organization',
    name: 'Eternal (Zomato)',
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Indian Institute of Technology Kharagpur',
  },
  url: BASE_URL,
  sameAs: [
    'https://linkedin.com/in/munshialok',
    'https://github.com/munshialok3',
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Gurugram',
    addressRegion: 'Haryana',
    addressCountry: 'IN',
  },
  knowsAbout: [
    'Growth Strategy',
    'Performance Marketing',
    'Product Growth',
    'A/B Testing',
    'Cohort Analytics',
    'User Acquisition',
    'LTV Modelling',
    'Cloudflare Workers',
    'SQL',
    'Python',
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="TSfQXEnKhJm2yp7Jj6JMNeDa7SHdEbVnYqJHb2wKLRo" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="canonical" href={BASE_URL} />
        {/* JSON-LD Person schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ScrollToTop />
        {children}
      </body>
    </html>
  )
}
