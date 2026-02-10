export default function TableOfContents({ items }: { items: string[] }) {
  return (
    <div className='hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:block'>
      <div className='mb-4 text-xs font-bold tracking-wider text-gray-400 uppercase'>Mục lục</div>
      <ul className='space-y-3'>
        {items.map((item, idx) => (
          <li key={idx} className='group flex cursor-pointer items-start gap-3'>
            <span className='text-brand-blue flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold'>
              {idx + 1}
            </span>
            <span className='group-hover:text-brand-blue pt-0.5 text-sm font-medium text-gray-600 transition-colors'>
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
