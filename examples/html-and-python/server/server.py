import os
from flask import Flask, request, redirect, send_from_directory
from flask_cors import CORS
from smartpay import Smartpay


# Replace the keys with yours
SECRET_KEY = os.environ.get('SECRET_KEY', '<YOUR_SECRET_KEY>')
PUBLIC_KEY = os.environ.get('PUBLIC_KEY', '<YOUR_PUBLIC_KEY>')

smartpay = Smartpay(SECRET_KEY, public_key=PUBLIC_KEY)

app = Flask(__name__, static_url_path='')
CORS(app)

root = '../client/build'


@app.route("/", methods=['GET'])
def index():
    return redirect('http://localhost:3080')


@app.route("/create-smartpay-checkout", methods=['POST'])
def create_smartpay_checkout():
    CALLBACK_URL_PREFIX = request.headers['referer']

    session = smartpay.create_checkout_session({
        "amount": 400,
        "currency": 'JPY',
        "items": [
            {
                "name": 'オリジナルス STAN SMITH',
                "amount": 250,
                "currency": 'JPY',
                "quantity": 1,
            },
        ],
        "customerInfo": {
            "accountAge": 35,
            "email": 'merchant-support@smartpay.co',
            "firstName": 'かおる',
            "lastName": '田中',
            "firstNameKana": 'カオル',
            "lastNameKana": 'タナカ',
            "address": {
                "line1": '3-6-7',
                "line2": '青山パラシオタワー 11階',
                "administrativeArea": '東京都',
                "subLocality": '',
                "locality": '港区北青山',
                "postalCode": '107-0061',
                "country": 'JP',
            },
            "dateOfBirth": '1970-06-30',
            "gender": 'male',
        },
        "shippingInfo": {
            "address": {
                "line1": 'line1',
                "locality": 'locality',
                "postalCode": '123',
                "country": 'JP',
            },
            "feeAmount": 150,
            "feeCurrency": 'JPY',
        },
        "reference": 'order_ref_1234567',
        "successUrl": 'https://docs.smartpay.co/example-pages/checkout-successful',
        "cancelUrl": 'https://docs.smartpay.co/example-pages/checkout-canceled',
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
