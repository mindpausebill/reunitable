import type { Organisation } from "@prisma/client";
import type { Permission } from "@prisma/client";
import type { Role } from "@prisma/client";
import type { RolePermission } from "@prisma/client";
import type { User } from "@prisma/client";
import type { UserOrganisation } from "@prisma/client";
import type { UserOrganisationRole } from "@prisma/client";
import type { UserRole } from "@prisma/client";
import type { Conversation } from "@prisma/client";
import type { Message } from "@prisma/client";
import type { Samaritan } from "@prisma/client";
import type { Setting } from "@prisma/client";
import type { StripeCoupon } from "@prisma/client";
import type { StripeCouponProduct } from "@prisma/client";
import type { StripeCustomer } from "@prisma/client";
import type { StripePrice } from "@prisma/client";
import type { StripeProduct } from "@prisma/client";
import type { StripePromotionCode } from "@prisma/client";
import type { StripeSubscription } from "@prisma/client";
import type { ConversationNotificationStatus } from "@prisma/client";
import type { StripeCouponDurationEnum } from "@prisma/client";
import type { StripePriceTypeEnum } from "@prisma/client";
import type { StripePriceIntervalEnum } from "@prisma/client";
import type { StripeSubscriptionSatusEnum } from "@prisma/client";
import { Prisma } from "@prisma/client";
import type { PrismaClient } from "@prisma/client";
import { getClient, ModelWithFields, createScreener, getScalarFieldValueGenerator, Resolver, normalizeResolver, normalizeList, getSequenceCounter, } from "@quramy/prisma-fabbrica/lib/internal";
export { initialize, resetSequence, registerScalarFieldValueGenerator, resetScalarFieldValueGenerator } from "@quramy/prisma-fabbrica/lib/internal";

type BuildDataOptions = {
    readonly seq: number;
};

const modelFieldDefinitions: ModelWithFields[] = [{
        name: "Organisation",
        fields: [{
                name: "users",
                type: "UserOrganisation",
                relationName: "OrganisationToUserOrganisation"
            }, {
                name: "parent",
                type: "Organisation",
                relationName: "parentChild"
            }, {
                name: "children",
                type: "Organisation",
                relationName: "parentChild"
            }, {
                name: "conversations",
                type: "Conversation",
                relationName: "organisation"
            }, {
                name: "createdBy",
                type: "User",
                relationName: "OrganisationCreatedBy"
            }, {
                name: "modifiedBy",
                type: "User",
                relationName: "OrganisationModifiedBy"
            }]
    }, {
        name: "Permission",
        fields: [{
                name: "roles",
                type: "RolePermission",
                relationName: "PermissionToRolePermission"
            }, {
                name: "createdBy",
                type: "User",
                relationName: "PermissionCreatedBy"
            }, {
                name: "modifiedBy",
                type: "User",
                relationName: "PermissionModifiedBy"
            }]
    }, {
        name: "Role",
        fields: [{
                name: "userOrganisations",
                type: "UserOrganisationRole",
                relationName: "RoleToUserOrganisationRole"
            }, {
                name: "permissions",
                type: "RolePermission",
                relationName: "RoleToRolePermission"
            }, {
                name: "users",
                type: "UserRole",
                relationName: "RoleToUserRole"
            }, {
                name: "createdBy",
                type: "User",
                relationName: "RoleCreatedBy"
            }, {
                name: "modifiedBy",
                type: "User",
                relationName: "RoleModifiedBy"
            }]
    }, {
        name: "RolePermission",
        fields: [{
                name: "role",
                type: "Role",
                relationName: "RoleToRolePermission"
            }, {
                name: "permission",
                type: "Permission",
                relationName: "PermissionToRolePermission"
            }, {
                name: "createdBy",
                type: "User",
                relationName: "RolePermissionCreatedBy"
            }, {
                name: "modifiedBy",
                type: "User",
                relationName: "RolePermissionModifiedBy"
            }]
    }, {
        name: "User",
        fields: [{
                name: "organisations",
                type: "UserOrganisation",
                relationName: "UserToUserOrganisation"
            }, {
                name: "roles",
                type: "UserRole",
                relationName: "UserToUserRole"
            }, {
                name: "OrganisationCreated",
                type: "Organisation",
                relationName: "OrganisationCreatedBy"
            }, {
                name: "OrganisationModified",
                type: "Organisation",
                relationName: "OrganisationModifiedBy"
            }, {
                name: "PermissionCreated",
                type: "Permission",
                relationName: "PermissionCreatedBy"
            }, {
                name: "PermissionModified",
                type: "Permission",
                relationName: "PermissionModifiedBy"
            }, {
                name: "RoleCreated",
                type: "Role",
                relationName: "RoleCreatedBy"
            }, {
                name: "RoleModified",
                type: "Role",
                relationName: "RoleModifiedBy"
            }, {
                name: "RolePermissionCreated",
                type: "RolePermission",
                relationName: "RolePermissionCreatedBy"
            }, {
                name: "RolePermissionModified",
                type: "RolePermission",
                relationName: "RolePermissionModifiedBy"
            }, {
                name: "UserOrganisationCreated",
                type: "UserOrganisation",
                relationName: "UserOrganisationCreatedBy"
            }, {
                name: "UserOrganisationModified",
                type: "UserOrganisation",
                relationName: "UserOrganisationModifiedBy"
            }, {
                name: "UserRoleCreated",
                type: "UserRole",
                relationName: "UserRoleCreatedBy"
            }, {
                name: "UserRoleModified",
                type: "UserRole",
                relationName: "UserRoleModifiedBy"
            }, {
                name: "UserOrganisationRoleCreated",
                type: "UserOrganisationRole",
                relationName: "UserOrganisationRoleCreatedBy"
            }, {
                name: "UserOrganisationRoleModified",
                type: "UserOrganisationRole",
                relationName: "UserOrganisationRoleModifiedBy"
            }, {
                name: "ConversationCreated",
                type: "Conversation",
                relationName: "ConversationCreatedBy"
            }, {
                name: "ConversationModified",
                type: "Conversation",
                relationName: "ConversationModifiedBy"
            }, {
                name: "SamaritanCreated",
                type: "Samaritan",
                relationName: "SamaritanCreatedBy"
            }, {
                name: "SamaritanModified",
                type: "Samaritan",
                relationName: "SamaritanModifiedBy"
            }, {
                name: "MessageCreated",
                type: "Message",
                relationName: "MessageCreatedBy"
            }, {
                name: "MessageModified",
                type: "Message",
                relationName: "MessageModifiedBy"
            }]
    }, {
        name: "UserOrganisation",
        fields: [{
                name: "user",
                type: "User",
                relationName: "UserToUserOrganisation"
            }, {
                name: "organisation",
                type: "Organisation",
                relationName: "OrganisationToUserOrganisation"
            }, {
                name: "roles",
                type: "UserOrganisationRole",
                relationName: "UserOrganisationToUserOrganisationRole"
            }, {
                name: "createdBy",
                type: "User",
                relationName: "UserOrganisationCreatedBy"
            }, {
                name: "modifiedBy",
                type: "User",
                relationName: "UserOrganisationModifiedBy"
            }]
    }, {
        name: "UserOrganisationRole",
        fields: [{
                name: "userOrganisation",
                type: "UserOrganisation",
                relationName: "UserOrganisationToUserOrganisationRole"
            }, {
                name: "role",
                type: "Role",
                relationName: "RoleToUserOrganisationRole"
            }, {
                name: "createdBy",
                type: "User",
                relationName: "UserOrganisationRoleCreatedBy"
            }, {
                name: "modifiedBy",
                type: "User",
                relationName: "UserOrganisationRoleModifiedBy"
            }]
    }, {
        name: "UserRole",
        fields: [{
                name: "user",
                type: "User",
                relationName: "UserToUserRole"
            }, {
                name: "role",
                type: "Role",
                relationName: "RoleToUserRole"
            }, {
                name: "createdBy",
                type: "User",
                relationName: "UserRoleCreatedBy"
            }, {
                name: "modifiedBy",
                type: "User",
                relationName: "UserRoleModifiedBy"
            }]
    }, {
        name: "Conversation",
        fields: [{
                name: "organisation",
                type: "Organisation",
                relationName: "organisation"
            }, {
                name: "samaritan",
                type: "Samaritan",
                relationName: "samaritan"
            }, {
                name: "messages",
                type: "Message",
                relationName: "conversation"
            }, {
                name: "createdBy",
                type: "User",
                relationName: "ConversationCreatedBy"
            }, {
                name: "modifiedBy",
                type: "User",
                relationName: "ConversationModifiedBy"
            }]
    }, {
        name: "Message",
        fields: [{
                name: "conversation",
                type: "Conversation",
                relationName: "conversation"
            }, {
                name: "createdBy",
                type: "User",
                relationName: "MessageCreatedBy"
            }, {
                name: "modifiedBy",
                type: "User",
                relationName: "MessageModifiedBy"
            }]
    }, {
        name: "Samaritan",
        fields: [{
                name: "conversations",
                type: "Conversation",
                relationName: "samaritan"
            }, {
                name: "createdBy",
                type: "User",
                relationName: "SamaritanCreatedBy"
            }, {
                name: "modifiedBy",
                type: "User",
                relationName: "SamaritanModifiedBy"
            }]
    }, {
        name: "Setting",
        fields: []
    }, {
        name: "StripeCoupon",
        fields: [{
                name: "promotionCodes",
                type: "StripePromotionCode",
                relationName: "StripeCouponToStripePromotionCode"
            }, {
                name: "products",
                type: "StripeCouponProduct",
                relationName: "StripeCouponToStripeCouponProduct"
            }]
    }, {
        name: "StripeCouponProduct",
        fields: [{
                name: "product",
                type: "StripeProduct",
                relationName: "StripeCouponProductToStripeProduct"
            }, {
                name: "coupon",
                type: "StripeCoupon",
                relationName: "StripeCouponToStripeCouponProduct"
            }]
    }, {
        name: "StripeCustomer",
        fields: [{
                name: "promotionCode",
                type: "StripePromotionCode",
                relationName: "StripeCustomerToStripePromotionCode"
            }, {
                name: "subscription",
                type: "StripeSubscription",
                relationName: "StripeCustomerToStripeSubscription"
            }]
    }, {
        name: "StripePrice",
        fields: [{
                name: "product",
                type: "StripeProduct",
                relationName: "StripePriceToStripeProduct"
            }, {
                name: "subscription",
                type: "StripeSubscription",
                relationName: "StripePriceToStripeSubscription"
            }]
    }, {
        name: "StripeProduct",
        fields: [{
                name: "coupons",
                type: "StripeCouponProduct",
                relationName: "StripeCouponProductToStripeProduct"
            }, {
                name: "price",
                type: "StripePrice",
                relationName: "StripePriceToStripeProduct"
            }]
    }, {
        name: "StripePromotionCode",
        fields: [{
                name: "user",
                type: "StripeCustomer",
                relationName: "StripeCustomerToStripePromotionCode"
            }, {
                name: "coupon",
                type: "StripeCoupon",
                relationName: "StripeCouponToStripePromotionCode"
            }]
    }, {
        name: "StripeSubscription",
        fields: [{
                name: "user",
                type: "StripeCustomer",
                relationName: "StripeCustomerToStripeSubscription"
            }, {
                name: "price",
                type: "StripePrice",
                relationName: "StripePriceToStripeSubscription"
            }]
    }];

type OrganisationScalarOrEnumFields = {
    name: string;
};

type OrganisationparentFactory = {
    _factoryFor: "Organisation";
    build: () => PromiseLike<Prisma.OrganisationCreateNestedOneWithoutChildrenInput["create"]>;
};

type OrganisationcreatedByFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutOrganisationCreatedInput["create"]>;
};

type OrganisationmodifiedByFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutOrganisationModifiedInput["create"]>;
};

type OrganisationFactoryDefineInput = {
    createdAt?: Date | null;
    modifiedAt?: Date | null;
    id?: string;
    name?: string;
    users?: Prisma.UserOrganisationCreateNestedManyWithoutOrganisationInput;
    parent?: OrganisationparentFactory | Prisma.OrganisationCreateNestedOneWithoutChildrenInput;
    children?: Prisma.OrganisationCreateNestedManyWithoutParentInput;
    conversations?: Prisma.ConversationCreateNestedManyWithoutOrganisationInput;
    createdBy?: OrganisationcreatedByFactory | Prisma.UserCreateNestedOneWithoutOrganisationCreatedInput;
    modifiedBy?: OrganisationmodifiedByFactory | Prisma.UserCreateNestedOneWithoutOrganisationModifiedInput;
};

type OrganisationFactoryDefineOptions = {
    defaultData?: Resolver<OrganisationFactoryDefineInput, BuildDataOptions>;
};

function isOrganisationparentFactory(x: OrganisationparentFactory | Prisma.OrganisationCreateNestedOneWithoutChildrenInput | undefined): x is OrganisationparentFactory {
    return (x as any)?._factoryFor === "Organisation";
}

function isOrganisationcreatedByFactory(x: OrganisationcreatedByFactory | Prisma.UserCreateNestedOneWithoutOrganisationCreatedInput | undefined): x is OrganisationcreatedByFactory {
    return (x as any)?._factoryFor === "User";
}

function isOrganisationmodifiedByFactory(x: OrganisationmodifiedByFactory | Prisma.UserCreateNestedOneWithoutOrganisationModifiedInput | undefined): x is OrganisationmodifiedByFactory {
    return (x as any)?._factoryFor === "User";
}

