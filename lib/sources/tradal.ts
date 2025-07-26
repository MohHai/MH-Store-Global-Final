import axios from 'axios';

export async function getTradalShippingEstimate(productLink: string, destinationCountry: string, zipCode: string) {
  const response = await axios.post('/api/tradal', {
    productLink,
    destinationCountry,
    zipCode,
  });

  return response.data;
}
