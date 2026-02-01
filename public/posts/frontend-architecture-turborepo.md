---
title: "🏗️ 프론트엔드 아키텍처 설계 - Turborepo를 활용한 모노레포 구축"
date: "2025-01-15"
excerpt: "Turborepo를 활용한 모노레포 아키텍처 설계로 아모레몰의 멀티 서비스를 효율적으로 관리하고, 빌드 속도 최적화, 코어 라이브러리 관리, AI 자동화를 통한 개발 생산성을 향상시키는 방법을 공유합니다."
tags: ["Frontend", "Architecture", "Turborepo", "Monorepo", "React", "Next.js", "Amorepacific", "Vercel", "AX"]
category: "Architecture"
featured: true
coverImage: "/images/posts/frontend-architecture-turborepo/Turborepo_main_top_img.png"
---

### 📅 글 개요

아모레몰은 다양한 고객층 확보와 충성고객 유치를 위해 많은 도전과 노력을 하며 성장하고 있습니다. 이에 따라 다양한 형태의 서비스를 과감히 시도하고 도전하며, 고객의 검증을 토대로 데이터화하고 분석하여 이를 다시 더 나은 서비스로 개선시키려는 노력을 거듭하고 있습니다.

이러한 서비스 다양화와 성장 과정에서 **프론트엔드 아키텍처 설계**는 매우 중요한 역할을 합니다. 특히 **Turborepo 기반 모노레포 아키텍처**를 통해 멀티 서비스를 효율적으로 관리하고, 개발 생산성을 향상시키는 방법을 공유합니다.

> 💡 **이 글에서 다룰 내용**
> - 서비스 다양화에 따른 개발 효율성 고민
> - Turborepo 기반 모노레포 아키텍처 설계
> - 내부/외주 개발팀 간 협업 최적화 전략
> - 아키텍처를 통해 얻는 효과와 고도화 방향

### 🎯 서비스 다양화와 개발 효율성

서비스가 다양해질수록 훌륭한 개발자는 프로젝트 간 관리와 내부/외주 개발자 간 효율적인 소통의 비용을 최적화하고자 노력해야 합니다.

**핵심 목표**:
- ⚡ **빠른 아웃풋을 도출할 수 있는 시스템 환경**
- 🤝 **내부/외주 개발자간의 이해 관계 및 코드 품질 향상**
- 🛡️ **다양한 서비스를 안정적으로 서비스할 수 있는 아키텍처**

### 🔍 주요 고려사항

아모레퍼시픽에는 아모레몰/아모레스토어/스킨노트 등 다양한 서비스가 복합적으로 존재하며 이는 각각의 프로젝트로 구성되어 있습니다.

#### 📊 핵심 고려사항 7가지

1. **⚡ 빌드 속도의 최적화**
   - 프로젝트가 커질수록 빌드 시간이 증가하는 문제 해결

2. **🛡️ 안정적인 서비스**
   - 한 서비스의 치명적 오류가 다른 서비스에 영향을 미치지 않도록 격리

3. **📦 공통 관리**
   - 인증, 로그 등의 코어 라이브러리 체계적 관리

4. **🔀 멀티 서비스의 효율적인 프로젝트 관리**
   - 다양한 서비스를 효율적으로 관리하는 구조

5. **👥 내부/외주 개발팀 간 생산성 및 코드품질 관리**
   - 코드 리뷰와 관리 포인트 최적화

6. **🌅 프로덕트 선셋**
   - 신규 서비스의 빠른 도입과 고객 검증을 통한 빠른 선셋

7. **🔗 서비스 간 의존도 최소화**
   - 공통으로 사용하며 얻는 이점보다 서비스가 커질수록 공통의 영향도 체크 리스크가 더 크다고 판단

#### 🎯 아키텍처 설계 원칙

**내부 개발팀과 외주 개발팀의 역할 분담**:
- **내부 개발팀**: 코어 및 핵심 서비스 개발/운영
- **외주 개발팀**: 가벼운 신규 서비스 지속적 개발/운영

