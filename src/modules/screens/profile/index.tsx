'use client';

import { useAuthStore } from '@/stores/auth';
import { Briefcase, Calendar, Grip, Heart, LayoutDashboard, Settings } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CompactHeader, MembershipCardDesktop } from './components/header';
import SettingsContent from './components/settings-tab';
import { AssetsContent, DashboardContent, ToolsContent } from './components/tabs-content';
import { CompactStats, QuickActions } from './components/widgets';

// --- MOCK AUTH HOOK ---
const useAuth = () => ({
  user: {
    name: 'Nam Trần',
    avatar: 'https://i.pravatar.cc/150?u=1',
    role: 'Nhà đầu tư',
    joinDate: '11/2023',
    phone: '0909000999',
    email: 'nam.tran@example.com',
  },
  isAuthenticated: true,
});

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'assets' | 'schedule' | 'collection' | 'projects' | 'tools' | 'settings'
  >('dashboard');

  const { user, isAuthenticated } = useAuth();
  const { setUser } = useAuthStore();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!isAuthenticated) router.push('/login');
  }, [isAuthenticated, router]);

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam) setActiveTab(tabParam as any);
  }, [searchParams]);

  if (!user) return null;

  const handleNavigate = (path: string) => {
    if (path.startsWith('?tab=')) {
      setActiveTab(path.split('=')[1] as any);
    } else {
      router.push(path);
    }
  };

  const handleLogout = () => {
    setUser(null);
    router.push('/login');
  };

  return (
    <div className='min-h-screen bg-gray-50 pt-4 pb-24'>
      <div className='container mx-auto px-4 md:px-8'>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-12'>
          {/* --- MOBILE LAYOUT --- */}
          <div className='lg:hidden'>
            <CompactHeader user={user} />
            {activeTab === 'dashboard' && <QuickActions navigate={handleNavigate} activeTab={activeTab} />}

            <div className='scrollbar-hide mb-6 flex overflow-x-auto rounded-xl border border-gray-100 bg-white p-1 shadow-sm'>
              {['dashboard', 'assets', 'tools', 'collection', 'settings'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`min-w-[80px] flex-1 rounded-lg py-2 text-xs font-bold whitespace-nowrap capitalize transition-all ${
                    activeTab === tab ? 'bg-brand-primary text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {tab === 'dashboard'
                    ? 'Tổng quan'
                    : tab === 'assets'
                      ? 'Tài sản'
                      : tab === 'tools'
                        ? 'Tiện ích'
                        : tab === 'settings'
                          ? 'Cài đặt'
                          : 'Đã lưu'}
                </button>
              ))}
            </div>

            <div className='pb-8'>
              {activeTab === 'dashboard' && <DashboardContent setActiveTab={setActiveTab} />}
              {activeTab === 'assets' && <AssetsContent />}
              {activeTab === 'tools' && <ToolsContent router={router} />}
              {activeTab === 'collection' && <DashboardContent setActiveTab={setActiveTab} />}
              {activeTab === 'schedule' && <DashboardContent setActiveTab={setActiveTab} />}
              {activeTab === 'settings' && <SettingsContent user={user} handleLogout={handleLogout} />}
            </div>
          </div>

          {/* --- DESKTOP LAYOUT --- */}
          <div className='col-span-3 hidden lg:block'>
            <MembershipCardDesktop user={user} />
            <div className='space-y-1 rounded-3xl border border-gray-200 bg-white p-3 shadow-sm'>
              {[
                { id: 'dashboard', label: 'Tổng quan', icon: LayoutDashboard },
                { id: 'schedule', label: 'Lịch hẹn', icon: Calendar },
                { id: 'assets', label: 'Tài sản', icon: Briefcase },
                { id: 'collection', label: 'Bộ sưu tập', icon: Heart },
                { id: 'tools', label: 'Tiện ích', icon: Grip },
                { id: 'settings', label: 'Cài đặt', icon: Settings },
              ].map((item) => (
                <button
                  key={item.id}
                  // @ts-ignore
                  onClick={() => setActiveTab(item.id)}
                  className={`flex w-full items-center justify-between rounded-2xl p-3.5 transition-all ${
                    activeTab === item.id ? 'bg-brand-primary text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  <div className='flex items-center gap-3'>
                    {/* @ts-ignore */}
                    <item.icon className='h-5 w-5' />
                    <span className='text-sm font-bold'>{item.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className='col-span-9 hidden min-h-[600px] lg:block'>
            <div className='h-full rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-sm'>
              <h2 className='text-brand-primary mb-6 text-2xl font-extrabold capitalize'>
                {activeTab === 'dashboard'
                  ? 'Tổng quan tài khoản'
                  : activeTab === 'assets'
                    ? 'Danh mục tài sản'
                    : activeTab === 'tools'
                      ? 'Tiện ích mở rộng'
                      : activeTab === 'settings'
                        ? 'Cài đặt tài khoản'
                        : activeTab}
              </h2>
              {activeTab === 'dashboard' && (
                <>
                  <div className='mb-8 grid grid-cols-2 gap-6'>
                    <CompactStats />
                    <ToolsContent router={router} />
                  </div>
                  <DashboardContent setActiveTab={setActiveTab} />
                </>
              )}
              {activeTab === 'assets' && <AssetsContent />}
              {activeTab === 'tools' && <ToolsContent router={router} />}
              {(activeTab === 'schedule' || activeTab === 'collection') && (
                <DashboardContent setActiveTab={setActiveTab} />
              )}
              {activeTab === 'settings' && <SettingsContent user={user} handleLogout={handleLogout} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
