import Container from '@/components/shared/Container';
import ReunitableLogo from '@/components/shared/Reunitable-logo';
import { useServerCurrentUser } from '@/submodules/supabase-functions/auth/getServerCurrentUser';
import { LogOut } from 'lucide-react';
import Link from 'next/link';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const serverUser = useServerCurrentUser();

  return (
    <div className="flex flex-col gap-12 pb-12">
      <div className="relative flex items-center bg-alpha py-6">
        <div className="absolute inset-0 bg-gradient-to-br from-alpha to-alpha/0"></div>
        <Container className="flex items-center justify-between gap-6">
          <ReunitableLogo className="max-h-[2rem] translate-y-1 lg:max-h-[3rem]" />
          <Link
            className="flex items-center gap-3 px-3 font-heading text-alpha-light-300 duration-150 hover:text-white"
            href="#"
          >
            <span>Logout</span>
            <LogOut />
          </Link>
        </Container>
      </div>
      <Container maxWidth="max-w-4xl" className="flex flex-col items-center gap-12">
        <div className="flex max-w-lg flex-col items-center gap-3 text-center">
          <h1 className="font-heading text-4xl leading-tight text-alpha-dark-600">Hi, {serverUser?.firstName}</h1>
          <p className="text-lg">
            We're delighted you've registered with Reunitable in order to protect your loved possessions, we just need
            to take a few details from you in order to get your account setup.
          </p>
        </div>
        {children}
      </Container>
    </div>
  );
};

export default Layout;
