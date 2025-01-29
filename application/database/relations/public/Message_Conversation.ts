import { Relation } from '../types/Relation';
import { oneToMany } from '../util/oneToMany';

export const Message_Conversation: Relation[] = oneToMany(
  {
    modelName: 'Message',
    fieldName: 'conversation',
    options: {
      fields: ['conversationId'],
      references: ['id'],
      name: 'conversation'
    }
  },
  {
    modelName: 'Conversation',
    fieldName: 'messages'
  }
);
