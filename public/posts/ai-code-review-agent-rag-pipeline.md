---
title: "🤖 RAG 기반 AI 코드리뷰 에이전트 — 설계부터 자동화까지"
date: "2026-02-27"
excerpt: "Qdrant Hybrid Search + Cohere Rerank + GPT-5 기반 RAG 파이프라인으로 MR 변경사항에 프로젝트 컨텍스트를 결합한 AI 코드리뷰 에이전트를 설계·구축하고, n8n으로 GitLab MR 자동 리뷰까지 구현한 과정을 다룹니다."
tags: ["AI Agent", "RAG", "Code Review", "Qdrant", "Cohere Rerank", "GPT-5", "n8n", "GitLab", "TypeScript", "Vector Search"]
category: "Architecture"
featured: true
coverImage: "/images/posts/ai-code-review-agent/cover.png"
---

### 📅 글 개요

코드 리뷰는 소프트웨어 품질의 마지막 관문입니다. 하지만 현실에서는 몇 가지 구조적인 한계가 존재합니다.

> "이 컴포넌트에서 `useCallback` 빠졌어요", "z-index 토큰 규칙 확인해주세요", "접근성 속성 추가해주세요"

같은 피드백이 **매 MR마다 반복**됩니다. 리뷰어는 피로해지고, 리뷰이는 같은 실수를 되풀이합니다. 프로젝트 코딩 규칙 문서는 분명히 존재하지만, MR을 올릴 때마다 해당 문서를 일일이 대조하는 것은 현실적으로 어렵습니다.

반복 피드백 외에도 더 근본적인 문제가 있습니다. **리뷰어도 사람입니다.** 업무가 몰리거나 일정이 촉박한 상황에서는 아무리 숙련된 리뷰어라 하더라도 놓치는 부분이 생기기 마련이며, 이러한 누락은 곧 **장애 발생 확률의 증가**로 이어질 수 있습니다.

AI 코드리뷰 에이전트는 이 문제를 다음과 같이 해결합니다:

- **리뷰 품질의 균일화** — 사람의 컨디션이나 업무 상황에 관계없이, 프로젝트 규칙 기반의 **일관된 수준의 리뷰**를 항상 제공합니다
- **사각지대 사전 발견** — 리뷰어가 미처 보지 못한 접근성 누락, 메모리 릭 패턴, 보안 취약점 같은 **뜻밖의 이슈를 사전에 감지**합니다
- **저연차 개발자의 성장 지원** — 단순히 "틀렸다"가 아니라, 프로젝트 규칙 문서를 근거로 "왜 이렇게 해야 하는지"까지 설명함으로써 **코드리뷰의 방향성을 제시**합니다

**그래서 이 에이전트를 만들었습니다.** 프로젝트의 코딩 규칙과 가이드 문서를 AI가 학습하고, MR이 올라오면 **변경된 코드에 가장 적합한 컨텍스트를 검색하여** 자동으로 리뷰를 수행하는 시스템입니다.

이 글에서는 해당 에이전트를 **설계하고, 구현하고, 자동화한 전체 과정**을 공유하겠습니다.

> 💡 **이 글에서 다룰 내용**
> - 전체 아키텍처 및 데이터 흐름
> - 실제 MR 리뷰 결과를 단계별로 따라가보기
> - RAG 파이프라인 심층 분석: 적응형 청킹 → Hybrid Search → RRF → Cohere Rerank
> - 프롬프트 엔지니어링: 페르소나 설계와 구조화된 출력
> - n8n 기반 자동화 워크플로우 구축
> - 직접 구현할 때 알아야 할 핵심 포인트

---

### 🏗️ 전체 아키텍처

먼저 아키텍처 및 데이터 흐름부터 살펴보겠습니다. MR이 올라오면 리뷰 코멘트가 작성되기까지, 크게 **변경사항 수집 → RAG 검색 → AI 리뷰 생성** 세 단계를 거칩니다.

