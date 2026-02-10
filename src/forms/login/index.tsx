import { Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import { FC, useCallback } from 'react';
import { object, string } from 'yup';

interface LoginValues {
  email: string;
}

const validationSchema = object().shape({
  email: string().required('Vui lòng nhập địa chỉ email').email('Địa chỉ email không hợp lệ'),
});

interface LoginFormProps {
  onSubmit?: (val: LoginValues) => void;
}

const LoginForm: FC<LoginFormProps> = ({ onSubmit }) => {
  const handleSubmit = useCallback(
    async (val: LoginValues) => {
      await Promise.resolve(onSubmit?.(val));
    },
    [onSubmit],
  );

  return (
    <Formik<LoginValues> initialValues={{ email: '' }} onSubmit={handleSubmit} validationSchema={validationSchema}>
      {({ values, dirty, errors, handleChange, handleSubmit, isValid, isSubmitting }) => (
        <form onChange={handleChange} onSubmit={handleSubmit}>
          <div className='grid gap-4'>
            <div className='grid gap-2'>
              <TextField
                fullWidth
                placeholder='staff@yaah.hub'
                name='email'
                value={values.email}
                autoComplete='email'
                error={!!errors.email}
                helperText={errors.email}
              />
            </div>

            <Button variant='contained' type='submit' disabled={!isValid || !dirty} loading={isSubmitting}>
              Nhận mã xác thực
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default LoginForm;
