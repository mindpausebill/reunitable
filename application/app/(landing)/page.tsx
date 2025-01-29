import characterImage2 from '/public/images/characters/2.svg';
import characterImage5 from '/public/images/characters/5.svg';
import homeImage from '/public/images/home.svg';
import { HomePageLayout } from '@/components/landing/HomePageLayout';
import Container from '@/components/shared/Container';
import Suitcase from '@/public/images/Suitcase.svg';
import Link from 'next/link';

const optionData = [
  {
    title: 'Get A Solution That Fits Your Life',
    content:
      "Forget the headaches of insurance claims and police reports - Reunitable brings simplicity back to your life. Whether it's your tech gear, cameras, passports, bicycle and sports gear, or trusty toolbox, attaching your unique, secure, personal QR code means the world is within your grasp."
  },
  {
    title: 'Why Choose Reunitable?',
    content:
      "We know the heartache of losing what's irreplaceable. That's why we're dedicated to connecting you with your belongings fast. It's about rekindling that warm feeling of having what's yours, yours once again."
  },
  {
    title: 'Trusted by the Experts',
    content:
      "Reunitable isn't just a solution; it's a cutting-edge tech marvel designed by experts who understand the value of your possessions. We're talking next-gen protection, because you deserve nothing less."
  },
  {
    title: 'The Ultimate Reunion Experience',
    content:
      "No more separation anxiety! Once your code is scanned, a secure chat, voice call, and even photo sharing channel springs to life. It's like your missing items are simply returning from their vacation."
  }
];

const callToActionOptionData = [
  {
    title: 'Affordable Peace of Mind',
    content:
      'All this protection comes at a fraction of a penny per item per day. A small investment for that priceless peace of mind.'
  },
  {
    title: 'Join the Movement',
    content:
      "Enough worrying - it's time to reunite with your valuables. Click below to embark on your Reunitable journey. Your prized possessions deserve nothing less than the best!"
  }
];

export default function Page() {
  return (
    <HomePageLayout
      heroTitle="Instantly recover your LOST ITEMS"
      heroContent="With our innovative secure QR labels, tags, and digital global platform, a finder can scan and swiftly return your belongings.  It's more than a code; its a revolution in peace of mind."
      primaryButtonText="How it works"
      primaryButtonLink="/how-it-works"
      secondaryButtonText="Buy Now"
      secondaryButtonLink="/buy-now"
      heroImage={Suitcase.src}
      heroImageTransform="hidden lg:block lg:bottom-0 lg:right-0"
      heroImageMaxWidth="max-w-md xl:max-w-xl"
    >
      <div className="bg-alpha-light-200">
        <Container className="flex flex-col gap-16 py-12">
          <section className="flex flex-col gap-12">
            <div className="flex flex-col items-center gap-12 md:flex-row">
              <div className="relative h-64 w-64 shrink-0 overflow-hidden rounded-full border-[6px] border-alpha-dark-600 bg-alpha-light-100 md:order-2">
                <img
                  className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-[60%] translate-y-40 scale-[350%]"
                  src={characterImage2.src}
                  alt=""
                />
              </div>
              <div className="flex flex-col gap-4 lg:gap-6">
                <h2 className="-mb-3 font-heading text-3xl font-bold leading-heading text-alpha-dark-600 lg:text-4xl">
                  The heart stopping moment:
                </h2>
                <p>
                  You know the one - your beloved iPhone goes missing. The sinking panic as vacation passports vanish,
                  or we lose our most precious items, items we rely on daily. Then for some there's worse, the
                  frustration of a stolen laptop packed with confidential data And don't even get us started on tools
                  disappearing from your worksite, garden or van.. We've all been there, and it's a gut-wrenching
                  experience.
                </p>
                <p>
                  This year alone, Brits will spend a staggering <strong>£2 billion</strong> replacing lost possessions!
                  And businesses like the NHS will write off millions more in lost equipment.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-12 md:flex-row">
              <div className="relative h-64 w-64 shrink-0 overflow-hidden rounded-full border-[6px] border-alpha-dark-600 bg-alpha-light-100 ">
                <img
                  className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-[40%] translate-y-48 scale-[350%]"
                  src={characterImage5.src}
                  alt=""
                />
              </div>
              <div className="flex flex-col gap-4 lg:gap-6">
                <h2 className="-mb-3 font-heading text-3xl font-bold leading-heading text-alpha-dark-600 lg:text-4xl">
                  Safeguard Your World with Reunitable:
                </h2>
                <p>
                  Enter Reunitable, your ultimate safeguard against the unexpected. It's not just about gadgets; it's
                  about preserving those cherished belongings you can't imagine life without. Our revolutionary global
                  service hinges on a ultra-secure communications system, a clever app, and unique personal QR codes
                  that work magic. All reuniting you with your valuables no matter where they've wandered off.
                </p>
              </div>
            </div>
          </section>
        </Container>
      </div>

      <div className="bg-alpha-light-100">
        <Container className="flex flex-col gap-16 py-12">
          <section className="grid grid-cols-1 gap-12 md:grid-cols-2">
            {optionData.map((option) => {
              return (
                <div className="flex flex-col gap-6">
                  <h2 className="-mb-3 font-heading text-3xl font-bold leading-heading text-alpha-dark-600 lg:text-4xl">
                    {option.title}
                  </h2>
                  <p>{option.content}</p>
                </div>
              );
            })}
          </section>
        </Container>
      </div>

      <div className="bg-alpha-light-200 ">
        <Container className="flex flex-col gap-16 overflow-hidden py-12 ">
          <section className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div className="flex flex-col gap-12">
              {callToActionOptionData.map((option) => {
                return (
                  <div className="flex flex-col gap-6">
                    <h2 className="-mb-3 font-heading text-3xl font-bold leading-heading text-alpha-dark-600 lg:text-4xl">
                      {option.title}
                    </h2>
                    <p>{option.content}</p>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-center">
              <Link
                href="/buy-now"
                className="rounded-full bg-bravo px-16 py-8 font-heading text-2xl leading-heading text-white"
              >
                I'm ready- let's do it
              </Link>
            </div>
          </section>
        </Container>
      </div>
    </HomePageLayout>
  );
}
