import { BasePaginationRequest, BaseRecord } from '@/apis/base';
import { IYaahApiBusinessModel } from './business-model';
import { IYaahApiResource } from './resource';

export interface IYaahApiReservation extends BaseRecord {
  id: string;
  date_created: string; // ISO datetime
  date_updated: string; // ISO datetime
  type: 'walk_in' | 'online' | string;
  duration_mode: 'open_ended' | 'fixed';
  start_time: string; // ISO datetime
  end_time: string | null;
  actual_start_time: string | null;
  actual_end_time: string | null;
  duration_minutes: number | null;
  actual_duration_minutes: number | null;
  status: 'confirmed' | 'cancelled' | 'completed' | 'pending' | 'checked_in' | 'completed' | 'checked_out';
  base_price: string;
  final_price: string;
  notes: string | null;
  internal_notes: string | null;
  estimated_price: string | null;
  estimate_price?: string;
  cancelled_at: string | null;
  cancelled_reason: string | null;
  refund_amount: string | null;
  is_fully_paid: boolean;
  remain_amount: string; // can be "NaN"
  required_deposit: boolean;
  deposit_paid_at: string | null;
  total_play_time: number;
  timing_status: 'ongoing' | 'ended' | 'upcoming' | string;
  customerName?: string;
  resource?: IYaahApiResource;
  business_model?: IYaahApiBusinessModel;
  metadata?: {
    customer_name?: string;
  };
}

export interface IYaahApiReservationCreateInput {
  resourceId: string;
  type: 'walk_in' | 'pre_booked';
  durationMode: 'fixed' | 'open_ended';
  startTime: string;
  endTime: string;
  notes: string;
  internalNotes: string;
  customerName?: string;
}

export enum EYaahApiReservationExtendOptionType {
  Flexible = 'flexible',
  SpecificMinutes = 'specific_minutes',
  UntilNextTimeSlot = 'until_next_time_slot',
}

export interface IYaahApiReservationExtendOption {
  type: EYaahApiReservationExtendOptionType;
  description: string;
}

export interface IYaahApiReservationExtend {
  can_extend: boolean;
  minutes_until_next_reservation?: number;
  extend_options: Array<IYaahApiReservationExtendOption>;
}

export interface IYaahApiReservationExtendInput {
  type: EYaahApiReservationExtendOptionType;
  minutes?: number;
}

export interface IYaahReservationCalculatedPrice {
  price: number;
  breakdown: Array<{
    description: string;
    amount: number;
  }>;
}

export interface IYaahApiReservationFilterParams {
  reFetch: boolean;
  businessModelId: string;
  displayState: 'normal' | 'expiring_soon' | 'requires_attention';
  reservationType: 'pre_booked' | 'walk_in';
  status:
    | 'pending'
    | 'confirmed'
    | 'checked_in'
    | 'checked_out'
    | 'completed'
    | 'cancelled'
    | 'no_show'
    | 'playing'
    | 'wait_for_payment'
    | 'running';
}

export type IYaahApiReservationGetAllRequest = BasePaginationRequest & {
  params?: Partial<IYaahApiReservationFilterParams>;
};
