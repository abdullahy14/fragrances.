import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { env } from '../config/env.js';
import { db } from '../data/db.js';
import { USER_STATUS } from '../utils/enums.js';
import { userService } from './userService.js';
import { brevoService } from './brevoService.js';

const sanitize = (user) => ({ id: user.id, name: user.name, email: user.email, role: user.role, status: user.status });

export const authService = {
  signup({ name, email, password }) {
    const user = userService.createUser({ name, email, password, role: 'CUSTOMER' });
    brevoService.sendEmail({ to: email, subject: 'Welcome!', template: brevoService.templates.SIGNUP_ONBOARDING, payload: { name } });
    const token = jwt.sign(sanitize(user), env.AUTH_SECRET, { expiresIn: '7d' });
    return { token, user: sanitize(user) };
  },
  login({ email, password }) {
    const user = db.users.find((u) => u.email === email);
    if (!user) throw new Error('Invalid credentials');
    if ([USER_STATUS.SUSPENDED, USER_STATUS.DISABLED, USER_STATUS.DELETED].includes(user.status)) {
      throw new Error(`Account ${user.status.toLowerCase()}`);
    }
    if (!bcrypt.compareSync(password, user.passwordHash)) throw new Error('Invalid credentials');
    const token = jwt.sign(sanitize(user), env.AUTH_SECRET, { expiresIn: '7d' });
    return { token, user: sanitize(user) };
  },
  googleLogin({ email, name }) {
    let user = db.users.find((u) => u.email === email);
    if (!user) user = userService.createUser({ name, email, password: Math.random().toString(36), role: 'CUSTOMER' });
    const token = jwt.sign(sanitize(user), env.AUTH_SECRET, { expiresIn: '7d' });
    return { token, user: sanitize(user), providerConfigured: Boolean(env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET) };
  }
};
