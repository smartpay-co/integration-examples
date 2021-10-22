import os
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from smartpay import Smartpay


# Replace the keys with yours
SECRET_KEY = os.environ.get('SECRET_KEY', '<YOUR_SECRET_KEY>')
PUBLIC_KEY = os.environ.get('PUBLIC_KEY', '<YOUR_PUBLIC_KEY>')

smartpay = Smartpay(SECRET_KEY,
                    public_key=PUBLIC_KEY)


app = Flask(__name__, static_url_path='')
CORS(app)

root = '../client/build'


@app.route("/create-smartpay-checkout", methods=['POST'])
def create_smartpay_checkout():
    payload = request.json

    session = smartpay.create_checkout_session(payload)

    return jsonify(session)


@app.route("/payment-success")
def payment_success():
    return send_from_directory(root, 'payment-success.html')


@app.route("/payment-cancel")
def payment_cancel():
    return send_from_directory(root, 'payment-cancel.html')


@app.route("/<path>")
def files(path):
    return send_from_directory(root, path)
