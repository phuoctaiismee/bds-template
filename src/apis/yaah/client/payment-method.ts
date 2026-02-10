import { IYaahApiPaymentMethod } from '../interfaces';
import { YaahCrudApiClient } from './crud';

export class YaahPaymentMethodApiClient extends YaahCrudApiClient<IYaahApiPaymentMethod> {
  constructor() {
    super({ resource: 'payments/methods' });
  }
}
