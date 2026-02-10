import { IYaahApiReservationCreateInput, yaahApi } from '@/apis/yaah';
import { RawSvg } from '@/components/custom';
import CircleLoading from '@/components/ui/circle-loading';
import { date } from '@/lib/date';
import { cn } from '@/lib/twMerge';
import { CalendarIcon, ChevronRightIcon, UserIcon } from '@heroicons/react/24/outline';
import { AddOutlined, AllInclusive, RemoveOutlined, TimerOutlined } from '@mui/icons-material';
import { Button, CardActionArea, IconButton, SvgIcon } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Formik } from 'formik';
import { FC, RefObject, useImperativeHandle, useState } from 'react';
import * as yup from 'yup';
import ReservationResourceSuggestionV2 from './resource-suggestion-v2';

type FormValues = Partial<IYaahApiReservationCreateInput> & {
  _model?: string;
  _category?: string;
  _durationInMinutes?: number;
  _startAfterInMinutes?: number;
};

interface DurationOption {
  label: string;
  durationInMinutes: number;
}

const durationOptions: Array<DurationOption> = [
  { label: '1h', durationInMinutes: 60 },
  { label: '1h30p', durationInMinutes: 90 },
  { label: '2h', durationInMinutes: 120 },
  { label: '3h', durationInMinutes: 180 },
];

const startAfterOptions: Array<DurationOption> = [
  {
    label: '+5 phút',
    durationInMinutes: 5,
  },
  {
    label: '+10 phút',
    durationInMinutes: 10,
  },
  {
    label: '+15 phút',
    durationInMinutes: 15,
  },
];

const _NOW = date();

export interface ReservationCreateFormV2Handle {
  goPrev: () => boolean;
}

interface ReservationCreateFormV2Props {
  ref?: RefObject<ReservationCreateFormV2Handle>;
  onSubmit?: (val: FormValues) => void;
  onStepChange?: (step: number) => void;
}

const initialValues: FormValues = {};

const validationSchema = yup.object().shape({
  resourceId: yup.string().required(),
});

const LAST_STEP = 3;

