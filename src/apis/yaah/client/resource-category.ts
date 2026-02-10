import { IYaahApiResourceCategory } from '../interfaces';
import { YaahCrudApiClient } from './crud';

export class YaahResourceCategoryApiClient extends YaahCrudApiClient<IYaahApiResourceCategory> {
  constructor() {
    super({ resource: 'resource-categories' });
  }
}
