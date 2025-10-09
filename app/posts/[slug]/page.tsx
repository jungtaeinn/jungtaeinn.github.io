import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getPostData, getAllPostSlugs } from '@/lib/posts';
import { markdownToHtml } from '@/lib/markdown';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import CommentsSection from '@/components/comments/comments-section';
import { Calendar, Tag } from 'lucide-react';
import Image from 'next/image';

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * 포스트 페이지의 동적 메타데이터 생성
 * @param params - URL 파라미터
 * @returns 포스트별 메타데이터
 */
export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostData(slug);

  if (!post) {
    return {
      title: '포스트를 찾을 수 없습니다',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: '정태인' }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: ['정태인'],
      tags: post.tags,
      images: post.coverImage ? [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

/**
 * 정적 경로 생성
 * @returns 모든 포스트의 정적 경로
 */
export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

/**
 * 포스트 상세 페이지 컴포넌트
 * @param params - URL 파라미터
 * @returns 포스트 상세 페이지 JSX
 */
export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostData(slug);
  
  if (!post) {
    notFound();
  }

  const content = await markdownToHtml(post.content);

  return (
    <article className="py-16 sm:py-20 lg:py-24">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="mb-8 sm:mb-12">
          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(post.date)}</span>
              </div>
              {post.category && (
                <>
                  <span className="hidden sm:inline">•</span>
                  <Badge variant="secondary" className="w-fit">{post.category}</Badge>
                </>
              )}
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
              {post.title}
            </h1>
            
            {post.excerpt && (
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {post.excerpt}
              </p>
            )}

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="flex items-center gap-1 text-xs">
                    <Tag className="h-3 w-3" />
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </header>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="mb-8 sm:mb-12">
            <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 w-full overflow-hidden rounded-lg">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div 
          className="prose-custom prose-sm sm:prose-base lg:prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        {/* Comments Section */}
        <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t">
          <CommentsSection postSlug={post.slug} />
        </div>
      </div>
    </article>
  );
}
