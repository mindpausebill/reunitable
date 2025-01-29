import ContentBox from '@/components/shared/ContentBox';
import { OrderMoreTags } from '@/components/subscription/OrderMoreTags';
import { useServerActiveProductsWithPrices } from '@/submodules/subscriptions/lib/front-end/useServerActiveProductsWithPrices';
import { useServerSessionUser } from '@/submodules/supabase-functions/auth/getServerSessionUser';
import { signInWithRedirect } from '@/submodules/supabase-functions/auth/signInWithRedirect';

const Order = () => {
  const user = useServerSessionUser();
  const products = useServerActiveProductsWithPrices();
  if (!user) return signInWithRedirect(`/my-account`);

  return (
    <>
      <ContentBox>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <h2 className="font-heading text-2xl text-alpha-dark-600">Order More Tags</h2>
            <hr />
          </div>

          <OrderMoreTags user={user} products={products ?? []} />
        </div>
      </ContentBox>
    </>
  );
};

export default Order;
