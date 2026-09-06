import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

// Must track --color-accent in app/globals.css (ImageResponse can't read CSS).
const ACCENT = '#1d4ed8'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: ACCENT,
          borderRadius: 6,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: 22,
          fontWeight: 700,
        }}
      >
        W
      </div>
    ),
    { ...size },
  )
}
