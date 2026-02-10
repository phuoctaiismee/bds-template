import { Button, Checkbox, Radio, Slider } from '@mui/material';
import { MapPin, PawPrint } from 'lucide-react';
import { FC, useState } from 'react';

// --- Types & Constants ---
interface FilterState {
  location: string;
  priceRange: number[];
  areaRange: string[];
  furniture: string;
  leaseTerm: string;
  amenities: string[];
  direction: string[];
  legal: string[];
}

const INITIAL_FILTERS: FilterState = {
  location: '',
  priceRange: [0, 100], // Mặc định 0 - 100
  areaRange: [],
  furniture: '',
  leaseTerm: '',
  amenities: [],
  direction: [],
  legal: [],
};

const DIRECTIONS = ['Đông', 'Tây', 'Nam', 'Bắc', 'Đông Nam', 'Đông Bắc', 'Tây Nam', 'Tây Bắc'];
const LEGAL_TYPES = ['Sổ hồng riêng', 'HĐMB', 'Đang chờ sổ'];

const FilterFormContent: FC<{ mode: 'sale' | 'rent'; onApply?: (filters: FilterState) => void }> = ({
  mode,
  onApply,
}) => {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);

  // --- Handlers ---
  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setFilters((prev) => ({ ...prev, priceRange: newValue as number[] }));
  };

  const handleInputChange = (field: keyof FilterState, value: any) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  // Xử lý chọn nhiều (Checkbox logic)
  const handleMultiSelect = (field: 'areaRange' | 'amenities' | 'direction' | 'legal', value: string) => {
    setFilters((prev) => {
      const list = prev[field];
      const newList = list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
      return { ...prev, [field]: newList };
    });
  };

  // Helper check xem có đang chọn không
  const isSelected = (field: 'areaRange' | 'amenities' | 'direction' | 'legal', value: string) =>
    filters[field].includes(value);

  return (
    <div className='space-y-8 p-1'>
      {/* 1. Location (Input thường giữ nguyên style) */}
      <div>
        <label className='mb-3 block text-sm font-bold text-gray-700'>Khu vực</label>
        <div className='relative'>
          <MapPin className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400' />
          <input
            type='text'
            placeholder='Nhập Phường/Quận...'
            value={filters.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            className='focus:border-primary w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pr-3 pl-9 text-sm transition-all outline-none'
          />
        </div>
      </div>

      {/* 2. Price Range (Dùng MUI Slider nhưng giữ layout cũ) */}
      <div>
        <label className='mb-3 flex justify-between text-sm font-bold text-gray-700'>
          <span>{mode === 'rent' ? 'Giá thuê (Triệu/tháng)' : 'Mức giá (Tỷ)'}</span>
          <span className='text-primary font-bold'>
            {filters.priceRange[0]} - {filters.priceRange[1]} {mode === 'rent' ? 'Tr' : 'Tỷ'}
          </span>
        </label>

        <Slider
          value={filters.priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay='auto'
          min={0}
          max={mode === 'rent' ? 100 : 50}
          className='text-primary' // Tailwind color override
          sx={{
            height: 8,
            '& .MuiSlider-thumb': {
              backgroundColor: '#fff',
              border: '2px solid currentColor',
              width: 20,
              height: 20,
            },
            '& .MuiSlider-track': {
              border: 'none',
            },
            '& .MuiSlider-rail': {
              opacity: 1,
              backgroundColor: '#e5e7eb', // gray-200
            },
          }}
        />

        <div className='grid grid-cols-2 gap-3'>
          <div className='relative'>
            <span className='absolute top-2.5 left-3 text-xs text-gray-400'>Từ</span>
            <input
              type='number'
              value={filters.priceRange[0]}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, priceRange: [Number(e.target.value), prev.priceRange[1]] }))
              }
              className='focus:border-primary w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pr-3 pl-8 text-right text-sm font-bold outline-none'
            />
          </div>
          <div className='relative'>
            <span className='absolute top-2.5 left-3 text-xs text-gray-400'>Đến</span>
            <input
              type='number'
              value={filters.priceRange[1]}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, priceRange: [prev.priceRange[0], Number(e.target.value)] }))
              }
              className='focus:border-primary w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pr-3 pl-8 text-right text-sm font-bold outline-none'
            />
          </div>
        </div>
      </div>

      {/* 3. RENT SPECIFIC FILTERS */}
      {mode === 'rent' && (
        <>
          <div>
            <label className='mb-3 block text-sm font-bold text-gray-700'>Nội thất</label>
            <div className='space-y-3'>
              {[
                { id: 'full', label: 'Đầy đủ nội thất' },
                { id: 'basic', label: 'Nội thất cơ bản' },
                { id: 'none', label: 'Nhà trống' },
              ].map((f) => (
                <label
                  key={f.id}
                  className='flex cursor-pointer items-center gap-1.5 rounded-lg border border-gray-100 p-2 transition-colors hover:bg-gray-50'
                >
                  <Radio
                    checked={filters.furniture === f.id}
                    onChange={() => handleInputChange('furniture', f.id)}
                    size='small'
                    sx={{
                      padding: 0,
                      color: '#d1d5db', // gray-300
                      '&.Mui-checked': { color: 'var(--color-primary, #0ea5e9)' }, // Fallback blue
                    }}
                  />
                  <span className='text-sm font-normal text-gray-700'>{f.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className='mb-3 block text-sm font-bold text-gray-700'>Thời hạn thuê</label>
            <div className='flex flex-wrap gap-2'>
              {['< 6 Tháng', '6 Tháng - 1 Năm', '> 1 Năm'].map((t) => (
                <Button
                  key={t}
                  onClick={() => handleInputChange('leaseTerm', filters.leaseTerm === t ? '' : t)}
                  className={`rounded-lg border px-3 py-2 text-xs font-bold transition-all ${
                    filters.leaseTerm === t
                      ? 'border-primary text-primary bg-primary/5'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {t}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <label className='mb-3 block text-sm font-bold text-gray-700'>Tiện ích khác</label>
            <div className='space-y-3'>
              <label className='flex cursor-pointer items-center gap-1.5 rounded-lg border border-gray-100 p-3 transition-colors hover:bg-gray-50'>
                <Checkbox
                  checked={filters.amenities.includes('pet')}
                  onChange={() => handleMultiSelect('amenities', 'pet')}
                  size='small'
                  sx={{
                    padding: 0,
                    color: '#d1d5db',
                    '&.Mui-checked': { color: 'var(--color-primary, #0ea5e9)' },
                  }}
                />
                <span className='flex items-center gap-2 text-sm font-normal text-gray-700'>
                  <PawPrint className='h-4 w-4 text-gray-400' /> Cho phép thú cưng
                </span>
              </label>
            </div>
          </div>
        </>
      )}

      {/* 4. SALE SPECIFIC FILTERS */}
      {mode === 'sale' && (
        <>
          <div>
            <label className='mb-3 block text-sm font-bold text-gray-700'>Hướng nhà</label>
            <div className='grid grid-cols-2 gap-3'>
              {DIRECTIONS.map((d) => (
                <label
                  key={d}
                  className='flex cursor-pointer items-center gap-1.5 rounded-lg border border-gray-100 p-1.5 transition-colors hover:bg-gray-50'
                >
                  <Checkbox
                    checked={isSelected('direction', d)}
                    onChange={() => handleMultiSelect('direction', d)}
                    size='small'
                    sx={{
                      padding: 0,
                      color: '#d1d5db',
                      '&.Mui-checked': { color: 'var(--color-primary, #0ea5e9)' },
                    }}
                  />
                  <span className='text-sm font-normal text-gray-700'>{d}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className='mb-3 block text-sm font-bold text-gray-700'>Pháp lý</label>
            <div className='space-y-3'>
              {LEGAL_TYPES.map((l) => (
                <label
                  key={l}
                  className='flex cursor-pointer items-center justify-start gap-1.5 rounded-lg border border-gray-100 p-2 transition-colors hover:bg-gray-50'
                >
                  <Checkbox
                    checked={isSelected('legal', l)}
                    onChange={() => handleMultiSelect('legal', l)}
                    size='small'
                    sx={{
                      padding: 0,
                      color: '#d1d5db',
                      '&.Mui-checked': { color: 'var(--color-primary, #0ea5e9)' },
                    }}
                  />
                  <span className='text-sm font-normal text-gray-700'>{l}</span>
                </label>
              ))}
            </div>
          </div>
        </>
      )}

      {/* 5. Common: Area */}
      <div>
        <label className='mb-3 block text-sm font-bold text-gray-700'>Diện tích (m²)</label>
        <div className='flex flex-wrap gap-2'>
          {['< 30', '30 - 50', '50 - 80', '80 - 100', '> 100'].map((r) => (
            <Button
              key={r}
              onClick={() => handleMultiSelect('areaRange', r)}
              className={`rounded-lg border px-4 py-2 text-xs font-bold transition-all ${
                isSelected('areaRange', r)
                  ? 'border-primary text-primary bg-primary/5'
                  : 'border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              {r}
            </Button>
          ))}
        </div>
      </div>

      {/* Apply Button */}
      <div className='bg-white pt-4 pb-2'>
        <Button
          variant='contained'
          onClick={() => onApply?.(filters)}
          className='bg-brand-primary w-full rounded-xl py-3 font-bold text-white shadow-lg transition-transform active:scale-95'
        >
          Áp dụng bộ lọc
        </Button>
      </div>
    </div>
  );
};

export default FilterFormContent;
