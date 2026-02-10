import { IYaahApiResource } from '@/apis/yaah';
import NumberPadInput from '@/components/input/numberpad';
import BusinessModelSelector from '@/modules/business-model/selector';
import ResourceCategorySelector from '@/modules/resource-category/selector';
import { getChangedValues } from '@/utils';
import { ArrowRightIcon, ClockIcon } from '@heroicons/react/24/outline';
import { Button, CardActionArea, Divider, FormControlLabel, Switch, TextField } from '@mui/material';
import { Formik } from 'formik';
import { FC, useState } from 'react';
import * as yup from 'yup';
import ResourceTimeslot from './timeslot';

interface ResourceFormProps {
  initialValues?: Partial<IYaahApiResource>;
  onSubmit?: (val: Partial<IYaahApiResource>) => void;
}

const validationSchema = yup.object().shape({
  name: yup.string().required('Vui lòng nhập tên tài nguyên'),
  code: yup.string().required('Vui lòng mã tên tài nguyên'),
  business_model_id: yup.string().required('Vui lòng chọn mô hình'),
  resource_category_id: yup.string().required('Vui lòng chọn khu vực'),
});

const ResourceForm: FC<ResourceFormProps> = ({ initialValues = {}, onSubmit }) => {
  const [isShowTimeSlot, setIsShowTimeSlot] = useState(false);

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={async (val) => Promise.resolve(onSubmit?.(getChangedValues(val, initialValues)))}
    >
      {({ values, errors, isValid, isSubmitting, dirty, setFieldValue, handleChange, handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col gap-4'>
              <div className='flex flex-col gap-1'>
                <label htmlFor='name' className='text-neutral-1 text-sm'>
                  Tên hiển thị
                </label>
                <TextField
                  placeholder='Pickle ball'
                  value={values.name}
                  id='name'
                  name='name'
                  error={!!errors.name}
                  helperText={errors.name}
                  autoComplete='off'
                  onChange={handleChange}
                />
              </div>

              <div className='flex flex-col gap-1'>
                <label htmlFor='code' className='text-neutral-1 text-sm'>
                  Mã nội bộ
                </label>
                <TextField
                  placeholder='C01'
                  value={values.code}
                  id='code'
                  name='code'
                  error={!!errors.code}
                  helperText={errors.code}
                  autoComplete='off'
                  onChange={handleChange}
                />
              </div>

              <Divider className='bg-white/20' />

              <h3 className='text-neutral-1 text-sm font-semibold uppercase'>Cấu hình vận hành</h3>

              <div className='grid grid-cols-2 gap-4'>
                <BusinessModelSelector
                  value={values.business_model_id}
                  error={!!errors.business_model_id}
                  helperText={errors.business_model_id}
                  onChange={(id, model) => setFieldValue('business_model_id', id)}
                />

                <ResourceCategorySelector
                  value={values.resource_category_id}
                  error={!!errors.resource_category_id}
                  helperText={errors.resource_category_id}
                  onChange={(id, cat) => setFieldValue('resource_category_id', id)}
                />
              </div>

              <div className='flex flex-col gap-4 rounded-lg bg-black p-4'>
                <FormControlLabel
                  label='Cho phép đặt online'
                  control={<Switch />}
                  labelPlacement='start'
                  slotProps={{ typography: { className: 'w-full font-normal' } }}
                  className='pr-4'
                  checked={values.allow_online_booking}
                  onChange={(_, checked) => setFieldValue('allow_online_booking', checked)}
                />

                <FormControlLabel
                  label='Cho phép walk-in'
                  control={<Switch />}
                  labelPlacement='start'
                  slotProps={{ typography: { className: 'w-full font-normal' } }}
                  className='pr-4'
                  checked={values.allow_walk_in_booking}
                  onChange={(_, checked) => setFieldValue('allow_walk_in_booking', checked)}
                />
              </div>

              <label htmlFor='' className='text-neutral-1 text-sm'>
                Quy tắc thời gian
              </label>

              <NumberPadInput
                defaultValue={values.min_booking_duration_minutes}
                suffix='p'
                onChange={(val) => setFieldValue('min_booking_duration_minutes', val)}
              >
                <CardActionArea className='flex items-center rounded-lg bg-black p-4'>
                  <p className='flex-1'>Thời lượng tối thiểu</p>
                  <span>{values.min_booking_duration_minutes?.toLocaleString('vi')} phút</span>
                </CardActionArea>
              </NumberPadInput>

              <label htmlFor='' className='text-neutral-1 text-sm'>
                Giá và thời gian
              </label>

              <CardActionArea
                className='bg-background flex items-center gap-2 rounded-lg border border-white/10 p-4'
                onClick={() => setIsShowTimeSlot(true)}
              >
                <div className='bg-primary/10 text-primary flex size-10 items-center justify-center rounded-md'>
                  <ClockIcon className='size-5' />
                </div>

                <div className='flex flex-1 flex-col gap-1'>
                  <h4 className='text-sm font-semibold'>Cấu hình chi tiết</h4>
                  <p className='text-neutral-1 text-xs'>Override, giờ vàng, làm tròn</p>
                </div>

                <ArrowRightIcon className='text-neutral-1 size-4' />
              </CardActionArea>
            </div>

            <ResourceTimeslot open={isShowTimeSlot} onClose={() => setIsShowTimeSlot(false)} />

            <div className='h-26' />

            <div className='fixed bottom-0 left-0 w-full p-6'>
              <Button variant='contained' fullWidth disabled={!isValid || !dirty} loading={isSubmitting} type='submit'>
                Lưu
              </Button>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default ResourceForm;