export interface OrganisationFactoryInterface {
    readonly _factoryFor: "Organisation";
    build(inputData?: Partial<Prisma.OrganisationCreateInput>): PromiseLike<Prisma.OrganisationCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.OrganisationCreateInput>): PromiseLike<Prisma.OrganisationCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.OrganisationCreateInput>[]): PromiseLike<Prisma.OrganisationCreateInput[]>;
    pickForConnect(inputData: Organisation): Pick<Organisation, "id">;
    create(inputData?: Partial<Prisma.OrganisationCreateInput>): PromiseLike<Organisation>;
    createList(inputData: number | readonly Partial<Prisma.OrganisationCreateInput>[]): PromiseLike<Organisation[]>;
    createForConnect(inputData?: Partial<Prisma.OrganisationCreateInput>): PromiseLike<Pick<Organisation, "id">>;
}

function autoGenerateOrganisationScalarsOrEnums({ seq }: {
    readonly seq: number;
}): OrganisationScalarOrEnumFields {
    return {
        name: getScalarFieldValueGenerator().String({ modelName: "Organisation", fieldName: "name", isId: false, isUnique: false, seq })
    };
}

function defineOrganisationFactoryInternal({ defaultData: defaultDataResolver }: OrganisationFactoryDefineOptions): OrganisationFactoryInterface {
    const seqKey = {};
    const getSeq = () => getSequenceCounter(seqKey);
    const screen = createScreener("Organisation", modelFieldDefinitions);
    const build = async (inputData: Partial<Prisma.OrganisationCreateInput> = {}) => {
        const seq = getSeq();
        const requiredScalarData = autoGenerateOrganisationScalarsOrEnums({ seq });
        const resolveValue = normalizeResolver<OrganisationFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
        const defaultData = await resolveValue({ seq });
        const defaultAssociations = {
            parent: isOrganisationparentFactory(defaultData.parent) ? {
                create: await defaultData.parent.build()
            } : defaultData.parent,
            createdBy: isOrganisationcreatedByFactory(defaultData.createdBy) ? {
                create: await defaultData.createdBy.build()
            } : defaultData.createdBy,
            modifiedBy: isOrganisationmodifiedByFactory(defaultData.modifiedBy) ? {
                create: await defaultData.modifiedBy.build()
            } : defaultData.modifiedBy
        };
        const data: Prisma.OrganisationCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
        return data;
    };
    const buildList = (inputData: number | readonly Partial<Prisma.OrganisationCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
    const pickForConnect = (inputData: Organisation) => ({
        id: inputData.id
    });
    const create = async (inputData: Partial<Prisma.OrganisationCreateInput> = {}) => {
        const data = await build(inputData).then(screen);
        return await getClient<PrismaClient>().organisation.create({ data });
    };
    const createList = (inputData: number | readonly Partial<Prisma.OrganisationCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
    const createForConnect = (inputData: Partial<Prisma.OrganisationCreateInput> = {}) => create(inputData).then(pickForConnect);
    return {
        _factoryFor: "Organisation" as const,
        build,
        buildList,
        buildCreateInput: build,
        pickForConnect,
        create,
        createList,
        createForConnect,
    };
}

/**
 * Define factory for {@link Organisation} model.
 *
 * @param options
 * @returns factory {@link OrganisationFactoryInterface}
 */
export function defineOrganisationFactory(options: OrganisationFactoryDefineOptions = {}): OrganisationFactoryInterface {
    return defineOrganisationFactoryInternal(options);
}

type PermissionScalarOrEnumFields = {
    name: string;
};

type PermissioncreatedByFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutPermissionCreatedInput["create"]>;
};

type PermissionmodifiedByFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutPermissionModifiedInput["create"]>;
};

type PermissionFactoryDefineInput = {
    createdAt?: Date | null;
    modifiedAt?: Date | null;
    id?: string;
    name?: string;
    roles?: Prisma.RolePermissionCreateNestedManyWithoutPermissionInput;
    createdBy?: PermissioncreatedByFactory | Prisma.UserCreateNestedOneWithoutPermissionCreatedInput;
    modifiedBy?: PermissionmodifiedByFactory | Prisma.UserCreateNestedOneWithoutPermissionModifiedInput;
};

type PermissionFactoryDefineOptions = {
    defaultData?: Resolver<PermissionFactoryDefineInput, BuildDataOptions>;
};

function isPermissioncreatedByFactory(x: PermissioncreatedByFactory | Prisma.UserCreateNestedOneWithoutPermissionCreatedInput | undefined): x is PermissioncreatedByFactory {
    return (x as any)?._factoryFor === "User";
}

function isPermissionmodifiedByFactory(x: PermissionmodifiedByFactory | Prisma.UserCreateNestedOneWithoutPermissionModifiedInput | undefined): x is PermissionmodifiedByFactory {
    return (x as any)?._factoryFor === "User";
}

export interface PermissionFactoryInterface {
    readonly _factoryFor: "Permission";
    build(inputData?: Partial<Prisma.PermissionCreateInput>): PromiseLike<Prisma.PermissionCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.PermissionCreateInput>): PromiseLike<Prisma.PermissionCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.PermissionCreateInput>[]): PromiseLike<Prisma.PermissionCreateInput[]>;
    pickForConnect(inputData: Permission): Pick<Permission, "id">;
    create(inputData?: Partial<Prisma.PermissionCreateInput>): PromiseLike<Permission>;
    createList(inputData: number | readonly Partial<Prisma.PermissionCreateInput>[]): PromiseLike<Permission[]>;
    createForConnect(inputData?: Partial<Prisma.PermissionCreateInput>): PromiseLike<Pick<Permission, "id">>;
}

function autoGeneratePermissionScalarsOrEnums({ seq }: {
    readonly seq: number;
}): PermissionScalarOrEnumFields {
    return {
        name: getScalarFieldValueGenerator().String({ modelName: "Permission", fieldName: "name", isId: false, isUnique: false, seq })
    };
}

function definePermissionFactoryInternal({ defaultData: defaultDataResolver }: PermissionFactoryDefineOptions): PermissionFactoryInterface {
    const seqKey = {};
    const getSeq = () => getSequenceCounter(seqKey);
    const screen = createScreener("Permission", modelFieldDefinitions);
    const build = async (inputData: Partial<Prisma.PermissionCreateInput> = {}) => {
        const seq = getSeq();
        const requiredScalarData = autoGeneratePermissionScalarsOrEnums({ seq });
        const resolveValue = normalizeResolver<PermissionFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
        const defaultData = await resolveValue({ seq });
        const defaultAssociations = {
            createdBy: isPermissioncreatedByFactory(defaultData.createdBy) ? {
                create: await defaultData.createdBy.build()
            } : defaultData.createdBy,
            modifiedBy: isPermissionmodifiedByFactory(defaultData.modifiedBy) ? {
                create: await defaultData.modifiedBy.build()
            } : defaultData.modifiedBy
        };
        const data: Prisma.PermissionCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
        return data;
    };
    const buildList = (inputData: number | readonly Partial<Prisma.PermissionCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
    const pickForConnect = (inputData: Permission) => ({
        id: inputData.id
    });
    const create = async (inputData: Partial<Prisma.PermissionCreateInput> = {}) => {
        const data = await build(inputData).then(screen);
        return await getClient<PrismaClient>().permission.create({ data });
    };
    const createList = (inputData: number | readonly Partial<Prisma.PermissionCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
    const createForConnect = (inputData: Partial<Prisma.PermissionCreateInput> = {}) => create(inputData).then(pickForConnect);
    return {
        _factoryFor: "Permission" as const,
        build,
        buildList,
        buildCreateInput: build,
        pickForConnect,
        create,
        createList,
        createForConnect,
    };
}

/**
 * Define factory for {@link Permission} model.
 *
 * @param options
 * @returns factory {@link PermissionFactoryInterface}
 */
export function definePermissionFactory(options: PermissionFactoryDefineOptions = {}): PermissionFactoryInterface {
    return definePermissionFactoryInternal(options);
}

type RoleScalarOrEnumFields = {
    name: string;
};

type RolecreatedByFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutRoleCreatedInput["create"]>;
};

type RolemodifiedByFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutRoleModifiedInput["create"]>;
};

type RoleFactoryDefineInput = {
    createdAt?: Date | null;
    modifiedAt?: Date | null;
    id?: string;
    name?: string;
    userOrganisations?: Prisma.UserOrganisationRoleCreateNestedManyWithoutRoleInput;
    permissions?: Prisma.RolePermissionCreateNestedManyWithoutRoleInput;
    users?: Prisma.UserRoleCreateNestedManyWithoutRoleInput;
    createdBy?: RolecreatedByFactory | Prisma.UserCreateNestedOneWithoutRoleCreatedInput;
    modifiedBy?: RolemodifiedByFactory | Prisma.UserCreateNestedOneWithoutRoleModifiedInput;
};

type RoleFactoryDefineOptions = {
    defaultData?: Resolver<RoleFactoryDefineInput, BuildDataOptions>;
};

function isRolecreatedByFactory(x: RolecreatedByFactory | Prisma.UserCreateNestedOneWithoutRoleCreatedInput | undefined): x is RolecreatedByFactory {
    return (x as any)?._factoryFor === "User";
}

function isRolemodifiedByFactory(x: RolemodifiedByFactory | Prisma.UserCreateNestedOneWithoutRoleModifiedInput | undefined): x is RolemodifiedByFactory {
    return (x as any)?._factoryFor === "User";
}

export interface RoleFactoryInterface {
    readonly _factoryFor: "Role";
    build(inputData?: Partial<Prisma.RoleCreateInput>): PromiseLike<Prisma.RoleCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.RoleCreateInput>): PromiseLike<Prisma.RoleCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.RoleCreateInput>[]): PromiseLike<Prisma.RoleCreateInput[]>;
    pickForConnect(inputData: Role): Pick<Role, "id">;
    create(inputData?: Partial<Prisma.RoleCreateInput>): PromiseLike<Role>;
    createList(inputData: number | readonly Partial<Prisma.RoleCreateInput>[]): PromiseLike<Role[]>;
    createForConnect(inputData?: Partial<Prisma.RoleCreateInput>): PromiseLike<Pick<Role, "id">>;
}

function autoGenerateRoleScalarsOrEnums({ seq }: {
    readonly seq: number;
}): RoleScalarOrEnumFields {
    return {
        name: getScalarFieldValueGenerator().String({ modelName: "Role", fieldName: "name", isId: false, isUnique: false, seq })
    };
}

function defineRoleFactoryInternal({ defaultData: defaultDataResolver }: RoleFactoryDefineOptions): RoleFactoryInterface {
    const seqKey = {};
    const getSeq = () => getSequenceCounter(seqKey);
    const screen = createScreener("Role", modelFieldDefinitions);
    const build = async (inputData: Partial<Prisma.RoleCreateInput> = {}) => {
        const seq = getSeq();
        const requiredScalarData = autoGenerateRoleScalarsOrEnums({ seq });
        const resolveValue = normalizeResolver<RoleFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
        const defaultData = await resolveValue({ seq });
        const defaultAssociations = {
            createdBy: isRolecreatedByFactory(defaultData.createdBy) ? {
                create: await defaultData.createdBy.build()
            } : defaultData.createdBy,
            modifiedBy: isRolemodifiedByFactory(defaultData.modifiedBy) ? {
                create: await defaultData.modifiedBy.build()
            } : defaultData.modifiedBy
        };
        const data: Prisma.RoleCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
        return data;
    };
    const buildList = (inputData: number | readonly Partial<Prisma.RoleCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
    const pickForConnect = (inputData: Role) => ({
        id: inputData.id
    });
    const create = async (inputData: Partial<Prisma.RoleCreateInput> = {}) => {
        const data = await build(inputData).then(screen);
        return await getClient<PrismaClient>().role.create({ data });
    };
    const createList = (inputData: number | readonly Partial<Prisma.RoleCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
    const createForConnect = (inputData: Partial<Prisma.RoleCreateInput> = {}) => create(inputData).then(pickForConnect);
    return {
        _factoryFor: "Role" as const,
        build,
        buildList,
        buildCreateInput: build,
        pickForConnect,
        create,
        createList,
        createForConnect,
    };
}

/**
 * Define factory for {@link Role} model.
 *
 * @param options
 * @returns factory {@link RoleFactoryInterface}
 */
export function defineRoleFactory(options: RoleFactoryDefineOptions = {}): RoleFactoryInterface {
    return defineRoleFactoryInternal(options);
}

type RolePermissionScalarOrEnumFields = {};

type RolePermissionroleFactory = {
    _factoryFor: "Role";
    build: () => PromiseLike<Prisma.RoleCreateNestedOneWithoutPermissionsInput["create"]>;
};

type RolePermissionpermissionFactory = {
    _factoryFor: "Permission";
    build: () => PromiseLike<Prisma.PermissionCreateNestedOneWithoutRolesInput["create"]>;
};

type RolePermissioncreatedByFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutRolePermissionCreatedInput["create"]>;
};

type RolePermissionmodifiedByFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutRolePermissionModifiedInput["create"]>;
};

type RolePermissionFactoryDefineInput = {
    createdAt?: Date | null;
    modifiedAt?: Date | null;
    id?: string;
    role: RolePermissionroleFactory | Prisma.RoleCreateNestedOneWithoutPermissionsInput;
    permission: RolePermissionpermissionFactory | Prisma.PermissionCreateNestedOneWithoutRolesInput;
    createdBy?: RolePermissioncreatedByFactory | Prisma.UserCreateNestedOneWithoutRolePermissionCreatedInput;
    modifiedBy?: RolePermissionmodifiedByFactory | Prisma.UserCreateNestedOneWithoutRolePermissionModifiedInput;
};

