import { getRandomEnglandLocation } from './getRandomEnglandLocation';
import { defineConversationFactory, defineMessageFactory } from '@/database/generated/factories';
import { getReverseLookupClient } from '@/lib/getReverseLookupClient';
import { faker } from '@faker-js/faker/locale/en_GB';
import { PrismaClient } from '@prisma/client';

export const seedConversation = async (prismaClient: PrismaClient, orgId: string, samaritanId: string) => {
  const conversationLocation = await getRandomEnglandLocation(getReverseLookupClient());
  const conversation = await defineConversationFactory({
    defaultData: {
      organisation: {
        connect: {
          id: orgId
        }
      },
      samaritan: {
        connect: {
          id: samaritanId
        }
      }
    }
  }).createForConnect({ ...conversationLocation });

  // Seed a random number of messages for each conversation
  for (let i = 0; i < faker.number.int({ min: 1, max: 10 }); i++) {
    const messageLocation = await getRandomEnglandLocation(getReverseLookupClient());
    await defineMessageFactory({
      defaultData: {
        conversation: {
          connect: {
            id: conversation.id
          }
        }
      }
    }).create({ message: faker.lorem.sentence(), read: false, fromSamaritan: i % 2 === 0, ...messageLocation });
  }
};
