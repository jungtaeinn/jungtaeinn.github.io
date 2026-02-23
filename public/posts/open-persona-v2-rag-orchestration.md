---
title: "🧠 OpenPersona v2.0 — RAG 파이프라인과 AI 오케스트레이션 구축기"
date: "2026-02-23"
excerpt: "OpenPersona v2.0에서 Vectra 기반 하이브리드 검색(벡터 + BM25), RRF 병합, LLM 리랭킹으로 구성된 RAG 파이프라인과 Intent 분류 → Model 선택 → Tool Call Loop까지 AI Agent Orchestrator를 실제 코드와 함께 상세히 다룹니다."
tags: ["AI Agent", "RAG", "Orchestration", "Electron", "TypeScript", "Gemini", "Vector Search", "BM25", "Reranking", "LLM"]
category: "Architecture"
featured: true
coverImage: "/images/posts/open-persona-v2/cover.png"
---

### 📅 글 개요

[이전 글](/posts/open-persona-desktop-ai-agent)에서 OpenPersona v1의 아키텍처를 소개하며, 마지막에 이런 청사진을 그렸습니다.

> "v2에서는 AI Agent Orchestrator를 중심으로 RAG와 MCP를 통합하여 훨씬 강력한 에이전트로 진화할 계획입니다."

그리고 실제로 해냈습니다. **+3,917줄의 코드, 35개 파일 변경** — 단순 채팅봇이었던 v1이 **지식을 검색하고, 의도를 파악하고, 도구를 실행하는 진짜 AI 에이전트**로 탈바꿈했습니다.

이 글에서는 그 여정을 함께 따라가 봅니다. 특히 "RAG가 뭔데?", "왜 검색을 두 가지로 하는 거야?", "리랭킹이 뭐야?" 같은 질문에 코드와 비유를 섞어 답해보려 합니다.

> 💡 **이 글에서 다룰 내용**
> - RAG(Retrieval-Augmented Generation) 파이프라인 설계와 구현
> - 하이브리드 검색: 벡터 시맨틱 + BM25 키워드
> - RRF(Reciprocal Rank Fusion)로 검색 결과 병합
> - Gemini Flash 기반 경량 LLM 리랭킹
> - Structure-Aware 청킹과 토큰 최적화 전략
> - AI Agent Orchestrator: Intent 분류 → Model 선택 → Tool Call Loop

### 🏗️ v2.0 전체 아키텍처

먼저 큰 그림부터 보겠습니다. v1에서는 사용자 메시지가 LLM에 바로 전달되었지만, v2에서는 **Orchestrator가 중앙 허브**가 되어 모든 요청을 조율합니다.

<div style="text-align: center; margin: 2rem 0;">
  <img src="/images/posts/open-persona-v2/architecture-v2.png" alt="OpenPersona v2.0 아키텍처 - RAG Pipeline과 AI Agent Orchestrator" style="max-width: 100%; height: auto;" />
</div>

v1과 비교하면, 사용자 메시지가 LLM에 도달하기 전에 **4개의 새로운 레이어**를 거칩니다:

| 구성 요소 | 역할 |
|------|------|
| **Intent Classifier** | "이 질문이 번역인지, 코드 리뷰인지, 파일 작업인지" 의도를 파악 |
| **RAG Engine** | 캐릭터별 전문 지식에서 관련 정보를 검색해 LLM에 주입 |
| **Model Selector** | 의도에 맞는 최적 LLM 모델을 동적으로 선택 |
| **Tool Registry** | 파일시스템 조작, 엑셀 읽기/쓰기 등 11종의 도구를 관리 |

이 구조 덕분에 Felix(여우)에게 코드 질문을 하면 **React/TypeScript 지식 기반으로**, Done(돼지)에게 엑셀 질문을 하면 **엑셀 함수/피벗 지식 기반으로**, Bomi(토끼)에게 번역을 부탁하면 **번역 패턴/톤 가이드 기반으로** 답변이 나옵니다. 같은 파이프라인인데, 캐릭터마다 전혀 다른 전문 답변이 만들어지는 거죠.

---

### 🔍 실제 질의로 따라가보는 RAG 파이프라인

설명보다는 직접 보는 게 빠릅니다. 두 가지 실제 질의가 어떻게 처리되는지 단계별로 따라가 봅시다.

#### 예시 1: "🐷 Done, 엑셀에서 VLOOKUP 사용법 알려줘"

**Step 1 — Intent 분류**

Orchestrator가 메시지를 받으면, 가장 먼저 Intent Classifier가 동작합니다:

