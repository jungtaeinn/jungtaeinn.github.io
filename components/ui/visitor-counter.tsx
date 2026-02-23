'use client';

import { useEffect, useState } from 'react';
import { Users } from 'lucide-react';
import { getVisitorCount, type VisitorData } from '@/lib/visitor';

/**
 * 방문자 수 표시 컴포넌트
 * @description 전체 방문자 수와 오늘 방문자 수를 함께 표시합니다.
 * API 실패 시 미노출됩니다.
 */
export default function VisitorCounter() {
  const [data, setData] = useState<VisitorData | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    getVisitorCount().then((value) => {
      if (value.total !== null) {
        setData(value);
        setIsVisible(true);
      }
    });
  }, []);

  if (!isVisible || !data) return null;

  return (
    <div className="inline-flex items-center gap-1.5 text-xs text-muted-foreground/70">
      <Users className="h-3 w-3" />
      <span>Total</span>
      <span className="tabular-nums">
        {data.total?.toLocaleString('ko-KR')}
      </span>
      {data.today !== null && (
        <>
          <span className="text-muted-foreground/40">·</span>
          <span>Today</span>
          <span className="tabular-nums">
            {data.today.toLocaleString('ko-KR')}
          </span>
        </>
      )}
    </div>
  );
}
