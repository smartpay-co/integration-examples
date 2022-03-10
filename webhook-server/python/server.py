import hmac
import base62
import hashlib
from flask import Flask, request

BASE62 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

secret = 'MgUfJaMacS7r5JxGxdqFiZ1hpGY9a5lZcVQZDo6s'

app = Flask(__name__, static_url_path='')

root = '../client/build'


@app.route("/webhooks", methods=['POST'])
def webhooks():
    signature = request.headers['smartpay-signature']
    signature_timestamp = request.headers['smartpay-signature-timestamp']

    signer = hmac.new(base62.decodebytes(secret, charset=BASE62), msg=bytes('%s.' % (signature_timestamp,),
                      'utf-8'), digestmod=hashlib.sha256)
    signer.update(request.get_data())
    calculated_signature = signer.hexdigest()

    print(request.headers)
    print(request.json)
    print(calculated_signature)

    if signature == calculated_signature:
        return ''

    return '', 400