<div style="text-align: center; margin: 2rem 0;">
  <img src="/images/posts/ai-code-review-agent/architecture.png" alt="RAG 기반 AI 코드리뷰 에이전트 전체 아키텍처 - GitLab MR에서 Diff 파싱, RAG 검색, AI 리뷰 생성까지의 데이터 흐름" style="max-width: 100%; height: auto;" />
</div>

#### 변경사항 수집

| 모듈 | 역할 | 처리 결과 |
|------|------|----------|
| **GitLab MR** | MR 정보(제목, 브랜치, 설명)와 파일별 Diff를 REST API로 수집 | MR 메타데이터 + 파일별 Diff |
| **Diff Parser** | Diff를 파싱하고, 변경 라인 ±50줄의 주변 코드까지 수집 | 구조화된 Diff + 주변 코드 컨텍스트 |
| **Keyword Extractor** | import문, React 훅, API명 등 검색에 활용할 키워드를 추출 | 검색 쿼리 목록 |

#### RAG 검색

| 모듈 | 역할 | 처리 결과 |
|------|------|----------|
| **Qdrant Hybrid Search** | Dense(의미 검색) + Sparse(키워드 검색)를 동시에 수행 | 후보 문서 20개 |
| **RRF Fusion** | 두 검색 결과를 순위 기반으로 병합 | 순위 통합된 20개 문서 |
| **Cohere Rerank** | 전용 리랭킹 모델로 관련성을 재평가하여 상위 5개 선별 | 최종 RAG 문서 5개 |

#### AI 리뷰 생성

| 모듈 | 역할 | 처리 결과 |
|------|------|----------|
| **Prompt Builder** | 프로젝트 규칙 + RAG 문서 + Diff + 주변 코드를 프롬프트로 조립 | System + User 프롬프트 |
| **GPT-5** | JSON Mode로 구조화된 리뷰를 생성하고 Zod 스키마로 검증 | severity × category 기반 리뷰 JSON |
| **GitLab Comments** | 리뷰 결과를 MR에 요약 코멘트 + 인라인 코멘트로 자동 작성 | 리뷰 코멘트 게시 완료 |

> 🏢 **비개발자를 위한 비유 — "AI 원고 교정 시스템"**
>
> 출판사에서 원고가 들어오면, 교정팀이 (1) 원고의 변경 부분을 파악하고, (2) 사내 교정 지침서에서 관련 규칙을 찾아오고, (3) 규칙과 원고를 함께 보면서 교정 코멘트를 달아주는 것과 같습니다.
>
> AI 코드리뷰 에이전트도 동일합니다. **원고 = 코드 변경사항**, **교정 지침서 = 프로젝트 규칙 문서**, **교정 코멘트 = 리뷰 코멘트**입니다.

---

### 🔍 실제 MR 리뷰 따라가보기

설명보다 직접 확인하는 것이 이해가 빠릅니다. 실제 MR에 AI가 남긴 리뷰를 단계별로 따라가 보겠습니다.

#### 전체 요약 리뷰

MR이 올라오면, 에이전트가 먼저 **전체 변경사항을 분석한 요약 코멘트**를 남깁니다.

<div style="text-align: center; margin: 2rem 0;">
  <img src="/images/posts/ai-code-review-agent/review-summary.png" alt="AI 코드리뷰 에이전트 요약 리뷰 - Risk Level MEDIUM, 긍정 피드백과 개선 포인트, RAG 참조 문서 5개 포함" style="max-width: 100%; height: auto;" />
</div>

눈여겨볼 점이 몇 가지 있습니다:

- **Risk Level: 🟡 MEDIUM** — 변경사항의 위험도를 3단계(LOW/MEDIUM/HIGH)로 자동 평가합니다
- **긍정적 피드백 먼저** — "CSF3로 깔끔하게 정리하신 점 너무 좋습니다! 🎉" 처럼 잘한 점을 먼저 짚어줍니다
- **개선 포인트** — 구체적인 개선 제안을 리스트로 정리합니다
- **📚 참조 문서 (5개)** — RAG로 검색한 프로젝트 문서를 근거로 제시합니다. "왜 이렇게 해야 하는지"의 출처가 명확합니다