```typescript
// intent-classifier.ts — 키워드 패턴 매칭
const KEYWORD_RULES = [
  { pattern: /어떻게|방법|사용법|문법|함수|API/i, 
    type: 'knowledge_query', needsKnowledge: true, needsTool: false },
  // ...
];

// "사용법"이 매칭 → knowledge_query 의도로 분류
// 캐릭터가 pig(Done)이므로 category: 'excel' 추론
```

결과: `{ type: 'knowledge_query', category: 'excel', needsKnowledge: true, confidence: 0.9 }`

**Step 2 — RAG 검색 (핵심!)**

`needsKnowledge: true`이므로 RAG Engine이 작동합니다. "VLOOKUP 사용법"이라는 쿼리로 pig 캐릭터의 지식 인덱스를 검색합니다.

```
[검색 대상] pig/excel/functions.md, pig/excel/advanced-formulas.md ...
[시맨틱 검색] "VLOOKUP 사용법"의 의미와 가장 유사한 청크 top-10
[키워드 검색] "VLOOKUP"이라는 정확한 단어가 들어간 청크 top-10
[RRF 병합] 두 결과를 합쳐서 최종 top-10
[LLM 리랭킹] Gemini Flash가 top-10에서 가장 관련 높은 top-5 선별
```

최종으로 이런 컨텍스트가 추출됩니다:

```
[1] ## VLOOKUP 함수
    기본 문법: =VLOOKUP(찾는값, 범위, 열번호, [일치유형])
    매개변수 설명: ...
[2] ## VLOOKUP vs INDEX/MATCH
    VLOOKUP은 왼쪽→오른쪽만 검색 가능, INDEX/MATCH는 양방향...
[3] ## 고급 활용 — 근사 일치 / 와일드카드
    ...
```

**Step 3 — Context 주입**

Context Builder가 이 RAG 결과를 시스템 프롬프트에 주입합니다:

```
[System Prompt]
너는 "Done"이라는 이름의 돼지 캐릭터 AI 문서 전문가야...

--- 참고 지식 (RAG) ---
아래는 관련 전문 지식입니다. 답변 시 적극적으로 참고하되, 
지식에 없는 내용은 솔직히 모른다고 하세요.

[1] ## VLOOKUP 함수
    기본 문법: =VLOOKUP(찾는값, 범위, 열번호, [일치유형])...
[2] ## VLOOKUP vs INDEX/MATCH...
--- 참고 지식 끝 ---
```

**Step 4 — LLM 응답**

LLM이 Done의 성격 + VLOOKUP 전문 지식을 합쳐서 답변합니다:

```
"안녕하세용~ VLOOKUP 사용법을 알려드릴게요! ㅎㅎ 🐷

VLOOKUP은 표에서 원하는 값을 찾아오는 함수예요!
기본 문법은 =VLOOKUP(찾는값, 범위, 열번호, 일치유형) 이렇게 쓰면 돼요..."
```

RAG가 없었다면? LLM이 일반적인 VLOOKUP 설명을 했겠지만, RAG 덕분에 **Done이 학습한 엑셀 지식 문서의 정확한 문법과 팁**을 기반으로 답변합니다.

---

#### 예시 2: "🐰 Bomi, 정태인 안녕하세요를 일본어로 알려줘"

같은 파이프라인인데 완전히 다른 결과가 나옵니다.

**Step 1 — Intent 분류**

```typescript
// "일본어로"가 매칭 → translation 의도
{ pattern: /한국어로|영어로|일본어로|중국어로/i, 
  type: 'translation', needsKnowledge: true, needsTool: false }

// 캐릭터가 rabbit(Bomi) + "일본어" → category: 'ja-ko'
```

결과: `{ type: 'translation', category: 'ja-ko', needsKnowledge: true, confidence: 0.9 }`

**Step 2 — RAG 검색**

이번에는 rabbit의 `ja-ko` 카테고리에서 검색합니다:

```
[검색 대상] rabbit/ja-ko/translation-patterns.md, rabbit/style-guides/tone-guide.md
[하이브리드 검색 → RRF → 리랭킹]
```

추출된 컨텍스트:

```
[1] ## 어순 유사성 활용
    일본어와 한국어는 어순(SOV)이 동일
    조사 대응: は→은/는, が→이/가, を→을/를...
[2] ## 경어 변환
    ~です → ~입니다/~이에요
    ~ます → ~합니다/~해요...
[3] ## 문화적 뉘앙스
    よろしくお願いします → "잘 부탁드립니다"...
```

