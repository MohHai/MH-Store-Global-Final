import axios from 'axios';

export async function getAmazonProducts(query: string) {
  const response = await axios.get('/api/amazon', {
    params: { query },
  });

  return response.data;
}
