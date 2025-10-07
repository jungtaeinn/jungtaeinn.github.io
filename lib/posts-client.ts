// 클라이언트 사이드에서 사용할 수 있는 포스트 관련 함수들
import { PostData } from './posts';

export function filterPostsByTags(posts: PostData[], selectedTags: string[]): PostData[] {
  if (selectedTags.length === 0) {
    return posts;
  }
  
  return posts.filter(post => 
    selectedTags.some(tag => post.tags?.includes(tag))
  );
}

export function filterPostsByCategory(posts: PostData[], category: string): PostData[] {
  return posts.filter(post => post.category === category);
}

export function getAllTagsFromPosts(posts: PostData[]): string[] {
  const tags = new Set<string>();
  
  posts.forEach((post) => {
    post.tags?.forEach((tag) => tags.add(tag));
  });
  
  return Array.from(tags).sort();
}

export function getAllCategoriesFromPosts(posts: PostData[]): string[] {
  const categories = new Set<string>();
  
  posts.forEach((post) => {
    if (post.category) {
      categories.add(post.category);
    }
  });
  
  return Array.from(categories).sort();
}
