import { assignContact } from './assignContact';
import { upgradeUsers } from './upgradeUsers';
import { PrismaClient } from '@prisma/client';

export const seedUserOrganisationRoles = async (prismaClient: PrismaClient) => {
  console.log('Seeding user organisation roles...');

  console.log('Upgrading super admins');
  await upgradeUsers(prismaClient, 'admin@reunitable', 'SuperAdmin');

  console.log('Upgrading customers');
  await upgradeUsers(prismaClient, 'graham.orrell@northlink.digital', 'Customer');
  await upgradeUsers(prismaClient, 'steven.roberts@northlink.digital', 'Customer');
  await upgradeUsers(prismaClient, 'moritz.cornielje@northlink.digital', 'Customer');
  await upgradeUsers(prismaClient, 'bill@albecq.net', 'Customer');

  console.log('Assigning contacts');
  await assignContact(prismaClient, 'graham_contact@reunitable', 'graham.orrell@northlink.digital', 'Contact');
  await assignContact(prismaClient, 'steven_contact@reunitable', 'steven.roberts@northlink.digital', 'Contact');
  await assignContact(prismaClient, 'bill_contact@reunitable', 'bill@albecq.net', 'Contact');
};
