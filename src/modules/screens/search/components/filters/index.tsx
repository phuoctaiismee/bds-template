import { RotateCcw } from 'lucide-react';
import FilterFormContent from './formats';

const DesktopFilterSidebar: React.FC<{ mode: 'sale' | 'rent' }> = ({ mode }) => {
  return (
    <div className='sticky top-24 hidden h-fit w-72 shrink-0 rounded-2xl border border-gray-200 bg-white lg:block'>
      <div className='p-6'>
        <div className='mb-6 flex items-center justify-between'>
          <h3 className='text-brand-primary text-lg font-bold'>Bộ lọc {mode === 'rent' ? 'thuê' : ''}</h3>
          <button className='hover:text-brand-blue flex items-center gap-1 text-xs font-bold text-gray-400'>
            <RotateCcw className='h-3 w-3' /> Đặt lại
          </button>
        </div>
        <FilterFormContent mode={mode} />
      
      </div>
    </div>
  );
};

export default DesktopFilterSidebar;
