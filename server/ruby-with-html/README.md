### Backend

#### Fill in your API keys

Edit public key and secret key with your own credentials in `server.rb`

```ruby
...
config.public_key = '<YOUR_PUBLIC_API_KEY>' # the one starts with pk_test_
config.secret_key = '<YOUR_PRIVATE_API_KEY>' # the one starts with sk_test_
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

* Payment succeeds: `4242 4242 4242 4242`
* Payment is declined: `4100 0000 0000 0019`
