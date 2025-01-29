import { BoxAPIErrorEmailTemplate, EmailData } from '@/components/emailTemplate/BoxAPIErrorEmailTemplate';
import { Resend } from 'resend';

export const sendBoxAPIErrorEmails = async (error: string, emailData: EmailData[], resend: Resend) => {
  return await resend.emails.send({
    from: 'noreply@reunitable.co.uk',
    to: ['moritz.cornielje@northlink.digital'],
    subject: 'Box API CSV Upload Cron Job Failed',
    react: BoxAPIErrorEmailTemplate({ emailData, error })
  } as any);
};