**핵심 설계 원칙**:
- 코어에 해당하는 패키지에서 각각의 서비스들로 의존성을 주입
- 패키지는 필히 각각의 서비스들의 configuration을 정형화하여 필요한 결과값을 서비스들에게 주입

### 🏗️ 아키텍처 구성

Turborepo를 활용한 모노레포 아키텍처를 통해 다음과 같은 구조를 설계했습니다:

<div style="text-align: center; margin: 2rem 0;">
  <img src="/images/posts/frontend-architecture-turborepo/turborepo_architecture_img.png" alt="아모레퍼시픽 프론트엔드 Turborepo 모노레포 아키텍처 구조도 - Core Packages, Services, Shared 모듈 구성" style="max-width: 100%; height: auto;" />
</div>

#### 📦 아키텍처 구조

- **Core Packages**: 인증, 로그 등 공통 기능을 제공하는 핵심 라이브러리
- **Services**: 아모레몰, 아모레스토어, 스킨노트 등 각각의 독립적인 서비스
- **Shared**: 공통 유틸리티 및 컴포넌트

#### 🏛️ 코어 라이브러리 구성

아모레퍼시픽 프론트엔드 전반에 활용 가능한 **엔터프라이즈급 코어 라이브러리 10개 이상**을 설계 및 구축했습니다:

##### 📦 도메인별 패키지 네임스페이스 전략

- **@amoremall, @amorestore 등**: 비즈니스 도메인별 패키지
- **@support**: 범용 공통 패키지

이를 통해 도메인별 특화 기능과 범용 기능을 명확히 분리하여 관리합니다.

##### 🎨 주요 코어 라이브러리

**@amoremall/ui-framework**
- Radix UI + Motion 기반 재사용 가능한 디자인 시스템
- 일관된 UI/UX 제공 및 개발 생산성 향상

**@amoremall/native-bridge**
- Android/iOS WebView 브릿지 통합 라이브러리
- 201개 단위 테스트로 안정성 확보
- 5가지 통신 패턴 표준화

**@amoremall/eslint-config, @amoremall/typescript-config**
- 아모레몰 내 공통 개발 환경 설정 패키지 표준화
- 코드 품질 일관성 및 개발자 경험 향상

##### 🔄 버전 관리 시스템

**Changesets 기반 시멘틱 버저닝**
- 안정적인 패키지 배포 및 의존성 관리 자동화
- 패키지 버전 히스토리 자동 추적
- 변경 로그 자동 생성으로 투명한 릴리즈 관리

**사내 저장소(Nexus) 통합**
- 코어 라이브러리 패키징 및 배포 파이프라인 구축
- 내부 시스템 간 코어 모듈 재사용성 극대화

**트리셰이킹 지원 ESM/CJS 듀얼 패키지**
- 번들 크기 최적화 및 범용성 확보
- 다양한 환경에서의 호환성 보장

### 💎 아키텍처를 통해 얻는 효과

<div style="text-align: center; margin: 2rem 0;">
  <img src="/images/posts/frontend-architecture-turborepo/turborepo_architecture_effect_img.png" alt="Turborepo 모노레포 아키텍처 효과 - 빌드 속도 개선, 서비스 독립성, 코어 라이브러리 관리, AI 자동화" style="max-width: 100%; height: auto;" />
</div>

#### ⚡ 1. 빠른 빌드 속도

> **핵심 가치**: Turborepo의 캐싱을 통한 빌드 속도 최적화

- 🚀 **캐싱을 통한 빠른 빌드 속도**: 변경되지 않은 부분은 재빌드하지 않음
- ⏱️ **개발 생산성 향상**: 빠른 피드백 루프로 개발 속도 개선
- 📊 **실제 성능 개선**: AMORE STORE의 경우 9.4초에서 AMORE MALL은 캐시를 활용하여 80ms로 약 117배 빨라짐

Turborepo는 Lerna와 달리 의존성을 고려한 지능적인 병렬화를 통해 전체 빌드 시간을 크게 단축시킵니다. 패키지 간 의존성을 자동으로 파악하고, 독립적인 작업은 병렬로 실행하며, 의존성이 있는 작업은 순차적으로 처리합니다.

