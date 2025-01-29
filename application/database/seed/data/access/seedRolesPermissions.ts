import { RoleFactory, PermissionFactory, RolePermissionFactory } from '../shared/getPrismaModelFactory';
import { Role, Permission } from '@prisma/client';
import _ from 'lodash';

export const seedRolesPermissions = async () => {
  const rolePermissions: { [roleName: string]: string[] } = {
    SuperAdmin: ['canManageAccess'],
    Customer: ['canManageContacts', 'canManageSubscription', 'canOrderMoreTags', 'canViewMessages'],
    Contact: ['canViewMessages'],
    User: ['canRegister']
  };

  interface createdRole {
    name: string;
    roleFactory: Pick<Role, 'id'>;
  }
  interface createdPermission {
    name: string;
    permissionFactory: Pick<Permission, 'id'>;
  }

  let createdRoles: createdRole[] = [];
  let createdPermissions: createdPermission[] = [];

  // Creating Roles
  const roles = Object.keys(rolePermissions);
  for (const [index, role] of roles.entries()) {
    console.log(`Creating Role ${index + 1} of ${roles.length}`);
    createdRoles.push({
      name: role,
      roleFactory: await RoleFactory.createForConnect({
        name: role
      })
    });
  }

  // Creating Permissions
  const permissions = _.uniq(Object.values(rolePermissions).flatMap((x) => x));
  for (const [index, permission] of permissions.entries()) {
    console.log(`Creating Permission ${index + 1} of ${permissions.length}`);
    createdPermissions.push({
      name: permission,
      permissionFactory: await PermissionFactory.createForConnect({
        name: permission
      })
    });
  }

  // Creating links between Roles & Permissions
  for (const [role, permissions] of Object.entries(rolePermissions)) {
    const createdRole = createdRoles.find((createdRole) => createdRole.name === role);
    for (const permission of permissions) {
      const createdPermission = createdPermissions.find((createdPermission) => createdPermission.name === permission);
      if (createdRole && createdPermission) {
        console.log(`Creating RolePermission for ${role} and ${permission}`);
        await RolePermissionFactory.create({
          role: { connect: createdRole.roleFactory },
          permission: { connect: createdPermission.permissionFactory }
        });
      }
    }
  }
};
