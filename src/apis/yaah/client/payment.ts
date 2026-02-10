import { BaseCreateRequest, BaseResponse } from '@/apis/base';
import { IYaahApiPayment } from '../interfaces';
import { YaahCrudApiClient } from './crud';

export interface IYaahMakeReservationPaymentInput {
  amount: number;
  methodId: string;
  reservationId: string;
  redirect_url: string;
  metadata?: Record<string, never>;
}

export class YaahPaymentApiClient extends YaahCrudApiClient<IYaahApiPayment> {
  constructor() {
    super({ resource: 'payments' });
  }

  makeReservationPayment(
    request: BaseCreateRequest<IYaahMakeReservationPaymentInput>,
  ): Promise<BaseResponse<IYaahApiPayment>> {
    return this.client.post('/pay', request.body, { signal: request.signal });
  }
}
