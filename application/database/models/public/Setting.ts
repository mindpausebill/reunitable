import { createModel } from 'schemix';
import UUIDMixin from '../../mixins/UUID.mixin';
import { SCHEMA_NAME } from './_schemaName';
import { withRelations } from '../../relations/util/withRelations';

export default withRelations(
  createModel((SettingModel) => {
    SettingModel.mixin(UUIDMixin).string('key', { unique: true }).json('value').raw(`@@schema("${SCHEMA_NAME}")`);
  })
);
