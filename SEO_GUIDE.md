# SEO 최적화 가이드

## 📋 목차
1. [적용된 SEO 최적화](#적용된-seo-최적화)
2. [Google Search Console 설정](#google-search-console-설정)
3. [성능 모니터링](#성능-모니터링)
4. [추가 권장사항](#추가-권장사항)

---

## ✅ 적용된 SEO 최적화

### 1. 메타데이터 최적화
각 페이지별로 최적화된 메타데이터가 적용되었습니다:

#### 메인 페이지 (`/`)
- **Title**: jungtaeinn.github.io - Frontend Engineer Blog
- **Description**: Frontend Engineer 정태인의 기술 블로그
- **Keywords**: Frontend, React, Next.js, TypeScript, etc.
- **Open Graph & Twitter Cards**: 소셜 미디어 공유 최적화

#### About 페이지 (`/about`)
- **Title**: About - 정태인
- **Type**: Profile
- **Person Schema**: 구조화된 데이터 포함

#### Posts 페이지 (`/posts`)
- **Title**: Posts - 모든 블로그 글
- **Description**: 블로그 글 모음 설명

#### 개별 포스트 (`/posts/[slug]`)
- **Dynamic Metadata**: 각 포스트별 메타데이터
- **BlogPosting Schema**: 구조화된 데이터
- **Breadcrumb Schema**: 브레드크럼 네비게이션

---

### 2. 구조화된 데이터 (JSON-LD)

#### WebSite Schema (메인 페이지)
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "jungtaeinn.github.io",
  "url": "https://jungtaeinn.github.io",
  "description": "...",
  "author": "jungtaeinn",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "..."
  }
}
```

#### Person Schema (About 페이지)
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "jungtaeinn",
  "jobTitle": "Frontend Engineer",
  "knowsAbout": [...],
  "sameAs": [...]
}
```

#### BlogPosting Schema (포스트 페이지)
```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "...",
  "author": "jungtaeinn",
  "publisher": {...},
  "datePublished": "...",
  "dateModified": "..."
}
```

---

### 3. 사이트맵 (sitemap.xml)

**위치**: `/app/sitemap.ts`

동적으로 생성되는 사이트맵으로 다음을 포함합니다:
- 메인 페이지 (우선순위: 1.0)
- About 페이지 (우선순위: 0.9)
- Posts 목록 페이지 (우선순위: 0.9)
- 모든 블로그 포스트 (우선순위: 0.8)

**확인 방법**:
```bash
# 로컬 개발 서버에서
http://localhost:3000/sitemap.xml

# 배포 후
https://jungtaeinn.github.io/sitemap.xml
```

---

### 4. Robots.txt

**위치**: `/app/robots.ts`

검색 엔진 크롤러 설정:
- **허용**: 모든 페이지 크롤링
- **차단**: `/api/`, `/_next/`, `/static/` 디렉토리
- **사이트맵**: sitemap.xml 위치 명시

**확인 방법**:
```bash
# 로컬 개발 서버에서
http://localhost:3000/robots.txt

# 배포 후
https://jungtaeinn.github.io/robots.txt
```

---

## 🔧 Google Search Console 설정

### 1. 사이트 등록

1. [Google Search Console](https://search.google.com/search-console) 접속
2. '속성 추가' 클릭
3. URL 입력: `https://jungtaeinn.github.io`
4. 소유권 확인 방법 선택

### 2. 소유권 확인 방법

#### 방법 1: HTML 파일 업로드 (권장)
```bash
# Google이 제공한 파일을 public 디렉토리에 저장
cp google[hash].html public/

# 또는 Next.js 15에서는 app 폴더에 직접 생성
# app/google[hash].html/route.ts
```

#### 방법 2: 메타 태그 (이미 적용됨)
`app/layout.tsx`의 metadata에 verification 코드가 포함되어 있습니다:
```typescript
export const metadata: Metadata = {
  verification: {
    google: 'your-google-verification-code', // 여기에 실제 코드 입력
  },
};
```

**⚠️ 중요**: `app/layout.tsx`의 `verification.google` 값을 실제 Google 검증 코드로 교체해야 합니다.

### 3. 사이트맵 제출

1. Google Search Console에서 '색인 생성' > '사이트맵' 클릭
2. 사이트맵 URL 입력: `https://jungtaeinn.github.io/sitemap.xml`
3. '제출' 클릭

---

## 📊 성능 모니터링

### Google PageSpeed Insights

1. [PageSpeed Insights](https://pagespeed.web.dev/) 접속
2. URL 입력: `https://jungtaeinn.github.io`
3. 분석 실행

**목표 점수**:
- **Performance**: 90+ (Green)
- **Accessibility**: 95+ (Green)
- **Best Practices**: 95+ (Green)
- **SEO**: 95+ (Green)

### Lighthouse (Chrome DevTools)

1. Chrome DevTools 열기 (F12)
2. 'Lighthouse' 탭 선택
3. 'Generate report' 클릭

---

## 📝 추가 권장사항

### 1. 이미지 최적화

현재 Next.js Image 컴포넌트를 사용하고 있습니다. 추가 최적화:

```typescript
// WebP 포맷 사용
<Image
  src="/images/photo.jpg"
  alt="설명"
  width={800}
  height={600}
  quality={85}
  placeholder="blur"
  loading="lazy"
/>
```

### 2. Open Graph 이미지 생성

각 포스트별로 고유한 OG 이미지를 생성하면 좋습니다:
- 크기: 1200x630px
- 포맷: PNG 또는 JPG
- 위치: `/public/images/og/[slug].png`

### 3. 콘텐츠 개선

#### 포스트 작성 시 체크리스트:
- [ ] 제목은 60자 이내
- [ ] 설명(excerpt)은 155자 이내
- [ ] 3-5개의 관련 태그 추가
- [ ] 커버 이미지 포함
- [ ] 내부 링크 추가 (다른 포스트 연결)
- [ ] 외부 링크는 `rel="noopener noreferrer"` 속성 사용

#### SEO 친화적인 마크다운 작성:
```markdown
---
title: "명확하고 구체적인 제목 (60자 이내)"
excerpt: "포스트의 핵심 내용을 요약한 설명 (155자 이내)"
date: "2025-01-01"
category: "Frontend"
tags: ["React", "Next.js", "TypeScript"]
featured: true
coverImage: "/images/posts/slug/cover.jpg"
---

# H1 제목 (페이지당 하나만)

## H2 부제목 (구조화)

### H3 소제목

내용...
```

### 4. 외부 링크 (Backlinks) 확보

검색 순위를 높이는 방법:
- LinkedIn, GitHub에 블로그 링크 공유
- 다른 개발자 블로그에 댓글 작성
- Dev.to, Medium 등에 크로스 포스팅
- 오픈소스 프로젝트 기여 시 블로그 링크 추가

### 5. 소셜 미디어 최적화

현재 적용된 소셜 미디어 링크:
- GitHub: https://github.com/jungtaeinn
- LinkedIn: https://www.linkedin.com/in/jungtaeinn5493
- Instagram: https://instagram.com/_jungtaeinn

**추가 권장사항**:
- 새 포스트 작성 시 LinkedIn에 공유
- 관련 커뮤니티(Reddit, 페이스북 그룹)에 공유
- Twitter/X 계정 추가 고려

### 6. Google Analytics 설정

`app/layout.tsx`에 Google Analytics 추가:

```typescript
// app/layout.tsx
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
      </body>
    </html>
  );
}
```

### 7. 주기적인 콘텐츠 업데이트

검색 엔진은 활발히 업데이트되는 사이트를 선호합니다:
- 최소 월 2-4회 포스트 작성
- 기존 포스트 업데이트 (날짜 갱신)
- 시즌별 콘텐츠 작성

---

## 🎯 체크리스트

### 배포 전
- [ ] `app/layout.tsx`의 Google 검증 코드 업데이트
- [ ] 모든 이미지에 alt 텍스트 추가
- [ ] 내부 링크 확인 (404 없는지)
- [ ] 로컬에서 sitemap.xml 확인
- [ ] 로컬에서 robots.txt 확인
- [ ] 빌드 에러 없는지 확인

### 배포 후
- [ ] Google Search Console 등록
- [ ] 사이트맵 제출
- [ ] PageSpeed Insights 테스트
- [ ] 실제 URL로 메타데이터 확인 (Facebook Debugger, Twitter Card Validator)
- [ ] Google에서 사이트 검색 (`site:jungtaeinn.github.io`)

### 주기적으로
- [ ] Google Search Console에서 검색 성능 확인 (주 1회)
- [ ] 404 에러 확인 및 수정
- [ ] 페이지 로딩 속도 모니터링
- [ ] 새 포스트 작성 (월 2-4회)
- [ ] 기존 포스트 업데이트

---

## 🔗 유용한 도구

### SEO 검증 도구
- [Google Search Console](https://search.google.com/search-console)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Schema Markup Validator](https://validator.schema.org/)
- [Rich Results Test](https://search.google.com/test/rich-results)

### 메타데이터 미리보기
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

### 분석 도구
- [Google Analytics](https://analytics.google.com/)
- [Google Tag Manager](https://tagmanager.google.com/)

---

## 📞 참고 자료

- [Next.js SEO Guide](https://nextjs.org/learn/seo/introduction-to-seo)
- [Google Search Central](https://developers.google.com/search)
- [Schema.org](https://schema.org/)
- [Web.dev](https://web.dev/learn/seo/)

---

**작성일**: 2025-10-16  
**버전**: 1.0.0

