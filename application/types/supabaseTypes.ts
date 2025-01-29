import { Database } from './supabase';

type Schema<Type> = {
  [Property in keyof Type as Property]: Type[Property] extends { Row: any } ? Type[Property]['Row'] : never;
};

export type AccessSchema = Schema<Database['access']['Tables']>;
export type PublicSchema = Schema<Database['public']['Tables']>;

export type User = AccessSchema['User'];
export type UserOrganisation = AccessSchema['UserOrganisation'];
export type UserOrganisationRole = AccessSchema['UserOrganisationRole'];
export type Role = AccessSchema['Role'];
export type Organisation = AccessSchema['Organisation'];

export type UserOrganisationRoleWithUserOrgAndRole = UserOrganisationRole & {
  UserOrganisation: UserOrganisation[];
  Role: Role[];
};

export type UserOrganisationWithOrganisation = UserOrganisation & { Organisation: Organisation | null };

export type Conversation = PublicSchema['Conversation'];
export type Samaritan = PublicSchema['Samaritan'];
export type Message = PublicSchema['Message'];

export type ConversationWithSamaritanAndMessages = Conversation & {
  Samaritan: Samaritan | null;
  Message: Message[];
};

export type UserOrganisationWithUsers = UserOrganisation & {
  User: User[];
};
