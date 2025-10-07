import { ImageResponse } from 'next/og';

/**
 * Twitter 카드 이미지 생성
 * @description Twitter 공유 시 표시될 이미지를 동적으로 생성
 * @returns {ImageResponse} 생성된 이미지 응답
 */
export const runtime = 'edge';
export const dynamic = 'force-static';

export const alt = 'jungtaeinn.github.io';
export const size = {
  width: 1200,
  height: 600,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            textAlign: 'center',
            color: 'white',
          }}
        >
          <div
            style={{
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              background: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '30px',
              boxShadow: '0 15px 30px rgba(0,0,0,0.3)',
            }}
          >
            <div
              style={{
                width: '130px',
                height: '130px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '60px',
              }}
            >
              👨‍💻
            </div>
          </div>
          <h1
            style={{
              fontSize: '56px',
              fontWeight: 'bold',
              margin: '0 0 15px 0',
              textShadow: '0 3px 6px rgba(0,0,0,0.3)',
            }}
          >
              jungtaeinn.github.io
          </h1>
          <p
            style={{
              fontSize: '24px',
              margin: '0',
              opacity: 0.9,
              fontWeight: '300',
            }}
          >
            개발자로서의 경험과 학습 내용을 공유합니다
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
