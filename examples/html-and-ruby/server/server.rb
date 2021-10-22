require 'sinatra'
require 'smartpay'

Smartpay.configure do |config|
  config.public_key = ENV['PUBLIC_KEY']
  config.secret_key = ENV['SECRET_KEY']
end

PUBLIC_DIR = File.join(File.dirname(__FILE__), '../client/build')

set :port, 5000
set :public_folder, PUBLIC_DIR

get '/' do
  redirect 'https://localhost:3080'
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
            "name": 'オリジナルス STAN SMITH',
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
  })

  redirect session.redirect_url
end

