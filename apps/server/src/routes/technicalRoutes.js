import express from 'express';
import { requireAuth, requireRole } from '../middleware/authMiddleware.js';
import { db, createId } from '../data/db.js';

export const technicalRoutes = express.Router();
technicalRoutes.use(requireAuth, requireRole('TECHNICAL', 'ADMIN'));

technicalRoutes.get('/dashboard', (_, res) => res.json({ newsletter: db.newsletterSubscribers.length, articles: db.helpArticles.length, faqs: db.faqs.length }));
technicalRoutes.get('/newsletter', (_, res) => res.json(db.newsletterSubscribers));
technicalRoutes.get('/news', (_, res) => res.json(db.news));
technicalRoutes.post('/news', (req, res) => { const row = { id: createId('news'), ...req.body }; db.news.push(row); res.json(row); });
technicalRoutes.delete('/news/:id', (req, res) => { db.news = db.news.filter((n) => n.id !== req.params.id); res.json({ ok: true }); });
technicalRoutes.get('/help-articles', (_, res) => res.json(db.helpArticles));
technicalRoutes.post('/help-articles', (req, res) => { const row = { id: createId('ha'), ...req.body }; db.helpArticles.push(row); res.json(row); });
technicalRoutes.get('/faqs', (_, res) => res.json(db.faqs));
technicalRoutes.post('/faqs', (req, res) => { const row = { id: createId('faq'), ...req.body }; db.faqs.push(row); res.json(row); });
technicalRoutes.get('/email-templates', (_, res) => res.json([{ key: 'SIGNUP_ONBOARDING', providerTemplateId: '' }, { key: 'ORDER_CONFIRMATION', providerTemplateId: '' }]));
technicalRoutes.get('/site-content', (_, res) => res.json(db.siteSettings));
