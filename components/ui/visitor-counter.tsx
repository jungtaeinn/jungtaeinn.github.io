'use client';

import { useEffect, useState } from 'react';
import { Users, Calendar } from 'lucide-react';

interface VisitorStats {
  todayVisitors: number;
  totalVisitors: number;
  lastVisit: string;
}

export default function VisitorCounter() {
  const [stats, setStats] = useState<VisitorStats>({
    todayVisitors: 0,
    totalVisitors: 0,
    lastVisit: '',
  });

  useEffect(() => {
    const updateVisitorStats = () => {
      const today = new Date().toDateString();
      const lastVisit = localStorage.getItem('lastVisit');
      const totalVisitors = parseInt(localStorage.getItem('totalVisitors') || '0');
      const todayVisitors = parseInt(localStorage.getItem('todayVisitors') || '0');
      const todayKey = `visitors_${today}`;

      let newTotalVisitors = totalVisitors;
      let newTodayVisitors = todayVisitors;

      // 오늘 첫 방문인지 확인
      if (lastVisit !== today) {
        // 새로운 날짜이므로 오늘 방문자 수 초기화
        newTodayVisitors = 1;
        newTotalVisitors += 1;
        
        // 오늘 방문자 수 저장
        localStorage.setItem('todayVisitors', newTodayVisitors.toString());
        localStorage.setItem('totalVisitors', newTotalVisitors.toString());
        localStorage.setItem('lastVisit', today);
        localStorage.setItem(todayKey, '1');
      } else {
        // 오늘 이미 방문했는지 확인
        const hasVisitedToday = localStorage.getItem(todayKey);
        if (!hasVisitedToday) {
          newTodayVisitors += 1;
          newTotalVisitors += 1;
          
          localStorage.setItem('todayVisitors', newTodayVisitors.toString());
          localStorage.setItem('totalVisitors', newTotalVisitors.toString());
          localStorage.setItem(todayKey, '1');
        }
      }

      setStats({
        todayVisitors: newTodayVisitors,
        totalVisitors: newTotalVisitors,
        lastVisit: today,
      });
    };

    updateVisitorStats();
  }, []);

  return (
    <div className="flex items-center justify-center gap-2 text-xs">
      <Users className="h-3 w-3 text-cyan-400" />
      <span className="text-cyan-400 font-medium">Total {stats.totalVisitors.toLocaleString('ko-KR')}</span>
      <span className="text-cyan-400">•</span>
      <Calendar className="h-3 w-3 text-green-400" />
      <span className="text-green-400 font-medium">Today {stats.todayVisitors.toLocaleString('ko-KR')}</span>
    </div>
  );
}
