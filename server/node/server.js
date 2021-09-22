const path = require('path');
const cors = require('cors');
const express = require('express');

const Smartpay = require('@smartpay/sdk-node').default; // The Nodejs SDK

// Replace the keys with yours
const smartpay = new Smartpay('<YOUR_SECRET_API_KEY>', {
  publicKey: '<YOUR_PUBLIC_API_KEY>',
});
const app = express();
const root = path.join(__dirname, '..', 'client', 'build');

app.use(express.static(root));
app.use(express.json());
app.use(cors());

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
