import Smartpay from '@smartpay/sdk-web';
import './App.css';

const PUBLIC_KEY = process.env.REACT_APP_PUBLIC_KEY || '<YOUR_PUBLIC_KEY>';

const smartpay = new Smartpay(PUBLIC_KEY);

const checkout = () => {
  // Generate the payload for checkout session
  const payload = {
    items: [
      {
        name: 'オリジナルス STAN SMITH',
        amount: 250,
        currency: 'JPY',
        quantity: 1,
      },
    ],
    shipping: {
      line1: 'line1',
      locality: 'locality',
      postalCode: '123',
      country: 'JP',
    },
    // Your internal reference of the order
    reference: 'order_ref_1234567',
    // Callback URLs
    successURL: 'https://docs.smartpay.co/example-pages/checkout-successful',
    cancelURL: 'https://docs.smartpay.co/example-pages/checkout-canceled',
  };

  fetch('http://127.0.0.1:5000/create-smartpay-checkout', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((session) => {
      smartpay.launchCheckout(session);
    });
};

function App() {
  return (
    <div className="App">
      <button onClick={checkout}>Checkout</button>
    </div>
  );
}

export default App;
