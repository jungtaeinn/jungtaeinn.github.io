---
title: "🦊 OpenPersona - macOS 데스크톱 AI 에이전트 구축기"
date: "2026-02-19"
excerpt: "디즈니/픽사 스타일 캐릭터가 말풍선으로 대화하는 macOS 데스크톱 AI 에이전트를 구축한 과정을 공유합니다. Electron + React + Multi-LLM 아키텍처부터 RAG와 MCP 오케스트레이션 기반의 차세대 확장 계획까지 상세히 다룹니다."
tags: ["AI Agent", "Electron", "React", "TypeScript", "Gemini", "OpenAI", "Zustand", "macOS", "Desktop App", "LLM", "RAG", "MCP"]
category: "Architecture"
featured: true
coverImage: "/images/posts/open-persona/open-persona-cover.png"
---

### 📅 글 개요

AI가 더 이상 브라우저 안에만 머물지 않는 시대입니다. ChatGPT, Claude, Gemini 같은 LLM이 API를 통해 누구나 접근 가능해지면서, **나만의 AI 에이전트를 데스크톱에 상주시키는 것**이 현실이 되었습니다.

**OpenPersona** (by TAEINN)는 macOS 메뉴 바에 상주하는 데스크톱 캐릭터 AI 에이전트입니다. 디즈니/픽사 스타일의 3명의 캐릭터가 화면 하단에서 말풍선으로 대화하며, 각각 **개발자(Felix)**, **문서 전문가(Done)**, **기획자(Bomi)** 라는 고유한 역할과 성격을 가지고 있습니다.

이 글에서는 제가 **Toy Project** 로 만든 OpenPersona의 아키텍처 설계부터 구현 상세, 그리고 앞으로 최적화할 **RAG(Retrieval-Augmented Generation)** 와 **MCP(Model Context Protocol)** 를 활용한 차세대 오케스트레이션 아키텍처까지 다룹니다.

> 💡 **이 글에서 다룰 내용**
> - Electron + React 기반 데스크톱 AI 에이전트 아키텍처
> - Multi-LLM Router 설계와 스트리밍 응답 처리
> - 캐릭터 페르소나 시스템과 상태 머신
> - Zustand 기반 글로벌 상태 관리
> - 토큰 사용량 추적 및 시스템 모니터링
> - 차세대 RAG + MCP 오케스트레이션 아키텍처 설계

### 🎯 프로젝트 개요

<div style="text-align: center; margin: 2rem 0;">
  <img src="/images/posts/open-persona/open-persona-screenshot.png" alt="OpenPersona 실행 화면 - Felix(여우) 캐릭터가 말풍선으로 답변하는 macOS 데스크톱 AI 에이전트" style="max-width: 100%; height: auto; border-radius: 12px; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);" />
</div>

#### 왜 데스크톱 AI 에이전트인가?

챗봇은 일반적으로 브라우저 안에서 동작하기도 하고, 외부 고객을 대상으로 만들어 집니다. 저는 Target을 내부 직원을 위한 접근성이 편리한 캐릭터 형태의 AI 에이전트로 맞추어 보았습니다.

웹 기반 AI 챗봇은 브라우저 탭을 전환해야 하고, 데스크톱 컨텍스트와 분리되어 있습니다. **항상 화면 위에 떠 있으면서, 어떤 작업 중이든 즉시 AI에게 질문할 수 있다면** 어떨까요?

그리고 귀여운 캐릭터들이 나의 개인비서부터 엑셀 전문가...개발 전문가가 되어 PC를 열어 바탕화면에서 자연스럽게 대화하는 것은 얼마나 활용성이 더 높아질까요?

OpenPersona는 이 문제를 해결하기 위해 다음과 같은 핵심 가치를 추구합니다:

- **Always-on**: `Cmd+Shift+Space`로 즉시 토글, 어떤 앱 위에서든 대화 가능
- **Character-driven**: 단순한 챗봇이 아닌, 개성 있는 캐릭터와의 대화 경험
- **Multi-LLM**: Gemini, OpenAI 등 다양한 LLM 프로바이더를 실시간으로 전환
- **Lightweight**: 투명 창 + 글래스모피즘 UI로 데스크톱 경험을 해치지 않음

