import {
  BaseCreateRequest,
  BaseGetByIdRequest,
  BaseGetByIdResponse,
  BasePaginationResponse,
  BaseRequest,
  BaseResponse,
} from '@/apis/base';
import {
  IYaahApiReservation,
  IYaahApiReservationExtend,
  IYaahApiReservationExtendInput,
  IYaahApiReservationGetAllRequest,
  IYaahReservationCalculatedPrice,
} from '../interfaces';
import { YaahCrudApiClient } from './crud';

export class YaahReservationApiClient extends YaahCrudApiClient<IYaahApiReservation> {
  constructor() {
    super({ resource: 'reservations' });
  }

  checkOut(request: BaseGetByIdRequest): Promise<BaseGetByIdResponse<IYaahApiReservation>> {
    return this.client.post(`/${request.pathParams.id}/check-out`, {}, { signal: request.signal });
  }

  checkIn(request: BaseGetByIdRequest): Promise<BaseGetByIdResponse<IYaahApiReservation>> {
    return this.client.post(`/${request.pathParams.id}/check-in`, {}, { signal: request.signal });
  }

  calculatePrice(request: BaseGetByIdRequest): Promise<BaseResponse<IYaahReservationCalculatedPrice>> {
    return this.client.get(`/${request.pathParams.id}/calculate-price`);
  }

  getAll(request: IYaahApiReservationGetAllRequest): Promise<BasePaginationResponse<IYaahApiReservation>> {
    return super.getAll(request);
  }

  getExtendOptions(request: BaseGetByIdRequest): Promise<BaseResponse<IYaahApiReservationExtend>> {
    return this.client.get(`/${request.pathParams.id}/extend-options`);
  }

  extend({
    pathParams: { id },
    body,
    ...request
  }: BaseCreateRequest<IYaahApiReservationExtendInput> & { pathParams: { id: string } }) {
    return this.client.post(`/${id}/extend`, body, {
      params: request.params,
      signal: request.signal,
    });
  }

  displayStateStatistics(request?: BaseRequest): Promise<
    BaseResponse<{
      expiring_soon: number;
      requires_attention: number;
      normal: number;
    }>
  > {
    return this.client.get('/statistics/display-state', { signal: request?.signal, params: request?.params });
  }
}
