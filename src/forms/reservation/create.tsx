import { IYaahApiReservationCreateInput, yaahApi } from '@/apis/yaah';
import { RawSvg } from '@/components/custom';
import NumberPadInput from '@/components/input/numberpad';
import CircleLoading from '@/components/ui/circle-loading';
import { date } from '@/lib/date';
import { cn } from '@/lib/twMerge';
import { AdjustmentsHorizontalIcon, PencilIcon, Squares2X2Icon } from '@heroicons/react/24/outline';
import { PlayArrow } from '@mui/icons-material';
import { Button, CardActionArea, IconButton, SvgIcon } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Formik } from 'formik';
import { FC, useRef } from 'react';
import * as yup from 'yup';
import ReservationResourceSuggestion, { ReservationResourceSuggestionHandle } from './resource-suggestion';

type FormValues = Partial<IYaahApiReservationCreateInput> & {
  _model?: string;
  _category?: string;
  _durationInMinutes?: number;
};

interface DurationOption {
  label: string;
  durationInMinutes: number;
}

const durationOptions: Array<DurationOption> = [
  { label: '1 giờ', durationInMinutes: 60 },
  { label: '2 giờ', durationInMinutes: 120 },
];

const _NOW = date();

interface ReservationCreateFormProps {
  onSubmit?: (val: FormValues) => void;
}

const initialValues: FormValues = {};

const validationSchema = yup.object().shape({
  resourceId: yup.string().required(),
});

