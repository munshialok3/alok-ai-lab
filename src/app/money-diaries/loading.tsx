export default function Loading() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#060810',
      color: '#e8edf5',
      fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif",
    }}>
      <div style={{ padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,40px) clamp(48px,6vw,80px)', maxWidth: 1080, margin: '0 auto' }}>

        {/* Header skeleton */}
        <div style={{ marginBottom: 44, width: 120, height: 13, background: 'rgba(255,255,255,0.06)', borderRadius: 6 }} />
        <div style={{ marginBottom: 'clamp(40px,6vw,64px)' }}>
          <div style={{ width: 180, height: 11, background: 'rgba(79,142,247,0.2)', borderRadius: 4, marginBottom: 14 }} />
          <div style={{ width: 320, height: 56, background: 'rgba(255,255,255,0.06)', borderRadius: 8, marginBottom: 16 }} />
          <div style={{ width: 460, height: 14, background: 'rgba(255,255,255,0.04)', borderRadius: 4, marginBottom: 8 }} />
          <div style={{ width: 380, height: 14, background: 'rgba(255,255,255,0.04)', borderRadius: 4 }} />
        </div>

        {/* Strip skeleton */}
        <div style={{
          height: 48, background: 'rgba(79,142,247,0.04)',
          border: '1px solid rgba(79,142,247,0.08)',
          borderRadius: 'clamp(12px,1.5vw,18px)',
          marginBottom: 'clamp(32px,4vw,48px)',
        }} />

        {/* Cards skeleton */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(340px, 100%), 1fr))',
          gap: 'clamp(12px,1.8vw,18px)',
        }}>
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 'clamp(14px,1.8vw,20px)',
              padding: 'clamp(22px,2.8vw,32px)',
              minHeight: 220,
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}>
              <div style={{ width: 60, height: 10, background: 'rgba(79,142,247,0.2)', borderRadius: 4 }} />
              <div style={{ width: '80%', height: 18, background: 'rgba(255,255,255,0.06)', borderRadius: 4 }} />
              <div style={{ width: 100, height: 20, background: 'rgba(255,255,255,0.04)', borderRadius: 100 }} />
              <div style={{ width: '90%', height: 11, background: 'rgba(255,255,255,0.03)', borderRadius: 4 }} />
              <div style={{ width: '70%', height: 11, background: 'rgba(255,255,255,0.03)', borderRadius: 4 }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}