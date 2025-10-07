'use client';

import { useState, useEffect } from 'react';
import { PostData } from '@/lib/posts';
import PostList from '@/components/blog/post-list';
import TagFilter from '@/components/blog/tag-filter';
import { filterPostsByTags, getAllTagsFromPosts } from '@/lib/posts-client';

export default function PostsPage() {
  const [allPosts, setAllPosts] = useState<PostData[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<PostData[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);

  useEffect(() => {
    // 클라이언트 사이드에서 포스트 데이터 로드
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => {
        setAllPosts(data);
        setFilteredPosts(data);
        setAllTags(getAllTagsFromPosts(data));
      })
      .catch(() => {
        // API가 없으면 빈 배열로 설정
        setAllPosts([]);
        setFilteredPosts([]);
        setAllTags([]);
      });
  }, []);

  useEffect(() => {
    const filtered = filterPostsByTags(allPosts, selectedTags);
    setFilteredPosts(filtered);
  }, [selectedTags, allPosts]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleClearAll = () => {
    setSelectedTags([]);
  };

  return (
    <div className="py-16 sm:py-20 lg:py-24">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <TagFilter
                tags={allTags}
                selectedTags={selectedTags}
                onTagToggle={handleTagToggle}
                onClearAll={handleClearAll}
              />
            </div>
          </div>

          <div className="lg:col-span-3">
            <PostList 
              posts={filteredPosts}
              title="모든 포스트"
              description={`총 ${filteredPosts.length}개의 포스트`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}