import '../components/styling/styles.css';
import { useResources } from '../hooks/useResources';
import { createDataProvider } from '../lib/createDataProvider';
import { AdminConfig } from '../types/Config/AdminConfig';
import { DefaultCreate } from './DefaultCreate';
import { DefaultEdit } from './DefaultEdit';
import { DefaultList } from './DefaultList';
import { DefaultShow } from './DefaultShow';
import { AdminDashboard } from './dashboard/AdminDashboard';
import { AdminLayout } from './styling/AdminLayout';
import { AdminTheme } from './styling/AdminTheme';
import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { Admin, CustomRoutes, Resource } from 'react-admin';
import { Route } from 'react-router-dom';

interface AdminAppProps {
  config?: AdminConfig;
}

const AdminApp: React.FC<AdminAppProps> = ({ config }) => {
  const resources = useResources(config);

  const { supabase } = useSupabase<'public'>();
  const dataProvider = createDataProvider(resources, supabase);

  const customPages = config?.customPages ?? [];
  const functions = config?.functions ? Object.entries(config?.functions) : [];

  const filteredResources = resources.filter((resource) => {
    const resourceConfig = config?.schemas?.[resource.schema]?.resourcesConfig?.[resource.name];
    return resourceConfig?.hide !== true;
  });

  return (
    <Admin
      layout={(props) => <AdminLayout {...props} resources={filteredResources} config={config} />}
      theme={AdminTheme}
      dataProvider={dataProvider}
    >
      {config?.dashboard?.enabled && (
        <CustomRoutes>
          <Route
            key={'Dashboard'}
            path={'Dashboard'}
            element={<AdminDashboard dashboardConfig={config?.dashboard} />}
          />
        </CustomRoutes>
      )}
      {filteredResources &&
        filteredResources.map((resource) => {
          const resourceConfig = config?.schemas?.[resource.schema]?.resourcesConfig?.[resource.name];
          const recordRepresentation = resourceConfig?.recordRepresentation ?? ((record) => record?.name ?? record?.id);
          return (
            <Resource
              key={resource.name}
              name={resource.name}
              list={<DefaultList resources={resources} resource={resource} />}
              show={<DefaultShow resource={resource} />}
              edit={<DefaultEdit resources={resources} resource={resource} />}
              create={<DefaultCreate resources={resources} resource={resource} />}
              recordRepresentation={recordRepresentation}
            />
          );
        })}
      <CustomRoutes>
        {customPages.map((customPage) => {
          return <Route key={customPage.name} path={customPage.name} element={customPage.component} />;
        })}
        {functions.map(([]) => {
          //return <></>;
          return null;
        })}
      </CustomRoutes>
    </Admin>
  );
};

export default AdminApp;
