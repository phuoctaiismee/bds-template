import { BaseGetByIdRequest, BaseGetByIdResponse, BaseRequest, BaseResponse } from '@/apis/base';
import { IYaahApiShift } from '../interfaces';
import { YaahCrudApiClient } from './crud';

export interface IYaahShiftDetectRequest extends BaseRequest {
  params: {
    currentDateTime: string;
  };
}

export interface IYaahShiftStatistics {
  totalRevenue: number;
  totalEmployees: number;
  totalReservations: number;
  totalCustomers: number;
}

export class YaahShiftApiClient extends YaahCrudApiClient<IYaahApiShift> {
  constructor() {
    super({ resource: 'shifts' });
  }

  detect(request: IYaahShiftDetectRequest): Promise<BaseGetByIdResponse<IYaahApiShift>> {
    return this.client.get('/detect', { params: request.params, signal: request.signal });
  }

  getStatisticsById(request: BaseGetByIdRequest): Promise<BaseResponse<IYaahShiftStatistics>> {
    return this.client.get(`/${request.pathParams.id}/statistics`);
  }
}
