# Fragrances E-commerce Technical Foundation

This repository contains a minimal but functional **React + Node.js** structure for a fragrances e-commerce platform with:

- Public storefront pages
- Customer order flow
- Authentication (email/password + Google structure)
- Forgot password OTP structure via Brevo
- Role-based dashboards (Customer / Technical / Admin)
- Financial and campaign foundations
- Translation-ready structure (English + Egyptian Arabic)

## Apps

- `apps/server`: Express API with service-oriented structure.
- `apps/client`: React app with route-level role protection and language switching.

## Required env vars

Copy `.env.example`:

- `GOOGLE_CLIENT_ID=`
- `GOOGLE_CLIENT_SECRET=`
- `AUTH_SECRET=`
- `BREVO_API_KEY=`
- `BREVO_SENDER_EMAIL=`
- `BREVO_SENDER_NAME=`

## Data model coverage (in-memory for now)

Included in `apps/server/src/data/db.js` with placeholders for:

- User
- Product
- ProductImage
- Cart
- CartItem
- Order
- OrderItem
- Payment
- Shipping
- Campaign
- Expense
- CapitalEntry
- HelpArticle
- FAQ
- News
- NewsletterSubscriber
- EmailLog
- OTP
- SocialMediaLink
- Translation
- SiteSetting

## Run

```bash
npm install
npm start
```

Server: `http://localhost:4000`  
Client: `http://localhost:5173`

Default demo users:

- Admin: `admin@fragrance.local` / `admin123`
- Technical: `tech@fragrance.local` / `tech123`
- Customer: `customer@fragrance.local` / `customer123`


## Scripts

- `npm start`: starts API + web app together.
- `npm run start:server`: starts only API server.
- `npm run start:client`: starts only React app.
