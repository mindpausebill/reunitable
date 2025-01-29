import { CorporateLayout } from '@/components/landing/CorporateLayout';
import { Footer } from '@/components/landing/Footer';
import Container from '@/components/shared/Container';

export default function Corporate() {
  return (
    <>
      <CorporateLayout
        heroTitle="We save our corporate customers $$$$"
        heroContent="Reunitable was created after our Founder, Bill Lewis, accidentally left a valuable bag on a trolley in Singapore's Changi airport."
        contentMaxWidth="max-w-6xl"
      >
        <Container className="flex flex-col gap-6 text-lg" padding="p-0">
          <p>
            When businesses lose devices and equipment, that has been entrusted to their employees and contractors, it
            is not just the physical aspect that represents the loss. Devices (phones, laptops, tablets) contain
            confidential and valuable information. If the device cannot be retrieved and reunited with the company there
            is a danger of data and intellectual property theft, and valuable confidential information can find its way
            into the public domain.
          </p>
          <p>
            In this video we show that these costs can run into hundreds of millions of dollars and show how reunitable
            can help you protect your valuable assets
          </p>
        </Container>
      </CorporateLayout>
      <div className="rounded-lg bg-green-100 py-6">
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

          <div className="flex flex-col gap-12 pb-12">
            <h3 className=" font-heading text-xl font-bold lg:text-4xl">
              I need to protect our business and corporate assets, please contact me urgently
            </h3>
            <div className="flex flex-wrap">
              <a
                className="rounded-full bg-bravo px-16 py-8 font-heading text-sm leading-heading  text-white xs:text-xl"
                href={`mailto:bill@albecq.net`}
              >
                Click to enter your contact details
              </a>
            </div>
          </div>
        </Container>
      </div>
      <Footer />
    </>
  );
}
