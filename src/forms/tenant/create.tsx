import { IYaahApiTenantCreateInput, yaahApi } from '@/apis/yaah';
import { RawSvg } from '@/components/custom';
import CheckboxWithAsk from '@/components/input/checkbox-with-ask';
import CircleLoading from '@/components/ui/circle-loading';
import { cn } from '@/lib/twMerge';
import {
  ArrowDownIcon,
  BriefcaseIcon,
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  Cog6ToothIcon,
  CurrencyDollarIcon,
  PuzzlePieceIcon,
  ShieldCheckIcon,
  Squares2X2Icon,
  UsersIcon,
  WalletIcon,
} from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { DataUsageOutlined, TimelineOutlined } from '@mui/icons-material';
import { Button, CardActionArea, SvgIcon, TextField } from '@mui/material';
import NumberFlow from '@number-flow/react';
import { useQuery } from '@tanstack/react-query';
import { FieldArray, Formik } from 'formik';
import { FC, useState } from 'react';

interface TenantCreateFormProps {
  initialValues?: IYaahApiTenantCreateInput;
  onSubmit?: (val: IYaahApiTenantCreateInput) => void;
}

const DEFAULT_VALUES: Partial<IYaahApiTenantCreateInput> = {
  tags: [],
  opening_time: '06:00:00',
  closing_time: '22:00:00',
};

const COLORS = ['#386641', '#208b3a', '#ff6d00', '#240046', '#3a0ca3', '#ef476f', '#f26419'];