#### 인라인 코멘트

요약뿐 아니라, **코드의 특정 줄에 직접 코멘트**도 달립니다.

<div style="text-align: center; margin: 2rem 0;">
  <img src="/images/posts/ai-code-review-agent/review-inline.png" alt="AI 코드리뷰 에이전트 인라인 코멘트 - aria-haspopup 용도 확인, z-index 토큰 정책 확인 등 코드 줄 단위 피드백" style="max-width: 100%; height: auto;" />
</div>

인라인 코멘트에는 **심각도 라벨**이 붙습니다:

| 심각도 | 라벨 | 의미 |
|--------|------|------|
| 🚨 critical | 꼭 수정이 필요해요 | 버그, 보안 이슈 등 반드시 수정 |
| ⚠️ warning | 수정을 권장드려요 | 성능, 접근성 등 강력 권장 |
| 🔍 check | 한번 확인해봐주세요 | 의도 확인이 필요한 부분 |
| 💡 suggestion | 이런 방법도 있어요 | 더 나은 대안 제시 |
| ✏️ nitpick | 참고만 해주세요 | 사소한 스타일 개선 |

예를 들어 위 이미지에서 `aria-haspopup="dialog"` 변경에 대해, 에이전트가 "실제로 dialog 역할을 하는지 확인"을 제안하고, `z-index: 1020` 추가에 대해 "전체 레이어링 정책과 일치하는지" 확인을 요청하는 것을 볼 수 있습니다.

---

### 📚 RAG 파이프라인 심층 분석

이번에는 핵심인 RAG 파이프라인을 자세히 살펴보겠습니다. "프로젝트 규칙 문서에서 관련 내용을 찾아온다"는 것이 구체적으로 어떻게 동작하는지 단계별로 설명드리겠습니다.

#### 1. 적응형 청킹 — 문서를 똑똑하게 나누기

프로젝트의 CLAUDE.md, SKILL.md 같은 규칙 문서를 벡터 DB에 넣으려면 먼저 적절한 크기로 **나눠야(chunking)** 합니다. 핵심은 **문서 유형에 따라 나누는 전략이 다르다**는 점입니다.

```typescript
function detectDocType(source: string): 'markdown' | 'code' | 'html' | 'text' {
  if (source.endsWith('.md')) return 'markdown';
  if (source.endsWith('.ts') || source.endsWith('.tsx')) return 'code';
  if (source.endsWith('.html')) return 'html';
  return 'text';
}
```

