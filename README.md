# 정태인 블로그

> **Next.js 15** 기반의 현대적이고 세련된 개인 블로그 플랫폼

[![Next.js](https://img.shields.io/badge/Next.js-15.0.0-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

## 📋 목차

- [개요](#-개요)
- [주요 기능](#-주요-기능)
- [기술 스택](#-기술-스택)
- [프로젝트 구조](#-프로젝트-구조)
- [시작하기](#-시작하기)
- [API 문서](#-api-문서)
- [커스터마이징](#-커스터마이징)
- [배포](#-배포)
- [기여하기](#-기여하기)
- [라이선스](#-라이선스)

## 🎯 개요

정태인 블로그는 **Next.js 15**의 최신 App Router를 활용하여 구축된 현대적인 개인 블로그 플랫폼입니다. 마크다운 기반의 포스트 작성, 반응형 디자인, 다크 모드 지원 등 개발자 친화적인 기능들을 제공합니다.

### ✨ 핵심 특징

- 🚀 **Next.js 15 App Router** - 최신 React 서버 컴포넌트 활용
- 📝 **마크다운 기반** - 간편한 포스트 작성 및 관리
- 🎨 **모던 UI/UX** - Tailwind CSS와 Radix UI 기반 세련된 디자인
- 🌙 **다크 모드** - 사용자 선호에 따른 테마 전환
- 📱 **완전 반응형** - 모바일부터 데스크톱까지 최적화
- ⚡ **성능 최적화** - 정적 사이트 생성 및 이미지 최적화
- 🔍 **SEO 최적화** - 메타데이터 및 구조화된 데이터 지원

## 🚀 주요 기능

### 📝 콘텐츠 관리
- **마크다운 포스트 작성**: Frontmatter를 통한 메타데이터 관리
- **태그 및 카테고리 시스템**: 포스트 분류 및 필터링
- **이미지 최적화**: Next.js Image 컴포넌트를 통한 자동 최적화
- **코드 하이라이팅**: GitHub Flavored Markdown 지원

### 🎨 사용자 인터페이스
- **반응형 디자인**: 모든 디바이스에서 최적화된 경험
- **다크/라이트 모드**: 시스템 설정 또는 수동 전환
- **애니메이션**: Framer Motion을 활용한 부드러운 전환 효과
- **접근성**: WCAG 가이드라인 준수

### 🔧 개발자 경험
- **TypeScript**: 완전한 타입 안정성
- **JSDoc**: 포괄적인 코드 문서화
- **ESLint**: 코드 품질 관리
- **Hot Reload**: 실시간 개발 환경

## 🛠 기술 스택

### Frontend
- **[Next.js 15](https://nextjs.org/)** - React 프레임워크
- **[React 18](https://react.dev/)** - UI 라이브러리
- **[TypeScript 5](https://www.typescriptlang.org/)** - 타입 시스템
- **[Tailwind CSS 3.3](https://tailwindcss.com/)** - CSS 프레임워크

### UI 컴포넌트
- **[Radix UI](https://www.radix-ui.com/)** - 접근성 우선 컴포넌트
- **[Lucide React](https://lucide.dev/)** - 아이콘 라이브러리
- **[Framer Motion](https://www.framer.com/motion/)** - 애니메이션

### 콘텐츠 관리
- **[Gray Matter](https://github.com/jonschlinkert/gray-matter)** - Frontmatter 파싱
- **[Remark](https://remark.js.org/)** - 마크다운 처리
- **[Remark GFM](https://github.com/remarkjs/remark-gfm)** - GitHub Flavored Markdown

### 개발 도구
- **[ESLint](https://eslint.org/)** - 코드 린팅
- **[PostCSS](https://postcss.org/)** - CSS 후처리
- **[Autoprefixer](https://github.com/postcss/autoprefixer)** - CSS 벤더 프리픽스

## 📁 프로젝트 구조

```
jungtaeinn.github.io/
├── 📁 app/                          # Next.js App Router
│   ├── 📄 layout.tsx               # 루트 레이아웃
│   ├── 📄 page.tsx                 # 홈페이지
│   ├── 📄 globals.css              # 글로벌 스타일
│   ├── 📁 about/                   # 소개 페이지
│   │   └── 📄 page.tsx
│   ├── 📁 posts/                   # 포스트 관련 페이지
│   │   ├── 📄 page.tsx             # 포스트 목록
│   │   └── 📁 [slug]/              # 동적 포스트 페이지
│   │       └── 📄 page.tsx
│   └── 📁 api/                     # API 라우트
│       └── 📁 posts/
│           └── 📄 route.ts
├── 📁 components/                   # React 컴포넌트
│   ├── 📁 ui/                      # 기본 UI 컴포넌트
│   │   ├── 📄 button.tsx
│   │   ├── 📄 card.tsx
│   │   └── 📄 badge.tsx
│   ├── 📁 layout/                  # 레이아웃 컴포넌트
│   │   ├── 📄 header.tsx
│   │   └── 📄 footer.tsx
│   ├── 📁 blog/                    # 블로그 관련 컴포넌트
│   │   ├── 📄 hero-section.tsx
│   │   ├── 📄 post-card.tsx
│   │   ├── 📄 post-list.tsx
│   │   └── 📄 tag-filter.tsx
│   └── 📁 comments/                # 댓글 시스템
│       ├── 📄 comment-form.tsx
│       ├── 📄 comment-list.tsx
│       └── 📄 comments-section.tsx
├── 📁 lib/                         # 유틸리티 함수
│   ├── 📄 posts.ts                 # 포스트 관련 함수
│   ├── 📄 posts-client.ts          # 클라이언트 사이드 함수
│   ├── 📄 markdown.ts              # 마크다운 처리
│   └── 📄 utils.ts                 # 공통 유틸리티
├── 📁 public/                      # 정적 파일
│   ├── 📁 images/                  # 이미지 파일
│   │   └── 📄 profile.png          # 프로필 이미지
│   └── 📁 posts/                   # 마크다운 포스트
│       ├── 📄 welcome.md
│       └── 📄 nextjs-blog-setup.md
├── 📁 styles/                      # 스타일 파일
│   └── 📄 globals.css              # 글로벌 CSS
├── 📁 .github/                     # GitHub 설정
│   └── 📁 workflows/
│       └── 📄 deploy.yml           # 배포 워크플로우
├── 📄 next.config.js               # Next.js 설정
├── 📄 tailwind.config.js           # Tailwind CSS 설정
├── 📄 tsconfig.json                # TypeScript 설정
└── 📄 package.json                 # 프로젝트 의존성
```

## 🚀 시작하기

### 📋 사전 요구사항

- **Node.js** 18.0.0 이상
- **pnpm** 8.0.0 이상
- **Git** 2.0.0 이상

### 🔧 설치 및 실행

#### 1. 저장소 클론

```bash
git clone https://github.com/jungtaeinn/jungtaeinn.github.io.git
cd jungtaeinn.github.io
```

#### 2. 의존성 설치

```bash
# pnpm 사용
pnpm install
```

#### 3. 개발 서버 실행

```bash
# pnpm 사용
pnpm dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

#### 4. 프로덕션 빌드

```bash
# pnpm 사용
pnpm build
```

## 📚 API 문서

### 포스트 관련 함수

#### `getSortedPostsData()`
모든 포스트 데이터를 날짜순으로 정렬하여 반환합니다.

```typescript
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
export function getSortedPostsData(): PostData[]
```

#### `getPostData(slug: string)`
특정 슬러그의 포스트 데이터를 반환합니다.

```typescript
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
export function getPostData(slug: string): PostData
```

#### `getAllTags()`
모든 포스트에서 사용된 태그 목록을 반환합니다.

```typescript
/**
 * 모든 포스트에서 사용된 태그 목록을 반환
 * @returns {string[]} 중복 제거된 태그 배열 (알파벳순 정렬)
 */
export function getAllTags(): string[]
```

### 유틸리티 함수

#### `cn(...inputs: ClassValue[])`
클래스명을 병합하고 충돌을 해결하는 유틸리티 함수입니다.

```typescript
/**
 * 클래스명을 병합하고 충돌을 해결하는 유틸리티 함수
 * @description clsx와 tailwind-merge를 조합하여 클래스명을 안전하게 병합
 * @param {...ClassValue[]} inputs - 병합할 클래스명들
 * @returns {string} 병합된 클래스명 문자열
 * @example
 * ```typescript
 * cn('px-2 py-1', 'px-4', { 'bg-red-500': isError })
 * // 결과: 'py-1 px-4 bg-red-500' (px-2는 px-4로 덮어씌워짐)
 * ```
 */
export function cn(...inputs: ClassValue[]): string
```

#### `formatDate(dateString: string)`
날짜 문자열을 한국어 형식으로 포맷팅합니다.

```typescript
/**
 * 날짜 문자열을 한국어 형식으로 포맷팅
 * @param {string} dateString - ISO 형식의 날짜 문자열
 * @returns {string} 한국어 형식의 날짜 문자열 (예: "2024년 1월 15일")
 * @example
 * ```typescript
 * formatDate('2024-01-15')
 * // 결과: "2024년 1월 15일"
 * ```
 */
export function formatDate(dateString: string): string
```

## 🎨 커스터마이징

### 🎨 색상 테마 변경

`styles/globals.css` 파일의 CSS 변수를 수정하여 색상 테마를 변경할 수 있습니다.

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  /* ... 기타 색상 변수들 */
}
```

### 🧩 컴포넌트 수정

`components/` 디렉토리의 컴포넌트들을 수정하여 디자인을 커스터마이징할 수 있습니다.

### 📝 메타데이터 수정

`app/layout.tsx` 파일의 `metadata` 객체를 수정하여 사이트 정보를 변경할 수 있습니다.

```typescript
export const metadata: Metadata = {
  title: {
    default: '당신의 블로그',
    template: '%s | 당신의 블로그',
  },
  description: '당신의 블로그 설명',
  // ... 기타 메타데이터
};
```

### 📄 포스트 작성

1. `public/posts/` 디렉토리에 마크다운 파일 생성
2. 파일명은 URL 슬러그로 사용됩니다 (예: `my-post.md`)
3. 파일 상단에 frontmatter 작성:

```markdown
---
title: "포스트 제목"
date: "2024-01-15"
excerpt: "포스트 요약"
tags: ["태그1", "태그2"]
category: "카테고리"
featured: true
coverImage: "/images/cover.jpg"
---

# 포스트 내용

여기에 마크다운으로 포스트 내용을 작성하세요.
```

## 🚀 배포

### GitHub Pages 배포

1. **GitHub 저장소 설정**:
   - Settings → Pages → Source를 "GitHub Actions"로 설정

2. **자동 배포**:
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

3. **수동 배포**:
   ```bash
   pnpm deploy
   ```

### 기타 플랫폼

- **Vercel**: `vercel` 명령어로 배포
- **Netlify**: `pnpm build` 후 `out` 폴더 업로드
- **AWS S3**: 정적 사이트 호스팅 설정

## 🤝 기여하기

프로젝트에 기여해주셔서 감사합니다! 기여하기 전에 다음 사항을 확인해주세요.

### 📋 기여 가이드라인

1. **Fork** the Project
2. **Create** your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your Changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the Branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### 📝 코드 스타일

- **TypeScript** 사용 필수
- **JSDoc** 주석 작성
- **ESLint** 규칙 준수
- **Prettier** 포맷팅 적용

### 🐛 버그 리포트

버그를 발견하셨다면 [Issues](https://github.com/jungtaeinn/jungtaeinn.github.io/issues)에 상세한 정보와 함께 리포트해주세요.

## 📄 라이선스

이 프로젝트는 [MIT License](LICENSE) 하에 배포됩니다.

## 📞 연락처

- **이메일**: [jungtaeinn@gmail.com](mailto:jungtaeinn@gmail.com)
- **GitHub**: [@jungtaeinn](https://github.com/jungtaeinn)
- **LinkedIn**: [정태인](https://www.linkedin.com/in/jungtaeinn5493)

---

<div align="center">

**⭐ 이 프로젝트가 도움이 되었다면 Star를 눌러주세요!**

Made with ❤️ by [정태인](https://github.com/jungtaeinn)

</div>