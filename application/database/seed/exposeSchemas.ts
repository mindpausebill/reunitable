import { PrismaClient } from '@prisma/client';
import _ from 'lodash';

export const exposeSchemas = async (prismaClient: PrismaClient) => {
  const envSchemas = process.env.NEXT_PUBLIC_DATABASE_SCHEMAS;

  if (!envSchemas) {
    throw new Error('NO NEXT_PUBLIC_DATABASE_SCHEMAS ENV VAR SET');
  }

  const splitSchemas = [...envSchemas.split(','), 'public', 'graphql_public', 'storage'];
  const uniqueSchemas = _.uniq(splitSchemas);
  const schemasToExpose = uniqueSchemas.join(',');

  const alterAuthenticatoRoleSql = `
        ALTER ROLE authenticator SET pgrst.db_schemas = '${schemasToExpose}';
    `;
  const reloadPostgrestConfigSql = `NOTIFY pgrst, 'reload config';`;
  const reloadPostgrestSchemaSql = `NOTIFY pgrst, 'reload schema';`;

  console.log(`EXPOSING SCHEMAS ${schemasToExpose} TO POSTGREST API...`);
  const exposeSchemasToPostgrestAPI = await prismaClient.$executeRawUnsafe(alterAuthenticatoRoleSql);
  console.log(`...result was ${exposeSchemasToPostgrestAPI}`);

  console.log(`RELOADING POSTGREST CONFIG...`);
  const reloadPostgrestConfig = await prismaClient.$executeRawUnsafe(reloadPostgrestConfigSql);
  console.log(`...result was ${reloadPostgrestConfig}`);

  console.log(`RELOADING POSTGREST SCHEMA...`);
  const reloadPostgrestSchema = await prismaClient.$executeRawUnsafe(reloadPostgrestSchemaSql);
  console.log(`...result was ${reloadPostgrestSchema}`);
};
