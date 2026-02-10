import { IYaahAuthVerifyCodeRequest } from '@/apis/yaah/interfaces/auth';
import { Button } from '@mui/material';
import { Formik } from 'formik';
import { MuiOtpInput } from 'mui-one-time-password-input';
import { FC } from 'react';
import * as yup from 'yup';

type FormValues = IYaahAuthVerifyCodeRequest['body'];

interface LoginOTPFormProps {
  initialValues?: FormValues;
  onSubmit?: (val: FormValues) => void;
}

const DEFAULT_VALUES: IYaahAuthVerifyCodeRequest['body'] = {
  code: '',
};

const validationSchema = yup.object().shape({ code: yup.string().required().length(6) });

const LoginOTPForm: FC<LoginOTPFormProps> = ({ initialValues = DEFAULT_VALUES, onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (val) => Promise.resolve(onSubmit?.(val))}
      validationSchema={validationSchema}
    >
      {({ values, errors, isSubmitting, isValid, dirty, setFieldValue, handleSubmit }) => (
        <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
          <div className='mx-auto w-full max-w-100'>
            <MuiOtpInput
              length={6}
              sx={{ gap: 2 }}
              autoFocus
              value={values.code}
              inputMode='numeric'
              onChange={(val) => setFieldValue('code', val)}
            />
          </div>

          <Button fullWidth variant='contained' type='submit' loading={isSubmitting} disabled={!isValid || !dirty}>
            Xác thực
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default LoginOTPForm;
