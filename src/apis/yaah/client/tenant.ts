import { BaseRequest, BaseResponse } from '@/apis/base';
import { IYaahApiTenant } from '../interfaces';
import { YaahCrudApiClient } from './crud';

export class YaahTenantApiClient extends YaahCrudApiClient<IYaahApiTenant> {
  constructor() {
    super({ resource: 'tenants' });
  }

  me(request?: BaseRequest): Promise<BaseResponse<IYaahApiTenant>> {
    return this.client.get('/me', { signal: request?.signal });
  }
}
