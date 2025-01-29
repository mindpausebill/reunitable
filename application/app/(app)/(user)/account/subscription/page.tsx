import ContentBox from '@/components/shared/ContentBox';
import { ManageSubscriptionPage } from '@/components/subscription/ManageSubscriptionPage';
import { useServerActiveProductsWithPrices } from '@/submodules/subscriptions/lib/front-end/useServerActiveProductsWithPrices';
import { useServerSubscriptionsWithPricesAndProducts } from '@/submodules/subscriptions/lib/front-end/useServerSubscriptionsWithPricesAndProducts';
import { StripeSubscriptionWithPricesAndProducts } from '@/submodules/subscriptions/types/StripeSubscriptionWithPrices';
import { useServerSessionUser } from '@/submodules/supabase-functions/auth/getServerSessionUser';
import { signInWithRedirect } from '@/submodules/supabase-functions/auth/signInWithRedirect';

const Subscription = () => {
  const products = useServerActiveProductsWithPrices();
  const user = useServerSessionUser();
  if (!user) return signInWithRedirect(`/account/subscription`);

  const { data: subscription } = useServerSubscriptionsWithPricesAndProducts(user);

  return (
    <ContentBox className="w-full">
      <ManageSubscriptionPage
        products={products ?? []}
        userId={user.id}
        subscription={subscription as StripeSubscriptionWithPricesAndProducts}
      />
    </ContentBox>
  );
};

export default Subscription;