type RolePermissionFactoryDefineOptions = {
    defaultData: Resolver<RolePermissionFactoryDefineInput, BuildDataOptions>;
};

function isRolePermissionroleFactory(x: RolePermissionroleFactory | Prisma.RoleCreateNestedOneWithoutPermissionsInput | undefined): x is RolePermissionroleFactory {
    return (x as any)?._factoryFor === "Role";
}

function isRolePermissionpermissionFactory(x: RolePermissionpermissionFactory | Prisma.PermissionCreateNestedOneWithoutRolesInput | undefined): x is RolePermissionpermissionFactory {
    return (x as any)?._factoryFor === "Permission";
}

function isRolePermissioncreatedByFactory(x: RolePermissioncreatedByFactory | Prisma.UserCreateNestedOneWithoutRolePermissionCreatedInput | undefined): x is RolePermissioncreatedByFactory {
    return (x as any)?._factoryFor === "User";
}

function isRolePermissionmodifiedByFactory(x: RolePermissionmodifiedByFactory | Prisma.UserCreateNestedOneWithoutRolePermissionModifiedInput | undefined): x is RolePermissionmodifiedByFactory {
    return (x as any)?._factoryFor === "User";
}

export interface RolePermissionFactoryInterface {
    readonly _factoryFor: "RolePermission";
    build(inputData?: Partial<Prisma.RolePermissionCreateInput>): PromiseLike<Prisma.RolePermissionCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.RolePermissionCreateInput>): PromiseLike<Prisma.RolePermissionCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.RolePermissionCreateInput>[]): PromiseLike<Prisma.RolePermissionCreateInput[]>;
    pickForConnect(inputData: RolePermission): Pick<RolePermission, "id">;
    create(inputData?: Partial<Prisma.RolePermissionCreateInput>): PromiseLike<RolePermission>;
    createList(inputData: number | readonly Partial<Prisma.RolePermissionCreateInput>[]): PromiseLike<RolePermission[]>;
    createForConnect(inputData?: Partial<Prisma.RolePermissionCreateInput>): PromiseLike<Pick<RolePermission, "id">>;
}

function autoGenerateRolePermissionScalarsOrEnums({ seq }: {
    readonly seq: number;
}): RolePermissionScalarOrEnumFields {
    return {};
}

function defineRolePermissionFactoryInternal({ defaultData: defaultDataResolver }: RolePermissionFactoryDefineOptions): RolePermissionFactoryInterface {
    const seqKey = {};
    const getSeq = () => getSequenceCounter(seqKey);
    const screen = createScreener("RolePermission", modelFieldDefinitions);
    const build = async (inputData: Partial<Prisma.RolePermissionCreateInput> = {}) => {
        const seq = getSeq();
        const requiredScalarData = autoGenerateRolePermissionScalarsOrEnums({ seq });
        const resolveValue = normalizeResolver<RolePermissionFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
        const defaultData = await resolveValue({ seq });
        const defaultAssociations = {
            role: isRolePermissionroleFactory(defaultData.role) ? {
                create: await defaultData.role.build()
            } : defaultData.role,
            permission: isRolePermissionpermissionFactory(defaultData.permission) ? {
                create: await defaultData.permission.build()
            } : defaultData.permission,
            createdBy: isRolePermissioncreatedByFactory(defaultData.createdBy) ? {
                create: await defaultData.createdBy.build()
            } : defaultData.createdBy,
            modifiedBy: isRolePermissionmodifiedByFactory(defaultData.modifiedBy) ? {
                create: await defaultData.modifiedBy.build()
            } : defaultData.modifiedBy
        };
        const data: Prisma.RolePermissionCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
        return data;
    };
    const buildList = (inputData: number | readonly Partial<Prisma.RolePermissionCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
    const pickForConnect = (inputData: RolePermission) => ({
        id: inputData.id
    });
    const create = async (inputData: Partial<Prisma.RolePermissionCreateInput> = {}) => {
        const data = await build(inputData).then(screen);
        return await getClient<PrismaClient>().rolePermission.create({ data });
    };
    const createList = (inputData: number | readonly Partial<Prisma.RolePermissionCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
    const createForConnect = (inputData: Partial<Prisma.RolePermissionCreateInput> = {}) => create(inputData).then(pickForConnect);
    return {
        _factoryFor: "RolePermission" as const,
        build,
        buildList,
        buildCreateInput: build,
        pickForConnect,
        create,
        createList,
        createForConnect,
    };
}

/**
 * Define factory for {@link RolePermission} model.
 *
 * @param options
 * @returns factory {@link RolePermissionFactoryInterface}
 */
export function defineRolePermissionFactory(options: RolePermissionFactoryDefineOptions): RolePermissionFactoryInterface {
    return defineRolePermissionFactoryInternal(options);
}

type UserScalarOrEnumFields = {
    email: string;
};

type UserFactoryDefineInput = {
    id?: string;
    firstName?: string | null;
    lastName?: string | null;
    metadata?: Prisma.NullableJsonNullValueInput | Prisma.InputJsonValue;
    email?: string;
    phone?: string | null;
    organisations?: Prisma.UserOrganisationCreateNestedManyWithoutUserInput;
    roles?: Prisma.UserRoleCreateNestedManyWithoutUserInput;
    OrganisationCreated?: Prisma.OrganisationCreateNestedManyWithoutCreatedByInput;
    OrganisationModified?: Prisma.OrganisationCreateNestedManyWithoutModifiedByInput;
    PermissionCreated?: Prisma.PermissionCreateNestedManyWithoutCreatedByInput;
    PermissionModified?: Prisma.PermissionCreateNestedManyWithoutModifiedByInput;
    RoleCreated?: Prisma.RoleCreateNestedManyWithoutCreatedByInput;
    RoleModified?: Prisma.RoleCreateNestedManyWithoutModifiedByInput;
    RolePermissionCreated?: Prisma.RolePermissionCreateNestedManyWithoutCreatedByInput;
    RolePermissionModified?: Prisma.RolePermissionCreateNestedManyWithoutModifiedByInput;
    UserOrganisationCreated?: Prisma.UserOrganisationCreateNestedManyWithoutCreatedByInput;
    UserOrganisationModified?: Prisma.UserOrganisationCreateNestedManyWithoutModifiedByInput;
    UserRoleCreated?: Prisma.UserRoleCreateNestedManyWithoutCreatedByInput;
    UserRoleModified?: Prisma.UserRoleCreateNestedManyWithoutModifiedByInput;
    UserOrganisationRoleCreated?: Prisma.UserOrganisationRoleCreateNestedManyWithoutCreatedByInput;
    UserOrganisationRoleModified?: Prisma.UserOrganisationRoleCreateNestedManyWithoutModifiedByInput;
    ConversationCreated?: Prisma.ConversationCreateNestedManyWithoutCreatedByInput;
    ConversationModified?: Prisma.ConversationCreateNestedManyWithoutModifiedByInput;
    SamaritanCreated?: Prisma.SamaritanCreateNestedManyWithoutCreatedByInput;
    SamaritanModified?: Prisma.SamaritanCreateNestedManyWithoutModifiedByInput;
    MessageCreated?: Prisma.MessageCreateNestedManyWithoutCreatedByInput;
    MessageModified?: Prisma.MessageCreateNestedManyWithoutModifiedByInput;
};

type UserFactoryDefineOptions = {
    defaultData?: Resolver<UserFactoryDefineInput, BuildDataOptions>;
};

export interface UserFactoryInterface {
    readonly _factoryFor: "User";
    build(inputData?: Partial<Prisma.UserCreateInput>): PromiseLike<Prisma.UserCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.UserCreateInput>): PromiseLike<Prisma.UserCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.UserCreateInput>[]): PromiseLike<Prisma.UserCreateInput[]>;
    pickForConnect(inputData: User): Pick<User, "id">;
    create(inputData?: Partial<Prisma.UserCreateInput>): PromiseLike<User>;
    createList(inputData: number | readonly Partial<Prisma.UserCreateInput>[]): PromiseLike<User[]>;
    createForConnect(inputData?: Partial<Prisma.UserCreateInput>): PromiseLike<Pick<User, "id">>;
}

function autoGenerateUserScalarsOrEnums({ seq }: {
    readonly seq: number;
}): UserScalarOrEnumFields {
    return {
        email: getScalarFieldValueGenerator().String({ modelName: "User", fieldName: "email", isId: false, isUnique: true, seq })
    };
}

function defineUserFactoryInternal({ defaultData: defaultDataResolver }: UserFactoryDefineOptions): UserFactoryInterface {
    const seqKey = {};
    const getSeq = () => getSequenceCounter(seqKey);
    const screen = createScreener("User", modelFieldDefinitions);
    const build = async (inputData: Partial<Prisma.UserCreateInput> = {}) => {
        const seq = getSeq();
        const requiredScalarData = autoGenerateUserScalarsOrEnums({ seq });
        const resolveValue = normalizeResolver<UserFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
        const defaultData = await resolveValue({ seq });
        const defaultAssociations = {};
        const data: Prisma.UserCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
        return data;
    };
    const buildList = (inputData: number | readonly Partial<Prisma.UserCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
    const pickForConnect = (inputData: User) => ({
        id: inputData.id
    });
    const create = async (inputData: Partial<Prisma.UserCreateInput> = {}) => {
        const data = await build(inputData).then(screen);
        return await getClient<PrismaClient>().user.create({ data });
    };
    const createList = (inputData: number | readonly Partial<Prisma.UserCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
    const createForConnect = (inputData: Partial<Prisma.UserCreateInput> = {}) => create(inputData).then(pickForConnect);
    return {
        _factoryFor: "User" as const,
        build,
        buildList,
        buildCreateInput: build,
        pickForConnect,
        create,
        createList,
        createForConnect,
    };
}

/**
 * Define factory for {@link User} model.
 *
 * @param options
 * @returns factory {@link UserFactoryInterface}
 */
export function defineUserFactory(options: UserFactoryDefineOptions = {}): UserFactoryInterface {
    return defineUserFactoryInternal(options);
}

type UserOrganisationScalarOrEnumFields = {};

type UserOrganisationuserFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutOrganisationsInput["create"]>;
};

type UserOrganisationorganisationFactory = {
    _factoryFor: "Organisation";
    build: () => PromiseLike<Prisma.OrganisationCreateNestedOneWithoutUsersInput["create"]>;
};

type UserOrganisationcreatedByFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutUserOrganisationCreatedInput["create"]>;
};

type UserOrganisationmodifiedByFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutUserOrganisationModifiedInput["create"]>;
};

type UserOrganisationFactoryDefineInput = {
    createdAt?: Date | null;
    modifiedAt?: Date | null;
    id?: string;
    user: UserOrganisationuserFactory | Prisma.UserCreateNestedOneWithoutOrganisationsInput;
    organisation: UserOrganisationorganisationFactory | Prisma.OrganisationCreateNestedOneWithoutUsersInput;
    roles?: Prisma.UserOrganisationRoleCreateNestedManyWithoutUserOrganisationInput;
    createdBy?: UserOrganisationcreatedByFactory | Prisma.UserCreateNestedOneWithoutUserOrganisationCreatedInput;
    modifiedBy?: UserOrganisationmodifiedByFactory | Prisma.UserCreateNestedOneWithoutUserOrganisationModifiedInput;
};

type UserOrganisationFactoryDefineOptions = {
    defaultData: Resolver<UserOrganisationFactoryDefineInput, BuildDataOptions>;
};

function isUserOrganisationuserFactory(x: UserOrganisationuserFactory | Prisma.UserCreateNestedOneWithoutOrganisationsInput | undefined): x is UserOrganisationuserFactory {
    return (x as any)?._factoryFor === "User";
}

function isUserOrganisationorganisationFactory(x: UserOrganisationorganisationFactory | Prisma.OrganisationCreateNestedOneWithoutUsersInput | undefined): x is UserOrganisationorganisationFactory {
    return (x as any)?._factoryFor === "Organisation";
}

function isUserOrganisationcreatedByFactory(x: UserOrganisationcreatedByFactory | Prisma.UserCreateNestedOneWithoutUserOrganisationCreatedInput | undefined): x is UserOrganisationcreatedByFactory {
    return (x as any)?._factoryFor === "User";
}

function isUserOrganisationmodifiedByFactory(x: UserOrganisationmodifiedByFactory | Prisma.UserCreateNestedOneWithoutUserOrganisationModifiedInput | undefined): x is UserOrganisationmodifiedByFactory {
    return (x as any)?._factoryFor === "User";
}

export interface UserOrganisationFactoryInterface {
    readonly _factoryFor: "UserOrganisation";
    build(inputData?: Partial<Prisma.UserOrganisationCreateInput>): PromiseLike<Prisma.UserOrganisationCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.UserOrganisationCreateInput>): PromiseLike<Prisma.UserOrganisationCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.UserOrganisationCreateInput>[]): PromiseLike<Prisma.UserOrganisationCreateInput[]>;
    pickForConnect(inputData: UserOrganisation): Pick<UserOrganisation, "id">;
    create(inputData?: Partial<Prisma.UserOrganisationCreateInput>): PromiseLike<UserOrganisation>;
    createList(inputData: number | readonly Partial<Prisma.UserOrganisationCreateInput>[]): PromiseLike<UserOrganisation[]>;
    createForConnect(inputData?: Partial<Prisma.UserOrganisationCreateInput>): PromiseLike<Pick<UserOrganisation, "id">>;
}

function autoGenerateUserOrganisationScalarsOrEnums({ seq }: {
    readonly seq: number;
}): UserOrganisationScalarOrEnumFields {
    return {};
}

