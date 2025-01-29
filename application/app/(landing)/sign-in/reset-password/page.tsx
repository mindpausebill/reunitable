import {BasicPageLayout} from '@/components/landing/BasicPageLayout';
import {PasswordUpdateForm} from '@/components/register-flow/PasswordUpdateForm';

const ResetPasswordPage = () => {

  return (
    <BasicPageLayout
      heroTitle="Reset password"
      heroContent="Enter your new password below and hit confirm to reset your password."
      maxWidth="max-w-3xl"
    >
      <PasswordUpdateForm
        ownContentBox={true}
        buttonText="Confirm"
        successUrl="/dashboard"
        formTitle="Reset password"
      />
    </BasicPageLayout>
  );
};

export default ResetPasswordPage;