**Step 3 — Context 주입 → LLM 응답**

Bomi의 활발한 성격 + 일본어 번역 전문 지식이 합쳐져서:

```
"깡총! 일본어 번역이라면 당근 내가 도와줄게~! 🥕✨

'정태인 안녕하세요'를 일본어로 하면:
정태인(チョン・テイン)さん、こんにちは

참고로 일본어에서 인사할 때는 상대방 이름 뒤에 'さん'을 
붙이는 게 기본 예의야! 격식을 차리려면 '様(さま)'를 쓰기도 해~"
```

**핵심 포인트**: 같은 RAG 파이프라인을 거쳤는데, **검색되는 지식 저장소가 완전히 다릅니다.** Done은 엑셀 함수 가이드를, Bomi는 일본어 번역 패턴을 참조했죠. 이것이 "캐릭터별 전문가 RAG"의 핵심입니다.

---

### 📚 RAG Pipeline 깊이 파기

이제 각 단계를 코드와 함께 자세히 살펴봅시다.

#### 1. Document Ingestion — 문서 로더

RAG의 시작은 문서를 읽어들이는 것입니다. OpenPersona는 다양한 형식의 문서를 파싱할 수 있는 통합 로더를 갖추고 있습니다:

```typescript
// document-loader/index.ts
export async function loadDocument(filePath: string): Promise<ParsedDocument> {
  const ext = path.extname(filePath).toLowerCase();

  switch (ext) {
    case '.xlsx': case '.xls': return loadExcel(filePath);
    case '.docx':               return loadDocx(filePath);
    case '.md': case '.txt':    return loadTextFile(filePath, ext);
    case '.json':               return loadJsonFile(filePath);
    default: throw new Error(`지원하지 않는 파일 형식: ${ext}`);
  }
}
```

Excel은 **시트별로** 섹션을 나누고 Markdown 테이블로 변환하며, Word는 Mammoth로 HTML 변환 후 Markdown으로 정리합니다. 모든 문서가 동일한 `ParsedDocument` 구조로 통일되어 이후 청킹 파이프라인에 들어갑니다.

#### 2. Structure-Aware Chunker — 똑똑한 문서 분할

<div style="text-align: center; margin: 2rem 0;">
  <img src="/images/posts/open-persona-v2/rag-chunking-process.png" alt="Structure-Aware Chunking 프로세스 — 문서 구조 분할 → 500토큰 분할 → 50토큰 오버랩 → Vectra 저장" style="max-width: 100%; height: auto; border-radius: 12px;" />
</div>

문서를 통째로 임베딩할 수는 없습니다. LLM의 컨텍스트 윈도우에도 한계가 있고, 검색 정확도를 위해서도 적절한 크기로 나눠야 합니다.

OpenPersona의 청커는 **문서 구조를 존중하면서** 분할합니다:

```typescript
// chunker.ts
const DEFAULT_CONFIG: ChunkerConfig = {
  maxTokens: 500,     // 청크당 최대 500 토큰
  overlapTokens: 50,  // 연속 청크 간 50 토큰 겹침
};
```

**왜 500토큰인가?**
- 너무 작으면 (100토큰): 문맥이 끊겨서 검색해도 의미가 없습니다
- 너무 크면 (2000토큰): 검색 정밀도가 떨어지고 LLM 컨텍스트를 낭비합니다
- 500토큰은 **한 가지 개념을 설명하기에 충분하면서도 검색에 날카로운** 사이즈입니다

**왜 50토큰 오버랩인가?**

오버랩 없이 자르면 이런 일이 생깁니다:

```
[청크 1] "...VLOOKUP은 왼쪽에서 오른쪽으로만 검색할 수 있는데,"
[청크 2] "이 한계를 극복하려면 INDEX/MATCH 조합을 사용합니다."
```

청크 2만 검색되면 "뭘 극복한다는 건지" 문맥을 알 수 없죠. 50토큰 오버랩이 있으면:

```
[청크 2] "...VLOOKUP은 왼쪽에서 오른쪽으로만 검색할 수 있는데, 
          이 한계를 극복하려면 INDEX/MATCH 조합을 사용합니다."
```

이전 청크의 꼬리 부분이 다음 청크 시작에 포함되어 **문맥이 이어집니다**.

분할 전략은 3단계로 동작합니다:

