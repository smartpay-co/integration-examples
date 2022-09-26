const crypto = require('crypto');
const express = require('express');
const createError = require('http-errors');

const Smartpay = require('@smartpay/sdk-node').default; // The Nodejs SDK

const app = express();

const secret = 'YOUR_SIGNING_KEY';

const log = new Map();

app.use(
  express.json({
    verify: Smartpay.expressWebhookMiddleware(secret),
  })
);

app.post('/webhooks', async (req, res, next) => {
  const event = req.body;
  const signature = req.headers['smartpay-signature'];
  const calculatedSignature = req.headers['calculated-signature'];

  console.log(req.headers);
  console.log(event);
  console.log(calculatedSignature);

  if (signature === calculatedSignature) {
    const key = req.headers['smartpay-event-id'];
    const existing = log.get(key) || {
      count: 0,
    };

    console.log(`key: ${key} count: ${existing.count}`);

    if (existing && existing.count >= 2) {
      log.delete(key);

      res.send('');

      return;
    }

    log.set(key, { count: existing.count + 1 });
  }

  next(createError.BadRequest());
});

app.listen(3000, '0.0.0.0', () =>
  console.log('Node server listening on port 3000!')
);
