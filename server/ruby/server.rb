require 'sinatra'
require 'smartpay'

Smartpay.configure do |config|
  config.api_url = 'https://api.smartpay.co/smartpayments'
  config.checkout_url = 'https://checkout.smartpay.co'

  # edit public key and secret key with your own credentials
  config.public_api_key = '<YOUR_PUBLIC_KEY>'
  config.private_api_key = '<YOUR_SECRET_KEY>'
end

PUBLIC_DIR = File.join(File.dirname(__FILE__), '../client/build')

set :port, 5000
set :public_folder, PUBLIC_DIR

get '/smartpays' do
  redirect '/index.html'
end

post '/create-smartpay-checkout' do
  session = Smartpay::Api.create_checkout_session({
    "customerInfo": {
      "emailAddress": "success@smartpay.co",
    },
    "orderData": {
      "amount": 250,
      "currency": "JPY",
      "shippingInfo": {
        "address": {
          "line1": "line1",
          "locality": "locality",
          "postalCode": "123",
          "country": "JP"
        },
      },
      "lineItemData": [{
        "priceData": {
          "productData": {
            "name": "レブロン 18 LOW",
          },
          "amount": 250,
          "currency": "JPY",
        },
        "quantity": 1
      }]
    },
    "reference": "order_ref_1234567",
    "successUrl": "https://docs.smartpay.co/example-pages/checkout-successful",
    "cancelUrl": "https://docs.smartpay.co/example-pages/checkout-canceled",
    "test": true
  })

  redirect session.redirect_url
end

