import axios from 'axios';

export async function getAliExpressProducts(query: string) {
  const response = await axios.get('/api/aliexpress', {
    params: { query },
  });

  return response.data;
}