#### 🛡️ 2. 서비스 간 독립성

> **핵심 가치**: 서비스 간 의존성 제거로 안정성 확보

- 🔒 **독립적인 서비스 운영**: 한 서비스의 오류가 다른 서비스에 영향 없음
- 🎯 **안정적인 서비스 제공**: 각 서비스의 독립적인 배포 및 운영

#### 🎨 3. 개발 자유도

> **핵심 가치**: 서비스별 최적의 기술 스택 선택 가능

- 🔧 **자유로운 언어 활용**: 각 서비스에 맞는 최적의 기술 선택
- 🎪 **서비스 내 자유도**: 서비스별 특성에 맞는 개발 방식 적용

#### 👥 4. 효율적인 협업

> **핵심 가치**: 내부/외주 개발팀 간 효율적인 협업 구조

- 📚 **빠른 학습**: 외주 개발팀이 내부 개발팀의 주요 서비스 코드를 참고하여 빠른 학습 가능
- 🔍 **코드 리뷰 최적화**: 코어는 내부 개발팀에서 관리하여 코드 품질 향상

#### 📦 5. 체계적인 코어 관리

> **핵심 가치**: 라이브러리를 통한 코어 관리

- 🔐 **인증, 로그 등 코어 라이브러리 활용**: 신규 외주 개발팀도 빠른 도입 가능
- 📊 **체계적인 로그 관리**: 통일된 로그 관리 시스템
- 🏷️ **버전 관리**: Changesets 기반 시멘틱 버저닝으로 안정적인 패키지 배포 및 의존성 관리 자동화
- 🏢 **코어 라이브러리 중앙 관리**: 내부/외주팀 코드 품질 표준화 및 일관성 확보
- 📦 **엔터프라이즈급 코어 라이브러리**: 10개 이상의 재사용 가능한 코어 라이브러리 구축

#### 🌅 6. 빠른 프로덕트 선셋

> **핵심 가치**: 신규 서비스의 빠른 개발과 선셋

- ⚡ **빠른 신규 서비스 구축**: 코어 라이브러리 활용으로 개발 시간 단축
- 🎯 **효율적인 선셋**: 외주 개발팀은 신규 서비스만 개발하면 되므로 빠른 프로덕트 선셋 가능

#### 🎯 7. 코드 품질 및 안정성

> **핵심 가치**: 주요 서비스와 코어의 안정적 운영

- ✅ **코드 품질 향상**: 주요 서비스와 코어는 내부 개발팀에서 개발/운영
- 🛡️ **안정적인 서비스**: 체계적인 관리로 안정성 확보

#### 🤖 8. AI 기반 자동화 및 Agent Skills

> **핵심 가치**: AI를 활용한 개발 프로세스 자동화 및 생산성 향상

##### 🎨 디자인 자동화

- **Figma MCP 활용**: 디자인 자동 생성으로 일관성 있는 UI/UX 구현
- **디자인-코드 간격 단축**: 디자인 시스템과 코드 간 자동 동기화

##### 📝 개발 프로세스 자동화

- **AI 기반 커밋 메시지 자동 생성**: 개발 프로세스 효율성 향상
- **AI 기반 Merge Request 자동 생성**: 코드 리뷰 프로세스 자동화
- **코드 리뷰 자동화**: AI Agent Skills를 통한 코드 품질 검증 및 개선 제안

##### 🧠 AI Agent Skills 적용

AI Agent를 활용하여 다음과 같은 스킬을 적용합니다:

- **코드 컨벤션 검증**: 아모레퍼시픽의 코드 컨벤션 자동 검증
- **자동 리팩토링 제안**: 코드 품질 개선을 위한 자동 제안
- **문서 자동 생성**: 코드 기반 API 문서 및 가이드 자동 생성
- **테스트 케이스 생성**: 비즈니스 로직 기반 테스트 케이스 자동 생성

