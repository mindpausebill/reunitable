import OneSignal from 'react-onesignal';

export const initialiseOneSignal = async (userId: string) => {
  OneSignal.login(userId);

  OneSignal.init({
    appId: process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID ?? '',
    safari_web_id: process.env.NEXT_PUBLIC_ONESIGNAL_SAFARI_APP_ID ?? '',
    subdomainName: process.env.NEXT_PUBLIC_ONESIGNAL_SUBDOMAIN_NAME ?? '',
    autoResubscribe: true
  });
};
