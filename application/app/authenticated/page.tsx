import { AuthenticatedPageProps } from './AuthenticatedPageProps';
import { Loading } from '@/components/shared/Loading';
import { AuthenticationBuffer } from '@/submodules/supabase-functions/components/AuthenticationBuffer';
import { ErrorScreen } from '@/submodules/supabase-functions/components/ErrorScreen';

const AuthenticatedPage: React.FC<AuthenticatedPageProps> = ({ searchParams: { redirectUrl, error_description } }) => {
  if (error_description) return <ErrorScreen errorMessage={error_description} />;
  return <AuthenticationBuffer redirectUrl={redirectUrl} customLoadingComponent={<Loading />} />;
};

export default AuthenticatedPage;
