import { CheckCircle2 } from 'lucide-react';

export function Amenities({ features }: { features: string[] }) {
  return (
    <section>
      <h3 className='mb-6 text-xl font-bold text-slate-900'>Hệ thống tiện ích</h3>
      <div className='grid grid-cols-2 gap-4 md:grid-cols-3'>
        {features.map((feature, idx) => (
          <div
            key={idx}
            className='flex items-center gap-2 rounded-lg border border-gray-100 p-3 transition-colors hover:border-blue-200'
          >
            <CheckCircle2 className='h-4 w-4 text-secondary' />
            <span className='text-sm font-medium text-gray-700'>{feature}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
