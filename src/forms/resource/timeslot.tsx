import {
  EYaahApiResourcePricingRoundingMode,
  EYaahApiResourcePricingStrategyMode,
  IYaahApiResource,
} from '@/apis/yaah';
import { AppTopbar } from '@/lib/navigation';
import { cn } from '@/lib/twMerge';
import { ArrowRightIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { AddOutlined, CloseOutlined, EditOutlined, LayersOutlined } from '@mui/icons-material';
import {
  Button,
  CardActionArea,
  Collapse,
  IconButton,
  InputAdornment,
  SwipeableDrawer,
  TextField,
} from '@mui/material';
import { FieldArray, useFormikContext } from 'formik';
import React, { FC } from 'react';

interface PricingStrategyOption {
  icon: React.ReactNode;
  label: string;
  description: string;
  value: EYaahApiResourcePricingStrategyMode;
}

const TOTAL_MINUTES = 1440;

const pricingStrategyOptions: Array<PricingStrategyOption> = [
  {
    icon: <ShieldCheckIcon />,
    label: 'Bảng giá dùng chung',
    description: 'Kế thừa giá từ mô hình kinh doanh. Tự động cập nhật khi mô hình đổi giá.',
    value: EYaahApiResourcePricingStrategyMode.Inherit,
  },
  {
    icon: <EditOutlined />,
    label: 'Override cho sân này',
    description: 'Thiết lập giá riêng (VD: Sân VIP, Sân xấu). Không bị ảnh hưởng bởi giá chung.',
    value: EYaahApiResourcePricingStrategyMode.Custom,
  },
];

interface ResourceTimeslotProps {
  open?: boolean;
  onClose?: () => void;
}

const ResourceTimeslot: FC<ResourceTimeslotProps> = ({ onClose, open }) => {
  const { values, setFieldValue, handleChange } = useFormikContext<IYaahApiResource>();

  return (
    <SwipeableDrawer
      open={open}
      anchor='right'
      onClose={onClose as never}
      onOpen={() => {}}
      slotProps={{ paper: { className: 'w-full bg-black flex flex-col' } }}
    >
      <AppTopbar
        right={false}
        center={
          <div>
            <h2 className='text-lg font-semibold'>{values.name}</h2>
            <p className='text-neutral-1 text-xs'>Cấu hình giá & thời gian</p>
          </div>
        }
        onBack={onClose}
      />

      <div className='flex-1 overflow-y-auto'>
        <div className='grid grid-cols-1 gap-4 overflow-y-auto p-4'>
          <CardActionArea className='bg-background border-border flex items-start gap-4 rounded-lg border p-4'>
            <div className='flex size-10 items-center justify-center rounded-md bg-white/10'>
              <LayersOutlined className='text-neutral-1 size-6' />
            </div>
            <div className='flex flex-1 flex-col gap-0.5'>
              <p className='text-neutral-1 text-xs'>Mô hình kinh doanh gốc</p>
              <h3 className='font-semibold'>Tính tiền theo thời gian</h3>

              <div className='flex gap-1'>
                <div className='text-neutral-1 rounded-sm bg-white/10 px-2 py-1 text-[10px]'>Session: bật</div>
                <div className='text-neutral-1 rounded-sm bg-white/10 px-2 py-1 text-[10px]'>Check-in: bật</div>
                <div className='text-neutral-1 rounded-sm bg-white/10 px-2 py-1 text-[10px]'>Gia hạn: bật</div>
              </div>
            </div>
          </CardActionArea>

          <label htmlFor=''>Chiến lược giá</label>

          <div className='grid grid-cols-1 gap-2'>
            {pricingStrategyOptions.map((option) => {
              const isActive = values.pricing_strategy_mode === option.value;
              return (
                <CardActionArea
                  key={option.value}
                  className={cn('bg-background border-border flex flex-col items-stretch gap-1 rounded-lg border p-4', {
                    'border-primary': isActive,
                  })}
                  onClick={() => setFieldValue('pricing_strategy_mode', option.value)}
                >
                  <div
                    className={cn('text-neutral-1 flex size-9 items-center justify-center rounded-md bg-white/10', {
                      'text-primary bg-primary/10': isActive,
                    })}
                  >
                    {React.cloneElement(option.icon as never, { className: 'size-5' })}
                  </div>

                  <h4 className='text-sm font-semibold'>{option.label}</h4>
                  <p className='text-neutral-1 text-xs'>{option.description}</p>
                </CardActionArea>
              );
            })}
          </div>

          <Collapse in={values.pricing_strategy_mode === EYaahApiResourcePricingStrategyMode.Custom}>
            <FieldArray
              name='timeslot_pricings'
              render={({ push, remove }) => {
                return (
                  <div className='grid grid-cols-1 gap-4'>
                    <div className='flex items-center'>
                      <label htmlFor='' className='flex-1'>
                        Khung giờ & đơn giá
                      </label>

                      <Button
                        size='small'
                        className='rounded-full bg-white/10 px-6 text-white'
                        startIcon={<AddOutlined />}
                        onClick={() => push({})}
                      >
                        Thêm khung
                      </Button>
                    </div>

                    <div className='bg-background relative flex h-5 overflow-hidden rounded-full'>
                      {values.timeslot_pricings?.map((timeslot, index) => {
                        if (!timeslot.start_time || !timeslot.end_time) return null;

                        const [start_hours, start_minutes] = timeslot.start_time.split(':').map((x) => +x);
                        const [end_hours, end_minutes] = timeslot.end_time.split(':').map((x) => +x);

                        const start = start_hours * 60 + start_minutes;
                        const end = end_hours * 60 + end_minutes;

                        return (
                          <div
                            key={index}
                            className='bg-primary absolute top-0 left-0 h-full w-2'
                            style={{
                              left: `${(start / TOTAL_MINUTES) * 100}%`,
                              width: `${((end - start) / TOTAL_MINUTES) * 100}%`,
                            }}
                          />
                        );
                      })}
                    </div>

                    <div className='grid grid-cols-1 gap-4'>
                      {values.timeslot_pricings?.map((timeslot, index) => (
                        <section key={index} className='bg-background border-border rounded-lg border p-4'>
                          <div className='flex flex-col gap-4'>
                            <div className='flex items-center gap-4'>
                              <TextField
                                type='time'
                                value={timeslot.start_time}
                                name={`timeslot_pricings.${index}.start_time`}
                                onChange={handleChange}
                              />

                              <ArrowRightIcon className='text-neutral-1 size-4' />

                              <TextField
                                type='time'
                                value={timeslot.end_time}
                                name={`timeslot_pricings.${index}.end_time`}
                                onChange={handleChange}
                              />
                              <span className='flex-1'></span>
                              <IconButton onClick={() => remove(index)}>
                                <CloseOutlined />
                              </IconButton>
                            </div>

                            <TextField
                              slotProps={{
                                input: {
                                  endAdornment: <InputAdornment position='end'>đ</InputAdornment>,
                                },
                                htmlInput: {
                                  className: 'text-end',
                                  inputMode: 'numeric',
                                },
                              }}
                              name={`timeslot_pricings.${index}.price_per_hour`}
                              type='number'
                              value={timeslot.price_per_hour}
                              onChange={handleChange}
                            />
                          </div>
                        </section>
                      ))}
                    </div>
                  </div>
                );
              }}
            />
          </Collapse>

          <label htmlFor=''>Làm tròn thời gian</label>

          <div className='grid grid-cols-1 gap-2'>
            <CardActionArea
              className={cn('bg-background border-border text-neutral-1 rounded-lg border p-4 text-sm font-semibold', {
                'bg-border/70 text-white': values.price_rounding_mode === EYaahApiResourcePricingRoundingMode.None,
              })}
              onClick={() => setFieldValue('price_rounding_mode', EYaahApiResourcePricingRoundingMode.None)}
            >
              Làm tròn theo phút
            </CardActionArea>

            <CardActionArea
              className={cn('bg-background border-border text-neutral-1 rounded-lg border p-4 text-sm font-semibold', {
                'bg-border/70 text-white': values.price_rounding_mode === EYaahApiResourcePricingRoundingMode.UpTo15M,
              })}
              onClick={() => setFieldValue('price_rounding_mode', EYaahApiResourcePricingRoundingMode.UpTo15M)}
            >
              Làm tròn lên mỗi 15 phút
            </CardActionArea>

            <CardActionArea
              className={cn('bg-background border-border text-neutral-1 rounded-lg border p-4 text-sm font-semibold', {
                'bg-border/70 text-white': values.price_rounding_mode === EYaahApiResourcePricingRoundingMode.UpTo30M,
              })}
              onClick={() => setFieldValue('price_rounding_mode', EYaahApiResourcePricingRoundingMode.UpTo30M)}
            >
              Làm tròn lên mỗi 30 phút
            </CardActionArea>
          </div>
        </div>
      </div>

      <div className='p-4'>
        <Button variant='contained' fullWidth onClick={onClose}>
          Lưu
        </Button>
      </div>
    </SwipeableDrawer>
  );
};

export default ResourceTimeslot;
