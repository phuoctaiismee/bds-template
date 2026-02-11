'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, Check, ChevronDown, Info, Layers } from 'lucide-react';
import { LOCATIONS, MAP_LAYERS } from '../constants';

interface PlanningSidebarProps {
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  activeLayer: string;
  setActiveLayer: (id: string) => void;
}

export default function PlanningSidebar({
  showFilters,
  setShowFilters,
  activeLayer,
  setActiveLayer,
}: PlanningSidebarProps) {
  return (
    <AnimatePresence>
      {showFilters && (
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className='absolute top-4 bottom-4 left-4 z-10 w-80 overflow-y-auto rounded-2xl border-gray-200 bg-white p-5 shadow-2xl md:relative md:top-0 md:bottom-0 md:left-0 md:rounded-none md:border-r md:shadow-none'
        >
          <div className='mb-6 flex items-center justify-between md:hidden'>
            <h3 className='text-lg font-bold'>Bộ lọc bản đồ</h3>
            <button onClick={() => setShowFilters(false)}>
              <ArrowLeft className='h-5 w-5' />
            </button>
          </div>

          <div className='space-y-6'>
            {/* Location Selects */}
            <div>
              <label className='mb-2 block text-xs font-bold text-gray-500 uppercase'>Khu vực</label>
              <div className='space-y-3'>
                {['city', 'district', 'ward'].map((type) => (
                  <div className='relative' key={type}>
                    <select className='focus:border-primary w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm font-bold outline-none'>
                      {LOCATIONS[type as keyof typeof LOCATIONS].map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                    <ChevronDown className='pointer-events-none absolute top-3.5 right-3 h-4 w-4 text-gray-400' />
                  </div>
                ))}
              </div>
            </div>

            {/* Layers */}
            <div>
              <label className='mb-3 block text-xs font-bold text-gray-500 uppercase'>Loại bản đồ</label>
              <div className='space-y-2'>
                {MAP_LAYERS.map((layer) => (
                  <div
                    key={layer.id}
                    onClick={() => setActiveLayer(layer.id)}
                    className={`flex cursor-pointer items-center justify-between rounded-xl border p-3 transition-all ${
                      activeLayer === layer.id ? 'border-primary bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className='flex items-center gap-3'>
                      <Layers className={`h-4 w-4 ${activeLayer === layer.id ? 'text-primary' : 'text-gray-400'}`} />
                      <span
                        className={`text-sm font-bold ${activeLayer === layer.id ? 'text-primary' : 'text-gray-600'}`}
                      >
                        {layer.label}
                      </span>
                    </div>
                    {activeLayer === layer.id && <Check className='text-primary h-4 w-4' />}
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div>
              <label className='mb-3 block text-xs font-bold text-gray-500 uppercase'>Chú thích màu sắc</label>
              <div className='grid grid-cols-2 gap-2 text-xs text-gray-600'>
                <div className='flex items-center gap-2'>
                  <span className='h-3 w-3 rounded-full bg-[#fca5a5]'></span> Đất ở (ODT)
                </div>
                <div className='flex items-center gap-2'>
                  <span className='h-3 w-3 rounded-full bg-[#fde047]'></span> Đất lúa (LUC)
                </div>
                <div className='flex items-center gap-2'>
                  <span className='h-3 w-3 rounded-full bg-[#86efac]'></span> Đất cây xanh
                </div>
                <div className='flex items-center gap-2'>
                  <span className='h-3 w-3 rounded-full bg-[#93c5fd]'></span> Đất mặt nước
                </div>
                <div className='flex items-center gap-2'>
                  <span className='h-3 w-3 rounded-full bg-[#d8b4fe]'></span> Đất thương mại
                </div>
                <div className='flex items-center gap-2'>
                  <span className='h-3 w-3 rounded-full bg-[#cbd5e1]'></span> Đất giao thông
                </div>
              </div>
            </div>
          </div>

          <div className='mt-8 rounded-xl border border-primary/20 bg-primary/10 p-4'>
            <p className='text-primary text-xs leading-relaxed'>
              <Info className='mr-1 inline h-3 w-3' />
              Dữ liệu được cập nhật từ cổng thông tin quy hoạch quốc gia. Để có thông tin chính xác nhất, vui lòng liên
              hệ cơ quan chức năng.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
