require 'sinatra'
require 'smartpay'

Smartpay.configure do |config|
  config.api_url = 'https://api.smartpay.co/smartpayments'
  config.checkout_url = 'https://checkout.smartpay.co'

  config.public_key = ENV['PUBLIC_API_KEY']
  config.secret_key = ENV['PRIVATE_API_KEY']
end

PUBLIC_DIR = File.join(File.dirname(__FILE__), '../client/build')

set :port, 5000
set :public_folder, PUBLIC_DIR

get '/smartpays' do
  redirect '/index.html'
end

post '/create-smartpay-checkout' do
  Smartpay::Api.create_checkout_session(params).as_json
end

