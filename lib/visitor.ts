const COUNTAPI_BASE = 'https://countapi.mileshilliard.com/api/v1';
const COUNTER_KEY_TOTAL = 'jungtaeinn-github-io-total-visitors';

function getTodayKey(): string {
  const today = new Date().toISOString().slice(0, 10);
  return `jungtaeinn-github-io-visitors-${today}`;
}

export interface VisitorData {
  total: number | null;
  today: number | null;
}

let cachedPromise: Promise<VisitorData> | null = null;

async function fetchCount(endpoint: string, key: string): Promise<number | null> {
  try {
    const res = await fetch(`${COUNTAPI_BASE}/${endpoint}/${key}`, {
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return null;
    const data = await res.json();
    const value = parseInt(data.value, 10);
    return isNaN(value) ? null : value;
  } catch {
    return null;
  }
}

/**
 * 방문자 수(전체 + 오늘)를 조회하거나 카운트를 증가시킵니다.
 * @description 세션당 1회만 hit(+1)하고, 이후에는 get으로 조회만 합니다.
 * 동일 세션 내에서 여러 번 호출해도 API 요청은 1회만 발생합니다 (캐싱된 Promise 반환).
 * 오늘 카운터는 날짜별 키(YYYY-MM-DD)를 사용하여 매일 자동 초기화됩니다.
 */
export function getVisitorCount(): Promise<VisitorData> {
  if (cachedPromise) return cachedPromise;

  cachedPromise = (async () => {
    try {
      const hasVisited = sessionStorage.getItem('_vc');
      const endpoint = hasVisited ? 'get' : 'hit';

      const [total, today] = await Promise.all([
        fetchCount(endpoint, COUNTER_KEY_TOTAL),
        fetchCount(endpoint, getTodayKey()),
      ]);

      if (!hasVisited) {
        sessionStorage.setItem('_vc', '1');
      }

      return { total, today };
    } catch {
      cachedPromise = null;
      return { total: null, today: null };
    }
  })();

  return cachedPromise;
}