const ReservationCreateForm: FC<ReservationCreateFormProps> = ({ onSubmit }) => {
  const { data: businessModels, isLoading: isLoadingBusinessModels } = useQuery({
    queryKey: ['business-model'],
    queryFn: ({ signal }) => yaahApi.businessModel.getAll({ params: { includeStatistics: false }, signal }),
  });
  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ['resource-categories'],
    queryFn: ({ signal }) => yaahApi.resourceCategory.getAll({ signal }),
  });

  const suggestionRef = useRef<ReservationResourceSuggestionHandle>(null);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnMount
      onSubmit={async (val) => {
        const NOW = date();

        await Promise.resolve(
          onSubmit?.({
            type: 'walk_in',
            ...val,
            ...(val._durationInMinutes
              ? {
                  durationMode: 'fixed',
                  startTime: NOW.toISOString(),
                  endTime: NOW.add(val._durationInMinutes, 'minute').toISOString(),
                }
              : {
                  durationMode: 'open_ended',
                }),
            _model: undefined,
            _category: undefined,
            _durationInMinutes: undefined,
          }),
        );
      }}
    >
      {({ values, isValid, isSubmitting, setFieldValue, handleSubmit }) => {
        if (isSubmitting) return <CircleLoading className='h-125' />;

        const hasCustomDuration =
          typeof values._durationInMinutes === 'number' &&
          durationOptions.every((x) => x.durationInMinutes !== values._durationInMinutes);

        return (
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col justify-center gap-8'>
              <div className='flex flex-col justify-center gap-6'>
                <div className='flex flex-col gap-4'>
                  <h3 className='text-xs font-semibold text-white/50 uppercase'>Khách chơi môn gì?</h3>

                  {isLoadingBusinessModels ? (
                    <div className='grid grid-cols-3 gap-3'>
                      {Array.from({ length: 3 }, (_, key) => (
                        <div key={key} className='bg-background h-25 animate-pulse rounded-xl' />
                      ))}
                    </div>
                  ) : (
                    <div className='grid grid-cols-3 gap-3'>
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
                              className={cn('bg-background flex h-25 w-full items-center justify-center rounded-2xl', {
                                'bg-primary/10': isActive,
                              })}
                            >
                              <RawSvg src={model.icon} size={40} />
                            </div>

                            <p className='text-center text-xs font-medium uppercase'>{model.name}</p>
                          </CardActionArea>
                        );
                      })}
                    </div>
                  )}
                </div>

                {values._model ? (
                  <>
                    <div className='flex flex-col gap-4'>
                      <h3 className='text-xs font-semibold text-white/50 uppercase'>Chọn khu vực</h3>

                      <div className='scrollbar-hide -mx-6 overflow-x-auto px-6'>
                        <div className='flex w-fit gap-3'>
                          <CardActionArea
                            className={cn(
                              'bg-background flex w-fit items-center gap-2 rounded-xl border border-white/10 px-6 py-3 text-white',
                              {
                                'bg-white text-black': !values._category,
                              },
                            )}
                            onClick={() => setFieldValue('_category', undefined)}
                          >
                            <Squares2X2Icon className='size-5' />
                            <p className='text-center text-xs whitespace-nowrap'>Tất cả</p>
                          </CardActionArea>

                          {isLoadingCategories ? (
                            <>
                              {Array.from({ length: 5 }, (_, key) => (
                                <div className='h-13.5 w-25 animate-pulse rounded-xl bg-white/10' key={key} />
                              ))}
                            </>
                          ) : (
                            <>
                              {categories?.data.map((category) => {
                                const isActive = category.id === values._category;

                                return (
                                  <CardActionArea
                                    key={category.id}
                                    className={cn(
                                      'bg-background w-fit gap-4 rounded-xl border border-white/10 px-6 py-3 text-white',
                                      {
                                        'bg-white text-black': isActive,
                                      },
                                    )}
                                    onClick={() => setFieldValue('_category', category.id)}
                                  >
                                    <p className='text-center text-xs whitespace-nowrap'>{category.name}</p>
                                  </CardActionArea>
                                );
                              })}
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className='flex flex-col gap-4'>
                      <h3 className='text-xs font-semibold text-white/50 uppercase'>Thời gian chơi</h3>

                      <div className='grid grid-cols-2 gap-3'>
                        <CardActionArea
                          className={cn(
                            'flex h-17.5 flex-col items-start justify-center gap-1 rounded-xl border border-white/20 bg-white/5 px-6 py-4 text-start text-sm',
                            {
                              'border-primary bg-primary/5 text-primary': !values._durationInMinutes,
                            },
                          )}
                          onClick={() => setFieldValue('_durationInMinutes', undefined)}
                        >
                          <p className='font-semibold'>Tự do</p>
                          <p className='text-[10px]'>Tính giờ</p>
                        </CardActionArea>

                        {durationOptions.map((duration, index) => {
                          const isActive = duration.durationInMinutes === values._durationInMinutes;
                          return (
                            <CardActionArea
                              key={index}
                              className={cn(
                                'flex h-17.5 flex-col items-start justify-center gap-1 rounded-xl border border-white/20 bg-white/5 px-6 py-4 text-start text-sm',
                                {
                                  'border-primary bg-primary/5 text-primary': isActive,
                                },
                              )}
                              onClick={() => setFieldValue('_durationInMinutes', duration.durationInMinutes)}
                            >
                              <p className='font-semibold'>{duration.label}</p>
                              <p className='text-[10px]'>Cố định</p>
                            </CardActionArea>
                          );
                        })}

                        <NumberPadInput
                          defaultValue={values._durationInMinutes ?? 0}
                          min={15}
                          suffix='p'
                          onChange={(val) => setFieldValue('_durationInMinutes', val)}
                        >
                          <CardActionArea
                            className={cn(
                              'relative flex h-17.5 flex-col items-start justify-center gap-1 rounded-xl border border-white/20 bg-white/5 px-6 py-4 text-start text-sm',
                              {
                                'border-primary bg-primary/5 text-primary': hasCustomDuration,
                              },
                            )}
                          >
                            <p className='font-semibold'>
                              {hasCustomDuration
                                ? `${values._durationInMinutes?.toLocaleString('vi')} phút`
                                : 'Tùy chỉnh'}
                            </p>
                            <p className='text-[10px]'>Nhập</p>

                            <PencilIcon className='absolute top-1/2 right-4 size-4 -translate-y-1/2' />
                          </CardActionArea>
                        </NumberPadInput>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>

              {values._model ? (
                <>
                  <span className='h-55'></span>
                  <div className='bg-background fixed bottom-0 left-0 flex w-full flex-col gap-4 rounded-t-2xl border-t border-white/20 p-6'>
                    <ReservationResourceSuggestion
                      params={{
                        businessModelId: values._model,
                        resourceCategoryId: values._category,
                        ...(values._durationInMinutes
                          ? {
                              startTime: _NOW.toISOString(),
                              endTime: _NOW.add(values._durationInMinutes, 'hour').toISOString(),
                            }
                          : {}),
                      }}
                      value={values.resourceId}
                      ref={suggestionRef as never}
                      onChange={(val) => setFieldValue('resourceId', val)}
                    />

                    <div className='flex w-full items-center gap-3'>
                      <IconButton
                        size='large'
                        className='w-[64px] rounded-full border border-white/10 bg-white/5'
                        onClick={suggestionRef.current?.openSelector}
                      >
                        <SvgIcon>
                          <AdjustmentsHorizontalIcon />
                        </SvgIcon>
                      </IconButton>

                      <Button
                        variant='contained'
                        className='flex-1 rounded-full'
                        startIcon={<PlayArrow />}
                        disabled={!isValid}
                        type='submit'
                      >
                        Bắt đầu ngay
                      </Button>
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default ReservationCreateForm;
