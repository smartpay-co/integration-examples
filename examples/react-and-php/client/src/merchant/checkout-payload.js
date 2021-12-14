module.exports = {
  get(req, ref) {
    return {
      amount: 24750,
      currency: 'JPY',

      lineItems: [
        {
          name: 'オリジナルス STAN SMITH',
          description: 'ウィメンズ シューズ',
          image: 'absoluteURL_to_product_image.jpg',
          price: 250,
          currency: 'JPY',
          quantity: 1,
        },
        {
          name: 'ナイキ リフト',
          description: 'キッズシューズ',
          image: 'absoluteURL_to_product_image.jpg',
          price: 5500,
          currency: 'JPY',
          quantity: 1,
        },
      ],

      consumerData: {
        emailAddress: 'john@doe.com',
        name1: 'John',
        name2: 'Doe',
        name1Kana: 'ジョン',
        name2Kana: 'ドウ',
        address: {
          line1: '北青山 3-6-7',
          line2: '青山パラシオタワー 11階',
          subLocality: '',
          locality: '港区',
          administrativeArea: '東京都',
          postalCode: '107-0061',
          country: 'JP',
        },
        phoneNumber: '+81 8 5555 8888',
        dateOfBirth: '1984-01-24',
        legalGender: 'm',
        reference: 'my_user_987654321fedcba',
      },

      // The order reference in the merchant's system
      reference: ref,
      // Any extra data you want to append to the checkout object.
      metadata: {
        campaign: 'SpringSale',
      },
    };
  },
};
