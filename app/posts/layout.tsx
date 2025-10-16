import type { Metadata } from 'next';

/**
 * Posts 페이지 메타데이터
 * @description SEO 최적화를 위한 Posts 목록 페이지 메타데이터
 */
export const metadata: Metadata = {
  title: 'Posts - Frontend Insight',
  description: 'Frontend 개발 경험, 기술 인사이트, 프로젝트 회고를 담은 블로그 글 모음입니다. React, Next.js, TypeScript, Monorepo, 성능 최적화, SEO, GEO 등 다양한 주제를 다룹니다.',
  keywords: [
    'Blog Posts',
    'Frontend Blog',
    'Tech Blog',
    'React Tutorial',
    'Next.js Guide',
    'TypeScript Tips',
    'Development Blog',
    '개발 블로그',
    '프론트엔드 블로그',
    '기술 블로그',
  ],
  openGraph: {
    title: 'Posts - Frontend Insight | jungtaeinn.github.io',
    description: 'Frontend 개발 경험, 기술 인사이트, 프로젝트 회고를 담은 블로그 글 모음입니다.',
    type: 'website',
    url: 'https://jungtaeinn.github.io/posts',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Posts - Frontend Insight | jungtaeinn.github.io',
    description: 'Frontend 개발 경험, 기술 인사이트, 프로젝트 회고를 담은 블로그 글 모음입니다.',
  },
  alternates: {
    canonical: 'https://jungtaeinn.github.io/posts',
  },
};

export default function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

