import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0e141b',
          color: '#ffffff',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 600,
            letterSpacing: '-0.02em',
          }}
        >
          Razvan Soare
        </div>
        <div
          style={{
            fontSize: 28,
            color: '#b6b9bb',
            marginTop: 16,
          }}
        >
          React developer and technology enthusiast
        </div>
        <div
          style={{
            width: 80,
            height: 4,
            background: '#e60067',
            marginTop: 32,
            borderRadius: 2,
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
