export async function getSheinProducts(query: string) {
  return [
    {
      title: 'Summer Casual Floral Dress',
      price: '$29.99',
      image: 'https://img.shein.com/images/summer-dress.jpg',
      link: 'https://www.shein.com/Summer-Casual-Floral-Dress-p-123456.html',
      source: 'shein',
    },
    {
      title: 'Men\'s Slim Fit Blazer',
      price: '$44.00',
      image: 'https://img.shein.com/images/mens-blazer.jpg',
      link: 'https://www.shein.com/Mens-Slim-Fit-Blazer-p-789012.html',
      source: 'shein',
    },
  ];
}
