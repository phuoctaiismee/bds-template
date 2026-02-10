import { YaahAuthApiClient } from './auth';
import { YaahBusinessModelApiClient } from './business-model';
import { YaahPaymentApiClient } from './payment';
import { YaahPaymentMethodApiClient } from './payment-method';
import { YaahPaymentTransactionApiClient } from './payment-transaction';
import { YaahReservationApiClient } from './reservation';
import { YaahResourceApiClient } from './resource';
import { YaahResourceCategoryApiClient } from './resource-category';
import { YaahRevenueApiClient } from './revenue';
import { YaahShiftApiClient } from './shift';
import { YaahSystemTagApiClient } from './system-tag';
import { YaahTenantApiClient } from './tenant';
import { YaahTenantSettingApiClient } from './tenant-setting';

class YaahApiClient {
  auth = new YaahAuthApiClient();

  resource = new YaahResourceApiClient();
  resourceCategory = new YaahResourceCategoryApiClient();

  reservation = new YaahReservationApiClient();
  businessModel = new YaahBusinessModelApiClient();

  paymentMethod = new YaahPaymentMethodApiClient();
  payment = new YaahPaymentApiClient();
  paymentTransaction = new YaahPaymentTransactionApiClient();

  tenantSetting = new YaahTenantSettingApiClient();
  tenant = new YaahTenantApiClient();

  revenue = new YaahRevenueApiClient();
  shift = new YaahShiftApiClient();

  systemTag = new YaahSystemTagApiClient();
}

export const yaahApi = new YaahApiClient();
