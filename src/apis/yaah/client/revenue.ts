import { BaseRequest, BaseResponse } from '@/apis/base';
import { IYaahApiRevenue } from '../interfaces';
import { YaahCrudApiClient } from './crud';

export interface IYaahRevenueGetSingletonRequest extends BaseRequest {
  params: {
    from: string;
    to: string;
    groupBy: 'type' | 'method';
  };
}

export class YaahRevenueApiClient extends YaahCrudApiClient<IYaahApiRevenue> {
  constructor() {
    super({ resource: 'revenue' });
  }

  getSingleton(request: IYaahRevenueGetSingletonRequest): Promise<BaseResponse<IYaahApiRevenue>> {
    return super.getSingleton(request);
  }
}
