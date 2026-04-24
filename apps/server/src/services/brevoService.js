import { env } from '../config/env.js';
import { db, createId } from '../data/db.js';

const emailTemplates = {
  SIGNUP_ONBOARDING: 'signup-onboarding',
  FORGOT_PASSWORD_OTP: 'forgot-password-otp',
  ORDER_CONFIRMATION: 'order-confirmation',
  PAYMENT_CONFIRMATION: 'payment-confirmation',
  PAYMENT_REJECTION: 'payment-rejection',
  SHIPPING_UPDATE: 'shipping-update',
  NEWSLETTER: 'newsletter'
};

export const brevoService = {
  templates: emailTemplates,
  async sendEmail({ to, subject, template, payload }) {
    const entry = {
      id: createId('email'),
      to,
      subject,
      template,
      payload,
      provider: 'BREVO',
      providerConfigured: Boolean(env.BREVO_API_KEY),
      createdAt: new Date().toISOString()
    };
    db.emailLogs.push(entry);
    return entry;
  }
};
