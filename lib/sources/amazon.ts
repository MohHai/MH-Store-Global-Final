export async function getAmazonProducts(query: string) {
  return [
    {
      title: 'Amazon Echo Dot (5th Gen)',
      price: '$49.99',
      image: 'https://images-na.ssl-images-amazon.com/images/I/71xyz.jpg',
      link: 'https://www.amazon.com/dp/B09B8V2KRW',
      source: 'amazon',
    },
    {
      title: 'Wireless Headphones - Noise Cancelling',
      price: '$89.00',
      image: 'https://images-na.ssl-images-amazon.com/images/I/81abc.jpg',
      link: 'https://www.amazon.com/dp/B07XJ8C8F5',
      source: 'amazon',
    },
  ];
}
