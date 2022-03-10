require 'sinatra'
require 'smartpay'

Smartpay.configure do |config|
  config.public_key = ENV['PUBLIC_KEY']
  config.secret_key = ENV['SECRET_KEY']
end

PUBLIC_DIR = File.join(File.dirname(__FILE__), '../client/build')

set :bind, '0.0.0.0'
set :port, 5001
set :public_folder, PUBLIC_DIR

get '/' do
  redirect '/index.html'
end

post '/create-smartpay-checkout' do
  session = Smartpay::Api.create_checkout_session({
    amount: 400,
    currency: 'JPY',
    items: [
      {
        name: 'オリジナルス STAN SMITH',
        amount: 250,
        currency: 'JPY',
        quantity: 1,
      },
    ],
    customerInfo: {
      accountAge: 20,
      email: 'merchant-support@smartpay.co',
      firstName: '田中',
      lastName: '太郎',
      firstNameKana: 'たなか',
      lastNameKana: 'たろう',
      address: {
        line1: '北青山 3-6-7',
        line2: '青山パラシオタワー 11階',
        subLocality: '',
        locality: '港区',
        administrativeArea: '東京都',
        postalCode: '107-0061',
        country: 'JP',
      },
      dateOfBirth: '1985-06-30',
      gender: 'male',
    },
    shippingInfo: {
      address: {
        line1: '北青山 3-6-7',
        line2: '青山パラシオタワー 11階',
        subLocality: '',
        locality: '港区',
        administrativeArea: '東京都',
        postalCode: '107-0061',
        country: 'JP',
      },
      feeAmount: 150,
      feeCurrency: 'JPY',
    },
    reference: 'order_ref_1234567',
    successUrl: 'https://docs.smartpay.co/example-pages/checkout-successful',
    cancelUrl: 'https://docs.smartpay.co/example-pages/checkout-canceled',
  })

  redirect session.redirect_url
end

