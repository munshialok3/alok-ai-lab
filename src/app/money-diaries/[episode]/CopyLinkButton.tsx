'use client'
import { useState } from 'react'

export default function CopyLinkButton() {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
    } catch {
      const tmp = document.createElement('input')
      tmp.value = window.location.href
      document.body.appendChild(tmp)
      tmp.select()
      document.execCommand('copy')
      document.body.removeChild(tmp)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  return (
    <button
      onClick={copy}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 7,
        padding: '11px 22px', borderRadius: 100,
        background: copied ? 'rgba(16,185,129,0.1)' : 'transparent',
        border: `1px solid ${copied ? 'rgba(16,185,129,0.3)' : 'rgba(255,255,255,0.12)'}`,
        color: copied ? '#10b981' : 'rgba(232,237,245,0.6)',
        fontSize: 13, fontWeight: 500,
        fontFamily: 'inherit', cursor: 'pointer',
        transition: 'all .2s',
      }}
    >
      {copied ? '✓ Copied' : '⎘ Copy link'}
    </button>
  )
}