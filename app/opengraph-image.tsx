import { ImageResponse } from 'next/og'
import { SITE } from '@/lib/site'

export const alt = SITE.name
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// ImageResponse cannot read globals.css, so these are duplicated by necessity.
// ACCENT must track --color-accent in app/globals.css.
const ACCENT = '#1d4ed8'
const GROUND = '#f6f5ff'
const INK = '#0a0a0b'
const MUTED = '#6b6b80'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: GROUND,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 20, height: 20, borderRadius: 6, background: ACCENT }} />
          <div style={{ fontSize: 26, color: MUTED, letterSpacing: 1 }}>{SITE.name}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ fontSize: 76, color: INK, lineHeight: 1.05, fontWeight: 600 }}>
            Websites that get results
          </div>
          <div style={{ fontSize: 30, color: MUTED, maxWidth: 820, lineHeight: 1.4 }}>
            Custom-designed, custom-coded. One person, start to finish, live in days.
          </div>
        </div>

        <div style={{ display: 'flex', width: 120, height: 6, background: ACCENT, borderRadius: 3 }} />
      </div>
    ),
    { ...size },
  )
}
