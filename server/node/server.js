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
  const session = await smartpay.createCheckoutSession(req.body);

  res.send(session);
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