function defineUserOrganisationFactoryInternal({ defaultData: defaultDataResolver }: UserOrganisationFactoryDefineOptions): UserOrganisationFactoryInterface {
    const seqKey = {};
    const getSeq = () => getSequenceCounter(seqKey);
    const screen = createScreener("UserOrganisation", modelFieldDefinitions);
    const build = async (inputData: Partial<Prisma.UserOrganisationCreateInput> = {}) => {
        const seq = getSeq();
        const requiredScalarData = autoGenerateUserOrganisationScalarsOrEnums({ seq });
        const resolveValue = normalizeResolver<UserOrganisationFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
        const defaultData = await resolveValue({ seq });
        const defaultAssociations = {
            user: isUserOrganisationuserFactory(defaultData.user) ? {
                create: await defaultData.user.build()
            } : defaultData.user,
            organisation: isUserOrganisationorganisationFactory(defaultData.organisation) ? {
                create: await defaultData.organisation.build()
            } : defaultData.organisation,
            createdBy: isUserOrganisationcreatedByFactory(defaultData.createdBy) ? {
                create: await defaultData.createdBy.build()
            } : defaultData.createdBy,
            modifiedBy: isUserOrganisationmodifiedByFactory(defaultData.modifiedBy) ? {
                create: await defaultData.modifiedBy.build()
            } : defaultData.modifiedBy
        };
        const data: Prisma.UserOrganisationCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
        return data;
    };
    const buildList = (inputData: number | readonly Partial<Prisma.UserOrganisationCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
    const pickForConnect = (inputData: UserOrganisation) => ({
        id: inputData.id
    });
    const create = async (inputData: Partial<Prisma.UserOrganisationCreateInput> = {}) => {
        const data = await build(inputData).then(screen);
        return await getClient<PrismaClient>().userOrganisation.create({ data });
    };
    const createList = (inputData: number | readonly Partial<Prisma.UserOrganisationCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
    const createForConnect = (inputData: Partial<Prisma.UserOrganisationCreateInput> = {}) => create(inputData).then(pickForConnect);
    return {
        _factoryFor: "UserOrganisation" as const,
        build,
        buildList,
        buildCreateInput: build,
        pickForConnect,
        create,
        createList,
        createForConnect,
    };
}

/**
 * Define factory for {@link UserOrganisation} model.
 *
 * @param options
 * @returns factory {@link UserOrganisationFactoryInterface}
 */
export function defineUserOrganisationFactory(options: UserOrganisationFactoryDefineOptions): UserOrganisationFactoryInterface {
    return defineUserOrganisationFactoryInternal(options);
}

type UserOrganisationRoleScalarOrEnumFields = {};

type UserOrganisationRoleuserOrganisationFactory = {
    _factoryFor: "UserOrganisation";
    build: () => PromiseLike<Prisma.UserOrganisationCreateNestedOneWithoutRolesInput["create"]>;
};

type UserOrganisationRoleroleFactory = {
    _factoryFor: "Role";
    build: () => PromiseLike<Prisma.RoleCreateNestedOneWithoutUserOrganisationsInput["create"]>;
};

type UserOrganisationRolecreatedByFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutUserOrganisationRoleCreatedInput["create"]>;
};

type UserOrganisationRolemodifiedByFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutUserOrganisationRoleModifiedInput["create"]>;
};

type UserOrganisationRoleFactoryDefineInput = {
    createdAt?: Date | null;
    modifiedAt?: Date | null;
    id?: string;
    userOrganisation: UserOrganisationRoleuserOrganisationFactory | Prisma.UserOrganisationCreateNestedOneWithoutRolesInput;
    role: UserOrganisationRoleroleFactory | Prisma.RoleCreateNestedOneWithoutUserOrganisationsInput;
    createdBy?: UserOrganisationRolecreatedByFactory | Prisma.UserCreateNestedOneWithoutUserOrganisationRoleCreatedInput;
    modifiedBy?: UserOrganisationRolemodifiedByFactory | Prisma.UserCreateNestedOneWithoutUserOrganisationRoleModifiedInput;
};

type UserOrganisationRoleFactoryDefineOptions = {
    defaultData: Resolver<UserOrganisationRoleFactoryDefineInput, BuildDataOptions>;
};

function isUserOrganisationRoleuserOrganisationFactory(x: UserOrganisationRoleuserOrganisationFactory | Prisma.UserOrganisationCreateNestedOneWithoutRolesInput | undefined): x is UserOrganisationRoleuserOrganisationFactory {
    return (x as any)?._factoryFor === "UserOrganisation";
}

function isUserOrganisationRoleroleFactory(x: UserOrganisationRoleroleFactory | Prisma.RoleCreateNestedOneWithoutUserOrganisationsInput | undefined): x is UserOrganisationRoleroleFactory {
    return (x as any)?._factoryFor === "Role";
}

function isUserOrganisationRolecreatedByFactory(x: UserOrganisationRolecreatedByFactory | Prisma.UserCreateNestedOneWithoutUserOrganisationRoleCreatedInput | undefined): x is UserOrganisationRolecreatedByFactory {
    return (x as any)?._factoryFor === "User";
}

function isUserOrganisationRolemodifiedByFactory(x: UserOrganisationRolemodifiedByFactory | Prisma.UserCreateNestedOneWithoutUserOrganisationRoleModifiedInput | undefined): x is UserOrganisationRolemodifiedByFactory {
    return (x as any)?._factoryFor === "User";
}

export interface UserOrganisationRoleFactoryInterface {
    readonly _factoryFor: "UserOrganisationRole";
    build(inputData?: Partial<Prisma.UserOrganisationRoleCreateInput>): PromiseLike<Prisma.UserOrganisationRoleCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.UserOrganisationRoleCreateInput>): PromiseLike<Prisma.UserOrganisationRoleCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.UserOrganisationRoleCreateInput>[]): PromiseLike<Prisma.UserOrganisationRoleCreateInput[]>;
    pickForConnect(inputData: UserOrganisationRole): Pick<UserOrganisationRole, "id">;
    create(inputData?: Partial<Prisma.UserOrganisationRoleCreateInput>): PromiseLike<UserOrganisationRole>;
    createList(inputData: number | readonly Partial<Prisma.UserOrganisationRoleCreateInput>[]): PromiseLike<UserOrganisationRole[]>;
    createForConnect(inputData?: Partial<Prisma.UserOrganisationRoleCreateInput>): PromiseLike<Pick<UserOrganisationRole, "id">>;
}

function autoGenerateUserOrganisationRoleScalarsOrEnums({ seq }: {
    readonly seq: number;
}): UserOrganisationRoleScalarOrEnumFields {
    return {};
}

function defineUserOrganisationRoleFactoryInternal({ defaultData: defaultDataResolver }: UserOrganisationRoleFactoryDefineOptions): UserOrganisationRoleFactoryInterface {
    const seqKey = {};
    const getSeq = () => getSequenceCounter(seqKey);
    const screen = createScreener("UserOrganisationRole", modelFieldDefinitions);
    const build = async (inputData: Partial<Prisma.UserOrganisationRoleCreateInput> = {}) => {
        const seq = getSeq();
        const requiredScalarData = autoGenerateUserOrganisationRoleScalarsOrEnums({ seq });
        const resolveValue = normalizeResolver<UserOrganisationRoleFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
        const defaultData = await resolveValue({ seq });
        const defaultAssociations = {
            userOrganisation: isUserOrganisationRoleuserOrganisationFactory(defaultData.userOrganisation) ? {
                create: await defaultData.userOrganisation.build()
            } : defaultData.userOrganisation,
            role: isUserOrganisationRoleroleFactory(defaultData.role) ? {
                create: await defaultData.role.build()
            } : defaultData.role,
            createdBy: isUserOrganisationRolecreatedByFactory(defaultData.createdBy) ? {
                create: await defaultData.createdBy.build()
            } : defaultData.createdBy,
            modifiedBy: isUserOrganisationRolemodifiedByFactory(defaultData.modifiedBy) ? {
                create: await defaultData.modifiedBy.build()
            } : defaultData.modifiedBy
        };
        const data: Prisma.UserOrganisationRoleCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
        return data;
    };
    const buildList = (inputData: number | readonly Partial<Prisma.UserOrganisationRoleCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
    const pickForConnect = (inputData: UserOrganisationRole) => ({
        id: inputData.id
    });
    const create = async (inputData: Partial<Prisma.UserOrganisationRoleCreateInput> = {}) => {
        const data = await build(inputData).then(screen);
        return await getClient<PrismaClient>().userOrganisationRole.create({ data });
    };
    const createList = (inputData: number | readonly Partial<Prisma.UserOrganisationRoleCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
    const createForConnect = (inputData: Partial<Prisma.UserOrganisationRoleCreateInput> = {}) => create(inputData).then(pickForConnect);
    return {
        _factoryFor: "UserOrganisationRole" as const,
        build,
        buildList,
        buildCreateInput: build,
        pickForConnect,
        create,
        createList,
        createForConnect,
    };
}

/**
 * Define factory for {@link UserOrganisationRole} model.
 *
 * @param options
 * @returns factory {@link UserOrganisationRoleFactoryInterface}
 */
export function defineUserOrganisationRoleFactory(options: UserOrganisationRoleFactoryDefineOptions): UserOrganisationRoleFactoryInterface {
    return defineUserOrganisationRoleFactoryInternal(options);
}

type UserRoleScalarOrEnumFields = {};

type UserRoleuserFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutRolesInput["create"]>;
};

type UserRoleroleFactory = {
    _factoryFor: "Role";
    build: () => PromiseLike<Prisma.RoleCreateNestedOneWithoutUsersInput["create"]>;
};

type UserRolecreatedByFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutUserRoleCreatedInput["create"]>;
};

type UserRolemodifiedByFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutUserRoleModifiedInput["create"]>;
};

type UserRoleFactoryDefineInput = {
    createdAt?: Date | null;
    modifiedAt?: Date | null;
    id?: string;
    user: UserRoleuserFactory | Prisma.UserCreateNestedOneWithoutRolesInput;
    role: UserRoleroleFactory | Prisma.RoleCreateNestedOneWithoutUsersInput;
    createdBy?: UserRolecreatedByFactory | Prisma.UserCreateNestedOneWithoutUserRoleCreatedInput;
    modifiedBy?: UserRolemodifiedByFactory | Prisma.UserCreateNestedOneWithoutUserRoleModifiedInput;
};

type UserRoleFactoryDefineOptions = {
    defaultData: Resolver<UserRoleFactoryDefineInput, BuildDataOptions>;
};

function isUserRoleuserFactory(x: UserRoleuserFactory | Prisma.UserCreateNestedOneWithoutRolesInput | undefined): x is UserRoleuserFactory {
    return (x as any)?._factoryFor === "User";
}

function isUserRoleroleFactory(x: UserRoleroleFactory | Prisma.RoleCreateNestedOneWithoutUsersInput | undefined): x is UserRoleroleFactory {
    return (x as any)?._factoryFor === "Role";
}

function isUserRolecreatedByFactory(x: UserRolecreatedByFactory | Prisma.UserCreateNestedOneWithoutUserRoleCreatedInput | undefined): x is UserRolecreatedByFactory {
    return (x as any)?._factoryFor === "User";
}

function isUserRolemodifiedByFactory(x: UserRolemodifiedByFactory | Prisma.UserCreateNestedOneWithoutUserRoleModifiedInput | undefined): x is UserRolemodifiedByFactory {
    return (x as any)?._factoryFor === "User";
}

export interface UserRoleFactoryInterface {
    readonly _factoryFor: "UserRole";
    build(inputData?: Partial<Prisma.UserRoleCreateInput>): PromiseLike<Prisma.UserRoleCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.UserRoleCreateInput>): PromiseLike<Prisma.UserRoleCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.UserRoleCreateInput>[]): PromiseLike<Prisma.UserRoleCreateInput[]>;
    pickForConnect(inputData: UserRole): Pick<UserRole, "id">;
    create(inputData?: Partial<Prisma.UserRoleCreateInput>): PromiseLike<UserRole>;
    createList(inputData: number | readonly Partial<Prisma.UserRoleCreateInput>[]): PromiseLike<UserRole[]>;
    createForConnect(inputData?: Partial<Prisma.UserRoleCreateInput>): PromiseLike<Pick<UserRole, "id">>;
}

function autoGenerateUserRoleScalarsOrEnums({ seq }: {
    readonly seq: number;
}): UserRoleScalarOrEnumFields {
    return {};
}

