import { BasePaginationResponse, BaseRequest, BaseResponse } from '@/apis/base';
import { IYaahApiResource } from '../interfaces';
import { YaahCrudApiClient } from './crud';

interface IYaahResourceEstimatePriceRequest extends BaseRequest {
  body: {
    startTime: string;
    endTime: string;
  };
  pathParams: {
    id: string;
  };
}

interface IYaahResourceEstimatedPrice {
  price: number;
  breakdown: Array<{
    description: string;
    amount: number;
  }>;
}

export class YaahResourceApiClient extends YaahCrudApiClient<IYaahApiResource> {
  constructor() {
    super({ resource: 'resources' });
  }

  getSuggestions(request?: BaseRequest): Promise<BasePaginationResponse<IYaahApiResource>> {
    return this.client.get('/suggest', { params: request?.params, signal: request?.signal });
  }

  estimatePrice(request: IYaahResourceEstimatePriceRequest): Promise<BaseResponse<IYaahResourceEstimatedPrice>> {
    return this.client.post(`/${request.pathParams.id}/estimate-price`, request.body, {
      signal: request.signal,
      params: request.params,
    });
  }
}