이를 통해 개발자의 반복 작업을 최소화하고, 코드 품질과 일관성을 자동으로 유지할 수 있습니다.

### 🚀 아키텍처 고도화

앞으로의 아키텍처 고도화를 위한 계획입니다:

#### 📚 1. 문서화를 통한 관리

> **핵심 가치**: Docusaurus를 활용한 체계적인 문서화

- 📖 **Docusaurus.io 활용**: 문서화를 통해 아키텍처와 코드 관리
- 🤖 **AI 딥러닝**: 구성한 문서&코드를 AI를 통해 딥러닝시켜 아모레퍼시픽의 코드 컨벤션 구축

#### 📦 2. 버전 관리

> **핵심 가치**: 패키지 라이브러리의 체계적 버전 관리

- 🏷️ **패키지 버전 관리**: 라이브러리를 버전 관리하여 아모레퍼시픽 서비스들에 다양하게 활용
- 🔄 **체계적인 업데이트**: 버전 관리를 통한 안정적인 서비스 운영

#### 🔗 3. 자동화

> **핵심 가치**: Webhook 연계를 통한 자동화

- 🚀 **배포 자동화**: Webhook 연계를 통한 자동 배포
- 🚨 **장애 알림**: 장애 발생 시 자동 알림
- 🔀 **MR 자동화**: Merge Request 관련 자동화

### 💭 기술과 비즈니스의 균형

요즘 들어 다음 두 가지 사이에서 균형을 찾는 것이 중요하다고 생각합니다:

- **기술 기반**: 훌륭한 수준의 코드/시스템
- **비즈니스 기반**: 적당한 수준의 빠른 시스템 아웃풋

> 💭 **핵심 고민**: 저울을 어느 곳에 두어야 기술과 비즈니스를 잘 조율하고 개발자와 현업, 모두가 만족하는 시스템을 만들 수 있을까?

다각면에서 바라보고 고민하며, 최적의 균형점을 찾아가고 있습니다.

### 🎉 마무리

지금까지 프론트엔드 아키텍처를 설계하며 고민해왔던 점들을 공유해 드렸습니다.

서비스 안정성과 모니터링에 관심이 있으시다면, [DATADOG LIVE SEOUL 2024 연사 회고](/posts/datadog-live-seoul-2024) 글도 참고해보시기 바랍니다. 아모레몰의 로그 분석 도구 도입 전략과 안정화 과정을 다루고 있습니다.

#### 🚀 향후 계획

아직은 개발이 진행 중이라 시행착오의 연속이지만, 완성 이후 객관적 입증을 통해 후기 공유 드리도록 하겠습니다.

부족한 글이지만 읽어주셔서 감사드립니다. 좋은 개선점과 보완점이 있으시다면 언제든 의견 부탁드립니다.

---

> 🙏 **감사의 말씀**
> 
> 이 글을 읽으시는 분들께서도 위 글이 조금이나마 도움이 되기를 바랍니다. 감사합니다.

---

## 🔗 관련 링크

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem; margin: 1.5rem 0 1rem 0;">

<div style="background: linear-gradient(135deg, #0077b5 0%, #005885 100%); border-radius: 12px; padding: 1.25rem; color: white; box-shadow: 0 4px 12px rgba(0, 119, 181, 0.2);">
  <div style="display: flex; align-items: center; margin-bottom: 0.4rem;">
    <span style="font-size: 1.4rem; margin-right: 0.6rem;">📝</span>
    <h3 style="margin: 0; font-size: 1.05rem; font-weight: 600;">LinkedIn 원본 포스트</h3>
  </div>
  <p style="margin: 0.4rem 0; opacity: 0.9; font-size: 0.85rem;">프론트엔드 아키텍처 설계의 상세한 인사이트와 추가 정보를 확인하세요</p>
  <a href="https://www.linkedin.com/pulse/frontend-architecture-turborepo-%ED%83%9C%EC%9D%B8-%EC%A0%95-ss2kc/?trackingId=WBVI9sc0TbeGtTKRDmXhhA%3D%3D" 
     target="_blank"
     rel="noopener noreferrer"
     style="color: white; text-decoration: none; font-weight: 500; display: inline-flex; align-items: center; gap: 0.4rem; margin-top: 0.6rem;">
    포스트 보기 →
  </a>
