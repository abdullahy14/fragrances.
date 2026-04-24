const dictionary = {
  en: {
    appName: 'Fragrances Store',
    nav: { home: 'Home', catalog: 'Catalog', about: 'About Us', help: 'Help Center', cart: 'Cart', loginSignup: 'Login / Signup', myOrders: 'My Orders', admin: 'Admin Dashboard', technical: 'Technical Dashboard' },
    auth: { login: 'Login', signup: 'Sign up', forgot: 'Forgot password' },
    status: { pending: 'Pending', approved: 'Approved', rejected: 'Rejected', gapped: 'Gapped' }
  },
  ar_EG: {
    appName: 'متجر العطور',
    nav: { home: 'الرئيسية', catalog: 'الكتالوج', about: 'عننا', help: 'مركز المساعدة', cart: 'السلة', loginSignup: 'دخول / تسجيل', myOrders: 'طلباتي', admin: 'لوحة الأدمن', technical: 'لوحة التقني' },
    auth: { login: 'تسجيل دخول', signup: 'إنشاء حساب', forgot: 'نسيت الباسورد' },
    status: { pending: 'معلّق', approved: 'مقبول', rejected: 'مرفوض', gapped: 'متوقف' }
  }
};

export const translationService = {
  getAll: () => dictionary,
  getLocale: (locale) => dictionary[locale] || dictionary.en
};