const ReservationCreateFormV2: FC<ReservationCreateFormV2Props> = ({ ref, onSubmit, onStepChange }) => {
  const [step, setStep] = useState(1);

  const { data: businessModels, isLoading: isLoadingBusinessModels } = useQuery({
    queryKey: ['business-model'],
    queryFn: ({ signal }) => yaahApi.businessModel.getAll({ params: { includeStatistics: false }, signal }),
  });

  const handlePrev = () => {
    setStep((prev) => --prev);

    onStepChange?.(step - 1);
  };
  const handleNext = () => {
    setStep((prev) => ++prev);

    onStepChange?.(step + 1);
  };

  useImperativeHandle(ref, () => ({
    goPrev() {
      if (step == 1) return false;
      handlePrev();
      return true;
    },
  }));

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnMount
      onSubmit={async (val) => {
        const startTime = val._startAfterInMinutes ? date().add(val._startAfterInMinutes, 'minute') : date();

        await Promise.resolve(
          onSubmit?.({
            type: 'walk_in',
            ...val,
            ...(val._durationInMinutes
              ? {
                  durationMode: 'fixed',
                  startTime: startTime.toISOString(),
                  endTime: startTime.add(val._durationInMinutes, 'minute').toISOString(),
                }
              : {
                  durationMode: 'open_ended',
                  startTime: startTime.toISOString(),
                }),
            _model: undefined,
            _category: undefined,
            _durationInMinutes: undefined,
            _startAfterInMinutes: undefined,
          }),
        );
      }}
    >
      {({ values, isValid, isSubmitting, setFieldValue, handleSubmit, handleChange }) => {
        if (isSubmitting) return <CircleLoading className='h-125' />;
        const model = businessModels?.data.find((x) => x.id === values._model);

        const isFlexible = typeof values._durationInMinutes !== 'number';

        const canNext = step === 1 ? !!values._model : step === 2 ? true : step === 3 ? !!values.resourceId : false;

        const startTime = _NOW.add(values._startAfterInMinutes ?? 0, 'minute');
        const endTime = startTime.add(values._durationInMinutes ?? 0, 'minute');

        const durationInHours = Math.floor((values._durationInMinutes ?? 0) / 60);
        const durationInMinutes = (values._durationInMinutes ?? 0) % 60;

        return (
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col justify-center gap-8'>
              {step === 1 && (
                <div className='flex flex-col justify-center gap-6'>
                  <div className='flex flex-col justify-center gap-3 pt-32'>
                    <h3 className='text-center text-2xl font-bold'>Chọn dịch vụ</h3>
                    <p className='text-neutral-1 text-center'>Vui lòng chọn môn thể thao</p>

                    {isLoadingBusinessModels ? (
                      <div className='grid grid-cols-2 gap-3'>
                        {Array.from({ length: 3 }, (_, key) => (
                          <div key={key} className='bg-background h-30.5 animate-pulse rounded-xl' />
                        ))}
                      </div>
                    ) : (
                      <div className='grid grid-cols-2 gap-3'>
                        {businessModels?.data.map((model) => {
                          const isActive = model.id === values._model;

                          return (
                            <CardActionArea
                              key={model.id}
                              className={cn('flex flex-col gap-2 rounded-xl text-white', {
                                'text-primary': isActive,
                              })}
                              onClick={() => setFieldValue('_model', model.id)}
                            >
                              <div
                                className={cn(
                                  'bg-background flex h-30.5 w-full flex-col items-center justify-center gap-2 rounded-2xl',
                                  {
                                    'bg-primary/10': isActive,
                                  },
                                )}
                              >
                                <div className='size-10'>
                                  <RawSvg src={model.icon} size={40} />
                                </div>
                                <p className='text-center text-xs font-medium uppercase'>{model.name}</p>
                              </div>
                            </CardActionArea>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className='flex flex-col gap-4'>
                  <div className='bg-background grid h-12.5 grid-cols-2 gap-1 rounded-lg p-1'>
                    <CardActionArea
                      className={cn('flex items-center gap-3 text-xs font-medium', {
                        'bg-primary/10 text-primary': !isFlexible,
                      })}
                      onClick={() => setFieldValue('_durationInMinutes', 60)}
                    >
                      <TimerOutlined style={{ fontSize: 14 }} />
                      <span>Theo giờ</span>
                    </CardActionArea>

                    <CardActionArea
                      className={cn('flex items-center gap-3 text-xs font-medium', {
                        'bg-primary/10 text-primary': isFlexible,
                      })}
                      onClick={() => setFieldValue('_durationInMinutes', undefined)}
                    >
                      <AllInclusive style={{ fontSize: 14 }} />
                      <span>Chơi tự do</span>
                    </CardActionArea>
                  </div>

                  {isFlexible ? (
                    <div className='flex flex-col items-center justify-center gap-4 py-16'>
                      <div className='flex size-[128px] items-center justify-center rounded-full border-4 border-dashed border-white/20'>
                        <AllInclusive className='text-primary size-12 animate-pulse' />
                      </div>

                      <div className='text-center'>
                        <p className='font-semibold'>Tính tiền theo giờ thực tế</p>
                        <p className='text-neutral-1 text-sm'>Check-out để dừng tính giờ</p>
                      </div>
                    </div>
                  ) : (
                    <div className='flex flex-col items-center justify-center gap-4 py-8'>
                      <p className='text-center'>Thời lượng chơi</p>
                      <div className='flex h-37.5 items-center gap-4'>
                        <IconButton
                          size='large'
                          className={cn('bg-background border border-white/20', {
                            'pointer-events-none opacity-50': (values._durationInMinutes ?? 0) <= 15,
                          })}
                          onClick={() => setFieldValue('_durationInMinutes', (values._durationInMinutes ?? 0) - 15)}
                        >
                          <RemoveOutlined />
                        </IconButton>

                        <span className='text-7xl font-bold'>
                          {durationInHours.toLocaleString('vi', { minimumIntegerDigits: 2 })}:
                          {durationInMinutes.toLocaleString('vi', { minimumIntegerDigits: 2 })}
                        </span>

                        <IconButton
                          size='large'
                          className='bg-background border border-white/20'
                          onClick={() => setFieldValue('_durationInMinutes', (values._durationInMinutes ?? 0) + 15)}
                        >
                          <AddOutlined />
                        </IconButton>
                      </div>

                      <div className='scrollbar-hide w-full overflow-x-auto'>
                        <div className='flex w-fit items-center gap-3'>
                          {durationOptions.map((duration) => {
                            const isActive = duration.durationInMinutes === values._durationInMinutes;
                            const handleClick = () => setFieldValue('_durationInMinutes', duration.durationInMinutes);
                            return (
                              <CardActionArea
                                key={duration.durationInMinutes}
                                className={cn(
                                  'bg-background flex h-9 min-w-20 items-center justify-center rounded-lg border border-white/5 px-4 text-sm',
                                  {
                                    'bg-white text-black': isActive,
                                  },
                                )}
                                onClick={handleClick}
                              >
                                {duration.label}
                              </CardActionArea>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className='bg-background flex flex-col gap-2 rounded-xl border border-white/10 p-4'>
                    <div className='flex items-center'>
                      <h3>Bắt đầu lúc</h3>
                      <span className='flex-1'></span>
                      <span className='text-primary text-xs font-semibold'>
                        {_NOW.add(values._startAfterInMinutes ?? 0, 'minute').format('HH:mm')}
                      </span>
                    </div>

                    <div className='scrollbar-hide overflow-x-auto'>
                      <div className='flex w-fit items-center gap-2'>
                        <CardActionArea
                          className={cn(
                            'flex h-8.25 items-center rounded-md border border-transparent bg-black px-4 text-center text-xs whitespace-nowrap',
                            {
                              'bg-info/10 text-info border-info/50': !values._startAfterInMinutes,
                            },
                          )}
                          onClick={() => setFieldValue('_startAfterInMinutes', undefined)}
                        >
                          Ngay bây giờ
                        </CardActionArea>

                        {startAfterOptions.map((item) => {
                          const isActive = values._startAfterInMinutes === item.durationInMinutes;
                          const handleClick = () => {
                            setFieldValue('_startAfterInMinutes', item.durationInMinutes);
                          };

                          return (
                            <CardActionArea
                              key={item.durationInMinutes}
                              className={cn(
                                'flex h-8.25 items-center rounded-md border border-transparent bg-black px-4 text-center text-xs whitespace-nowrap',
                                {
                                  'border-info/50 text-info bg-info/10': isActive,
                                },
                              )}
                              onClick={handleClick}
                            >
                              {item.label}
                            </CardActionArea>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <>
                  <CardActionArea className='bg-background flex flex-col gap-2 rounded-lg p-4'>
                    <div className='text-neutral-1 flex w-full items-center text-sm'>
                      <p>Yêu cầu</p>
                      <span className='flex-1'></span>
                      <p>Môn</p>
                    </div>

                    <div className='flex w-full items-center'>
                      <div className='text-neutral-1 flex items-center gap-1 rounded-md bg-white/10 px-2 py-1 text-xs'>
                        {startTime.format('HH:mm')} - {isFlexible ? <AllInclusive /> : endTime.format('HH:mm')}
                      </div>
                      <span className='flex-1'></span>
                      <div className='text-primary flex items-center gap-4 text-lg font-semibold'>
                        {model?.icon && <RawSvg src={model.icon} className='size-4' />}
                        <span>{model?.name}</span>
                      </div>
                    </div>
                  </CardActionArea>

                  <ReservationResourceSuggestionV2
                    value={values.resourceId}
                    params={{
                      businessModelId: values._model,
                      startTime: startTime.toISOString(),
                      ...(isFlexible
                        ? {}
                        : {
                            endTime: endTime.toISOString(),
                          }),
                    }}
                    onChange={(val) => setFieldValue('resourceId', val)}
                  />

                  <div className='bg-background text-neutral-2 flex flex-col rounded-xl border border-white/10 p-4'>
                    <div className='flex items-center gap-3'>
                      <UserIcon className='size-5' />

                      <input
                        type='text'
                        name='customerName'
                        value={values.customerName}
                        className='h-10 flex-1 outline-none'
                        autoComplete='off'
                        placeholder='Tên khách hàng (Không bắt buộc)'
                        onChange={handleChange}
                      />
                    </div>

                    <hr className='text-white/10' />

                    <div className='flex items-center gap-3'>
                      <CalendarIcon className='size-5' />

                      <input
                        type='text'
                        name='internalNotes'
                        value={values.internalNotes}
                        className='h-10 flex-1 outline-none'
                        autoComplete='off'
                        placeholder='Ghi chú vận hành'
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </>
              )}

              <>
                <div className='bg-background fixed bottom-0 left-0 flex w-full flex-col gap-4 border-t border-white/20 p-6'>
                  <div className='flex w-full items-center gap-3'>
                    {step === LAST_STEP && (
                      <Button
                        variant='contained'
                        className='rounded-full'
                        fullWidth
                        disabled={!isValid}
                        type='submit'
                        startIcon={
                          <SvgIcon>
                            <CalendarIcon />
                          </SvgIcon>
                        }
                      >
                        Tạo lịch đặt
                      </Button>
                    )}

                    {step !== LAST_STEP && (
                      <Button
                        variant='contained'
                        className='rounded-full bg-white'
                        fullWidth
                        disabled={!canNext}
                        type='button'
                        endIcon={
                          <SvgIcon>
                            <ChevronRightIcon />
                          </SvgIcon>
                        }
                        onClick={handleNext}
                      >
                        Tiếp tục
                      </Button>
                    )}
                  </div>
                </div>
              </>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default ReservationCreateFormV2;
