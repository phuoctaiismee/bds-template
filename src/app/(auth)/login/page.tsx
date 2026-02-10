import LoginScreen from '@/modules/screens/login';
import { FC } from 'react';

type AuthenticationPageProps = object;

const AuthenticationPage: FC<AuthenticationPageProps> = () => {
  return <LoginScreen />;
};

export default AuthenticationPage;
