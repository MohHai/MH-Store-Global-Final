export async function getAliExpressProducts(query: string) {
  return [
    {
      title: 'Smart Fitness Band with Heart Rate Monitor',
      price: '$22.50',
      image: 'https://ae01.alicdn.com/images/fitness-band.jpg',
      link: 'https://www.aliexpress.com/item/10050012345678.html',
      source: 'aliexpress',
    },
    {
      title: 'Wireless Bluetooth Earbuds with Charging Case',
      price: '$18.99',
      image: 'https://ae01.alicdn.com/images/bluetooth-earbuds.jpg',
      link: 'https://www.aliexpress.com/item/10050087654321.html',
      source: 'aliexpress',
    },
  ];
}
