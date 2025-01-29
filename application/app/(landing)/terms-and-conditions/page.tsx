import { BasicPageLayout } from '@/components/landing/BasicPageLayout';
import React from 'react';
import { Fragment } from 'react';

const TsandCs = [
  {
    question: 'User Accounts',
    answers: [
      `To access certain features of the Website, you may need to create an account. You agree to provide accurate and complete information during the registration process, including your name, address, and email. You are solely responsible for maintaining the confidentiality of your account information and for any activity that occurs under your account.`,
      'Payments and subscriptions can be executed through the Website. By providing payment information, you authorise the Company to charge the specified amount to your chosen payment method securely processed by a third-party payment provider.'
    ]
  },
  {
    question: 'Intellectual Property',
    answers: [
      `All intellectual property rights, including but not limited to trademarks, logos, and content, displayed on the Website are owned by the Company. You are prohibited from using, reproducing, or distributing any intellectual property without the express written consent of the Company.`
    ]
  },
  {
    question: 'Privacy and GDPR',
    answers: [
      `We take privacy seriously and are committed to protecting your 
      personal data. This privacy policy explains how we collect, use, and
      protect your personal data.`,
      'What data we collect: We may collect your name, contact details, payment information, and other personal data provided by you. We also collect website usage data using cookies.How we use data: We use your data to provide our services, process payments, communicate with you, and improve our website. We only use your data as permitted by law.',
      'Data sharing: We do not share your personal data with third parties without your consent, except to comply with legal obligations.',
      'Data retention: We retain your data for as long as needed to provide our services or as required by law. You may request deletion of your data at any time.',
      'Your rights: You have the right to access, correct, delete, restrict, and object to the use of your personal data. Simply contact us to exercise these rights.',
      'Security: We implement appropriate technical and organisational measures to protect your data from loss and unauthorised access.',
      'International data transfers: We do not transfer your data outside the UK/EEA.'
    ]
  },
  {
    question: 'Cookies',
    answers: [
      'Cookies are small text files containing small amounts of information which are downloaded and stored on your device when you visit a website.',
      'Necessary cookies: These are essential for enabling core website functionality and cannot be disabled.',
      'Performance cookies: These help us understand how visitors interact with our website and improve the performance.',
      'Functionality cookies: These allow us to remember your preferences and customise your experience.',
      'Targeting cookies: These are used to deliver relevant ads to you on our website and track their performance.',
      'Third-party cookies: These are placed by third-party services we use like Google Analytics to measure site traffic.',
      'Cookie consent: You can consent to our cookie use by closing this banner or adjusting your browser settings.',
      'Cookie management: Most browsers allow you to disable cookies. You can also delete cookies or set your browser to alert you when cookies are being used.'
    ]
  },
  {
    question: 'Payment Process',
    answers: [
      `Payments made on the Website are securely processed by a third-party payment provider (Stripe). No credit card information is stored on our servers.`
    ]
  },
  {
    question: 'Liability',
    answers: [
      `The Company shall not be liable for any errors, inaccuracies, or interruptions in the Website's content or services. Users agree to use the Website at their own risk.`
    ]
  },
  {
    question: 'Termination',
    answers: [
      `Users may terminate their account by providing 30 days' notice. The Company reserves the right to terminate or suspend user accounts for non-payment or violation of these Terms.`
    ]
  },
  {
    question: 'Governing Law',
    answers: [`These Terms shall be governed by and construed in accordance with the laws of the United Kingdom.`]
  },
  {
    question: 'Changes to Terms',
    answers: [
      `The Company reserves the right to modify these Terms at any time. Users will be notified of changes through the Website. Continued use of the Website after such modifications constitutes acceptance of the updated Terms.`
    ]
  },
  {
    question: 'Contact Information',
    answers: [
      `If you have any questions or concerns regarding these Terms, please contact us at support@reunitable.co.uk.`
    ]
  }
];

export default function TermsAndConditions() {
  return (
    <BasicPageLayout
      heroTitle="Terms and Conditions"
      heroContent='These terms and conditions ("Terms") govern the use of the Reunitable website ("Website") owned and operated by Reunitable 
      Ltd. ("Company"). By accessing or using the Website, you agree to 
      be bound by these Terms. If you do not agree with these Terms, 
      please refrain from using the Website.'
      contentMaxWidth="max-w-4xl"
      heroImageMaxWidth="max-w-3xl lg:max-w-5xl"
      heroImageTransform="translate-x-32 -translate-y-9 sm:translate-x-40 sm:-translate-y-16 lg:translate-x-48 lg:-translate-y-24"
    >
      <ol className="[ re-counter ] flex flex-col gap-12">
        {TsandCs.map((term, i) => (
          <li className="flex flex-col gap-6" key={term + '-' + i}>
            <h2 className="[ re-counter__section re-subcounter ] max-w-6xl font-heading text-xl font-bold leading-heading text-alpha-dark-600 lg:text-2xl">
              {term.question}
            </h2>
            {term.answers.map((condition, i) => (
              <p className="[ re-subcounter__section ]" key={condition + '-' + i}>
                {condition}
              </p>
            ))}
          </li>
        ))}
      </ol>
    </BasicPageLayout>
  );
}
