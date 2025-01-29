import { createSupabaseServerClient } from '../lib/supabase-server';
import { hasOrgAnyPermission } from './hasOrgAnyPermission';

export const hasServerOrgAnyPermission = async (
  organisationId: string | undefined,
  permissions: string[]
): Promise<boolean> => {
  const { data: sessionRes } = await createSupabaseServerClient('public').auth.getSession();
  if (!sessionRes) return false;
  const { session } = sessionRes;
  return hasOrgAnyPermission(session, organisationId, permissions);
};
