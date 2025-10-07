import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * 클래스명을 병합하고 충돌을 해결하는 유틸리티 함수
 * @description clsx와 tailwind-merge를 조합하여 클래스명을 안전하게 병합
 * @param {...ClassValue[]} inputs - 병합할 클래스명들
 * @returns {string} 병합된 클래스명 문자열
 * @example
 * ```typescript
 * cn('px-2 py-1', 'px-4', { 'bg-red-500': isError })
 * // 결과: 'py-1 px-4 bg-red-500' (px-2는 px-4로 덮어씌워짐)
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * 날짜 문자열을 한국어 형식으로 포맷팅
 * @param {string} dateString - ISO 형식의 날짜 문자열
 * @returns {string} 한국어 형식의 날짜 문자열 (예: "2024년 1월 15일")
 * @example
 * ```typescript
 * formatDate('2024-01-15')
 * // 결과: "2024년 1월 15일"
 * ```
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * 날짜 문자열을 짧은 한국어 형식으로 포맷팅
 * @param {string} dateString - ISO 형식의 날짜 문자열
 * @returns {string} 짧은 한국어 형식의 날짜 문자열 (예: "2024.01.15")
 * @example
 * ```typescript
 * formatDateShort('2024-01-15')
 * // 결과: "2024.01.15"
 * ```
 */
export function formatDateShort(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}
