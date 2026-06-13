import { Resend } from 'resend';
import { renderFollowUpEmail, FollowUpEmailProps } from './emailBody';

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY environment variable is required to send email with Resend.');
}

const resend = new Resend(process.env.RESEND_API_KEY);

export interface SendResendEmailOptions extends FollowUpEmailProps {
  to: string;
  from: string;
  subject: string;
}

export async function sendResendEmail(options: SendResendEmailOptions) {
  const html = renderFollowUpEmail(options);

  return resend.emails.send({
    from: options.from,
    to: options.to,
    subject: options.subject,
    html,
  });
}
