import { BasicPageLayout } from '@/components/landing/BasicPageLayout';
import worried from '@/public/images/worried.jpg';
import Link from 'next/link';

const aboutUsContent = [
  {
    text: 'He had come off a long flight and had put his carry-on luggage, plus a small bag and a briefcase on a trolley (which Singapore airport have for the benefit of arriving passengers).'
  },
  {
    text: 'In a rush to get to immigration, he left the trolley at the immigration entrance point, grabbed his bags and proceeded through immigration. Only when he was through immigration did he realise that he`d left one small bag on the trolley. That bag contained some very valuable items. '
  },
  {
    text: 'Through the good work of Singapore`s airport security staff he was reunited with his bag some 24 hours later. But it took several visits to the airport and he admitted to having no separate ID or address in the small bag!'
  },
  {
    text: 'He pondered this problem for several weeks. Then, in a flash of inspiration, realised there was a method by which the Singapore security team could have contacted him.'
  },
  {
    text: 'From this, Reunitable slowly became reality. Through outstanding work by Reunitables` partners - Precision Proco and NorthLink Digital, the underlying global tech platform was built and the unique labels and tags were designed, tested, and produced.  All along, there were exacting standards to be reached.  And the joint team made Reunitable a reality.'
  }
];

export default function AboutUs() {
  return (
    <BasicPageLayout
      heroTitle="About us"
      heroContent="Reunitable was created after our Founder, Bill Lewis, accidentally left a valuable bag on a trolley in Singapore's Changi airport."
      contentMaxWidth="max-w-4xl"
      heroImage={worried.src}
      heroImageMaxWidth="max-w-xl lg:max-w-4xl"
      heroImageTransform="hidden bottom-0 right-0 lg:block lg:translate-x-48 lg:-translate-y-0"
      isPhoto
    >
      <div className="flex flex-col gap-6">
        {aboutUsContent.map((about, i) => (
          <p key={about + '' + i}>{about.text}</p>
        ))}
      </div>
      <div className="flex items-center pt-6">
        <Link
          href="/buy-now"
          className="rounded-full bg-bravo px-16 py-8 font-heading text-2xl leading-heading text-white"
        >
          I'm ready- let's do it
        </Link>
      </div>
    </BasicPageLayout>
  );
}
