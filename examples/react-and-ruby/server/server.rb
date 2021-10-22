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
  Smartpay::Api.create_checkout_session(params).as_json
end

