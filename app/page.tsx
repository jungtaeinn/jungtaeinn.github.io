import { getSortedPostsData } from '@/lib/posts';
import HeroSection from '@/components/blog/hero-section';
import PostList from '@/components/blog/post-list';

export default function HomePage() {
  const posts = getSortedPostsData();
  const featuredPosts = posts.filter(post => post.featured).slice(0, 6);

  return (
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
  );
}
