---
title: "🚀 GEO(Generative Engine Optimization) 전사 플랫폼 확대를 위한 아키텍처 및 데이터 플로우"
date: "2026-01-27"
excerpt: "GEO(Generative Engine Optimization) 전사 플랫폼 확대를 위한 아키텍처 설계로 고품질 GEO 구성을 위한 E-E-A-T, CEP 기반 BestPractice와 AI 자동화를 통한 유지보수 전략을 공유합니다."
tags: ["GEO", "Generative Engine Optimization", "SEO", "AI", "Architecture", "Amorepacific", "Schema.org", "E-E-A-T", "CEP"]
category: "Architecture"
featured: true
coverImage: "/images/posts/geo-platform-architecture/geo_background_top.png"
---

### 📅 글 개요

GEO(Generative Engine Optimization, 이하 GEO)가 마케팅의 새로운 화두로 대두되고 있는 요즘, 여느 서비스에도 누구나 할거 없이 빠르게 도입하고자 노력하고 있습니다. 다만 필자는 SEO가 GEO로 즉각 대체되기 보다는 **SEO & GEO로 확대 되다가 AI 서비스의 자연스러운 성장에 따라 GEO로 완전히 전환될 것**이라고 바라보고 있습니다.

하지만 GEO를 구성하기 위한 결과물의 대부분이 단순 상품정보의 API를 가져와 schema로 조합하는 일차원적인 방식에 그치는 것이 아쉬웠습니다.

이러한 배경에서 **고품질의 GEO를 구성하고 AI를 활용해 자동화하는 방식**은 전사 플랫폼 확대를 위한 핵심 전략이 됩니다. 특히 **E-E-A-T(Experience, Expertise, Authoritativeness, Trustworthiness)와 CEP(Creator Economy Platform)** 원칙을 기반으로 한 BestPractice 구성과 **Schema.org 구조화 데이터**를 활용한 기술적 접근이 중요합니다.

> 💡 **이 글에서 다룰 내용**
> - 고품질 GEO vs 저품질 GEO 도입 전략
> - GEO 구성을 위한 핵심 요구사항
> - 전사 플랫폼 확대를 위한 아키텍처 설계
> - BestPractice 기반 GEO 구성 방법
> - AI를 활용한 자동화 및 유지보수 전략

사내 스터디(액션랩) 및 프로젝트를 진행하며, 제가 느꼈던 **고품질의 GEO를 구성하고, 이를 AI를 활용해 자동화하는 방식**에 대해 공유해보고자 합니다. (상품 페이지를 주 타겟으로 설명드리도록 하겠습니다.)

### 🎯 도입 전략

도입을 위해선 먼저 도입의 목적에 따라 **고품질의 GEO를 선택할지, 저품질의 GEO를 선택할지** 고민해야 합니다.

#### 📊 저품질 GEO vs 고품질 GEO

**저품질의 GEO를 선택하는 목적**:
- 어느 키워드에서도 빠르게 우리의 서비스 페이지를 알리고, 고객이 유입될 수 있게 하는 목적
- 초기 유입으로서의 가치는 존재하나, 추후 GEO의 품질 저하로 인한 점수하락으로 이어져 **유지보수성까지는 어려울 것**이라 전망

**고품질의 GEO를 선택하는 목적**:
- 페이지별로 같은 구성이 없으며, 페이지 컨텐츠의 내용에 기반하여 구성되는 형태
- 저품질의 같은 GEO 컨텐츠에 비해선 검색 시, 유입이 제각각으로 다를 수 있으나
- 품질에 근거하여 유지보수성을 고려하였을 때 **유입이 단계적으로 확대될 수 있다**

#### 🎯 핵심 전략

저희는 오늘 따라서 **고품질의 GEO**를 다루어 보고자 합니다. 고품질의 GEO를 전사 플랫폼으로 확대하기 위해선:

- **E-E-A-T, CEP 등에 근거**하되
- **쉬운 유지보수성을 위해 AI를 적극 활용**
- MD 등의 사용자가 컨텐츠를 수기로 계속 작성하는 형태는 막아야 합니다

