import { BaseRecord } from '@/apis/base';

export enum EYaahApiBusinessModelPricingModel {
  TimeSlots = 'timeslots',
  Slot = 'slot',
  People = 'people',
  Combo = 'combo',
}

export interface IYaahApiBusinessModel extends BaseRecord {
  pricing_model: EYaahApiBusinessModelPricingModel;
  session_tracking: boolean;
  checkin_required: boolean;
  allow_extend: boolean;
  allow_split_pay: boolean;
  name: string;
  tenant: string;
  tenant_id: string;
  icon: string;
  efficiency?: number;
  total_active_reservations?: number;
  total_active_resources?: number;
  total_resources?: number;
}
