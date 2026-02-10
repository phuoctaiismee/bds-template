'use client';
import { IYaahApiShift } from '@/apis/yaah';
import { cn } from '@/lib/twMerge';
import { ClockIcon, ComputerDesktopIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { Button, CardActionArea, Divider, FormControlLabel, Switch, TextField } from '@mui/material';
import { FieldArray, Formik } from 'formik';
import { FC } from 'react';
import * as yup from 'yup';

interface ShiftFormProps {
  initialValues?: Partial<IYaahApiShift>;
  onSubmit?: (val: Partial<IYaahApiShift>) => void;
}

const DEFAULT_VALUES: Partial<IYaahApiShift> = {};

const validationSchema = yup.object({
  name: yup.string().required('Tên ca không được để trống'),
  shift_code: yup.string().required('Mã nội bộ không được để trống'),
  description: yup.string().optional(),
  days_of_week: yup
    .array()
    .of(yup.string())
    .min(1, 'Vui lòng chọn ít nhất một ngày trong tuần')
    .required('Vui lòng chọn ngày hoạt động'),
  start_time: yup.string().required('Giờ bắt đầu không được để trống'),
  end_time: yup.string().required('Giờ kết thúc không được để trống'),
});

const ShiftForm: FC<ShiftFormProps> = ({ initialValues = DEFAULT_VALUES, onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={async (val) => Promise.resolve(onSubmit?.(val))}
    >
      {({ values, errors, isSubmitting, isValid, dirty, setFieldValue, handleSubmit, handleChange }) => {
        return (
          <form onChange={handleChange} onSubmit={handleSubmit}>
            <div className='flex flex-col gap-4'>
              <div className='flex flex-col gap-1'>
                <label className='text-neutral-1' htmlFor='name'>
                  Tên ca
                </label>
                <TextField
                  placeholder='Ca sáng'
                  name='name'
                  id='name'
                  value={values.name}
                  error={!!errors.name}
                  helperText={errors.name}
                  autoComplete='off'
                />
              </div>

              <div className='flex flex-col gap-1'>
                <label className='text-neutral-1' htmlFor='shift_code'>
                  Mã nội bộ
                </label>
                <TextField
                  placeholder='01-MORN'
                  name='shift_code'
                  id='shift_code'
                  value={values.shift_code}
                  error={!!errors.shift_code}
                  helperText={errors.shift_code}
                  autoComplete='off'
                />
              </div>

              <div className='flex flex-col gap-1'>
                <label className='text-neutral-1' htmlFor='description'>
                  Mô tả
                </label>
                <TextField
                  placeholder='Làm việc buổi sáng từ 7h đến 12h'
                  multiline
                  minRows={3}
                  name='description'
                  id='description'
                  value={values.description}
                  error={!!errors.description}
                  helperText={errors.description}
                  autoComplete='off'
                />
              </div>

              <Divider className='my-4 bg-white/20' />

              <div className='text-neutral-1 flex items-center gap-2'>
                <ClockIcon className='size-6' />
                <h3 className='font-medium'>Khung giờ hoạt động</h3>
              </div>

              <FieldArray
                name='days_of_week'
                render={({ push, remove }) => {
                  return (
                    <div className='scrollbar-hide -mx-6 overflow-x-auto'>
                      <div className='flex items-center gap-2 px-6'>
                        {Array.from({ length: 7 }, (_, index) => {
                          const value = `${index + 1}`;

                          const valueIndex = values.days_of_week?.indexOf(value) ?? -1;
                          const isActive = valueIndex !== -1;

                          let label = `T${+value + 1}`;
                          if (value === '7') {
                            label = 'CN';
                          }

                          const handleClick = () => {
                            if (isActive) remove(valueIndex);
                            else push(value);
                          };

                          return (
                            <CardActionArea
                              key={index}
                              className={cn('rounded-md bg-black px-4 py-1 text-lg', {
                                'bg-primary text-black': isActive,
                              })}
                              onClick={handleClick}
                            >
                              {label}
                            </CardActionArea>
                          );
                        })}
                      </div>
                    </div>
                  );
                }}
              />

              <div className='grid grid-cols-2 gap-4'>
                <div className='flex flex-col gap-1'>
                  <label className='text-neutral-1' htmlFor='start_time'>
                    Giờ bắt đầu
                  </label>

                  <TextField
                    type='time'
                    name='start_time'
                    id='start_time'
                    error={!!errors.start_time}
                    helperText={errors.start_time}
                  />
                </div>

                <div className='flex flex-col gap-1'>
                  <label className='text-neutral-1' htmlFor='end_time'>
                    Giờ kết thúc
                  </label>

                  <TextField
                    type='time'
                    name='end_time'
                    id='end_time'
                    error={!!errors.end_time}
                    helperText={errors.end_time}
                  />
                </div>
              </div>

              <div className='rounded-lg bg-black px-2 py-4'>
                <FormControlLabel
                  label='Đang sử dụng'
                  className='w-full gap-2 pr-6 [&_.MuiFormControlLabel-label]:flex-1 [&_span]:font-normal'
                  labelPlacement='start'
                  control={
                    <Switch
                      checked={values.is_active}
                      onChange={(_, checked) => {
                        setFieldValue('is_active', checked);
                      }}
                    />
                  }
                />
              </div>

              <Divider className='my-4 bg-white/20' />

              <div className='text-neutral-1 flex items-center gap-2'>
                <ShieldCheckIcon className='size-6' />
                <h3 className='font-medium'>Quy tắc tài chính</h3>
              </div>

              <div className='pointer-events-none flex flex-col gap-4 rounded-lg bg-black px-2 py-4 opacity-50'>
                <FormControlLabel
                  label='Bắt buộc đối soát khi đóng ca'
                  className='w-full gap-2 pr-6 [&_.MuiFormControlLabel-label]:flex-1 [&_span]:font-normal'
                  labelPlacement='start'
                  control={<Switch />}
                />
                <FormControlLabel
                  label='Cho phép đóng ca muộn'
                  className='w-full gap-2 pr-6 [&_.MuiFormControlLabel-label]:flex-1 [&_span]:font-normal'
                  labelPlacement='start'
                  control={<Switch />}
                />
              </div>

              <Divider className='my-4 bg-white/20' />

              <div className='text-neutral-1 flex items-center gap-2'>
                <ComputerDesktopIcon className='size-6' />
                <h3 className='font-medium'>Liên kết vận hành</h3>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div className='flex flex-col gap-1'>
                  <label className='text-neutral-1' htmlFor=''>
                    Thiết bị áp dụng
                  </label>
                  <TextField size='small' value='Tất cả thiết bị' />
                </div>

                <div className='flex flex-col gap-1'>
                  <label className='text-neutral-1' htmlFor=''>
                    Vai trò được mở
                  </label>
                  <TextField size='small' value='Manager, Staff' />
                </div>
              </div>

              <div className='h-26'></div>

              <div className='fixed bottom-0 left-0 w-full p-6'>
                <Button
                  variant='contained'
                  fullWidth
                  type='submit'
                  disabled={!isValid || !dirty}
                  loading={isSubmitting}
                >
                  Lưu
                </Button>
              </div>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default ShiftForm;
