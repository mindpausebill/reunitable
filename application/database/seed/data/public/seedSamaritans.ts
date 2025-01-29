import { defineSamaritanFactory } from '@/database/generated/factories';
import { faker } from '@faker-js/faker';
import { Samaritan } from '@prisma/client';

export const seedSamaritans = async () => {
  console.log('Seeding Samaritans...');

  const samaritans: Pick<Samaritan, 'id'>[] = [];
  for (let i = 0; i < 20; i++) {
    const samaritan = await defineSamaritanFactory().createForConnect({ name: faker.person.firstName() });
    samaritans.push(samaritan);
  }
  return samaritans;
};
