'use client';

import { cn } from '@/lib/twMerge'; // Giả sử bạn có utility này
import { Button } from '@mui/material';
import { ChevronDown, Info, SlidersHorizontal } from 'lucide-react';
import { FC, useState } from 'react';
import ProjectFilterSidebar, { FilterState, INITIAL_FILTERS } from './components/filters';
import ProjectCard from './components/project-card';
import { PROJECTS } from './mock';

export const FILTER_TABS = [
  { label: 'Tất cả', value: 'all' },
  { label: 'Căn hộ', value: 'apartment' },
  { label: 'Nhà phố', value: 'house' },
  { label: 'Khu đô thị', value: 'land' },
  { label: 'Nghỉ dưỡng', value: 'villa' },
];
const ProjectsScreen: FC = () => {
  // State quản lý tập trung
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Handler cập nhật filter
  const handleFilterUpdate = (newFilters: FilterState) => {
    setFilters(newFilters);
    // Tại đây có thể gọi API fetch data mới: refetch(newFilters)
  };

  const handleTabChange = (value: string) => {
    handleFilterUpdate({ ...filters, type: value });
  };

  return (
    <div className='min-h-screen bg-gray-50 pb-12'>
      {/* 1. Header Section */}
      <div className='container mx-auto mb-8 px-4 md:px-6'>
        <div className='max-w-3xl pt-8'>
          <h1 className='text-brand-primary mb-2 text-2xl font-extrabold md:text-4xl'>Dự án Bất động sản</h1>
          <p className='text-sm text-gray-500 md:text-base'>
            Khám phá danh sách các dự án đang triển khai, mở bán và đã bàn giao trên toàn quốc. Thông tin được cập nhật
            và xác thực bởi đội ngũ Aetheria.
          </p>
        </div>
      </div>

      {/* 2. Sticky Filter Bar (Top) */}
      <div className='sticky top-16 z-30 mb-8 border-y border-gray-200 bg-white py-3 shadow-sm'>
        <div className='container mx-auto flex items-center gap-3 px-4 md:px-6'>
          {/* Mobile Filter Trigger */}
          <Button
            variant='contained'
            onClick={() => setMobileFilterOpen(true)}
            className='bg-brand-primary min-w-fit px-4 font-bold normal-case lg:hidden'
            startIcon={<SlidersHorizontal className='h-4 w-4' />}
          >
            Bộ lọc
          </Button>

          {/* Scrollable Tabs */}
          <div className='scrollbar-hide flex flex-1 gap-2 overflow-x-auto'>
            {FILTER_TABS.map((tab) => (
              <Button
                key={tab.value}
                onClick={() => handleTabChange(tab.value)}
                className={cn(
                  'min-w-fit rounded-lg border px-4 py-2 text-sm font-bold whitespace-nowrap normal-case',
                  filters.type === tab.value
                    ? 'bg-primary/10 border-primary text-primary'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300',
                )}
              >
                {tab.label}
              </Button>
            ))}
          </div>

          {/* Desktop Sort */}
          <div className='ml-2 hidden shrink-0 items-center gap-2 border-l border-gray-200 pl-4 lg:flex'>
            <span className='text-sm font-medium text-gray-500'>Sắp xếp:</span>
            <button className='text-brand-primary hover:text-primary flex items-center gap-1 text-sm font-bold'>
              Mới nhất <ChevronDown className='h-4 w-4' />
            </button>
          </div>
        </div>
      </div>

      <div className='container mx-auto flex gap-8 px-4 md:px-6'>
        {/* 3. Desktop Filter Sidebar */}
        <div className='sticky top-40 hidden h-fit lg:block'>
          <ProjectFilterSidebar filters={filters} onFilterChange={handleFilterUpdate} />
        </div>

        {/* 4. Project Feed */}
        <div className='min-w-0 flex-1'>
          {/* Result Summary */}
          <div className='mb-6 flex items-center justify-between'>
            <p className='text-sm text-gray-500'>
              Hiển thị <span className='text-brand-primary font-bold'>{PROJECTS.length}</span> dự án phù hợp
            </p>
            <div className='flex items-center gap-2 rounded-lg border border-orange-100 bg-orange-50 px-3 py-1.5 text-xs text-orange-600'>
              <Info className='h-3.5 w-3.5' />
              <span>Giá bán chỉ mang tính chất tham khảo</span>
            </div>
          </div>

          {/* Grid */}
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3'>
            {PROJECTS.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {/* Load More */}
          <div className='mt-12 text-center'>
            <Button
              variant='outlined'
              size='large'
              className='text-brand-primary hover:border-brand-blue rounded-xl border-gray-200 bg-white px-8 py-3 font-bold normal-case shadow-sm'
            >
              Xem thêm 12 dự án khác
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Filter (Optional: Nếu bạn muốn làm thêm) */}
      {/* <Drawer open={mobileFilterOpen} onClose={() => setMobileFilterOpen(false)}> ... </Drawer> */}
    </div>
  );
};

export default ProjectsScreen;
