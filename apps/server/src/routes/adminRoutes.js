import express from 'express';
import { requireAuth, requireRole } from '../middleware/authMiddleware.js';
import { db, createId } from '../data/db.js';
import { paymentService } from '../services/paymentService.js';
import { financialService } from '../services/financialService.js';
import { userService } from '../services/userService.js';

export const adminRoutes = express.Router();
adminRoutes.use(requireAuth, requireRole('ADMIN'));

adminRoutes.get('/dashboard', (_, res) => res.json(financialService.computeDashboard()));
adminRoutes.get('/pending-actions', (_, res) => {
  res.json({
    pendingOrders: db.orders.filter((o) => o.status === 'PENDING'),
    pendingPayments: db.payments.filter((p) => p.status === 'PENDING'),
    ordersNeedingReview: db.orders.filter((o) => o.status === 'PROCESSING'),
    suspendedOrders: db.orders.filter((o) => o.status === 'SUSPENDED')
  });
});
adminRoutes.get('/orders', (_, res) => res.json(db.orders));
adminRoutes.patch('/orders/:id/payment-status', (req, res) => res.json(paymentService.updateStatus(req.params.id, req.body.status)));
adminRoutes.patch('/orders/:id', (req, res) => {
  const order = db.orders.find((o) => o.id === req.params.id);
  if (!order) return res.status(404).json({ message: 'Not found' });
  Object.assign(order, req.body);
  res.json(order);
});
adminRoutes.delete('/orders/:id', (req, res) => {
  db.orders = db.orders.filter((o) => o.id !== req.params.id);
  res.json({ ok: true });
});
adminRoutes.post('/campaigns', (req, res) => {
  const campaign = { id: createId('cmp'), ...req.body };
  db.campaigns.push(campaign);
  res.json(campaign);
});
adminRoutes.get('/financials', (_, res) => res.json(financialService.computeDashboard()));
adminRoutes.post('/capital', (req, res) => {
  db.capitalEntries.push({ id: createId('cap'), ...req.body });
  res.json({ ok: true });
});
adminRoutes.post('/expenses', (req, res) => {
  db.expenses.push({ id: createId('exp'), ...req.body });
  res.json({ ok: true });
});
adminRoutes.get('/accounts', (_, res) => res.json(userService.listUsers()));
adminRoutes.patch('/accounts/:id/status', (req, res) => res.json(userService.updateStatus(req.params.id, req.body.status)));
adminRoutes.patch('/accounts/:id/role', (req, res) => res.json(userService.changeRole(req.params.id, req.body.role)));
adminRoutes.post('/accounts/:id/reset-password', (req, res) => res.json({ ok: userService.adminResetPassword(req.user.id, req.params.id, req.body.password) }));
adminRoutes.get('/accounts/:id/orders', (req, res) => res.json(db.orders.filter((o) => o.userId === req.params.id)));
adminRoutes.get('/social-links', (_, res) => res.json(db.socialMediaLinks));
adminRoutes.post('/social-links', (req, res) => { const item = { id: createId('soc'), ...req.body }; db.socialMediaLinks.push(item); res.json(item); });
