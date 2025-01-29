import ContentBox from '@/components/shared/ContentBox';
import { Infobox } from '@/components/shared/Infobox';
import { useServerCurrentUser } from '@/submodules/supabase-functions/auth/getServerCurrentUser';
import { InfoType } from '@/types/Infobox';
import QRCode from 'react-qr-code';

const QRCodePage = () => {
  const user = useServerCurrentUser();
  const userPrinterId = (user?.metadata as { printerId?: string })?.printerId;

  return (
    <ContentBox className="flex w-full flex-col gap-6">
      <div className="flex flex-col gap-6">
        <h2 className="font-heading text-2xl text-alpha-dark-600">My QR Code</h2>
        <hr />
      </div>

      {!user && (
        <Infobox type={InfoType.Error} visible={true} dismissible={false}>
          Could not find user. Please try logging out and back in again.
        </Infobox>
      )}

      {user && !userPrinterId && (
        <Infobox type={InfoType.Info} visible={true} dismissible={false}>
          It look as though you don't currently have a QR code.
        </Infobox>
      )}

      {user && userPrinterId && (
        <div className="flex w-full justify-center">
          <QRCode value={`${process.env.NEXT_PUBLIC_SITE_URL}/tag/${userPrinterId}`} />
        </div>
      )}
    </ContentBox>
  );
};

export default QRCodePage;
