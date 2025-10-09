import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';
import { PostData } from '@/lib/posts';

interface PostCardProps {
  post: PostData;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="group">
      <Link href={`/posts/${post.slug}`} className="block">
        {/* 커버 이미지 */}
        {post.coverImage && (
          <div className="relative h-48 w-full overflow-hidden mb-4">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          </div>
        )}

        {/* 카테고리 */}
        {post.category && (
          <div className="mb-2">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              {post.category}
            </span>
          </div>
        )}

        {/* 제목 */}
        <h2 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors leading-tight">
          {post.title}
        </h2>

        {/* 요약 */}
        <p className="text-muted-foreground text-xs leading-relaxed mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        {/* 메타 정보 */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>정태인</span>
          <span>{formatDate(post.date)}</span>
        </div>
      </Link>
    </article>
  );
}
