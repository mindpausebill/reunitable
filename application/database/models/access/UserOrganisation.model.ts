import UUIDMixin from '../../mixins/UUID.mixin';
import { withRelations } from '../../relations/util/withRelations';
import { SCHEMA_NAME } from './_schemaName';
import { createModel } from 'schemix';

export default withRelations(
  createModel((UserOrganisationModel) => {
    UserOrganisationModel.mixin(UUIDMixin).raw(`@@unique([userId, organisationId])`).raw(`@@schema("${SCHEMA_NAME}")`);
  })
);
