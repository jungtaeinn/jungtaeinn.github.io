import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'public/posts');

/**
 * 블로그 포스트 데이터 인터페이스
 * @interface PostData
 * @property {string} slug - 포스트 URL 슬러그
 * @property {string} title - 포스트 제목
 * @property {string} date - 포스트 작성일 (ISO 형식)
 * @property {string} excerpt - 포스트 요약
 * @property {string} content - 포스트 마크다운 내용
 * @property {string[]} tags - 포스트 태그 배열
 * @property {string} category - 포스트 카테고리
 * @property {boolean} [featured] - 추천 포스트 여부
 * @property {string} [coverImage] - 커버 이미지 URL
 */
export interface PostData {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
  category: string;
  featured?: boolean;
  coverImage?: string;
}

/**
 * 모든 포스트 데이터를 날짜순으로 정렬하여 반환
 * @description public/posts 디렉토리의 마크다운 파일들을 읽어서 메타데이터와 함께 정렬된 배열로 반환
 * @returns {PostData[]} 날짜 내림차순으로 정렬된 포스트 배열
 * @example
 * ```typescript
 * const posts = getSortedPostsData();
 * console.log(posts[0].title); // 가장 최근 포스트 제목
 * ```
 */
export function getSortedPostsData(): PostData[] {
  // Get file names under /public/posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      // Remove ".md" from file name to get id
      const slug = fileName.replace(/\.md$/, '');

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // Combine the data with the id
      return {
        slug,
        content: matterResult.content,
        ...matterResult.data,
      } as PostData;
    });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

/**
 * 모든 포스트의 슬러그 목록을 반환
 * @description public/posts 디렉토리의 모든 .md 파일명에서 확장자를 제거한 슬러그 배열 반환
 * @returns {string[]} 포스트 슬러그 배열
 */
export function getAllPostSlugs(): string[] {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.md$/, ''));
}

/**
 * 특정 슬러그의 포스트 데이터를 반환
 * @param {string} slug - 포스트 슬러그
 * @returns {PostData} 해당 포스트의 데이터
 * @throws {Error} 파일을 찾을 수 없을 때 에러 발생
 * @example
 * ```typescript
 * const post = getPostData('my-post');
 * console.log(post.title);
 * ```
 */
export function getPostData(slug: string): PostData {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Combine the data with the slug
  return {
    slug,
    content: matterResult.content,
    ...matterResult.data,
  } as PostData;
}

/**
 * 특정 태그를 가진 포스트들을 반환
 * @param {string} tag - 검색할 태그
 * @returns {PostData[]} 해당 태그를 가진 포스트 배열
 */
export function getPostsByTag(tag: string): PostData[] {
  const allPosts = getSortedPostsData();
  return allPosts.filter((post) => post.tags?.includes(tag));
}

/**
 * 특정 카테고리의 포스트들을 반환
 * @param {string} category - 검색할 카테고리
 * @returns {PostData[]} 해당 카테고리의 포스트 배열
 */
export function getPostsByCategory(category: string): PostData[] {
  const allPosts = getSortedPostsData();
  return allPosts.filter((post) => post.category === category);
}

/**
 * 모든 포스트에서 사용된 태그 목록을 반환
 * @returns {string[]} 중복 제거된 태그 배열 (알파벳순 정렬)
 */
export function getAllTags(): string[] {
  const allPosts = getSortedPostsData();
  const tags = new Set<string>();
  
  allPosts.forEach((post) => {
    post.tags?.forEach((tag) => tags.add(tag));
  });
  
  return Array.from(tags).sort();
}

/**
 * 모든 포스트에서 사용된 카테고리 목록을 반환
 * @returns {string[]} 중복 제거된 카테고리 배열 (알파벳순 정렬)
 */
export function getAllCategories(): string[] {
  const allPosts = getSortedPostsData();
  const categories = new Set<string>();
  
  allPosts.forEach((post) => {
    if (post.category) {
      categories.add(post.category);
    }
  });
  
  return Array.from(categories).sort();
}
