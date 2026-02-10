import { IYaahApiTenantSetting } from '../interfaces';
import { YaahCrudApiClient } from './crud';

export class YaahTenantSettingApiClient extends YaahCrudApiClient<IYaahApiTenantSetting> {
  constructor() {
    super({ resource: 'tenants/settings' });
  }
}
