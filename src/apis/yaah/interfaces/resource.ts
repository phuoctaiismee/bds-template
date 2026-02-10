import { BaseRecord } from '@/apis/base';
import { IYaahApiBusinessModel } from './business-model';
import { IYaahApiResourceCategory } from './resource-category';

export enum EYaahApiResourcePricingStrategyMode {
  Inherit = 'inherit_from_business_model',
  Custom = 'custom_pricing',
}

export enum EYaahApiResourcePricingRoundingMode {
  None = 'none',
  UpTo15M = 'round_up_to_15_minutes',
  UpTo30M = 'round_up_to_30_minutes',
}

export interface IYaahApiResourceTimeslotPricing {
  start_time: string;
  end_time: string;
  price_per_hour: string;
  pricing_unit: string;
}

export interface IYaahApiResource extends BaseRecord {
  business_model: IYaahApiBusinessModel;

  name: string;
  business_model_id: string;
  status: 'active' | 'inactive';
  pricing_policy: 'time_block' | string;
  min_booking_duration_minutes: number;
  min_capacity: number;
  allow_online_booking: boolean;
  allow_walk_in_booking: boolean;
  resource_category?: IYaahApiResourceCategory;
  resource_category_id: string;
  code: string;
  tenant: string;
  tenant_id: string;
  price_rounding_mode: EYaahApiResourcePricingRoundingMode;
  base_price: string;
  min_booking_charge?: string;
  pricing_strategy_mode?: EYaahApiResourcePricingStrategyMode;
  timeslot_pricings: Array<IYaahApiResourceTimeslotPricing>;
}
