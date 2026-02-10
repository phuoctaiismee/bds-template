import { cn } from "@/lib/twMerge";
import { Button, IconButton } from "@mui/material";
import { History, RotateCcw, Search, SlidersHorizontal, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { createPortal } from "react-dom";
import AdvancedFilterForm from "./filter";
import SearchSuggestions from "./search-suggestion";
import { useFilterLogic } from "./use-hero";

const SearchModal = ({
  isOpen,
  onClose,
  activeTab,
  setActiveTab,
}: {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  setActiveTab: (val: string) => void;
}) => {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  
  // Logic filter nằm bên trong Modal này để độc lập
  const filterLogic = useFilterLogic();
  const { filters, activeFilterCount, resetFilters } = filterLogic;

  // Prevent scroll khi mở modal (Portal handle)
  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="pointer-events-none fixed inset-0 z-9999 flex flex-col items-center md:pt-20">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="pointer-events-auto absolute inset-0 bg-white md:bg-black/60 md:backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto relative flex h-dvh w-full flex-col overflow-hidden bg-white shadow-2xl md:h-auto md:max-h-[85vh] md:max-w-224 md:rounded-3xl"
          >
            {/* Header */}
            <div className="safe-area-top z-10 flex-none border-b border-gray-100 bg-white p-4 md:border-none md:p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex gap-2 rounded-xl bg-gray-100 p-1">
                  {['buy', 'rent', 'project'].map((tab) => (
                    <Button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={cn(
                        'h-fit rounded-lg px-3 py-1.5 text-xs font-bold transition-all md:px-4 md:py-2 md:text-sm',
                        activeTab === tab
                          ? 'text-primary bg-white shadow-sm'
                          : 'hover:text-primary text-gray-500'
                      )}
                    >
                      {tab === 'buy' ? 'Mua' : tab === 'rent' ? 'Thuê' : 'Dự án'}
                    </Button>
                  ))}
                </div>
                <IconButton
                  onClick={onClose}
                  className="text-foreground flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-red-50 hover:text-red-500"
                >
                  <X className="h-5 w-5" />
                </IconButton>
              </div>

              <div className="flex gap-3">
                <div className="group relative flex-1">
                  <Search className="group-focus-within:text-primary absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400 transition-colors" />
                  <input
                    type="text"
                    placeholder="Nhập tên dự án, khu vực..."
                    className="focus:border-primary focus:ring-primary/10 h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pr-4 pl-12 text-base font-bold text-gray-800 transition-all outline-none focus:bg-white focus:ring-4"
                  />
                </div>
                <Button className="bg-primary shadow-primary/30 h-12 rounded-xl px-6 font-bold whitespace-nowrap text-white shadow-lg transition-all hover:bg-blue-600 active:scale-95">
                  Tìm
                </Button>
              </div>
            </div>

            {/* Scrollable Body */}
            <div className="safe-scroll safe-area-bottom flex-1 touch-pan-y overflow-x-hidden overflow-y-auto p-4 pt-2 pb-24 md:px-6 md:pb-6">
              <div className="z-5 flex items-center justify-between bg-white pb-4">
                <h4 className="flex items-center gap-2 text-xs font-bold tracking-wider text-gray-400 uppercase">
                  <History className="h-3.5 w-3.5" /> Gợi ý
                </h4>
                <div className="flex gap-2">
                  {isAdvancedOpen && (
                    <Button
                      onClick={resetFilters}
                      className="flex items-center gap-1 rounded-md px-2 py-1.5 text-xs font-bold text-gray-400 transition-colors hover:text-red-500"
                    >
                      <RotateCcw className="h-3.5 w-3.5" /> Đặt lại
                    </Button>
                  )}
                  <Button
                    onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
                    className={cn(
                      'flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-bold transition-colors md:text-sm',
                      isAdvancedOpen
                        ? 'bg-primary/10 text-primary'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    )}
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                    {isAdvancedOpen ? 'Thu gọn' : 'Bộ lọc nâng cao'}
                  </Button>
                </div>
              </div>

              {/* Expandable Filters */}
              <AnimatePresence>
                {isAdvancedOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mb-6 overflow-hidden"
                  >
                    <AdvancedFilterForm 
                      filters={filters} 
                      handlers={filterLogic} 
                      activeCount={activeFilterCount}
                      onClose={() => setIsAdvancedOpen(false)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Suggestions */}
              <SearchSuggestions />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default SearchModal;