| 문서 유형 | 분할 전략 | 왜? |
|----------|----------|-----|
| **Markdown** | 헤딩(#, ##, ###) 기준 | 하나의 섹션 = 하나의 개념 단위 |
| **Code** | `export`, `function`, `class` 단위 | 하나의 함수 = 하나의 검색 단위 |
| **HTML** | 구조 태그 기준 | DOM 구조를 존중 |
| **기타** | 크기 기반 (코드 블록 보존) | 안전한 폴백 |

여기서 중요한 규칙이 있습니다: **코드 블록 안에서는 절대 자르지 않습니다.**

```typescript
let inCodeBlock = false;
for (const line of lines) {
  if (line.startsWith('```')) {
    inCodeBlock = !inCodeBlock;
  }
  if (currentTokens > targetSize && !inCodeBlock) {
    // 여기서만 자름 — 코드 블록 밖에서만!
    chunks.push(current.join('\n'));
  }
}
```

Markdown 문서 안에 코드 예시가 포함되어 있을 때, 코드 블록이 중간에 잘리면 검색 결과가 의미 없어지기 때문입니다.

#### 2. Hybrid Search — 놓치지 않는 검색

청킹된 문서가 Qdrant에 저장되면, MR이 올라올 때 **변경사항과 관련된 문서를 검색**합니다. 이때 검색을 **두 가지 방식으로 동시에** 수행하는 것이 핵심입니다.

> 📚 **"두 명의 사서" 비유**
>
> 도서관에서 "useCallback 메모이제이션" 관련 자료를 찾는다고 가정해 보겠습니다.
>
> **사서 A (Dense Search)** — **의미로 검색**합니다. "함수를 캐싱해서 불필요한 재생성을 방지하는 패턴"이라는 의미를 이해하고, 비슷한 개념의 문서를 찾아옵니다. "useCallback"이란 단어가 없어도 "메모이제이션 패턴" 문서를 찾을 수 있습니다.
>
> **사서 B (Sparse Search)** — **단어로 검색**합니다. "useCallback"이라는 정확한 글자가 들어간 문서를 찾습니다. 고유 함수명이나 API명을 정확히 매칭합니다.
>
> **Hybrid Search** — 두 사서의 결과를 합칩니다. **의미도 맞고, 정확한 키워드도 포함된** 문서가 가장 높은 점수를 받습니다.

실제 코드에서는 Qdrant의 `prefetch` + `fusion: 'rrf'`를 사용하여 구현하였습니다:

```typescript
const results = await qdrant.client.query(collection, {
  prefetch: [
    { query: queryVector, using: 'dense', limit: 20 },
    { query: { indices: sparseIndices, values: sparseValues }, using: 'sparse', limit: 20 },
  ],
  query: { fusion: 'rrf' },
  limit: 20,
  with_payload: true,
});
```

#### 3. RRF 퓨전 — 순위로 합치기

Dense 검색과 Sparse 검색은 **점수 체계가 서로 다릅니다.** Dense는 0~1 사이의 코사인 유사도, Sparse는 TF-IDF 점수를 사용합니다. 단순히 점수를 합산하면 불공정한 결과가 나옵니다.

**RRF(Reciprocal Rank Fusion)** 는 점수 대신 **순위만 보고** 합칩니다:

> 🗳️ **"순위 투표" 비유**
>
> 두 명의 심사위원이 각각 "추천 문서 Top 10"을 줬습니다.
> - A 심사위원: 1위 문서X, 2위 문서Y, 3위 문서Z...
> - B 심사위원: 1위 문서Z, 2위 문서X, 3위 문서W...
>
> RRF는 **양쪽에서 모두 높은 순위를 받은** 문서를 최종 상위로 올립니다. 문서X는 A에서 1위 + B에서 2위이니 최종 1위가 됩니다.

Qdrant가 RRF를 내장 지원하기 때문에, 별도의 병합 코드 없이 `fusion: 'rrf'` 한 줄로 구현할 수 있습니다.

#### 4. Cohere Rerank — 최종 면접관

RRF로 20개의 후보를 선정했지만, 실제로 프롬프트에 포함할 문서는 **5개**입니다. 여기서 **Cohere Rerank** 전용 모델이 각 문서를 직접 읽고 관련성 점수를 매깁니다.

```typescript
async function rerankWithCohere(documents, diffSummary, finalTopK) {
  const docTexts = documents.map(
    doc => `[${doc.source}] ${doc.heading}\n${doc.content}`
  );
  const results = await cohereClient.rerank(
    diffSummary.slice(0, 4000),  // 쿼리: Diff 요약
    docTexts,                     // 후보 문서 전체
    finalTopK,                    // 상위 5개만
  );
  return results.map(r => documents[r.index]);
}
```

만약 Cohere API가 실패하면 어떻게 될까요? **LLM Rerank로 자동 폴백**됩니다:

```typescript
try {
  return await rerankWithCohere(documents, diffSummary, finalTopK);
} catch (error) {
  logger.warn('Cohere Rerank 실패, LLM Rerank로 폴백');
  return await rerankWithLLM(chatClient, documents, diffSummary, finalTopK);
}
```

LLM Rerank은 GPT-5에게 "이 문서들 중 Diff와 가장 관련 높은 5개를 선별해 주세요"라고 요청하는 방식입니다. Cohere 대비 속도와 비용 면에서 불리하지만, **서비스가 중단되지 않는 것**이 가장 중요합니다.

---

### 🎯 프롬프트 엔지니어링

RAG로 찾아온 문서와 Diff를 **어떻게 프롬프트로 조립하느냐**에 따라 리뷰 품질이 결정됩니다.

#### 시스템 프롬프트 — "따뜻한 시니어 개발자"

```
당신은 팀원의 성장을 진심으로 응원하는 따뜻하고 실력 있는 시니어 개발자입니다.
```

이 한 줄의 페르소나 설정이 리뷰 톤을 완전히 바꿔줍니다. "이거 틀렸어요"가 아닌 "이런 방법도 있어요 😊" 같은 건설적인 피드백이 생성됩니다.

시스템 프롬프트는 다음 세 파트로 구성됩니다:

| 파트 | 내용 | 역할 |
|------|------|------|
| **페르소나** | 따뜻한 시니어 개발자 | 리뷰 톤 결정 |
| **프로젝트 규칙** | CLAUDE.md, SKILL.md 등 | 프로젝트 고유 기준 |
| **RAG 문서** | Hybrid Search + Rerank 결과 (상위 5개) | 변경사항 관련 컨텍스트 |

#### JSON Mode + Zod 검증 — 구조화된 출력

AI의 응답을 파싱 가능한 형태로 강제하기 위해 **JSON Mode**를 사용합니다:

```typescript
const response = await chatClient.chatCompletion({
  messages,
  response_format: { type: 'json_object' },
});
```

응답은 Zod 스키마로 즉시 검증됩니다:

```typescript
const aiResponseSchema = z.object({
  summary: z.string(),
  riskLevel: z.enum(['low', 'medium', 'high']),
  comments: z.array(z.object({
    filePath: z.string().optional(),
    line: z.number().int().positive().optional(),
    title: z.string(),
    body: z.string(),
    severity: z.enum(['critical', 'warning', 'check', 'suggestion', 'nitpick']),
    category: z.string(),
    suggestion: z.string().optional(),
  })),
});

