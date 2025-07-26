import axios from 'axios';

export async function getTradalProducts(query: string) {

  return [
    {
      title: 'Smart Watch X9 - Fitness Tracker',
      price: '$65.00',
      image: 'https://tradal.com/images/smartwatch-x9.jpg',
      link: 'https://tradal.com/product/x9',
      source: 'tradal',
    },
    {
      title: 'Portable Solar Charger 20000mAh',
      price: '$39.95',
      image: 'https://tradal.com/images/solar-charger.jpg',
      link: 'https://tradal.com/product/solar-charger',
      source: 'tradal',
    },
  ];
}
export async function forwardViaTradal(product: any, destinationCountry: string) {
  try {
    const response = await axios.post('/api/tradal', {
      product,
      destination: destinationCountry,
    });
    return response.data;
  } catch (error) {
    console.error('Tradal forwarding failed:', error);
    throw error;
  }
}
