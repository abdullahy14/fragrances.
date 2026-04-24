import express from 'express';
import { db } from '../data/db.js';
import { translationService } from '../services/translationService.js';

export const publicRoutes = express.Router();

publicRoutes.get('/home', (_, res) => res.json({ featuredProducts: db.products.slice(0, 4), news: db.news.slice(0, 3) }));
publicRoutes.get('/catalog', (req, res) => {
  const q = req.query.q?.toLowerCase() || '';
  const products = db.products.filter((p) => p.name.toLowerCase().includes(q));
  res.json(products);
});
publicRoutes.get('/products/:id', (req, res) => {
  const product = db.products.find((p) => p.id === req.params.id);
  if (!product) return res.status(404).json({ message: 'Not found' });
  const images = db.productImages.filter((img) => img.productId === product.id);
  const related = db.products.filter((p) => product.relatedProductIds.includes(p.id));
  res.json({ ...product, images, related });
});
publicRoutes.get('/about', (_, res) => res.json({ content: 'About us content placeholder' }));
publicRoutes.get('/help-center', (_, res) => res.json({ articles: db.helpArticles, faqs: db.faqs }));
publicRoutes.post('/newsletter/subscribe', (req, res) => {
  const exists = db.newsletterSubscribers.find((n) => n.email === req.body.email);
  if (exists) return res.status(200).json({ message: 'Already subscribed' });
  db.newsletterSubscribers.push({ email: req.body.email, createdAt: new Date().toISOString() });
  res.json({ ok: true });
});
publicRoutes.get('/social-links', (_, res) => res.json(db.socialMediaLinks.filter((l) => l.active).sort((a, b) => a.sortOrder - b.sortOrder)));
publicRoutes.get('/translations/:locale', (req, res) => res.json(translationService.getLocale(req.params.locale)));