```typescript
// 1차: 문서 구조(헤딩, 시트) 경계로 섹션 분리
export function splitMarkdownIntoSections(content: string): DocumentSection[] {
  // ## 헤딩 경계로 분할
  for (const line of lines) {
    if (line.match(/^#{1,3}\s+/)) {
      // 새로운 섹션 시작
    }
  }
}

// 2차: 500토큰 초과 섹션은 문단(\\n\\n) 단위로 분할 + overlap
function splitWithOverlap(text: string, maxTokens: number, overlapTokens: number): string[] {
  const paragraphs = text.split(/\n\n+/);
  // 문단 경계를 존중하며 분할, overlap 적용
}

// 3차: 단일 문단이 500토큰 초과 시 문장 단위로 강제 분할
function splitLongParagraph(text: string, maxTokens: number): string[] {
  const sentences = text.split(/(?<=[.!?。！？])\s+/);
  // 문장 경계로 분할
}
```

**토큰 추정** 함수도 흥미롭습니다. 정확한 토크나이저(tiktoken 등) 대신 경험적 비율을 사용해 의존성을 줄였습니다:

```typescript
export function estimateTokens(text: string): number {
  if (!text) return 0;
  const koreanChars = (text.match(/[\uAC00-\uD7AF]/g) || []).length;
  // 한국어 비율 30% 이상이면 2 chars/token, 아니면 3 chars/token
  const ratio = koreanChars > text.length * 0.3 ? 2 : 3;
  return Math.ceil(text.length / ratio);
}
```

한국어는 영어보다 토큰 밀도가 높습니다(한 글자가 대략 0.5토큰). 한영 혼합 문서가 많은 OpenPersona 특성을 반영한 수치입니다.

#### 3. Embedding — Ports & Adapters 패턴

청크가 만들어지면 벡터로 변환해야 합니다. OpenPersona는 **Ports & Adapters(헥사고날)** 패턴으로 임베딩 모델을 추상화했습니다:

```typescript
// ports/embedding.port.ts — 인터페이스(Port)
export interface EmbeddingPort {
  embed(text: string): Promise<number[]>;
  embedBatch(texts: string[]): Promise<number[][]>;
  readonly dimensions: number;
  readonly modelName: string;
}
```

```typescript
// adapters/gemini-embedding.adapter.ts — 구현체(Adapter)
export class GeminiEmbeddingAdapter implements EmbeddingPort {
  readonly dimensions = 768;
  readonly modelName = 'gemini-embedding-001';
  // ...
}

// adapters/openai-embedding.adapter.ts
export class OpenAIEmbeddingAdapter implements EmbeddingPort {
  readonly dimensions = 1536;
  readonly modelName = 'text-embedding-3-small';
  // ...
}
```

**Gemini 우선, OpenAI 폴백** 전략입니다. Gemini Embedding은 무료 티어가 있어 비용 효율적이고, API 키가 없을 때만 OpenAI로 자동 전환됩니다.

임베딩 모델이 바뀌면 기존 벡터와 호환되지 않으므로, **모델 변경 감지 → 인덱스 자동 재생성** 로직도 포함했습니다:

```typescript
// rag-engine.ts
async ensureEmbeddingConsistency(): Promise<boolean> {
  const currentModel = `${this.embedding.modelName}:${this.embedding.dimensions}`;
  const stored = await fs.readFile(markerPath, 'utf-8');
  
  if (stored !== currentModel) {
    console.log(`임베딩 모델 변경 감지: ${stored} → ${currentModel}, 인덱스 재생성`);
    await this.clearAllIndexes();
    return true;
  }
  return false;
}
```

Vector Store도 동일하게 추상화되어 있어, 현재 Vectra(로컬 파일 기반)에서 나중에 LanceDB나 ChromaDB로 교체할 때 **어댑터 하나만 바꾸면 됩니다**.

#### 4. Hybrid Search — "놓치지 않는" 검색

<div style="text-align: center; margin: 2rem 0;">
  <img src="/images/posts/open-persona-v2/rag-hybrid-search-pipeline.png" alt="Hybrid Search + RRF Merge + LLM Reranking 파이프라인 — 시맨틱 검색과 키워드 검색을 RRF로 병합하고 LLM이 최종 리랭킹" style="max-width: 100%; height: auto; border-radius: 12px;" />
</div>

여기서부터 핵심입니다. 검색을 왜 두 가지로 하는 걸까요?

