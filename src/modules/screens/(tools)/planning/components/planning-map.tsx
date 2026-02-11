'use client';

import { Layers, Minus, Navigation, Plus } from 'lucide-react';

interface PlanningMapProps {
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
}

export default function PlanningMap({ showFilters, setShowFilters }: PlanningMapProps) {
  return (
    <div className='group relative h-full w-full flex-1 overflow-hidden bg-[#e5e7eb]'>
      {/* Map Image / Tiling Service Placeholder */}
      <div className='absolute inset-0 bg-gray-200'>
        {/* Trong thực tế, bạn sẽ dùng Google Maps, Mapbox GL JS, hoặc Leaflet ở đây */}
        <div className="bg-[url('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/106.745,10.798,13.5,0,0/1000x800?access_token=pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjbGlqaXFqYmw wMDBqM2ZwaW5wMDIwMnJqIn0.XXX')] absolute inset-0 bg-cover bg-center opacity-80 mix-blend-multiply" />
      </div>

      {/* SVG Overlay Simulation */}
      <svg className='pointer-events-none absolute inset-0 h-full w-full opacity-60' preserveAspectRatio='none'>
        <path d='M200,200 L400,150 L500,300 L300,400 Z' fill='#fca5a5' stroke='white' strokeWidth='2' />
        <text x='320' y='280' fontSize='12' fill='#7f1d1d' fontWeight='bold'>
          ODT
        </text>

        <path d='M500,300 L600,250 L700,350 L550,450 Z' fill='#d8b4fe' stroke='white' strokeWidth='2' />
        <text x='580' y='350' fontSize='12' fill='#581c87' fontWeight='bold'>
          TMD
        </text>

        <path d='M50,300 L200,200 L300,400 L100,500 Z' fill='#86efac' stroke='white' strokeWidth='2' />
        <text x='150' y='380' fontSize='12' fill='#14532d' fontWeight='bold'>
          CX
        </text>
      </svg>

      {/* Map Controls */}
      <div className='absolute right-8 bottom-8 z-10 flex flex-col gap-2'>
        <button className='flex h-10 w-10 items-center justify-center rounded-lg bg-white text-gray-600 shadow-lg transition-colors hover:bg-gray-50'>
          <Plus className='h-5 w-5' />
        </button>
        <button className='flex h-10 w-10 items-center justify-center rounded-lg bg-white text-gray-600 shadow-lg transition-colors hover:bg-gray-50'>
          <Minus className='h-5 w-5' />
        </button>
        <button className='mt-2 flex h-10 w-10 items-center justify-center rounded-lg bg-white text-blue-600 shadow-lg transition-colors hover:bg-gray-50'>
          <Navigation className='h-5 w-5' />
        </button>
      </div>

      {/* Layer Toggle (Mobile Trigger) */}
      {!showFilters && (
        <button
          onClick={() => setShowFilters(true)}
          className='absolute top-4 left-4 z-10 flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-bold text-gray-800 shadow-lg md:hidden'
        >
          <Layers className='h-4 w-4' /> Lớp bản đồ
        </button>
      )}

      {/* Coordinates / Scale */}
      <div className='absolute right-0 bottom-0 left-0 z-10 flex justify-between bg-white/80 px-4 py-1 text-[10px] text-gray-500 backdrop-blur-sm'>
        <span>WGS84: 10.7984° N, 106.7452° E</span>
        <span>Tỷ lệ: 1:2000</span>
      </div>
    </div>
  );
}
