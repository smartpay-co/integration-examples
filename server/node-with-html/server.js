const path = require('path');
const cors = require('cors');
const express = require('express');

const Smartpay = require('@smartpay/sdk-node').default; // The Nodejs SDK

// Replace the keys with yours
const SECRET_KEY = process.env.SECRET_KEY || '<YOUR_SECRET_KEY>';
const PUBLIC_KEY = process.env.PUBLIC_KEY || '<YOUR_PUBLIC_KEY>';

const smartpay = new Smartpay(SECRET_KEY, {
  publicKey: PUBLIC_KEY,
});

const app = express();
const root = path.join(__dirname, '..', 'client', 'build');

app.use(express.static(root));
app.use(express.json());
app.use(cors());

app.get('/', async (req, res) => {
  res.redirect('http://localhost:3080');
});

app.post('/create-smartpay-checkout', async (req, res) => {
  const CALLBACK_URL_PREFIX = req.headers.referer;

  // Generate the payload for checkout session
  const payload = {
    items: [
      {
        name: 'オリジナルス STAN SMITH',
        amount: 250,
        currency: 'JPY',
        quantity: 1,
      },
    ],
    customer: {
      accountAge: 35,
      email: 'merchant-support@smartpay.co',
      firstName: 'かおる',
      lastName: '田中',
      firstNameKana: 'カオル',
      lastNameKana: 'タナカ',
      address: {
        line1: '3-6-7',
        line2: '青山パラシオタワー 11階',
        administrativeArea: '港区北青山',
        subLocality: '',
        locality: '東京都',
        postalCode: '107-0061',
        country: 'JP',
      },
      dateOfBirth: '1970-06-30',
      gender: 'male',
    },
    shipping: {
      line1: 'line1',
      locality: 'locality',
      postalCode: '123',
      country: 'JP',
    },
    // Your internal reference of the order
    reference: 'order_ref_1234567',
    // Callback URLs
    successURL: 'https://docs.smartpay.co/example-pages/checkout-successful',
    cancelURL: 'https://docs.smartpay.co/example-pages/checkout-canceled',
  };

  const session = await smartpay.createCheckoutSession(payload);

  res.redirect(303, session.checkoutURL);
});

/**
 * Handle callbacks
 */
app.get('/payment-success', async (req, res) => {
  res.sendFile('payment-success.html', { root });
});

app.get('/payment-canceled', async (req, res) => {
  res.sendFile('payment-canceled.html', { root });
});

app.listen(5000, '127.0.0.1', () =>
  console.log('Node server listening on port 5000!')
);
