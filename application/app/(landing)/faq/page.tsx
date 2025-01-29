import FaqImage from '/public/images/characters/2.svg';
import { BasicPageLayout } from '@/components/landing/BasicPageLayout';
import questions from '@/public/images/questions.jpg';
import { Fragment } from 'react';

const FAQs = [
  {
    question: 'My phone is switched off, or my phone has been lost?',
    answer: `When your personal QR code has been scanned and on that message is sent to 
    your phone and an email is generated notifying you that the code has been 
    scanned.  If your phone is switched off, or has been lost, the alert message that 
    would ordinarily be sent to your phone will have been sent to you by email.   
    If after 20 seconds you have not responded to the automatic alert an email and 
    an alert will be sent to your alternate contact`
  },
  {
    question: 'Why do I need to nominate an alternate contact?',
    answer: `There will be occasions when you may not be able to be contacted. For example, you might be out of cell phone coverage, your phone may have switched off, or be out of battery, or your phone may have been stolen. We need to communicate with you as soon as your personal QR code on your lost item has been scanned.  To ensure that you or someone you trust is notified as soon as possible we ask you to nominate an alternate contact.`
  },
  {
    question: 'Can someone remove my labels that have my QR code?',
    answer: `Not without considerable effort and the potential for defacing or damaging the item to which the QR code is attached. We have purposely designed the adhesive to be strong enough to withstand any potential thief trying to remove your QR label. The material used for the QR label is also extremely hard wearing and is water-proof, dishwasher proof, and will resist most solvents.  In many cases the only way to remove the QR label is to grind it off. The relative permanence of your QR label is for your advantage; your loved possessions needs to be protected at all times and also not subject to someone just removing the label so your item cannot be traced. BE CAREFUL WHEN YOU ATTACH YOUR LABEL TO AN ITEM For these reasons, please be careful when you attach your QR code to an item.  We recommend that you identify a suitable position, cut the label from the sheet without removing the backing, and place it on your item so that you are comfortable with its positioning. Only at that point do you remove the backing. Then gently place the label on your item, do not press firmly at this time. Only when you're satisfied with the positioning do you press the label to the item, after 30 seconds it will be firmly adhered to the surface.`
  },
  {
    question: 'Does anyone else have the same personal QR code as me?',
    answer:
      'No, all personal QR codes are generated individually and attached to your personal record. No one else can have the same QR code as you, yours is unique to you.'
  },
  {
    question: 'Why are the labels coloured orange and green?',
    answer:
      'Research has shown that the colour which is most easily seen in low light conditions are green - therefore we include in your set of QR codes a number which are printed in a distinctive shade of green. It has also been shown that the colour orange is one of the second most visible colours and we have used these for both labels and wallet inserts.'
  },
  {
    question: 'Can I order additional labels and tags?',
    answer: `Yes, of course. Just go to the website and click on the support tab, and click on 
    additional labels and tags. This will open an order form where you can choose to 
    have additional labels and tags for you to use.`
  },
  {
    question: 'Can I attach the labels to clothing or any item that is made of a fabric?',
    answer: `Yes, you can attach labels to any material that has a smooth finish. For example, 
    you could attach it to the lining of the coat, or to the outside of a backpack, or to 
    a sports bag.  It is important that the material has a smooth finish.  The labels will
    not successfully attach to wool or a similar material.`
  },
  {
    question: 'When someone scans my personal QR code can they identify me or see any of my personal information?',
    answer: `No, absolutely not! Our systems and databases are designed so that anyone who 
    scans your personal QR code, other than yourself, will only activate the messaging app and they will receive an acknowledgement saying that the system is contacting you and opening up the chat app.`
  },
  {
    question: 'What happens if I scan my own code?',
    answer: `The first time you scan your code (as instructed in your Welcome Letter) you will 
    activate your account.  Once your account has been activated, and you scan your
    code, you will receive a notification which is a personal acknowledgement that 
    your code is working, that the database and the communication network is operational, and you can rest assured that you are protected. You can scan your own 
    code at any time you wish if you require the assurance that our global network is 
    available to protect your loved possessions.`
  },
  {
    question: 'Can the QR code be put into an item of clothing (e.g. a leather jacket)?',
    answer: `Yes, it can.  Make sure the  is clean and smooth. It will not stick to a 
    “woollen” type of material.`
  },
  {
    question: 'Do subscribers have to pay people who find their lost items and call them?',
    answer: `No, there is no obligation to pay anyone, and nothing in our website or literature 
    implies that.  However, if someone returns something of value, you may wish to 
    acknowledge the Good Samaritan gesture by a small reward, or buy them a coffee or refreshments.`
  },
  {
    question: 'What is the level of brand awareness? How many people will know what to do if they find an item',
    answer: `Great question.  We are constantly making the Reunitable Brand visible on Social 
    Media and through frequent Press Releases.  We also look to get TV and popular 
    news streaming slots.`
  },
  {
    question: 'Does the QR code reveal my address, posing security threat if an item is stolen rather than lost',
    answer: `No, there is no way anyone can access any of your personal information by scanning the QR code. Scanning the QR code only opens a secure communication 
    channel to you (And your alternate contact). When your code is scanned, we 
    also send you an email but this, again, is completely secure and not visible to a 
    finder.`
  },
  {
    question: 'Is the product safe for women to use?',
    answer: `Yes, it is safe for anyone to use.  We recommend that you use caution when communicating with a finder. Always make sure that, when you meet to collect your 
    lost item, you do it in a public place and/or take a friend with you. Ask the finder
    to take a photo of themselves via the app, so that (a) you recognise them, and 
    (b) by saving the photo to your device, you have a record.`
  },
  {
    question: 'Do users have to be over the age of 18?',
    answer: `We only accept registrations from those who are able to hold a credit card, typically 18 years old. However, Reunitable is an excellent way of protecting children and young peoples' possessions.  In this case the finder would contact the 
    responsible adult.`
  },
  {
    question: 'What if I lose my tagged item outside the UK?',
    answer: `The same procedure will apply, in due course, we will have multiple language 
    support available on the app.`
  },
  {
    question: 'What if I sell my tagged item - can I get cut QR code off?',
    answer: `The labels are designed to be very difficult to remove (for your protection). If you
    sell an item, let us know and we will provide you with a “blank” label to stick over
    your QR code.`
  },
  {
    question: 'Do insurance companies know about this product?',
    answer: `Yes, we are in contact discussion with Insurance companies, and we are negotiating a premium discount if you use Reunitable. Watch out for updates.`
  },
  {
    question: 'What happens if the QR code gets wet?',
    answer: `Nothing, the label is waterproof and dishwasher proof.`
  }
];

export default function Page() {
  return (
    <BasicPageLayout
      heroTitle="FAQ"
      heroContent="Below you can find answers to our frequently asked questions."
      contentMaxWidth="max-w-4xl"
      heroImage={questions.src}
      heroImageMaxWidth="max-w-3xl lg:max-w-5xl"
      heroImageTransform=" hidden lg:block translate-x-32 -translate-y-9 sm:translate-x-40 sm:-translate-y-16 lg:translate-x-48 lg:-translate-y-24"
      isPhoto
    >
      <dl className="flex flex-col gap-12">
        {FAQs.map((faq, i) => (
          <Fragment key={faq + '' + i}>
            <div className="flex flex-col gap-3">
              <dt className="font-heading text-2xl font-bold leading-heading text-alpha-dark-600">{faq.question}</dt>
              <dd>{faq.answer}</dd>
            </div>
            {i !== FAQs.length - 1 && <hr />}
          </Fragment>
        ))}
      </dl>
    </BasicPageLayout>
  );
}
