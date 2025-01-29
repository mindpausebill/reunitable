import characterImage5 from '/public/images/characters/5.svg';
import Container from '@/components/shared/Container';
import ReunitableLogo from '@/components/shared/Reunitable-logo';
import Link from 'next/link';

const OrderCompleted = () => {
  return (
    <div className="flex flex-col gap-12 pb-12">
      <div className="relative flex items-center bg-alpha-dark-600 pt-6 pb-48">
        <div className="absolute inset-0 bg-gradient-to-br from-alpha to-alpha/0"></div>
        <Container className="flex items-center justify-center gap-6">
          <ReunitableLogo className="max-h-[2rem] translate-y-1 lg:max-h-[3rem]" />
        </Container>
      </div>
      <Container maxWidth="max-w-4xl" className="-mt-48 flex flex-col items-center gap-6">
        <div className="relative h-64 w-64 shrink-0 overflow-hidden rounded-full border-[6px] border-alpha-dark-600 bg-alpha-light-100 ">
          <img
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-[40%] translate-y-48 scale-[350%]"
            src={characterImage5.src}
            alt=""
          />
        </div>
        <div className="flex flex-col items-center gap-3 text-center">
          <h1 className="font-heading text-4xl font-bold leading-tight text-alpha-dark-600">
            Thank you for your purchase!
          </h1>
          <p className="text-lg">Please see your email for a link to sign-in and finish up the setup process.</p>
        </div>
        <Link className="underline" href="/">
          Back to homepage
        </Link>
      </Container>
    </div>
  );
};

export default OrderCompleted;
