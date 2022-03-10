# Smartpay Example: integrate with react-and-php

## Prerequisites

### Prepare your own API keys

If you don't already have it, you can find your credentials at the `settings > credentials` page on your [dashboard](https://dashboard.smartpay.co/settings/credentials).

### Make sure you have Node.js v14+ installed

You can make sure of it by executing:

```shell
node -v
```

Even if you do not intend to use Node as your back-end language, having `Node.js v14+` would ensure a smooth experience to get our example code up and running.

If you already have it in place, you can skip the following and go directly to [get started](#get-started).

If you don't, we recommend using [nvm](https://github.com/nvm-sh/nvm).

Follow the official guide to install `nvm` properly, then:

```shell
nvm install --lts 14
nvm use --lts 14
```
### PHP v5.6+ with bundler installed

We recommend the version between 5.6 to 8.0 (v8.0.13 at the time of writing).

#### Install PHP 8.0

**MacOS**

We recommend using [Homebrew](https://brew.sh/).

```shell
brew install php@8.0
brew link php@8.0
```

**Windows**

Download from [https://windows.php.net/download#php-8.0](https://windows.php.net/download#php-8.0).

#### Install Composer

[Composer](https://getcomposer.org/) is a dependency manager for PHP projects.

Download Composer from their website: [https://getcomposer.org/download/](https://getcomposer.org/download/)

If you are using macos to develop with [homebrew](https://docs.brew.sh/), you can use the command to install Composer:

```shell
brew install composer
```

## Get started

### Automated

Assuming you have Node.js v14+ now, the last step for you is to:

```shell
npm run start
```

> :warning: Please note that it could take a while for everything to be configured & installed.

then, after the build is finished, **visit [http://localhost:3080](http://localhost:3080)**.

---

### Manual

If this doesn't work out for you, try the following steps manually.

You will need to get `BOTH` frontend and backend servers running simutaneously for this example to work.

In the following steps, `<PROJECT_ROOT>` refers to the root of this example project (where `client` and `server` directories reside in).

### Client

```shell
npx serve -p 8080 build
```

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