function defineUserRoleFactoryInternal({ defaultData: defaultDataResolver }: UserRoleFactoryDefineOptions): UserRoleFactoryInterface {
    const seqKey = {};
    const getSeq = () => getSequenceCounter(seqKey);
    const screen = createScreener("UserRole", modelFieldDefinitions);
    const build = async (inputData: Partial<Prisma.UserRoleCreateInput> = {}) => {
        const seq = getSeq();
        const requiredScalarData = autoGenerateUserRoleScalarsOrEnums({ seq });
        const resolveValue = normalizeResolver<UserRoleFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
        const defaultData = await resolveValue({ seq });
        const defaultAssociations = {
            user: isUserRoleuserFactory(defaultData.user) ? {
                create: await defaultData.user.build()
            } : defaultData.user,
            role: isUserRoleroleFactory(defaultData.role) ? {
                create: await defaultData.role.build()
            } : defaultData.role,
            createdBy: isUserRolecreatedByFactory(defaultData.createdBy) ? {
                create: await defaultData.createdBy.build()
            } : defaultData.createdBy,
            modifiedBy: isUserRolemodifiedByFactory(defaultData.modifiedBy) ? {
                create: await defaultData.modifiedBy.build()
            } : defaultData.modifiedBy
        };
        const data: Prisma.UserRoleCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
        return data;
    };
    const buildList = (inputData: number | readonly Partial<Prisma.UserRoleCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
    const pickForConnect = (inputData: UserRole) => ({
        id: inputData.id
    });
    const create = async (inputData: Partial<Prisma.UserRoleCreateInput> = {}) => {
        const data = await build(inputData).then(screen);
        return await getClient<PrismaClient>().userRole.create({ data });
    };
    const createList = (inputData: number | readonly Partial<Prisma.UserRoleCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
    const createForConnect = (inputData: Partial<Prisma.UserRoleCreateInput> = {}) => create(inputData).then(pickForConnect);
    return {
        _factoryFor: "UserRole" as const,
        build,
        buildList,
        buildCreateInput: build,
        pickForConnect,
        create,
        createList,
        createForConnect,
    };
}

/**
 * Define factory for {@link UserRole} model.
 *
 * @param options
 * @returns factory {@link UserRoleFactoryInterface}
 */
export function defineUserRoleFactory(options: UserRoleFactoryDefineOptions): UserRoleFactoryInterface {
    return defineUserRoleFactoryInternal(options);
}

type ConversationScalarOrEnumFields = {};

type ConversationorganisationFactory = {
    _factoryFor: "Organisation";
    build: () => PromiseLike<Prisma.OrganisationCreateNestedOneWithoutConversationsInput["create"]>;
};

type ConversationsamaritanFactory = {
    _factoryFor: "Samaritan";
    build: () => PromiseLike<Prisma.SamaritanCreateNestedOneWithoutConversationsInput["create"]>;
};

type ConversationcreatedByFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutConversationCreatedInput["create"]>;
};

type ConversationmodifiedByFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutConversationModifiedInput["create"]>;
};

type ConversationFactoryDefineInput = {
    createdAt?: Date | null;
    modifiedAt?: Date | null;
    id?: string;
    latitude?: number | null;
    longitude?: number | null;
    location?: Prisma.NullableJsonNullValueInput | Prisma.InputJsonValue;
    responseStatus?: ConversationNotificationStatus;
    organisation: ConversationorganisationFactory | Prisma.OrganisationCreateNestedOneWithoutConversationsInput;
    samaritan: ConversationsamaritanFactory | Prisma.SamaritanCreateNestedOneWithoutConversationsInput;
    messages?: Prisma.MessageCreateNestedManyWithoutConversationInput;
    createdBy?: ConversationcreatedByFactory | Prisma.UserCreateNestedOneWithoutConversationCreatedInput;
    modifiedBy?: ConversationmodifiedByFactory | Prisma.UserCreateNestedOneWithoutConversationModifiedInput;
};

type ConversationFactoryDefineOptions = {
    defaultData: Resolver<ConversationFactoryDefineInput, BuildDataOptions>;
};

function isConversationorganisationFactory(x: ConversationorganisationFactory | Prisma.OrganisationCreateNestedOneWithoutConversationsInput | undefined): x is ConversationorganisationFactory {
    return (x as any)?._factoryFor === "Organisation";
}

function isConversationsamaritanFactory(x: ConversationsamaritanFactory | Prisma.SamaritanCreateNestedOneWithoutConversationsInput | undefined): x is ConversationsamaritanFactory {
    return (x as any)?._factoryFor === "Samaritan";
}

function isConversationcreatedByFactory(x: ConversationcreatedByFactory | Prisma.UserCreateNestedOneWithoutConversationCreatedInput | undefined): x is ConversationcreatedByFactory {
    return (x as any)?._factoryFor === "User";
}

function isConversationmodifiedByFactory(x: ConversationmodifiedByFactory | Prisma.UserCreateNestedOneWithoutConversationModifiedInput | undefined): x is ConversationmodifiedByFactory {
    return (x as any)?._factoryFor === "User";
}

export interface ConversationFactoryInterface {
    readonly _factoryFor: "Conversation";
    build(inputData?: Partial<Prisma.ConversationCreateInput>): PromiseLike<Prisma.ConversationCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.ConversationCreateInput>): PromiseLike<Prisma.ConversationCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.ConversationCreateInput>[]): PromiseLike<Prisma.ConversationCreateInput[]>;
    pickForConnect(inputData: Conversation): Pick<Conversation, "id">;
    create(inputData?: Partial<Prisma.ConversationCreateInput>): PromiseLike<Conversation>;
    createList(inputData: number | readonly Partial<Prisma.ConversationCreateInput>[]): PromiseLike<Conversation[]>;
    createForConnect(inputData?: Partial<Prisma.ConversationCreateInput>): PromiseLike<Pick<Conversation, "id">>;
}

function autoGenerateConversationScalarsOrEnums({ seq }: {
    readonly seq: number;
}): ConversationScalarOrEnumFields {
    return {};
}

function defineConversationFactoryInternal({ defaultData: defaultDataResolver }: ConversationFactoryDefineOptions): ConversationFactoryInterface {
    const seqKey = {};
    const getSeq = () => getSequenceCounter(seqKey);
    const screen = createScreener("Conversation", modelFieldDefinitions);
    const build = async (inputData: Partial<Prisma.ConversationCreateInput> = {}) => {
        const seq = getSeq();
        const requiredScalarData = autoGenerateConversationScalarsOrEnums({ seq });
        const resolveValue = normalizeResolver<ConversationFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
        const defaultData = await resolveValue({ seq });
        const defaultAssociations = {
            organisation: isConversationorganisationFactory(defaultData.organisation) ? {
                create: await defaultData.organisation.build()
            } : defaultData.organisation,
            samaritan: isConversationsamaritanFactory(defaultData.samaritan) ? {
                create: await defaultData.samaritan.build()
            } : defaultData.samaritan,
            createdBy: isConversationcreatedByFactory(defaultData.createdBy) ? {
                create: await defaultData.createdBy.build()
            } : defaultData.createdBy,
            modifiedBy: isConversationmodifiedByFactory(defaultData.modifiedBy) ? {
                create: await defaultData.modifiedBy.build()
            } : defaultData.modifiedBy
        };
        const data: Prisma.ConversationCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
        return data;
    };
    const buildList = (inputData: number | readonly Partial<Prisma.ConversationCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
    const pickForConnect = (inputData: Conversation) => ({
        id: inputData.id
    });
    const create = async (inputData: Partial<Prisma.ConversationCreateInput> = {}) => {
        const data = await build(inputData).then(screen);
        return await getClient<PrismaClient>().conversation.create({ data });
    };
    const createList = (inputData: number | readonly Partial<Prisma.ConversationCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
    const createForConnect = (inputData: Partial<Prisma.ConversationCreateInput> = {}) => create(inputData).then(pickForConnect);
    return {
        _factoryFor: "Conversation" as const,
        build,
        buildList,
        buildCreateInput: build,
        pickForConnect,
        create,
        createList,
        createForConnect,
    };
}

/**
 * Define factory for {@link Conversation} model.
 *
 * @param options
 * @returns factory {@link ConversationFactoryInterface}
 */
export function defineConversationFactory(options: ConversationFactoryDefineOptions): ConversationFactoryInterface {
    return defineConversationFactoryInternal(options);
}

type MessageScalarOrEnumFields = {
    message: string;
    fromSamaritan: boolean;
    read: boolean;
};

type MessageconversationFactory = {
    _factoryFor: "Conversation";
    build: () => PromiseLike<Prisma.ConversationCreateNestedOneWithoutMessagesInput["create"]>;
};

type MessagecreatedByFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutMessageCreatedInput["create"]>;
};

type MessagemodifiedByFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutMessageModifiedInput["create"]>;
};

type MessageFactoryDefineInput = {
    createdAt?: Date | null;
    modifiedAt?: Date | null;
    id?: string;
    latitude?: number | null;
    longitude?: number | null;
    location?: Prisma.NullableJsonNullValueInput | Prisma.InputJsonValue;
    message?: string;
    fromSamaritan?: boolean;
    read?: boolean;
    photo?: Prisma.NullableJsonNullValueInput | Prisma.InputJsonValue;
    conversation: MessageconversationFactory | Prisma.ConversationCreateNestedOneWithoutMessagesInput;
    createdBy?: MessagecreatedByFactory | Prisma.UserCreateNestedOneWithoutMessageCreatedInput;
    modifiedBy?: MessagemodifiedByFactory | Prisma.UserCreateNestedOneWithoutMessageModifiedInput;
};

type MessageFactoryDefineOptions = {
    defaultData: Resolver<MessageFactoryDefineInput, BuildDataOptions>;
};

function isMessageconversationFactory(x: MessageconversationFactory | Prisma.ConversationCreateNestedOneWithoutMessagesInput | undefined): x is MessageconversationFactory {
    return (x as any)?._factoryFor === "Conversation";
}

function isMessagecreatedByFactory(x: MessagecreatedByFactory | Prisma.UserCreateNestedOneWithoutMessageCreatedInput | undefined): x is MessagecreatedByFactory {
    return (x as any)?._factoryFor === "User";
}

function isMessagemodifiedByFactory(x: MessagemodifiedByFactory | Prisma.UserCreateNestedOneWithoutMessageModifiedInput | undefined): x is MessagemodifiedByFactory {
    return (x as any)?._factoryFor === "User";
}

export interface MessageFactoryInterface {
    readonly _factoryFor: "Message";
    build(inputData?: Partial<Prisma.MessageCreateInput>): PromiseLike<Prisma.MessageCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.MessageCreateInput>): PromiseLike<Prisma.MessageCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.MessageCreateInput>[]): PromiseLike<Prisma.MessageCreateInput[]>;
    pickForConnect(inputData: Message): Pick<Message, "id">;
    create(inputData?: Partial<Prisma.MessageCreateInput>): PromiseLike<Message>;
    createList(inputData: number | readonly Partial<Prisma.MessageCreateInput>[]): PromiseLike<Message[]>;
    createForConnect(inputData?: Partial<Prisma.MessageCreateInput>): PromiseLike<Pick<Message, "id">>;
}

function autoGenerateMessageScalarsOrEnums({ seq }: {
    readonly seq: number;
}): MessageScalarOrEnumFields {
    return {
        message: getScalarFieldValueGenerator().String({ modelName: "Message", fieldName: "message", isId: false, isUnique: false, seq }),
        fromSamaritan: getScalarFieldValueGenerator().Boolean({ modelName: "Message", fieldName: "fromSamaritan", isId: false, isUnique: false, seq }),
        read: getScalarFieldValueGenerator().Boolean({ modelName: "Message", fieldName: "read", isId: false, isUnique: false, seq })
    };
}

function defineMessageFactoryInternal({ defaultData: defaultDataResolver }: MessageFactoryDefineOptions): MessageFactoryInterface {
    const seqKey = {};
    const getSeq = () => getSequenceCounter(seqKey);
    const screen = createScreener("Message", modelFieldDefinitions);
    const build = async (inputData: Partial<Prisma.MessageCreateInput> = {}) => {
        const seq = getSeq();
        const requiredScalarData = autoGenerateMessageScalarsOrEnums({ seq });
        const resolveValue = normalizeResolver<MessageFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
        const defaultData = await resolveValue({ seq });
        const defaultAssociations = {
            conversation: isMessageconversationFactory(defaultData.conversation) ? {
                create: await defaultData.conversation.build()
            } : defaultData.conversation,
            createdBy: isMessagecreatedByFactory(defaultData.createdBy) ? {
                create: await defaultData.createdBy.build()
            } : defaultData.createdBy,
            modifiedBy: isMessagemodifiedByFactory(defaultData.modifiedBy) ? {
                create: await defaultData.modifiedBy.build()
            } : defaultData.modifiedBy
        };
        const data: Prisma.MessageCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
        return data;
    };
    const buildList = (inputData: number | readonly Partial<Prisma.MessageCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
    const pickForConnect = (inputData: Message) => ({
        id: inputData.id
    });
    const create = async (inputData: Partial<Prisma.MessageCreateInput> = {}) => {
        const data = await build(inputData).then(screen);
        return await getClient<PrismaClient>().message.create({ data });
    };
    const createList = (inputData: number | readonly Partial<Prisma.MessageCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
    const createForConnect = (inputData: Partial<Prisma.MessageCreateInput> = {}) => create(inputData).then(pickForConnect);
    return {
        _factoryFor: "Message" as const,
        build,
        buildList,
        buildCreateInput: build,
        pickForConnect,
        create,
        createList,
        createForConnect,
    };
}

/**
 * Define factory for {@link Message} model.
 *
 * @param options
 * @returns factory {@link MessageFactoryInterface}
 */
export function defineMessageFactory(options: MessageFactoryDefineOptions): MessageFactoryInterface {
    return defineMessageFactoryInternal(options);
}

type SamaritanScalarOrEnumFields = {
    name: string;
};

type SamaritancreatedByFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutSamaritanCreatedInput["create"]>;
};

type SamaritanmodifiedByFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutSamaritanModifiedInput["create"]>;
};

type SamaritanFactoryDefineInput = {
    createdAt?: Date | null;
    modifiedAt?: Date | null;
    id?: string;
    name?: string;
    email?: string | null;
    phone?: string | null;
    conversations?: Prisma.ConversationCreateNestedManyWithoutSamaritanInput;
    createdBy?: SamaritancreatedByFactory | Prisma.UserCreateNestedOneWithoutSamaritanCreatedInput;
    modifiedBy?: SamaritanmodifiedByFactory | Prisma.UserCreateNestedOneWithoutSamaritanModifiedInput;
};

