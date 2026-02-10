import {
  EYaahApiReservationExtendOptionType,
  IYaahApiReservation,
  IYaahApiReservationExtendInput,
  yaahApi,
} from '@/apis/yaah';
import NumberPadInput from '@/components/input/numberpad';
import CircleLoading from '@/components/ui/circle-loading';
import { cn } from '@/lib/twMerge';
import { PencilIcon } from '@heroicons/react/24/outline';
import { Button, CardActionArea, Collapse } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Formik } from 'formik';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import * as yup from 'yup';

interface ReservationExtendFormProps {
  reservation: IYaahApiReservation;
  onSubmit?: (val: IYaahApiReservationExtendInput) => void;
}

interface SpecificMinuteOption {
  label: string;
  value: number;
}

const specialMinutes: Array<SpecificMinuteOption> = [
  {
    label: '+30 phút',
    value: 30,
  },
  {
    label: '+1 giờ',
    value: 60,
  },
  {
    label: '+2 giờ',
    value: 120,
  },
];

const initialValues: Partial<IYaahApiReservationExtendInput> = {};

const validationSchema = yup.object().shape({
  type: yup.string().required().oneOf(Object.values(EYaahApiReservationExtendOptionType)),
  minutes: yup.number().nullable(),
});

const ReservationExtendForm: FC<ReservationExtendFormProps> = ({ reservation, onSubmit }) => {
  const { data: extend, isLoading } = useQuery({
    queryKey: ['reservation/extend-options', { reservationId: reservation.id }],
    queryFn: ({ signal }) => yaahApi.reservation.getExtendOptions({ pathParams: { id: reservation.id }, signal }),
  });

  const t = useTranslations();

  if (isLoading) return <CircleLoading />;
  if (!extend?.data.can_extend) return <p className='text-center'>Phiên này không hỗ trợ gia hạn</p>;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnMount
      validateOnChange
      onSubmit={async (val) => Promise.resolve(onSubmit?.(val as never))}
    >
      {({ values, errors, isValid, isSubmitting, setFieldValue, setValues, handleSubmit }) => {
        const hasCustomMinutes =
          typeof values.minutes === 'number' && specialMinutes.every((x) => x.value !== values.minutes);

        if (isSubmitting) return <CircleLoading message='Đang xử lý' />;

        return (
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col gap-4'>
              <div className='scrollbar-hide w-full overflow-x-auto'>
                <div className='flex w-fit items-center gap-3'>
                  {extend.data.extend_options.map((option) => {
                    const isActive = values.type === option.type;

                    const handleClick = () => {
                      setValues({ type: option.type });
                    };

                    return (
                      <CardActionArea
                        key={option.type}
                        className={cn('h-12 rounded-xl bg-black px-4 whitespace-nowrap text-white', {
                          'bg-primary/10 text-primary': isActive,
                        })}
                        type='button'
                        onClick={handleClick}
                      >
                        {t(`reservation.extend_options.${option.type}.label`)}
                      </CardActionArea>
                    );
                  })}
                </div>
              </div>

              <Collapse in={values.type === EYaahApiReservationExtendOptionType.SpecificMinutes}>
                <div className='grid grid-cols-2 gap-3'>
                  {specialMinutes.map((item) => {
                    const isActive = item.value === values.minutes;
                    const handleClick = () => {
                      setFieldValue('minutes', item.value);
                    };

                    return (
                      <CardActionArea
                        key={item.value}
                        className={cn('h-15 rounded-xl border border-white/20 bg-black px-4 text-center', {
                          'text-primary bg-primary/10 border-primary': isActive,
                        })}
                        onClick={handleClick}
                      >
                        {item.label}
                      </CardActionArea>
                    );
                  })}

                  <NumberPadInput
                    onChange={(val) => setFieldValue('minutes', val)}
                    suffix='p'
                    defaultValue={values.minutes}
                    min={15}
                  >
                    <CardActionArea
                      className={cn('relative h-15 rounded-xl border border-white/20 bg-black px-4 text-center', {
                        'text-primary border-primary bg-primary/10': hasCustomMinutes,
                      })}
                    >
                      <span>{hasCustomMinutes ? values.minutes?.toLocaleString('vi') : 'Tùy chỉnh'}</span>
                      <PencilIcon className='absolute top-1/2 right-4 size-4 -translate-y-1/2' />
                    </CardActionArea>
                  </NumberPadInput>
                </div>
              </Collapse>

              <Button variant='contained' disabled={!isValid} type='submit'>
                Gia hạn
              </Button>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default ReservationExtendForm;
