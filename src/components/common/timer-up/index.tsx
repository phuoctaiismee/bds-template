import { date } from '@/lib/date';
import NumberFlow from '@number-flow/react';
import { FC, useState } from 'react';
import { useInterval } from 'usehooks-ts';

interface TimerUpProps {
  startDate: date.Dayjs;
}

const TimerUp: FC<TimerUpProps> = ({ startDate }) => {
  const [diff, setDiff] = useState(() => date().diff(startDate));

  useInterval(() => {
    setDiff(date().diff(startDate));
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

      <span className='mb-4 text-[30px] font-semibold text-white/50'>
        <NumberFlow value={seconds} locales='vi' format={{ minimumIntegerDigits: 2, maximumFractionDigits: 0 }} />
      </span>
    </div>
  );
};

export default TimerUp;
