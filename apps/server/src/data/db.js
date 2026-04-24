import { v4 as uuid } from 'uuid';
import bcrypt from 'bcryptjs';

const now = new Date().toISOString();

export const db = {
  users: [
    { id: 'u-admin', name: 'Admin User', email: 'admin@fragrance.local', passwordHash: bcrypt.hashSync('admin123', 10), role: 'ADMIN', status: 'ACTIVE', createdAt: now },
    { id: 'u-tech', name: 'Technical User', email: 'tech@fragrance.local', passwordHash: bcrypt.hashSync('tech123', 10), role: 'TECHNICAL', status: 'ACTIVE', createdAt: now },
    { id: 'u-customer', name: 'Customer User', email: 'customer@fragrance.local', passwordHash: bcrypt.hashSync('customer123', 10), role: 'CUSTOMER', status: 'ACTIVE', createdAt: now }
  ],
  products: [
    { id: 'p1', name: 'Amber Night', description: 'Warm oriental blend.', price: 120, volumeMl: 100, notes: ['amber', 'vanilla'], ingredients: 'Alcohol, Fragrance', stock: 30, status: 'IN_STOCK', relatedProductIds: ['p2'], itemCost: 65 },
    { id: 'p2', name: 'Citrus Dawn', description: 'Fresh morning citrus.', price: 95, volumeMl: 80, notes: ['bergamot', 'orange'], ingredients: 'Alcohol, Fragrance', stock: 44, status: 'IN_STOCK', relatedProductIds: ['p1'], itemCost: 40 }
  ],
  productImages: [
    { id: 'img1', productId: 'p1', url: '/images/p1-1.jpg', sortOrder: 1 },
    { id: 'img2', productId: 'p2', url: '/images/p2-1.jpg', sortOrder: 1 }
  ],
  carts: [],
  orders: [],
  payments: [],
  shippings: [],
  campaigns: [],
  expenses: [],
  capitalEntries: [],
  helpArticles: [],
  faqs: [],
  news: [],
  newsletterSubscribers: [],
  emailLogs: [],
  otps: [],
  socialMediaLinks: [
    { id: 's1', title: 'Instagram', iconRef: 'icons/instagram.svg', url: 'https://instagram.com/example', active: true, sortOrder: 1 }
  ],
  translations: [],
  siteSettings: []
};

export const createId = (prefix) => `${prefix}-${uuid().slice(0, 8)}`;