> 🏫 **도서관 비유로 이해하기**
>
> 도서관에서 "VLOOKUP 함수"에 대한 책을 찾는다고 해봅시다.
>
> **시맨틱 검색(벡터)** = **주제로 검색**하는 것
> - "엑셀에서 데이터를 찾아오는 방법"이라는 **의미**로 검색합니다
> - "VLOOKUP"이란 단어가 없어도, "표에서 값을 조회하는 함수"라는 뜻이 비슷하면 찾아냅니다
> - 장점: 동의어, 유사 표현을 이해합니다
> - 단점: "VLOOKUP"이라는 **정확한 용어**를 중요하게 취급하지 않을 수 있습니다
>
> **키워드 검색(BM25)** = **제목/목차에서 단어로 검색**하는 것
> - "VLOOKUP"이라는 **정확한 글자**가 들어간 문서를 찾습니다
> - 장점: 고유 명사, 함수명, 약어를 정확히 매칭합니다
> - 단점: "표 조회 함수"라고 써있으면 못 찾습니다
>
> **Hybrid Search** = **두 사서에게 동시에 부탁**하는 것
> - 주제 전문가 사서 + 색인 전문가 사서가 각각 찾아와서 합칩니다
> - 의미도 맞고, 정확한 용어도 들어있는 문서가 가장 높은 점수를 받습니다

RAG Engine의 `search` 메서드를 보면 이 전략이 코드로 구현되어 있습니다:

```typescript
// rag-engine.ts
async search(request: RAGSearchRequest): Promise<SearchResult[]> {
  const { query, characterId, category, topK = 5, useReranking = true } = request;
  const queryVector = await this.embedding.embed(query);

  // 1) 벡터 시맨틱 검색 — static + learned 인덱스 병렬 검색
  const [staticResults, learnedResults] = await Promise.all([
    this.queryStore(characterId, 'static', queryVector, filter, topK * 2),
    this.queryStore(characterId, 'learned', queryVector, filter, topK * 2),
  ]);
  const allSemanticResults = [...staticResults, ...learnedResults]
    .sort((a, b) => b.score - a.score)
    .slice(0, topK * 2);

  // 2) BM25 키워드 검색
  const allChunks = await this.getAllChunks(characterId, category);
  const keywordResults = keywordSearch(query, allChunks, topK * 2);

  // 3) RRF 병합
  const merged = mergeWithRRF(allSemanticResults, keywordResults, topK * 2);

  // 4) LLM 리랭킹
  if (useReranking && merged.length > topK) {
    return rerankWithLLM(query, merged, topK, this.config.quickLLMCall);
  }
  return merged.slice(0, topK);
}
```

`topK * 2`로 넉넉히 가져온 후 병합/리랭킹으로 줄여가는 **퍼널(funnel) 전략**입니다. 놓치는 것보다 많이 가져와서 정제하는 게 낫습니다.

BM25 키워드 검색의 구현도 살펴봅시다:

```typescript
// keyword-search.ts
function calculateBM25Score(
  queryTerms: string[], document: string, totalDocs: number,
): number {
  const docTerms = tokenize(document);
  const k1 = 1.2;   // 용어 빈도 포화 계수
  const b = 0.75;    // 문서 길이 정규화 계수

  for (const queryTerm of queryTerms) {
    const tf = termFreq.get(queryTerm) ?? 0;
    if (tf === 0) continue;
    const idf = Math.log(1 + (totalDocs - 1) / (1 + 1));
    const tfNorm = (tf * (k1 + 1)) / (tf + k1 * (1 - b + b * (docLen / avgDocLen)));
    score += idf * tfNorm;
  }
  return score;
}
```

`k1 = 1.2`는 같은 단어가 여러 번 나와도 점수가 무한히 올라가지 않게 하고, `b = 0.75`는 긴 문서가 불공정하게 유리해지지 않도록 보정합니다. 정보 검색 분야에서 수십 년간 검증된 파라미터입니다.

#### 5. RRF Merge — 두 전문가의 추천을 합치는 투표

시맨틱 검색과 키워드 검색, 두 가지 결과가 나왔습니다. 이걸 어떻게 합칠까요?

> 🗳️ **투표 비유로 이해하기**
>
> 두 명의 영화 평론가가 각각 "이번 달 추천 영화 Top 10"을 줬다고 해봅시다.
>
> - A 평론가(시맨틱): "1위 인셉션, 2위 인터스텔라, 3위 매트릭스..."
> - B 평론가(키워드): "1위 매트릭스, 2위 인셉션, 3위 블레이드 러너..."
>
> 단순히 점수를 더하면? A의 점수 체계(0~1)와 B의 점수 체계(0~50)가 달라서 불공정합니다.
>
> **RRF는 "순위"만 보고 합칩니다:**
> - 인셉션: A에서 1위(높은 점수) + B에서 2위(높은 점수) = **최종 1위**
> - 매트릭스: A에서 3위 + B에서 1위 = **최종 2위**
> - 둘 다 높이 평가한 항목이 자연스럽게 올라옵니다