#### 핵심 기능

| 기능 | 설명 |
|------|------|
| **캐릭터 AI 챗봇** | 3명의 캐릭터, 각각 고유 성격/역할/말투 |
| **말풍선 UI** | 캐릭터 위에 말풍선으로 답변 표시 |
| **캐릭터 표정** | 눈 깜빡임, 웃는 표정 등 idle 애니메이션 |
| **Multi-LLM** | Gemini 2.0 Flash/Pro, GPT-4o/Mini |
| **토큰 추적** | 모델별 사용량, 비용, 월 예산 관리 |
| **시스템 모니터** | CPU/메모리 추적, 메모리 누수 감지 |
| **글래스모피즘 UI** | 투명 블러 처리된 하단 바 |

### 🏗️ 아키텍처 설계

OpenPersona는 Electron의 Main/Renderer 프로세스 아키텍처를 기반으로, IPC 통신을 통해 LLM 서비스와 UI를 분리한 구조입니다.

<div style="text-align: center; margin: 2rem 0;">
  <img src="/images/posts/open-persona/architecture-current.png" alt="OpenPersona 아키텍처 - Electron Main/Renderer 프로세스, LLM Router, Character Personas 간의 데이터 흐름" style="max-width: 100%; height: auto;" />
</div>

#### 📊 아키텍처 구성 요소

**1. Electron Main Process**
- **역할**: 앱 라이프사이클, LLM 통신, 시스템 리소스 관리
- **핵심 서비스**:
  - `LLMRouter`: Multi-provider 라우팅 및 모델 전환
  - `TokenTracker`: 토큰 사용량 추적 및 비용 계산
  - `MemoryGuard`: RSS 메모리 감시 및 512MB 초과 시 graceful shutdown
  - `IPC Handlers`: Renderer ↔ Main 통신 허브

**2. Electron Renderer Process (React + TypeScript)**
- **역할**: UI 렌더링, 사용자 상호작용 처리
- **핵심 컴포넌트**:
  - `CharacterScene`: 3D 캐릭터 표시 및 idle 애니메이션
  - `BubbleChat`: 말풍선 기반 채팅 입력 UI
  - `TokenUsagePanel`: 토큰 사용량 대시보드
  - `SystemMonitorPanel`: 시스템 리소스 모니터링
  - `Zustand Store`: 글로벌 상태 관리

**3. LLM Provider Layer**
- **역할**: 외부 LLM API와의 스트리밍 통신
- **지원 프로바이더**:
  - Google Gemini (2.0 Flash, Pro)
  - OpenAI (GPT-4o, GPT-4o Mini)

**4. Character Personas**
- **역할**: 캐릭터별 시스템 프롬프트, 인사말, 에러 메시지 관리
- **캐릭터 구성**:
  - Felix (여우) — 개발자, 능글맞고 자신감 넘치는 말투
  - Done (돼지) — 문서 전문가, 다정하고 꼼꼼한 말투
  - Bomi (토끼) — 기획자, 활발하고 에너지 넘치는 말투

### 🔄 데이터 플로우

사용자가 메시지를 보내면 다음과 같은 흐름으로 처리됩니다:

<div style="text-align: center; margin: 2rem 0;">
  <img src="/images/posts/open-persona/data-flow-diagram.png" alt="OpenPersona 데이터 플로우 - 사용자 입력부터 캐릭터 말풍선 응답까지의 시퀀스 다이어그램" style="max-width: 100%; height: auto;" />
</div>

#### 🔑 핵심 통신 메커니즘

**1. IPC 기반 보안 통신**

Electron의 `contextBridge`를 활용하여 Renderer와 Main 프로세스 간 안전한 통신을 구현합니다. `nodeIntegration: false`와 `contextIsolation: true` 설정으로 보안을 강화했습니다.

**2. 스트리밍 응답 처리**

LLM 응답은 청크 단위로 스트리밍되며, IPC를 통해 Renderer에 전달됩니다. 사용자는 답변이 생성되는 것을 실시간으로 볼 수 있습니다.

