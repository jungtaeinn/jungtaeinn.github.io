import type { Metadata } from 'next';
import { getSortedPostsData } from '@/lib/posts';
import HeroSection from '@/components/blog/hero-section';
import PostList from '@/components/blog/post-list';
import { WebSiteStructuredData } from '@/components/seo/structured-data';

/**
 * 메인 페이지 메타데이터
 * @description SEO 최적화를 위한 메인 페이지 메타데이터
 */
export const metadata: Metadata = {
  title: 'jungtaeinn.github.io - Frontend Engineer Blog',
  description: 'Frontend Engineer 정태인의 기술 블로그입니다. React, Next.js, TypeScript, Monorepo 아키텍처, 성능 최적화, AI 자동화 등 프론트엔드 개발 경험과 인사이트를 공유합니다.',
  keywords: [
    'Frontend',
    'React',
    'Next.js',
    'TypeScript',
    'JavaScript',
    'Web Development',
    'Monorepo',
    'Turborepo',
    'Performance Optimization',
    'AI Automation',
    'Tech Blog',
    '프론트엔드',
    '개발 블로그',
    '정태인',
  ],
  openGraph: {
    title: 'jungtaeinn.github.io - Frontend Engineer Blog',
    description: 'Frontend Engineer 정태인의 기술 블로그입니다. 프론트엔드 개발 경험과 인사이트를 공유합니다.',
    type: 'website',
    url: 'https://jungtaeinn.github.io',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'jungtaeinn.github.io - Frontend Engineer Blog',
    description: 'Frontend Engineer 정태인의 기술 블로그입니다.',
  },
  alternates: {
    canonical: 'https://jungtaeinn.github.io',
  },
};

export default function HomePage() {
  const posts = getSortedPostsData();
  const featuredPosts = posts.filter(post => post.featured).slice(0, 6);

  return (
    <>
      {/* 구조화된 데이터 추가 */}
      <WebSiteStructuredData
        data={{
          name: 'jungtaeinn.github.io',
          url: 'https://jungtaeinn.github.io',
          description: 'Frontend Engineer 정태인의 기술 블로그입니다. React, Next.js, TypeScript, Monorepo 아키텍처, 성능 최적화 등 프론트엔드 개발 경험과 인사이트를 공유합니다.',
          author: 'jungtaeinn',
        }}
      />

      <div className="flex flex-col">
        <HeroSection />
        
        <section className="py-8">
          <PostList 
            posts={featuredPosts}
            title="Recent Posts"
            description="Latest thoughts and insights"
            showLoadMore={true}
          />
        </section>
      </div>
    </>
  );
}
