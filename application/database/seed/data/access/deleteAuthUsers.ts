import { PrismaClient } from '@prisma/client';

const DELETE_AUTH_USERS_SQL = `
DELETE FROM "auth"."users" WHERE "id" NOT IN (SELECT owner FROM "storage"."objects" WHERE owner IS NOT NULL)
`;

export const deleteAuthUsers = async (prismaClient: PrismaClient) => {
  console.log('Deleting auth users...');
  const deleteAuthUsersResult = await prismaClient.$executeRawUnsafe(DELETE_AUTH_USERS_SQL);
  console.log(`...result was ${deleteAuthUsersResult}`);
};
