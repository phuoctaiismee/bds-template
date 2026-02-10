import { BaseRecord } from '@/apis/base';

export interface IYaahApiSystemTag extends BaseRecord {
  name: string;
  short_description: string | null;
  description: string | null;
  icon: string;
  metadata: unknown | null;
  slug: string;
}