</div>

<div style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); border-radius: 12px; padding: 1.25rem; color: white; box-shadow: 0 4px 12px rgba(239, 68, 68, 0.2);">
  <div style="display: flex; align-items: center; margin-bottom: 0.4rem;">
    <span style="font-size: 1.4rem; margin-right: 0.6rem;">⚡</span>
    <h3 style="margin: 0; font-size: 1.05rem; font-weight: 600;">Turborepo 공식 웹사이트</h3>
  </div>
  <p style="margin: 0.4rem 0; opacity: 0.9; font-size: 0.85rem;">고성능 빌드 시스템의 모든 기능을 체험해보세요</p>
  <a href="https://turbo.build/repo" 
     target="_blank"
     rel="noopener noreferrer"
     style="color: white; text-decoration: none; font-weight: 500; display: inline-flex; align-items: center; gap: 0.4rem; margin-top: 0.6rem;">
    웹사이트 방문 →
  </a>
</div>

<div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); border-radius: 12px; padding: 1.25rem; color: white; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);">
  <div style="display: flex; align-items: center; margin-bottom: 0.4rem;">
    <span style="font-size: 1.4rem; margin-right: 0.6rem;">📚</span>
    <h3 style="margin: 0; font-size: 1.05rem; font-weight: 600;">Turborepo 참고 자료</h3>
  </div>
  <p style="margin: 0.4rem 0; opacity: 0.9; font-size: 0.85rem;">Why Turborepo will be the first big trend of 2022</p>
  <a href="https://dev.to/swyx/why-turborepo-will-be-the-first-big-trend-of-2022-4gfj" 
     target="_blank"
     rel="noopener noreferrer"
     style="color: white; text-decoration: none; font-weight: 500; display: inline-flex; align-items: center; gap: 0.4rem; margin-top: 0.6rem;">
    글 보기 →
  </a>
</div>

</div>

## 🏷️ 태그

<div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin: 1rem 0 0.5rem 0;">

<span style="background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.85rem; font-weight: 500; box-shadow: 0 2px 4px rgba(59, 130, 246, 0.2);">#frontend_architecture</span>

<span style="background: linear-gradient(135deg, #8b5cf6, #7c3aed); color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.85rem; font-weight: 500; box-shadow: 0 2px 4px rgba(139, 92, 246, 0.2);">#turborepo</span>

<span style="background: linear-gradient(135deg, #ec4899, #db2777); color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.85rem; font-weight: 500; box-shadow: 0 2px 4px rgba(236, 72, 153, 0.2);">#monorepo</span>

<span style="background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.85rem; font-weight: 500; box-shadow: 0 2px 4px rgba(245, 158, 11, 0.2);">#amorepacific</span>

<span style="background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.85rem; font-weight: 500; box-shadow: 0 2px 4px rgba(16, 185, 129, 0.2);">#react</span>

<span style="background: linear-gradient(135deg, #ef4444, #dc2626); color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.85rem; font-weight: 500; box-shadow: 0 2px 4px rgba(239, 68, 68, 0.2);">#nextjs</span>

<span style="background: linear-gradient(135deg, #06b6d4, #0891b2); color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.85rem; font-weight: 500; box-shadow: 0 2px 4px rgba(6, 182, 212, 0.2);">#architecture</span>

<span style="background: linear-gradient(135deg, #84cc16, #65a30d); color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.85rem; font-weight: 500; box-shadow: 0 2px 4px rgba(132, 204, 22, 0.2);">#frontend</span>

<span style="background: linear-gradient(135deg, #000000, #1a1a1a); color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.85rem; font-weight: 500; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);">#vercel</span>

<span style="background: linear-gradient(135deg, #6366f1, #4f46e5); color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.85rem; font-weight: 500; box-shadow: 0 2px 4px rgba(99, 102, 241, 0.2);">#ax</span>

</div>
