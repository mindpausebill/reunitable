'use client';
import { AdminConfig } from '@/submodules/admin-console/types/Config/AdminConfig';
import { schemas } from '../../database/adminConfig';
import 'client-only';
import dynamic from 'next/dynamic';
import { DatabaseDiagram } from '@/submodules/admin-console/components/customPages/DatabaseDiagram';
import ApiDoc from '@/submodules/admin-console/components/customPages/api-doc';

const App = dynamic(() => import('../../submodules/admin-console/components/AdminApp'), { ssr: false });

const AdminPage = () => {
  const config: AdminConfig = {
    schemas,
    customPages: [
      {
        name: 'Database Diagram',
        component: <DatabaseDiagram />,
        schema: 'Database & API'
      },
      {
        name: 'API Doc',
        component: <ApiDoc />,
        schema: 'Database & API'
      }
    ],
    functions: {
      'public.get_schema_data': {
        description: 'Returns all available schemas'
      },
      'public.my_test_function': {
        description: 'This is my test function',
        parameters: {
          test_number: 'number',
          test_string: 'string'
        }
      }
    }
  };

  return <App config={config} />;
};

export default AdminPage;
