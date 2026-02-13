'use client';

import { useEffect } from 'react';
import { getVisitorCount } from '@/lib/visitor';

/**
 * 방문자 카운팅 전용 컴포넌트 (UI 없음)
 * @description 루트 레이아웃에 배치하여 어떤 페이지로 진입하든 방문자 수를 카운트합니다.
 * 실제 표시는 VisitorCounter 컴포넌트에서 담당합니다.
 */
export default function VisitorTracker() {
  useEffect(() => {
    getVisitorCount();
  }, []);

  return null;
}
