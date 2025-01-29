// import { SchemasConfig } from '@/submodules/admin/types/SchemasConfig';
import { access } from './access';
import { publicSchema } from './public';
import { SchemasConfig } from '@/submodules/admin-console/types/Config/SchemasConfig';

export const schemas: SchemasConfig = {
  access,
  public: publicSchema
};
