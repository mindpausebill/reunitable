import * as dotenv from 'dotenv';
import { createSchema } from 'schemix';

dotenv.config();

const DATABASE_SCHEMAS = (process.env.NEXT_PUBLIC_DATABASE_SCHEMAS ?? 'public').split(',');
createSchema({
  // basePath should be a path to the folder containing models/, enums/, and mixins/.
  basePath: __dirname,
  datasource: {
    provider: 'postgresql',
    url: { env: 'DATABASE_URL' },
    directUrl: { env: 'DIRECT_URL' },
    schemas: DATABASE_SCHEMAS
  },
  generator: [
    {
      name: 'client',
      provider: 'prisma-client-js',
      previewFeatures: ['multiSchema']
    },
    {
      name: 'fabbrica',
      provider: 'prisma-fabbrica',
      output: './generated/factories',
      noTranspile: true
    },
    {
      name: 'erd',
      provider: 'prisma-erd-generator',
      output: '../app/admin/databaseERD.svg'
    }
  ]
}).export(__dirname, 'schema');