const parsed = aiResponseSchema.safeParse(JSON.parse(response.content));
```

검증을 통과한 코멘트는 **심각도 순으로 정렬**되어 가장 중요한 이슈부터 보여줍니다. 최대 15개까지 제한하여 리뷰가 부담스럽지 않게 합니다.

#### Diff ±50줄 — 맥락을 이해시키기

AI가 변경된 코드만 보면 맥락을 놓치게 됩니다. 그래서 **변경 라인 기준 위아래 50줄**의 주변 코드를 함께 수집합니다:

```typescript
const CONTEXT_LINES = 50;
const minLine = Math.max(1, Math.min(...changedLineNumbers) - CONTEXT_LINES);
const maxLine = Math.min(lines.length, Math.max(...changedLineNumbers) + CONTEXT_LINES);

const surroundingCode = lines
  .slice(minLine - 1, maxLine)
  .map((line, i) => `${minLine + i}| ${line}`)
  .join('\n');
```

라인 번호를 함께 포함하기 때문에, AI가 "78번 줄에서..." 라고 정확한 위치를 지목하는 인라인 코멘트를 작성할 수 있습니다.

---

### ⚡ n8n 자동화 워크플로우

에이전트의 성능이 아무리 좋아도, MR마다 수동으로 실행해야 한다면 실용성이 떨어집니다. **n8n**을 활용하여 완전 자동화하였습니다.

<div style="text-align: center; margin: 2rem 0;">
  <img src="/images/posts/ai-code-review-agent/n8n-workflow.png" alt="n8n 워크플로우 - GitLab Webhook에서 Event Filter, AI Code Review, Respond까지의 자동화 흐름" style="max-width: 100%; height: auto;" />
</div>

#### 동작 흐름

**① GitLab Webhook** — MR이 생성/업데이트되면 GitLab이 n8n 웹훅(`POST /webhook/gitlab-mr-review`)으로 이벤트를 전송합니다.

**② Event Filter** — 불필요한 실행을 걸러냅니다:

```javascript
// Draft MR은 건너뛰기
if (attrs.work_in_progress || attrs.draft) return skip;

