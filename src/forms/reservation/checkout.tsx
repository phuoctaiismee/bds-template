import { IYaahMakeReservationPaymentInput } from '@/apis/yaah/client/payment';
import NumberPadInput from '@/components/input/numberpad';
import { cn } from '@/lib/twMerge';
import PaymentMethodSelector from '@/modules/payment-method/selector';
import { PencilIcon } from '@heroicons/react/24/outline';
import { Button, CardActionArea } from '@mui/material';
import NumberFlow from '@number-flow/react';
import { Formik } from 'formik';
import { FC } from 'react';
import * as yup from 'yup';

interface ReservationCheckoutFormProps {
  initialValues?: Partial<IYaahMakeReservationPaymentInput>;
  validation?: {
    amount?: {
      min?: number;
      max?: number;
    };
  };
  onSubmit?: (val: IYaahMakeReservationPaymentInput) => void;
}

const DEFAULT_INITIAL_VALUES: Partial<IYaahMakeReservationPaymentInput> = {};

const validationSchema = yup.object().shape({
  methodId: yup.string().required(),
  reservationId: yup.string().required(),
});

const ReservationCheckoutForm: FC<ReservationCheckoutFormProps> = ({
  initialValues = DEFAULT_INITIAL_VALUES,
  validation,
  onSubmit,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      validateOnMount
      onSubmit={async (val) => Promise.resolve(onSubmit?.(val as never))}
    >
      {({ values, isValid, isSubmitting, initialValues, setFieldValue, handleSubmit }) => {
        const isPartial = initialValues.amount !== values.amount;
        const partialProgress = (values.amount ?? 0) / (initialValues.amount ?? 1);

        return (
          <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
            <NumberPadInput
              defaultValue={values.amount}
              suffix='đ'
              allowNegative={false}
              {...validation?.amount}
              suggestions={Array.from(new Set([...Object.values(validation?.amount ?? {})]))}
              onChange={(val) => setFieldValue('amount', val)}
            >
              <CardActionArea className='bg-background relative flex h-36 flex-col items-center justify-center gap-1 overflow-hidden rounded-xl border-b-4 border-b-white/10'>
                {isPartial && (
                  <div
                    className='bg-warning/20 absolute top-0 left-0 h-full w-full transition-all'
                    style={{
                      width: `${partialProgress * 100}%`,
                    }}
                  />
                )}

                <p className='text-xs uppercase'>{isPartial ? 'Thu một phần' : 'Số tiền cần thu'}</p>

                <p
                  className={cn('text-primary text-4xl font-bold', {
                    'text-warning': isPartial,
                  })}
                >
                  <NumberFlow value={values.amount ?? 0} locales='vi' format={{ style: 'currency', currency: 'VND' }} />{' '}
                  {isPartial && (
                    <span className='text-xs'>
                      / {initialValues.amount?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                    </span>
                  )}
                </p>

                <PencilIcon className='absolute top-4 right-4 size-4' />
              </CardActionArea>
            </NumberPadInput>

            <div className='flex flex-col gap-2'>
              <h3 className='font-medium opacity-60'>Phương thức thanh toán</h3>

              <PaymentMethodSelector onChange={(val) => setFieldValue('methodId', val)} />
            </div>

            <div className='fixed bottom-0 left-0 z-100 w-full p-6'>
              <Button
                fullWidth
                variant='contained'
                disabled={!isValid}
                className='rounded-full'
                loading={isSubmitting}
                type='submit'
              >
                Nhận thông tin thanh toán
              </Button>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default ReservationCheckoutForm;
