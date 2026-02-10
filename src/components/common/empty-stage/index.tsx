import { FC } from 'react';

interface EmptyStageProps {
  message?: string;
}

const EmptyStage: FC<EmptyStageProps> = ({ message = 'Không có dữ liệu' }) => {
  return (
    <div className='text-neutral-1 flex flex-col py-8'>
      <p className='text-center'>{message}</p>
    </div>
  );
};

export default EmptyStage;
