'use client'
import { Component, ReactNode } from 'react'

interface Props { children: ReactNode }
interface State { hasError: boolean }

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh', background: '#060810',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'DM Sans', system-ui, sans-serif",
          color: '#e8edf5', textAlign: 'center', padding: 24,
        }}>
          <div>
            <p style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#4f8ef7', marginBottom: 16 }}>
              Something went wrong
            </p>
            <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(24px,4vw,36px)', fontWeight: 800, marginBottom: 16, letterSpacing: '-0.03em' }}>
              Unexpected error
            </h1>
            <p style={{ color: 'rgba(232,237,245,0.5)', marginBottom: 32, maxWidth: 400, margin: '0 auto 32px', lineHeight: 1.7 }}>
              Please refresh the page or try again shortly.
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: '12px 28px', borderRadius: 100, border: 'none',
                background: 'linear-gradient(135deg, #4f8ef7, #8b5cf6)',
                color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              Reload page
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
