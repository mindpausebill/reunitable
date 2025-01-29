import { seedAccess } from './access';
import { seedPublic } from './public';
import { grantSchemaPermissions } from './schemas';
import { PrismaClient } from '@prisma/client';

const seed = async (prismaClient: PrismaClient) => {
  console.log('Seeding security...');
  await grantSchemaPermissions(prismaClient);
  await seedAccess(prismaClient);
  await seedPublic(prismaClient);
};

export default seed;
