---
title: "🤖 ChatGPT Apps SDK를 활용한 아모레몰 통합 - MCP 서버 기반 AI 쇼핑 어시스턴트 구축"
date: "2026-01-28"
excerpt: "OpenAI ChatGPT Apps SDK와 Model Context Protocol(MCP)을 활용하여 ChatGPT 내에서 아모레몰 상품을 추천하고 검색할 수 있는 AI 쇼핑 어시스턴트를 구축한 아키텍처와 구현 과정을 공유합니다."
tags: ["ChatGPT", "OpenAI", "Apps SDK", "MCP", "Model Context Protocol", "AI", "E-commerce", "Amorepacific", "React", "Python", "FastMCP"]
category: "Architecture"
featured: true
coverImage: "/images/posts/amoremall-in-sdk/amoremall_in_chatgpt_cover.png"
---

### 📅 글 개요

OpenAI가 ChatGPT에 Apps 기능을 도입하면서, AI 어시스턴트가 직접 외부 서비스와 연동하여 실시간 정보를 제공할 수 있는 새로운 가능성이 열렸습니다. [OpenAI의 Apps in ChatGPT 소개](https://openai.com/ko-KR/index/introducing-apps-in-chatgpt/)에 따르면, 개발자들은 **Model Context Protocol (MCP)**을 통해 ChatGPT와 자신의 서비스를 연결할 수 있게 되었습니다.

이러한 기술적 배경에서, 저희는 **아모레몰의 상품 정보를 ChatGPT에서 직접 조회하고 추천할 수 있는 AI 쇼핑 어시스턴트**를 구축했습니다. 사용자는 ChatGPT 대화창에서 자연어로 "인기 상품 추천해줘" 또는 "설화수 제품 찾아줘"라고 요청하면, ChatGPT가 아모레몰 MCP 서버를 통해 실시간으로 상품 정보를 가져와 시각적인 위젯으로 표시합니다.

> 💡 **이 글에서 다룰 내용**
> - ChatGPT Apps SDK와 MCP(Model Context Protocol) 개요
> - 아모레몰 MCP 서버 아키텍처 설계
> - Python FastMCP 서버와 React Widget 통합 구조
> - 데이터 플로우 및 통신 메커니즘
> - 실제 구현 데모 및 사용 사례

### 🎯 ChatGPT Apps SDK와 MCP 개요

#### 🤖 Apps in ChatGPT란?

[OpenAI의 공식 발표](https://openai.com/ko-KR/index/introducing-apps-in-chatgpt/)에 따르면, ChatGPT Apps는 **AI 어시스턴트가 외부 서비스와 직접 통신하여 실시간 정보를 제공**할 수 있게 해주는 기능입니다. 이를 통해 ChatGPT는 단순한 대화형 AI를 넘어서 **실제 액션을 수행하는 에이전트**로 진화할 수 있습니다.

**핵심 특징**:
- **Model Context Protocol (MCP)**: ChatGPT와 외부 서비스를 연결하는 표준 프로토콜
- **Widget 기반 UI**: 서버에서 반환한 데이터를 시각적인 위젯으로 렌더링
- **자연어 인터페이스**: 사용자는 자연어로 요청하고, ChatGPT가 적절한 Tool을 자동으로 호출

#### 🔌 Model Context Protocol (MCP)

MCP는 ChatGPT와 외부 서비스 간의 통신을 위한 표준 프로토콜입니다. 다음과 같은 핵심 개념으로 구성됩니다:

- **Tools**: ChatGPT가 호출할 수 있는 함수 (예: `get_popular_products`, `search_products`)
- **Resources**: Widget UI 마크업을 제공하는 리소스 (예: `ui://widget/product-carousel.html`)
- **Streamable HTTP**: HTTP 기반의 실시간 통신 메커니즘

### 🏗️ 아키텍처 설계

아모레몰 ChatGPT Apps 통합은 다음과 같은 계층 구조로 설계되었습니다:

<div style="text-align: center; margin: 2rem 0;">
  <img src="/images/posts/amoremall-in-sdk/architecture-diagram.png" alt="아모레몰 ChatGPT Apps 통합 아키텍처 - ChatGPT Client, MCP Server, Widget UI, External API 간의 데이터 흐름" style="max-width: 100%; height: auto;" />
</div>

#### 📊 아키텍처 구성 요소

**1. MCP Server (Python FastMCP)**
- **역할**: ChatGPT와의 통신을 담당하는 서버
- **기술 스택**: Python, FastMCP, Pydantic, uvicorn
- **주요 기능**:
  - Tool 목록 제공 (`list_tools`)
  - Resource 목록 제공 (`list_resources`)
  - Tool 실행 처리 (`call_tool`)
  - Resource 읽기 처리 (`read_resource`)

**2. Widget UI (React + TypeScript)**
- **역할**: 상품 정보를 시각적으로 표시하는 위젯
- **기술 스택**: React, TypeScript, Vite, Tailwind CSS
- **주요 컴포넌트**:
  - `ProductCarousel`: 인기 상품 캐러셀 (Inline Carousel)
  - `ProductCard`: 단일 상품 상세 카드 (Inline Card)
  - `CartSummary`: 장바구니 요약 (Inline Card)

**3. Product Service**
- **역할**: Amoremall API Gateway를 통한 상품 정보 Data API와의 통신 및 비즈니스 로직 처리
- **기능**:
  - 인기 상품 조회
  - 상품 검색
  - 상품 상세 정보 조회

**4. Amoremall API Gateway**
- **역할**: 상품 정보 Data API와의 통신을 담당하는 게이트웨이
- **기능**:
  - API 요청 라우팅 및 인증 처리
  - 상품 정보 Data 조회 및 반환

### 🔄 데이터 플로우

ChatGPT에서 사용자가 요청을 보내면 다음과 같은 데이터 플로우가 발생합니다:

<div style="text-align: center; margin: 2rem 0;">
  <img src="/images/posts/amoremall-in-sdk/data-flow-diagram.png" alt="아모레몰 ChatGPT Apps 데이터 플로우 - 사용자 요청부터 Widget 렌더링까지의 시퀀스 다이어그램" style="max-width: 100%; height: auto;" />
</div>

#### 🔑 핵심 통신 메커니즘

**1. Tool 정의 및 메타데이터**

각 Tool은 `_meta` 필드에 Widget 정보를 포함합니다:

```python
types.Tool(
    name="get_popular_products",
    description="아모레몰에서 인기 있는 추천 상품 목록을 조회합니다.",
    inputSchema={...},
    _meta={
        "openai/outputTemplate": "ui://widget/product-carousel.html",
        "openai/widgetAccessible": True,
    }
)
```

**2. Tool 실행 결과**

Tool 실행 시 `structuredContent`에 데이터를 포함하여 반환합니다:

```python
types.CallToolResult(
    content=[types.TextContent(type="text", text="인기 상품을 찾았습니다.")],
    structuredContent={
        "products": [...],
        "meta": {...}
    }
)
```

**3. Widget HTML 로드**

ChatGPT는 `outputTemplate` URI를 기반으로 Resource를 요청하고, HTML을 렌더링합니다.

### 💻 구현 상세

#### 🐍 MCP Server 구현

**FastMCP 기반 서버 구조**:

```python
from mcp.server.fastmcp import FastMCP

mcp = FastMCP(
    name="amoremall-app",
    stateless_http=True,
)

# Tool 목록 제공
@mcp._mcp_server.list_tools()
async def _list_tools() -> List[types.Tool]:
    return [
        types.Tool(
            name="get_popular_products",
            description="...",
            inputSchema=GET_POPULAR_PRODUCTS_SCHEMA,
            _meta={
                "openai/outputTemplate": "ui://widget/product-carousel.html",
                "openai/widgetAccessible": True,
            }
        )
    ]

# Tool 실행 처리
async def _call_tool_request(req: types.CallToolRequest) -> types.ServerResult:
    tool_name = req.params.name
    arguments = req.params.arguments or {}
    
    if tool_name == "get_popular_products":
        # Amoremall API Gateway를 통해 상품 정보 Data API 호출
        products = await product_service.get_popular_products(
            category=arguments.get("category", "all"),
            limit=arguments.get("limit", 6),
        )
        return types.ServerResult(
            types.CallToolResult(
                structuredContent={
                    "products": [p.model_dump() for p in products],
                }
            )
        )
```

#### ⚛️ Widget UI 구현

**React 컴포넌트 구조**:

```tsx
// widgets/src/components/ProductCarousel.tsx
export const ProductCarousel = memo(function ProductCarousel({ products }) {
  return (
    <div className="product-carousel">
      {products.map((product) => (
        <ProductCard key={product.onlineProdSn} product={product} />
      ))}
    </div>
  );
});

// widgets/src/entries/product-carousel.tsx
import { ProductCarousel } from '@/components';
import { useOpenAI } from '@/hooks';

function App() {
  const { toolOutput } = useOpenAI<{ products: Product[] }>();
  return <ProductCarousel products={toolOutput?.products || []} />;
}
```

**Vite 빌드 설정**:

Widget은 Vite의 Single File Plugin을 사용하여 단일 HTML 파일로 빌드됩니다:

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [
    viteSingleFile({ removeViteModuleLoader: true }),
  ],
  build: {
    rollupOptions: {
      input: 'src/entries/product-carousel.tsx',
      output: {
        entryFileNames: '[name].html',
      },
    },
  },
});
```

### 🎬 실제 사용 데모

다음은 ChatGPT에서 아모레몰 상품을 조회하는 실제 사용 예시입니다:

<video controls style="width: 100%; max-width: 800px; margin: 2rem auto; display: block;">
  <source src="/images/posts/amoremall-in-sdk/apps_in_sdk_amoremall.mov" type="video/mp4">
  브라우저가 비디오 태그를 지원하지 않습니다.
</video>

**사용 시나리오**:

1. **인기 상품 추천**
   ```
   사용자: "@amoremall 인기있는 상품을 추천해줘"
   ChatGPT: [ProductCarousel 위젯 표시]
   ```

2. **카테고리별 검색**
   ```
   사용자: "스킨케어 베스트셀러 보여줘"
   ChatGPT: [스킨케어 카테고리의 인기 상품 캐러셀 표시]
   ```

3. **키워드 검색**
   ```
   사용자: "설화수 제품 찾아줘"
   ChatGPT: [설화수 브랜드 상품 검색 결과 캐러셀 표시]
   ```

4. **상품 상세 조회**
   ```
   사용자: "이 상품의 상세 정보 알려줘"
   ChatGPT: [ProductCard 위젯으로 상세 정보 표시]
   ```

### ✨ 주요 특징 및 이점

#### 🎯 1. 자연어 인터페이스

사용자는 복잡한 검색 조건을 입력할 필요 없이, 자연스러운 대화로 원하는 상품을 찾을 수 있습니다.

#### 🚀 2. 실시간 데이터 연동

ChatGPT가 직접 아모레몰 API를 호출하여 최신 상품 정보를 제공합니다.

#### 🎨 3. 시각적 위젯 UI

텍스트 기반 응답을 넘어서, 실제 상품 이미지와 정보가 포함된 인터랙티브한 위젯을 제공합니다.

#### 🔧 4. 확장 가능한 아키텍처

새로운 Tool과 Widget을 추가하여 기능을 확장할 수 있습니다.

### 🛠️ 개발 환경 설정

#### 필수 요구사항

- Python 3.10 이상
- Node.js 20 이상
- pnpm (패키지 매니저)
- ngrok (ChatGPT 연동용)

#### 설치 및 실행

```bash
# 1. Python 가상환경 설정
cd apps/amoremall-in-sdk
uv venv
source .venv/bin/activate
uv pip install -e ".[dev]"

