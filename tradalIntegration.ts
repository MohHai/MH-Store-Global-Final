import axios from 'axios';

export async function getTradalShippingEstimate(productLink: string, destinationCountry: string) {
  const response = await axios.post('https://api.tradal.com/forwarding/estimate', {
    productLink,
    destinationCountry,
  }, {
    headers: {
      'Authorization': `Bearer ${process.env.TRADAL_API_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data;
}
