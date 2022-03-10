require 'sinatra'
require 'base_x'

set :port, 3000

secret = 'MgUfJaMacS7r5JxGxdqFiZ1hpGY9a5lZcVQZDo6s'

helpers do
  def request_headers
    env.inject({}){|acc, (k,v)| acc[$1.downcase] = v if k =~ /^http_(.*)/i; acc}
  end  
end

post '/webhooks' do
  content_type :json

  signature = request_headers["smartpay_signature"]
  signature_timestamp = request_headers["smartpay_signature_timestamp"]

  raw_body = request.body.read
  body = JSON.parse raw_body
  
  p BaseX::Base62ULD.decode(secret).bytes

  hmac = OpenSSL::HMAC.new(BaseX::Base62ULD.decode(secret), OpenSSL::Digest::SHA256.new)
  hmac.update signature_timestamp
  hmac.update '.'
  hmac.update raw_body
  calculated_signature = hmac.hexdigest

  p request_headers
  p body
  p calculated_signature

  if signature == calculated_signature
    return '', 200
  end

  return '', 400
rescue => err
  if err.respond_to?(:response)
    err.response.body
  else
    raise err
  end
end
