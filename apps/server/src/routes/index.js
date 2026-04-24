import express from 'express';
import { authRoutes } from './authRoutes.js';
import { publicRoutes } from './publicRoutes.js';
import { customerRoutes } from './customerRoutes.js';
import { adminRoutes } from './adminRoutes.js';
import { technicalRoutes } from './technicalRoutes.js';

export const apiRouter = express.Router();
apiRouter.use('/auth', authRoutes);
apiRouter.use('/public', publicRoutes);
apiRouter.use('/customer', customerRoutes);
apiRouter.use('/admin', adminRoutes);
apiRouter.use('/technical', technicalRoutes);
