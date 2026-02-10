import { IYaahRegisterRequest } from '@/apis/yaah/interfaces/auth';
import { EmailOutlined, LockOutlined } from '@mui/icons-material';
import { Button, InputAdornment, TextField } from '@mui/material';
import { Formik } from 'formik';
import { FC, useCallback, useState } from 'react';
import { object, ref, string } from 'yup';

type RegisterValues = IYaahRegisterRequest['body'] & {
  confirmPassword: string;
};

const validationSchema = object().shape({
  first_name: string().required('Vui lòng nhập tên của bạn'),
  email: string().required('Vui lòng nhập địa chỉ email').email('Địa chỉ email không hợp lệ'),
  password: string().required('Vui lòng nhập mật khẩu'),
  confirmPassword: string()
    .required('Vui lòng xác nhận mật khẩu')
    .oneOf([ref('password')], 'Mật khẩu nhập lại không khớp'),
});

const DEFAULT_VALUES: RegisterValues = { email: '', password: '', confirmPassword: '', first_name: '' };

interface RegisterFormProps {
  onSubmit?: (val: RegisterValues) => void;
}

const RegisterForm: FC<RegisterFormProps> = ({ onSubmit }) => {
  const handleSubmit = useCallback(
    async (val: RegisterValues) => {
      await Promise.resolve(onSubmit?.(val));
    },
    [onSubmit],
  );

  const [step, setStep] = useState(0);

  return (
    <Formik<RegisterValues> initialValues={DEFAULT_VALUES} onSubmit={handleSubmit} validationSchema={validationSchema}>
      {({ values, errors, handleChange, handleSubmit, isValid, isSubmitting }) => (
        <form onChange={handleChange} onSubmit={handleSubmit}>
          <div className='grid gap-4'>
            <div className='grid gap-2'>
              {step === 0 && (
                <>
                  <TextField
                    fullWidth
                    placeholder='Hãy nhập tên của bạn'
                    name='first_name'
                    value={values.first_name}
                    autoComplete='name'
                    error={!!errors.first_name}
                    helperText={errors.first_name}
                    autoFocus
                  />
                </>
              )}

              {step === 1 && (
                <>
                  <TextField
                    fullWidth
                    placeholder='Email'
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position='start'>
                            <EmailOutlined />
                          </InputAdornment>
                        ),
                      },
                    }}
                    name='email'
                    value={values.email}
                    autoComplete='email'
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                  <TextField
                    fullWidth
                    placeholder='Mật khẩu'
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position='start'>
                            <LockOutlined />
                          </InputAdornment>
                        ),
                      },
                    }}
                    name='password'
                    value={values.password}
                    autoComplete='new-password'
                    error={!!errors.password}
                    helperText={errors.password}
                    type='password'
                  />

                  <TextField
                    fullWidth
                    placeholder='Xác nhận mật khẩu'
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position='start'>
                            <LockOutlined />
                          </InputAdornment>
                        ),
                      },
                    }}
                    name='confirmPassword'
                    value={values.confirmPassword}
                    autoComplete='new-password'
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                    type='password'
                  />
                </>
              )}
            </div>

            {step === 0 && (
              <>
                <Button variant='contained' type='button' disabled={!values.first_name} onClick={() => setStep(1)}>
                  Tiếp tục
                </Button>
              </>
            )}

            {step === 1 && (
              <>
                <Button variant='contained' type='submit' disabled={!isValid} loading={isSubmitting}>
                  Đăng ký
                </Button>
              </>
            )}
          </div>
        </form>
      )}
    </Formik>
  );
};

export default RegisterForm;
