import UUIDMixin from '../../mixins/UUID.mixin';
import { withRelations } from '../../relations/util/withRelations';
import { SCHEMA_NAME } from './_schemaName';
import { createModel } from 'schemix';

export default withRelations(
  createModel((SamaritanModel) => {
    SamaritanModel.mixin(UUIDMixin)
      .string('name')
      .string('email', { optional: true })
      .string('phone', { optional: true })
      .raw(`@@schema("${SCHEMA_NAME}")`);
  })
);
