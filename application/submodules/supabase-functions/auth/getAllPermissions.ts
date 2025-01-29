import { Session } from '@supabase/auth-helpers-nextjs';

export const getAllPermissions = (session: Session | null, organisationId?: string) => {
  const appMetadata = session?.user?.app_metadata;
  const userId = session?.user?.id;
  if (!appMetadata || !userId) return [];

  //Fallback on access.roles to support legacy structure pre 20th Feb 2024
  const legacyPermissions = appMetadata?.access?.roles
    ?.filter((role: { permissions?: string[] }) => !!role?.permissions)
    .flatMap((role: { permissions: string[] }) => role.permissions);

  const globalPermissions = appMetadata?.access?.globalPermissions ?? legacyPermissions ?? [];

  const org = organisationId
    ? (appMetadata?.access?.orgs ?? []).find((org: any) => org.orgId === organisationId)
    : undefined;
  const orgRoles = org?.roles ?? [];

  const orgPermissions = orgRoles.flatMap((role: any) => role.permissions);

  return [...orgPermissions, ...globalPermissions];
};
