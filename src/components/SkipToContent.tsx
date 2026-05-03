'use client'

export default function SkipToContent() {
  return (
    <a
      href="#main-content"
      style={{
        position: 'absolute',
        left: '-9999px',
        top:'auto',
        width: '1px',
        height: '1px',
        overflow: 'hidden',
        zIndex: 10000,
        padding: '12px 24px',
        background: '#4f8ef7',
        color: '#fff',
        fontSize: 14,
        fontWeight: 600,
        borderRadius: '00 8px 8px',
        textDecoration: 'none',}}
      onFocus={(e) => {
        e.currentTarget.style.position = 'fixed'
        e.currentTarget.style.left = '50%'
        e.currentTarget.style.top = '0'
        e.currentTarget.style.transform = 'translateX(-50%)'
        e.currentTarget.style.width = 'auto'
        e.currentTarget.style.height = 'auto'}}
      onBlur={(e) => {
        e.currentTarget.style.position = 'absolute'
        e.currentTarget.style.left = '-9999px'
        e.currentTarget.style.width = '1px'
        e.currentTarget.style.height = '1px'
        e.currentTarget.style.transform = 'none'
      }}
    >
      Skip to content
    </a>
  )
}