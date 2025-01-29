import { webhooksObject, WebHooks } from './webhooksObject';
import { PrismaClient } from '@prisma/client';

export const seedWebhooks = async (prismaClient: PrismaClient) => {
  Object.keys(webhooksObject.environment).forEach((env) => {
    Object.keys(webhooksObject.webhooks as WebHooks).forEach((schemaName) => {
      Object.keys(webhooksObject.webhooks[schemaName]).forEach((tableName) => {
        Object.values(webhooksObject.webhooks[schemaName][tableName]).forEach(async (tableValues) => {
          const eventVal = tableValues?.event;

          console.log(`Droping ${env}_on_${schemaName}_${tableName}_${eventVal}_webhook....`);
          const droppingWebhooksSQL = `
            DROP TRIGGER
            IF EXISTS ${env}_on_${schemaName}_${tableName}_${eventVal}_webhook
            ON ${schemaName}."${tableName}";
          `;

          const droppingWebHook = await prismaClient.$executeRawUnsafe(droppingWebhooksSQL);
          console.log(`...result was ${droppingWebHook}`);

          if (webhooksObject.environment[env].active === true) {
            console.log(`Creating ${env}_on_${schemaName}_${tableName}_${eventVal}_webhook....`);
            const generateWebhoksSQL = `
                  CREATE TRIGGER ${env}_on_${schemaName}_${tableName}_${eventVal}_webhook
                  AFTER ${eventVal} on "${schemaName}"."${tableName}"
                  FOR EACH ROW EXECUTE FUNCTION supabase_functions.http_request('${
                    webhooksObject.environment[env].endpoint
                  }/${tableName}/${eventVal}', 'POST', '{"Content-type":"application/json"}', '{}', '${
              tableValues?.timeout ?? 30000
            }');
              `;
            const creatingWebHook = await prismaClient.$executeRawUnsafe(generateWebhoksSQL);
            console.log(`...result was ${creatingWebHook}`);
          }
        });
      });
    });
  });
};

const prisma = new PrismaClient();
seedWebhooks(prisma);
