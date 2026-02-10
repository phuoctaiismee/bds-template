// components/ProjectFilterSidebar.tsx
import { Checkbox, FormControlLabel, InputAdornment, TextField, Typography } from '@mui/material';
import { Building2, HardHat, MapPin, Search } from 'lucide-react';
import { FC } from 'react';
export const LOCATIONS = ['TP. Hồ Chí Minh (24)', 'Hà Nội (12)', 'Đà Nẵng (8)', 'Bình Dương (15)', 'Đồng Nai (6)'];

export const STATUSES = ['Sắp mở bán', 'Đang nhận booking', 'Đang thi công', 'Sắp bàn giao', 'Đã bàn giao'];

export interface FilterState {
  type: string;
  locations: string[];
  statuses: string[];
  developer: string;
  sortBy: string;
}

export const INITIAL_FILTERS: FilterState = {
  type: 'all',
  locations: [],
  statuses: [],
  developer: '',
  sortBy: 'newest',
};
interface ProjectFilterSidebarProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
}

const ProjectFilterSidebar: FC<ProjectFilterSidebarProps> = ({ filters, onFilterChange }) => {
  // Handle Checkbox Logic
  const handleMultiSelect = (field: 'locations' | 'statuses', value: string) => {
    const list = filters[field];
    const newList = list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
    onFilterChange({ ...filters, [field]: newList });
  };

  // Handle Input Logic
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, developer: e.target.value });
  };

  return (
    <div className='w-64 shrink-0 space-y-8'>
      {/* 1. Khu vực */}
      <div>
        <Typography variant='subtitle2' className='text-brand-primary mb-3 flex items-center gap-2 font-bold'>
          <MapPin className='h-4 w-4' /> Khu vực
        </Typography>
        <div className='flex flex-col gap-4'>
          {LOCATIONS.map((loc) => (
            <FormControlLabel
              key={loc}
              control={
                <Checkbox
                  size='small'
                  checked={filters.locations.includes(loc)}
                  onChange={() => handleMultiSelect('locations', loc)}
                  sx={{
                    padding: 0,
                    color: '#d1d5db',
                    '&.Mui-checked': { color: 'var(--color-primary, #0ea5e9)' },
                  }}
                />
              }
              label={<span className='text-sm text-gray-600'>{loc}</span>}
              className='-ml-1'
            />
          ))}
        </div>
      </div>

      {/* 2. Trạng thái */}
      <div>
        <Typography variant='subtitle2' className='text-brand-primary mb-3 flex items-center gap-2 font-bold'>
          <HardHat className='h-4 w-4' /> Trạng thái
        </Typography>
        <div className='flex flex-col gap-4'>
          {STATUSES.map((st) => (
            <FormControlLabel
              key={st}
              control={
                <Checkbox
                  size='small'
                  checked={filters.statuses.includes(st)}
                  onChange={() => handleMultiSelect('statuses', st)}
                  sx={{
                    padding: 0,
                    color: '#d1d5db',
                    '&.Mui-checked': { color: 'var(--color-primary, #0ea5e9)' },
                  }}
                />
              }
              label={<span className='text-sm text-gray-600'>{st}</span>}
              className='-ml-1'
            />
          ))}
        </div>
      </div>

      {/* 3. Chủ đầu tư */}
      <div>
        <Typography variant='subtitle2' className='text-brand-primary mb-3 flex items-center gap-2 font-bold'>
          <Building2 className='h-4 w-4' /> Chủ đầu tư
        </Typography>
        <TextField
          fullWidth
          size='small'
          value={filters.developer}
          onChange={handleInputChange}
          placeholder='Tìm CĐT...'
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position='start'>
                  <Search className='h-4 w-4 text-gray-400' />
                </InputAdornment>
              ),

              className: 'bg-white rounded-md text-sm',
            },
            htmlInput: {
              className: 'placeholder:text-gray-400 font-medium',
            },
          }}
          sx={{
            '& .MuiOutlinedInput-notchedOutline': { border: '1px solid #e5e7eb', borderRadius: '8px' },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#d1d5db' },
          }}
        />
      </div>
    </div>
  );
};

export default ProjectFilterSidebar;
