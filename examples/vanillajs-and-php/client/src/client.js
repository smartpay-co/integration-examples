const smartpay = new Smartpay('<YOUR_PUBLIC_KEY>');

const checkout = () => {
  const payload = {
    items: [
      {
        name: 'オリジナルス STAN SMITH',
        amount: 250,
        currency: 'JPY',
        quantity: 1,
      },
    ],
    customer: {
      accountAge: 35,
      email: 'merchant-support@smartpay.co',
      firstName: 'かおる',
      lastName: '田中',
      firstNameKana: 'カオル',
      lastNameKana: 'タナカ',
      address: {
        line1: '北青山 3-6-7',
        line2: '青山パラシオタワー 11階',
        subLocality: '',
        locality: '港区',
        administrativeArea: '東京都',
        postalCode: '107-0061',
        country: 'JP',
      },
      dateOfBirth: '1970-06-30',
      gender: 'male',
    },
    shipping: {
      line1: '北青山 3-6-7',
      line2: '青山パラシオタワー 11階',
      subLocality: '',
      locality: '港区',
      administrativeArea: '東京都',
      postalCode: '107-0061',
      country: 'JP',
      feeAmount: 150,
      feeCurrency: 'JPY',
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

document.getElementById('checkout').addEventListener('click', checkout, false);
