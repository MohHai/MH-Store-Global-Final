import axios from 'axios';

export async function getSheinProducts(query: string) {
  const response = await axios.get('/api/shein', {
    params: { query },
  });

  return response.data;
}
