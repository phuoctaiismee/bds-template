import { date } from '@/lib/date';
import NumberFlow from '@number-flow/react';
import { FC, useState } from 'react';
import { useInterval } from 'usehooks-ts';

interface TimerUpProps {
  endDate: date.Dayjs;
}

const TimerDown: FC<TimerUpProps> = ({ endDate }) => {
  const [diff, setDiff] = useState(() => endDate.diff());

  useInterval(() => {
    setDiff(endDate.diff());
  }, 1_000);

  const totalSeconds = Math.max(Math.floor(diff / 1000), 0);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return (
    <div className='flex items-end justify-center gap-2'>
      <span className='text-[72px] font-bold'>
        <NumberFlow value={hours} locales='vi' format={{ minimumIntegerDigits: 2 }} />:
        <NumberFlow value={minutes} locales='vi' format={{ minimumIntegerDigits: 2 }} />
      </span>

      <span className='mb-4 text-[30px] font-semibold opacity-50'>
        <NumberFlow value={seconds} locales='vi' format={{ minimumIntegerDigits: 2, maximumFractionDigits: 0 }} />
      </span>
    </div>
  );
};

export default TimerDown;
