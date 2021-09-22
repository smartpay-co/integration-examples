// Mock consumer data
const consumerData = {
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
};

module.exports = {
  data() {
    return consumerData;
  },
};
