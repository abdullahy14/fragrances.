import express from 'express';
import { authService } from '../services/authService.js';
import { otpService } from '../services/otpService.js';
import { db } from '../data/db.js';
import bcrypt from 'bcryptjs';

export const authRoutes = express.Router();

authRoutes.post('/signup', (req, res) => {
  try { res.json(authService.signup(req.body)); } catch (e) { res.status(400).json({ message: e.message }); }
});
authRoutes.post('/login', (req, res) => {
  try { res.json(authService.login(req.body)); } catch (e) { res.status(400).json({ message: e.message }); }
});
authRoutes.post('/google', (req, res) => res.json(authService.googleLogin(req.body)));
authRoutes.post('/forgot-password/request', async (req, res) => {
  await otpService.create(req.body.email);
  res.json({ ok: true });
});
authRoutes.post('/forgot-password/verify', (req, res) => {
  const ok = otpService.verify(req.body.email, req.body.otp);
  if (!ok) return res.status(400).json({ message: 'Invalid OTP' });
  const user = db.users.find((u) => u.email === req.body.email);
  if (!user) return res.status(404).json({ message: 'User not found' });
  user.passwordHash = bcrypt.hashSync(req.body.newPassword, 10);
  res.json({ ok: true });
});
