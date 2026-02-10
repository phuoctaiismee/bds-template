import { IYaahApiPaymentTransaction } from '../interfaces';
import { YaahCrudApiClient } from './crud';

export class YaahPaymentTransactionApiClient extends YaahCrudApiClient<IYaahApiPaymentTransaction> {
  constructor() {
    super({ resource: 'payments/transactions' });
  }
}
