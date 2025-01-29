import UUIDMixin from '../../mixins/UUID.mixin';
import LocationMixin from '../../mixins/location.mixin';
import { withRelations } from '../../relations/util/withRelations';
import { SCHEMA_NAME } from './_schemaName';
import { createModel } from 'schemix';

export default withRelations(
  createModel((MessageModel) => {
    MessageModel.mixin(UUIDMixin)
      .mixin(LocationMixin)
      .string('message')
      .boolean('fromSamaritan')
      .boolean('read')
      .json('photo', { optional: true })
      .raw(`@@schema("${SCHEMA_NAME}")`);
  })
);
