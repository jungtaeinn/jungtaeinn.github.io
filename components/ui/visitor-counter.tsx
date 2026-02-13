'use client';

import { useEffect, useState } from 'react';
import { Users } from 'lucide-react';
import { getVisitorCount } from '@/lib/visitor';

/**
 * 방문자 수 표시 컴포넌트
 * @description 공유된 getVisitorCount를 통해 전체 방문자 수를 표시합니다.
 * API 실패 시 미노출됩니다.
 */
export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    getVisitorCount().then((value) => {
      if (value !== null) {
        setCount(value);
        setIsVisible(true);
      }
    });
  }, []);

  if (!isVisible || count === null) return null;

  return (
    <div className="inline-flex items-center gap-1.5 text-xs text-muted-foreground/70">
      <Users className="h-3 w-3" />
      <span className="tabular-nums">{count.toLocaleString('ko-KR')}</span>
      <span>visitors</span>
    </div>
  );
}
