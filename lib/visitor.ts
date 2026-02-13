const COUNTAPI_BASE = 'https://countapi.mileshilliard.com/api/v1';
const COUNTER_KEY = 'jungtaeinn-github-io-total-visitors';

let cachedPromise: Promise<number | null> | null = null;

/**
 * 방문자 수를 조회하거나 카운트를 증가시킵니다.
 * @description 세션당 1회만 hit(+1)하고, 이후에는 get으로 조회만 합니다.
 * 동일 세션 내에서 여러 번 호출해도 API 요청은 1회만 발생합니다 (캐싱된 Promise 반환).
 * @returns {Promise<number | null>} 방문자 수 또는 실패 시 null
 */
export function getVisitorCount(): Promise<number | null> {
  if (cachedPromise) return cachedPromise;

  cachedPromise = (async () => {
    try {
      const hasVisited = sessionStorage.getItem('_vc');
      const endpoint = hasVisited ? 'get' : 'hit';

      const response = await fetch(
        `${COUNTAPI_BASE}/${endpoint}/${COUNTER_KEY}`,
        { signal: AbortSignal.timeout(5000) }
      );

      if (!response.ok) throw new Error('API request failed');

      const data = await response.json();
      const value = parseInt(data.value, 10);

      if (isNaN(value)) throw new Error('Invalid value');

      if (!hasVisited) {
        sessionStorage.setItem('_vc', '1');
      }

      return value;
    } catch {
      cachedPromise = null; // 실패 시 재시도 가능하도록 캐시 초기화
      return null;
    }
  })();

  return cachedPromise;
}