# 2. Widget UI 의존성 설치
cd widgets
pnpm install
pnpm build:all

# 3. MCP 서버 실행
cd ..
python -m server.main

# 4. ngrok 터널 설정 (ChatGPT 연동용)
ngrok http 8787 --host-header=localhost:8787

# 5. ChatGPT에 커넥터 등록
# Settings → Connectors → Create
# URL: https://YOUR_NGROK_URL/mcp
```

### 📋 OpenAI Guidelines 준수

#### UX Principles

- ✅ **Atomic actions**: 각 Tool은 단일 목적 수행
- ✅ **Conversational leverage**: 자연어 요청 지원
- ✅ **Native fit**: ChatGPT 대화 흐름에 자연스럽게 통합
- ✅ **readOnlyHint**: 읽기 전용 Tool은 `readOnlyHint=True` 설정

#### UI Guidelines

- ✅ **Display Modes**: Inline Carousel, Inline Card 사용
- ✅ **System Colors**: ChatGPT 시스템 색상 사용
- ✅ **Typography**: 시스템 폰트 스택 사용
- ✅ **Accessibility**: WCAG AA 준수, 키보드 접근성
- ✅ **MIME Type**: `text/html+skybridge` 사용

### 🎉 마무리

ChatGPT Apps SDK와 MCP를 활용한 아모레몰 통합을 통해, **AI 어시스턴트가 실제 쇼핑 서비스와 연동하여 사용자에게 실시간 상품 정보를 제공**할 수 있는 새로운 경험을 구현했습니다.

이러한 접근 방식은 단순한 정보 제공을 넘어서, **AI가 실제 액션을 수행하는 에이전트**로 진화하는 미래를 보여줍니다. 특히 이커머스 분야에서는 사용자가 자연어로 원하는 상품을 찾고, AI가 실시간으로 추천하고 비교해주는 **차세대 쇼핑 경험**을 제공할 수 있습니다.

#### 💭 향후 전망

- **개인화 추천**: 사용자의 대화 히스토리를 기반으로 한 맞춤형 상품 추천
- **장바구니 통합**: ChatGPT 내에서 직접 장바구니에 추가하는 기능
- **결제 연동**: AI 어시스턴트를 통한 원클릭 결제 경험
- **멀티 브랜드 확장**: 아모레몰뿐만 아니라 다양한 브랜드와의 통합

---

> 🙏 **감사의 말씀**
> 
> 이 글을 읽으시는 분들께서도 위 글이 조금이나마 도움이 되기를 바랍니다. 감사합니다.

---

## 🔗 관련 링크

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem; margin: 1.5rem 0 1rem 0;">

<div style="background: linear-gradient(135deg, #10a37f 0%, #0d8c6f 100%); border-radius: 12px; padding: 1.25rem; color: white; box-shadow: 0 4px 12px rgba(16, 163, 127, 0.2);">
  <div style="display: flex; align-items: center; margin-bottom: 0.4rem;">
    <span style="font-size: 1.4rem; margin-right: 0.6rem;">🤖</span>
    <h3 style="margin: 0; font-size: 1.05rem; font-weight: 600;">OpenAI Apps in ChatGPT</h3>
  </div>
  <p style="margin: 0.4rem 0; opacity: 0.9; font-size: 0.85rem;">ChatGPT Apps SDK 공식 소개 및 가이드</p>
  <a href="https://openai.com/ko-KR/index/introducing-apps-in-chatgpt/" 
     target="_blank"
     rel="noopener noreferrer"
     style="color: white; text-decoration: none; font-weight: 500; display: inline-flex; align-items: center; gap: 0.4rem; margin-top: 0.6rem;">
    웹사이트 방문 →
  </a>
</div>

<div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); border-radius: 12px; padding: 1.25rem; color: white; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);">
  <div style="display: flex; align-items: center; margin-bottom: 0.4rem;">
    <span style="font-size: 1.4rem; margin-right: 0.6rem;">📚</span>
    <h3 style="margin: 0; font-size: 1.05rem; font-weight: 600;">OpenAI Apps SDK Quickstart</h3>
  </div>
  <p style="margin: 0.4rem 0; opacity: 0.9; font-size: 0.85rem;">MCP 서버 구축을 위한 빠른 시작 가이드</p>
  <a href="https://developers.openai.com/apps-sdk/quickstart" 
     target="_blank"
     rel="noopener noreferrer"
     style="color: white; text-decoration: none; font-weight: 500; display: inline-flex; align-items: center; gap: 0.4rem; margin-top: 0.6rem;">
    웹사이트 방문 →
  </a>
</div>

<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); border-radius: 12px; padding: 1.25rem; color: white; box-shadow: 0 4px 12px rgba(139, 92, 246, 0.2);">
  <div style="display: flex; align-items: center; margin-bottom: 0.4rem;">
    <span style="font-size: 1.4rem; margin-right: 0.6rem;">💻</span>
    <h3 style="margin: 0; font-size: 1.05rem; font-weight: 600;">OpenAI Apps SDK Examples</h3>
  </div>
  <p style="margin: 0.4rem 0; opacity: 0.9; font-size: 0.85rem;">공식 예제 코드 및 구현 참고 자료</p>
  <a href="https://github.com/openai/openai-apps-sdk-examples" 
     target="_blank"
     rel="noopener noreferrer"
     style="color: white; text-decoration: none; font-weight: 500; display: inline-flex; align-items: center; gap: 0.4rem; margin-top: 0.6rem;">
    GitHub 방문 →
  </a>
</div>

</div>

## 🏷️ 태그

<div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin: 1rem 0 0.5rem 0;">

<span style="background: linear-gradient(135deg, #10a37f, #0d8c6f); color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.85rem; font-weight: 500; box-shadow: 0 2px 4px rgba(16, 163, 127, 0.2);">#chatgpt</span>

<span style="background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.85rem; font-weight: 500; box-shadow: 0 2px 4px rgba(59, 130, 246, 0.2);">#openai</span>

<span style="background: linear-gradient(135deg, #8b5cf6, #7c3aed); color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.85rem; font-weight: 500; box-shadow: 0 2px 4px rgba(139, 92, 246, 0.2);">#apps_sdk</span>

<span style="background: linear-gradient(135deg, #ec4899, #db2777); color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.85rem; font-weight: 500; box-shadow: 0 2px 4px rgba(236, 72, 153, 0.2);">#mcp</span>

<span style="background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.85rem; font-weight: 500; box-shadow: 0 2px 4px rgba(245, 158, 11, 0.2);">#ai</span>

<span style="background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.85rem; font-weight: 500; box-shadow: 0 2px 4px rgba(16, 185, 129, 0.2);">#ecommerce</span>

<span style="background: linear-gradient(135deg, #ef4444, #dc2626); color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.85rem; font-weight: 500; box-shadow: 0 2px 4px rgba(239, 68, 68, 0.2);">#amorepacific</span>

<span style="background: linear-gradient(135deg, #06b6d4, #0891b2); color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.85rem; font-weight: 500; box-shadow: 0 2px 4px rgba(6, 182, 212, 0.2);">#react</span>

<span style="background: linear-gradient(135deg, #84cc16, #65a30d); color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.85rem; font-weight: 500; box-shadow: 0 2px 4px rgba(132, 204, 22, 0.2);">#python</span>

</div>
