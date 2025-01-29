import { RelationStyle } from '@/submodules/admin-console/types/Config/RelationStyle';
import { RelationType } from '@/submodules/admin-console/types/Config/RelationType';
import { ResourceConfig } from '@/submodules/admin-console/types/Config/ResourceConfig';

export const CompanyPerson: ResourceConfig = {
  relations: {
    Projects: {
      type: RelationType.ManyToMany,
      reference: 'Project',
      through: 'CompanyPersonProject',
      using: 'companyPersonId,projectId',
      label: 'name',
      styles: {
        list: RelationStyle.Chip,
        show: RelationStyle.DataGrid,
        edit: RelationStyle.DataGrid
      }
    }
  }
};
