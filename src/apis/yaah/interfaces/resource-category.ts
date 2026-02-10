import { BaseRecord } from '@/apis/base';

export interface IYaahApiResourceCategory extends BaseRecord {
  name: string;
  slug: string;
  thumbnail: string | null;
  icon: string | null;
  is_active: boolean;
  business_model: string;
  business_model_id: string;
  tenant: string;
  tenant_id: string;
}
