import { BaseRecord } from '@/apis/base';

export interface IYaahApiTenantSetting extends BaseRecord {
  expiring_soon_threshold_minutes: number;
  overtime_threshold_minutes: number;
  max_open_ended_duration_hours: number;
  unpaid_grace_period_minutes: number;
  no_show_grace_period_minutes: number;
}
