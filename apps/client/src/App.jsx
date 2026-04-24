import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/public/HomePage';
import CatalogPage from './pages/public/CatalogPage';
import ProductDetailsPage from './pages/public/ProductDetailsPage';
import AboutPage from './pages/public/AboutPage';
import HelpCenterPage from './pages/public/HelpCenterPage';
import CartPage from './pages/public/CartPage';
import CheckoutPage from './pages/public/CheckoutPage';
import MyOrdersPage from './pages/orders/MyOrdersPage';
import OrderDetailsPage from './pages/orders/OrderDetailsPage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import PendingActions from './pages/admin/PendingActions';
import Orders from './pages/admin/Orders';
import Financials from './pages/admin/Financials';
import SalesCampaigns from './pages/admin/SalesCampaigns';
import Expenses from './pages/admin/Expenses';
import ProductsCosts from './pages/admin/ProductsCosts';
import Accounts from './pages/admin/Accounts';
import HelpCenterMgmt from './pages/admin/HelpCenterMgmt';
import NewsletterMgmt from './pages/admin/NewsletterMgmt';
import SocialLinksMgmt from './pages/admin/SocialLinksMgmt';
import SettingsLanguages from './pages/admin/SettingsLanguages';
import TechDashboard from './pages/technical/TechDashboard';
import NewsletterManagement from './pages/technical/NewsletterManagement';
import NewsManagement from './pages/technical/NewsManagement';
import HelpArticlesManagement from './pages/technical/HelpArticlesManagement';
import FAQManagement from './pages/technical/FAQManagement';
import EmailTemplateManagement from './pages/technical/EmailTemplateManagement';
import SiteContentManagement from './pages/technical/SiteContentManagement';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/help-center" element={<HelpCenterPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<ProtectedRoute roles={['CUSTOMER', 'ADMIN', 'TECHNICAL']}><CheckoutPage /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute roles={['CUSTOMER', 'ADMIN', 'TECHNICAL']}><MyOrdersPage /></ProtectedRoute>} />
          <Route path="/orders/:id" element={<ProtectedRoute roles={['CUSTOMER', 'ADMIN', 'TECHNICAL']}><OrderDetailsPage /></ProtectedRoute>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          <Route path="/admin" element={<ProtectedRoute roles={['ADMIN']}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/pending-actions" element={<ProtectedRoute roles={['ADMIN']}><PendingActions /></ProtectedRoute>} />
          <Route path="/admin/orders" element={<ProtectedRoute roles={['ADMIN']}><Orders /></ProtectedRoute>} />
          <Route path="/admin/financials" element={<ProtectedRoute roles={['ADMIN']}><Financials /></ProtectedRoute>} />
          <Route path="/admin/sales-campaigns" element={<ProtectedRoute roles={['ADMIN']}><SalesCampaigns /></ProtectedRoute>} />
          <Route path="/admin/expenses" element={<ProtectedRoute roles={['ADMIN']}><Expenses /></ProtectedRoute>} />
          <Route path="/admin/products-costs" element={<ProtectedRoute roles={['ADMIN']}><ProductsCosts /></ProtectedRoute>} />
          <Route path="/admin/accounts" element={<ProtectedRoute roles={['ADMIN']}><Accounts /></ProtectedRoute>} />
          <Route path="/admin/help-center" element={<ProtectedRoute roles={['ADMIN']}><HelpCenterMgmt /></ProtectedRoute>} />
          <Route path="/admin/newsletter" element={<ProtectedRoute roles={['ADMIN']}><NewsletterMgmt /></ProtectedRoute>} />
          <Route path="/admin/social-links" element={<ProtectedRoute roles={['ADMIN']}><SocialLinksMgmt /></ProtectedRoute>} />
          <Route path="/admin/settings-languages" element={<ProtectedRoute roles={['ADMIN']}><SettingsLanguages /></ProtectedRoute>} />

          <Route path="/technical" element={<ProtectedRoute roles={['TECHNICAL', 'ADMIN']}><TechDashboard /></ProtectedRoute>} />
          <Route path="/technical/newsletter" element={<ProtectedRoute roles={['TECHNICAL', 'ADMIN']}><NewsletterManagement /></ProtectedRoute>} />
          <Route path="/technical/news" element={<ProtectedRoute roles={['TECHNICAL', 'ADMIN']}><NewsManagement /></ProtectedRoute>} />
          <Route path="/technical/help-articles" element={<ProtectedRoute roles={['TECHNICAL', 'ADMIN']}><HelpArticlesManagement /></ProtectedRoute>} />
          <Route path="/technical/faqs" element={<ProtectedRoute roles={['TECHNICAL', 'ADMIN']}><FAQManagement /></ProtectedRoute>} />
          <Route path="/technical/email-templates" element={<ProtectedRoute roles={['TECHNICAL', 'ADMIN']}><EmailTemplateManagement /></ProtectedRoute>} />
          <Route path="/technical/site-content" element={<ProtectedRoute roles={['TECHNICAL', 'ADMIN']}><SiteContentManagement /></ProtectedRoute>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
