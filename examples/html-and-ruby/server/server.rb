require 'sinatra'
require 'smartpay'

Smartpay.configure do |config|
  config.api_url = ENV['SMARTPAY_API_PREFIX']
  config.public_key = ENV['PUBLIC_KEY']
  config.secret_key = ENV['SECRET_KEY']
end

PUBLIC_DIR = File.join(File.dirname(__FILE__), '../client/build')

set :port, 5000
set :public_folder, PUBLIC_DIR

get '/' do
  redirect '/index.html'
end

post '/create-smartpay-checkout' do
  session = Smartpay::Api.create_checkout_session({
    items: [
      {
        name: 'オリジナルス STAN SMITH',
        amount: 250,
        currency: 'JPY',
        quantity: 1,
      },
    ],
    customer: {
      accountAge: 20,
      email: 'merchant-support@smartpay.co',
      firstName: '田中',
      lastName: '太郎',
      firstNameKana: 'たなか',
      lastNameKana: 'たろう',
      address: {
        line1: '3-6-7',
        line2: '青山パラシオタワー 11階',
        subLocality: '',
        locality: '港区北青山',
        administrativeArea: '東京都',
        postalCode: '107-0061',
        country: 'JP',
      },
      dateOfBirth: '1985-06-30',
      gender: 'male',
    },
    shipping: {
      line1: 'line1',
      locality: 'locality',
      postalCode: '123',
      country: 'JP',
    },
    reference: 'order_ref_1234567',
    successURL: 'https://docs.smartpay.co/example-pages/checkout-successful',
    cancelURL: 'https://docs.smartpay.co/example-pages/checkout-canceled',
  })

  redirect session.redirect_url
end

