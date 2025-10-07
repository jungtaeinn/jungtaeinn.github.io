'use client';

import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

/**
 * 스크롤을 최상단으로 이동시키는 버튼 컴포넌트
 * @description 스크롤 위치에 따라 표시/숨김되며, 반응형 디자인을 지원합니다.
 */
export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  /**
   * 스크롤 위치를 감지하여 버튼 표시 여부를 결정
   */
  useEffect(() => {
    const toggleVisibility = () => {
      // 300px 이상 스크롤했을 때 버튼 표시
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // 스크롤 이벤트 리스너 등록
    window.addEventListener('scroll', toggleVisibility);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  /**
   * 최상단으로 부드럽게 스크롤
   */
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-gray-900/40 text-white shadow-lg transition-all duration-300 hover:bg-gray-900/60 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-gray-100/40 dark:text-gray-900 dark:hover:bg-gray-100/60 sm:bottom-8 sm:right-8 sm:h-12 sm:w-12"
          aria-label="맨 위로 이동"
          title="맨 위로 이동"
        >
          <ChevronUp className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
      )}
    </>
  );
}
