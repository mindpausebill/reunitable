export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  access: {
    Tables: {
      Organisation: {
        Row: {
          createdAt: string | null;
          createdById: string | null;
          id: string;
          modifiedAt: string | null;
          modifiedById: string | null;
          name: string;
          parentId: string | null;
        };
        Insert: {
          createdAt?: string | null;
          createdById?: string | null;
          id?: string;
          modifiedAt?: string | null;
          modifiedById?: string | null;
          name: string;
          parentId?: string | null;
        };
        Update: {
          createdAt?: string | null;
          createdById?: string | null;
          id?: string;
          modifiedAt?: string | null;
          modifiedById?: string | null;
          name?: string;
          parentId?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'Organisation_createdById_fkey';
            columns: ['createdById'];
            referencedRelation: 'User';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'Organisation_modifiedById_fkey';
            columns: ['modifiedById'];
            referencedRelation: 'User';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'Organisation_parentId_fkey';
            columns: ['parentId'];
            referencedRelation: 'Organisation';
            referencedColumns: ['id'];
          }
        ];
      };
      Permission: {
        Row: {
          createdAt: string | null;
          createdById: string | null;
          id: string;
          modifiedAt: string | null;
          modifiedById: string | null;
          name: string;
        };
        Insert: {
          createdAt?: string | null;
          createdById?: string | null;
          id?: string;
          modifiedAt?: string | null;
          modifiedById?: string | null;
          name: string;
        };
        Update: {
          createdAt?: string | null;
          createdById?: string | null;
          id?: string;
          modifiedAt?: string | null;
          modifiedById?: string | null;
          name?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'Permission_createdById_fkey';
            columns: ['createdById'];
            referencedRelation: 'User';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'Permission_modifiedById_fkey';
            columns: ['modifiedById'];
            referencedRelation: 'User';
            referencedColumns: ['id'];
          }
        ];
      };
      Role: {
        Row: {
          createdAt: string | null;
          createdById: string | null;
          id: string;
          modifiedAt: string | null;
          modifiedById: string | null;
          name: string;
        };
        Insert: {
          createdAt?: string | null;
          createdById?: string | null;
          id?: string;
          modifiedAt?: string | null;
          modifiedById?: string | null;
          name: string;
        };
        Update: {
          createdAt?: string | null;
          createdById?: string | null;
          id?: string;
          modifiedAt?: string | null;
          modifiedById?: string | null;
          name?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'Role_createdById_fkey';
            columns: ['createdById'];
            referencedRelation: 'User';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'Role_modifiedById_fkey';
            columns: ['modifiedById'];
            referencedRelation: 'User';
            referencedColumns: ['id'];
          }
        ];
      };
      RolePermission: {
        Row: {
          createdAt: string | null;
          createdById: string | null;
          id: string;
          modifiedAt: string | null;
          modifiedById: string | null;
          permissionId: string;
          roleId: string;
        };
        Insert: {
          createdAt?: string | null;
          createdById?: string | null;
          id?: string;
          modifiedAt?: string | null;
          modifiedById?: string | null;
          permissionId: string;
          roleId: string;
        };
        Update: {
          createdAt?: string | null;
          createdById?: string | null;
          id?: string;
          modifiedAt?: string | null;
          modifiedById?: string | null;
          permissionId?: string;
          roleId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'RolePermission_createdById_fkey';
            columns: ['createdById'];
            referencedRelation: 'User';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'RolePermission_modifiedById_fkey';
            columns: ['modifiedById'];
            referencedRelation: 'User';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'RolePermission_permissionId_fkey';
            columns: ['permissionId'];
            referencedRelation: 'Permission';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'RolePermission_roleId_fkey';
            columns: ['roleId'];
            referencedRelation: 'Role';
            referencedColumns: ['id'];
          }
        ];
      };
      User: {
        Row: {
          email: string;
          firstName: string | null;
          id: string;
          lastName: string | null;
          metadata: Json | null;
          phone: string | null;
        };
        Insert: {
          email: string;
          firstName?: string | null;
          id?: string;
          lastName?: string | null;
          metadata?: Json | null;
          phone?: string | null;
        };
        Update: {
          email?: string;
          firstName?: string | null;
          id?: string;
          lastName?: string | null;
          metadata?: Json | null;
          phone?: string | null;
        };
        Relationships: [];
      };
      UserOrganisation: {
        Row: {
          createdAt: string | null;
          createdById: string | null;
          id: string;
          modifiedAt: string | null;
          modifiedById: string | null;
          organisationId: string;
          userId: string;
        };
        Insert: {
          createdAt?: string | null;
          createdById?: string | null;
          id?: string;
          modifiedAt?: string | null;
          modifiedById?: string | null;
          organisationId: string;
          userId: string;
        };
        Update: {
          createdAt?: string | null;
          createdById?: string | null;
          id?: string;
          modifiedAt?: string | null;
          modifiedById?: string | null;
          organisationId?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'UserOrganisation_createdById_fkey';
            columns: ['createdById'];
            referencedRelation: 'User';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'UserOrganisation_modifiedById_fkey';
            columns: ['modifiedById'];
            referencedRelation: 'User';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'UserOrganisation_organisationId_fkey';
            columns: ['organisationId'];
            referencedRelation: 'Organisation';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'UserOrganisation_userId_fkey';
            columns: ['userId'];
            referencedRelation: 'User';
            referencedColumns: ['id'];
          }
        ];
      };
      UserOrganisationRole: {
        Row: {
          createdAt: string | null;
          createdById: string | null;
          id: string;
          modifiedAt: string | null;
          modifiedById: string | null;
          roleId: string;
          userOrganisationId: string;
        };
        Insert: {
          createdAt?: string | null;
          createdById?: string | null;
          id?: string;
          modifiedAt?: string | null;
          modifiedById?: string | null;
          roleId: string;
          userOrganisationId: string;
        };
        Update: {
          createdAt?: string | null;
          createdById?: string | null;
          id?: string;
          modifiedAt?: string | null;
          modifiedById?: string | null;
          roleId?: string;
          userOrganisationId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'UserOrganisationRole_createdById_fkey';
            columns: ['createdById'];
            referencedRelation: 'User';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'UserOrganisationRole_modifiedById_fkey';
            columns: ['modifiedById'];
            referencedRelation: 'User';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'UserOrganisationRole_roleId_fkey';
            columns: ['roleId'];
            referencedRelation: 'Role';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'UserOrganisationRole_userOrganisationId_fkey';
            columns: ['userOrganisationId'];
            referencedRelation: 'UserOrganisation';
            referencedColumns: ['id'];
          }
        ];
      };
      UserRole: {
        Row: {
          createdAt: string | null;
          createdById: string | null;
          id: string;
          modifiedAt: string | null;
          modifiedById: string | null;
          roleId: string;
          userId: string;
        };
        Insert: {
          createdAt?: string | null;
          createdById?: string | null;
          id?: string;
          modifiedAt?: string | null;
          modifiedById?: string | null;
          roleId: string;
          userId: string;
        };
        Update: {
          createdAt?: string | null;
          createdById?: string | null;
          id?: string;
          modifiedAt?: string | null;
          modifiedById?: string | null;
          roleId?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'UserRole_createdById_fkey';
            columns: ['createdById'];
            referencedRelation: 'User';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'UserRole_modifiedById_fkey';
            columns: ['modifiedById'];
            referencedRelation: 'User';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'UserRole_roleId_fkey';
            columns: ['roleId'];
            referencedRelation: 'Role';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'UserRole_userId_fkey';
            columns: ['userId'];
            referencedRelation: 'User';
            referencedColumns: ['id'];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_access_claim: {
        Args: {
          uid: string;
        };
        Returns: Json;
      };
      get_access_claim_global: {
        Args: {
          uid: string;
        };
        Returns: Json;
      };
      get_access_claim_org: {
        Args: {
          uid: string;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      _prisma_migrations: {
        Row: {
          applied_steps_count: number;
          checksum: string;
          finished_at: string | null;
          id: string;
          logs: string | null;
          migration_name: string;
          rolled_back_at: string | null;
          started_at: string;
        };
        Insert: {
          applied_steps_count?: number;
          checksum: string;
          finished_at?: string | null;
          id: string;
          logs?: string | null;
          migration_name: string;
          rolled_back_at?: string | null;
          started_at?: string;
        };
        Update: {
          applied_steps_count?: number;
          checksum?: string;
          finished_at?: string | null;
          id?: string;
          logs?: string | null;
          migration_name?: string;
          rolled_back_at?: string | null;
          started_at?: string;
        };
        Relationships: [];
      };
      Conversation: {
        Row: {
          createdAt: string | null;
          createdById: string | null;
          id: string;
          latitude: number | null;
          location: Json | null;
          longitude: number | null;
          modifiedAt: string | null;
          modifiedById: string | null;
          organisationId: string;
          responseStatus: Database['public']['Enums']['ConversationNotificationStatus'];
          samaritanId: string;
        };
        Insert: {
          createdAt?: string | null;
          createdById?: string | null;
          id?: string;
          latitude?: number | null;
          location?: Json | null;
          longitude?: number | null;
          modifiedAt?: string | null;
          modifiedById?: string | null;
          organisationId: string;
          responseStatus?: Database['public']['Enums']['ConversationNotificationStatus'];
          samaritanId: string;
        };
        Update: {
          createdAt?: string | null;
          createdById?: string | null;
          id?: string;
          latitude?: number | null;
          location?: Json | null;
          longitude?: number | null;
          modifiedAt?: string | null;
          modifiedById?: string | null;
          organisationId?: string;
          responseStatus?: Database['public']['Enums']['ConversationNotificationStatus'];
          samaritanId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'Conversation_createdById_fkey';
            columns: ['createdById'];
            referencedRelation: 'User';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'Conversation_modifiedById_fkey';
            columns: ['modifiedById'];
            referencedRelation: 'User';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'Conversation_organisationId_fkey';
            columns: ['organisationId'];
            referencedRelation: 'Organisation';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'Conversation_samaritanId_fkey';
            columns: ['samaritanId'];
            referencedRelation: 'Samaritan';
            referencedColumns: ['id'];
          }
        ];
      };
      Message: {
        Row: {
          conversationId: string;
          createdAt: string | null;
          createdById: string | null;
          fromSamaritan: boolean;
          id: string;
          latitude: number | null;
          location: Json | null;
          longitude: number | null;
          message: string;
          modifiedAt: string | null;
          modifiedById: string | null;
          photo: Json | null;
          read: boolean;
        };
        Insert: {
          conversationId: string;
          createdAt?: string | null;
          createdById?: string | null;
          fromSamaritan: boolean;
          id?: string;
          latitude?: number | null;
          location?: Json | null;
          longitude?: number | null;
          message: string;
          modifiedAt?: string | null;
          modifiedById?: string | null;
          photo?: Json | null;
          read: boolean;
        };
        Update: {
          conversationId?: string;
          createdAt?: string | null;
          createdById?: string | null;
          fromSamaritan?: boolean;
          id?: string;
          latitude?: number | null;
          location?: Json | null;
          longitude?: number | null;
          message?: string;
          modifiedAt?: string | null;
          modifiedById?: string | null;
          photo?: Json | null;
          read?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: 'Message_conversationId_fkey';
            columns: ['conversationId'];
            referencedRelation: 'Conversation';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'Message_createdById_fkey';
            columns: ['createdById'];
            referencedRelation: 'User';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'Message_modifiedById_fkey';
            columns: ['modifiedById'];
            referencedRelation: 'User';
            referencedColumns: ['id'];
          }
        ];
      };
      Samaritan: {
        Row: {
          createdAt: string | null;
          createdById: string | null;
          email: string | null;
          id: string;
          modifiedAt: string | null;
          modifiedById: string | null;
          name: string;
          phone: string | null;
        };
        Insert: {
          createdAt?: string | null;
          createdById?: string | null;
          email?: string | null;
          id?: string;
          modifiedAt?: string | null;
          modifiedById?: string | null;
          name: string;
          phone?: string | null;
        };
        Update: {
          createdAt?: string | null;
          createdById?: string | null;
          email?: string | null;
          id?: string;
          modifiedAt?: string | null;
          modifiedById?: string | null;
          name?: string;
          phone?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'Samaritan_createdById_fkey';
            columns: ['createdById'];
            referencedRelation: 'User';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'Samaritan_modifiedById_fkey';
            columns: ['modifiedById'];
            referencedRelation: 'User';
            referencedColumns: ['id'];
          }
        ];
      };
      Setting: {
        Row: {
          id: string;
          key: string;
          value: Json;
        };
        Insert: {
          id?: string;
          key: string;
          value: Json;
        };
        Update: {
          id?: string;
          key?: string;
          value?: Json;
        };
        Relationships: [];
      };
      StripeCoupon: {
        Row: {
          amountOff: number | null;
          couponId: string;
          currency: string | null;
          duration: Database['public']['Enums']['StripeCouponDurationEnum'];
          duration_in_months: number | null;
          id: string;
          name: string | null;
          percentOff: number | null;
        };
        Insert: {
          amountOff?: number | null;
          couponId: string;
          currency?: string | null;
          duration: Database['public']['Enums']['StripeCouponDurationEnum'];
          duration_in_months?: number | null;
          id?: string;
          name?: string | null;
          percentOff?: number | null;
        };
        Update: {
          amountOff?: number | null;
          couponId?: string;
          currency?: string | null;
          duration?: Database['public']['Enums']['StripeCouponDurationEnum'];
          duration_in_months?: number | null;
          id?: string;
          name?: string | null;
          percentOff?: number | null;
        };
        Relationships: [];
      };
      StripeCouponProduct: {
        Row: {
          couponId: string;
          id: string;
          productId: string;
        };
        Insert: {
          couponId: string;
          id?: string;
          productId: string;
        };
        Update: {
          couponId?: string;
          id?: string;
          productId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'StripeCouponProduct_couponId_fkey';
            columns: ['couponId'];
            referencedRelation: 'StripeCoupon';
            referencedColumns: ['couponId'];
          },
          {
            foreignKeyName: 'StripeCouponProduct_productId_fkey';
            columns: ['productId'];
            referencedRelation: 'StripeProduct';
            referencedColumns: ['productId'];
          }
        ];
      };
      StripeCustomer: {
        Row: {
          avatarUrl: string | null;
          billingAddress: Json | null;
          customerId: string | null;
          fullName: string | null;
          id: string;
          paymentMethod: Json | null;
          userId: string;
        };
        Insert: {
          avatarUrl?: string | null;
          billingAddress?: Json | null;
          customerId?: string | null;
          fullName?: string | null;
          id?: string;
          paymentMethod?: Json | null;
          userId: string;
        };
        Update: {
          avatarUrl?: string | null;
          billingAddress?: Json | null;
          customerId?: string | null;
          fullName?: string | null;
          id?: string;
          paymentMethod?: Json | null;
          userId?: string;
        };
        Relationships: [];
      };
      StripePrice: {
        Row: {
          active: boolean | null;
          currency: string | null;
          description: string | null;
          id: string;
          intervalCount: number | null;
          metadata: Json | null;
          priceId: string;
          pricingPlanInterval: Database['public']['Enums']['StripePriceIntervalEnum'] | null;
          productId: string | null;
          trialPeriodDays: number | null;
          type: Database['public']['Enums']['StripePriceTypeEnum'] | null;
          unitAmount: number | null;
        };
        Insert: {
          active?: boolean | null;
          currency?: string | null;
          description?: string | null;
          id?: string;
          intervalCount?: number | null;
          metadata?: Json | null;
          priceId: string;
          pricingPlanInterval?: Database['public']['Enums']['StripePriceIntervalEnum'] | null;
          productId?: string | null;
          trialPeriodDays?: number | null;
          type?: Database['public']['Enums']['StripePriceTypeEnum'] | null;
          unitAmount?: number | null;
        };
        Update: {
          active?: boolean | null;
          currency?: string | null;
          description?: string | null;
          id?: string;
          intervalCount?: number | null;
          metadata?: Json | null;
          priceId?: string;
          pricingPlanInterval?: Database['public']['Enums']['StripePriceIntervalEnum'] | null;
          productId?: string | null;
          trialPeriodDays?: number | null;
          type?: Database['public']['Enums']['StripePriceTypeEnum'] | null;
          unitAmount?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'StripePrice_productId_fkey';
            columns: ['productId'];
            referencedRelation: 'StripeProduct';
            referencedColumns: ['productId'];
          }
        ];
      };
      StripeProduct: {
        Row: {
          active: boolean | null;
          description: string | null;
          id: string;
          image: string | null;
          metadata: Json | null;
          name: string | null;
          productId: string;
        };
        Insert: {
          active?: boolean | null;
          description?: string | null;
          id?: string;
          image?: string | null;
          metadata?: Json | null;
          name?: string | null;
          productId: string;
        };
        Update: {
          active?: boolean | null;
          description?: string | null;
          id?: string;
          image?: string | null;
          metadata?: Json | null;
          name?: string | null;
          productId?: string;
        };
        Relationships: [];
      };
      StripePromotionCode: {
        Row: {
          active: boolean;
          code: string;
          couponId: string;
          expires_at: string | null;
          id: string;
          maxRedemptions: number | null;
          promotionCodeId: string;
          userId: string | null;
        };
        Insert: {
          active: boolean;
          code: string;
          couponId: string;
          expires_at?: string | null;
          id?: string;
          maxRedemptions?: number | null;
          promotionCodeId: string;
          userId?: string | null;
        };
        Update: {
          active?: boolean;
          code?: string;
          couponId?: string;
          expires_at?: string | null;
          id?: string;
          maxRedemptions?: number | null;
          promotionCodeId?: string;
          userId?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'StripePromotionCode_couponId_fkey';
            columns: ['couponId'];
            referencedRelation: 'StripeCoupon';
            referencedColumns: ['couponId'];
          },
          {
            foreignKeyName: 'StripePromotionCode_userId_fkey';
            columns: ['userId'];
            referencedRelation: 'StripeCustomer';
            referencedColumns: ['userId'];
          }
        ];
      };
      StripeSubscription: {
        Row: {
          cancelAt: string | null;
          cancelAtPeriodEnd: boolean | null;
          canceledAt: string | null;
          created: string;
          currentPeriodEnd: string;
          currentPeriodStart: string;
          endedAt: string | null;
          id: string;
          metadata: Json | null;
          priceId: string;
          quantity: number | null;
          subscriptionId: string;
          subscriptionStatus: Database['public']['Enums']['StripeSubscriptionSatusEnum'] | null;
          trialEnd: string | null;
          trialStart: string | null;
          userId: string;
        };
        Insert: {
          cancelAt?: string | null;
          cancelAtPeriodEnd?: boolean | null;
          canceledAt?: string | null;
          created: string;
          currentPeriodEnd: string;
          currentPeriodStart: string;
          endedAt?: string | null;
          id?: string;
          metadata?: Json | null;
          priceId: string;
          quantity?: number | null;
          subscriptionId: string;
          subscriptionStatus?: Database['public']['Enums']['StripeSubscriptionSatusEnum'] | null;
          trialEnd?: string | null;
          trialStart?: string | null;
          userId: string;
        };
        Update: {
          cancelAt?: string | null;
          cancelAtPeriodEnd?: boolean | null;
          canceledAt?: string | null;
          created?: string;
          currentPeriodEnd?: string;
          currentPeriodStart?: string;
          endedAt?: string | null;
          id?: string;
          metadata?: Json | null;
          priceId?: string;
          quantity?: number | null;
          subscriptionId?: string;
          subscriptionStatus?: Database['public']['Enums']['StripeSubscriptionSatusEnum'] | null;
          trialEnd?: string | null;
          trialStart?: string | null;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'StripeSubscription_priceId_fkey';
            columns: ['priceId'];
            referencedRelation: 'StripePrice';
            referencedColumns: ['priceId'];
          },
          {
            foreignKeyName: 'StripeSubscription_userId_fkey';
            columns: ['userId'];
            referencedRelation: 'StripeCustomer';
            referencedColumns: ['userId'];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      fetchCouponDiscountProducts: {
        Args: {
          couponIdToRetrieve: string;
        };
        Returns: {
          productId: string;
        }[];
      };
      fetchCouponIdByCode: {
        Args: {
          codeToRetrieve: string;
        };
        Returns: {
          code: string;
          couponId: string;
        }[];
      };
      fetchDiscountByCouponId: {
        Args: {
          couponIdToFetch: string;
        };
        Returns: {
          amountOff: number;
          percentOff: number;
        }[];
      };
      get_current_server_time: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      get_enums: {
        Args: Record<PropertyKey, never>;
        Returns: {
          enumlabel: string;
          typname: string;
          table_schema: string;
          table_name: string;
          column_name: string;
        }[];
      };
      get_schema_data: {
        Args: Record<PropertyKey, never>;
        Returns: {
          constraint_name: string;
          constraint_type: string;
          self_schema: string;
          self_table: string;
          self_columns: string;
          foreign_schema: string;
          foreign_table: string;
          foreign_columns: string;
          definition: string;
        }[];
      };
    };
    Enums: {
      ConversationNotificationStatus: 'primaryUserNotified' | 'secondaryUserNotified' | 'conversationSeen';
      StripeCouponDurationEnum: 'forever' | 'once' | 'repeating';
      StripePriceIntervalEnum: 'day' | 'week' | 'month' | 'year';
      StripePriceTypeEnum: 'one_time' | 'recurring';
      StripeSubscriptionSatusEnum:
        | 'active'
        | 'trialing'
        | 'canceled'
        | 'incomplete'
        | 'incomplete_expired'
        | 'past_due'
        | 'unpaid'
        | 'paused';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