**3. 에이전트 상태 머신**

```
idle → listening → thinking → responding → done → idle
```

각 상태 전환에 따라 캐릭터의 표정과 애니메이션이 변경되어 생동감 있는 대화 경험을 제공합니다.

### 💻 구현 상세

#### 🔀 Multi-LLM Router

OpenPersona의 핵심은 **여러 LLM 프로바이더를 동적으로 전환**할 수 있는 라우터입니다:

```typescript
export class LLMRouter {
  private providers = new Map<string, LLMProvider>();
  private activeProvider = 'openai';
  private activeModel = 'gpt-4o';

  register(provider: LLMProvider): void {
    this.providers.set(provider.name, provider);
    if (this.providers.size === 1) {
      this.activeProvider = provider.name;
      this.activeModel = provider.models[0]?.id ?? '';
    }
  }

  switchModel(provider: string, model: string): void {
    if (!this.providers.has(provider)) return;
    this.activeProvider = provider;
    this.activeModel = model;
  }

  async *chat(
    messages: MessageInput[],
    tools?: ToolDefinition[],
  ): AsyncGenerator<StreamChunk> {
    const provider = this.providers.get(this.activeProvider);
    if (!provider) {
      yield { text: 'LLM Provider가 설정되지 않았습니다.', done: true };
      return;
    }
    yield* provider.chat({
      model: this.activeModel,
      messages,
      tools,
      stream: true,
    });
  }
}
```

`LLMProvider` 인터페이스를 통해 어떤 프로바이더든 플러그인처럼 등록할 수 있습니다:

```typescript
export interface LLMProvider {
  readonly name: string;
  readonly models: ModelInfo[];
  chat(params: ChatParams): AsyncGenerator<StreamChunk>;
  dispose(): Promise<void>;
}
```

#### 🎭 캐릭터 페르소나 시스템

각 캐릭터는 고유한 **시스템 프롬프트**, **인사말**, **에러 메시지**를 가지며, 이를 통해 일관된 캐릭터성을 유지합니다:

```typescript
export const CHARACTER_PERSONAS: Record<string, CharacterPersona> = {
  fox: {
    id: 'fox',
    systemPrompt: [
      '너는 "Felix"라는 이름의 여우 캐릭터 AI 개발자야.',
      '교활하면서도 능글맞고, 실력있는 개발자답게 자신감 넘치는 말투로 대답해.',
      '"~거든", "흐흐", "이 몸이" 같은 표현을 자연스럽게 섞어서 사용해.',
    ].join(' '),
    greeting: '흐흐, 뭐가 궁금한 거야~? 이 몸이 다 알려줄게 😏',
    copyMessages: [
      '흐흐, 복사해갔지? 😏',
      '이 몸의 답변을 복사하다니~ 센스 있거든 👆',
    ],
    errorMessages: {
      quota: '크큭, 미안한데 지금 크레딧이 다 떨어졌어~ 😏💸',
      network: '흠, 인터넷이 좀 불안정한 것 같은데~? 😏🌐',
      default: '이런, 뭔가 문제가 생겼네~ 다시 한번 해볼까? 😏',
    },
  },
  // pig, rabbit 등 캐릭터별 설정...
};
```

에러 메시지도 캐릭터별로 다르게 처리하여, 오류 상황에서도 캐릭터성이 유지됩니다:

```typescript
function convertErrorMessage(raw: string, characterId: string): string {
  const { errorMessages } = getPersona(characterId);
  if (raw.includes('429') || raw.includes('quota')) {
    return errorMessages.quota;
  }
  if (raw.includes('network') || raw.includes('ENOTFOUND')) {
    return errorMessages.network;
  }
  return errorMessages.default;
}
```

#### 🗃️ Zustand 상태 관리

Zustand를 활용한 글로벌 상태 관리로, **캐릭터별 독립적인 대화 히스토리**를 유지합니다:

