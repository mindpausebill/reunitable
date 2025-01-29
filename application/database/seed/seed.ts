import seedData from './data';
import { exposeSchemas } from './exposeSchemas';
import seedScripts from './scripts';
import seedSecurity from './security';
import { seedWebhooks } from './webhooks';
import { seedBucket } from '@/submodules/supabase-functions/lib/seedBucket';
import { seedReplication } from '@/submodules/supabase-functions/lib/seedReplication';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');
  await exposeSchemas(prisma);
  await seedBucket(prisma);
  await seedScripts(prisma);
  await seedSecurity(prisma);
  await seedData(prisma);
  await seedReplication(['Message'], prisma);
  await seedWebhooks(prisma);
  console.log('Finished seeding');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
