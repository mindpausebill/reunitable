import { Steps } from '../Steps';
import { PasswordUpdateForm } from '@/components/register-flow/PasswordUpdateForm';

const SetupPasswordPage = () => {
  return (
    <>
      <Steps currentStep={1} totalSteps={2} />
      <PasswordUpdateForm
        buttonText="Next step"
        successUrl="/setup/notifications"
        formTitle="Password setup"
        infoBoxText="Setup a password so you can access your account again."
      />
    </>
  );
};

export default SetupPasswordPage;