```typescript
const useAgentStore = create<AgentStore>((set) => ({
  state: 'idle',
  messagesByCharacter: {},
  characters: DEFAULT_CHARACTERS,
  activeCharacter: DEFAULT_CHARACTERS[1],

  addMessage: (message) =>
    set((s) => {
      const charId = s.activeCharacter.id;
      const prev = s.messagesByCharacter[charId] ?? [];
      const next = [...prev, message];
      return {
        messagesByCharacter: {
          ...s.messagesByCharacter,
          [charId]: next.length > 100 ? next.slice(-100) : next,
        },
      };
    }),

  appendToLastAssistant: (text) =>
    set((s) => {
      const charId = s.activeCharacter.id;
      const msgs = [...(s.messagesByCharacter[charId] ?? [])];
      const last = msgs[msgs.length - 1];
      if (last?.role === 'assistant') {
        msgs[msgs.length - 1] = { ...last, content: last.content + text };
      }
      return {
        messagesByCharacter: { ...s.messagesByCharacter, [charId]: msgs },
      };
    }),
}));
```

캐릭터 전환 시 해당 캐릭터의 대화 히스토리가 자연스럽게 로드되며, Main 프로세스에서도 최대 50개까지의 히스토리를 유지하여 LLM에 컨텍스트를 전달합니다.

#### 📡 IPC 통신 허브

Main 프로세스의 IPC 핸들러는 채팅, 모델 전환, 토큰 추적, 시스템 모니터링 등 모든 통신을 관리합니다:

```typescript
export function registerIpcHandlers(
  win: BrowserWindow,
  router: LLMRouter,
  tokenTracker: TokenTracker,
): void {
  ipcMain.on('chat:send', async (_event, data) => {
    const history = getHistory(currentCharacterId);
    const persona = getPersona(currentCharacterId);
    const messages = [
      { role: 'system' as const, content: persona.systemPrompt },
      ...history.map((m) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
    ];

    for await (const chunk of router.chat(messages)) {
      if (chunk.text) {
        win.webContents.send('chat:stream', {
          chunk: chunk.text,
          done: false,
        });
      }
      if (chunk.done && chunk.usage) {
        const activeModel = router.getActiveModel();
        tokenTracker.record(
          activeModel.provider,
          activeModel.id,
          chunk.usage,
        );
      }
    }
  });
}
```

#### 📊 토큰 사용량 추적

모든 LLM 호출의 토큰 사용량을 추적하고, 모델별 비용을 계산합니다. 월별 예산 한도를 설정하여 과도한 사용을 방지할 수 있습니다:

- **오늘/이번 달** 사용량 통계
- **모델별** 토큰 사용 내역 분류
- **월별 예산** 게이지 및 경고
- **JSON 파일** 기반 영속적 저장

#### 🛡️ 메모리 누수 감지

`MemoryGuard`는 30초 간격으로 RSS 메모리를 모니터링하고, 512MB를 초과할 경우 사용자에게 알림 후 graceful shutdown을 수행합니다. 이를 통해 장시간 실행 시에도 안정적인 동작을 보장합니다.

### 🎨 UI/UX 설계

#### 글래스모피즘 UI

투명 프레임리스 창(`transparent: true`, `frame: false`)에 **CSS 글래스모피즘**을 적용하여, 데스크톱 위에 자연스럽게 떠 있는 듯한 UI를 구현했습니다:

- `backdrop-filter: blur()` 기반 투명 블러 효과
- `alwaysOnTop: true`로 모든 앱 위에 표시
- `setVisibleOnAllWorkspaces(true)`로 모든 데스크톱 스페이스에서 접근 가능

#### 캐릭터 표정 애니메이션

각 캐릭터는 25~55초 간격으로 **눈 깜빡임(blink)**과 **웃는 표정(happy)** 오버레이가 랜덤으로 전환됩니다. 기본 이미지 위에 투명 PNG를 레이어링하여 자연스러운 표정 변화를 구현했습니다.

#### 동적 윈도우 리사이징

채팅 패널의 열림/닫힘에 따라 윈도우 크기가 동적으로 조절됩니다:

