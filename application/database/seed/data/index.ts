import { initialize } from '../../generated/factories';
import seedAccess from './access';
import seedPublic from './public';
import { PrismaClient } from '@prisma/client';

const seed = async (prismaClient: PrismaClient) => {
  console.log('Seeding data...');

  console.log('Iniitialising prisma factories...');
  initialize({ prisma: prismaClient });

  await seedAccess(prismaClient);
  await seedPublic(prismaClient);
};

export default seed;
