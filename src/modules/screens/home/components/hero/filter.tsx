import { cn } from "@/lib/twMerge";
import { Button } from "@mui/material";
import { BedDouble, Building2, Check, Compass, DollarSign, FileCheck, Ruler } from "lucide-react";
import { FilterButton, RangeInput, SectionLabel } from "./common";
import { AMENITIES, DIRECTIONS, FilterState, LEGAL_TYPES, PROPERTY_TYPES } from "./contants";
import { useFilterLogic } from "./use-hero";

const AdvancedFilterForm = ({
  filters,
  handlers,
  onClose,
  activeCount,
}: {
  filters: FilterState;
  handlers: ReturnType<typeof useFilterLogic>;
  onClose: () => void;
  activeCount: number;
}) => {
  return (
    <div className="space-y-8 rounded-2xl border border-gray-100 bg-gray-50 p-4 md:p-6">
      {/* Group 1: Basic */}
      <div className="space-y-4">
        <div>
          <SectionLabel icon={Building2} label="Loại hình bất động sản" />
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {PROPERTY_TYPES.map((type) => (
              <Button
                key={type.id}
                onClick={() => handlers.handleSingleSelect('type', type.id)}
                className={cn(
                  'flex items-center gap-3 rounded-xl border p-3 text-left',
                  filters.type === type.id
                    ? 'border-primary text-primary ring-primary bg-white shadow-md ring-1'
                    : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300'
                )}
              >
                <type.icon className="h-4 w-4" />
                <span className="text-xs font-bold">{type.label}</span>
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <SectionLabel icon={DollarSign} label="Mức giá (Tỷ VNĐ)" />
            <div className="mb-3 flex items-center gap-2">
              <RangeInput placeholder="Từ" value={filters.minPrice} onChange={(v) => handlers.handleSingleSelect('minPrice', v)} />
              <span className="text-gray-400">-</span>
              <RangeInput placeholder="Đến" value={filters.maxPrice} onChange={(v) => handlers.handleSingleSelect('maxPrice', v)} />
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { label: '< 3 Tỷ', min: '', max: '3' },
                { label: '3 - 7 Tỷ', min: '3', max: '7' },
                { label: '7 - 15 Tỷ', min: '7', max: '15' },
                { label: '> 15 Tỷ', min: '15', max: '' },
              ].map((range) => (
                <Button
                  key={range.label}
                  onClick={() => handlers.handlePriceQuickSelect(range.min, range.max)}
                  className="hover:border-primary hover:text-primary rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-600"
                >
                  {range.label}
                </Button>
              ))}
            </div>
          </div>
          <div>
            <SectionLabel icon={Ruler} label="Diện tích (m²)" />
            <div className="flex items-center gap-2">
              <RangeInput placeholder="Từ (m²)" value={filters.minArea} onChange={(v) => handlers.handleSingleSelect('minArea', v)} />
              <span className="text-gray-400">-</span>
              <RangeInput placeholder="Đến (m²)" value={filters.maxArea} onChange={(v) => handlers.handleSingleSelect('maxArea', v)} />
            </div>
          </div>
        </div>
      </div>

      {/* Group 2: Details */}
      <div className="grid grid-cols-1 gap-8 border-t border-gray-200 pt-6 md:grid-cols-2">
        <div>
          <SectionLabel icon={BedDouble} label="Số phòng" />
          <div className="space-y-4">
            {[
              { label: 'Phòng ngủ', key: 'beds' as const, opts: ['any', 1, 2, 3, 4, '5+'] },
              { label: 'Vệ sinh', key: 'baths' as const, opts: ['any', 1, 2, 3, '4+'] },
            ].map((item) => (
              <div key={item.key} className="flex items-center gap-3">
                <span className="w-20 text-sm font-medium text-gray-600">{item.label}:</span>
                <div className="flex gap-2">
                  {item.opts.map((num) => (
                    <FilterButton
                      key={`${item.key}-${num}`}
                      variant="contained"
                      active={filters[item.key] === num}
                      onClick={() => handlers.handleSingleSelect(item.key, num)}
                      className="flex h-9 w-9 items-center justify-center rounded-lg p-0 text-sm"
                    >
                      {num === 'any' ? 'All' : num}
                    </FilterButton>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <SectionLabel icon={Compass} label="Hướng & Pháp lý" />
          <div className="mb-3 flex flex-wrap gap-2">
            {DIRECTIONS.map((dir) => (
              <FilterButton
                key={dir}
                active={filters.direction.includes(dir)}
                onClick={() => handlers.handleMultiSelect('direction', dir)}
                className="rounded-lg px-3 py-1.5 text-xs"
              >
                {dir}
              </FilterButton>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {LEGAL_TYPES.map((leg) => (
              <FilterButton
                key={leg}
                active={filters.legal.includes(leg)}
                onClick={() => handlers.handleMultiSelect('legal', leg)}
                className={cn(
                  'flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs',
                  filters.legal.includes(leg) && 'border-green-500 bg-green-50 text-green-700'
                )}
              >
                {filters.legal.includes(leg) && <FileCheck className="h-3 w-3" />}
                {leg}
              </FilterButton>
            ))}
          </div>
        </div>
      </div>

      {/* Group 3: Amenities */}
      <div className="border-t border-gray-200 pt-6">
        <SectionLabel label="Tiện ích & Phong cách sống" />
        <div className="flex flex-wrap gap-2">
          {AMENITIES.map((amenity) => (
            <FilterButton
              key={amenity}
              active={filters.amenities.includes(amenity)}
              onClick={() => handlers.handleMultiSelect('amenities', amenity)}
              className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs"
            >
              {filters.amenities.includes(amenity) && <Check className="h-3 w-3" />}
              {amenity}
            </FilterButton>
          ))}
        </div>
      </div>

      <Button
        onClick={onClose}
        className="bg-primary shadow-primary/20 w-full rounded-xl py-3 font-bold text-white shadow-lg transition-colors hover:bg-blue-600"
      >
        Áp dụng bộ lọc ({activeCount})
      </Button>
    </div>
  );
};

export default AdvancedFilterForm;