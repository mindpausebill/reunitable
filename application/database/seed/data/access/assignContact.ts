import { PrismaClient } from '@prisma/client';

export const assignContact = async (
  prismaClient: PrismaClient,
  contactEmailAddress: string,
  customerEmailAddress: string,
  roleName: string
) => {
  console.log(`assignContact() ${contactEmailAddress} ${customerEmailAddress} ${roleName}`);

  const dbRole = await prismaClient.role.findFirst({
    where: {
      name: roleName
    }
  });

  if (!dbRole) {
    console.log('Failed to find role in DB');
    return;
  }

  const dbCustomerUser = await prismaClient.user.findFirst({
    where: {
      email: customerEmailAddress
    }
  });

  if (!dbCustomerUser) {
    console.log('Failed to find customer in DB');
    return;
  }

  const dbCustomerOrganisation = await prismaClient.userOrganisation.findFirst({
    where: {
      userId: dbCustomerUser.id
    }
  });

  if (!dbCustomerOrganisation) {
    console.log('Failed to find customer organisation in DB');
    return;
  }

  const dbContactUser = await prismaClient.user.findFirst({
    where: {
      email: contactEmailAddress
    }
  });

  if (!dbContactUser) {
    console.log('Failed to find contact in DB');
    return;
  }

  const contactUserOrganisation = await prismaClient.userOrganisation.create({
    data: {
      userId: dbContactUser.id,
      organisationId: dbCustomerOrganisation.organisationId
    }
  });

  if (!contactUserOrganisation) {
    console.log('Failed to create contact userOrganisation in DB');
    return;
  }

  const contactUserOrganisationRole = await prismaClient.userOrganisationRole.create({
    data: {
      userOrganisationId: contactUserOrganisation.id,
      roleId: dbRole.id
    }
  });

  if (!contactUserOrganisationRole) {
    console.log('Failed to create contact userOrganisationRole in DB');
    return;
  }
};