// 봇이 만든 MR은 건너뛰기 (무한 루프 방지)
if (String(attrs.author_id) === botUserId) return skip;

// opened, update, reopen 이벤트만 처리
if (!['open', 'update', 'reopen'].includes(attrs.action)) return skip;
```

필터를 통과하면 **두 갈래로 병렬 실행**됩니다:

**③-A Teams 알림 (상단 분기)** — MR 정보(title, author, branch, labels)를 Adaptive Card JSON으로 가공하여 Teams Webhook으로 전송합니다. 리뷰어에게 "MR 리뷰 요청" 알림이 즉시 도착합니다.

**③-B AI Code Review (하단 분기)** — `@support/code-review-agent` 패키지를 직접 호출합니다. 내부에서 Azure OpenAI(GPT-5), Qdrant(Hybrid Search), Cohere(Rerank v4.0) 세 가지 외부 서비스와 통신하며 RAG 파이프라인을 실행합니다. 리뷰 결과는 GitLab API로 MR에 요약 + 인라인 코멘트를 작성합니다.

**④ Respond** — 양쪽 분기가 완료되면 웹훅에 200 OK를 반환합니다.

#### Docker Compose 구성

n8n, Qdrant, 에이전트를 함께 실행하는 Docker Compose 설정은 다음과 같습니다:

```yaml
services:
  n8n:
    build:
      context: .
      dockerfile: Dockerfile  # @support/code-review-agent 포함 커스텀 빌드
    environment:
      - NODE_FUNCTION_ALLOW_EXTERNAL=@support/code-review-agent
      - GITLAB_TOKEN=${GITLAB_TOKEN}
      - AZURE_OPENAI_API_KEY=${AZURE_OPENAI_API_KEY}
    ports:
      - "5678:5678"

  qdrant:
    image: qdrant/qdrant:latest
    ports:
      - "6333:6333"
```

`NODE_FUNCTION_ALLOW_EXTERNAL`로 n8n Code 노드에서 외부 패키지 사용을 허용하는 것이 핵심입니다.

---

### 🛠️ 기술 스택

| 역할 | 기술 | 선택 이유 |
|------|------|----------|
| **AI 리뷰 생성** | Azure OpenAI GPT-5 (JSON Mode) | 구조화된 출력 + 한국어 품질 |
| **문서 임베딩** | text-embedding-3-large (3,072차원) | 고차원으로 의미 구분력 우수 |
| **벡터 DB** | Qdrant (Dense + Sparse) | Hybrid Search + RRF 내장 지원 |
| **리랭킹** | Cohere Rerank v4.0-fast | 전용 모델로 빠르고 정확 |
| **Git 통합** | GitLab REST API | MR/Diff 조회, 코멘트 작성 |
| **자동화** | n8n + Docker Compose | 노코드 워크플로우 + 컨테이너 |
| **스키마 검증** | Zod | 런타임 타입 안전성 |
| **로깅** | pino | 구조화된 JSON 로깅 |
| **빌드** | Vite (라이브러리 모드) | ESM/CJS 듀얼 빌드 |
| **CLI** | Commander.js | 서브커맨드 기반 CLI |
| **언어** | TypeScript | 타입 안전성 + DX |

---

### 🚀 직접 구현하려면?

이 시스템을 직접 구현하신다면, 다음 5단계를 따라가시면 됩니다.

#### Step 1. 프로젝트 규칙 문서 정리

AI가 참고할 문서를 먼저 준비합니다. CLAUDE.md, CODING_GUIDE.md, SKILL.md 등 **팀에서 이미 사용하고 있는 규칙 문서**가 있다면 그대로 활용하시면 됩니다.

```
docs/
├── CLAUDE.md           # 프로젝트 코딩 규칙
├── SKILL.md            # 코드 리뷰 가이드
└── best-practices/
    ├── react-hooks.md  # React 훅 사용 패턴
    └── accessibility.md # 접근성 가이드