코드로 보면 놀랍도록 단순합니다:

```typescript
// keyword-search.ts
export function mergeWithRRF(
  semanticResults: SearchResult[],
  keywordResults: SearchResult[],
  topK: number,
  k: number = 60,  // RRF 상수 (논문 권장값)
): SearchResult[] {
  const scoreMap = new Map<string, { result: SearchResult; rrfScore: number }>();

  // 시맨틱 결과의 순위로 점수 계산
  for (let rank = 0; rank < semanticResults.length; rank++) {
    const r = semanticResults[rank];
    const rrfScore = 1 / (k + rank + 1);
    scoreMap.set(r.id, { result: r, rrfScore });
  }

  // 키워드 결과의 순위로 점수를 누적
  for (let rank = 0; rank < keywordResults.length; rank++) {
    const r = keywordResults[rank];
    const rrfScore = 1 / (k + rank + 1);
    const existing = scoreMap.get(r.id);
    if (existing) {
      existing.rrfScore += rrfScore;  // 양쪽 다 있으면 점수 합산!
    } else {
      scoreMap.set(r.id, { result: r, rrfScore });
    }
  }

  return [...scoreMap.values()]
    .sort((a, b) => b.rrfScore - a.rrfScore)
    .slice(0, topK);
}
```

`k = 60`은 [Cormack et al. (2009)](https://plg.uwaterloo.ca/~gvcormac/cormack09.pdf) 논문에서 제안한 값입니다. 이 값이 클수록 순위 차이에 따른 점수 차이가 줄어들어, 다양한 검색 결과가 골고루 반영됩니다.

#### 6. LLM Reranking — 최종 면접관의 판단

RRF로 10개를 골랐지만, 최종적으로 LLM에 전달할 건 5개입니다. 여기서 **LLM이 직접 읽어보고** 관련성 순위를 다시 매깁니다.

> 🎯 **면접 비유로 이해하기**
>
> 서류 전형(시맨틱 + 키워드)으로 10명을 통과시켰습니다.
> 이제 **최종 면접관(Gemini Flash)**이 각 후보의 이력서를 직접 읽어보고,
> 이 직무에 가장 적합한 5명을 뽑습니다.
>
> 서류 전형은 키워드와 경력 매칭으로 빠르게 거르지만,
> 면접관은 "이 질문에 대한 답변으로 이 내용이 정말 유용한가?"를
> **맥락을 이해하면서** 판단할 수 있습니다.

```typescript
// reranker.ts
export async function rerankWithLLM(
  query: string, results: SearchResult[], topK: number, llmCall: QuickLLMCall,
): Promise<SearchResult[]> {
  if (results.length <= topK) return results;

  // 각 결과의 앞 150자만 잘라서 LLM에 전달 (비용 절약)
  const snippets = results
    .map((r, i) => `[${i}] ${r.content.slice(0, 150).replace(/\n/g, ' ')}`)
    .join('\n');

  const prompt = [
    '다음 검색 결과 중 질문과 가장 관련 높은 것을 선택하세요.',
    '',
    `질문: "${query}"`,
    '',
    '검색 결과:',
    snippets,
    '',
    `가장 관련 높은 ${topK}개의 인덱스를 JSON 배열로만 반환하세요. 예: [0, 3, 1]`,
  ].join('\n');

  const response = await llmCall(prompt);
  const indices = parseIndices(response, results.length);
  return indices.slice(0, topK).map((i) => results[i]);
}
```

**비용은 얼마나 들까요?** 프롬프트가 ~100토큰 수준이라 Gemini Flash 기준으로 **사실상 무료**입니다. 하지만 검색 품질은 눈에 띄게 올라갑니다. 특히 "VLOOKUP 에러 해결"을 물어봤는데 "VLOOKUP 기본 문법"과 "VLOOKUP 에러 핸들링"이 둘 다 검색됐을 때, LLM이 후자를 더 높은 순위로 올려줍니다.

리랭킹이 실패해도 괜찮습니다 — `catch` 블록에서 원본 순서를 그대로 반환하는 **graceful degradation** 패턴을 적용했습니다.

#### 7. 토큰 최적화 전략

RAG가 아무리 좋은 컨텍스트를 찾아와도, LLM의 컨텍스트 윈도우를 초과하면 소용없습니다. 몇 가지 토큰 절약 전략을 적용했습니다:

**RAG 컨텍스트 최대 8,000자 제한**

```typescript
// context-builder.ts
const MAX_RAG_CONTEXT_CHARS = 8000;

function buildSystemPrompt(basePrompt: string, ragContext: string): string {
  const trimmedContext = ragContext.length > MAX_RAG_CONTEXT_CHARS
    ? ragContext.slice(0, MAX_RAG_CONTEXT_CHARS) + '\n...(truncated)'
    : ragContext;
  // ...
}
```

**대화 히스토리 20턴 제한** — Context Builder에서 최근 20턴만 포함하여 토큰 폭발을 방지합니다.

**리랭킹 시 150자만 전달** — 전체 청크를 LLM에 보내면 비용이 올라가므로, 앞 150자만 잘라서 판단하게 합니다. 대부분의 문서는 앞부분에 핵심 정보가 있기 때문에 충분합니다.

---

### 🎯 Orchestrator 아키텍처

RAG가 "지식을 검색하는 엔진"이라면, Orchestrator는 **"모든 것을 조율하는 지휘자"**입니다.

#### Intent Classifier — 의도 파악

사용자가 뭘 원하는지 모르면 아무것도 할 수 없습니다. Intent Classifier는 **키워드 패턴 매칭**으로 빠르게 의도를 분류합니다:

```typescript
// intent-classifier.ts
const KEYWORD_RULES = [
  // 파일 조작
  { pattern: /파일\s*(읽|쓰|생성|삭제|목록|열어|만들어)/i, 
    type: 'file_operation', needsKnowledge: false, needsTool: true },
  // 번역
  { pattern: /번역|translate|翻訳|통역/i, 
    type: 'translation', needsKnowledge: true, needsTool: false },
  // 엑셀
  { pattern: /엑셀|excel|스프레드시트/i, 
    type: 'document_generation', needsKnowledge: true, needsTool: true },
  // ...10+ 패턴
];
```

캐릭터별 전문 분야도 매핑되어 있어서, Fox에게 물으면 `code_review`, `code_generation` 의도가 우선 고려되고, Rabbit에게 물으면 `translation`이 기본 의도가 됩니다.

분류 결과에 따라 **RAG가 필요한지(`needsKnowledge`), 도구가 필요한지(`needsTool`)가 결정**되어, 불필요한 RAG 검색이나 도구 로딩을 건너뛸 수 있습니다. 일반 잡담에는 RAG 없이 바로 LLM에 전달하는 식이죠.

#### Smart Model Selector + Auto-Fallback

의도에 따라 최적의 모델을 선택합니다. 기본 전략은 **Gemini Flash 우선** (빠르고, 무료 티어)이며, Gemini API가 quota 초과 등으로 실패하면 OpenAI로 자동 폴백합니다:

```typescript
// orchestrator.ts
const FALLBACK_MODELS: Record<string, { provider: string; model: string }> = {
  openai: { provider: 'gemini', model: 'gemini-2.0-flash' },
  gemini: { provider: 'openai', model: 'gpt-4o-mini' },
};

// 선택된 Provider 실패 시 자동 폴백
try {
  yield* this.chatWithToolLoop(modelSelection.provider, modelSelection.model, messages, toolDefs);
} catch (error) {
  if (isQuotaOrAuthError(error)) {
    const fallback = FALLBACK_MODELS[modelSelection.provider];
    yield* this.chatWithToolLoop(fallback.provider, fallback.model, messages, toolDefs);
  }
}
```

사용자 입장에서는 모델이 바뀌었는지 모릅니다. 그냥 답변이 나올 뿐이죠. 이것이 **가용성(availability)**을 보장하는 핵심입니다.

#### Tool Call Loop — 도구를 쓰는 에이전트

"파일 읽어줘", "엑셀 만들어줘" 같은 요청은 LLM 혼자 처리할 수 없습니다. Orchestrator는 **최대 5라운드까지 LLM ↔ 도구 실행을 반복**합니다:

```typescript
// orchestrator.ts
private async *chatWithToolLoop(
  provider: string, model: string, messages: MessageInput[], tools?: ToolDefinition[],
): AsyncGenerator<StreamChunk> {
  let round = 0;

  while (round < MAX_TOOL_ROUNDS) {  // 최대 5라운드
    for await (const chunk of this.router.chatWith(provider, model, currentMessages, tools)) {
      if (chunk.toolCall) {
        pendingToolCalls.push(chunk.toolCall);
      }
      // 텍스트 스트리밍...
    }

    if (pendingToolCalls.length === 0) break;  // 도구 호출 없으면 종료

    // 도구 실행 → 결과를 메시지에 추가 → 다음 라운드
    for (const tc of pendingToolCalls) {
      const result = await this.toolRegistry.execute(tc);
      currentMessages.push({
        role: 'tool',
        content: result.success ? result.output : `Error: ${result.error}`,
        toolCallId: tc.id,
      });
    }
    round++;
  }
}
```

예를 들어 "프로젝트의 package.json 읽어줘"라고 하면:
1. LLM이 `readFile` 도구 호출을 생성
2. Tool Registry가 실제 파일을 읽음
3. 결과를 LLM에 돌려줌
4. LLM이 내용을 분석하여 사용자에게 답변

이 루프가 최대 5번 반복되므로, "파일을 읽고 → 분석하고 → 결과를 엑셀로 저장해줘" 같은 복합 작업도 처리할 수 있습니다.

---

### 📖 Knowledge Base & Learning System

캐릭터별 **16종, 30개 파일의 정적 지식**이 앱 시작 시 Vectra 인덱스에 로드됩니다:

| 캐릭터 | 지식 영역 | 파일 수 |
|------|------|------|
| **Fox (개발)** | Next.js, React Hooks, TypeScript, Figma Guide, Code Review, QA | 13종 |
| **Pig (문서)** | Excel 6종, PowerPoint 3종, Word 1종, HWP 3종 | 13종 |
| **Rabbit (번역)** | 한↔영, 한↔일, 영↔한 번역 패턴 + 톤 가이드 | 4종 |

정적 지식 외에도 **Learning Manager**가 세 가지 경로로 지속 학습합니다:

- **대화 학습**: 양질의 Q&A 쌍을 자동 추출하여 `learned` 인덱스에 저장
- **피드백 학습**: 사용자가 "correction" 피드백을 주면 수정된 내용을 학습
- **지식 업로드**: .xlsx, .docx, .md 등 파일을 업로드하면 파싱/청킹 후 학습

`static`(앱 번들)과 `learned`(사용자 학습) 인덱스를 분리한 덕분에, 학습 데이터가 원본 지식을 오염시키지 않으면서도 검색 시에는 둘 다 참조됩니다.

---

### 🎉 마무리

v1에서 "캐릭터가 대화하는 챗봇"이었던 OpenPersona가, v2에서는 **지식을 검색하고, 의도를 파악하고, 도구를 실행하는 AI 에이전트**로 진화했습니다. 핵심은 세 가지입니다:

1. **Hybrid Search + RRF + Reranking**: 의미 검색과 키워드 검색을 합치고, LLM이 최종 판단하는 3단계 파이프라인으로 검색 품질을 끌어올렸습니다.
2. **Structure-Aware Chunking**: 문서 구조를 존중하면서 500토큰/50 overlap으로 분할하여, 검색 정확도와 문맥 연속성을 동시에 확보했습니다.
3. **Orchestrator**: Intent 분류부터 Model 선택, Tool Call Loop, Auto-Fallback까지 — 사용자는 그냥 질문만 하면 됩니다.

---

## 🔗 관련 링크

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin: 2rem 0;">
  <a href="https://github.com/jungtaeinn/open-persona" target="_blank" style="text-decoration: none; padding: 1.5rem; border-radius: 12px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);">
    <div>🦊</div>
    <h4 style="margin: 0.5rem 0;">OpenPersona GitHub</h4>
    <p style="font-size: 0.85rem; opacity: 0.7;">프로젝트 소스 코드 및 문서</p>
  </a>
  <a href="/posts/open-persona-desktop-ai-agent" style="text-decoration: none; padding: 1.5rem; border-radius: 12px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);">
    <div>📝</div>
    <h4 style="margin: 0.5rem 0;">v1 구축기 포스트</h4>
    <p style="font-size: 0.85rem; opacity: 0.7;">Electron + Multi-LLM 아키텍처 설계</p>
  </a>
  <a href="https://plg.uwaterloo.ca/~gvcormac/cormack09.pdf" target="_blank" style="text-decoration: none; padding: 1.5rem; border-radius: 12px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);">
    <div>📄</div>
    <h4 style="margin: 0.5rem 0;">RRF 논문 (Cormack 2009)</h4>
    <p style="font-size: 0.85rem; opacity: 0.7;">Reciprocal Rank Fusion 원문</p>
  </a>
</div>

## 🏷️ 태그

#rag #hybrid_search #reranking #orchestration #ai_agent #electron #typescript #gemini #vector_search #bm25
