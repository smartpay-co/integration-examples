from flask import Flask, request, redirect, jsonify, send_from_directory
from flask_cors import CORS
from smartpay import Smartpay


smartpay = Smartpay('<YOUR_SECRET_API_KEY>',
                    public_key='<YOUR_PUBLIC_API_KEY>')


app = Flask(__name__, static_url_path='')
CORS(app)

root = '../client/build'


@app.route("/")
def home():
    return send_from_directory(root, 'index.html')


@app.route("/create-smartpay-checkout", methods=['POST'])
def create_smartpay_checkout():
    CALLBACK_URL_PREFIX = request.headers['referer']

    session = smartpay.create_checkout_session({
        "items": [
            {
                "name": 'レブロン 18 LOW',
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

        "test": True,
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