> 💡 **핵심**: BestPractice로 구성한 GEO 컨텐츠와 AI 프롬프트를 **버저닝을 위한 기술자산으로 구성하여 유지보수**하는 방식을 논의합니다.

### 📋 요구사항

고품질의 GEO를 구성하기 위해선 제일 먼저 다음과 같은 요구사항이 필요합니다:

#### 1. 마케팅 기법 이해
- **E-E-A-T, CEP** 등의 GEO 컨텐츠 구성을 위한 마케팅 기법의 이해

#### 2. 기술적 이해
- **Schema.org, SEO(Search Engine Optimization)** 등의 기술적 이해

#### 3. 데이터 정보
- 페이지 성격에 따른 **상품/이벤트/FAQ** 등의 데이터 정보

#### 4. BestPractice GEO 구성 ⭐️⭐️⭐️⭐️⭐️
- 해당 3가지를 통해 고품질로 구성한 **BestPractice GEO 구성(정답군)**

#### 5. AI 프롬프트 구성 ⭐️⭐️⭐️⭐️⭐️
- 해당 구성을 통해 새로운 상품/이벤트/FAQ 정보가 올때마다 GEO 결과로 구성해주는 **프롬프트(Agent Skills 등)**

### 🏗️ 아키텍처 설명

<div style="text-align: center; margin: 2rem 0;">
  <img src="/images/posts/geo-platform-architecture/geo_architecture.jpeg" alt="GEO(Generative Engine Optimization) 전사 플랫폼 아키텍처 - BO에서 AI 에이전트를 통한 GEO 생성 API, 프론트엔드에서 조회 API를 통한 Header 태그 및 Schema.org 구조화 데이터 활용" style="max-width: 100%; height: auto;" />
</div>

전사 상품 페이지에 자동화를 하려면 **BO에서 GEO를 생성하는 API(AI 에이전트를 통해 GEO 컨텐츠를 구성)를 호출**하고, **프론트 화면에서는 생성한 GEO 결과물을 조회하는 API를 통해 Header 태그 및 컨텐츠에 활용**하는 것이 성능적으로도 적절합니다.

#### 📊 데이터 플로우

<div style="text-align: center; margin: 2rem 0;">
  <img src="/images/posts/geo-platform-architecture/geo_data_flow.png" alt="GEO 전사 플랫폼 확대를 위한 데이터 플로우 다이어그램 - 캐싱 확인, 상품정보 및 고객리뷰 조회, E-E-A-T/CEP 기반 BestPractice 구성, AI 에이전트 실행, Header 태그 배치, 유지보수" style="max-width: 100%; height: auto;" />
</div>

따라서 이를 위해선 해당 상품의 GEO를 구성하는 **GEO API를 다음과 같이 구성하고 호출**해야 합니다:

#### 🔄 7단계 데이터 플로우

1. **캐싱 확인**: 기존에 해당 상품의 GEO 정보가 있는지 확인하고(캐싱) 없으면,

2. **데이터 조회**: 해당 상품의 **상품정보 및 고객리뷰 정보**를 조회합니다.

3. **BestPractice 구성**: 사전에 구성한 BestPractice 정보를 가져오고, **E-E-A-T와 CEP의 Document 문서들, Schema.org 및 SEO 등의 기술 Document 문서**를 참조시켜 프롬프트로 구성하고

4. **AI 에이전트 실행**: 이를 해당 상품의 GEO로 도출해낼 수 있도록 **AI 에이전트를 실행**시킵니다. 이렇게 나온 GEO 구성을

5. **화면 배치**: 화면 레벨에서 조회하여 **Header 태그등에 적절히 배치**시키고

6. **컨텐츠 기획**: 이후 **상품 기술서의 컨텐츠를 GEO에 근거하여 기획/적용**하도록 합니다.

7. **유지보수**: 추후 유지보수를 위해선 **프롬프트와 BestPractice를 기술자산화하여 버저닝을 통해 품질을 업그레이드하고 유지보수**하면 됩니다.

### 💎 BestPractice 구성 방법

GEO의 BestPractice를 구성하기 위해선 **객관화된 정보를 활용하여 구성하는 것이 고품질을 위해 필수적**입니다.

