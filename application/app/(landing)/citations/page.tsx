import { BasicPageLayout } from '@/components/landing/BasicPageLayout';
import { HomePageLayout } from '@/components/landing/HomePageLayout';
import Container from '@/components/shared/Container';
import Bicycle from '@/public/images/Bicycle.png';
import Suitcase from '@/public/images/Suitcase.svg';
import Reunitable_Logomark_Orange from '@/public/images/branding/Reunitable_Logomark_Orange.svg';
import characterImage11 from '@/public/images/characters/11.svg';
import Link from 'next/link';

const citations = [
  <>
    As a result of employees' devices being lost or misappropriated, businesses use lose valuable data and IP. These
    data losses is estimated to cost $2.9 billion in America and £2.1 billion in the UK. [Sources: Newman, J. (2018,
    April 17). Businesses lose $2 billion a year due to lost laptops. Laptop Magazine.
    <Link
      target="_blank"
      rel="noopener noreferrer"
      className="underline"
      href="https://www.laptopmag.com/news/businesses-lose-2-billion-a-year-due-to-lost-laptops"
    >
      https://www.laptopmag.com/news/businesses-lose-2-billion-a-year-due-to-lost-laptops
    </Link>
    ; Lost and stolen devices cost UK organisations over £2 billion a year. (2019, October 23). Action Fraud.
    <Link
      target="_blank"
      rel="noopener noreferrer"
      className="underline"
      href="https://www.actionfraud.police.uk/lost-and-stolen-devices-cost-uk-organisations-over-2-billion-a-year"
    >
      https://www.actionfraud.police.uk/lost-and-stolen-devices-cost-uk-organisations-over-2-billion-a-year]
    </Link>
    ]
  </>,
  <>
    Considering laptops alone, laptops lost in US airports cost companies an estimated $5 billion each year, in
    equipment cost and data breach costs. [Sources: Ferenstein, G. (2013, October 8). Airport Insecurity: TSA's Failure
    to Costly Laptop Theft. Dell.
    <Link
      target="_blank"
      rel="noopener noreferrer"
      className="underline"
      href="https://www.dell.com/learn/us/en/uscorp1/press-releases/2013-10-08-airport-insecurity-tsa-failure-costly-laptop-theft"
    >
      https://www.dell.com/learn/us/en/uscorp1/press-releases/2013-10-08-airport-insecurity-tsa-failure-costly-laptop-theft
    </Link>
    ; Cost of Data Breach Report 2022. (2022). IBM.{' '}
    <Link
      target="_blank"
      rel="noopener noreferrer"
      className="underline"
      href="https://www.ibm.com/downloads/cas/OJDVQGRY"
    >
      https://www.ibm.com/downloads/cas/OJDVQGRY
    </Link>
    ]
  </>,
  <>
    In the UK, the cost of lost equipment and data breaches adds up to £1.2 billion each year [Sources: Lost and stolen
    devices cost UK organizations over £2 billion a year. (2019, October 23). Action Fraud.
    <Link
      target="_blank"
      rel="noopener noreferrer"
      className="underline"
      href="https://www.actionfraud.police.uk/lost-and-stolen-devices-cost-uk-organisations-over-2-billion-a-year"
    >
      https://www.actionfraud.police.uk/lost-and-stolen-devices-cost-uk-organisations-over-2-billion-a-year
    </Link>
    ; Significantly Reduce the Cost of Data Breaches. (n.d.) UK ICO.
    <Link
      target="_blank"
      rel="noopener noreferrer"
      className="underline"
      href="https://ico.org.uk/for-organisations/resources-and-support/data-protection-self-assessment/cost-of-data-breach/"
    >
      https://ico.org.uk/for-organisations/resources-and-support/data-protection-self-assessment/cost-of-data-breach/
    </Link>
    ]
  </>,
  <>
    Equipment loss has a major knock on effect. The cost of lost productivity due to people misplacing or losing devices
    is $4.3 billion in America and £1.7 billion in the UK [Sources: Gohring, N. (2013, September 10). Lost laptops cost
    $2.1 billion in lost productivity. TechRepublic.
    <Link
      target="_blank"
      rel="noopener noreferrer"
      className="underline"
      href="https://www.techrepublic.com/article/lost-laptops-cost-2-1-billion-in-lost-productivity/"
    >
      https://www.techrepublic.com/article/lost-laptops-cost-2-1-billion-in-lost-productivity/
    </Link>
    ; Osborne, H. (2016, February 29). Losing laptops and phones costs Britons £1.7bn a year in lost productivity.
    MakeUseOf.{' '}
    <Link
      target="_blank"
      rel="noopener noreferrer"
      className="underline"
      href="https://www.makeuseof.com/tag/losing-laptops-phones-costs-britons-1-7bn-year-lost-productivity/"
    >
      https://www.makeuseof.com/tag/losing-laptops-phones-costs-britons-1-7bn-year-lost-productivity/
    </Link>
    ]
  </>,
  <>
    In the construction world, the cost of lost tools and equipment costs the industry £2.8 billion annually in the UK,
    and in the range of $3-4 billion in the USA. The loss of tools and equipment includes the cost of equipment, and
    costs of delays in construction, loss of productivity, and resulting on costs, for example the increased costs of
    insurance. [Sources: Powell, W. (2017, October 3). Tradespeople are losing £4,000 worth of tools per year. BigRentz.
    <Link
      target="_blank"
      rel="noopener noreferrer"
      className="underline"
      href="https://www.bigrentz.com/blog/tradespeople-losing-tools"
    >
      https://www.bigrentz.com/blog/tradespeople-losing-tools
    </Link>
    ; Tools and Equipment Theft. (n.d.). Associated General Contractors of America.
    <Link
      target="_blank"
      rel="noopener noreferrer"
      className="underline"
      href="https://www.agc.org/learn/construction-data/tools-and-equipment-theft"
    >
      https://www.agc.org/learn/construction-data/tools-and-equipment-theft
    </Link>
    ]
  </>,
  <>
    In January 2022, a General Motors engineer left a tablet, containing proprietary design plans for the new Hummer EV
    model that GM was developing in a taxi. It was not possible to return the tablet, maybe because of the lack of
    identification, and as a result GM incurred over $70million in on costs - lost productivity, delayed launch,
    recreation of designs, re-engineering. [Sources: Wayland, M. (2022, January 12). GM's long road to making the Hummer
    EV. Detroit News.
    <Link
      target="_blank"
      rel="noopener noreferrer"
      className="underline"
      href="https://www.detroitnews.com/story/business/autos/general-motors/2022/01/12/gms-long-road-making-hummer-ev/9170291002/"
    >
      https://www.detroitnews.com/story/business/autos/general-motors/2022/01/12/gms-long-road-making-hummer-ev/9170291002/
    </Link>
    ; Szymkowski, S. (2021, April 6). 6 things to know about the 2022 GMC Hummer EV. CNET.
    <Link
      target="_blank"
      rel="noopener noreferrer"
      className="underline"
      href="https://www.cnet.com/roadshow/news/2022-gmc-hummer-ev-suv-6-things-to-know/"
    >
      https://www.cnet.com/roadshow/news/2022-gmc-hummer-ev-suv-6-things-to-know/
    </Link>
    ; Hoffman, C. (2022, October 20). GM Delayed the Hummer EV Launch by 1 Year for This Reason. The Drive.
    <Link
      target="_blank"
      rel="noopener noreferrer"
      className="underline"
      href="https://www.thedrive.com/tech/37092/gm-delayed-the-hummer-ev-launch-by-1-year-for-this-reason"
    >
      https://www.thedrive.com/tech/37092/gm-delayed-the-hummer-ev-launch-by-1-year-for-this-reason
    </Link>
    ]
  </>,
  <>
    In 2021, an Airbus Engineer left his briefcase on a train containing critical hydraulic valve prototypes meant for
    flight control systems testing on the new A350-1000 model airplane. Cost of replacements and cost of delay to Airbus
    A350-100 program over $100millon. [Sources: Airbus engineer leaves £500,000 of equipment on train. (2021, March 31).
    BBC News.{' '}
    <Link
      target="_blank"
      rel="noopener noreferrer"
      className="underline"
      href="https://www.bbc.com/news/uk-england-birmingham-56580955"
    >
      https://www.bbc.com/news/uk-england-birmingham-56580955
    </Link>
    ; Norris, G. (2021, April 5). Airbus A350 Further Delayed As Lost Equipment Is Replaced. Aviation Week Network.
    <Link
      target="_blank"
      rel="noopener noreferrer"
      className="underline"
      href="https://aviationweek.com/aerospace/airframes/airbus-a350-further-delayed-lost-equipment-replaced"
    >
      https://aviationweek.com/aerospace/airframes/airbus-a350-further-delayed-lost-equipment-replaced
    </Link>
    ]
  </>,
  <>
    Salesforce - in 2018 a lost laptop contained product roadmap details. Once again it might not have been possible to
    identify who the laptop belonged to. But the information on the laptop entered into the public domain and
    Competitors exploited the intel to release their products first. Salesforce lost $200m - $300m in lost IP and market
    entry for their upcoming customer analytics and intelligence products. [Sources: Miller, R. (2018, September 25).
    Salesforce exec loses laptop full of sensitive employee data on plane. TechCrunch.
    <Link
      target="_blank"
      rel="noopener noreferrer"
      className="underline"
      href="https://techcrunch.com/2018/09/25/salesforce-exec-loses-laptop-data/"
    >
      https://techcrunch.com/2018/09/25/salesforce-exec-loses-laptop-data/
    </Link>
    ; Dignan, L. (2018, November 28) Salesforce customer data leak revealed; Ex-employee thought behind scheme. ZDNet.
    <Link
      target="_blank"
      rel="noopener noreferrer"
      className="underline"
      href="https://www.zdnet.com/article/salesforce-customer-data-leak-revealed-ex-employee-thought-behind-scheme/"
    >
      https://www.zdnet.com/article/salesforce-customer-data-leak-revealed-ex-employee-thought-behind-scheme/
    </Link>
    ; Wang, P. (2018, September 26). Stolen Salesforce laptop compromised tens of thousands of users' data. Motley Fool.
    <Link
      target="_blank"
      rel="noopener noreferrer"
      className="underline"
      href="https://www.fool.com/investing/2018/09/26/stolen-salesforce-laptop-compromised-tens-of-thous.aspx"
    >
      https://www.fool.com/investing/2018/09/26/stolen-salesforce-laptop-compromised-tens-of-thous.aspx
    </Link>
    ]
  </>,
  <>
    In 2017 a Unilever Executive lost a briefcase while changing planes on the way to a materials science conference in
    Germany. It contained a scanning electron microscope designed specifically for nano-scale product material imaging.
    Cost to project over $1.6 million included (for example) replacement, delays, down and reengineering [Sources:
    Unilever counts the cost after scientist loses microscope. (2018, March 14). Insurance Business UK.
    <Link
      target="_blank"
      rel="noopener noreferrer"
      className="underline"
      href="https://www.insurancebusinessmag.com/uk/news/breaking-news/unilever-counts-the-cost-after-scientist-loses-microscope-95987.aspx"
    >
      https://www.insurancebusinessmag.com/uk/news/breaking-news/unilever-counts-the-cost-after-scientist-loses-microscope-95987.aspx
    </Link>
    ; Hotten, R. (2018, March 15). Unilever scientist told to rethink travel after losing work. BBC News.
    <Link
      target="_blank"
      rel="noopener noreferrer"
      className="underline"
      href="https://www.bbc.com/news/business-43414881"
    >
      https://www.bbc.com/news/business-43414881
    </Link>
    ]
  </>,
  <>
    In March 2022, an Apple engineer left a bag containing prototype iPhone 14 devices on a shuttle bus from Silicon
    Valley to San Francisco. The bag had disguised iPhone 14 models heading to a carrier partner for 5G network testing.
    Apple still had to delay the iPhone 14 launch by 3 weeks. Cost impact ver $200 million in lost iPhone 14 opening
    week sales revenue. [Sources: Sanchez, O. (2022, April 18). Apple engineer leaves prototype iPhone units in bar.
    TechTimes.{' '}
    <Link
      target="_blank"
      rel="noopener noreferrer"
      className="underline"
      href="https://www.techtimes.com/articles/275004/20220418/apple-engineer-prototype-iphone-units-bar.htm"
    >
      https://www.techtimes.com/articles/275004/20220418/apple-engineer-prototype-iphone-units-bar.htm
    </Link>
    ; O'Kane, S. (2022, September 7). iPhone 14 launch day is here. The Verge.
    <Link
      target="_blank"
      rel="noopener noreferrer"
      className="underline"
      href="https://www.theverge.com/23339176/iphone-14-launch-day-apple-event-price-release-date-specs"
    >
      https://www.theverge.com/23339176/iphone-14-launch-day-apple-event-price-release-date-specs
    </Link>
    ; Kastrenakes, J. (2022, September 9). iPhone 14 preorders underwhelm, reportedly due to supply chain issues. The
    Verge.{' '}
    <Link
      target="_blank"
      rel="noopener noreferrer"
      className="underline"
      href="https://www.theverge.com/2022/9/9/23347188/apple-iphone-14-preorder-supply-chain-rumors"
    >
      https://www.theverge.com/2022/9/9/23347188/apple-iphone-14-preorder-supply-chain-rumors
    </Link>
    ]
  </>
];

export default function Pricing() {
  return (
    <BasicPageLayout heroTitle="Citations" contentMaxWidth="max-w-4xl">
      <ol className="[ re-counter ] flex flex-col gap-6">
        {citations.map((citation) => (
          <li className="[ re-counter__section ]">{citation}</li>
        ))}
      </ol>
    </BasicPageLayout>
  );
}
