import { BaseRecord } from '@/apis/base';

export interface IYaahApiShift extends BaseRecord {
  name: string;
  shift_code: string;
  start_time: `${string}:${string}:${string}`;
  end_time: `${string}:${string}:${string}`;
  duration_minutes: number;
  days_of_week: Array<string>;
  color: `#${string}`;
  is_active: boolean;
  min_employees: number;
  max_employees: number;
  description: string;
  metadata?: Record<string, any>;
  tenant: string;
  tenant_id: string;
}
