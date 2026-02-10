'use client';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export function Overview({ description }: { description: string }) {
  const [isExpanded, setExpanded] = useState(false);

  return (
    <section>
      <h3 className="text-xl font-bold text-slate-900 mb-4">Tổng quan</h3>
      <div className="prose prose-sm md:prose-base text-gray-600 max-w-none">
        <p className={`whitespace-pre-line leading-relaxed ${!isExpanded ? 'line-clamp-4' : ''}`}>
           {description}
        </p>
      </div>
      <button 
        onClick={() => setExpanded(!isExpanded)}
        className="mt-2 text-primary font-bold text-sm flex items-center gap-1 hover:underline"
      >
        {isExpanded ? 'Thu gọn' : 'Xem thêm'} 
        <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
      </button>
    </section>
  );
}