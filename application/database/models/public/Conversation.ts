import UUIDMixin from '../../mixins/UUID.mixin';
import LocationMixin from '../../mixins/location.mixin';
import { withRelations } from '../../relations/util/withRelations';
import { SCHEMA_NAME } from './_schemaName';
import ConversationNotificationStatusEnum from '@/database/enums/ConversationNotificationStatus.enum';
import { createModel } from 'schemix';

export default withRelations(
  createModel((ConversationModel) => {
    ConversationModel.mixin(UUIDMixin)
      .mixin(LocationMixin)
      .enum('responseStatus', ConversationNotificationStatusEnum, { default: 'primaryUserNotified' })
      .raw(`@@unique([samaritanId, organisationId])`)
      .raw(`@@schema("${SCHEMA_NAME}")`);
  })
);
