import { ResourceConfig } from '@/submodules/admin-console/types/Config/ResourceConfig';

export const Test: ResourceConfig = {
  propertiesConfig: {
    file: {
      isFile: true
    }
  },
  permissions: {
    read: 'canReadTestResource',
    write: 'canWriteTestResource'
  }
};
