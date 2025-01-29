import { AccountLayout } from './AccountLayout';

const ChildLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AccountLayout>{children}</AccountLayout>
    </>
  );
};

export default ChildLayout;
