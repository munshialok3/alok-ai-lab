import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — Alok Munshi',
  description: 'Privacy policy for alok-munshi-portfolio.vercel.app',
  robots: { index: false, follow: false },
}

const SECTIONS = [
  {
    title: '1. Who we are',
    body: 'This website is a personal portfolio for Alok Munshi, located at alok-munshi-portfolio.vercel.app. Contact: munshialok3@gmail.com.',
  },
  {
    title: '2. Data we collect',
    body: 'Contact form & resume request: your name, email address, LinkedIn URL, and any message you submit are collected solely to respond to your enquiry. This data is delivered to munshialok3@gmail.com via EmailJS and logged in a private Google Sheet accessible only to Alok Munshi. We do not sell, share, or transfer this data to any third party beyond these delivery services.',
  },
  {
    title: '3. Analytics',
    body: 'This site uses Vercel Analytics and Vercel Speed Insights. These tools collect anonymised, aggregated data (page views, country, device type, referrer, Core Web Vitals). No personally identifiable information is collected by these tools. No cookies are set by this site.',
  },
  {
    title: '4. Cookies',
    body: 'This site does not use tracking cookies or any persistent client-side storage for analytics. Vercel Analytics is cookie-free and privacy-first by design.',
  },
  {
    title: '5. Your rights (GDPR)',
    body: 'If you are located in the European Economic Area (EEA), you have the right to access, correct, or request deletion of any personal data we hold about you. To exercise these rights, email munshialok3@gmail.com with your request. We will respond within 30 days.',
  },
  {
    title: '6. Data retention',
    body: 'Resume request and contact form submissions are retained for up to 12 months for the purpose of follow-up correspondence. After this period, entries are deleted from all storage.',
  },
  {
    title: '7. Third-party services',
    body: 'This site integrates with EmailJS (email delivery), Google Sheets (form logging), Vercel (hosting and analytics), and cal.com (calendar booking). Each service operates under its own privacy policy and data processing terms.',
  },
  {
    title: '8. Changes to this policy',
    body: 'This policy may be updated occasionally. The "last updated" date at the top of this page will reflect any changes. Continued use of the site after changes constitutes acceptance of the updated policy.',
  },
]

export default function PrivacyPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#060810',
      color: '#e8edf5',
      fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif",
      padding: 'clamp(60px,8vw,120px) clamp(20px,5vw,40px)',
    }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <Link
          href="/"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: 13, color: 'rgba(232,237,245,0.45)',
            textDecoration: 'none', marginBottom: 48,
          }}
        >
          ← Back to portfolio
        </Link>

        <h1 style={{
          fontFamily: 'Syne, sans-serif', fontWeight: 800,
          fontSize: 'clamp(28px,4vw,44px)', letterSpacing: '-0.03em',
          marginBottom: 8, color: '#fff',
        }}>
          Privacy Policy
        </h1>
        <p style={{ fontSize: 13, color: 'rgba(232,237,245,0.35)', marginBottom: 56, fontWeight: 300 }}>
          Last updated: May 2026
        </p>

        {SECTIONS.map(s => (
          <div key={s.title} style={{ marginBottom: 36 }}>
            <h2 style={{
              fontFamily: 'Syne, sans-serif', fontWeight: 700,
              fontSize: 'clamp(16px,1.8vw,20px)', color: '#fff', marginBottom: 10,
            }}>
              {s.title}
            </h2>
            <p style={{
              fontSize: 'clamp(14px,1.4vw,16px)',
              color: 'rgba(232,237,245,0.6)',
              lineHeight: 1.8, fontWeight: 300,
            }}>
              {s.body}
            </p>
          </div>
        ))}

        <div style={{ marginTop: 64, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
          <p style={{ fontSize: 12, color: 'rgba(232,237,245,0.2)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Alok Munshi · Gurugram, India
          </p>
        </div>
      </div>
    </div>
  )
}
