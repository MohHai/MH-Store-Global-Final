import axios from 'axios';

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
