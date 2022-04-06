### Server

#### Install required packages via Composer

Install required packages with the command:

```shell
composer install
```

Run Slim application with the command:

```sheel
php -S 127.0.0.1:5001 server.php
```

Visit http://localhost:5001/

Click the `checkout` button on the page to be redirected to Smartpay's Checkout.

To try out different cases, you can use the following test credit cards for different cases:

- Payment succeeds: `4242 4242 4242 4242`
- Payment is declined: `4100 0000 0000 0019`