type SamaritanFactoryDefineOptions = {
    defaultData?: Resolver<SamaritanFactoryDefineInput, BuildDataOptions>;
};

function isSamaritancreatedByFactory(x: SamaritancreatedByFactory | Prisma.UserCreateNestedOneWithoutSamaritanCreatedInput | undefined): x is SamaritancreatedByFactory {
    return (x as any)?._factoryFor === "User";
}

function isSamaritanmodifiedByFactory(x: SamaritanmodifiedByFactory | Prisma.UserCreateNestedOneWithoutSamaritanModifiedInput | undefined): x is SamaritanmodifiedByFactory {
    return (x as any)?._factoryFor === "User";
}

export interface SamaritanFactoryInterface {
    readonly _factoryFor: "Samaritan";
    build(inputData?: Partial<Prisma.SamaritanCreateInput>): PromiseLike<Prisma.SamaritanCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.SamaritanCreateInput>): PromiseLike<Prisma.SamaritanCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.SamaritanCreateInput>[]): PromiseLike<Prisma.SamaritanCreateInput[]>;
    pickForConnect(inputData: Samaritan): Pick<Samaritan, "id">;
    create(inputData?: Partial<Prisma.SamaritanCreateInput>): PromiseLike<Samaritan>;
    createList(inputData: number | readonly Partial<Prisma.SamaritanCreateInput>[]): PromiseLike<Samaritan[]>;
    createForConnect(inputData?: Partial<Prisma.SamaritanCreateInput>): PromiseLike<Pick<Samaritan, "id">>;
}

function autoGenerateSamaritanScalarsOrEnums({ seq }: {
    readonly seq: number;
}): SamaritanScalarOrEnumFields {
    return {
        name: getScalarFieldValueGenerator().String({ modelName: "Samaritan", fieldName: "name", isId: false, isUnique: false, seq })
    };
}

function defineSamaritanFactoryInternal({ defaultData: defaultDataResolver }: SamaritanFactoryDefineOptions): SamaritanFactoryInterface {
    const seqKey = {};
    const getSeq = () => getSequenceCounter(seqKey);
    const screen = createScreener("Samaritan", modelFieldDefinitions);
    const build = async (inputData: Partial<Prisma.SamaritanCreateInput> = {}) => {
        const seq = getSeq();
        const requiredScalarData = autoGenerateSamaritanScalarsOrEnums({ seq });
        const resolveValue = normalizeResolver<SamaritanFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
        const defaultData = await resolveValue({ seq });
        const defaultAssociations = {
            createdBy: isSamaritancreatedByFactory(defaultData.createdBy) ? {
                create: await defaultData.createdBy.build()
            } : defaultData.createdBy,
            modifiedBy: isSamaritanmodifiedByFactory(defaultData.modifiedBy) ? {
                create: await defaultData.modifiedBy.build()
            } : defaultData.modifiedBy
        };
        const data: Prisma.SamaritanCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
        return data;
    };
    const buildList = (inputData: number | readonly Partial<Prisma.SamaritanCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
    const pickForConnect = (inputData: Samaritan) => ({
        id: inputData.id
    });
    const create = async (inputData: Partial<Prisma.SamaritanCreateInput> = {}) => {
        const data = await build(inputData).then(screen);
        return await getClient<PrismaClient>().samaritan.create({ data });
    };
    const createList = (inputData: number | readonly Partial<Prisma.SamaritanCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
    const createForConnect = (inputData: Partial<Prisma.SamaritanCreateInput> = {}) => create(inputData).then(pickForConnect);
    return {
        _factoryFor: "Samaritan" as const,
        build,
        buildList,
        buildCreateInput: build,
        pickForConnect,
        create,
        createList,
        createForConnect,
    };
}

/**
 * Define factory for {@link Samaritan} model.
 *
 * @param options
 * @returns factory {@link SamaritanFactoryInterface}
 */
export function defineSamaritanFactory(options: SamaritanFactoryDefineOptions = {}): SamaritanFactoryInterface {
    return defineSamaritanFactoryInternal(options);
}

type SettingScalarOrEnumFields = {
    key: string;
    value: Prisma.JsonNullValueInput | Prisma.InputJsonValue;
};

type SettingFactoryDefineInput = {
    id?: string;
    key?: string;
    value?: Prisma.JsonNullValueInput | Prisma.InputJsonValue;
};

type SettingFactoryDefineOptions = {
    defaultData?: Resolver<SettingFactoryDefineInput, BuildDataOptions>;
};

export interface SettingFactoryInterface {
    readonly _factoryFor: "Setting";
    build(inputData?: Partial<Prisma.SettingCreateInput>): PromiseLike<Prisma.SettingCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.SettingCreateInput>): PromiseLike<Prisma.SettingCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.SettingCreateInput>[]): PromiseLike<Prisma.SettingCreateInput[]>;
    pickForConnect(inputData: Setting): Pick<Setting, "id">;
    create(inputData?: Partial<Prisma.SettingCreateInput>): PromiseLike<Setting>;
    createList(inputData: number | readonly Partial<Prisma.SettingCreateInput>[]): PromiseLike<Setting[]>;
    createForConnect(inputData?: Partial<Prisma.SettingCreateInput>): PromiseLike<Pick<Setting, "id">>;
}

function autoGenerateSettingScalarsOrEnums({ seq }: {
    readonly seq: number;
}): SettingScalarOrEnumFields {
    return {
        key: getScalarFieldValueGenerator().String({ modelName: "Setting", fieldName: "key", isId: false, isUnique: true, seq }),
        value: getScalarFieldValueGenerator().Json({ modelName: "Setting", fieldName: "value", isId: false, isUnique: false, seq })
    };
}

function defineSettingFactoryInternal({ defaultData: defaultDataResolver }: SettingFactoryDefineOptions): SettingFactoryInterface {
    const seqKey = {};
    const getSeq = () => getSequenceCounter(seqKey);
    const screen = createScreener("Setting", modelFieldDefinitions);
    const build = async (inputData: Partial<Prisma.SettingCreateInput> = {}) => {
        const seq = getSeq();
        const requiredScalarData = autoGenerateSettingScalarsOrEnums({ seq });
        const resolveValue = normalizeResolver<SettingFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
        const defaultData = await resolveValue({ seq });
        const defaultAssociations = {};
        const data: Prisma.SettingCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
        return data;
    };
    const buildList = (inputData: number | readonly Partial<Prisma.SettingCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
    const pickForConnect = (inputData: Setting) => ({
        id: inputData.id
    });
    const create = async (inputData: Partial<Prisma.SettingCreateInput> = {}) => {
        const data = await build(inputData).then(screen);
        return await getClient<PrismaClient>().setting.create({ data });
    };
    const createList = (inputData: number | readonly Partial<Prisma.SettingCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
    const createForConnect = (inputData: Partial<Prisma.SettingCreateInput> = {}) => create(inputData).then(pickForConnect);
    return {
        _factoryFor: "Setting" as const,
        build,
        buildList,
        buildCreateInput: build,
        pickForConnect,
        create,
        createList,
        createForConnect,
    };
}

/**
 * Define factory for {@link Setting} model.
 *
 * @param options
 * @returns factory {@link SettingFactoryInterface}
 */
export function defineSettingFactory(options: SettingFactoryDefineOptions = {}): SettingFactoryInterface {
    return defineSettingFactoryInternal(options);
}

type StripeCouponScalarOrEnumFields = {
    couponId: string;
    duration: StripeCouponDurationEnum;
};

type StripeCouponFactoryDefineInput = {
    id?: string;
    couponId?: string;
    amountOff?: number | null;
    currency?: string | null;
    duration?: StripeCouponDurationEnum;
    duration_in_months?: number | null;
    name?: string | null;
    percentOff?: number | null;
    promotionCodes?: Prisma.StripePromotionCodeCreateNestedManyWithoutCouponInput;
    products?: Prisma.StripeCouponProductCreateNestedManyWithoutCouponInput;
};

type StripeCouponFactoryDefineOptions = {
    defaultData?: Resolver<StripeCouponFactoryDefineInput, BuildDataOptions>;
};

export interface StripeCouponFactoryInterface {
    readonly _factoryFor: "StripeCoupon";
    build(inputData?: Partial<Prisma.StripeCouponCreateInput>): PromiseLike<Prisma.StripeCouponCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.StripeCouponCreateInput>): PromiseLike<Prisma.StripeCouponCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.StripeCouponCreateInput>[]): PromiseLike<Prisma.StripeCouponCreateInput[]>;
    pickForConnect(inputData: StripeCoupon): Pick<StripeCoupon, "id">;
    create(inputData?: Partial<Prisma.StripeCouponCreateInput>): PromiseLike<StripeCoupon>;
    createList(inputData: number | readonly Partial<Prisma.StripeCouponCreateInput>[]): PromiseLike<StripeCoupon[]>;
    createForConnect(inputData?: Partial<Prisma.StripeCouponCreateInput>): PromiseLike<Pick<StripeCoupon, "id">>;
}

function autoGenerateStripeCouponScalarsOrEnums({ seq }: {
    readonly seq: number;
}): StripeCouponScalarOrEnumFields {
    return {
        couponId: getScalarFieldValueGenerator().String({ modelName: "StripeCoupon", fieldName: "couponId", isId: false, isUnique: true, seq }),
        duration: "forever"
    };
}

function defineStripeCouponFactoryInternal({ defaultData: defaultDataResolver }: StripeCouponFactoryDefineOptions): StripeCouponFactoryInterface {
    const seqKey = {};
    const getSeq = () => getSequenceCounter(seqKey);
    const screen = createScreener("StripeCoupon", modelFieldDefinitions);
    const build = async (inputData: Partial<Prisma.StripeCouponCreateInput> = {}) => {
        const seq = getSeq();
        const requiredScalarData = autoGenerateStripeCouponScalarsOrEnums({ seq });
        const resolveValue = normalizeResolver<StripeCouponFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
        const defaultData = await resolveValue({ seq });
        const defaultAssociations = {};
        const data: Prisma.StripeCouponCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
        return data;
    };
    const buildList = (inputData: number | readonly Partial<Prisma.StripeCouponCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
    const pickForConnect = (inputData: StripeCoupon) => ({
        id: inputData.id
    });
    const create = async (inputData: Partial<Prisma.StripeCouponCreateInput> = {}) => {
        const data = await build(inputData).then(screen);
        return await getClient<PrismaClient>().stripeCoupon.create({ data });
    };
    const createList = (inputData: number | readonly Partial<Prisma.StripeCouponCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
    const createForConnect = (inputData: Partial<Prisma.StripeCouponCreateInput> = {}) => create(inputData).then(pickForConnect);
    return {
        _factoryFor: "StripeCoupon" as const,
        build,
        buildList,
        buildCreateInput: build,
        pickForConnect,
        create,
        createList,
        createForConnect,
    };
}

/**
 * Define factory for {@link StripeCoupon} model.
 *
 * @param options
 * @returns factory {@link StripeCouponFactoryInterface}
 */
export function defineStripeCouponFactory(options: StripeCouponFactoryDefineOptions = {}): StripeCouponFactoryInterface {
    return defineStripeCouponFactoryInternal(options);
}

type StripeCouponProductScalarOrEnumFields = {};

type StripeCouponProductproductFactory = {
    _factoryFor: "StripeProduct";
    build: () => PromiseLike<Prisma.StripeProductCreateNestedOneWithoutCouponsInput["create"]>;
};

type StripeCouponProductcouponFactory = {
    _factoryFor: "StripeCoupon";
    build: () => PromiseLike<Prisma.StripeCouponCreateNestedOneWithoutProductsInput["create"]>;
};

type StripeCouponProductFactoryDefineInput = {
    id?: string;
    product: StripeCouponProductproductFactory | Prisma.StripeProductCreateNestedOneWithoutCouponsInput;
    coupon: StripeCouponProductcouponFactory | Prisma.StripeCouponCreateNestedOneWithoutProductsInput;
};

type StripeCouponProductFactoryDefineOptions = {
    defaultData: Resolver<StripeCouponProductFactoryDefineInput, BuildDataOptions>;
};

function isStripeCouponProductproductFactory(x: StripeCouponProductproductFactory | Prisma.StripeProductCreateNestedOneWithoutCouponsInput | undefined): x is StripeCouponProductproductFactory {
    return (x as any)?._factoryFor === "StripeProduct";
}

function isStripeCouponProductcouponFactory(x: StripeCouponProductcouponFactory | Prisma.StripeCouponCreateNestedOneWithoutProductsInput | undefined): x is StripeCouponProductcouponFactory {
    return (x as any)?._factoryFor === "StripeCoupon";
}

export interface StripeCouponProductFactoryInterface {
    readonly _factoryFor: "StripeCouponProduct";
    build(inputData?: Partial<Prisma.StripeCouponProductCreateInput>): PromiseLike<Prisma.StripeCouponProductCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.StripeCouponProductCreateInput>): PromiseLike<Prisma.StripeCouponProductCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.StripeCouponProductCreateInput>[]): PromiseLike<Prisma.StripeCouponProductCreateInput[]>;
    pickForConnect(inputData: StripeCouponProduct): Pick<StripeCouponProduct, "id">;
    create(inputData?: Partial<Prisma.StripeCouponProductCreateInput>): PromiseLike<StripeCouponProduct>;
    createList(inputData: number | readonly Partial<Prisma.StripeCouponProductCreateInput>[]): PromiseLike<StripeCouponProduct[]>;
    createForConnect(inputData?: Partial<Prisma.StripeCouponProductCreateInput>): PromiseLike<Pick<StripeCouponProduct, "id">>;
}

