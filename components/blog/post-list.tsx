'use client';

import { useState, useEffect } from 'react';
import { PostData } from '@/lib/posts';
import PostCard from './post-card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface PostListProps {
  posts: PostData[];
  title?: string;
  description?: string;
  showLoadMore?: boolean;
}

export default function PostList({ posts, title, description, showLoadMore = false }: PostListProps) {
  const [displayedPosts, setDisplayedPosts] = useState<PostData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const postsPerPage = 6;

  useEffect(() => {
    setDisplayedPosts(posts.slice(0, postsPerPage));
    setHasMore(posts.length > postsPerPage);
  }, [posts]);

  const loadMorePosts = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      const currentLength = displayedPosts.length;
      const nextPosts = posts.slice(currentLength, currentLength + postsPerPage);
      
      setDisplayedPosts(prev => [...prev, ...nextPosts]);
      setHasMore(currentLength + postsPerPage < posts.length);
      setIsLoading(false);
    }, 500);
  };

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No posts available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {(title || description) && (
        <div className="text-center space-y-2">
          {title && (
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-sm text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {displayedPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {showLoadMore && hasMore && (
        <div className="text-center pt-8">
          <Button
            onClick={loadMorePosts}
            disabled={isLoading}
            variant="outline"
            className="px-8"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              'Load More Posts'
            )}
          </Button>
        </div>
      )}
    </div>
  );
}