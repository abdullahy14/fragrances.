import { db, createId } from '../data/db.js';
import { brevoService } from './brevoService.js';

export const otpService = {
  async create(email) {
    const otp = `${Math.floor(100000 + Math.random() * 900000)}`;
    const record = { id: createId('otp'), email, otp, expiresAt: Date.now() + 10 * 60 * 1000, used: false };
    db.otps.push(record);
    await brevoService.sendEmail({ to: email, subject: 'Password reset OTP', template: brevoService.templates.FORGOT_PASSWORD_OTP, payload: { otp } });
    return record;
  },
  verify(email, otp) {
    const found = db.otps.find((x) => x.email === email && x.otp === otp && !x.used);
    if (!found || found.expiresAt < Date.now()) return false;
    found.used = true;
    return true;
  }
};
