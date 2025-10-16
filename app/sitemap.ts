import { MetadataRoute } from 'next';
import { getSortedPostsData } from '@/lib/posts';

/**
 * 동적 사이트맵 생성
 * @description 모든 페이지와 블로그 포스트를 포함하는 사이트맵 생성
 * @returns {MetadataRoute.Sitemap} 사이트맵 배열
 */
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://jungtaeinn.github.io';
  
  // 모든 블로그 포스트 가져오기
  const posts = getSortedPostsData();
  
  // 포스트 URL 생성
  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // 정적 페이지 URL
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/posts`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
  ];

  return [...staticPages, ...postUrls];
}

