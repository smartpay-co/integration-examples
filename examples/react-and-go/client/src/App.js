import Smartpay from '@smartpay/sdk-web';
import './App.css';

const checkout = () => {
  // Generate the payload for checkout session
  const payload = {
    amount: 400,
    currency: 'JPY',
    items: [
      {
        name: 'オリジナルス STAN SMITH',
        amount: 250,
        currency: 'JPY',
        quantity: 1,
      },
    ],
    customerInfo: {
      accountAge: 20,
      email: 'merchant-support@smartpay.co',
      firstName: '田中',
      lastName: '太郎',
      firstNameKana: 'たなか',
      lastNameKana: 'たろう',
      address: {
        line1: '北青山 3-6-7',
        line2: '青山パラシオタワー 11階',
        subLocality: '',
        locality: '港区',
        administrativeArea: '東京都',
        postalCode: '107-0061',
        country: 'JP',
      },
      dateOfBirth: '1985-06-30',
      gender: 'male',
    },
    shippingInfo: {
      address: {
        line1: '北青山 3-6-7',
        line2: '青山パラシオタワー 11階',
        subLocality: '',
        locality: '港区',
        administrativeArea: '東京都',
        postalCode: '107-0061',
        country: 'JP',
      },
      feeAmount: 150,
      feeCurrency: 'JPY',
    },
    // Your internal reference of the order
    reference: 'order_ref_1234567',
    // Callback URLs
    successUrl: 'https://docs.smartpay.co/example-pages/checkout-successful',
    cancelUrl: 'https://docs.smartpay.co/example-pages/checkout-canceled',
  };

  fetch('http://127.0.0.1:5001/create-smartpay-checkout', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((session) => {
      Smartpay.launchCheckout(session);
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
