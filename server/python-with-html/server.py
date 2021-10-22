import os
from flask import Flask, request, redirect, jsonify, send_from_directory
from flask_cors import CORS
from smartpay import Smartpay


# Replace the keys with yours
SECRET_KEY = os.environ.get('SECRET_KEY', '<YOUR_SECRET_KEY>')
PUBLIC_KEY = os.environ.get('PUBLIC_KEY', '<YOUR_PUBLIC_KEY>')

smartpay = Smartpay(SECRET_KEY, public_key=PUBLIC_KEY)

app = Flask(__name__, static_url_path='')
CORS(app)

root = '../client/build'

@app.route("/create-smartpay-checkout", methods=['POST'])
def create_smartpay_checkout():
    CALLBACK_URL_PREFIX = request.headers['referer']

    session = smartpay.create_checkout_session({
        "items": [
            {
                "name": 'オリジナルス STAN SMITH',
                "price": 250,
                "currency": 'JPY',
                "quantity": 1,
            },
        ],
        "shipping": {
            "line1": 'line1',
            "locality": 'locality',
            "postalCode": '123',
            "country": 'JP',
        },
        "reference": 'order_ref_1234567',
        "successURL": 'https://docs.smartpay.co/example-pages/checkout-successful',
        "cancelURL": 'https://docs.smartpay.co/example-pages/checkout-canceled',
    })

    return redirect(session['checkoutURL'], 303)


@ app.route("/payment-success")
def payment_success():
    return send_from_directory(root, 'payment-success.html')


@ app.route("/payment-cancel")
def payment_cancel():
    return send_from_directory(root, 'payment-cancel.html')


@ app.route("/<path>")
def files(path):
    return send_from_directory(root, path)