function autoGenerateStripeCouponProductScalarsOrEnums({ seq }: {
    readonly seq: number;
}): StripeCouponProductScalarOrEnumFields {
    return {};
}

function defineStripeCouponProductFactoryInternal({ defaultData: defaultDataResolver }: StripeCouponProductFactoryDefineOptions): StripeCouponProductFactoryInterface {
    const seqKey = {};
    const getSeq = () => getSequenceCounter(seqKey);
    const screen = createScreener("StripeCouponProduct", modelFieldDefinitions);
    const build = async (inputData: Partial<Prisma.StripeCouponProductCreateInput> = {}) => {
        const seq = getSeq();
        const requiredScalarData = autoGenerateStripeCouponProductScalarsOrEnums({ seq });
        const resolveValue = normalizeResolver<StripeCouponProductFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
        const defaultData = await resolveValue({ seq });
        const defaultAssociations = {
            product: isStripeCouponProductproductFactory(defaultData.product) ? {
                create: await defaultData.product.build()
            } : defaultData.product,
            coupon: isStripeCouponProductcouponFactory(defaultData.coupon) ? {
                create: await defaultData.coupon.build()
            } : defaultData.coupon
        };
        const data: Prisma.StripeCouponProductCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
        return data;
    };
    const buildList = (inputData: number | readonly Partial<Prisma.StripeCouponProductCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
    const pickForConnect = (inputData: StripeCouponProduct) => ({
        id: inputData.id
    });
    const create = async (inputData: Partial<Prisma.StripeCouponProductCreateInput> = {}) => {
        const data = await build(inputData).then(screen);
        return await getClient<PrismaClient>().stripeCouponProduct.create({ data });
    };
    const createList = (inputData: number | readonly Partial<Prisma.StripeCouponProductCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
    const createForConnect = (inputData: Partial<Prisma.StripeCouponProductCreateInput> = {}) => create(inputData).then(pickForConnect);
    return {
        _factoryFor: "StripeCouponProduct" as const,
        build,
        buildList,
        buildCreateInput: build,
        pickForConnect,
        create,
        createList,
        createForConnect,
    };
}

/**
 * Define factory for {@link StripeCouponProduct} model.
 *
 * @param options
 * @returns factory {@link StripeCouponProductFactoryInterface}
 */
export function defineStripeCouponProductFactory(options: StripeCouponProductFactoryDefineOptions): StripeCouponProductFactoryInterface {
    return defineStripeCouponProductFactoryInternal(options);
}

type StripeCustomerScalarOrEnumFields = {
    userId: string;
};

type StripeCustomersubscriptionFactory = {
    _factoryFor: "StripeSubscription";
    build: () => PromiseLike<Prisma.StripeSubscriptionCreateNestedOneWithoutUserInput["create"]>;
};

type StripeCustomerFactoryDefineInput = {
    id?: string;
    userId?: string;
    customerId?: string | null;
    fullName?: string | null;
    avatarUrl?: string | null;
    billingAddress?: Prisma.NullableJsonNullValueInput | Prisma.InputJsonValue;
    paymentMethod?: Prisma.NullableJsonNullValueInput | Prisma.InputJsonValue;
    promotionCode?: Prisma.StripePromotionCodeCreateNestedManyWithoutUserInput;
    subscription?: StripeCustomersubscriptionFactory | Prisma.StripeSubscriptionCreateNestedOneWithoutUserInput;
};

type StripeCustomerFactoryDefineOptions = {
    defaultData?: Resolver<StripeCustomerFactoryDefineInput, BuildDataOptions>;
};

function isStripeCustomersubscriptionFactory(x: StripeCustomersubscriptionFactory | Prisma.StripeSubscriptionCreateNestedOneWithoutUserInput | undefined): x is StripeCustomersubscriptionFactory {
    return (x as any)?._factoryFor === "StripeSubscription";
}

export interface StripeCustomerFactoryInterface {
    readonly _factoryFor: "StripeCustomer";
    build(inputData?: Partial<Prisma.StripeCustomerCreateInput>): PromiseLike<Prisma.StripeCustomerCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.StripeCustomerCreateInput>): PromiseLike<Prisma.StripeCustomerCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.StripeCustomerCreateInput>[]): PromiseLike<Prisma.StripeCustomerCreateInput[]>;
    pickForConnect(inputData: StripeCustomer): Pick<StripeCustomer, "id">;
    create(inputData?: Partial<Prisma.StripeCustomerCreateInput>): PromiseLike<StripeCustomer>;
    createList(inputData: number | readonly Partial<Prisma.StripeCustomerCreateInput>[]): PromiseLike<StripeCustomer[]>;
    createForConnect(inputData?: Partial<Prisma.StripeCustomerCreateInput>): PromiseLike<Pick<StripeCustomer, "id">>;
}

function autoGenerateStripeCustomerScalarsOrEnums({ seq }: {
    readonly seq: number;
}): StripeCustomerScalarOrEnumFields {
    return {
        userId: getScalarFieldValueGenerator().String({ modelName: "StripeCustomer", fieldName: "userId", isId: false, isUnique: true, seq })
    };
}

function defineStripeCustomerFactoryInternal({ defaultData: defaultDataResolver }: StripeCustomerFactoryDefineOptions): StripeCustomerFactoryInterface {
    const seqKey = {};
    const getSeq = () => getSequenceCounter(seqKey);
    const screen = createScreener("StripeCustomer", modelFieldDefinitions);
    const build = async (inputData: Partial<Prisma.StripeCustomerCreateInput> = {}) => {
        const seq = getSeq();
        const requiredScalarData = autoGenerateStripeCustomerScalarsOrEnums({ seq });
        const resolveValue = normalizeResolver<StripeCustomerFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
        const defaultData = await resolveValue({ seq });
        const defaultAssociations = {
            subscription: isStripeCustomersubscriptionFactory(defaultData.subscription) ? {
                create: await defaultData.subscription.build()
            } : defaultData.subscription
        };
        const data: Prisma.StripeCustomerCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
        return data;
    };
    const buildList = (inputData: number | readonly Partial<Prisma.StripeCustomerCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
    const pickForConnect = (inputData: StripeCustomer) => ({
        id: inputData.id
    });
    const create = async (inputData: Partial<Prisma.StripeCustomerCreateInput> = {}) => {
        const data = await build(inputData).then(screen);
        return await getClient<PrismaClient>().stripeCustomer.create({ data });
    };
    const createList = (inputData: number | readonly Partial<Prisma.StripeCustomerCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
    const createForConnect = (inputData: Partial<Prisma.StripeCustomerCreateInput> = {}) => create(inputData).then(pickForConnect);
    return {
        _factoryFor: "StripeCustomer" as const,
        build,
        buildList,
        buildCreateInput: build,
        pickForConnect,
        create,
        createList,
        createForConnect,
    };
}

/**
 * Define factory for {@link StripeCustomer} model.
 *
 * @param options
 * @returns factory {@link StripeCustomerFactoryInterface}
 */
export function defineStripeCustomerFactory(options: StripeCustomerFactoryDefineOptions = {}): StripeCustomerFactoryInterface {
    return defineStripeCustomerFactoryInternal(options);
}

type StripePriceScalarOrEnumFields = {
    priceId: string;
};

type StripePriceproductFactory = {
    _factoryFor: "StripeProduct";
    build: () => PromiseLike<Prisma.StripeProductCreateNestedOneWithoutPriceInput["create"]>;
};

type StripePriceFactoryDefineInput = {
    id?: string;
    priceId?: string;
    active?: boolean | null;
    description?: string | null;
    unitAmount?: number | null;
    currency?: string | null;
    type?: StripePriceTypeEnum | null;
    pricingPlanInterval?: StripePriceIntervalEnum | null;
    intervalCount?: number | null;
    trialPeriodDays?: number | null;
    metadata?: Prisma.NullableJsonNullValueInput | Prisma.InputJsonValue;
    product?: StripePriceproductFactory | Prisma.StripeProductCreateNestedOneWithoutPriceInput;
    subscription?: Prisma.StripeSubscriptionCreateNestedManyWithoutPriceInput;
};

type StripePriceFactoryDefineOptions = {
    defaultData?: Resolver<StripePriceFactoryDefineInput, BuildDataOptions>;
};

function isStripePriceproductFactory(x: StripePriceproductFactory | Prisma.StripeProductCreateNestedOneWithoutPriceInput | undefined): x is StripePriceproductFactory {
    return (x as any)?._factoryFor === "StripeProduct";
}

export interface StripePriceFactoryInterface {
    readonly _factoryFor: "StripePrice";
    build(inputData?: Partial<Prisma.StripePriceCreateInput>): PromiseLike<Prisma.StripePriceCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.StripePriceCreateInput>): PromiseLike<Prisma.StripePriceCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.StripePriceCreateInput>[]): PromiseLike<Prisma.StripePriceCreateInput[]>;
    pickForConnect(inputData: StripePrice): Pick<StripePrice, "id">;
    create(inputData?: Partial<Prisma.StripePriceCreateInput>): PromiseLike<StripePrice>;
    createList(inputData: number | readonly Partial<Prisma.StripePriceCreateInput>[]): PromiseLike<StripePrice[]>;
    createForConnect(inputData?: Partial<Prisma.StripePriceCreateInput>): PromiseLike<Pick<StripePrice, "id">>;
}

function autoGenerateStripePriceScalarsOrEnums({ seq }: {
    readonly seq: number;
}): StripePriceScalarOrEnumFields {
    return {
        priceId: getScalarFieldValueGenerator().String({ modelName: "StripePrice", fieldName: "priceId", isId: false, isUnique: true, seq })
    };
}

function defineStripePriceFactoryInternal({ defaultData: defaultDataResolver }: StripePriceFactoryDefineOptions): StripePriceFactoryInterface {
    const seqKey = {};
    const getSeq = () => getSequenceCounter(seqKey);
    const screen = createScreener("StripePrice", modelFieldDefinitions);
    const build = async (inputData: Partial<Prisma.StripePriceCreateInput> = {}) => {
        const seq = getSeq();
        const requiredScalarData = autoGenerateStripePriceScalarsOrEnums({ seq });
        const resolveValue = normalizeResolver<StripePriceFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
        const defaultData = await resolveValue({ seq });
        const defaultAssociations = {
            product: isStripePriceproductFactory(defaultData.product) ? {
                create: await defaultData.product.build()
            } : defaultData.product
        };
        const data: Prisma.StripePriceCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
        return data;
    };
    const buildList = (inputData: number | readonly Partial<Prisma.StripePriceCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
    const pickForConnect = (inputData: StripePrice) => ({
        id: inputData.id
    });
    const create = async (inputData: Partial<Prisma.StripePriceCreateInput> = {}) => {
        const data = await build(inputData).then(screen);
        return await getClient<PrismaClient>().stripePrice.create({ data });
    };
    const createList = (inputData: number | readonly Partial<Prisma.StripePriceCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
    const createForConnect = (inputData: Partial<Prisma.StripePriceCreateInput> = {}) => create(inputData).then(pickForConnect);
    return {
        _factoryFor: "StripePrice" as const,
        build,
        buildList,
        buildCreateInput: build,
        pickForConnect,
        create,
        createList,
        createForConnect,
    };
}

/**
 * Define factory for {@link StripePrice} model.
 *
 * @param options
 * @returns factory {@link StripePriceFactoryInterface}
 */
export function defineStripePriceFactory(options: StripePriceFactoryDefineOptions = {}): StripePriceFactoryInterface {
    return defineStripePriceFactoryInternal(options);
}

type StripeProductScalarOrEnumFields = {
    productId: string;
};

type StripeProductFactoryDefineInput = {
    id?: string;
    productId?: string;
    active?: boolean | null;
    name?: string | null;
    description?: string | null;
    image?: string | null;
    metadata?: Prisma.NullableJsonNullValueInput | Prisma.InputJsonValue;
    coupons?: Prisma.StripeCouponProductCreateNestedManyWithoutProductInput;
    price?: Prisma.StripePriceCreateNestedManyWithoutProductInput;
};

type StripeProductFactoryDefineOptions = {
    defaultData?: Resolver<StripeProductFactoryDefineInput, BuildDataOptions>;
};

export interface StripeProductFactoryInterface {
    readonly _factoryFor: "StripeProduct";
    build(inputData?: Partial<Prisma.StripeProductCreateInput>): PromiseLike<Prisma.StripeProductCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.StripeProductCreateInput>): PromiseLike<Prisma.StripeProductCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.StripeProductCreateInput>[]): PromiseLike<Prisma.StripeProductCreateInput[]>;
    pickForConnect(inputData: StripeProduct): Pick<StripeProduct, "id">;
    create(inputData?: Partial<Prisma.StripeProductCreateInput>): PromiseLike<StripeProduct>;
    createList(inputData: number | readonly Partial<Prisma.StripeProductCreateInput>[]): PromiseLike<StripeProduct[]>;
    createForConnect(inputData?: Partial<Prisma.StripeProductCreateInput>): PromiseLike<Pick<StripeProduct, "id">>;
}

function autoGenerateStripeProductScalarsOrEnums({ seq }: {
    readonly seq: number;
}): StripeProductScalarOrEnumFields {
    return {
        productId: getScalarFieldValueGenerator().String({ modelName: "StripeProduct", fieldName: "productId", isId: false, isUnique: true, seq })
    };
}

