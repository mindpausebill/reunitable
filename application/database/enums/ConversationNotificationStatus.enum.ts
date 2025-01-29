import { createEnum } from 'schemix';

export default createEnum((ConversationNotificationStatus) => {
  ConversationNotificationStatus.addValue('primaryUserNotified')
    .addValue('secondaryUserNotified')
    .addValue('conversationSeen')
    .addValue(`@@schema("public")`);
});
