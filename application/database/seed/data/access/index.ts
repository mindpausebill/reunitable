import { deleteAuthUsers } from './deleteAuthUsers';
import { seedRolesPermissions } from './seedRolesPermissions';
import { seedUserOrganisationRoles } from './seedUserOrganisationRoles';
import { seedUsers } from './seedUsers';
import { PrismaClient } from '@prisma/client';

const seedAccess = async (prismaClient: PrismaClient) => {
  console.log("Seeding data for schema 'Access'...");
  await deleteAuthUsers(prismaClient);
  await seedRolesPermissions();
  await seedUsers(prismaClient);
  await seedUserOrganisationRoles(prismaClient);
};

export default seedAccess;
