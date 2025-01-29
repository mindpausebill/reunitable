import { seedConversation } from './seedConversation';
import { Samaritan } from '@/types/supabaseTypes';
import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import _ from 'lodash';

export const seedConversations = async (prismaClient: PrismaClient, samaritans: Pick<Samaritan, 'id'>[]) => {
  console.log('Seeding Conversations...');

  const dbCustomerRole = await prismaClient.role.findFirst({
    where: {
      name: 'Customer'
    }
  });

  if (!dbCustomerRole) {
    console.log('Failed to find role in DB');
    return;
  }

  const dbCustomerUserOrgs = await prismaClient.userOrganisationRole.findMany({
    include: {
      userOrganisation: true
    },
    where: {
      roleId: dbCustomerRole.id
    }
  });

  const maxConversations = samaritans?.length > 10 ? 10 : samaritans?.length;

  // Seed a random number of conversations for each customer
  for (const dbCustomerUserOrg of dbCustomerUserOrgs) {
    const numOfConversations = faker.number.int({ min: 4, max: maxConversations });
    const randomSamaritanIds = faker.helpers.uniqueArray(
      _.map(samaritans, (s) => s?.id),
      numOfConversations
    );

    for (const samaritanId of randomSamaritanIds) {
      const orgId = dbCustomerUserOrg.userOrganisation.organisationId;
      await seedConversation(prismaClient, orgId, samaritanId);
    }
  }
};
