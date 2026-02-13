# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2026-02-13

### Added
- About 페이지 최신 이력에 GEO 전사 플랫폼 아키텍처 프로젝트 카드 추가
  - E-E-A-T, CEP, AI 자동화 기반 GEO BestPractice 및 성과 요약
  - GEO 플랫폼 아키텍처 상세 포스팅 링크 연결
- OpenAI Apps SDK 아모레몰 앱 카드에 상세 포스팅 링크 연결
  - ChatGPT Apps SDK 아모레몰 통합 포스팅 링크 추가

## [1.1.0] - 2026-02-01

### Added
- Agent Skills 문서 추가 - 블로그 포스트 작성 스킬
  - 공식 Agent Skills 스펙에 맞춘 블로그 포스트 작성 스킬 추가
  - skills/blog-post-creation/ 폴더 구조 생성
  - SKILL.md: 한글 버전의 상세 스킬 문서 작성
  - README.md: 빠른 시작 가이드 추가
- Turborepo 모노레포 아키텍처 블로그 포스트 추가
  - LinkedIn 포스트를 GitHub.io 형식으로 변환
  - 코어 라이브러리 구성 및 AI 자동화 내용 포함
  - SEO 최적화 적용
- About 페이지에 OpenAI Apps SDK 프로젝트 경력 추가
  - OpenAI Apps SDK 기반 아모레몰 앱 설계 및 구축 프로젝트 추가
  - 개발 도구 의존성 추가

### Changed
- React 19 및 Next.js 16 업데이트
- ESLint 9 마이그레이션
- GitHub Actions Node.js 버전을 25로 업데이트

### Removed
- 불필요한 포스팅 파일 제거

## [1.0.1] - 2025-10-20

### Changed
- SEO 최적화 개선
  - Open Graph/Twitter 카드 및 구조화 데이터 개선
  - OG 이미지 렌더링 개선 및 메타 최적화
  - Twitter 카드 이미지/메타 구성 정비
  - 스키마(Structured Data) 보완 및 정확도 향상
  - 전역 메타/레이아웃 정리로 일관성 및 성능 개선
  - 포스트 레이아웃의 SEO 신호 강화 및 마크업 정리
  - 소개 페이지 콘텐츠/마크업 다듬기
  - SEO_GUIDE.md 최신 전략 반영 및 가이드 업데이트

### Removed
- 레거시 OpenGraph/Twitter 이미지 생성기 제거

## [1.0.0] - 2025-10-17

### Added
- SEO 최적화 기능 추가
  - Google Search Console 검증 코드 추가
  - 구조화된 데이터 (JSON-LD) 추가
  - 사이트맵 (sitemap.xml) 자동 생성
  - Robots.txt 설정
- About 페이지에 코어 패키지 라이브러리 프로젝트 경험 추가
- DATADOG LIVE SEOUL 2024 연사 회고 포스트 추가
  - 아모레몰의 성장전략과 로그툴 도입 과정 공유
  - 이미지 및 SEO 최적화 적용
- GitHub Actions 워크플로우 추가
  - 자동 배포 파이프라인 구축
  - pnpm 호환성 개선
- About 페이지 포트폴리오 콘텐츠 업데이트
  - 회사 및 대학 로고 추가
  - 프로젝트 경험 상세 정보 추가
- 블로그 UI/UX 개선
  - 프로필 이미지 추가
  - 소셜 미디어 링크 추가
  - 연락처 정보 업데이트
  - 다크 모드 기본 테마 설정
  - Scroll to top 버튼 추가
  - 방문자 카운터 컴포넌트 추가
- Ads.txt 추가
- Google Ads 추가

### Fixed
- GitHub Pages CSS 로딩 문제 해결
- ESLint 오류 수정
- pnpm 버전 호환성 문제 해결
- GitHub Actions 워크플로우 pnpm 사용으로 수정
- 배포 취소 관련 문제 해결

### Changed
- README 문서 대폭 개선
- 프로젝트 문서 업데이트

---

## [Unreleased]

(현재 예정된 변경 사항 없음)

[1.2.0]: https://github.com/jungtaeinn/jungtaeinn.github.io/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/jungtaeinn/jungtaeinn.github.io/compare/v1.0.1...v1.1.0
[1.0.1]: https://github.com/jungtaeinn/jungtaeinn.github.io/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/jungtaeinn/jungtaeinn.github.io/releases/tag/v1.0.0
