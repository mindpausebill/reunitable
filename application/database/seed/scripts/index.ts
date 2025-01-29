import { createdModifiedModels } from '../../relations/_relations';
import { ACCESS_USER_ORGANISATION_TRIGGER_SQLS } from './accessUserOrganisationTrigger';
import { ACCESS_USER_TRIGGER_SQLS } from './accessUserTrigger';
import { addAutomaticCreatedAndModifiedColumnsFunction } from './addAutomaticCreatedAndModifiedColumnsFunction';
import { addAutomaticCreatedAndModifiedColumnsTrigger } from './addAutomaticCreatedAndModifiedColumnsTrigger';
import { addGetCurrentServerTimeFunction } from './addGetCurrentServerTime';
import { addGetEnumsFunction } from './addGetEnumsFunction';
import { AUTH_USER_TRIGGER_SQLS } from './authUserTrigger';
import { CLAIMS_ROLE_PERMISSION_TRIGGER_SQLS } from './claims_RolePermissionTrigger';
import { CLAIMS_USER_ORGANISATION_ROLE_TRIGGER_SQLS } from './claims_UserOrganisationRoleTrigger';
import { CLAIMS_USER_ORGANISATION_TRIGGER_SQLS } from './claims_UserOrganisationTrigger';
import { CLAIMS_USER_ROLE_TRIGGER_SQLS } from './claims_UserRoleTrigger';
import { CLAIMS_GET_ACCESS_CLAIM } from './claims_getAccessClaim';
import { CLAIMS_GET_ACCESS_CLAIM_GLOBAL } from './claims_getAccessClaimGlobal';
import { CLAIMS_GET_ACCESS_CLAIM_ORG } from './claims_getAccessClaimOrg';
import { GET_SCHEMA_DATA_SQLS } from './getSchemaData';
import { PrismaClient } from '@prisma/client';

const seed = async (prismaClient: PrismaClient) => {
  console.log('Seeding scripts...');

  console.log('Creating getSchemaData...');
  for (const sql of GET_SCHEMA_DATA_SQLS) {
    const getSchemaDataResult = await prismaClient.$executeRawUnsafe(sql);
    console.log(`...result was ${getSchemaDataResult}`);
  }

  console.log('Creating auth user trigger function...');
  for (const sql of AUTH_USER_TRIGGER_SQLS) {
    const authUserTriggerResult = await prismaClient.$executeRawUnsafe(sql);
    console.log(`...result was ${authUserTriggerResult}`);
  }

  console.log('Creating Access User trigger function...');
  for (const sql of ACCESS_USER_TRIGGER_SQLS) {
    const accessUserTriggerResult = await prismaClient.$executeRawUnsafe(sql);
    console.log(`...result was ${accessUserTriggerResult}`);
  }

  console.log('Creating Access UserOrganisation trigger function...');
  for (const sql of ACCESS_USER_ORGANISATION_TRIGGER_SQLS) {
    const accessUserOrganisationTriggerResult = await prismaClient.$executeRawUnsafe(sql);
    console.log(`...result was ${accessUserOrganisationTriggerResult}`);
  }

  console.log('Creating getAccessClaimsGlobal...');
  for (const sql of CLAIMS_GET_ACCESS_CLAIM_GLOBAL) {
    const getAccessClaimsGlobalResult = await prismaClient.$executeRawUnsafe(sql);
    console.log(`...result was ${getAccessClaimsGlobalResult}`);
  }

  console.log('Creating getAccessClaimsOrg...');
  for (const sql of CLAIMS_GET_ACCESS_CLAIM_ORG) {
    const getAccessClaimsOrgResult = await prismaClient.$executeRawUnsafe(sql);
    console.log(`...result was ${getAccessClaimsOrgResult}`);
  }

  console.log('Creating getAccessClaims...');
  for (const sql of CLAIMS_GET_ACCESS_CLAIM) {
    const getAccessClaimsResult = await prismaClient.$executeRawUnsafe(sql);
    console.log(`...result was ${getAccessClaimsResult}`);
  }

  console.log('Creating update claims triggers on UserOrganisation...');
  for (const sql of CLAIMS_USER_ORGANISATION_TRIGGER_SQLS) {
    const claimsUserOrganisationResult = await prismaClient.$executeRawUnsafe(sql);
    console.log(`...result was ${claimsUserOrganisationResult}`);
  }

  console.log('Creating update claims triggers on UserRole...');
  for (const sql of CLAIMS_USER_ROLE_TRIGGER_SQLS) {
    const claimsUserRoleResult = await prismaClient.$executeRawUnsafe(sql);
    console.log(`...result was ${claimsUserRoleResult}`);
  }

  console.log('Creating update claims triggers on UserOrganisationRole...');
  for (const sql of CLAIMS_USER_ORGANISATION_ROLE_TRIGGER_SQLS) {
    const claimsUserOrganisationResult = await prismaClient.$executeRawUnsafe(sql);
    console.log(`...result was ${claimsUserOrganisationResult}`);
  }

  console.log('Creating update claims triggers on RolePermission...');
  for (const sql of CLAIMS_ROLE_PERMISSION_TRIGGER_SQLS) {
    const claimsRolePermissionResult = await prismaClient.$executeRawUnsafe(sql);
    console.log(`...result was ${claimsRolePermissionResult}`);
  }

  console.log('Creating automatic created/modified function...');
  await addAutomaticCreatedAndModifiedColumnsFunction(prismaClient);

  for (const [schema, tables] of Object.entries(createdModifiedModels)) {
    for (const table of tables) {
      console.log(`Creating automatic created/modified trigger for ${schema}.${table}...`);
      await addAutomaticCreatedAndModifiedColumnsTrigger(prismaClient, schema, table);
    }
  }

  console.log('Creating function to get enums from database for schema...');
  await addGetEnumsFunction(prismaClient);

  console.log('Creating function to get current server time...');
  await addGetCurrentServerTimeFunction(prismaClient);
};

export default seed;
