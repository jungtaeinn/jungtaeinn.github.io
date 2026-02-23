<div align="center">

# jungtaeinn.github.io

**Frontend Engineer 정태인의 기술 블로그**

아키텍처 설계, AI 에이전트, 프론트엔드 엔지니어링에 대한 경험과 인사이트를 공유합니다.

[![Blog](https://img.shields.io/badge/Blog-jungtaeinn.github.io-000?style=flat-square&logo=github)](https://jungtaeinn.github.io)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-정태인-0077B5?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/jungtaeinn5493)
[![GitHub](https://img.shields.io/badge/GitHub-jungtaeinn-181717?style=flat-square&logo=github)](https://github.com/jungtaeinn)

</div>

---

## 소개

안녕하세요, **정태인**입니다.

이 블로그는 제 여정에서의 경험, 시행착오, 그리고 배움을 기록하는 공간입니다.

## 주요 주제

### AI Agent & Orchestration

Electron + Multi-LLM 기반 데스크톱 AI 에이전트 **OpenPersona**를 설계하고 구축한 경험을 다룹니다. Hybrid Search(Vector + BM25), RRF 병합, LLM 리랭킹으로 구성된 RAG 파이프라인과 Intent 분류 - Model 선택 - Tool Call Loop까지 이어지는 AI Agent Orchestrator 아키텍처를 실제 코드와 함께 상세히 공유합니다.

### ChatGPT Apps & MCP

OpenAI ChatGPT Apps SDK와 Model Context Protocol(MCP)을 활용하여 ChatGPT 내에서 이커머스 상품을 추천하고 검색할 수 있는 AI 쇼핑 어시스턴트를 구축한 과정을 다룹니다. Python FastMCP 서버와 React Widget 통합 구조, Streamable HTTP 기반 데이터 플로우를 공유합니다.

### Frontend Architecture

Turborepo 기반 모노레포 아키텍처를 통해 멀티 서비스를 효율적으로 관리하는 방법을 다룹니다. 엔터프라이즈급 코어 라이브러리 설계, 내부/외주 개발팀 간 협업 최적화, AI 기반 개발 프로세스 자동화 전략을 공유합니다.

### GEO(Generative Engine Optimization)

E-E-A-T, CEP 원칙에 기반한 고품질 GEO 컨텐츠 구성과 AI 에이전트를 활용한 자동화 전략을 다룹니다. BestPractice와 프롬프트를 기술자산화하여 버저닝으로 유지보수하는 플랫폼 확대 아키텍처를 공유합니다.

### Monitoring & Observability

서비스의 내재화 - 고도화 - 안정화 3단계 성장전략 수립과 로그 분석 도구 도입을 통한 서비스 안정화 경험을 다룹니다. DATADOG LIVE Seoul 2024 연사 발표를 통해 공유한 장애 예측, 고객 경험 최적화를 위한 데이터 기반 의사결정 과정을 공유합니다.

---

## 기술 스택

이 블로그는 **Next.js 16** App Router와 정적 사이트 생성(SSG)을 활용하여 구축되었습니다.

| 영역 | 기술 |
|------|------|
| Framework | Next.js 16, React 19, TypeScript 5.8 |
| Styling | Tailwind CSS 3.4, Radix UI, Framer Motion |
| Content | Markdown, Gray Matter, Remark, Remark GFM |
| SEO | Structured Data (Schema.org), Sitemap, Robots.txt |
| Deploy | GitHub Pages (SSG) |
| Package Manager | pnpm |

## 프로젝트 구조

```
jungtaeinn.github.io/
├── app/                           # Next.js App Router
│   ├── layout.tsx                 # 루트 레이아웃 & 메타데이터
│   ├── page.tsx                   # 홈페이지
│   ├── globals.css                # 글로벌 스타일
│   ├── robots.ts                  # Robots.txt 생성
│   ├── sitemap.ts                 # 사이트맵 생성
│   ├── about/page.tsx             # 소개 페이지
│   ├── posts/                     # 포스트 페이지
│   │   ├── page.tsx               # 포스트 목록
│   │   └── [slug]/page.tsx        # 동적 포스트 상세
│   └── api/posts/route.ts         # 포스트 API
├── components/                    # React 컴포넌트
│   ├── ui/                        # 기본 UI (Button, Card, Badge 등)
│   ├── layout/                    # Header, Footer
│   ├── blog/                      # HeroSection, PostCard, PostList, TagFilter
│   ├── comments/                  # 댓글 시스템
│   ├── analytics/                 # 방문자 분석
│   └── seo/                       # 구조화된 데이터
├── lib/                           # 유틸리티
│   ├── posts.ts                   # 포스트 데이터 처리
│   ├── posts-client.ts            # 클라이언트 사이드 함수
│   ├── markdown.ts                # 마크다운 처리
│   ├── visitor.ts                 # 방문자 추적
│   └── utils.ts                   # 공통 유틸리티
├── public/
│   ├── posts/                     # 마크다운 포스트 (6개)
│   └── images/                    # 이미지 리소스
├── styles/globals.css             # 글로벌 CSS
├── next.config.js                 # Next.js 설정 (정적 export)
├── tailwind.config.js             # Tailwind CSS 설정
├── tsconfig.json                  # TypeScript 설정
└── package.json                   # 프로젝트 의존성
```

## 로컬 실행

```bash
# 저장소 클론
git clone https://github.com/jungtaeinn/jungtaeinn.github.io.git
cd jungtaeinn.github.io

# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev
# http://localhost:3000

# 프로덕션 빌드 (정적 사이트 생성)
pnpm build

# GitHub Pages 배포
pnpm deploy
```

## 포스트 작성

`public/posts/` 디렉토리에 마크다운 파일을 생성합니다. 파일명이 URL 슬러그로 사용됩니다.

```markdown
---
title: "포스트 제목"
date: "2026-01-01"
excerpt: "포스트 요약"
tags: ["태그1", "태그2"]
category: "카테고리"
featured: true
coverImage: "/images/posts/cover.jpg"
---

포스트 내용을 마크다운으로 작성합니다.
```

## 연락처

- **Email**: [asgard5493@gmail.com](mailto:asgard5493@gmail.com)
- **GitHub**: [@jungtaeinn](https://github.com/jungtaeinn)
- **LinkedIn**: [정태인](https://www.linkedin.com/in/jungtaeinn5493)
- **Instagram**: [@_jungtaeinn](https://instagram.com/_jungtaeinn)

## License

[MIT](LICENSE)
