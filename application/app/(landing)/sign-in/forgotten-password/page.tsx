import { ForgottenPasswordForm } from '@/components/auth/ForgottenPasswordForm';
import { BasicPageLayout } from '@/components/landing/BasicPageLayout';
import InputGroup from '@/components/shared/InputGroup';
import Link from 'next/link';

export default function Page() {
  return (
    <BasicPageLayout
      heroTitle="Forgotten password"
      heroContent="Not to worry, enter your email address below and we'll send you instructions to reset it."
      maxWidth="max-w-3xl"
    >
      <ForgottenPasswordForm />
    </BasicPageLayout>
  );
}
