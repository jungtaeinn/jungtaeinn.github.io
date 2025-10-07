import Image from 'next/image';

/**
 * 홈페이지 히어로 섹션 컴포넌트
 * @description 블로그의 메인 소개 섹션으로 프로필 정보와 주요 링크를 제공
 * @returns {JSX.Element} 히어로 섹션 JSX 요소
 * @example
 * ```tsx
 * <HeroSection />
 * ```
 */
export default function HeroSection() {
  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-4xl mx-auto text-center">
        {/* 프로필 이미지 */}
        <div className="mb-6">
          <div className="relative w-20 h-20 mx-auto mb-4">
            <Image
              src="/images/profile.png"
              alt="Jung Tae In Profile"
              fill
              className="rounded-full object-cover"
              priority
              sizes="80px"
              quality={90}
            />
          </div>
        </div>

        {/* 메인 타이틀 */}
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
          JUNG TAEINN
        </h1>

        {/* 서브타이틀 */}
        <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
          My name is Jung TaeInn. I&apos;m a frontend engineer based in Seoul, Korea.
        </p>

        {/* 인스피레이션 문구 */}
        <blockquote className="text-lg font-medium italic text-foreground mb-7">
          &ldquo;I think it is possible for ordinary people to choose to be extraordinary.&rdquo;
        </blockquote>
      </div>
    </section>
  );
}