const TenantCreateForm: FC<TenantCreateFormProps> = ({ initialValues = DEFAULT_VALUES, onSubmit }) => {
  const [step, setStep] = useState(1);

  const { data: systemTags, isLoading } = useQuery({
    queryKey: ['system-tags'],
    queryFn: ({ signal }) => yaahApi.systemTag.getAll({ signal, params: { reFetch: true } }),
  });

  if (isLoading) return <CircleLoading />;

  return (
    <Formik initialValues={initialValues} onSubmit={async (val) => Promise.resolve(onSubmit?.(val as never))}>
      {({ values, errors, isValid, isSubmitting, handleChange, setFieldValue, handleSubmit }) => {
        const selectedTags = systemTags?.data.filter((x) => values.tags?.includes(x.id));

        return (
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col gap-4'>
              <div className='grid grid-cols-1 gap-1'>
                <div className='text-primary flex items-center justify-center gap-2 font-semibold uppercase'>
                  <div className='bg-primary size-2 rounded-full' />
                  <span className='text-xs'>
                    Bước <NumberFlow value={step} />
                    /3
                  </span>
                </div>

                <h3 className='text-center text-xl font-bold'>
                  {step === 1 && 'Mô hình kinh doanh'}
                  {step === 2 && 'Ý định vận hành'}
                  {step === 3 && 'Hệ thống tóm tắt & xác nhận'}
                </h3>
                <p className='text-neutral-1 text-center text-sm'>
                  {step === 1 && 'Chọn các loại hình dịch vụ bạn cung cấp'}
                  {step === 2 && 'Chọn cách hệ thống hỗ trợ bạn'}
                  {step === 3 && 'Yaah Hub đã hiểu mô hình của bạn như sau.'}
                </p>
              </div>

              {step === 1 && (
                <FieldArray
                  name='tags'
                  render={({ push, remove }) => (
                    <div className='columns-2 space-y-3 space-x-3 md:columns-3'>
                      {systemTags?.data.map((tag, index) => {
                        const height = index % 2 === 0 ? 160 : 100;
                        const _index = values.tags?.indexOf(tag.id);
                        const isActive = typeof _index !== 'undefined' && _index != -1;

                        const handleClick = () => {
                          if (isActive) remove(_index);
                          else push(tag.id);
                        };

                        const color = COLORS[index % COLORS.length];

                        return (
                          <CardActionArea
                            key={tag.id}
                            style={{ height, animationDuration: `${index * 100}ms`, color }}
                            className={cn(
                              'bg-background animate__animated animate__fadeInUp relative flex flex-col items-stretch justify-stretch rounded-xl border border-transparent p-4',
                              {
                                'border-white': isActive,
                              },
                            )}
                            onClick={handleClick}
                          >
                            <div
                              className={cn(
                                'absolute top-0 left-0 size-full overflow-hidden rounded-xl bg-linear-to-br from-current/20 to-current/0',
                                {
                                  'from-current/40': isActive,
                                },
                              )}
                            >
                              {tag.icon && (
                                <RawSvg
                                  src={tag.icon}
                                  size={70}
                                  className={cn(
                                    'absolute right-0 bottom-0 translate-x-1/5 translate-y-1/4 opacity-10',
                                    {
                                      'text-current opacity-50': isActive,
                                    },
                                  )}
                                />
                              )}
                            </div>

                            <div className='flex items-center'>
                              <div
                                className={cn('flex size-8 items-center justify-center rounded-md bg-white/10', {
                                  'bg-current': isActive,
                                })}
                              >
                                {tag.icon && <RawSvg src={tag.icon} size={24} className='text-white' />}
                              </div>
                            </div>

                            <span className='flex-1'></span>

                            <p className='text-white'>{tag.name}</p>

                            {isActive && <CheckCircleIcon className='text-primary absolute top-3 right-3 size-5' />}
                          </CardActionArea>
                        );
                      })}
                    </div>
                  )}
                />
              )}

              {step === 2 && (
                <div className='animate__animated animate__fadeIn flex flex-col gap-6'>
                  <div className='flex flex-col gap-4'>
                    <h4 className='text-neutral-2 text-content-1 flex items-center gap-2 font-medium'>
                      <UsersIcon className='size-4' />
                      Dòng khách (demand flow)
                    </h4>
                    <CheckboxWithAsk
                      options={[
                        {
                          icon: <TimelineOutlined />,
                          label: 'Nhận khách linh hoạt',
                          value: 'flexible',
                          description: 'Khách đến trực tiếp hoặc đặt chỗ trước.',
                        },
                        {
                          icon: <CalendarIcon />,
                          label: 'Ưu tiên đặt trước',
                          value: 'pre_booked',
                          description: 'Giữ chỗ trước, hạn chế walk-in.',
                          ask: {
                            question: 'Có cho phép nhận walk-in khi trống chỗ?',
                            options: [
                              { label: 'Có', value: true },
                              { label: 'Không', value: false },
                            ],
                          },
                        },
                      ]}
                      value={values.book_type}
                      askValue={values.allow_walk_in}
                      onChange={(val) => setFieldValue('book_type', val)}
                      onAskChange={(val) => setFieldValue('allow_walk_in', val)}
                    />
                  </div>

                  <div className='flex flex-col gap-4'>
                    <h4 className='text-neutral-2 text-content-1 flex items-center gap-2 font-medium'>
                      <ClockIcon className='size-4' />
                      Thời gian sử dụng (Time Control)
                    </h4>
                    <CheckboxWithAsk
                      options={[
                        {
                          icon: <DataUsageOutlined />,
                          label: 'Thời gian linh hoạt',
                          value: 'flexible',
                          description: 'Phiên có thể gia hạn.',
                        },
                        {
                          icon: <Squares2X2Icon />,
                          label: 'Theo khung cố định',
                          value: 'fixed',
                          description: 'Bắt đầu - kết thúc theo mốc',
                        },
                        {
                          icon: <PuzzlePieceIcon />,
                          label: 'Kết hợp',
                          value: 'combined',
                          description: 'Tùy phiên, tùy tình huống',
                        },
                      ]}
                      value={values.duration_mode}
                      onChange={(val) => setFieldValue('duration_mode', val)}
                    />
                  </div>

                  <div className='flex flex-col gap-4'>
                    <h4 className='text-neutral-2 text-content-1 flex items-center gap-2 font-medium'>
                      <WalletIcon className='size-4' />
                      Thu tiền (Money Control)
                    </h4>
                    <CheckboxWithAsk
                      options={[
                        {
                          icon: <ArrowDownIcon />,
                          label: 'Thu tiền sau',
                          value: 'pay_after',
                          description: 'Thanh toán khi kết thúc',
                        },
                        {
                          icon: <CurrencyDollarIcon />,
                          label: 'Thu tiền trước',
                          value: 'prepay',
                          description: 'Xác nhận tiền trước khi bắt đầu',
                          ask: {
                            question: 'Chính sách thu trước?',
                            options: [
                              { label: 'Thu đủ', value: 'complete' },
                              { label: 'Đặt cọc', value: 'deposit' },
                            ],
                          },
                        },
                        {
                          icon: <Cog6ToothIcon />,
                          label: 'Tùy tình huống',
                          value: 'flexible',
                          description: 'Linh hoạt theo thực tế',
                        },
                      ]}
                      value={values.payment_mode}
                      askValue={values.prepay_mode}
                      onChange={(val) => setFieldValue('payment_mode', val)}
                      onAskChange={(val) => setFieldValue('prepay_mode', val)}
                    />
                  </div>

                  <div className='flex flex-col gap-4'>
                    <h4 className='text-neutral-2 text-content-1 flex items-center gap-2 font-medium'>
                      <ShieldCheckIcon className='size-4' />
                      Thực tế tại quầy (Front-desk Reality)
                    </h4>
                    <CheckboxWithAsk
                      options={[
                        {
                          icon: <UsersIcon />,
                          label: 'Nhân viên vận hành',
                          value: 'staff',
                          description: 'POS tối giản, hạn chế rủi ro',
                        },
                        {
                          icon: <BriefcaseIcon />,
                          label: 'Chủ trực tiếp vận hành',
                          value: 'owner',
                          description: 'POS đầy đủ quyền kiểm soát',
                        },
                      ]}
                      value={values.staff_mode}
                      onChange={(val) => setFieldValue('staff_mode', val)}
                    />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className='flex flex-col gap-4'>
                  <div className='bg-background flex flex-col gap-4 rounded-lg border border-white/10 p-4'>
                    <div className='flex items-center gap-1'>
                      <h3 className='text-lg'>Thông tin định danh</h3>
                    </div>

                    <TextField
                      fullWidth
                      label='Tên địa điểm'
                      placeholder='Pickle ball'
                      name='name'
                      value={values.name}
                      onChange={handleChange}
                    />

                    <div className='grid grid-cols-2 gap-4'>
                      <TextField
                        fullWidth
                        label='Giờ mở cửa'
                        placeholder='06:00'
                        value={values.opening_time}
                        name='opening_time'
                        type='time'
                        onChange={handleChange}
                      />

                      <TextField
                        fullWidth
                        label='Giờ đóng cửa'
                        placeholder='06:00'
                        value={values.closing_time}
                        name='closing_time'
                        type='time'
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className='bg-background flex rounded-lg border border-white/10 p-4'>
                    <div className='flex-1'>
                      <p className='text-neutral-1'>Hoạt động chính</p>
                      <p className='text-lg font-medium'>{selectedTags?.map((tag) => tag.name).join(', ')}</p>
                    </div>
                  </div>

                  <div className='bg-background flex rounded-lg border border-white/10 p-4'>
                    <div className='flex-1'>
                      <p className='text-neutral-1'>Cách khách đến (Dòng khách)</p>
                      <p className='text-lg font-medium'>Ưu tiên đặt trước (Booking First)</p>
                    </div>
                  </div>

                  <div className='bg-background flex rounded-lg border border-white/10 p-4'>
                    <div className='flex-1'>
                      <p className='text-neutral-1'>Quản lý thời gian</p>
                      <p className='text-lg font-medium'>Kết hợp linh hoạt & cố định</p>
                    </div>
                  </div>

                  <div className='bg-background flex rounded-lg border border-white/10 p-4'>
                    <div className='flex-1'>
                      <p className='text-neutral-1'>Thu tiền</p>
                      <p className='text-lg font-medium'>Thu tiền trước (Check-in)</p>
                    </div>
                  </div>

                  <div className='bg-background flex rounded-lg border border-white/10 p-4'>
                    <div className='flex-1'>
                      <p className='text-neutral-1'>Vận hành tại quầy</p>
                      <p className='text-lg font-medium'>Nhân viên vận hành (POS tối giản)</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className='h-24.5' />

            <div className='bg-background fixed bottom-0 left-0 z-100 flex w-full items-center gap-2 rounded-t-2xl border-t border-t-white/10 p-6'>
              {step === 1 && (
                <Button
                  fullWidth
                  variant='contained'
                  disabled={!values.tags?.length}
                  type='button'
                  onClick={() => setStep(2)}
                >
                  <span className='flex-1 text-start'>Tiếp tục</span>
                  <span className='text-xs'>{values.tags?.length.toLocaleString('vi')} đã chọn</span>
                  <ChevronRightIcon className='size-4' />
                </Button>
              )}
              {step === 2 && (
                <>
                  <Button
                    variant='outlined'
                    className='border-white/20 text-white'
                    type='button'
                    onClick={() => setStep(1)}
                  >
                    <SvgIcon>
                      <ChevronLeftIcon />
                    </SvgIcon>
                  </Button>
                  <Button fullWidth variant='contained' type='button' onClick={() => setStep(3)}>
                    <span className='flex-1 text-start'>Tiếp tục</span>
                    <ChevronRightIcon className='size-4' />
                  </Button>
                </>
              )}
              {step === 3 && (
                <>
                  <Button
                    variant='outlined'
                    className='border-white/20 text-white'
                    type='button'
                    onClick={() => setStep(2)}
                  >
                    <SvgIcon>
                      <ChevronLeftIcon />
                    </SvgIcon>
                  </Button>
                  <Button fullWidth variant='contained' type='submit' loading={isSubmitting}>
                    <span className='flex-1 text-start'>Bắt đầu sử dụng Yaah Hub</span>
                    <ChevronRightIcon className='size-4' />
                  </Button>
                </>
              )}
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default TenantCreateForm;