```typescript
function resizeWindow(chatOpen: boolean) {
  if (chatOpen) {
    electronAPI.send('window:resize', { width: 600, height: 750 });
  } else {
    electronAPI.send('window:resize', { width: 600, height: 480 });
  }
}
```

### 🎬 실제 사용 데모

다음은 OpenPersona에서 캐릭터와 대화하는 실제 사용 예시입니다:

<video controls style="width: 100%; max-width: 800px; margin: 2rem auto; display: block; border-radius: 12px; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);">
  <source src="/images/posts/open-persona/open-persona-demo.mov" type="video/mp4">
  브라우저가 비디오 태그를 지원하지 않습니다.
</video>

**사용 시나리오**:

1. **Felix에게 개발 질문**
   ```
   사용자: "React에서 useEffect 최적화 방법 알려줘"
   Felix: "흐흐, 이 몸이 알려줄게~ useEffect 최적화라... 거든..." 😏
   ```

2. **Done에게 문서 작성 요청**
   ```
   사용자: "주간 보고서 양식 만들어줘"
   Done: "안녕하세용~ 보고서 양식 도와드릴게요! ㅎㅎ" 🐷📄
   ```

3. **Bomi에게 기획 아이디어 요청**
   ```
   사용자: "새로운 기능 아이디어 브레인스토밍 해줘"
   Bomi: "깡총! 당근 좋은 아이디어 내줄게~!" 🥕✨
   ```

4. **모델 전환**
   ```
   시스템 트레이 → Gemini 2.0 Flash ↔ GPT-4o 실시간 전환
   ```

### 🔮 차세대 아키텍처: RAG + MCP 오케스트레이션

현재 OpenPersona v1은 LLM과의 직접 대화에 초점을 맞추고 있지만, **v2에서는 AI Agent Orchestrator를 중심으로 RAG와 MCP를 통합**하여 훨씬 강력한 에이전트로 진화할 계획입니다.

<div style="text-align: center; margin: 2rem 0;">
  <img src="/images/posts/open-persona/architecture-future-rag-mcp.png" alt="OpenPersona v2.0 차세대 아키텍처 - RAG와 MCP 오케스트레이션을 통한 AI Agent 확장 계획" style="max-width: 100%; height: auto;" />
</div>

#### 🧠 AI Agent Orchestrator

v2의 핵심은 **AI Agent Orchestrator**입니다. 사용자의 요청을 분석하고, 적절한 도구와 컨텍스트를 조합하여 최적의 응답을 생성하는 중앙 오케스트레이터입니다:

| 구성 요소 | 역할 |
|-----------|------|
| **Intent Classifier** | 사용자 의도를 분류하고 적절한 처리 경로 결정 |
| **Task Planner** | 복잡한 요청을 단계별 태스크로 분해 |
| **Context Manager** | 대화 히스토리 + RAG 검색 결과를 통합 관리 |
| **Response Synthesizer** | 수집된 정보를 캐릭터 페르소나에 맞게 합성 |

#### 📚 RAG (Retrieval-Augmented Generation) 파이프라인

RAG 파이프라인을 통해 LLM의 지식 한계를 넘어선 **도메인 특화 컨텍스트**를 제공합니다:

```
사용자 질문 → Embedding Model → Vector Store 검색
     → 관련 문서 추출 → Context Enrichment → LLM에 전달
```

**핵심 구성**:
- **Embedding Model**: 사용자 질문과 문서를 벡터로 변환
- **Vector Store** (Pinecone/ChromaDB): 문서 벡터 저장 및 유사도 검색
- **Document Loader**: 다양한 형식의 문서를 로드하고 청크 분할
- **Semantic Search**: 의미 기반 유사도 검색으로 관련 컨텍스트 추출

**활용 시나리오**:
- 프로젝트 코드베이스를 인덱싱하여 Felix(개발자)가 코드 관련 질문에 정확히 답변
- 회사 문서를 인덱싱하여 Done(문서 전문가)이 사내 규정/가이드를 정확히 안내
- 기획 문서를 인덱싱하여 Bomi(기획자)가 프로젝트 현황을 파악하고 계획 수립

