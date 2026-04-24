import express from 'express';
import { requireAuth, requireRole } from '../middleware/authMiddleware.js';
import { db } from '../data/db.js';
import { orderService } from '../services/orderService.js';

export const customerRoutes = express.Router();
customerRoutes.use(requireAuth, requireRole('CUSTOMER', 'ADMIN', 'TECHNICAL'));

customerRoutes.get('/cart', (req, res) => {
  const cart = db.carts.find((c) => c.userId === req.user.id) || { items: [] };
  res.json(cart);
});
customerRoutes.post('/cart/items', (req, res) => {
  let cart = db.carts.find((c) => c.userId === req.user.id);
  if (!cart) {
    cart = { userId: req.user.id, items: [] };
    db.carts.push(cart);
  }
  cart.items.push(req.body);
  res.json(cart);
});
customerRoutes.post('/checkout', (req, res) => res.json(orderService.createOrder(req.user.id, req.body)));
customerRoutes.get('/orders', (req, res) => res.json(db.orders.filter((o) => o.userId === req.user.id)));
customerRoutes.get('/orders/:id', (req, res) => {
  const order = db.orders.find((o) => o.id === req.params.id && o.userId === req.user.id);
  if (!order) return res.status(404).json({ message: 'Not found' });
  res.json(order);
});
