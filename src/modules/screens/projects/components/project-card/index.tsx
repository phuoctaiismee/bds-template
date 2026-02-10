import { Link } from '@/lib/navigation';
import { Calendar, CheckCircle2, FileCheck, HardHat, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { Project } from '../../mock';

const StatusBadge: React.FC<{ status: Project['status'] }> = ({ status }) => {
  const config = {
    booking: { color: 'bg-blue-100 text-blue-700', label: 'Đang nhận booking', icon: Calendar },
    construction: { color: 'bg-orange-100 text-orange-700', label: 'Đang thi công', icon: HardHat },
    handover: { color: 'bg-green-100 text-green-700', label: 'Đã bàn giao', icon: CheckCircle2 },
  };
  const { color, label, icon: Icon } = config[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[10px] font-bold tracking-wide uppercase ${color}`}
    >
      <Icon className='h-3 w-3' /> {label}
    </span>
  );
};
const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className='group hover:shadow-brand-blue/5 flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all duration-300 hover:shadow-xl'
    >
      <Link href={`/projects/${project.id}`} className='relative block aspect-4/3 overflow-hidden'>
        <img
          src={project.image}
          alt={project.name}
          className='h-full w-full object-cover transition-transform duration-700 group-hover:scale-105'
        />
        <div className='absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-60'></div>

        {/* Top Badges */}
        <div className='absolute top-3 left-3 flex flex-col gap-2'>
          <StatusBadge status={project.status} />
        </div>

        {/* Bottom Price */}
        <div className='absolute bottom-3 left-3 text-white'>
          <p className='mb-0.5 text-[10px] font-bold tracking-wider uppercase opacity-90'>Giá tham khảo</p>
          <p className='flex items-baseline gap-1 text-xl font-extrabold'>
            {project.priceFrom} <span className='text-xs font-medium'>{project.priceUnit}</span>
          </p>
        </div>
      </Link>

      <div className='flex flex-1 flex-col p-5'>
        {/* Developer & Location */}
        <div className='mb-3'>
          <p className='mb-1 text-xs font-bold tracking-wider text-gray-400 uppercase'>{project.developer}</p>
          <Link href={`/project/${project.id}`}>
            <h3 className='text-brand-primary group-hover:text-brand-blue mb-2 line-clamp-2 text-lg leading-snug font-bold transition-colors'>
              {project.name}
            </h3>
          </Link>
          <div className='flex items-start gap-1.5 text-sm text-gray-500'>
            <MapPin className='mt-0.5 h-4 w-4 shrink-0' />
            <span className='line-clamp-1'>{project.location}</span>
          </div>
        </div>

        <div className='mt-auto flex items-center justify-between border-t border-gray-50 pt-4 text-xs'>
          <div className='flex items-center gap-4 font-medium text-gray-500'>
            <span title='Quy mô dự án'>{project.scale}</span>
            <span className='h-1 w-1 rounded-full bg-gray-300'></span>
            <span title='Loại hình'>
              {project.type === 'apartment' ? 'Căn hộ' : project.type === 'urban' ? 'Khu đô thị' : 'Nghỉ dưỡng'}
            </span>
          </div>

          {project.legal === 'ownership' && (
            <div className='flex items-center gap-1 font-bold text-green-600' title='Pháp lý hoàn chỉnh'>
              <FileCheck className='h-3.5 w-3.5' /> Sổ hồng
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
