/**
 * 구조화된 데이터(JSON-LD) 컴포넌트
 * @description Google과 다른 검색 엔진이 페이지 내용을 더 잘 이해할 수 있도록 하는 스키마 마크업
 */

import Script from 'next/script';

interface PersonSchema {
  name: string;
  jobTitle: string;
  description: string;
  url: string;
  email: string;
  image: string;
  sameAs: string[];
  knowsAbout: string[];
}

interface OrganizationSchema {
  name: string;
  url: string;
  logo: string;
  description: string;
  sameAs: string[];
}

interface BlogPostingSchema {
  headline: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  url: string;
  keywords?: string[];
}

interface WebSiteSchema {
  name: string;
  url: string;
  description: string;
  author: string;
}

/**
 * Person 스키마 (프로필/About 페이지용)
 */
export function PersonStructuredData({ data }: { data: PersonSchema }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: data.name,
    jobTitle: data.jobTitle,
    description: data.description,
    url: data.url,
    email: data.email,
    image: data.image,
    sameAs: data.sameAs,
    knowsAbout: data.knowsAbout,
  };

  return (
    <Script
      id="person-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Organization 스키마 (사이트 전체용)
 */
export function OrganizationStructuredData({ data }: { data: OrganizationSchema }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: data.name,
    url: data.url,
    logo: data.logo,
    description: data.description,
    sameAs: data.sameAs,
  };

  return (
    <Script
      id="organization-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * BlogPosting 스키마 (블로그 포스트용)
 */
export function BlogPostingStructuredData({ data }: { data: BlogPostingSchema }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: data.headline,
    description: data.description,
    author: {
      '@type': 'Person',
      name: data.author,
      url: 'https://jungtaeinn.github.io/about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'jungtaeinn.github.io',
      logo: {
        '@type': 'ImageObject',
        url: 'https://jungtaeinn.github.io/images/profile.png',
      },
    },
    datePublished: data.datePublished,
    dateModified: data.dateModified || data.datePublished,
    image: data.image || 'https://jungtaeinn.github.io/images/profile.png',
    url: data.url,
    keywords: data.keywords?.join(', '),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': data.url,
    },
  };

  return (
    <Script
      id="blog-posting-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * WebSite 스키마 (메인 페이지용)
 */
export function WebSiteStructuredData({ data }: { data: WebSiteSchema }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: data.name,
    url: data.url,
    description: data.description,
    author: {
      '@type': 'Person',
      name: data.author,
      url: `${data.url}/about`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${data.url}/posts?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <Script
      id="website-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * BreadcrumbList 스키마 (브레드크럼용)
 */
export function BreadcrumbStructuredData({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <Script
      id="breadcrumb-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

