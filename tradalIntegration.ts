import axios from 'axios';

export async function forwardWithTradal(orderData: any) {
  const response = await axios.post('/api/tradal', orderData);
  return response.data;
}