```

> 💡 **유의사항**: 문서가 최신 상태인지가 중요합니다. 오래된 규칙을 AI가 참조하면 오히려 혼란을 줍니다.

#### Step 2. 문서를 벡터 DB에 인덱싱

규칙 문서를 청킹 → 임베딩 → Qdrant에 저장합니다. CLI로 한 번 실행하시면 됩니다:

```bash
code-review-agent build-index
```

내부적으로 **Dense 벡터(Azure OpenAI 임베딩)** 와 **Sparse 벡터(TF-IDF)** 를 동시에 생성하여, 이후 Hybrid Search가 가능하도록 준비합니다. 문서가 업데이트되면 인덱스를 다시 빌드하시면 됩니다.

#### Step 3. GitLab API로 변경사항 수집

MR의 Diff를 가져오고, 변경된 파일별로 주변 코드(±50줄)를 수집합니다. 테스트 파일이나 설정 파일은 필터링을 통해 제외합니다.

```typescript
const filePatterns = ['**/*.ts', '**/*.tsx', '**/*.js'];
const ignorePatterns = ['**/*.test.*', '**/node_modules/**', '**/*.config.*'];
```

#### Step 4. RAG 검색 + Rerank

Diff에서 키워드를 추출하고, Qdrant Hybrid Search → Cohere Rerank 순서로 관련 문서를 검색합니다. 최종 **상위 5개 문서**만 프롬프트에 포함하여 토큰을 절약합니다.

> 💡 **유의사항**: Rerank에 폴백 전략을 반드시 구현하시기 바랍니다. 외부 API는 언제든 실패할 수 있습니다. Cohere가 실패하면 LLM으로, 그마저도 실패하면 RAG 없이 리뷰를 진행하는 **단계별 폴백**이 핵심입니다.

#### Step 5. 프롬프트 조립 + 리뷰 생성 + 코멘트 작성

모든 재료가 모이면 프롬프트를 조립하고, GPT-5에게 JSON Mode로 리뷰를 요청합니다. 응답을 Zod로 검증한 뒤, GitLab API를 통해 코멘트를 작성합니다.

인라인 코멘트의 위치를 정확히 맞추는 것이 까다로운 부분입니다. AI가 지목한 라인 번호가 Diff에 존재하지 않는 경우, **가장 가까운 유효 라인을 찾아 매핑**하는 로직이 필요합니다:

```typescript
function findClosestValidLine(targetLine: number, validLines: Set<number>): number | null {
  if (validLines.has(targetLine)) return targetLine;
  let closest = null;
  let minDist = Infinity;
  for (const line of validLines) {
    const dist = Math.abs(line - targetLine);
    if (dist < minDist) { minDist = dist; closest = line; }
  }
  return minDist <= 20 ? closest : null;
}
```

20줄 이내에 유효 라인이 없으면 인라인 대신 전체 코멘트로 전환되도록 설계하였습니다.

---

### 🎉 마무리

코드 리뷰의 반복적인 패턴을 AI에게 맡기고, 사람은 **아키텍처 판단과 비즈니스 로직 검토** 같은 고차원 리뷰에 집중할 수 있게 되었습니다. 핵심을 세 가지로 정리하겠습니다:

1. **RAG 파이프라인**: Hybrid Search + RRF + Cohere Rerank를 통해 프로젝트 규칙 문서에서 변경사항과 가장 관련 높은 컨텍스트를 정밀하게 검색합니다.
2. **구조화된 출력**: JSON Mode + Zod 검증으로 severity × category 기반의 일관된 리뷰를 생성하고, GitLab에 요약 + 인라인 코멘트로 자동 작성합니다.
3. **n8n 자동화**: MR이 올라오면 자동으로 리뷰가 실행되므로, 개발자는 코드를 올리기만 하면 됩니다.

#### 향후 개선 방향

현재 시스템도 충분히 실용적이지만, RAG 파이프라인의 검색 정확도를 한 단계 더 끌어올릴 수 있는 개선 포인트가 있습니다.

**Hybrid Search 고도화** — 현재는 Dense와 Sparse 검색을 동일한 가중치로 RRF 병합하고 있습니다. 향후에는 쿼리 특성에 따라 **가중치를 동적으로 조절하는 Adaptive Fusion**을 적용할 계획입니다. 예를 들어 `useCallback`처럼 정확한 API명이 포함된 쿼리는 Sparse 비중을 높이고, "성능 최적화 패턴"처럼 의미 기반 쿼리는 Dense 비중을 높이는 방식입니다. 또한 Qdrant의 **Multi-Vector 검색**을 활용하여 코드 임베딩과 자연어 임베딩을 별도 벡터로 분리 저장하면, 코드 패턴과 규칙 문서 간의 매칭 정밀도를 더욱 향상시킬 수 있습니다.

**Agentic Chunking 도입** — 현재의 적응형 청킹은 헤딩·함수 단위로 규칙 기반 분할을 수행합니다. 최근 주목받고 있는 **Agentic Chunking**은 LLM이 문서를 직접 읽고 "이 부분은 하나의 개념 단위로 묶어야 한다"고 판단하여 **의미 경계를 스스로 결정**하는 방식입니다. 이를 적용하면 규칙 문서 내에서 여러 헤딩에 걸쳐 설명되는 하나의 개념(예: "컴포넌트 접근성 가이드 전체")이 하나의 청크로 유지되어 검색 시 완전한 컨텍스트를 제공할 수 있습니다. 또한 **Late Chunking**(임베딩 후 청킹)이나 **Contextual Retrieval**(각 청크에 문서 전체 맥락 요약을 주입)과 같은 최신 기법도 함께 검토하고 있으며, 이를 통해 청크 단위의 의미 손실을 최소화하여 리뷰 품질을 더욱 높일 수 있을 것으로 기대합니다.

---

## 🔗 관련 링크

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin: 2rem 0;">
  <a href="/posts/open-persona-v2-rag-orchestration" style="text-decoration: none; padding: 1.5rem; border-radius: 12px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);">
    <div>🧠</div>
    <h4 style="margin: 0.5rem 0;">OpenPersona v2.0 RAG 구축기</h4>
    <p style="font-size: 0.85rem; opacity: 0.7;">Hybrid Search + RRF + LLM Reranking 상세 설명</p>
  </a>
  <a href="https://qdrant.tech/documentation/concepts/hybrid-queries/" target="_blank" rel="noopener noreferrer" style="text-decoration: none; padding: 1.5rem; border-radius: 12px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);">
    <div>🔍</div>
    <h4 style="margin: 0.5rem 0;">Qdrant Hybrid Search Docs</h4>
    <p style="font-size: 0.85rem; opacity: 0.7;">Dense + Sparse + RRF Fusion 공식 문서</p>
  </a>
  <a href="https://docs.n8n.io/" target="_blank" rel="noopener noreferrer" style="text-decoration: none; padding: 1.5rem; border-radius: 12px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);">
    <div>⚡</div>
    <h4 style="margin: 0.5rem 0;">n8n Documentation</h4>
    <p style="font-size: 0.85rem; opacity: 0.7;">워크플로우 자동화 플랫폼 공식 문서</p>
  </a>
</div>

## 🏷️ 태그

#ai_agent #rag #code_review #qdrant #cohere_rerank #gpt5 #n8n #gitlab #typescript #vector_search #hybrid_search
