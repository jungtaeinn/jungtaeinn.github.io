import { ImageResponse } from 'next/og';

/**
 * Open Graph 이미지 생성
 * @description 소셜 미디어 공유 시 표시될 이미지를 동적으로 생성
 * @returns {ImageResponse} 생성된 이미지 응답
 */
export const runtime = 'edge';
export const dynamic = 'force-static';

export const alt = 'jungtaeinn.github.io';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
        }}
      >
        <img
          src="https://jungtaeinn.github.io/images/profile.png"
          width={600}
          height={600}
          alt="jungtaeinn profile"
          style={{ objectFit: 'contain', borderRadius: 24 }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