#### 🎯 구성 전략

저희는 다음과 같은 방식으로 BestPractice를 구성하였습니다:

- **고객 리뷰 데이터 키워드 분석**: 상품 내 고객의 리뷰 데이터 키워드를 토대로 하여
- **상품정보와 조합**: 이를 상품정보와 조합하고
- **브랜드 특성 반영**: 여기에 브랜드(설화수, 라보에이치 등)의 표현하고 싶은 특성을 더하여
- **고품질 GEO 컨텐츠 구성**: 고품질의 GEO 컨텐츠를 구성하였습니다

#### 🔄 확대 및 유지보수

이후 AI로 자동화하기 위해:
- **정답군이 되는 BestPractice**가 되기도 하며
- **타 브랜드로 확대시** 해당 BestPractice를 해당 브랜드의 고객리뷰 및 특성에 맞게 변경+보완하여 유지보수성을 확보하였습니다

<div style="text-align: center; margin: 2rem 0;">
  <img src="/images/posts/geo-platform-architecture/geo_result_example.png" alt="아모레몰에 적용한 GEO(Generative Engine Optimization) 컨텐츠 검색 결과 예시 - 고품질 GEO 구성을 통한 AI 검색 엔진 인용 및 유입 최적화" style="max-width: 100%; height: auto;" />
</div>

### ✨ 이점

이러한 구성을 통해 얻을 수 있는 가장 큰 이점은 다음과 같습니다:

#### 🎯 1. 고품질 GEO 컨텐츠

> **핵심 가치**: 단순 상품정보가 아닌 고객리뷰 기반 BestPractice

- **고객리뷰 및 GEO 컨텐츠에 근거**해 생성한 BestPractice 모델을 바탕으로 GEO를 구성
- **높은 품질의 GEO 컨텐츠**를 구성할 수 있습니다

#### 🔄 2. 유지보수성 확보

> **핵심 가치**: 도입뿐만 아니라 유지보수로 확대 가능

- 고품질의 GEO 컨텐츠를 **도입뿐만 아니라 유지보수로 확대**가 가능
- **BestPractice와 프롬프트를 기술자산화하여 버저닝**을 통해 품질 업그레이드

#### 💰 3. 비용 효율성

> **핵심 가치**: 유지비용 현저히 감소

- 매번 AI 에이전트를 통해 실행하는 방식이 아닌
- **상품 초기 구성을 위해 실행**하고
- **이후 내용 보완을 위해서만 AI 에이전트를 실행**하기 때문에
- **유지비용도 현저히 낮아집니다**

### 🎉 마무리

GEO를 구성하기 위해 공부 및 프로젝트를 진행하면서, GEO에는 정답은 없으나 **Bot이 긁어가는 원리와 이해관계를 고려하며 역으로 구성하는 재미**가 있었습니다.

그리고 이를 통해 **서비스 페이지의 컨텐츠 구성이 GEO를 타겟팅한다면 어떻게 변화해야할지도 예측해볼 수 있는 유익한 시간**이었습니다.

프론트엔드 아키텍처 설계에 관심이 있으시다면, [Turborepo를 활용한 모노레포 구축](/posts/frontend-architecture-turborepo) 글도 참고해보시기 바랍니다. 전사 플랫폼 확대를 위한 아키텍처 설계 관점에서 유용한 인사이트를 제공합니다.

#### 💭 향후 전망

GEO에는 아직 정확한 정답은 없기에 연구와 프로젝트를 근간으로 우연히 맞은 결과물일 수도 있으나, 이를 참고하시어 좋은 도움이 되셨으면 좋겠습니다.

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
  <p style="margin: 0.4rem 0; opacity: 0.9; font-size: 0.85rem;">GEO 전사 플랫폼 확대의 상세한 인사이트와 추가 정보를 확인하세요</p>
  <a href="https://www.linkedin.com/pulse/geogenerative-engine-optimization-%25EC%25A0%2584%25EC%2582%25AC-%25ED%2594%258C%25EB%259E%25AB%25ED%258F%25BC-%25ED%2599%2595%25EB%258C%2580%25EB%25A5%25BC-%25EC%259C%2584%25ED%2595%259C-%25EC%2595%2584%25ED%2582%25A4%25ED%2585%258D%25EC%25B3%2590-%25EB%25B0%258F-%25ED%2583%259C%25EC%259D%2588-%25EC%25A0%2595-l7hmc/?trackingId=n8Qn0GIkTdur1ugbtdeFug%3D%3D" 
     target="_blank"
     rel="noopener noreferrer"
     style="color: white; text-decoration: none; font-weight: 500; display: inline-flex; align-items: center; gap: 0.4rem; margin-top: 0.6rem;">
    포스트 보기 →
  </a>
