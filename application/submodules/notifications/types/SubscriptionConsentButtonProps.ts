import { NotificationConsent } from './NotificationConsent';
import { User } from '@/types/supabaseTypes';

export type CustomSubscriptionConsentButtonProps = {
  currentUser: User;
  toggleSubscription: (notificationConsent: NotificationConsent, onComplete?: () => void | Promise<void>) => void;
};
