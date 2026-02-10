import { BaseRecord } from '@/apis/base';

export interface ITekgetherApiUser extends BaseRecord {
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  avatar: string;
}
