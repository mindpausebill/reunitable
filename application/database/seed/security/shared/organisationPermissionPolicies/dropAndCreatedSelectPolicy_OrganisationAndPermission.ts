import { PrismaClient } from '@prisma/client';

export const dropAndCreateSelectPolicy_OrganisationAndPermission = async (
  prismaClient: PrismaClient,
  schema: string,
  table: string,
  orgIdParam: string,
  permissionParam: string
) => {
  console.log(`Dropping select policy for ${schema}.${table}...`);
  const dropSQL = `DROP POLICY IF EXISTS "DEFAULT_SELECT_POLICY" ON "${schema}"."${table}";`;
  const dropSelectPolicyResult = await prismaClient.$executeRawUnsafe(dropSQL);
  console.log(`...result was ${dropSelectPolicyResult}`);

  console.log(`Creating select policy for ${schema}.${table}...`);
  const createSQL = `
    CREATE POLICY "DEFAULT_SELECT_POLICY"
    ON "${schema}"."${table}"
    FOR SELECT USING (
      is_user_in_organisation_with_permission('${orgIdParam}'::text, '${permissionParam}'::text)
    );
  `;
  const createSelectPolicyResult = await prismaClient.$executeRawUnsafe(createSQL);
  console.log(`...result was ${createSelectPolicyResult}`);
};
