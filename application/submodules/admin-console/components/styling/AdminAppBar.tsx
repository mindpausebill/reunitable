import { AdminBreadcrumbs } from './AdminBreadcrumbs';
import { Bars3BottomLeftIcon } from '@heroicons/react/24/outline';
import { AppBarProps } from 'react-admin';

interface AdminAppBarProps {
  resourcesWithPages: { schema?: string | null; name: string }[];
}

export const AdminAppBar: React.FC<AppBarProps & AdminAppBarProps> = ({ resourcesWithPages }) => {
  return (
    <header className="relative -mt-12 flex items-center gap-5 border-b border-gray-200 bg-gray-50">
      <button className="| border-r border-gray-200 p-6 duration-150 hover:bg-gray-100 hover:text-gray-900">
        <span className="sr-only">Close menu</span>
        <Bars3BottomLeftIcon className="h-6 w-6" />
      </button>
      <AdminBreadcrumbs resourcesWithPages={resourcesWithPages} />
    </header>
  );
};
