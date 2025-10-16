import { MetadataRoute } from 'next';

/**
 * Robots.txt 설정
 * @description 검색 엔진 크롤러에게 사이트 크롤링 규칙 제공
 * @returns {MetadataRoute.Robots} robots.txt 설정
 */
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://jungtaeinn.github.io';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/static/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/'],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}

