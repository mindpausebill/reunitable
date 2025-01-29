import { BasicPageLayout } from '@/components/landing/BasicPageLayout';
import { OrderSetupForm } from '@/components/register-flow/OrderSetupForm';
import Container from '@/components/shared/Container';
import { useServerActiveProductsWithPrices } from '@/submodules/subscriptions/lib/front-end/useServerActiveProductsWithPrices';

const Order = () => {
  const products = useServerActiveProductsWithPrices();

  return (
    <BasicPageLayout
      heroTitle="Buy Now"
      heroContent={
        <>
          We&apos;re delighted you&apos;re going to be using <strong className="text-white">reunitable</strong> to start
          protecting your valuables and retrieving your lost possessions.
        </>
      }
      maxWidth="max-w-5xl"
      useOwnContainers={true}
    >
      <Container className="-mt-40" maxWidth="max-w-5xl">
        <OrderSetupForm products={products ?? []} />
      </Container>
    </BasicPageLayout>
  );
};

export default Order;
