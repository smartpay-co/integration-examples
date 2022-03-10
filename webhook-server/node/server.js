const crypto = require('crypto');
const express = require('express');
const createError = require('http-errors');

const BASE62 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const base62 = require('base-x')(BASE62);

const app = express();

const secret = 'YOUR_SIGNING_KEY';

app.use(
  express.json({
    verify: (req, res, buf, encoding) => {
      if (req.headers['smartpay-signature']) {
        const signer = crypto.createHmac(
          'sha256',
          Buffer.from(base62.decode(secret))
        );
        const signatureTimestamp = req.headers['smartpay-signature-timestamp'];
        const result = signer
          .update(Buffer.from(`${signatureTimestamp}.`, 'utf8'))
          .update(buf)
          .digest('hex');

        req.headers['calculated-signature'] = result;
      }
    },
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
    res.send('');

    return;
  }

  next(createError.BadRequest());
});

app.listen(3000, '0.0.0.0', () =>
  console.log('Node server listening on port 3000!')
);
