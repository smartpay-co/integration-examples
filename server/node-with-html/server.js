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
    amount: 400,
    currency: 'JPY',
    items: [
      {
        name: 'オリジナルス STAN SMITH',
        amount: 250,
        currency: 'JPY',
        quantity: 1,
      },
    ],
    customerInfo: {
      accountAge: 35,
      email: 'merchant-support@smartpay.co',
      firstName: 'かおる',
      lastName: '田中',
      firstNameKana: 'カオル',
      lastNameKana: 'タナカ',
      address: {
        line1: '北青山 3-6-7',
        line2: '青山パラシオタワー 11階',
        subLocality: '',
        locality: '港区',
        administrativeArea: '東京都',
        postalCode: '107-0061',
        country: 'JP',
      },
      dateOfBirth: '1970-06-30',
      gender: 'male',
    },
    shippingInfo: {
      address: {
        line1: '北青山 3-6-7',
        line2: '青山パラシオタワー 11階',
        subLocality: '',
        locality: '港区',
        administrativeArea: '東京都',
        postalCode: '107-0061',
        country: 'JP',
      },
      feeAmount: 150,
      feeCurrency: 'JPY',
    },
    // Your internal reference of the order
    reference: 'order_ref_1234567',
    // Callback URLs
    successUrl: 'https://docs.smartpay.co/example-pages/checkout-successful',
    cancelUrl: 'https://docs.smartpay.co/example-pages/checkout-canceled',
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
