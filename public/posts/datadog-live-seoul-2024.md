---
title: "DATADOG LIVE SEOUL 2024 연사 회고 - 아모레몰의 성장전략과 로그툴 도입"
date: "2024-09-29"
excerpt: "그랜드 인터컨티넨탈 파르나스홀에서 열린 'DATADOG LIVE Seoul 2024'에서 발표한 아모레몰의 성장전략과 로그툴 도입을 통한 고도화/안정화 과정을 공유합니다."
tags: ["Datadog", "Conference", "Amorepacific", "Logging", "Monitoring", "Growth Strategy"]
category: "Conference"
featured: true
coverImage: "/images/posts/datadog-live-seoul/datadog_live_title.png"
---

2024년 9월 27일(금) 그랜드 인터컨티넨탈 파르나스홀에서 열린 **'DATADOG LIVE Seoul 2024'**에서 아모레몰의 성장전략과 이에 따른 로그툴 도입을 통한 고도화/안정화란 주제로 발표했습니다.

### 아모레몰의 4년간의 변화

제가 아모레퍼시픽에 온지 4년이라는 시간동안 아모레몰은 다음과 같은 큰 변화를 이루었습니다:

- **외주회사 관리에서 내재화를 통한 React로의 전환**
- **아모레퍼시픽몰에서 아모레몰로의 이름 단순화**
- **대대적인 그랜드오픈을 통한 전체적인 UI/UX 개편**
- **스킨노트/뷰티피드/O2O 등의 오프라인-온라인몰을 잇는 서비스 플랫폼**

### 아모레몰 성장전략 3단계

저는 아모레퍼시픽에 오면서 가장 먼저 장기적이고 크나큰 성장전략을 세우고 일을 시작하였습니다.

<div style="text-align: center; margin: 2rem 0;">
  <img src="/images/posts/datadog-live-seoul/amoremall_growth_strategy.png" alt="아모레몰 성장전략" style="max-width: 100%; height: auto;" />
</div>

아모레퍼시픽의 디지털트랜스포메이션 대전환을 위해 다음과 같이 **내재화 → 고도화 → 안정화** 단계로 서비스를 발전시키고 성장시키고자 노력했습니다.

#### 1단계: 내재화 (Internalization)
- 외주 의존도에서 벗어나 자체 개발 역량 구축
- React 기반 모던 프론트엔드 아키텍처 도입
- 개발팀 내재화를 통한 기술적 자립성 확보

#### 2단계: 고도화 (Enhancement)
- 성능 최적화 및 사용자 경험 개선
- 다양한 서비스 플랫폼 확장 (스킨노트, 뷰티피드, O2O)
- UI/UX 전면 리뉴얼을 통한 브랜드 경쟁력 강화

#### 3단계: 안정화 (Stabilization)
- 로그 분석 도구 도입을 통한 서비스 모니터링 체계화
- 장애 예측 및 대응 시스템 구축
- 고객 경험 최적화를 위한 데이터 기반 의사결정

### 고객 경험 중심의 접근

내재화, 고도화 단계를 거쳐 이 글의 주제와도 같은 **안정화 단계**로 접어들며, 가장 먼저 고민했던 것은 **고객경험**이었습니다.

여느 고객과의 소통을 위해선, 가장 중요한 것은 **장애-서비스-고객 간의 관계**를 이해하고 분석하는 일입니다.

<div style="text-align: center; margin: 2rem 0;">
  <img src="/images/posts/datadog-live-seoul/communication_3_factors.png" alt="장애-서비스-고객 간의 관계" style="max-width: 100%; height: auto;" />
</div>

#### 장애-서비스-고객의 3요소

이러한 분석을 통해 우리가 알 수 있는 것은 우리가 컨트롤 할 수 있는 주제는 **'장애'**라는 것입니다.

즉, 장애를 예측하고 컨트롤할 수 있어야 내재화-고도화 단계에서 최종적으로 안정화 단계로의 진입이 가능하다고 판단하였습니다.

### 로그툴 도입 전략

본격적으로 고객의 행동을 수집하고 이를 분석하고 가시화하여, 객관화 할 수 있는 **로그툴을 도입**하기로 결정하였습니다.

#### 로그툴 선택 기준 7가지 요소

