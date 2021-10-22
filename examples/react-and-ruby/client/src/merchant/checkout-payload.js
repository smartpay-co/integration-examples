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
          line1: '２−５−１２東山',
          line2: 'アパートメンツ東山７０１',
          line3: null,
          line4: null,
          line5: null,
          subLocality: null,
          locality: '目黒区',
          administrativeArea: '東京都',
          postalCode: '153-0043',
          country: 'jp',
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
