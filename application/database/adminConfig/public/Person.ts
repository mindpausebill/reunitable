import { RelationStyle } from '@/submodules/admin-console/types/Config/RelationStyle';
import { RelationType } from '@/submodules/admin-console/types/Config/RelationType';
import { ResourceConfig } from '@/submodules/admin-console/types/Config/ResourceConfig';

export const Person: ResourceConfig = {
  relations: {
    CompaniesAsCEO: {
      type: RelationType.OneToMany,
      reference: 'Company',
      using: 'ceoId',
      label: 'name',
      styles: {
        list: RelationStyle.Chip,
        show: RelationStyle.DataGrid,
        edit: RelationStyle.DataGrid
      }
    }
  }
};
