import { BaseRecord } from '@/apis/base';

export interface IYaahApiTenant extends BaseRecord {
  name: string;
  address: string;
  location: string;

  description: string;
  short_description: string;
  pricing_description: string;

  opening_time: string;
  closing_time: string;

  status: 'active' | 'inactive' | string;

  expiring_soon_threshold_minutes: number;
  no_show_grace_period_minutes: number;
  unpaid_grace_period_minutes: number;
  overtime_threshold_minutes: number;
  max_open_ended_duration_hours: number;

  api_key: string;
  checksum_key: string;

  allowed_source_ips: string[] | null;
  allowed_source_cidrs: string[] | null;

  metadata: Record<string, unknown> | null;
  logo: string | null;

  last_access_at: string | null;
}

export interface IYaahApiTenantCreateInput {
  tags: Array<string>;

  book_type: 'flexible' | 'pre_booked';
  allow_walk_in: boolean;

  duration_mode: string;

  payment_mode: string;
  prepay_mode: string;

  staff_mode: 'owner' | 'staff';

  name: string;
  address: string;
  opening_time: string;
  closing_time: string;
}