#### 🔌 MCP (Model Context Protocol) 통합

[MCP](https://modelcontextprotocol.io/)는 AI 에이전트가 외부 도구와 서비스를 표준화된 프로토콜로 연동할 수 있게 해줍니다. OpenPersona v2에서는 MCP Client를 통해 다양한 MCP 서버와 연결됩니다:

**MCP 통합 구조**:
- **MCP Client**: Orchestrator에 내장되어 Tool/Resource를 관리
- **Tool Registry**: 사용 가능한 도구 목록을 동적으로 관리
- **Resource Manager**: 외부 리소스 접근 및 캐싱

**연동 예정 MCP 서버**:

| MCP 서버 | 역할 |
|----------|------|
| **File System MCP** | 로컬 파일 읽기/쓰기, 디렉토리 탐색 |
| **Database MCP** | DB 쿼리 실행, 스키마 조회 |
| **Web Search MCP** | 실시간 웹 검색, 최신 정보 조회 |
| **Custom Tools MCP** | 사내 API, CI/CD, Jira 등 커스텀 도구 |

**MCP 활용 시나리오**:
```
사용자: "Felix, 이 프로젝트의 package.json 의존성 정리해줘"

Orchestrator 처리 흐름:
1. Intent 분류 → "파일 작업 + 코드 분석"
2. File System MCP → package.json 읽기
3. RAG → 프로젝트 컨텍스트 로드
4. LLM → 의존성 분석 및 정리 제안
5. Felix 페르소나로 응답 합성
```

#### 🔄 오케스트레이션 데이터 플로우

v2의 전체 데이터 플로우는 다음과 같습니다:

```
사용자 질문
    ↓
[AI Agent Orchestrator]
    ├── Intent Classifier → 의도 분류
    ├── RAG Pipeline → 관련 컨텍스트 검색
    ├── MCP Client → 필요한 도구 실행
    └── Context Manager → 모든 정보 통합
    ↓
[Multi-LLM Routing]
    ├── Google Gemini
    ├── OpenAI GPT-4o
    └── Anthropic Claude (예정)
    ↓
[Response Synthesizer]
    └── 캐릭터 페르소나에 맞는 응답 생성
    ↓
캐릭터 말풍선으로 표시
```

### 🛠️ 프로젝트 구조

```
src/
├── main/                        # Electron 메인 프로세스
│   ├── main.ts                  # 앱 진입점, 윈도우 & 트레이
│   ├── tray.ts                  # 시스템 트레이 메뉴
│   ├── ipc-handlers.ts          # IPC 통신 허브
│   └── services/
│       ├── llm/
│       │   ├── llm-router.ts    # Multi-provider LLM 라우터
│       │   ├── gemini-provider.ts
│       │   ├── openai-provider.ts
│       │   └── types.ts
│       ├── token-tracker.ts     # 토큰 사용량 추적
│       └── memory-guard.ts      # 메모리 누수 감지
├── renderer/                    # Electron 렌더러
│   ├── App.tsx                  # 루트 레이아웃
│   ├── components/
│   │   ├── chat/BubbleChat.tsx
│   │   ├── scene/CharacterScene.tsx
│   │   └── panel/
│   │       ├── TokenUsagePanel.tsx
│   │       └── SystemMonitorPanel.tsx
│   ├── hooks/
│   │   ├── use-agent.ts
│   │   └── use-chat.ts
│   └── stores/agent-store.ts
├── preload/preload.ts           # IPC 브릿지
└── shared/
    ├── types.ts
    └── character-personas.ts    # 캐릭터 페르소나
```

### 🛠️ 개발 환경 설정

#### 기술 스택

| 영역 | 기술 |
|------|------|
| 프레임워크 | Electron 34 + Electron Forge |
| UI | React 18 + TypeScript 5.7 |
| 상태 관리 | Zustand 5 |
| LLM | Google Gemini (`@google/genai`), OpenAI (`openai`) |
| 빌드 | Webpack 5 |
| 스타일 | CSS (글래스모피즘, CSS 애니메이션) |

#### 설치 및 실행

```bash
# 1. 의존성 설치
pnpm install

# 2. 환경 변수 설정
cat > .env << EOF
GEMINI_API_KEY=your_gemini_api_key
OPENAI_API_KEY=your_openai_api_key  # 선택사항
EOF

# 3. 개발 모드 실행
pnpm start

# 4. macOS .dmg 빌드
pnpm make
```

#### 단축키

| 단축키 | 동작 |
|--------|------|
| `Cmd+Shift+Space` | 캐릭터 표시/숨기기 |
| `Enter` | 메시지 전송 |
| `Esc` | 채팅 닫기 |

### ✨ 주요 설계 원칙

#### 🎯 1. 관심사 분리 (Separation of Concerns)

Main 프로세스(LLM 통신, 시스템 리소스)와 Renderer 프로세스(UI, 사용자 상호작용)를 명확히 분리하고, IPC를 통해서만 통신합니다.

#### 🔧 2. 플러그인 아키텍처

`LLMProvider` 인터페이스를 통해 새로운 LLM 프로바이더를 쉽게 추가할 수 있습니다. 캐릭터 추가도 `character-personas.ts`에 항목을 추가하는 것만으로 가능합니다.

#### 🛡️ 3. 보안 우선

`contextIsolation: true`, `nodeIntegration: false` 설정으로 Renderer 프로세스의 보안을 강화했습니다. API 키는 Main 프로세스에서만 접근 가능합니다.

#### 📈 4. 관측 가능성 (Observability)

토큰 사용량 추적, 시스템 메모리 모니터링, 메모리 누수 감지 등을 통해 앱의 상태를 실시간으로 관측할 수 있습니다.

### 🎉 마무리

OpenPersona는 **데스크톱 환경에서 AI 에이전트가 어떤 형태로 존재할 수 있는지**를 탐구하는 프로젝트입니다. 단순한 챗봇을 넘어서, 개성 있는 캐릭터와의 자연스러운 대화, 멀티 LLM 지원, 그리고 체계적인 모니터링까지 포함하여 **실용적이면서도 즐거운 AI 경험**을 추구합니다.

특히 v2에서 도입할 **RAG + MCP 오케스트레이션 아키텍처**는 캐릭터 AI가 단순 대화를 넘어서 **실제 도구를 활용하고, 도메인 지식에 기반한 정확한 답변을 제공하는 진정한 AI 에이전트**로 진화하는 데 핵심적인 역할을 할 것입니다.

#### 💭 향후 로드맵

- **v2.0 — AI Agent Orchestrator**: Intent 분류, Task 계획, Context 관리 중앙 오케스트레이터
- **v2.1 — RAG 파이프라인**: Vector Store 기반 도메인 특화 컨텍스트 제공
- **v2.2 — MCP 통합**: File System, DB, Web Search 등 외부 도구 연동
- **v2.3 — 멀티 에이전트 협업**: 캐릭터 간 태스크 위임 및 협업 워크플로
- **v3.0 — 크로스 플랫폼**: Windows, Linux 지원 확대

---

> 🙏 **감사의 말씀**
> 
> OpenPersona는 오픈소스 프로젝트입니다. 관심 있으신 분들의 기여와 피드백을 환영합니다. 이 글이 데스크톱 AI 에이전트 구축에 관심 있는 분들께 도움이 되기를 바랍니다. 감사합니다.

---

## 🔗 관련 링크

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem; margin: 1.5rem 0 1rem 0;">

<div style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); border-radius: 12px; padding: 1.25rem; color: white; box-shadow: 0 4px 12px rgba(249, 115, 22, 0.2);">
  <div style="display: flex; align-items: center; margin-bottom: 0.4rem;">
    <span style="font-size: 1.4rem; margin-right: 0.6rem;">🦊</span>
    <h3 style="margin: 0; font-size: 1.05rem; font-weight: 600;">OpenPersona GitHub</h3>
  </div>
  <p style="margin: 0.4rem 0; opacity: 0.9; font-size: 0.85rem;">프로젝트 소스 코드 및 문서</p>
  <a href="https://github.com/jungtaeinn/open-persona" 
     target="_blank"
     rel="noopener noreferrer"
     style="color: white; text-decoration: none; font-weight: 500; display: inline-flex; align-items: center; gap: 0.4rem; margin-top: 0.6rem;">
    GitHub 방문 →
  </a>
