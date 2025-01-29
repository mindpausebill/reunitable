// Access
import { Organisation_Organisation } from './access/Organisation_Organisation';
import { Role_Permission } from './access/Role_Permission';
import { UserOrganisation_Role } from './access/UserOrganisation_Role';
import { User_Organisation } from './access/User_Organisation';
import { User_Role } from './access/User_Role';
import { Conversation_Organisation } from './public/Conversation_Organisation';
import { Conversation_Samaritan } from './public/Conversation_Samaritan';
import { Message_Conversation } from './public/Message_Conversation';
import { StripePromotionCode_StripeCustomer } from './public/StripePromotionCode_StripeCustomer';
import { StripeSubscription_StripeCustomer } from './public/StripeSubscription_StripeCustomer';
import { Relation } from './types/Relation';

export const relations: Relation[] = [
  // Access
  ...User_Organisation,
  ...Organisation_Organisation,
  ...UserOrganisation_Role,
  ...Role_Permission,
  ...User_Role,
  // Public
  ...Conversation_Organisation,
  ...Conversation_Samaritan,
  ...Message_Conversation,
  ...StripePromotionCode_StripeCustomer,
  ...StripeSubscription_StripeCustomer
];

export const createdModifiedModels: Record<string, string[]> = {
  access: [
    'Organisation',
    'Permission',
    'Role',
    'RolePermission',
    'UserOrganisation',
    'UserRole',
    'UserOrganisationRole'
  ],
  public: ['Conversation', 'Samaritan', 'Message']
};
