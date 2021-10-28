require 'sinatra'
require "sinatra/cors"
require 'smartpay'

Smartpay.configure do |config|
  config.public_key = ENV['PUBLIC_KEY']
  config.secret_key = ENV['SECRET_KEY']
end

set :port, 5000
set :allow_origin, "*"
set :allow_methods, "GET, PUT, POST, DELETE, OPTIONS"
set :allow_headers, "Authorization, Content-Type, Accept"

post '/create-smartpay-checkout' do
  content_type :json

  params = JSON.parse(request.body.read)
  Smartpay::Api.create_checkout_session(params).as_json
rescue => err
  if err.respond_to?(:response)
    err.response.body
  else
    raise err
  end
end
