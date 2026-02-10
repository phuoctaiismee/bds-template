import { BasePaginationRequest, BasePaginationResponse } from '@/apis/base';
import { IYaahApiBusinessModel } from '../interfaces';
import { YaahCrudApiClient } from './crud';

export class YaahBusinessModelApiClient extends YaahCrudApiClient<IYaahApiBusinessModel> {
  constructor() {
    super({ resource: 'business-models' });
  }

  getAll(
    request: BasePaginationRequest & {
      params?: {
        includeStatistics?: boolean;
      };
    },
  ): Promise<BasePaginationResponse<IYaahApiBusinessModel>> {
    return super.getAll(request);
  }
}
