import UUIDMixin from '../../mixins/UUID.mixin';
import { withRelations } from '../../relations/util/withRelations';
import { SCHEMA_NAME } from './_schemaName';
import { createModel } from 'schemix';

export default withRelations(
  createModel((UserOrganisationRoleModel) => {
    UserOrganisationRoleModel.mixin(UUIDMixin)
      .raw(`@@unique([userOrganisationId, roleId])`)
      .raw(`@@schema("${SCHEMA_NAME}")`);
  })
);
