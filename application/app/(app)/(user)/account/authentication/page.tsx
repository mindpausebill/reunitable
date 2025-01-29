import {useServerSessionUser} from '@/submodules/supabase-functions/auth/getServerSessionUser';
import {signInWithRedirect} from '@/submodules/supabase-functions/auth/signInWithRedirect';
import {AuthenticationPage} from "@/app/(app)/(user)/account/authentication/AuthenticationPage";


const Authentication = () => {
  const user = useServerSessionUser();
  if (!user) return signInWithRedirect(`/my-account`);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl">Password and Authentication</h1>
      <AuthenticationPage email={user.email} />
    </div>
  );
};

export default Authentication;
