import Image from 'next/image';
import { Github, Linkedin, Instagram, Mail } from 'lucide-react';

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
        {/*<blockquote className="text-lg font-medium italic text-foreground mb-7">*/}
        {/*  &ldquo;I think it is possible for ordinary people to choose to be extraordinary.&rdquo;*/}
        {/*</blockquote>*/}

        {/* 소셜 미디어 링크 */}
        <div className="flex justify-center space-x-4">
          <a
            href="https://github.com/jungtaeinn"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
            aria-label="GitHub 프로필"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/jungtaeinn5493"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
            aria-label="LinkedIn 프로필"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a
            href="https://instagram.com/_jungtaeinn"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
            aria-label="Instagram 프로필"
          >
            <Instagram className="h-5 w-5" />
          </a>
          <a
            href="mailto:asgard5493@gmail.com"
            className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
            aria-label="이메일 보내기"
          >
            <Mail className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
}