</div>

<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 12px; padding: 1.25rem; color: white; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);">
  <div style="display: flex; align-items: center; margin-bottom: 0.4rem;">
    <span style="font-size: 1.4rem; margin-right: 0.6rem;">🔍</span>
    <h3 style="margin: 0; font-size: 1.05rem; font-weight: 600;">Schema.org 공식 문서</h3>
  </div>
  <p style="margin: 0.4rem 0; opacity: 0.9; font-size: 0.85rem;">구조화된 데이터 마크업의 모든 기능을 확인하세요</p>
  <a href="https://schema.org/" 
     target="_blank"
     rel="noopener noreferrer"
     style="color: white; text-decoration: none; font-weight: 500; display: inline-flex; align-items: center; gap: 0.4rem; margin-top: 0.6rem;">
    웹사이트 방문 →
  </a>
</div>

<div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); border-radius: 12px; padding: 1.25rem; color: white; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);">
  <div style="display: flex; align-items: center; margin-bottom: 0.4rem;">
    <span style="font-size: 1.4rem; margin-right: 0.6rem;">🤖</span>
    <h3 style="margin: 0; font-size: 1.05rem; font-weight: 600;">Agent Skills</h3>
  </div>
  <p style="margin: 0.4rem 0; opacity: 0.9; font-size: 0.85rem;">AI 에이전트를 위한 스킬 구성 방법을 확인하세요</p>
  <a href="https://agentskills.io/home" 
     target="_blank"
     rel="noopener noreferrer"
     style="color: white; text-decoration: none; font-weight: 500; display: inline-flex; align-items: center; gap: 0.4rem; margin-top: 0.6rem;">
    웹사이트 방문 →
  </a>
</div>

</div>

## 🏷️ 태그

<div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin: 1rem 0 0.5rem 0;">

<span style="background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.85rem; font-weight: 500; box-shadow: 0 2px 4px rgba(59, 130, 246, 0.2);">#geo</span>

<span style="background: linear-gradient(135deg, #8b5cf6, #7c3aed); color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.85rem; font-weight: 500; box-shadow: 0 2px 4px rgba(139, 92, 246, 0.2);">#generative_engine_optimization</span>

<span style="background: linear-gradient(135deg, #ec4899, #db2777); color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.85rem; font-weight: 500; box-shadow: 0 2px 4px rgba(236, 72, 153, 0.2);">#seo</span>

<span style="background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.85rem; font-weight: 500; box-shadow: 0 2px 4px rgba(245, 158, 11, 0.2);">#ai</span>

<span style="background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.85rem; font-weight: 500; box-shadow: 0 2px 4px rgba(16, 185, 129, 0.2);">#architecture</span>

<span style="background: linear-gradient(135deg, #ef4444, #dc2626); color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.85rem; font-weight: 500; box-shadow: 0 2px 4px rgba(239, 68, 68, 0.2);">#amorepacific</span>

<span style="background: linear-gradient(135deg, #06b6d4, #0891b2); color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.85rem; font-weight: 500; box-shadow: 0 2px 4px rgba(6, 182, 212, 0.2);">#schema_org</span>

<span style="background: linear-gradient(135deg, #84cc16, #65a30d); color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.85rem; font-weight: 500; box-shadow: 0 2px 4px rgba(132, 204, 22, 0.2);">#e_e_a_t</span>

<span style="background: linear-gradient(135deg, #f97316, #ea580c); color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.85rem; font-weight: 500; box-shadow: 0 2px 4px rgba(249, 115, 22, 0.2);">#cep</span>

</div>
