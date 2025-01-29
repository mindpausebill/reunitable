import { SchemaConfig } from '@/submodules/admin-console/types/Config/SchemaConfig';
import { CompanyPerson } from './CompanyPerson';
import { Person } from './Person';
import { Test } from './Test';

export const publicSchema: SchemaConfig = {
  resourcesConfig: {
    CompanyPerson,
    Person,
    Test
  }
};
