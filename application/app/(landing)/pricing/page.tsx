import { BasicPageLayout } from '@/components/landing/BasicPageLayout';
import Container from '@/components/shared/Container';
import Link from 'next/link';

export default function Page() {
  return (
    <BasicPageLayout
      heroTitle="Pricing"
      heroContent="Protect your important and loved possessions for less than half a pence per day per item."
      contentMaxWidth="max-w-4xl"
      additionalContent={
        <Container className="pb-12">
          <div className="flex items-center">
            <Link
              href="/buy-now"
              className="rounded-full bg-bravo px-16 py-8 font-heading text-2xl leading-heading text-white"
            >
              I'm ready - let's do it
            </Link>
          </div>
        </Container>
      }
    >
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1 font-heading font-bold leading-heading">
            <h2 className="text-3xl lg:text-5xl">Registration</h2>
            <h3 className="lg:text-2xl">Initial fee: £19.90</h3>
          </div>
          <p>
            Provides secure personal registration on the Reunitable global platform for the subscriber and one alternate
            nominee. Plus the supply of 20 personal QR codes in both label, card and tag formats.
          </p>
        </div>

        <hr className="border-alpha-light-200" />

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1 font-heading font-bold leading-heading">
            <h2 className="text-3xl lg:text-5xl">Subscription</h2>
            <div className="flex items-center gap-3">
              <h3 className="lg:text-2xl">Monthly fee: £2.90</h3>
              &middot;
              <h3 className="lg:text-2xl">Annual fee: £24.40</h3>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <p>
              Provides 24/7 access to Reunitable's secure global communications platform, which is used to communicate
              between finders and owners and to reunite owners with their lost possessions.
            </p>
            <p>30% discount of 12 monthly payments</p>
          </div>
        </div>
      </div>
    </BasicPageLayout>
  );
}
