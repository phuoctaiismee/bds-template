const AmbientOrb = () => (
  <div className='pointer-events-none fixed inset-0 z-0 overflow-hidden'>
    <div className='bg-primary/5 animate-pulse-slow absolute top-[-10%] left-1/2 h-150 w-150 -translate-x-1/2 rounded-full blur-[120px]' />
    <div className='absolute top-[30%] right-[-20%] h-100 w-100 rounded-full bg-purple-400/5 blur-[100px]' />
  </div>
);

export default AmbientOrb;
