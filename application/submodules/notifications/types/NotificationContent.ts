export type DynamicNotificationContent<C extends NotificationChannel> = C extends 'sms' | 'push'
  ? NotificationContent
  : EmailNotificationContent;

export type NotificationChannel = 'sms' | 'push' | 'email';

export type NotificationContent = {
  messageName: string;
  messageBody: string;
  url?: string;
};

export type EmailNotificationContent = {
  email_subject: string;
  email_body: string;
};
