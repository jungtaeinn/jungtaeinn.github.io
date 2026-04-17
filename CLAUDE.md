# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal technical blog for Frontend Engineer 정태인 (Jung Taeinn). Built with **Next.js 16 App Router** using static site generation (SSG) and deployed to **GitHub Pages**. Content is written in Korean.

## Commands

```bash
pnpm install          # Install dependencies
pnpm dev              # Dev server at http://localhost:3000
pnpm build            # Production build (static export to ./out/)
pnpm lint             # ESLint
pnpm deploy           # Build + deploy to gh-pages branch
```

No test suite is configured.

## Architecture

- **Static export**: `next.config.js` sets `output: 'export'` — no server-side features at runtime. All pages are pre-rendered at build time.
- **Content system**: Blog posts are markdown files in `public/posts/`. The filename becomes the URL slug (`/posts/[slug]`). Frontmatter is parsed with Gray Matter; body is converted to HTML via Remark + Remark-GFM.
- **Data flow**: `lib/posts.ts` reads markdown from disk (server/build time). Client components use `lib/posts-client.ts`. An API route exists at `app/api/posts/route.ts`.
- **Styling**: Tailwind CSS 3.4 with class-based dark mode toggle. HSL color variables defined in CSS. Radix UI for accessible primitives. Framer Motion for animations.
- **SEO**: JSON-LD structured data in `components/seo/structured-data.tsx` (Person, Organization, BlogPosting, Breadcrumb, WebSite schemas). Dynamic `sitemap.ts` and `robots.ts` in `app/`.
- **Path alias**: `@/*` maps to project root (tsconfig.json).
- **CI/CD**: GitHub Actions (`.github/workflows/deploy.yml`) builds with pnpm on Node.js 25 and deploys to GitHub Pages.

## Blog Post Creation

Posts go in `public/posts/<slug>.md`. Images go in `public/images/posts/<slug>/`.

Frontmatter format:
```yaml
---
title: "제목 (이모지 포함 가능)"
date: "YYYY-MM-DD"
excerpt: "155자 이내 SEO 최적화 설명"
tags: ["Tag1", "Tag2"]
category: "Category"
featured: true
coverImage: "/images/posts/<slug>/image.png"
---
```

Key conventions:
- Excerpt must be under 155 characters with relevant keywords
- All images need descriptive alt text with keywords
- External links use `target="_blank"` and `rel="noopener noreferrer"`
- Internal links to other posts: `/posts/<slug>`
- Reference `AGENT_SKILLS_BLOG_POST_CREATION.md` and `SEO_GUIDE.md` for detailed post creation and SEO guidelines

## Commit Message Format

Always use the following format when writing commit messages:

```
<type>: <subject>

- <type>: <detail>
- <type>: <detail>
- <type>: <detail>
```

Types: `feat`, `fix`, `chore`, `refactor`, `docs`, `style`, `test`, `ci`

- First line: the most representative change
- Bullet lines: each individual change broken down separately