import { BaseRecord } from '@/apis/base';

export interface IYaahApiRevenue extends BaseRecord {
  from: string;
  to: string;
  groupBy: 'type' | 'method';
  revenueBreakdown: Array<{
    method_type?: string;
    type?: string;
    total_revenue: string;
    total_reservations: string;
  }>;
}
