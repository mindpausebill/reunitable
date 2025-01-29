import { getUserTableAuthActions } from '@/submodules/admin-console/lib/auth/getUserTableAuthActions';
import { RelationType } from '@/submodules/admin-console/types/Config/RelationType';
import { ResourceConfig } from '@/submodules/admin-console/types/Config/ResourceConfig';

export const User: ResourceConfig = {
  relations: {
    Organisations: {
      type: RelationType.ManyToMany,
      reference: 'Organisation',
      through: 'UserOrganisation',
      using: 'userId,organisationId'
    }
  },
  customActions: getUserTableAuthActions()
};