</div>

<div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); border-radius: 12px; padding: 1.25rem; color: white; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);">
  <div style="display: flex; align-items: center; margin-bottom: 0.4rem;">
    <span style="font-size: 1.4rem; margin-right: 0.6rem;">⚡</span>
    <h3 style="margin: 0; font-size: 1.05rem; font-weight: 600;">Electron Forge</h3>
  </div>
  <p style="margin: 0.4rem 0; opacity: 0.9; font-size: 0.85rem;">Electron 앱 빌드 및 배포 도구</p>
  <a href="https://www.electronforge.io/" 
     target="_blank"
     rel="noopener noreferrer"
     style="color: white; text-decoration: none; font-weight: 500; display: inline-flex; align-items: center; gap: 0.4rem; margin-top: 0.6rem;">
    웹사이트 방문 →
  </a>
</div>

<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); border-radius: 12px; padding: 1.25rem; color: white; box-shadow: 0 4px 12px rgba(139, 92, 246, 0.2);">
  <div style="display: flex; align-items: center; margin-bottom: 0.4rem;">
    <span style="font-size: 1.4rem; margin-right: 0.6rem;">🔌</span>
    <h3 style="margin: 0; font-size: 1.05rem; font-weight: 600;">Model Context Protocol</h3>
  </div>
  <p style="margin: 0.4rem 0; opacity: 0.9; font-size: 0.85rem;">AI 에이전트와 외부 도구 연동 표준 프로토콜</p>
  <a href="https://modelcontextprotocol.io/" 
     target="_blank"
     rel="noopener noreferrer"
     style="color: white; text-decoration: none; font-weight: 500; display: inline-flex; align-items: center; gap: 0.4rem; margin-top: 0.6rem;">
    웹사이트 방문 →
  </a>