function defineStripeProductFactoryInternal({ defaultData: defaultDataResolver }: StripeProductFactoryDefineOptions): StripeProductFactoryInterface {
    const seqKey = {};
    const getSeq = () => getSequenceCounter(seqKey);
    const screen = createScreener("StripeProduct", modelFieldDefinitions);
    const build = async (inputData: Partial<Prisma.StripeProductCreateInput> = {}) => {
        const seq = getSeq();
        const requiredScalarData = autoGenerateStripeProductScalarsOrEnums({ seq });
        const resolveValue = normalizeResolver<StripeProductFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
        const defaultData = await resolveValue({ seq });
        const defaultAssociations = {};
        const data: Prisma.StripeProductCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
        return data;
    };
    const buildList = (inputData: number | readonly Partial<Prisma.StripeProductCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
    const pickForConnect = (inputData: StripeProduct) => ({
        id: inputData.id
    });
    const create = async (inputData: Partial<Prisma.StripeProductCreateInput> = {}) => {
        const data = await build(inputData).then(screen);
        return await getClient<PrismaClient>().stripeProduct.create({ data });
    };
    const createList = (inputData: number | readonly Partial<Prisma.StripeProductCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
    const createForConnect = (inputData: Partial<Prisma.StripeProductCreateInput> = {}) => create(inputData).then(pickForConnect);
    return {
        _factoryFor: "StripeProduct" as const,
        build,
        buildList,
        buildCreateInput: build,
        pickForConnect,
        create,
        createList,
        createForConnect,
    };
}

/**
 * Define factory for {@link StripeProduct} model.
 *
 * @param options
 * @returns factory {@link StripeProductFactoryInterface}
 */
export function defineStripeProductFactory(options: StripeProductFactoryDefineOptions = {}): StripeProductFactoryInterface {
    return defineStripeProductFactoryInternal(options);
}

type StripePromotionCodeScalarOrEnumFields = {
    promotionCodeId: string;
    active: boolean;
    code: string;
};

type StripePromotionCodeuserFactory = {
    _factoryFor: "StripeCustomer";
    build: () => PromiseLike<Prisma.StripeCustomerCreateNestedOneWithoutPromotionCodeInput["create"]>;
};

type StripePromotionCodecouponFactory = {
    _factoryFor: "StripeCoupon";
    build: () => PromiseLike<Prisma.StripeCouponCreateNestedOneWithoutPromotionCodesInput["create"]>;
};

type StripePromotionCodeFactoryDefineInput = {
    id?: string;
    promotionCodeId?: string;
    active?: boolean;
    code?: string;
    maxRedemptions?: number | null;
    expires_at?: Date | null;
    user?: StripePromotionCodeuserFactory | Prisma.StripeCustomerCreateNestedOneWithoutPromotionCodeInput;
    coupon: StripePromotionCodecouponFactory | Prisma.StripeCouponCreateNestedOneWithoutPromotionCodesInput;
};

type StripePromotionCodeFactoryDefineOptions = {
    defaultData: Resolver<StripePromotionCodeFactoryDefineInput, BuildDataOptions>;
};

function isStripePromotionCodeuserFactory(x: StripePromotionCodeuserFactory | Prisma.StripeCustomerCreateNestedOneWithoutPromotionCodeInput | undefined): x is StripePromotionCodeuserFactory {
    return (x as any)?._factoryFor === "StripeCustomer";
}

function isStripePromotionCodecouponFactory(x: StripePromotionCodecouponFactory | Prisma.StripeCouponCreateNestedOneWithoutPromotionCodesInput | undefined): x is StripePromotionCodecouponFactory {
    return (x as any)?._factoryFor === "StripeCoupon";
}

export interface StripePromotionCodeFactoryInterface {
    readonly _factoryFor: "StripePromotionCode";
    build(inputData?: Partial<Prisma.StripePromotionCodeCreateInput>): PromiseLike<Prisma.StripePromotionCodeCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.StripePromotionCodeCreateInput>): PromiseLike<Prisma.StripePromotionCodeCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.StripePromotionCodeCreateInput>[]): PromiseLike<Prisma.StripePromotionCodeCreateInput[]>;
    pickForConnect(inputData: StripePromotionCode): Pick<StripePromotionCode, "id">;
    create(inputData?: Partial<Prisma.StripePromotionCodeCreateInput>): PromiseLike<StripePromotionCode>;
    createList(inputData: number | readonly Partial<Prisma.StripePromotionCodeCreateInput>[]): PromiseLike<StripePromotionCode[]>;
    createForConnect(inputData?: Partial<Prisma.StripePromotionCodeCreateInput>): PromiseLike<Pick<StripePromotionCode, "id">>;
}

function autoGenerateStripePromotionCodeScalarsOrEnums({ seq }: {
    readonly seq: number;
}): StripePromotionCodeScalarOrEnumFields {
    return {
        promotionCodeId: getScalarFieldValueGenerator().String({ modelName: "StripePromotionCode", fieldName: "promotionCodeId", isId: false, isUnique: true, seq }),
        active: getScalarFieldValueGenerator().Boolean({ modelName: "StripePromotionCode", fieldName: "active", isId: false, isUnique: false, seq }),
        code: getScalarFieldValueGenerator().String({ modelName: "StripePromotionCode", fieldName: "code", isId: false, isUnique: false, seq })
    };
}

function defineStripePromotionCodeFactoryInternal({ defaultData: defaultDataResolver }: StripePromotionCodeFactoryDefineOptions): StripePromotionCodeFactoryInterface {
    const seqKey = {};
    const getSeq = () => getSequenceCounter(seqKey);
    const screen = createScreener("StripePromotionCode", modelFieldDefinitions);
    const build = async (inputData: Partial<Prisma.StripePromotionCodeCreateInput> = {}) => {
        const seq = getSeq();
        const requiredScalarData = autoGenerateStripePromotionCodeScalarsOrEnums({ seq });
        const resolveValue = normalizeResolver<StripePromotionCodeFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
        const defaultData = await resolveValue({ seq });
        const defaultAssociations = {
            user: isStripePromotionCodeuserFactory(defaultData.user) ? {
                create: await defaultData.user.build()
            } : defaultData.user,
            coupon: isStripePromotionCodecouponFactory(defaultData.coupon) ? {
                create: await defaultData.coupon.build()
            } : defaultData.coupon
        };
        const data: Prisma.StripePromotionCodeCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
        return data;
    };
    const buildList = (inputData: number | readonly Partial<Prisma.StripePromotionCodeCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
    const pickForConnect = (inputData: StripePromotionCode) => ({
        id: inputData.id
    });
    const create = async (inputData: Partial<Prisma.StripePromotionCodeCreateInput> = {}) => {
        const data = await build(inputData).then(screen);
        return await getClient<PrismaClient>().stripePromotionCode.create({ data });
    };
    const createList = (inputData: number | readonly Partial<Prisma.StripePromotionCodeCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
    const createForConnect = (inputData: Partial<Prisma.StripePromotionCodeCreateInput> = {}) => create(inputData).then(pickForConnect);
    return {
        _factoryFor: "StripePromotionCode" as const,
        build,
        buildList,
        buildCreateInput: build,
        pickForConnect,
        create,
        createList,
        createForConnect,
    };
}

/**
 * Define factory for {@link StripePromotionCode} model.
 *
 * @param options
 * @returns factory {@link StripePromotionCodeFactoryInterface}
 */
export function defineStripePromotionCodeFactory(options: StripePromotionCodeFactoryDefineOptions): StripePromotionCodeFactoryInterface {
    return defineStripePromotionCodeFactoryInternal(options);
}

type StripeSubscriptionScalarOrEnumFields = {
    subscriptionId: string;
    created: Date;
    currentPeriodStart: Date;
    currentPeriodEnd: Date;
};

type StripeSubscriptionuserFactory = {
    _factoryFor: "StripeCustomer";
    build: () => PromiseLike<Prisma.StripeCustomerCreateNestedOneWithoutSubscriptionInput["create"]>;
};

type StripeSubscriptionpriceFactory = {
    _factoryFor: "StripePrice";
    build: () => PromiseLike<Prisma.StripePriceCreateNestedOneWithoutSubscriptionInput["create"]>;
};

type StripeSubscriptionFactoryDefineInput = {
    id?: string;
    subscriptionId?: string;
    subscriptionStatus?: StripeSubscriptionSatusEnum | null;
    metadata?: Prisma.NullableJsonNullValueInput | Prisma.InputJsonValue;
    quantity?: number | null;
    cancelAtPeriodEnd?: boolean | null;
    created?: Date;
    currentPeriodStart?: Date;
    currentPeriodEnd?: Date;
    endedAt?: Date | null;
    cancelAt?: Date | null;
    canceledAt?: Date | null;
    trialStart?: Date | null;
    trialEnd?: Date | null;
    user: StripeSubscriptionuserFactory | Prisma.StripeCustomerCreateNestedOneWithoutSubscriptionInput;
    price: StripeSubscriptionpriceFactory | Prisma.StripePriceCreateNestedOneWithoutSubscriptionInput;
};

type StripeSubscriptionFactoryDefineOptions = {
    defaultData: Resolver<StripeSubscriptionFactoryDefineInput, BuildDataOptions>;
};

function isStripeSubscriptionuserFactory(x: StripeSubscriptionuserFactory | Prisma.StripeCustomerCreateNestedOneWithoutSubscriptionInput | undefined): x is StripeSubscriptionuserFactory {
    return (x as any)?._factoryFor === "StripeCustomer";
}

function isStripeSubscriptionpriceFactory(x: StripeSubscriptionpriceFactory | Prisma.StripePriceCreateNestedOneWithoutSubscriptionInput | undefined): x is StripeSubscriptionpriceFactory {
    return (x as any)?._factoryFor === "StripePrice";
}

export interface StripeSubscriptionFactoryInterface {
    readonly _factoryFor: "StripeSubscription";
    build(inputData?: Partial<Prisma.StripeSubscriptionCreateInput>): PromiseLike<Prisma.StripeSubscriptionCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.StripeSubscriptionCreateInput>): PromiseLike<Prisma.StripeSubscriptionCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.StripeSubscriptionCreateInput>[]): PromiseLike<Prisma.StripeSubscriptionCreateInput[]>;
    pickForConnect(inputData: StripeSubscription): Pick<StripeSubscription, "userId">;
    create(inputData?: Partial<Prisma.StripeSubscriptionCreateInput>): PromiseLike<StripeSubscription>;
    createList(inputData: number | readonly Partial<Prisma.StripeSubscriptionCreateInput>[]): PromiseLike<StripeSubscription[]>;
    createForConnect(inputData?: Partial<Prisma.StripeSubscriptionCreateInput>): PromiseLike<Pick<StripeSubscription, "userId">>;
}

function autoGenerateStripeSubscriptionScalarsOrEnums({ seq }: {
    readonly seq: number;
}): StripeSubscriptionScalarOrEnumFields {
    return {
        subscriptionId: getScalarFieldValueGenerator().String({ modelName: "StripeSubscription", fieldName: "subscriptionId", isId: false, isUnique: true, seq }),
        created: getScalarFieldValueGenerator().DateTime({ modelName: "StripeSubscription", fieldName: "created", isId: false, isUnique: false, seq }),
        currentPeriodStart: getScalarFieldValueGenerator().DateTime({ modelName: "StripeSubscription", fieldName: "currentPeriodStart", isId: false, isUnique: false, seq }),
        currentPeriodEnd: getScalarFieldValueGenerator().DateTime({ modelName: "StripeSubscription", fieldName: "currentPeriodEnd", isId: false, isUnique: false, seq })
    };
}

function defineStripeSubscriptionFactoryInternal({ defaultData: defaultDataResolver }: StripeSubscriptionFactoryDefineOptions): StripeSubscriptionFactoryInterface {
    const seqKey = {};
    const getSeq = () => getSequenceCounter(seqKey);
    const screen = createScreener("StripeSubscription", modelFieldDefinitions);
    const build = async (inputData: Partial<Prisma.StripeSubscriptionCreateInput> = {}) => {
        const seq = getSeq();
        const requiredScalarData = autoGenerateStripeSubscriptionScalarsOrEnums({ seq });
        const resolveValue = normalizeResolver<StripeSubscriptionFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
        const defaultData = await resolveValue({ seq });
        const defaultAssociations = {
            user: isStripeSubscriptionuserFactory(defaultData.user) ? {
                create: await defaultData.user.build()
            } : defaultData.user,
            price: isStripeSubscriptionpriceFactory(defaultData.price) ? {
                create: await defaultData.price.build()
            } : defaultData.price
        };
        const data: Prisma.StripeSubscriptionCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
        return data;
    };
    const buildList = (inputData: number | readonly Partial<Prisma.StripeSubscriptionCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
    const pickForConnect = (inputData: StripeSubscription) => ({
        userId: inputData.userId
    });
    const create = async (inputData: Partial<Prisma.StripeSubscriptionCreateInput> = {}) => {
        const data = await build(inputData).then(screen);
        return await getClient<PrismaClient>().stripeSubscription.create({ data });
    };
    const createList = (inputData: number | readonly Partial<Prisma.StripeSubscriptionCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
    const createForConnect = (inputData: Partial<Prisma.StripeSubscriptionCreateInput> = {}) => create(inputData).then(pickForConnect);
    return {
        _factoryFor: "StripeSubscription" as const,
        build,
        buildList,
        buildCreateInput: build,
        pickForConnect,
        create,
        createList,
        createForConnect,
    };
}

/**
 * Define factory for {@link StripeSubscription} model.
 *
 * @param options
 * @returns factory {@link StripeSubscriptionFactoryInterface}
 */
export function defineStripeSubscriptionFactory(options: StripeSubscriptionFactoryDefineOptions): StripeSubscriptionFactoryInterface {
    return defineStripeSubscriptionFactoryInternal(options);
}
