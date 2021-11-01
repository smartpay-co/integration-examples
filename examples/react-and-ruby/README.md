# Smartpay Example: integrate with react-and-ruby

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
### Ruby v2.6+ with bundler installed

We recommend Ruby v2.7.4 (at the time of writing).

If you use system built-in Ruby, you might need to be the sudoer to be able to `sudo` in some of the steps. We recommend you to use either [rbenv](https://github.com/rbenv/rbenv) or [rvm](https://rvm.io/) to have your own non-global Ruby to avoid potential permission issues.

#### Install Bundler

Once you have your Ruby in place:

```shell
gem install bundler
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
npx serve -p 3080 build
```

### Server

#### Fill in your API keys

Edit public key and secret key with your own credentials in `server.rb`

```ruby
...
config.public_key = '<YOUR_PUBLIC_KEY>' # the one starts with pk_test_
config.secret_key = '<YOUR_SECRET_KEY>' # the one starts with sk_test_
...
```

#### Install required packages via Bundler

[Bundler](https://bundler.io/) is a dependency manager for Ruby projects.

You can install Bundler with the command:

```shell
gem install bundler
```

Install required packages with the command:

```shell
bundle install
```

Run Sinatra application with the command:

```sheel
ruby server.rb
```

Visit http://localhost:5000/smartpays

Click the `checkout` button on the page to be redirected to Smartpay's Checkout.

To try out different cases, you can use the following test credit cards for different cases:

- Payment succeeds: `4242 4242 4242 4242`
- Payment is declined: `4100 0000 0000 0019`
