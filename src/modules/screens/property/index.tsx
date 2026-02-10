'use client';

import { ArrowLeft, Heart, Info, Share2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

import AgentSidebar from './components/agent-sidebar';
import { LoanCalculator, MoveInCostEstimator } from './components/financial-calculator';
import { RENT_PROPERTY_DATA, SALE_PROPERTY_DATA } from './constants';

// Import UI Components mới
import { Button } from '@mui/material';
import ImageGallery from './components/image-gallery';
import MobileActions from './components/mobile-action';
import PropertyHeader from './components/property-header';
import PropertyInfo from './components/property-info';

// Mock Auth
const useAuth = () => ({ isAuthenticated: true });

export default function PropertyDetailScreen({ id, type }: { id: string, type: string }) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  // Detect Mode
  const isRent = type === 'rent' || (id && id.startsWith('r'));
  const property: any = isRent ? RENT_PROPERTY_DATA : SALE_PROPERTY_DATA;

  const handleStartChat = () => {
    if (!isAuthenticated) return router.push('/login');
    router.push(`/messages?chatWith=${property.agent.id}&ref=${property.id}`);
  };

  return (
    <div className='bg-background min-h-screen pb-24 md:pb-12 text-base'>
      {/* Breadcrumbs & Actions */}
      <div className='container mx-auto px-4 pt-4 pb-4 md:px-6'>
        <div className='flex items-center justify-between'>
          <Button
            onClick={() => router.back()}
            className='hover:text-primary inline-flex items-center gap-2 text-sm font-bold text-gray-500 transition-colors'
          >
            <ArrowLeft className='h-4 w-4' /> Quay lại danh sách
          </Button>
          <div className='flex gap-2'>
            <button className='flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-gray-600 transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-500'>
              <Heart className='h-4 w-4' /> <span className='hidden sm:inline'>Lưu tin</span>
            </button>
            <button className='hover:border-primary hover:text-primary flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-gray-600 transition-all hover:bg-blue-50'>
              <Share2 className='h-4 w-4' /> <span className='hidden sm:inline'>Chia sẻ</span>
            </button>
          </div>
        </div>
      </div>

      <ImageGallery images={property.images} isRent={isRent} moveInDate={property.moveInDate} />

      <div className='container mx-auto px-4 md:px-6'>
        <div className='flex flex-col gap-8 lg:flex-row xl:gap-12'>
          {/* LEFT COLUMN */}
          <div className='min-w-0 flex-1'>
            <PropertyHeader property={property} isRent={isRent} />
            <PropertyInfo property={property} isRent={isRent} />

            {/* FINANCIALS */}
            <div className='mb-10'>
              <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
                {isRent ? (
                  <MoveInCostEstimator
                    price={property.price}
                    depositMonths={parseInt(property.deposit)}
                    fees={property.fees}
                  />
                ) : (
                  <LoanCalculator price={property.price} />
                )}
                <div className='space-y-6'>
                  <h3 className='text-brand-primary text-lg font-bold'>Thông tin pháp lý</h3>
                  <div className='rounded-xl border border-gray-200 bg-white p-5 shadow-sm'>
                    <div className='space-y-4'>
                      <div className='flex justify-between border-b border-gray-100 pb-3'>
                        <span className='text-sm text-gray-500'>Giấy tờ pháp lý</span>
                        <span className='text-brand-primary text-sm font-bold'>{property.legal}</span>
                      </div>
                      <div className='flex justify-between border-b border-gray-100 pb-3'>
                        <span className='text-sm text-gray-500'>Hiện trạng</span>
                        <span className='text-brand-primary text-sm font-bold'>
                          {isRent ? 'Nhà trống' : 'Sẵn sàng giao dịch'}
                        </span>
                      </div>
                      <div className='flex justify-between'>
                        <span className='text-sm text-gray-500'>{isRent ? 'Thời hạn' : 'Sở hữu'}</span>
                        <span className='text-brand-primary text-sm font-bold'>
                          {isRent ? property.leaseTerm : 'Lâu dài'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className='flex gap-3 rounded-xl border border-yellow-100 bg-yellow-50 p-4'>
                    <Info className='h-5 w-5 shrink-0 text-yellow-600' />
                    <p className='text-xs leading-relaxed text-yellow-800'>
                      {isRent
                        ? 'Hãy kiểm tra kỹ điều khoản về tiền cọc và hiện trạng nội thất trước khi ký hợp đồng thuê.'
                        : 'Aetheria khuyến nghị người mua luôn kiểm tra bản chính giấy tờ và quy hoạch tại cơ quan chức năng trước khi đặt cọc.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className='hidden w-96 shrink-0 lg:block'>
            <AgentSidebar property={property} isRent={isRent} handleStartChat={handleStartChat} />
          </div>
        </div>
      </div>

      <MobileActions property={property} isRent={isRent} />
    </div>
  );
}
