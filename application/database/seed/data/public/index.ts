import { PrismaClient } from '@prisma/client';
import { seedSamaritans } from './seedSamaritans';
import { seedConversations } from './seedConversations';

const seedPublic = async (prismaClient: PrismaClient) => {
  console.log("Seeding data for schema 'Public'...");

  const samaritans = await seedSamaritans();
  await seedConversations(prismaClient, samaritans);
};

export default seedPublic;
