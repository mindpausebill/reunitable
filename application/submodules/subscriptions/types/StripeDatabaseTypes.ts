import { Database } from '@/types/supabase';

//public tables
export type StripeCustomer = Database['public']['Tables']['StripeCustomer']['Row'];
export type StripePrice = Database['public']['Tables']['StripePrice']['Row'];
export type StripeProduct = Database['public']['Tables']['StripeProduct']['Row'];
export type StripeSubscription = Database['public']['Tables']['StripeSubscription']['Row'];
export type StripeCoupon = Database['public']['Tables']['StripeCoupon']['Row'];
export type StripeCouponProduct = Database['public']['Tables']['StripeCouponProduct']['Row'];
export type StripePromotionCode = Database['public']['Tables']['StripePromotionCode']['Row'];

//public enums
export type StripeSubscriptionStatus = Database['public']['Enums']['StripeSubscriptionSatusEnum'];
export type StripePriceInterval = Database['public']['Enums']['StripePriceIntervalEnum'];
