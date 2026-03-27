import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'messagetolink — Private markdown messages. No server. No trace.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#F9F8F6',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
          }}
        >
          {/* Lock icon */}
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              backgroundColor: '#E6F4F4',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0E7377"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: '56px',
              fontWeight: 700,
              color: '#1A1A1D',
              letterSpacing: '-1px',
            }}
          >
            messagetolink
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: '24px',
              color: '#5C5C63',
              maxWidth: '700px',
              textAlign: 'center',
              lineHeight: 1.4,
            }}
          >
            Private markdown messages. No server. No trace.
          </div>

          {/* URL */}
          <div
            style={{
              fontSize: '18px',
              color: '#0E7377',
              marginTop: '8px',
            }}
          >
            messageto.link
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
