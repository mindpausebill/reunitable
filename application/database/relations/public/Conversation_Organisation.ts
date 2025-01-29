import { Relation } from '../types/Relation';
import { oneToMany } from '../util/oneToMany';

export const Conversation_Organisation: Relation[] = oneToMany(
  {
    modelName: 'Conversation',
    fieldName: 'organisation',
    options: {
      fields: ['organisationId'],
      references: ['id'],
      name: 'organisation'
    }
  },
  {
    modelName: 'Organisation',
    fieldName: 'conversations'
  }
);
