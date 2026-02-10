'use client';
import {
    ArrowRight,
    Bell,
    Briefcase,
    CheckCircle2,
    ChevronRight,
    Edit3,
    FileText,
    Globe,
    LayoutDashboard,
    Lock,
    LogOut,
    Mail,
    Smartphone,
    User,
    X,
} from 'lucide-react';
import { useState } from 'react';
import { BiometricIcon, ToggleSwitch } from './common';

export default function SettingsContent({ user, handleLogout }: { user: any; handleLogout: () => void }) {
  const [isAgent, setIsAgent] = useState(false);
  const [showAgentForm, setShowAgentForm] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [biometrics, setBiometrics] = useState(false);

  return (
    <div className='animate-in fade-in slide-in-from-bottom-2 space-y-8 duration-300'>
      {/* 1. Agent OS Switcher */}
      <div
        className={`relative overflow-hidden rounded-2xl transition-all duration-500 ${isAgent ? 'bg-gray-900 p-6 text-white' : 'bg-gradient-to-br from-[#1e293b] to-[#0f172a] p-6 text-white'}`}
      >
        <div className='bg-primary pointer-events-none absolute top-0 right-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[80px]'></div>

        {!isAgent ? (
          !showAgentForm ? (
            // Banner Mode
            <div className='relative z-10'>
              <div className='mb-4 flex items-start justify-between'>
                <div className='flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/10'>
                  <Briefcase className='text-secondary h-6 w-6' />
                </div>
                <span className='bg-secondary rounded px-2 py-1 text-[10px] font-bold text-black uppercase'>
                  Partner Program
                </span>
              </div>
              <h3 className='mb-2 text-2xl font-extrabold'>Trở thành Đối tác Aetheria</h3>
              <p className='mb-6 max-w-112 text-sm text-gray-300'>
                Mở khóa các công cụ chuyên nghiệp: Quản lý giỏ hàng, CRM khách hàng, và tiếp cận nguồn hàng độc quyền.
              </p>
              <button
                onClick={() => setShowAgentForm(true)}
                className='text-brand-primary flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 font-bold transition-colors hover:bg-gray-100'
              >
                Đăng ký ngay <ArrowRight className='h-4 w-4' />
              </button>
            </div>
          ) : (
            // Registration Form Mode
            <div className='animate-in zoom-in relative z-10 duration-300'>
              <button
                onClick={() => setShowAgentForm(false)}
                className='absolute top-0 right-0 rounded-full p-2 hover:bg-white/10'
              >
                <X className='h-5 w-5' />
              </button>
              <h3 className='mb-4 text-xl font-bold'>Đăng ký Đối tác</h3>
              <div className='mb-6 space-y-4'>
                <div>
                  <label className='mb-1 block text-xs font-bold text-gray-400 uppercase'>Tên sàn / Đơn vị</label>
                  <input
                    type='text'
                    placeholder='VD: Aetheria Agent...'
                    className='focus:border-primary w-full rounded-lg border border-white/20 bg-white/5 p-3 text-sm text-white outline-none'
                  />
                </div>
                <div>
                  <label className='mb-1 block text-xs font-bold text-gray-400 uppercase'>Mã chứng chỉ hành nghề</label>
                  <input
                    type='text'
                    placeholder='Số chứng chỉ...'
                    className='focus:border-primary w-full rounded-lg border border-white/20 bg-white/5 p-3 text-sm text-white outline-none'
                  />
                </div>
              </div>
              <button
                onClick={() => {
                  setIsAgent(true);
                  setShowAgentForm(false);
                }}
                className='bg-secondary w-full rounded-xl py-3 font-bold text-white shadow-lg shadow-green-500/20 transition-colors hover:bg-green-600'
              >
                Hoàn tất & Kích hoạt
              </button>
            </div>
          )
        ) : (
          // Active Agent Mode
          <div className='relative z-10'>
            <div className='mb-6 flex items-center gap-4'>
              <div className='border-secondary h-14 w-14 rounded-full border-2 p-0.5'>
                <img src={user.avatar} className='h-full w-full rounded-full object-cover' />
              </div>
              <div>
                <h3 className='text-lg font-bold'>{user.name}</h3>
                <div className='text-secondary mt-1 flex w-fit items-center gap-2 rounded bg-green-500/10 px-2 py-0.5 text-xs font-bold'>
                  <CheckCircle2 className='h-3 w-3' /> Đã xác thực
                </div>
              </div>
            </div>

            <div className='mb-6 grid grid-cols-2 gap-4'>
              <div className='rounded-xl border border-white/10 bg-white/5 p-3'>
                <span className='block text-2xl font-bold'>12</span>
                <span className='text-xs text-gray-400 uppercase'>Tin đang đăng</span>
              </div>
              <div className='rounded-xl border border-white/10 bg-white/5 p-3'>
                <span className='text-secondary block text-2xl font-bold'>45</span>
                <span className='text-xs text-gray-400 uppercase'>Khách quan tâm</span>
              </div>
            </div>

            <button className='bg-primary mb-3 flex w-full items-center justify-center gap-2 rounded-xl py-3 font-bold text-white shadow-lg shadow-blue-500/20 transition-colors hover:bg-blue-600'>
              <LayoutDashboard className='h-4 w-4' /> Truy cập Agent OS
            </button>
            <button
              onClick={() => setIsAgent(false)}
              className='w-full py-2 text-xs font-bold text-gray-400 hover:text-white'
            >
              Tạm tắt chế độ Môi giới
            </button>
          </div>
        )}
      </div>

      {/* 2. Account Information */}
      <div>
        <h4 className='mb-4 px-2 text-sm font-bold text-gray-500 uppercase'>Thông tin cá nhân</h4>
        <div className='overflow-hidden rounded-2xl border border-gray-200 bg-white'>
          <div className='group flex cursor-pointer items-center justify-between border-b border-gray-100 p-4 transition-colors hover:bg-gray-50'>
            <div className='flex items-center gap-3'>
              <div className='group-hover:text-primary rounded-full bg-gray-100 p-2 text-gray-500 transition-colors group-hover:bg-white'>
                <User className='h-5 w-5' />
              </div>
              <div>
                <p className='text-xs font-bold text-gray-400 uppercase'>Họ và tên</p>
                <p className='text-brand-primary text-sm font-bold'>{user.name}</p>
              </div>
            </div>
            <Edit3 className='h-4 w-4 text-gray-400' />
          </div>

          <div className='group flex cursor-pointer items-center justify-between border-b border-gray-100 p-4 transition-colors hover:bg-gray-50'>
            <div className='flex items-center gap-3'>
              <div className='group-hover:text-primary rounded-full bg-gray-100 p-2 text-gray-500 transition-colors group-hover:bg-white'>
                <Smartphone className='h-5 w-5' />
              </div>
              <div>
                <p className='text-xs font-bold text-gray-400 uppercase'>Số điện thoại</p>
                <p className='text-brand-primary text-sm font-bold'>{user.phone}</p>
              </div>
            </div>
            <Edit3 className='h-4 w-4 text-gray-400' />
          </div>

          <div className='group flex cursor-pointer items-center justify-between p-4 transition-colors hover:bg-gray-50'>
            <div className='flex items-center gap-3'>
              <div className='group-hover:text-primary rounded-full bg-gray-100 p-2 text-gray-500 transition-colors group-hover:bg-white'>
                <Mail className='h-5 w-5' />
              </div>
              <div>
                <p className='text-xs font-bold text-gray-400 uppercase'>Email</p>
                <p className='text-brand-primary text-sm font-bold'>{user.email}</p>
              </div>
            </div>
            <span className='rounded bg-green-50 px-2 py-1 text-xs font-bold text-green-600'>Verified</span>
          </div>
        </div>
      </div>

      {/* 3. App Settings */}
      <div>
        <h4 className='mb-4 px-2 text-sm font-bold text-gray-500 uppercase'>Cài đặt ứng dụng</h4>
        <div className='overflow-hidden rounded-2xl border border-gray-200 bg-white'>
          <div className='flex items-center justify-between border-b border-gray-100 p-4'>
            <div className='flex items-center gap-3'>
              <Bell className='h-5 w-5 text-gray-500' />
              <span className='text-brand-primary text-sm font-bold'>Thông báo đẩy</span>
            </div>
            <ToggleSwitch checked={notifications} onChange={setNotifications} />
          </div>

          <div className='flex items-center justify-between border-b border-gray-100 p-4'>
            <div className='flex items-center gap-3'>
              <BiometricIcon className='h-5 w-5 text-gray-500' />
              <span className='text-brand-primary text-sm font-bold'>Đăng nhập sinh trắc học</span>
            </div>
            <ToggleSwitch checked={biometrics} onChange={setBiometrics} />
          </div>

          <div className='flex cursor-pointer items-center justify-between p-4 hover:bg-gray-50'>
            <div className='flex items-center gap-3'>
              <Globe className='h-5 w-5 text-gray-500' />
              <span className='text-brand-primary text-sm font-bold'>Ngôn ngữ</span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='text-sm font-medium text-gray-500'>Tiếng Việt</span>
              <ChevronRight className='h-4 w-4 text-gray-400' />
            </div>
          </div>
        </div>
      </div>

      {/* 4. Security & Support */}
      <div>
        <h4 className='mb-4 px-2 text-sm font-bold text-gray-500 uppercase'>Bảo mật & Hỗ trợ</h4>
        <div className='overflow-hidden rounded-2xl border border-gray-200 bg-white'>
          <div className='flex cursor-pointer items-center justify-between border-b border-gray-100 p-4 hover:bg-gray-50'>
            <div className='flex items-center gap-3'>
              <Lock className='h-5 w-5 text-gray-500' />
              <span className='text-brand-primary text-sm font-bold'>Đổi mật khẩu</span>
            </div>
            <ChevronRight className='h-4 w-4 text-gray-400' />
          </div>

          <div className='flex cursor-pointer items-center justify-between border-b border-gray-100 p-4 hover:bg-gray-50'>
            <div className='flex items-center gap-3'>
              <FileText className='h-5 w-5 text-gray-500' />
              <span className='text-brand-primary text-sm font-bold'>Điều khoản & Chính sách</span>
            </div>
            <ChevronRight className='h-4 w-4 text-gray-400' />
          </div>

          <button
            onClick={handleLogout}
            className='flex w-full items-center gap-3 p-4 text-left text-red-500 transition-colors hover:bg-red-50'
          >
            <LogOut className='h-5 w-5' />
            <span className='text-sm font-bold'>Đăng xuất</span>
          </button>
        </div>
      </div>

      <div className='pb-8 text-center'>
        <p className='text-xs text-gray-400'>Aetheria v2.4.0 (Build 20241115)</p>
      </div>
    </div>
  );
}
