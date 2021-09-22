// Mock order items
const orderItems = [
  {
    name: 'レブロン 18 LOW',
    description: 'ウィメンズ シューズ',
    image: 'absolute_url_to_product_image.jpg',
    price: 250,
    currency: 'JPY',
    quantity: 1,
  },
  {
    name: 'ナイキ リフト',
    description: 'キッズシューズ',
    image: 'absolute_url_to_product_image.jpg',
    price: 5500,
    currency: 'JPY',
    quantity: 1,
  },
];

module.exports = {
  data() {
    return orderItems;
  },
};
