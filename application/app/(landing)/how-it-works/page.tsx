import { HomePageLayout } from '@/components/landing/HomePageLayout';
import Container from '@/components/shared/Container';
import GPS from '@/public/images/GPSimage.png';
import Suitcase from '@/public/images/Suitcase.svg';
import Reunitable_Logomark_Orange from '@/public/images/branding/Reunitable_Logomark_Orange.svg';
import wondering from '@/public/images/wondering.jpg';
import { Paperclip, PlusSquare, QrCode } from 'lucide-react';
import Link from 'next/link';

const steps = [
  {
    name: 'Join',
    desc: 'Start within 48 hours,. Once you join the Reunitable family you receive you personal secure labels and tags.',
    icon: <PlusSquare />
  },
  {
    name: 'Activate',
    desc: 'Scan your personal QR code which comes with your Welcome Letter to activate your membership',
    icon: <QrCode />
  },
  {
    name: 'Attach',
    desc: 'Simply attach your personalised labels and tags to those prized possessions that you never want to lose',
    icon: <Paperclip />
  },
  {
    name: 'Lose / Find',
    desc: 'When you lose something, in very quick time a Good Samaritan finds your valuable item.',
    icon: <PlusSquare />
  },
  {
    name: 'Scan',
    desc: 'Your Good Samaritan scans your code and immediately you receive an Alert on your phone and by email, your alternate will also be alerted.',
    icon: <QrCode />
  },
  {
    name: 'Chat / Reunite',
    desc: 'Accept the Alert and secure a chat / photo window opens. You can quickly and easily communicate and arrange to receive your lost item.',
    icon: <Paperclip />
  }
];

const recommendedItemsListTechnology = [
  {
    title: 'Sports',
    items: [{ name: 'Skis' }, { name: 'Backpacks' }, { name: 'Tennis Gear' }, { name: 'And more...' }]
  },
  {
    title: 'Home & Personal',
    items: [{ name: 'Wallet' }, { name: 'Keys' }, { name: 'Pets' }, { name: 'And more...' }]
  },
  { title: 'Travel', items: [{ name: 'Passport' }, { name: 'Tickets' }, { name: 'Luggage' }, { name: 'And more...' }] },
  {
    title: 'Technology',
    items: [{ name: 'Phone' }, { name: 'Laptop' }, { name: 'Camera' }, { name: 'And more...' }]
  },
  {
    title: 'Work',
    items: [{ name: 'Briefcase' }, { name: 'Scanners' }, { name: 'Tools' }, { name: 'And more...' }]
  }
];

export default function Pricing() {
  return (
    <HomePageLayout
      heroTitle="How it works"
      heroContent="All the information about how Reunitable works for you!"
      primaryButtonText="I'm ready - let me join"
      primaryButtonLink="/"
      contentMaxWidth="max-w-4xl"
      heroImage={wondering.src}
      isPhoto
    >
      {/* Steps Slice */}
      <div className="flex flex-col gap-12 bg-alpha-light-100 py-6 lg:py-12">
        <h2 className="px-6 font-heading text-4xl font-bold md:text-5xl lg:text-center">
          Six Steps to always protect your prized possessions
        </h2>
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {steps.map((step) => (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-6">
                  <div className="relative aspect-square w-16 rounded-full border-2 border-alpha-dark-600 bg-alpha-light-200">
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">{step.icon}</div>
                  </div>
                  <h2 className="font-heading text-4xl font-bold">{step.name}</h2>
                </div>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/*  Recommendations Slice */}
      <div className="bg-alpha-light-200 py-12">
        <Container className="flex flex-col gap-8">
          <h2 className="max-w-4xl font-heading text-4xl font-bold leading-[1.2]">
            You can attach your (unique to you) personal QR code to almost anything:
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="grid grid-cols-2 justify-between gap-4 lg:gap-8">
              {recommendedItemsListTechnology.map((group) => (
                <div className="flex flex-col gap-4 rounded-lg p-2" key={group.title}>
                  <h3 className="font-heading text-3xl font-bold leading-heading text-alpha-dark-600 ">
                    {group.title}
                  </h3>
                  <div className="flex flex-col gap-1">
                    {group.items.map((item) => (
                      <p className="text-xl font-semibold" key={item.name}>
                        {item.name}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center">
              <img src={Suitcase.src} className="w-full" />
            </div>
          </div>
        </Container>
      </div>

      {/* Video slice */}
      <div className="bg-green-100 py-12">
        <Container className="flex flex-col gap-12">
          <h2 className="font-heading text-2xl font-bold lg:text-4xl">Our short explainer video</h2>
          <div className="flex w-full justify-center">
            <div className="[ reunitable-video ] lg:w-1/2">
              <iframe
                src="https://www.youtube.com/embed/cZBd_NcjY0E?si=UQBFkd-IV_1w8Dcn"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          <div className="relative flex overflow-hidden rounded-md bg-bravo-light-800 p-6 pr-12">
            <p className="flex flex-wrap gap-1">
              Any questions please feel free to contact us at:&nbsp;
              <a href="mailto:support@reunitable.co.uk" className="font-bold underline">
                support@reunitable.co.uk
              </a>
              or visit our
              <Link href="/faq" className="font-bold underline">
                FAQ's
              </Link>
              page for more information
            </p>
            &nbsp;
            <div className="">
              <img
                src={Reunitable_Logomark_Orange.src}
                className="absolute right-0 top-0 hidden h-full translate-x-px lg:block"
              />
            </div>
          </div>
        </Container>
      </div>

      <div className="bg-green-100 py-12">
        <Container className="flex flex-col gap-12">
          <h2 className="font-heading text-2xl font-bold lg:text-4xl">For our corporate clients</h2>
          <div className="flex w-full justify-center">
            <div className="[ reunitable-video ] lg:w-1/2">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/qdwDuNP-HLo?si=17eZHSArBbcYZlFd"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <Link className="underline" href="/citations">
            Video citations
          </Link>
        </Container>
      </div>

      {/* GPS Slice */}
      <div className="bg-alpha-light-100 pt-6">
        <Container className="flex flex-col gap-16 overflow-hidden">
          <section className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-12">
            <div className="flex flex-col justify-center gap-6">
              <h2 className="-mb-3 max-w-6xl font-heading text-2xl font-bold uppercase leading-heading text-alpha-dark-600 lg:text-4xl">
                GPS - Coming soon (2024)
              </h2>
              <p>
                Our team are presently working on the next generation of Remote Location and GPS tags which will
                integrate with your existing personal codes. Sign up now, and you will be first in the queue when these
                are released. There will be a special price to existing members.
              </p>
              <div>
                <button className="rounded-full bg-bravo px-16 py-8 font-heading text-xl leading-heading text-white">
                  I'm ready - let's do it
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <img src={GPS.src} className="" />
            </div>
          </section>
        </Container>
      </div>
    </HomePageLayout>
  );
}
