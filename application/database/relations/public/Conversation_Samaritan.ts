import { Relation } from '../types/Relation';
import { oneToMany } from '../util/oneToMany';

export const Conversation_Samaritan: Relation[] = oneToMany(
  {
    modelName: 'Conversation',
    fieldName: 'samaritan',
    options: {
      fields: ['samaritanId'],
      references: ['id'],
      name: 'samaritan'
    }
  },
  {
    modelName: 'Samaritan',
    fieldName: 'conversations'
  }
);
