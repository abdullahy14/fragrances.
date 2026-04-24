import { Link, Outlet } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { api } from '../services/api';

export default function MainLayout() {
  const { t } = useLanguage();
  const { user, logout } = useAuth();

  async function subscribeNewsletter(e) {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get('email');
    await api('/public/newsletter/subscribe', { method: 'POST', body: JSON.stringify({ email }) });
    e.currentTarget.reset();
  }

  return (
    <div>
      <nav>
        <Link to="/">{t.nav.home}</Link> | <Link to="/catalog">{t.nav.catalog}</Link> | <Link to="/about">{t.nav.about}</Link> | <Link to="/help-center">{t.nav.help}</Link> | <Link to="/cart">{t.nav.cart}</Link> | {!user && <Link to="/login">{t.nav.login}</Link>} {user && <Link to="/orders">{t.nav.myOrders}</Link>} {user?.role === 'ADMIN' && <Link to="/admin">{t.nav.admin}</Link>} {user?.role === 'TECHNICAL' && <Link to="/technical">{t.nav.technical}</Link>} {user && <button onClick={logout}>{t.common.logout}</button>} <LanguageSwitcher />
      </nav>
      <main><Outlet /></main>
      <footer>
        <form onSubmit={subscribeNewsletter}>
          <input name="email" placeholder="Newsletter email" required />
          <button>{t.common.submit}</button>
        </form>
        <small>Social links handled by API structure.</small>
      </footer>
    </div>
  );
}
