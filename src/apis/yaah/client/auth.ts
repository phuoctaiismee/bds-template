import { BaseResponse } from '@/apis/base';
import {
  IYaahAuthVerifyCodeRequest,
  IYaahAuthVerifyCodeResponse,
  IYaahLoginRequest,
  IYaahLoginResponse,
  IYaahRegisterRequest,
  IYaahRegisterResponse,
} from '../interfaces/auth';
import { ITekgetherApiUser as IYaahApiUser } from '../interfaces/user';
import { YaahCrudApiClient } from './crud';

export class YaahAuthApiClient extends YaahCrudApiClient {
  constructor() {
    super({ resource: 'auth' });
  }

  signIn(request: IYaahLoginRequest): Promise<IYaahLoginResponse> {
    return this.client.post('/login', request.body);
  }

  signUp(request: IYaahRegisterRequest): Promise<IYaahRegisterResponse> {
    return this.client.post('/register', request.body, { params: request.params });
  }

  verifyCode(request: IYaahAuthVerifyCodeRequest): Promise<IYaahAuthVerifyCodeResponse> {
    return this.client.post('/verify-code', request.body, { signal: request.signal });
  }

  me(): Promise<BaseResponse<IYaahApiUser>> {
    return this.client.get('/me');
  }
}
