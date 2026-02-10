import { EYaahApiBusinessModelPricingModel, IYaahApiBusinessModel } from '@/apis/yaah';
import { cn } from '@/lib/twMerge';
import { CheckCircleIcon, ClockIcon, PlayIcon, UsersIcon } from '@heroicons/react/24/outline';
import { AltRouteOutlined, Inventory2Outlined, LoopOutlined, SportsEsportsOutlined } from '@mui/icons-material';
import { Button, CardActionArea, Divider, Switch, TextField } from '@mui/material';
import { Formik } from 'formik';
import React, { FC } from 'react';
import * as yup from 'yup';

interface BusinessModelCreateFormProps {
  initialValues?: Partial<IYaahApiBusinessModel>;
  onSubmit?: (val?: Partial<IYaahApiBusinessModel>) => void;
}

const INITIAL_VALUES: Partial<IYaahApiBusinessModel> = {};

interface PricingModelOption {
  icon: React.ReactNode;
  label: string;
  description: string;
  value: EYaahApiBusinessModelPricingModel;
}

const businessPricingModels: Array<PricingModelOption> = [
  {
    description: 'Phù hợp: Pickle ball, Bi-da, Karaoke, Sân bóng',
    icon: <ClockIcon />,
    label: 'Theo thời gian',
    value: EYaahApiBusinessModelPricingModel.TimeSlots,
  },
  {
    description: 'Phù hợp: Khu vui chơi, Vé vào cổng, Game máy.',
    icon: <SportsEsportsOutlined />,
    label: 'Theo lượt / vé',
    value: EYaahApiBusinessModelPricingModel.Slot,
  },
  {
    description: 'Phù hợp: Workshop, Lớp học, Buffer vé.',
    icon: <UsersIcon />,
    label: 'Theo đầu người',
    value: EYaahApiBusinessModelPricingModel.People,
  },
  {
    description: 'Phù hợp: Combo dịch vụ, Gói trị liệu.',
    icon: <Inventory2Outlined />,
    label: 'Theo gói / combo',
    value: EYaahApiBusinessModelPricingModel.Combo,
  },
];

interface LogicOption {
  fieldName: string;
  label: string;
  icon: React.ReactNode;
  description: string;
}

const logicOptions: Array<LogicOption> = [
  {
    description: 'Hệ thống sẽ theo dõi trạng thái Đang chơi / Kết thúc',
    fieldName: 'session_tracking',
    icon: <PlayIcon />,
    label: 'Tạo phiên (Session tracking)',
  },
  {
    description: 'Cần xác nhận khách đến trước khi bắt đầu tính tiền',
    fieldName: 'checkin_required',
    icon: <CheckCircleIcon />,
    label: 'Yêu cầu Check-in',
  },
  {
    description: 'Nhân viên có thể thêm giờ / lượt vào phiên đang chạy',
    fieldName: 'allow_extend',
    icon: <LoopOutlined />,
    label: 'Cho phép gia hạn (Extend)',
  },
  {
    description: 'Cho phép nhiều người cùng thanh toán 1 hoá đơn',
    fieldName: 'allow_split_pay',
    icon: <AltRouteOutlined />,
    label: 'Thanh toán chia nhỏ (Split Pay)',
  },
];

const validationSchema = yup
  .object()
  .shape({ name: yup.string().required('Vui lòng nhập tên mô hình'), pricing_model: yup.string().required() });

const BusinessModelCreateForm: FC<BusinessModelCreateFormProps> = ({ initialValues = INITIAL_VALUES, onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (val) => Promise.resolve(onSubmit?.(val))}
    >
      {({ values, errors, dirty, isValid, isSubmitting, setFieldValue, handleChange, handleSubmit }) => {
        const selectedPricingModel = businessPricingModels.find((model) => model.value === values.pricing_model);

        return (
          <form onSubmit={handleSubmit}>
            <div className='grid grid-cols-1 gap-4'>
              <label htmlFor='' className='text-neutral-1 text-lg font-medium'>
                Cách tính tiền
              </label>

              <div className='grid grid-cols-2 gap-4'>
                {businessPricingModels.map((model) => {
                  const isActive = values.pricing_model === model.value;

                  const handleClick = () => {
                    setFieldValue('pricing_model', model.value);
                  };

                  return (
                    <CardActionArea
                      key={model.description}
                      className={cn(
                        'bg-background border-border text-neutral-1 flex h-28 flex-col items-center justify-center gap-2 rounded-lg border',
                        {
                          'border-primary text-white': isActive,
                        },
                      )}
                      onClick={handleClick}
                    >
                      <div
                        className={cn('text-neutral-2 flex size-10 items-center justify-center rounded-lg bg-black', {
                          'bg-primary text-black': isActive,
                        })}
                      >
                        {React.cloneElement(model.icon as never, { className: 'size-6' })}
                      </div>

                      <span>{model.label}</span>
                    </CardActionArea>
                  );
                })}
              </div>

              {selectedPricingModel && <p className='text-primary text-sm'>{selectedPricingModel.description}</p>}

              <label htmlFor='' className='text-neutral-1 text-lg font-medium'>
                Hành vi vận hành (POS Logic)
              </label>

              <div className='grid grid-cols-1 gap-2'>
                {logicOptions.map((logic) => {
                  const isActive = !!values[logic.fieldName];

                  return (
                    <CardActionArea
                      key={logic.fieldName}
                      component='label'
                      className={cn('bg-background border-border flex h-21 items-center gap-4 rounded-lg border p-4', {
                        'border-primary': isActive,
                      })}
                    >
                      <div
                        className={cn('text-neutral-1 flex size-10 items-center justify-center rounded-lg bg-black', {
                          'bg-primary/10 text-primary': isActive,
                        })}
                      >
                        {React.cloneElement(logic.icon as never, { className: 'size-5' })}
                      </div>

                      <div className='flex flex-1 flex-col gap-1'>
                        <h3 className='text-sm font-semibold'>{logic.label}</h3>
                        <p className='text-neutral-1 text-xs'>{logic.description}</p>
                      </div>

                      <Switch checked={isActive} onChange={(_, checked) => setFieldValue(logic.fieldName, checked)} />
                    </CardActionArea>
                  );
                })}
              </div>

              <Divider />

              <TextField
                label='Tên mô hình'
                placeholder='Pickle ball'
                value={values.name}
                name='name'
                error={!!errors.name}
                helperText={errors.name}
                autoComplete='off'
                onChange={handleChange}
              />
            </div>

            <div className='h-37.5'></div>

            <div className='bg-background fixed bottom-0 left-0 z-100 w-full p-6'>
              <Button fullWidth variant='contained' type='submit' disabled={!isValid || !dirty} loading={isSubmitting}>
                Tạo mô hình kinh doanh
              </Button>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default BusinessModelCreateForm;
