import { Building2, Crown, Settings } from 'lucide-react';

export const CompactHeader = ({ user }: { user: any }) => (
  <div className='mb-6 flex items-center gap-3'>
    <div className='relative'>
      <img
        src={user.avatar}
        alt='Avatar'
        className='h-12 w-12 rounded-full border-2 border-white object-cover shadow-sm'
      />
      <div className='absolute -right-1 -bottom-1 rounded-full border-2 border-white bg-yellow-400 p-0.5 text-white'>
        <Crown className='h-2.5 w-2.5' />
      </div>
    </div>
    <div className='flex-1'>
      <h2 className='text-brand-primary mb-1 text-lg leading-none font-extrabold'>{user.name}</h2>
      <div className='flex items-center gap-2'>
        <span className='rounded-full border border-yellow-200 bg-yellow-100 px-2 py-0.5 text-[10px] font-bold text-yellow-700'>
          Gold Member
        </span>
        <span className='text-[10px] text-gray-400'>ID: 882910</span>
      </div>
    </div>
    <button className='hover:bg-primary rounded-full border border-gray-100 bg-white p-2 text-gray-600 shadow-sm transition-colors hover:text-white'>
      <Settings className='h-5 w-5' />
    </button>
  </div>
);

export const MembershipCardDesktop = ({ user }: { user: any }) => (
  <div className='group relative mb-6 h-48 w-full overflow-hidden rounded-3xl shadow-xl transition-transform duration-500 hover:scale-[1.01] md:h-64'>
    <div className='absolute inset-0 bg-linear-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]'></div>
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30"></div>
    <div className='absolute inset-0 z-10 flex flex-col justify-between p-8'>
      <div className='flex items-start justify-between'>
        <div className='flex items-center gap-4'>
          <div className='relative rounded-full border-2 border-white/20 p-1'>
            <img src={user.avatar} alt='Avatar' className='h-16 w-16 rounded-full object-cover' />
          </div>
          <div>
            <h2 className='text-2xl font-bold tracking-wide text-white'>{user.name}</h2>
            <div className='mt-1 flex items-center gap-2'>
              <span className='flex items-center gap-1 text-xs font-black tracking-widest text-yellow-400 uppercase'>
                <Crown className='h-3 w-3' /> Gold Member
              </span>
            </div>
          </div>
        </div>
        <Building2 className='h-8 w-8 text-white/50' />
      </div>
      <div className='flex gap-8'>
        <div>
          <p className='mb-1 text-[10px] font-bold tracking-wider text-white/40 uppercase'>Gia nhập</p>
          <p className='font-mono text-sm text-white'>{user.joinDate || '11/2023'}</p>
        </div>
      </div>
    </div>
  </div>
);
