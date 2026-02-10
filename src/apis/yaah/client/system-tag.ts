import { IYaahApiSystemTag } from '../interfaces';
import { YaahCrudApiClient } from './crud';

export class YaahSystemTagApiClient extends YaahCrudApiClient<IYaahApiSystemTag> {
  constructor() {
    super({ resource: '/system-tags' });
  }
}