로그툴 도입을 위해 우리는 총 7가지의 요소를 토대로 비교/분석하였습니다:

##### 1. 트러블슈팅 및 운영요소

<div style="text-align: center; margin: 2rem 0;">
  <img src="/images/posts/datadog-live-seoul/troubleshoot_factor.png" alt="트러블슈팅 및 운영요소" style="max-width: 100%; height: auto;" />
</div>

- 장애 대응 시간 단축
- 실시간 모니터링 능력
- 알림 및 알레트 시스템

##### 2. 통합성 및 IAM

<div style="text-align: center; margin: 2rem 0;">
  <img src="/images/posts/datadog-live-seoul/integrity_factor.png" alt="통합성 및 IAM" style="max-width: 100%; height: auto;" />
</div>

- 기존 시스템과의 연동성
- 사용자 권한 관리
- SSO 연동 가능성

##### 3. 보안/시각화/모니터링

<div style="text-align: center; margin: 2rem 0;">
  <img src="/images/posts/datadog-live-seoul/security_factor.png" alt="보안/시각화/모니터링" style="max-width: 100%; height: auto;" />
</div>

- 데이터 보안 수준
- 대시보드 및 시각화 기능
- 성능 모니터링 능력

각각의 요소를 통해 로그툴이 갖추어야할 테마를 분류하였고, 이를 기준으로 **PoC를 통해 여러 로그툴을 비교/분석**하며 장단점을 파악하고 정리하였습니다.

### Datadog 선택 이유

<div style="text-align: center; margin: 2rem 0;">
  <img src="/images/posts/datadog-live-seoul/datadog_4_factor.png" alt="Datadog 선택 이유" style="max-width: 100%; height: auto;" />
</div>

결과적으로 **데이터독이 가장 아모레몰과 잘 맞는다**고 판단하여 다음과 같이 4가지의 요소를 통해 데이터독을 선택하게 되었습니다:

#### 1. 통합 모니터링 플랫폼
- 인프라, 애플리케이션, 로그를 하나의 플랫폼에서 관리
- 다양한 기술 스택과의 호환성
- 실시간 대시보드 제공

#### 2. 강력한 분석 기능
- 고급 쿼리 및 필터링 기능
- 머신러닝 기반 이상 탐지
- 커스텀 메트릭 생성

#### 3. 확장성과 안정성
- 클라우드 네이티브 아키텍처
- 높은 가용성 보장
- 글로벌 서비스 지원

#### 4. 비용 효율성
- 사용량 기반 과금 모델
- 기존 도구 대비 비용 절감
- ROI 측정 가능

### 고객 충성도와 서비스 안정성

신규 고객을 우리의 서비스에 유입시키기도 어렵지만, 이러한 신규 고객을 **충성 고객으로 전환시키고 유지시키는 것은 매우 어렵습니다**.

따라서 서비스의 안정성과 지속적인 모니터링을 통한 예방적 관리가 더욱 중요해집니다.

### 마무리

이번 DATADOG LIVE Seoul 2024에서의 발표를 통해 아모레몰의 성장 과정과 로그 분석 도구 도입 경험을 공유할 수 있어 매우 의미 있었습니다.

앞으로도 지속적인 기술 혁신과 고객 중심의 서비스 개선을 통해 더 나은 디지털 경험을 제공하겠습니다.

---

*이 글을 읽으시는 분들께서도 위 글이 조금이나마 도움이 되기를 바랍니다. 감사합니다.*

### 관련 링크

- [LinkedIn 원본 포스트](https://www.linkedin.com/pulse/datadog-live-seoul-2024-%25EC%2597%25B0%25EC%2582%25AC-%25ED%259A%258C%25EA%25B3%25A0-%25ED%2583%259C%25EC%259D%2588-%25EC%25A0%2595-ivfnc/?trackingId=6bRwDsOHSVC2KJ7xFPV7aQ%3D%3D)
- [Datadog 공식 웹사이트](https://www.datadoghq.com/)
- [아모레몰 공식 웹사이트](https://www.amoremall.com/)

### 태그

#datadog_live_seoul2024 #datadog #amorepacific #amoremall #데이터독 #아모레퍼시픽 #로그분석 #모니터링 #성장전략
