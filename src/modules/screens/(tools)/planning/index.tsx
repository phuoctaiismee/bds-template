'use client';

import { useState } from 'react';
import PlanningHeader from './components/planning-header';
import PlanningMap from './components/planning-map';
import PlanningSidebar from './components/planning-sidbar';

export default function PlanningScreen() {
  const [activeLayer, setActiveLayer] = useState('quy-hoach');
  const [showFilters, setShowFilters] = useState(true);

  return (
    // h-screen và overflow-hidden để đảm bảo ứng dụng full màn hình không scroll trang
    <div className='relative flex h-screen flex-col overflow-hidden bg-white'>
      <PlanningHeader />

      <div className='relative flex flex-1 overflow-hidden'>
        <PlanningSidebar
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          activeLayer={activeLayer}
          setActiveLayer={setActiveLayer}
        />

        <PlanningMap showFilters={showFilters} setShowFilters={setShowFilters} />
      </div>
    </div>
  );
}
