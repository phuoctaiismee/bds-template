import { Building2, Calendar, FileCheck, MapPin } from 'lucide-react';
import { ProjectDetail } from '../../mock';

const FactItem = ({ label, value, icon: Icon }: { label: string; value: string; icon: any }) => (
  <div className='flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4'>
    <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-primary shadow-sm'>
      <Icon className='h-5 w-5' />
    </div>
    <div>
      <p className='mb-1 text-xs font-bold tracking-wider text-gray-500 uppercase'>{label}</p>
      <p className='text-sm font-bold text-slate-900 md:text-base'>{value}</p>
    </div>
  </div>
);

export function FactSheet({ project }: { project: ProjectDetail }) {
  return (
    <section>
      <h3 className='mb-6 text-xl font-bold text-slate-900'>Thông tin dự án</h3>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <FactItem label='Chủ đầu tư' value={project.developer} icon={Building2} />
        <FactItem label='Quy mô' value={project.scale} icon={MapPin} />
        <FactItem label='Loại hình' value={project.type} icon={Building2} />
        <FactItem label='Pháp lý' value={project.legalStatus} icon={FileCheck} />
        <FactItem label='Bàn giao' value={project.handover} icon={Calendar} />
        <FactItem label='Tổng sản phẩm' value={project.totalUnits} icon={Building2} />
      </div>
    </section>
  );
}