</div>

</div>

## 🏷️ 태그

<div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin: 1rem 0 0.5rem 0;">

<span style="background: linear-gradient(135deg, #f97316, #ea580c); color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.85rem; font-weight: 500; box-shadow: 0 2px 4px rgba(249, 115, 22, 0.2);">#ai_agent</span>

<span style="background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.85rem; font-weight: 500; box-shadow: 0 2px 4px rgba(59, 130, 246, 0.2);">#electron</span>

<span style="background: linear-gradient(135deg, #06b6d4, #0891b2); color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.85rem; font-weight: 500; box-shadow: 0 2px 4px rgba(6, 182, 212, 0.2);">#react</span>

<span style="background: linear-gradient(135deg, #8b5cf6, #7c3aed); color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.85rem; font-weight: 500; box-shadow: 0 2px 4px rgba(139, 92, 246, 0.2);">#typescript</span>

<span style="background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.85rem; font-weight: 500; box-shadow: 0 2px 4px rgba(16, 185, 129, 0.2);">#gemini</span>

<span style="background: linear-gradient(135deg, #10a37f, #0d8c6f); color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.85rem; font-weight: 500; box-shadow: 0 2px 4px rgba(16, 163, 127, 0.2);">#openai</span>

<span style="background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.85rem; font-weight: 500; box-shadow: 0 2px 4px rgba(245, 158, 11, 0.2);">#zustand</span>

<span style="background: linear-gradient(135deg, #ec4899, #db2777); color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.85rem; font-weight: 500; box-shadow: 0 2px 4px rgba(236, 72, 153, 0.2);">#rag</span>

<span style="background: linear-gradient(135deg, #ef4444, #dc2626); color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.85rem; font-weight: 500; box-shadow: 0 2px 4px rgba(239, 68, 68, 0.2);">#mcp</span>

<span style="background: linear-gradient(135deg, #84cc16, #65a30d); color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.85rem; font-weight: 500; box-shadow: 0 2px 4px rgba(132, 204, 22, 0.2);">#desktop_app</span>

</div>
