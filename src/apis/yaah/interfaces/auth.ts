import { BaseRequest, BaseResponse } from '@/apis/base';
import { ITekgetherApiUser } from './user';

export interface IYaahLoginRequest extends BaseRequest {
  body: {
    email: string;
    method: 'code';
  };
}

export type IYaahLoginResponse = BaseResponse<{
  accessToken: string;
  user: ITekgetherApiUser;
}>;

export interface IYaahRegisterRequest extends BaseRequest {
  body: {
    first_name: string;
    // last_name: string;
    email: string;
    password: string;
  };
  params: {
    provider: 'email';
  };
}

export type IYaahRegisterResponse = BaseResponse<{
  accessToken: string;
  user: ITekgetherApiUser;
}>;

export interface IYaahAuthVerifyCodeRequest extends BaseRequest {
  body: {
    code: string;
  };
}

export type IYaahAuthVerifyCodeResponse = BaseResponse<{
  access_token: string;
}>;
